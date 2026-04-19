import { ExperienceInputData } from "./experience.prompt";

export const projectPrompt = (data: ExperienceInputData) => (
    `
You are an expert international tech recruiter and LinkedIn profile strategist.

Your task is to convert raw work experience into a strong, project-style description suitable for LinkedIn.

The goal is to present this experience as a clear, concrete engineering case that highlights real work, technical depth, and impact.

---

### Input data

Project context / role: ${data.position}
Company: ${data.company}
Period: ${data.startMonth} ${data.startYear} – ${data.isCurrent ? 'Present' : `${data.endMonth} ${data.endYear}`}

Tasks:
${data.tasks?.length ? data.tasks.map(task => `- ${task}`).join('\n') : '- No tasks provided'}

Achievements:
${data.achievements?.length ? data.achievements.map(item => `- ${item}`).join('\n') : '- No explicit achievements provided'}

Technologies:
${data.technologies?.length ? data.technologies.join(', ') : 'Not specified'}

---

### Objective

Transform the input into a clean, structured, recruiter-friendly project description that:

- clearly shows what was built or developed
- reflects the technical nature of the work
- highlights the candidate’s key contributions
- demonstrates practical impact

---

### Output format (STRICT)

- First line: short project title (no symbols, no markdown, no formatting)
- Then: 3–5 bullet points describing the work
- Bullet points must be concise and written as single sentences
- Do NOT write paragraphs
- Do NOT include company name, role title, or dates
- Do NOT include a technologies section
- Do NOT include any headings or explanations

---

### Achievements logic

${
data.needsAchievementHelp
? `
Achievements are missing or weak.

You MUST:
- derive realistic impact from tasks and technologies
- include 1–2 impact-oriented bullet points within the main list

These must:
- be believable and grounded in the input
- reflect performance, UX, reliability, maintainability, or delivery improvements
- avoid fake numbers, business metrics, or unrealistic scale
`
: `
Use the provided achievements as the main source of impact.

You may:
- rewrite and improve them
- integrate them naturally into the bullet list

Do NOT:
- replace them with invented claims
`
}

---

### Writing rules

- Write in English only
- Translate or transliterate any non-English content
- Use simple, direct, natural language
- Use strong but realistic action verbs (Developed, Built, Implemented, Improved, Integrated, Optimized)
- Avoid overcomplicated phrasing
- Avoid hype and buzzwords (e.g., "cutting-edge", "innovative", "world-class")
- Avoid phrases like "responsible for", "worked on", "leveraging", "specializing in"
- Do not repeat the same idea in different words
- Do not exaggerate complexity or scale
- Focus on clarity, technical contribution, and real impact

---

Return only the final project description in the specified format.
`
);