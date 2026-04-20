import { NextRequest, NextResponse } from "next/server";
import { openai, OPENAI_MODEL } from "../../../lib/openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { FIRST_SYSTEM_PROMPT } from "@/constants/prompts/first-system";
import { headlinePrompt } from "@/constants/prompts/headline";
import { aboutPrompt } from "@/constants/prompts/about.prompt";
import { experiencePrompt } from "@/constants/prompts/experience.prompt";
import { projectPrompt } from "@/constants/prompts/projects.prompt";

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
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface GeneratedProject {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface GeneratedProfile {
  id: string;
  headline: string;
  about: string;
  workExperiences: GeneratedWorkExperience[];
  projects: GeneratedProject[];
  skills: string[];
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

async function askSingle(SYSTEM_PROMPT: string, userPrompt: string): Promise<string> {
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

export async function POST(req: NextRequest) {

  await new Promise((resolve) => setTimeout(resolve, 7000));

  const profile: GeneratedProfile = {
      id: "1",
      headline: "Frontend Developer with 5 years of experience, seeking opportunities in the US", 
      about: "Professional frontend dev", 
      workExperiences: [
        {
          company: "Tech Company A",
          position: "Senior Frontend Developer",
          period: "Jan 2020 - Present",
          description: "Some mock description about responsibilities and achievements at Tech Company A."
        },
      ], 
      projects: [
        {
          company: "Tech Company B",
          position: "Frontend Developer",
          period: "Jun 2018 - Dec 2019",
          description: "Some mock description about a project at Tech Company B."
        }
      ],
      skills: ["React", "TypeScript", "Next.js", "GraphQL", "CSS"],
    };
  return NextResponse.json(profile);


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
    const about = await ask(
      messages, 
      aboutPrompt(formData)
    );


    const workExperiences = await Promise.all(
      formData.workExperiences.map(async (exp): Promise<GeneratedWorkExperience> => {
        const period = exp.isCurrent
          ? `${exp.startMonth} ${exp.startYear} – Present`
          : `${exp.startMonth} ${exp.startYear} – ${exp.endMonth} ${exp.endYear}`;

        const description = await askSingle(FIRST_SYSTEM_PROMPT, experiencePrompt(exp));

        return {
          company: exp.company,
          position: exp.position,
          period,
          description,
        };
      }),
    );

    const projects = await Promise.all(
      (formData.workExperiences ?? []).map(async (proj): Promise<GeneratedProject> => {
        const period = proj.isCurrent
          ? `${proj.startMonth} ${proj.startYear} – Present`
          : `${proj.startMonth} ${proj.startYear} – ${proj.endMonth} ${proj.endYear}`;

        const description = await askSingle(FIRST_SYSTEM_PROMPT, projectPrompt(proj));

        return {
          company: proj.company,
          position: proj.position,
          period,
          description,
        };
      }),
    );

    const profile: GeneratedProfile = {
      id: "1", // In a real app, generate a unique ID here
      headline, 
      about, 
      workExperiences, 
      projects,
      skills: uniqueTechs,
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
