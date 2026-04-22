import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const aboutPrompt = (formData: ResolvedFormData) => {
  return `
  Generate a high-conversion LinkedIn "About" section based strictly on the provided data.

INPUT DATA:
- Role: ${formData.role}
- Experience: ${formData.experience}
- Technologies: ${formData.technologies}
- Target region: ${formData.targetRegion}
- English level: ${formData.englishLevel}
- Work experience: ${formData.workExperiences.map((e) => `${e.position} at ${e.company} (${e.startMonth} ${e.startYear} - ${e.isCurrent ? "Present" : `${e.endMonth} ${e.endYear}`})`).join("; ")}

CRITICAL RULES:

1. LENGTH:
   - 400–900 characters (optimal range)
   - Maximum readability, no long walls of text

2. STRUCTURE (MANDATORY):

Paragraph 1 — POSITIONING (2–3 lines):
- Who you are (role + specialization)
- What you build or focus on
- Must be clear in first 2 lines

Paragraph 2 — PROOF:
- Real experience or type of systems worked on
- Mention scale, complexity, or responsibility if available
- If achievements exist → integrate them naturally (no bullet list)

Paragraph 3 — STACK:
- Core technologies (grouped, not a long list)
- Only relevant technologies

Paragraph 4 — DIRECTION:
- What roles or type of work you are targeting
- Keep it natural (no “open to work” phrases)

3. STYLE:

- Short paragraphs (1–3 lines each)
- Easy to scan
- No emojis
- No bullet points
- No markdown formatting

4. NO FLUFF (STRICTLY FORBIDDEN):

Do NOT use:
- “passionate”
- “motivated”
- “hardworking”
- “team player”
- “fast learner”
- Any generic soft-skill phrases

5. CONTENT RULES:

- Focus on real engineering work, not abstract statements
- Use action-oriented language:
  - building
  - developing
  - optimizing
  - delivering
  - improving
  - scaling

- If experience is weak:
  → Focus on skills and type of problems solved
  → Do NOT fabricate achievements

6. ROLE CONSISTENCY:

- Must align with the headline direction
- Do NOT mix multiple roles

7. DATA USAGE:

- Prioritize real work experience over generic description
- Use technologies that appear in experience
- If data is missing → simplify, do NOT hallucinate

8. LANGUAGE:

- English only
- Clean, professional, natural tone

9. OUTPUT:

- Plain text only
- No explanations
- No labels like “About:”

FINAL CHECK:

- Clear positioning in first 2 lines
- Contains proof (not just claims)
- Contains stack (but not overloaded)
- Clear direction
- Reads like a real engineer, not AI text
  `
};
