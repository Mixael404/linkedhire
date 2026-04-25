import { ResolvedFormData } from "@/app/api/generate-profile/route";
import { ExperienceInputData } from "./experience.prompt";

export const PROJECT_TYPE_LABEL: Record<string, string> = {
   saas_product: "SaaS / live product with real users",
   mobile_app: "Published mobile application",
   open_source: "Own open source project / library",
   open_source_contrib: "Contribution to an existing open source project",
   design_system: "Design system / UI component library",
   api_service: "Standalone API / backend service / microservice",
   freelance: "Freelance / custom development for a client",
   internal_tool: "Internal tool / automation (built within employment)",
   side_project: "Pet project / personal experiment",
   hackathon: "Hackathon project",
   academic: "Academic / thesis / research project",
   volunteer: "Volunteer / non-profit project",
};

export const PROJECT_ROLE_LABEL: Record<string, string> = {
   solo: "Solo - full ownership from start to finish",
   developer: "Developer (individual contributor on a team)",
   "co-founder": "Co-founder / co-owner",
   lead: "Team lead / primary owner",
   architect: "Architect / Tech Lead",
   fullstack: "Full-stack developer",
   frontend: "Frontend developer",
   backend: "Backend developer",
   mobile: "Mobile developer",
   devops: "DevOps / Infrastructure engineer",
   contributor: "Contributor (part of a larger team)",
   mentor: "Mentor / code reviewer",
};

export const projectPrompt = (proj: ExperienceInputData, data: ResolvedFormData): string => {
   return `You are a senior engineer and technical interviewer at a top US tech company.

Your task is to generate a HIGH-QUALITY LinkedIn "Projects" section entry.

This section is used to evaluate how a candidate THINKS and BUILDS systems - not just what they achieved.

---

INPUT DATA:

TARGET PROFILE:
- Target role: ${data.role}
- Core technologies: ${data.technologies.join(", ")}

PROJECT DATA:
- Project name: ${proj.company}
- Role: ${proj.position}
- Tasks: ${proj.tasks.join("; ")}
- Technologies: ${proj.technologies.join(", ")}
- Achievements: ${proj.achievements.join("; ")}
- Needs achievement help: ${proj.needsAchievementHelp ? "Yes" : "No"}

OPTIONAL:
- Project type: ${PROJECT_TYPE_LABEL[proj.projectType as string] || "Not specified"}
- Project role: ${PROJECT_ROLE_LABEL[proj.projectRole as string] || "Not specified"}
- Project URL: ${proj.projectUrl || "Not specified"}

---

CORE OBJECTIVE:

Demonstrate:
- system design thinking
- architecture decisions
- technical depth
- ability to build real systems independently

This is NOT a job description and NOT an achievement list.

---

OUTPUT FORMAT:

1. First line:
<Project Name> - <what it is in one line>

2. Then 4–6 bullet points

3. Optional last line:
Project link: <url>

---

MANDATORY STRUCTURE:

• Bullet 1 (Context - REQUIRED):
- what the system is
- who it is for
- what problem it solves

• Remaining bullets MUST focus on:

1) Architecture decisions
- how the system is structured
- frontend/backend interaction
- state management / data flow

2) Key technical choices
- why specific technologies were used
- important trade-offs (if possible)

3) Complex parts
- what was non-trivial
- what required engineering thinking

4) Ownership
- built from scratch
- designed core logic
- defined structure

---

CRITICAL RULES:

1. DO NOT focus on generic achievements
- avoid "improved performance", "increased UX" unless directly tied to a decision

2. Every bullet must answer:
→ "How was this built?" or "Why was it built this way?"

3. Show engineering thinking:
- structure
- decisions
- trade-offs
- constraints

4. If input is weak:
→ infer a reasonable architecture based on:
   - technologies
   - type of project
   - target role

But:
- do NOT invent fake business metrics
- do NOT hallucinate unrealistic complexity

---

TECHNOLOGIES:

- Must be embedded naturally
- Show how they were used, not just mentioned

---

ROLE / SENIORITY:

If role is provided:
→ reflect ownership level:
- "designed", "architected", "implemented core logic"

---

WRITING STYLE:

- technical and precise
- slightly more "engineering-oriented" than Experience section
- less marketing, more substance
- still readable for recruiters

---

POSITIONING:

The result should feel like:
→ "this person understands how systems are built"

---

EXAMPLE STYLE:

Task Management App - Web application for organizing team workflows

- Designed a client-server architecture with React frontend and REST API backend
- Implemented state management using Redux Toolkit to handle complex UI interactions
- Structured API communication to minimize redundant requests and ensure consistency
- Built reusable component system to simplify feature expansion
- Designed data models to support flexible task relationships and filtering

Project link: https://...

---

Now generate the Projects section.`;
};
