import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const resumeSummaryPrompt = (data: ResolvedFormData) => (`
	You are an expert resume writer specializing in high-performing Western-style tech resumes (EU/US market).

Your task is to generate a **professional resume Summary section** that strictly follows modern hiring standards and recruiter expectations.

---

## INPUT DATA

* Target role: ${data.role}
* Experience level: ${data.experience}
* Core technologies: ${data.technologies.join(', ')}
  ${data.taskTypes?.length ? `- Task domains: ${data.taskTypes.join(', ')}` : ''}
* Career goal: ${data.goal}
* Target region: ${data.targetRegion}
* English level: ${data.englishLevel}

WORK EXPERIENCE SIGNALS:
${data.workExperiences.map(exp => `Company: ${exp.company}
Position: ${exp.position}
Tasks: ${exp.tasks.join('; ')}
Technologies: ${exp.technologies.join(', ')}
Project type: ${exp.projectType || 'Not specified'}`).join('\n')}

---

## STRICT REQUIREMENTS

1. Output ONLY the summary text. No explanations, no formatting notes.
2. Length: 3–5 sentences maximum.
3. Language: English only.
4. Tone: professional, confident, concise (no fluff, no storytelling).
5. Do NOT repeat the input literally — synthesize and generalize.

---

## STRUCTURE (MANDATORY)

Follow this exact logical structure:

1. **Positioning sentence**

   * Role + experience level + specialization
   * Example: "Senior Frontend Engineer with 5+ years of experience building complex SaaS products and real-time interfaces."

2. **Core expertise**

   * Mention key technologies AND type of problems solved
   * Focus on complexity (not just tools)

3. **Impact / value**

   * Describe what this engineer improves (performance, UX, scalability, maintainability, etc.)
   * If no explicit metrics are provided, infer realistic outcomes (but DO NOT invent specific numbers)

4. **Product / domain context (optional but preferred)**

   * SaaS, dashboards, real-time systems, internal tools, etc.

5. **Career direction (1 short phrase)**

   * Align with target role and region

---

## IMPORTANT RULES

* ❌ Do NOT use phrases like:

  * "responsible for"
  * "worked on"
  * "passionate about"
  * "hardworking"

* - Do NOT list technologies without context

* - Do NOT repeat the same idea twice

* - Do NOT mention English level explicitly

* - Use strong verbs: "build", "design", "optimize", "improve", "scale"

* - Emphasize complexity and ownership

* - Make the candidate sound like a product-oriented engineer, not just a coder

---

## OUTPUT EXAMPLE (STYLE REFERENCE)

Senior Frontend Engineer with 5+ years of experience building complex SaaS products and real-time data-driven interfaces. Specializes in React and TypeScript, designing scalable frontend architectures and handling high-frequency data updates. Improves performance, simplifies complex UI workflows, and ensures maintainable codebases in production environments. Experienced in dashboards, internal tools, and real-time systems. Seeking frontend roles focused on product-driven development in EU markets.

---

Generate the summary now.
	
`);