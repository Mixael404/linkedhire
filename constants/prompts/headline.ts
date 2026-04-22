import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const headlinePrompt = (formData: ResolvedFormData, uniqueTechs: string[], recentExperienceSummary: string): string => (
    `
Generate a high-conversion LinkedIn headline based strictly on the provided data.

INPUT DATA:
- Role: ${formData.role}
- Experience: ${formData.experience}
- Technologies: ${uniqueTechs.join(", ")}
- Goal: ${formData.goal}
- Target region: ${formData.targetRegion}
- English level: ${formData.englishLevel}
- Work experience: ${recentExperienceSummary}

CRITICAL RULES:

1. LENGTH:
   - Maximum 200 characters (hard limit)

2. STRUCTURE (MANDATORY):
   [Target Role] | [Top 3–5 technologies] | [Value / specialization]

3. ROLE:
   - Normalize to a standard global title (e.g. "Frontend Engineer", "Backend Engineer")
   - If customRole exists and is meaningful → use it
   - Do NOT mix multiple roles

4. TECHNOLOGIES:
   - Select ONLY the most relevant and high-signal technologies
   - Prioritize those used in real work experience
   - Avoid long lists

5. VALUE:
   - Must describe real impact or specialization
   - Use concrete phrasing

ALLOWED VALUE PATTERNS:
- Building scalable web applications
- High-performance frontend systems
- API & microservices development
- Shipping product features end-to-end
- Performance optimization & UX improvement

FORBIDDEN:
- “Looking for opportunities”
- “Open to work”
- “Passionate developer”
- Any vague or generic statements

6. PRIORITIZATION:
   - Most important keywords must appear in the first ~60 characters
   - Headline must be readable, not keyword spam

7. DATA USAGE:
   - Do NOT invent anything
   - If data is weak → simplify, do NOT hallucinate

8. STYLE:
   - Use "|" as separator
   - Clean, minimal, recruiter-friendly
   - No repetition

FINAL CHECK:
- <= 200 characters
- Role + Tech + Value present
- Sounds like a real market-ready headline
`
)