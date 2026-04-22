import type { SupabaseClient } from "@supabase/supabase-js";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { openai, OPENAI_MODEL } from "@/lib/openai";
import { FIRST_SYSTEM_PROMPT } from "@/constants/prompts/first-system";
import { headlinePrompt } from "@/constants/prompts/headline";
import { aboutPrompt } from "@/constants/prompts/about.prompt";
import { experiencePrompt } from "@/constants/prompts/experience.prompt";
import { projectPrompt } from "@/constants/prompts/projects.prompt";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseDate(d: string | null): { month: string; year: string } | null {
  if (!d) return null;
  const date = new Date(d);
  return { month: MONTH_NAMES[date.getUTCMonth()], year: String(date.getUTCFullYear()) };
}

async function ask(messages: ChatCompletionMessageParam[], userPrompt: string): Promise<string> {
  messages.push({ role: "user", content: userPrompt });
  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages,
    temperature: 0.7,
  });
  const reply = completion.choices[0]?.message?.content ?? "";
  messages.push({ role: "assistant", content: reply });
  return reply;
}

async function askSingle(userPrompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: FIRST_SYSTEM_PROMPT.trim() },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });
  return completion.choices[0]?.message?.content ?? "";
}

export async function generateProfileContent(
  profileId: string,
  supabase: SupabaseClient,
): Promise<void> {
  const { data: resume, error: resumeError } = await supabase
    .from("input_resumes")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  if (resumeError || !resume) throw new Error("Input resume not found for profile " + profileId);

  const { data: inputExps } = await supabase
    .from("input_work_experiences")
    .select("*")
    .eq("input_resume_id", resume.id)
    .order("id", { ascending: true });

  // Fetch target rows with enough fields to match by content, not just by index.
  // This is critical: work_experiences and projects are displayed ordered by start_date DESC
  // on the profile page, but generated in insertion order (id ASC). Without content-based
  // matching, descriptions get assigned to the wrong rows when insertion order != start_date order.
  const [{ data: workExpRows }, { data: projectRows }] = await Promise.all([
    supabase
      .from("work_experiences")
      .select("id, company, position, start_date")
      .eq("profile_id", profileId)
      .order("id", { ascending: true }),
    supabase
      .from("projects")
      .select("id, company, position, start_date")
      .eq("profile_id", profileId)
      .order("id", { ascending: true }),
  ]);

  const exps = (inputExps ?? []).map((exp) => {
    const s = parseDate(exp.start_date as string | null);
    const e = parseDate(exp.end_date as string | null);
    const achievements = (exp.achievements ?? []) as string[];
    return {
      company: exp.company as string,
      position: exp.position as string,
      startMonth: s?.month ?? "",
      startYear: s?.year ?? "",
      endMonth: e?.month ?? "",
      endYear: e?.year ?? "",
      isCurrent: exp.is_current as boolean,
      tasks: (exp.tasks ?? []) as string[],
      technologies: (exp.technologies ?? []) as string[],
      achievements,
      needsAchievementHelp: achievements.length === 0,
      projectType: (exp.project_type ?? "") as string,
      projectRole: (exp.project_role ?? "") as string,
      projectUrl: (exp.project_url ?? "") as string,
      // Keep raw start_date for matching
      _startDate: exp.start_date as string | null,
    };
  });

  const uniqueTechs = [
    ...new Set([
      ...(resume.technologies ?? []) as string[],
      ...exps.flatMap((e) => e.technologies),
    ]),
  ];

  const recentExperienceSummary = exps
    .slice(0, 2)
    .map(
      (e) =>
        `${e.position} at ${e.company} (${e.startMonth} ${e.startYear} - ${
          e.isCurrent ? "Present" : `${e.endMonth} ${e.endYear}`
        })`,
    )
    .join("\n");

  const formDataLike = {
    role: resume.role as string,
    experience: resume.experience as string,
    goal: (resume.goal ?? "") as string,
    englishLevel: (resume.english_level ?? "") as string,
    technologies: uniqueTechs,
    workExperiences: exps,
    startMethod: "",
    resumeFile: "",
    blockers: [],
    blockersOther: "",
    applicationsCount: "",
    targetRegion: (resume.target_region ?? "") as string,
    projects: [],
  };

  // Generate headline and about sequentially (about can reference headline context)
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: FIRST_SYSTEM_PROMPT.trim() },
  ];
  const headline = await ask(messages, headlinePrompt(formDataLike, uniqueTechs, recentExperienceSummary));
  const about = await ask(messages, aboutPrompt(formDataLike));

  // Generate all descriptions in parallel. Promise.all preserves result order — exps[i]
  // always maps to expDescriptions[i] and projDescriptions[i].
  const [expDescriptions, projDescriptions] = await Promise.all([
    Promise.all(exps.map((exp) => askSingle(experiencePrompt({
      ...exp,
      overallExperience: resume.experience as string,
      targetRole: resume.role as string,
    })))),
    Promise.all(exps.map((exp) => askSingle(projectPrompt({
      ...exp,
      overallExperience: resume.experience as string,
      targetRole: resume.role as string,
    })))),
  ]);

  // Match each exp to its DB row by company + position + start_date.
  // This is robust against any ID ordering differences between tables.
  // Falls back to positional index only if no content match is found.
  type TargetRow = { id: number; company: string; position: string; start_date: string | null };

  function findRow(rows: TargetRow[], exp: typeof exps[0], fallbackIdx: number): TargetRow | null {
    const byContent = rows.find(
      r =>
        r.company === exp.company &&
        r.position === exp.position &&
        r.start_date === exp._startDate,
    );
    return byContent ?? rows[fallbackIdx] ?? null;
  }

  await Promise.all([
    supabase
      .from("profiles")
      .update({ headline, about, is_generated: true })
      .eq("id", profileId),

    ...exps.map((exp, i) => {
      const row = findRow((workExpRows ?? []) as TargetRow[], exp, i);
      if (!row) return Promise.resolve();
      return supabase
        .from("work_experiences")
        .update({ description: expDescriptions[i] ?? "" })
        .eq("id", row.id);
    }),

    ...exps.map((exp, i) => {
      const row = findRow((projectRows ?? []) as TargetRow[], exp, i);
      if (!row) return Promise.resolve();
      return supabase
        .from("projects")
        .update({ description: projDescriptions[i] ?? "" })
        .eq("id", row.id);
    }),
  ]);
}
