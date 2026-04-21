import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { openai, OPENAI_MODEL } from "../../../lib/openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { FIRST_SYSTEM_PROMPT } from "@/constants/prompts/first-system";
import { headlinePrompt } from "@/constants/prompts/headline";
import { aboutPrompt } from "@/constants/prompts/about.prompt";
import { experiencePrompt } from "@/constants/prompts/experience.prompt";
import { projectPrompt } from "@/constants/prompts/projects.prompt";
import { firstProfileAnalyze } from "@/utils/firstProfileAnalyze";

// Mirrors the shape returned by resolveFormData() on the client
export interface ResolvedFormData {
  startMethod: string;
  resumeFile: string;
  role: string;
  experience: string;
  technologies: string[];
  goal: string;
  blockers: string[];
  blockersOther: string;
  applicationsCount: string;
  workExperiences: {
    company: string;
    position: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    isCurrent: boolean;
    tasks: string[];
    technologies: string[];
    achievements: string[];
    needsAchievementHelp: boolean;
  }[];
  projects?: {
    company: string;
    position: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    isCurrent: boolean;
    tasks: string[];
    technologies: string[];
    achievements: string[];
    needsAchievementHelp: boolean;
  }[];
  targetRegion: string;
  englishLevel: string;
}

export interface GenerateProfileRequest {
  formData: ResolvedFormData;
}

export interface GeneratedWorkExperience {
  id: number;
  created_at: string;

  company: string;
  position: string;
  description: string;

  finish_date: string | null;
  start_date: string | null;
  is_current: boolean;
}

export interface GeneratedProject {
  id: number;
  created_at: string;

  company: string;
  position: string;
  description: string;

  finish_date: string | null;
  start_date: string | null;
  is_current: boolean;
}

export interface GeneratedProfile {
  id: string;
  headline: string;
  about: string;
  workExperiences: GeneratedWorkExperience[];
  projects: GeneratedProject[];
  skills: string[];
  target_country: string;
  is_purchased: boolean;
}

async function ask(
  messages: ChatCompletionMessageParam[],
  userPrompt: string,
): Promise<string> {
  messages.push({ role: "user", content: userPrompt });

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages,
    temperature: 0.7,
    // max_tokens: 800,
  });

  const reply = completion.choices[0]?.message?.content ?? "";
  messages.push({ role: "assistant", content: reply });
  return reply;
}

async function askSingle(
  SYSTEM_PROMPT: string,
  userPrompt: string,
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    // max_tokens: 900,
  });

  return completion.choices[0]?.message?.content ?? "";
}

const MAX_SKILLS = 100;
const MAX_WORK_EXPERIENCES = 6;
const MAX_TASKS_PER_EXP = 20;
const MAX_ACHIEVEMENTS_PER_EXP = 20;
const MAX_SKILLS_PER_EXP = 20;
const MAX_COMPANY_LENGTH = 50;
const MAX_POSITION_LENGTH = 50;
const MAX_TASK_LENGTH = 150;
const MAX_ACHIEVEMENT_LENGTH = 150;

const MONTHS: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

function toDate(month: string, year: string): string | null {
  const m = MONTHS[month];
  if (!m || !year) return null;
  return `${year}-${m}-01`;
}

function precheck(formData: ResolvedFormData): string | null {
  const totalSkills = new Set([
    ...(formData.technologies ?? []),
    ...formData.workExperiences.flatMap((w) => w.technologies ?? []),
  ]);
  if (totalSkills.size > MAX_SKILLS) {
    return `Too many skills: ${totalSkills.size} provided, max is ${MAX_SKILLS}`;
  }

  if (formData.workExperiences.length > MAX_WORK_EXPERIENCES) {
    return `Too many work experiences: max is ${MAX_WORK_EXPERIENCES}`;
  }

  for (let i = 0; i < formData.workExperiences.length; i++) {
    const exp = formData.workExperiences[i];
    const label = `Work experience #${i + 1}`;

    if ((exp.company?.length ?? 0) > MAX_COMPANY_LENGTH)
      return `${label}: company name exceeds ${MAX_COMPANY_LENGTH} characters`;
    if ((exp.position?.length ?? 0) > MAX_POSITION_LENGTH)
      return `${label}: position exceeds ${MAX_POSITION_LENGTH} characters`;
    if ((exp.tasks?.length ?? 0) > MAX_TASKS_PER_EXP)
      return `${label}: too many tasks, max is ${MAX_TASKS_PER_EXP}`;
    if ((exp.achievements?.length ?? 0) > MAX_ACHIEVEMENTS_PER_EXP)
      return `${label}: too many achievements, max is ${MAX_ACHIEVEMENTS_PER_EXP}`;
    if ((exp.technologies?.length ?? 0) > MAX_SKILLS_PER_EXP)
      return `${label}: too many skills, max is ${MAX_SKILLS_PER_EXP}`;

    for (const task of exp.tasks ?? []) {
      if (task.length > MAX_TASK_LENGTH)
        return `${label}: task exceeds ${MAX_TASK_LENGTH} characters`;
    }
    for (const ach of exp.achievements ?? []) {
      if (ach.length > MAX_ACHIEVEMENT_LENGTH)
        return `${label}: achievement exceeds ${MAX_ACHIEVEMENT_LENGTH} characters`;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  let body: GenerateProfileRequest;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { formData } = body;
  if (!formData) {
    return NextResponse.json(
      { error: "formData is required" },
      { status: 400 },
    );
  }

  const precheckError = precheck(formData);
  if (precheckError) {
    return NextResponse.json({ error: precheckError }, { status: 422 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const allBlockers = formData.blockersOther
    ? [...(formData.blockers ?? []), formData.blockersOther]
    : (formData.blockers ?? []);

  const response = firstProfileAnalyze(formData);

  const { data: createdProfile } = await supabase
    .from("profiles")
    .insert({
      headline: response.headline,
      about: response.about,
      skills: formData.technologies,
      target_country: formData.targetRegion,
    })
    .select("*")
    .single();

  const { data: resume, error: resumeError } = await supabase
    .from("input_resumes")
    .insert({
      role: formData.role,
      experience: formData.experience,
      technologies: formData.technologies,
      goal: formData.goal,
      blockers: allBlockers,
      applications_count: formData.applicationsCount,
      target_region: formData.targetRegion,
      english_level: formData.englishLevel,
      profile_id: createdProfile.id,
    })
    .select("*")
    .single();

  if (resumeError || !resume) {
    console.error("[supabase insert resume error]", resumeError);
    return NextResponse.json({ error: resumeError }, { status: 500 });
  }

  const workExpRows = formData.workExperiences.map((exp) => ({
    input_resume_id: resume.id,
    company: exp.company,
    position: exp.position,
    start_date: toDate(exp.startMonth, exp.startYear),
    end_date: exp.isCurrent ? null : toDate(exp.endMonth, exp.endYear),
    is_current: exp.isCurrent,
    tasks: exp.tasks,
    technologies: exp.technologies,
    achievements: exp.achievements,
  }));

  const { error: workExpError, data: workExpData } = await supabase
    .from("input_work_experiences")
    .insert(workExpRows)
    .select("*");

  if (workExpError) {
    console.error("[supabase insert work experiences error]", workExpError);
    return NextResponse.json(
      { error: "Failed to save work experiences" },
      { status: 500 },
    );
  }

  const workExperiencesRows = formData.workExperiences.map((proj) => ({
    company: proj.company,
    position: proj.position,
    start_date: toDate(proj.startMonth, proj.startYear),
    finish_date: proj.isCurrent ? null : toDate(proj.endMonth, proj.endYear),
    is_current: proj.isCurrent,
    description: "", // We'll fill this in later after generation
    profile_id: createdProfile.id,
  }));

  await supabase
    .from("work_experiences")
    .insert(workExperiencesRows)

  await supabase
    .from("projects")
    .insert(workExperiencesRows) // For simplicity, using the same data shape for projects; adjust as needed

  return NextResponse.json(createdProfile);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: FIRST_SYSTEM_PROMPT.trim(),
    },
  ];

  try {
    const recentExperienceSummary = getExperienceSummary(formData);
    const uniqueTechs = getUniqueTechnologies(formData);

    // Step 1: headline — нужны только роль, опыт и целевой регион
    const headline = await ask(
      messages,
      headlinePrompt(formData, uniqueTechs, recentExperienceSummary),
    );
    // Step 2: about — роль, цель, опыт работы (краткая сводка), уровень английского
    const about = await ask(messages, aboutPrompt(formData));

    const workExperiences = await Promise.all(
      formData.workExperiences.map(
        async (exp): Promise<GeneratedWorkExperience> => {
          const period = exp.isCurrent
            ? `${exp.startMonth} ${exp.startYear} – Present`
            : `${exp.startMonth} ${exp.startYear} – ${exp.endMonth} ${exp.endYear}`;

          const description = await askSingle(
            FIRST_SYSTEM_PROMPT,
            experiencePrompt(exp),
          );

          return {
            company: exp.company,
            position: exp.position,
            period,
            description,
          };
        },
      ),
    );

    const projects = await Promise.all(
      (formData.workExperiences ?? []).map(
        async (proj): Promise<GeneratedProject> => {
          const period = proj.isCurrent
            ? `${proj.startMonth} ${proj.startYear} – Present`
            : `${proj.startMonth} ${proj.startYear} – ${proj.endMonth} ${proj.endYear}`;

          const description = await askSingle(
            FIRST_SYSTEM_PROMPT,
            projectPrompt(proj),
          );

          return {
            company: proj.company,
            position: proj.position,
            period,
            description,
          };
        },
      ),
    );

    const profile: GeneratedProfile = {
      id: "1", // In a real app, generate a unique ID here
      headline,
      about,
      workExperiences,
      projects,
      skills: uniqueTechs,
      targetCountry: formData.targetRegion,
      is_purchased: false,
    };
    return NextResponse.json(profile);
  } catch (err) {
    console.error("[generate-profile error]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 502 });
  }
}

function getExperienceSummary(formData: ResolvedFormData) {
  return formData.workExperiences
    .slice(0, 2)
    .map(
      (w) =>
        `${w.position} at ${w.company} (${w.startMonth} ${w.startYear} - ${
          w.isCurrent ? "Present" : `${w.endMonth} ${w.endYear}`
        })`,
    )
    .join("\n");
}

function getUniqueTechnologies(formData: ResolvedFormData) {
  return [
    ...new Set([
      ...formData.technologies,
      ...formData.workExperiences.flatMap((w) => w.technologies),
    ]),
  ];
}
