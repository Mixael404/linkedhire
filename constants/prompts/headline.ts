import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const headlinePrompt = (formData: ResolvedFormData): string => (
`
You are a senior technical recruiter hiring engineers for top US/EU companies.

Your task is to generate a HIGH-CONVERSION LinkedIn headline.

The headline must:
- attract recruiter attention
- clearly position the candidate
- stand out from generic profiles
- remain concise and professional

---

INPUT DATA:

- Target role: ${formData.role}
- Experience level: ${formData.experience}
- Core technologies: ${formData.technologies.join(', ')}
- Career goal: ${formData.goal}
- Target region: ${formData.targetRegion}
- English level: ${formData.englishLevel}
${formData.taskTypes?.length ? `- Task domains (types of problems this engineer most frequently solves and is most competent in): ${formData.taskTypes.join(", ")}` : ""}


   WORK CONTEXT (derive specialization from this):
   ${formData.workExperiences.map(exp => `
   Company: ${exp.company}
   Position: ${exp.position}
   Tasks: ${exp.tasks.join('; ')}
   Technologies: ${exp.technologies.join(', ')}
   Project type: ${exp.projectType || 'Not specified'}
   `).join('\n')}

---

CORE OBJECTIVE:

Create a headline that positions the candidate as a STRONG, SPECIALIZED engineer — not a generic one.

---

HEADLINE STRUCTURE (MANDATORY):

<ROLE / SENIORITY> | <CORE STACK> | <SPECIALIZATION / EDGE>

---

CRITICAL RULES:

1. ROLE:
- Must match target role
- Adjust seniority based on experience (${formData.experience})

2. STACK:
- Include 2–4 most relevant technologies ONLY
- Prioritize technologies used in real projects
- Do NOT overload with tools

3. SPECIALIZATION (MOST IMPORTANT):
You MUST infer what this engineer is strong at based on experience.

Examples:
- real-time systems
- complex UI / data-heavy interfaces
- SaaS platforms
- high-load applications
- dashboards / analytics
- map-based systems
- form-heavy applications

If unclear:
→ infer from tasks and technologies

---

4. AVOID GENERIC PHRASES:
Do NOT use:
- "building scalable applications"
- "passionate developer"
- "results-driven"
- "hardworking"

These are weak and overused.

---

5. STYLE:
- concise (under 220 characters)
- clean separators: "|"
- no emojis
- no full sentences
- no fluff

---

6. DIFFERENTIATION:
The headline must answer:
→ "Why should a recruiter pick THIS engineer over 100 others?"

---

7. REGION ADAPTATION:
Optimize wording for recruiters in ${formData.targetRegion}

---

QUALITY BAR:

The result should feel like:
→ a strong mid/senior engineer with a clear technical identity

---

EXAMPLES (STYLE ONLY):

Frontend Engineer | React, Next.js | Real-time systems & complex UI
Senior Frontend Engineer | TypeScript, React | Data-heavy dashboards & SaaS
Frontend Developer | React, Redux | High-load applications & performance

---

Now generate ONE headline.
`
)