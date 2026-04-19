import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const headlinePrompt = (formData: ResolvedFormData, uniqueTechs: string[], recentExperienceSummary: string): string => (
    `
You are an expert international tech recruiter and LinkedIn profile strategist.

Your task is to write a strong LinkedIn headline for this candidate.

### Objective

Create a concise, credible, and recruiter-friendly headline suitable for LinkedIn.

The headline should clearly communicate:
- the candidate’s role
- core specialization
- key technologies, if relevant

### Output rules (STRICT)

- Return only one final headline
- Write in English
- Maximum 200 characters
- Do not write explanations
- Do not provide multiple options
- Do not include any extra text or sections

### Content rules

- Keep the headline simple, clear, and professional
- Prefer short, direct constructions (e.g. "React Developer | Next.js, TypeScript")
- Include 2–4 relevant technologies only if they add value
- Mention openness to remote roles only if it fits naturally

### Restrictions

- Do NOT use hype or buzzwords (e.g. "passionate", "results-driven", "guru", "ninja", "rockstar")
- Do NOT use phrases like "specializing in", "expertise in", "leveraging"
- Do NOT exaggerate experience or seniority
- Do NOT invent industries, achievements, or roles

### Writing style

- Use natural, human-like LinkedIn language
- Avoid corporate clichés and overcomplicated phrasing
- Prefer clarity over creativity

### Candidate data

Primary role: ${formData.role}
Overall experience: ${formData.experience}
Core technologies: ${uniqueTechs.slice(0, 10).join(", ") || "Not specified"}
`
)