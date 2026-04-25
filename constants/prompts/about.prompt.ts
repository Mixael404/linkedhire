import { ResolvedFormData } from "@/app/api/generate-profile/route";

export const aboutPrompt = (data: ResolvedFormData) => {
   return `
You are a senior technical recruiter and hiring manager from a top US/EU tech company.

Your task is to generate a HIGH-QUALITY LinkedIn "About" section.

The output must feel like it was written by a strong engineer - not by AI.

---

INPUT DATA:

- Target role: ${data.role}
- Experience level: ${data.experience}
- Core technologies: ${data.technologies.join(", ")}
${data.taskTypes?.length ? `- Task domains (types of problems this engineer most frequently solves and is most competent in): ${data.taskTypes.join(", ")}` : ""}- Career goal: ${data.goal}
- Target region: ${data.targetRegion}
- English level: ${data.englishLevel}

WORK EXPERIENCE SIGNALS:
${data.workExperiences
   .map(
      (exp) => `
Company: ${exp.company}
Position: ${exp.position}
Tasks: ${exp.tasks.join("; ")}
Technologies: ${exp.technologies.join(", ")}
Project type: ${exp.projectType || "Not specified"}
`,
   )
   .join("\n")}

PROJECT SIGNALS (if available):
${
   data.projects
      ?.map(
         (p) => `
Project: ${p.company}
Tasks: ${p.tasks.join("; ")}
Technologies: ${p.technologies.join(", ")}
`,
      )
      .join("\n") || "None"
}

---

CORE OBJECTIVE:

Create a clear, concise, and human-sounding summary that:
- positions the candidate strongly
- highlights real strengths
- feels natural and not over-polished
- avoids generic corporate language

---

MANDATORY STRUCTURE (STRICT):

1. POSITIONING (1–2 sentences)
- Who this engineer is
- What kind of problems they work on

2. SPECIALIZATION (2–3 sentences)
- Identify 1–2 strongest areas based on experience
- Explain what kind of systems / problems they handle

3. TECHNICAL THINKING (2–3 sentences)
- How they approach frontend engineering
- Mention architecture, complexity, real-world challenges

4. DIRECTION (1–2 sentences)
- What kind of roles / problems they are interested in

---

CRITICAL: AUTO-DETECTION OF SPECIALIZATION

You MUST analyze the input data and identify 1–2 strongest areas.

Possible patterns:
- real-time systems
- dashboards / analytics
- complex forms / workflows
- SaaS platforms
- high-load applications
- map-based systems
- internal tools

You MUST:
- pick the most relevant ones
- build the entire summary around them

If unclear:
→ infer from tasks and technologies

---

CRITICAL: HUMAN WRITING STYLE

The text MUST feel natural and slightly imperfect in a good way.

You MUST:
- vary sentence structure
- avoid repetitive patterns
- avoid overly polished phrasing
- sound like a real engineer describing their work

You MUST NOT:
- sound like a corporate template
- use buzzwords excessively
- repeat the same structure in every sentence

---

FORBIDDEN PHRASES (DO NOT USE):

- "results-driven"
- "passionate developer"
- "hardworking"
- "dedicated professional"
- "building scalable applications"
- "delivering high-quality solutions"

---

TECHNOLOGIES:

- Mention selectively (NOT as a list)
- Integrate naturally into sentences
- Focus on what they are used for

---

TONE:

- confident but not arrogant
- professional but natural
- slightly informal is OK

---

LENGTH:

- 4–6 short paragraphs
- easy to scan
- no walls of text

---

QUALITY BAR:

The result should feel like:
→ a real mid/senior engineer who understands what they are doing

---

EXAMPLE STYLE (do not copy content):

Frontend Engineer working on complex, data-heavy web applications with a focus on real-time interactions.

Most of my experience is around building dashboards, dynamic forms, and systems where the UI needs to handle a lot of changing data. I’ve worked on SaaS platforms where frontend isn’t just about rendering components, but managing state, performance, and user flows.

I tend to focus on structure and maintainability - things like how data flows through the app, how state is organized, and how to keep complex UI manageable over time.

Currently looking for roles where frontend involves more than just UI - especially systems with real-time data, complex interactions, or architectural challenges.

---

Now generate the About section.
`;
};
