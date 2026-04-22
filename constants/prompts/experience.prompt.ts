import { ResolvedFormData } from "@/app/api/generate-profile/route";

export type ExperienceInputData = ResolvedFormData["workExperiences"][number] & {
  overallExperience?: string;
  targetRole?: string;
};

export const experiencePrompt = (data: ExperienceInputData): string => {
  const tasks = data.tasks?.filter(Boolean).map((t) => `- ${t}`).join('\n') || '- Not provided';
  const technologies = data.technologies?.length ? data.technologies.join(', ') : 'Not specified';

  const endLabel = data.isCurrent
    ? 'Present'
    : data.endMonth && data.endYear
    ? `${data.endMonth} ${data.endYear}`
    : 'Unknown';
  const duration = `${data.startMonth} ${data.startYear} – ${endLabel}`;

  const hasAchievements = (data.achievements?.filter(Boolean).length ?? 0) > 0;

  const achievementBlock = !hasAchievements || data.needsAchievementHelp
    ? `No explicit achievements provided.

INSTRUCTION: Do not just restate the tasks. Instead, analyze the full picture — the role, the company, the tech stack, and the tasks — and infer what engineering or business outcomes this work most likely produced.

Think about:
- What problem was the team or product trying to solve?
- What did these tasks enable or improve?
- What would a recruiter expect a person in this role to have delivered?

Then write 1–2 specific, believable outcomes that fit naturally into the bullet list.
Outcome types by domain:
- Frontend: improved load performance, reduced bugs, faster delivery of UI features, better accessibility, more consistent UI
- Backend / API: improved throughput or latency, better reliability, cleaner integrations, faster onboarding for consuming teams
- DevOps / Infra: reduced deployment friction, better observability, shorter lead time, fewer incidents
- Mobile: improved crash-free rate, better onboarding flow, reduced app size, smoother animations
- Fullstack: faster shipping, better test coverage, cleaner architecture, product improvements

Rules: no fabricated percentages, revenue figures, or user counts unless the tasks strongly imply them. Use qualitative phrasing when metrics are unknown ("cut release cycle", "reduced manual QA effort", "improved page stability").`
    : `Provided achievements — use as the foundation of the impact layer:
${data.achievements.filter(Boolean).map((a) => `- ${a}`).join('\n')}

Rewrite them into strong, specific, recruiter-readable bullets. Do not water them down or replace with generic claims.`;

  return `Generate a LinkedIn Experience section description for one role.

ROLE CONTEXT:
- Position: ${data.position}
- Company: ${data.company}
- Period: ${duration}
- Overall career level: ${data.overallExperience ?? 'not specified'}
- Target role being pursued: ${data.targetRole ?? 'not specified'}

TASKS PERFORMED:
Technologies: ${technologies}

Tasks:
${tasks}

ACHIEVEMENTS / IMPACT:
${achievementBlock}

---

OUTPUT FORMAT:

Line 1 — context sentence (no bullet, no dash):
One sentence describing what the company or product does and the domain/scale of the work.
This is NOT about the candidate — it's about where they worked.
Examples:
  "B2B monitoring platform for city emergency services in Moscow, serving real-time dispatch operators."
  "E-commerce SaaS with 500K+ monthly users — multi-vendor marketplace with logistics and analytics modules."
  "Internal CRM for a network of retail stores, replacing a legacy Excel-based workflow."
  "Early-stage startup building developer tooling for cloud cost optimization."
If the company is well known (Yandex, Sber, Tinkoff, EPAM, etc.), name it and add the product context. If unknown — infer the product domain from tasks and stack.

Lines 2–6 — bullet points starting with "-":
3–5 bullets describing the candidate's work and impact.

Total output: 600–1000 characters. Long enough to convey real substance, short enough to scan.

---

WRITING APPROACH — READ CAREFULLY:

The goal is NOT to reproduce the task list in bullet form. The goal is to take the raw material (tasks + stack + context) and rewrite it as a narrative of real engineering work with outcomes.

For each bullet, ask:
1. What specifically was built or changed?
2. In what context (which system, feature, workflow, team)?
3. What was the result or purpose — what got better, faster, more reliable, or simpler?

Good bullet: "Rebuilt the real-time notification pipeline using SignalR to support concurrent sessions across city districts — cut alert delivery latency and reduced missed incident flags by operators."
Bad bullet: "Worked on real-time notifications using SignalR."

Good bullet: "Integrated 2GIS mapping SDK from scratch, building dynamic marker clustering and filter logic for 300+ daily active incident points across Moscow."
Bad bullet: "Integrated 2GIS map."

The difference: specificity of what was done + the engineering context + the outcome or scale.

---

MANDATORY RULES:

1. Start with the context sentence (no bullet). Then bullets.
2. Every bullet must include: action + what/where + result or purpose. No bullet with only an action and no outcome.
3. Technologies: embed where they add precision. Do not list them as a standalone bullet.
4. Seniority: match scope to the career level. A junior role should not sound like a CTO initiative.
5. If company or position is in Russian/Cyrillic, transliterate to Latin (Яндекс → Yandex, ООО Ромашка → OOO Romashka).

FORBIDDEN:
- Copying tasks verbatim into bullets
- Bullets with no outcome, no result, no purpose (e.g., "Worked on X", "Helped with Y")
- Weak openers: "Responsible for", "Participated in", "Was involved in", "Assisted with"
- AI-pattern phrases: "leveraged X to drive Y outcomes", "utilized best-in-class Z"
- Filler adjectives: robust, scalable, efficient, innovative, cutting-edge
- Invented hard metrics (percentages, revenue, user counts) unless they come from the achievements input
- Words: passionate, motivated, hardworking, team player, fast learner

FINAL CHECK:
- Line 1 tells the reader what company/product this was
- Bullets show real engineering work with outcomes, not a duty list
- Reads like a real person wrote it about real work
- Compact enough to scan in 10 seconds but substantial enough to be convincing
`;
};
