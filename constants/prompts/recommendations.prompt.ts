import type { ResolvedFormData } from "@/app/api/generate-profile/route";

export type RecommendationExpInput = ResolvedFormData["workExperiences"][number] & {
   overallExperience?: string;
   targetRole?: string;
};

export const recommendationFromExpPrompt = (
  exp: RecommendationExpInput,
  data: ResolvedFormData,
): string => `You are writing a LinkedIn recommendation for a ${data.role} targeting the ${data.targetRegion} job market.

CANDIDATE PROFILE:
- Target role: ${data.role}
- Total experience: ${data.experience} years
- Core technologies: ${data.technologies.join(", ")}
- Career goal: ${data.goal || "not specified"}
- English level: ${data.englishLevel}

THE ROLE THIS RECOMMENDATION IS ABOUT:
- Company: ${exp.company}
- Position: ${exp.position}
- Period: ${exp.startMonth} ${exp.startYear} – ${exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}
- Tasks: ${exp.tasks.join("; ")}
- Technologies: ${exp.technologies.join(", ")}
- Achievements: ${exp.achievements.length > 0 ? exp.achievements.join("; ") : "not specified"}

TASK TYPES (IMPORTANT SIGNAL):
${data.taskTypes?.join(", ") || "not specified"}

TASK: Write ONE LinkedIn recommendation (120–200 words) from the perspective of a direct manager or senior colleague.

STRICT STRUCTURE:
1) Context of working together
2) ONE concrete example based on the task types above
3) What the candidate did (with technologies)
4) Outcome
5) Closing endorsement

CRITICAL RULES:
- Choose 1–2 task types and build the story around them (do NOT list all)
- Reflect seniority through the type of problems (e.g. architecture, performance, scaling)
- MUST connect task types → real actions → real outcome
- Do NOT use placeholders like [Name]
- Refer to the person as "he" or "they" consistently

TECHNICAL DEPTH:
- MUST mention at least 2 technologies in context
- MUST describe an engineering action (not just responsibility)

NO GENERIC LANGUAGE:
- Avoid vague praise unless supported by a concrete example
- Do NOT use: "passionate", "motivated", "hardworking", "team player"

STYLE:
- Natural, credible, slightly informal
- Sounds like a real manager writing quickly
- Not polished marketing text

OUTPUT: Return ONLY the recommendation text.
`;


export const recommendationFromSkillsPrompt = (data: ResolvedFormData): string =>
`You are writing a LinkedIn recommendation for a ${data.role} targeting the ${data.targetRegion} job market.

CANDIDATE PROFILE:
- Target role: ${data.role}
- Total experience: ${data.experience} years
- Core technologies: ${data.technologies.join(", ")}
- Career goal: ${data.goal || "not specified"}
- English level: ${data.englishLevel}

TASK TYPES (IMPORTANT SIGNAL):
${data.taskTypes?.join(", ") || "not specified"}

TASK: Write ONE LinkedIn recommendation (120–200 words) from a technical lead or senior colleague.

CONTEXT:
Invent a realistic production-level project.

STRICT STRUCTURE:
1) Context
2) One technical challenge aligned with task types
3) What the candidate did
4) Result
5) Closing endorsement

CRITICAL RULES:
- Choose 1–2 task types and base the story on them
- Use task types to reflect seniority (e.g. architecture > UI)
- Do NOT list categories — integrate them naturally
- Do NOT use placeholders like [Name]
- Refer to the person as "he" or "they" consistently

TECHNICAL REQUIREMENTS:
- Mention 2–3 technologies in real context
- Include a real engineering action (optimization, architecture decision, debugging, etc.)
- Include a clear outcome (performance, delivery, stability)

STYLE:
- Sounds like an engineer, not HR
- Slightly opinionated, not overly polished

OUTPUT: Return ONLY the recommendation text.
`;