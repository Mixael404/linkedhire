import { ResolvedFormData } from "@/app/api/generate-profile/route";

export type ExperienceInputData = ResolvedFormData["workExperiences"][number];


const imagineAchievements = `Infer and create the most relevant, impactful, and recruiter-attractive achievements that logically follow from the candidate’s role, tasks, and technologies.

The achievements must:
- Sound credible and professional
- Be aligned with real responsibilities
- Emphasize impact (performance, UX, scalability, delivery, quality, etc.)
- Match the expectations of strong LinkedIn profiles for international roles
`

export const experiencePrompt = (data: ExperienceInputData) => {
const safeTasks = data.tasks?.map((t) => `- ${t}`).join('\n') || '- Not specified';
const safeAchievements = data.achievements?.map((a) => `- ${a}`).join('\n') || '- Not specified';
const safeTechnologies = data.technologies?.length
  ? data.technologies.join(', ')
  : 'Not specified';

const achievementInstruction = data.needsAchievementHelp
  ? `
### Achievement handling

Explicit achievements are missing or incomplete.

You should infer 1–2 realistic, recruiter-friendly impact statements from the candidate's tasks and technologies.

These inferred achievements must:
- be logically grounded in the provided work
- sound believable and professionally strong
- focus on likely improvements in performance, UX, maintainability, reliability, delivery speed, integrations, or engineering quality
- remain conservative and plausible

Do NOT invent:
- fake business metrics
- revenue impact
- user counts
- unrealistic scale
- unsupported architectural authority
`
  : `
### Achievement handling

Use the provided achievements as the primary source of impact. ${safeAchievements}

You may rewrite them for clarity, stronger wording, and better recruiter readability, but do not replace them with invented claims.
`;

const prompt = `
You are a senior international tech recruiter and LinkedIn profile strategist with experience hiring frontend and fullstack engineers for US and EU companies.

Your task is to turn structured raw candidate data into a strong LinkedIn Experience description for one specific role.

---

### Objective

Create a LinkedIn-ready experience description that:
- highlights the candidate's strongest contributions
- reflects technical depth and ownership
- shows clear impact where supported by the input
- sounds credible, concise, and recruiter-friendly

---

### Input data

Position: ${data.position}
Company: ${data.company}
Employment period: ${data.startMonth} ${data.startYear} – ${data.isCurrent ? 'Present' : `${data.endMonth} ${data.endYear}`}

Tasks:
${safeTasks}

Achievements:
${safeAchievements}

Needs achievement help: ${data.needsAchievementHelp ? 'Yes' : 'No'}

Technologies:
${safeTechnologies}

---

### Writing rules

- Write in English only
- Output bullet points only
- Write 4–6 bullet points
- Each bullet must be one concise sentence
- Use simple, direct, natural language
- Use strong but realistic action verbs such as Developed, Built, Implemented, Improved, Integrated, Optimized
- Avoid fluff, filler, buzzwords, and corporate clichés
- Never use phrases like "Responsible for", "Worked on", or "Participated in"
- Avoid overly dramatic verbs like "Spearheaded" or "Revolutionized"
- Do not copy the input directly
- Rewrite and improve wording significantly
- Do not repeat the same idea in different words
- Do not mix languages
- Ensure all wording is fully in English

---

### Content rules

- Prioritize content in this order: achievements, impact, complex tasks, core responsibilities
- Merge overlapping tasks into stronger, more valuable bullet points
- Naturally include relevant technologies inside the bullets when useful
- Emphasize technical depth only if supported by the input
- Highlight impact in terms of performance, UX, maintainability, integrations, reliability, delivery, or engineering quality
- Do not exaggerate seniority, ownership, or architectural authority beyond what the input supports

${achievementInstruction}

---

### Output constraints

- Do NOT include the job title
- Do NOT include the company name
- Do NOT include dates
- Do NOT include a separate technologies line
- Do NOT include headings, labels, or explanations
- Return only the final LinkedIn-ready bullet list

---

Now generate the best possible LinkedIn Experience description for this role.
`;

  return prompt;
};
