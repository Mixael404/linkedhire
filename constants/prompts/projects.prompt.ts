import { ExperienceInputData } from "./experience.prompt";

const PROJECT_TYPE_LABEL: Record<string, string> = {
  saas_product:        'SaaS / live product with real users',
  mobile_app:          'Published mobile application',
  open_source:         'Own open source project / library',
  open_source_contrib: 'Contribution to an existing open source project',
  design_system:       'Design system / UI component library',
  api_service:         'Standalone API / backend service / microservice',
  freelance:           'Freelance / custom development for a client',
  internal_tool:       'Internal tool / automation (built within employment)',
  side_project:        'Pet project / personal experiment',
  hackathon:           'Hackathon project',
  academic:            'Academic / thesis / research project',
  volunteer:           'Volunteer / non-profit project',
};

const PROJECT_ROLE_LABEL: Record<string, string> = {
  solo:         'Solo — full ownership from start to finish',
  developer:    'Developer (individual contributor on a team)',
  'co-founder': 'Co-founder / co-owner',
  lead:         'Team lead / primary owner',
  architect:    'Architect / Tech Lead',
  fullstack:    'Full-stack developer',
  frontend:     'Frontend developer',
  backend:      'Backend developer',
  mobile:       'Mobile developer',
  devops:       'DevOps / Infrastructure engineer',
  contributor:  'Contributor (part of a larger team)',
  mentor:       'Mentor / code reviewer',
};

export const projectPrompt = (data: ExperienceInputData): string => {
  const tasks = data.tasks?.filter(Boolean).map((t) => `- ${t}`).join('\n') || '- Not provided';
  const technologies = data.technologies?.length ? data.technologies.join(', ') : 'Not specified';

  const endLabel = data.isCurrent
    ? 'Present'
    : data.endMonth && data.endYear
    ? `${data.endMonth} ${data.endYear}`
    : 'Unknown';
  const duration = `${data.startMonth} ${data.startYear} – ${endLabel}`;

  const contextLines: string[] = [];
  if (data.projectType) contextLines.push(`Project type: ${PROJECT_TYPE_LABEL[data.projectType] ?? data.projectType}`);
  if (data.projectRole) contextLines.push(`Candidate's role: ${PROJECT_ROLE_LABEL[data.projectRole] ?? data.projectRole}`);
  if (data.projectUrl)  contextLines.push(`Project URL / repo: ${data.projectUrl}`);
  if (data.overallExperience) contextLines.push(`Overall career level: ${data.overallExperience}`);
  if (data.targetRole)  contextLines.push(`Target role being pursued: ${data.targetRole}`);

  const hasAchievements = (data.achievements?.filter(Boolean).length ?? 0) > 0;

  const achievementBlock = !hasAchievements || data.needsAchievementHelp
    ? `No explicit outcomes provided.

INSTRUCTION: Infer 1–2 realistic, specific outcomes from the tasks, technologies, and project context.
- For saas_product / mobile_app: user-facing improvement, performance gain, or business problem solved
- For open_source / open_source_contrib: adoption, developer experience, or what the contribution unblocked
- For design_system: consistency achieved, delivery speed improved, or UI regressions reduced
- For api_service: reliability, latency, or integration quality
- For freelance: client problem solved, delivery outcome
- For internal_tool: time saved, process improved, team benefit
- For side_project / hackathon / academic: technical goal achieved, what was demonstrated or learned
- No invented user counts, revenue figures, or hard percentages unless clearly implied by the tasks
- Use qualitative outcomes when metrics are unknown: "reduced manual effort", "enabled consistent UI", "simplified deployment"`
    : `Provided outcomes — use as the primary proof layer:
${data.achievements.filter(Boolean).map((a) => `- ${a}`).join('\n')}

Rewrite into strong, specific bullets. Keep the substance accurate.`;

  return `Generate a LinkedIn Projects section description for one project.

PROJECT INPUT:
- Project / organization name: ${data.company}
- Candidate's role title: ${data.position}
- Period: ${duration}
${contextLines.length ? contextLines.join('\n') : '- No additional project context provided'}

WHAT WAS BUILT / DONE:
Technologies: ${technologies}

Tasks:
${tasks}

OUTCOMES:
${achievementBlock}

---

OUTPUT FORMAT — STRICT:

Line 1: Project title (6–10 words). What was built, plain text, no symbols, no markdown.
  - If the project name is clear and meaningful, use or adapt it
  - If it is generic ("My Project", "Work"), write a title that captures what was actually built
  - Example: "User Account System and Volunteer Rating for Добро.рф"

Line 2: Context sentence (no bullet, no dash).
  THIS IS MANDATORY. The reader must understand what this project IS before reading about the contributions.
  Tell them: what is this product/system, who uses it, and what domain it lives in.
  Use any available signals — company name, position, tasks, technologies, project type — to reconstruct the product context.
  If the project is a known platform, product, or organization (e.g. Добро.рф, GitHub, Yandex, RZD), describe it by name.
  Examples:
    "Добро.рф — Russia's national volunteer platform serving over 1 million registered users — developed core account management and engagement features."
    "Open source React component library used as the design foundation for a B2B SaaS product suite."
    "Freelance project for a logistics company — built an internal shipment tracking dashboard replacing a manual spreadsheet workflow."
    "Personal side project: a CLI tool for managing local dev environment configs, published on npm."
  BAD (do not write this): "Developed interfaces and UI components for a web platform."
  BAD: Repeating the candidate's tasks here — this line is about the PROJECT, not about you.

Lines 3–6: 3–4 bullets starting with "-".
  Each bullet: what the candidate specifically did + in what context + what the result or purpose was.

Total output: 400–650 characters. Tight, concrete, readable in under 10 seconds.

Do NOT include: headers, markdown, explanations, role title, company name repeated in bullets, technologies as a standalone bullet.

---

WHAT A STRONG PROJECT DESCRIPTION LOOKS LIKE:

The LinkedIn Projects section is read differently from Experience. The reader expects:
- To understand what the project IS immediately (line 2)
- To see specific technical contributions by THIS candidate
- To see evidence of real impact or outcome

Strong example (full output):
User Accounts and Volunteer Ranking for Добро.рф
Добро.рф — Russia's national volunteer platform with 1M+ registered users — contributed core account and engagement features as part of a government digital services initiative.
- Built the user dashboard and organization profile pages, centralizing key volunteer activity data in one view
- Implemented the government services (Gosuslugi) login flow, enabling seamless SSO for millions of existing users
- Developed the RZD organization ranking page with sortable, filterable tables for partner visibility metrics
- Live version: dobro.ru

Weak example (do NOT produce this):
User Accounts and Rating System for Добро рф
- Developed user dashboard interfaces to enhance navigation and user experience
- Implemented UI for government service login flow, streamlining user authorization
- Built an organization ranking page for RZD, improving data visibility for users

The difference: the strong version explains what the project IS before talking about the work. The bullets reference specific user flows, real organizations, and concrete features — not generic UI tasks.

---

WRITING RULES:

1. Each bullet: active verb + specific feature or component + result or context. Never just "Developed X".

2. If projectRole is "solo": bullets reflect full ownership — design, implementation, delivery
   If projectRole is "developer" or "contributor": name the specific contribution within the larger system

3. If a project URL is provided: end with a short line — "Live version: [url]" or "Repo: [url]"

4. If company name or position is in Russian/Cyrillic, transliterate to Latin — do not translate:
   Добро.рф → Dobro.rf (keep original if it's a domain), Яндекс → Yandex

5. Adjust framing to project type:
   - saas_product / mobile_app: emphasize user-facing value and adoption
   - open_source / open_source_contrib: emphasize developer experience and what the contribution enabled
   - design_system: emphasize consistency, token architecture, team adoption
   - api_service: emphasize reliability, integration surface, engineering decisions
   - freelance / client_project: emphasize client problem and delivery
   - internal_tool: emphasize team productivity and what manual work was eliminated
   - side_project / hackathon: emphasize personal initiative and what was demonstrated

STRICTLY FORBIDDEN:
- Skipping line 2 (the project context sentence) — this is the most important line
- Generic bullets that could describe any project: "Developed features", "Fixed bugs", "Improved UX"
- Weak openers: "Responsible for", "Worked on", "Was involved in"
- AI-sounding patterns: "Leveraged X to achieve Y outcomes", "Utilized best-in-class Z"
- Filler adjectives: robust, scalable, cutting-edge, innovative, state-of-the-art
- Invented metrics, user counts, revenue figures not present in the input
- Bullets that just restate the task list with no context or outcome

FINAL CHECK:
- Line 2 tells the reader what the project IS (not what the candidate did)
- Bullets show specific contributions with context, not generic task descriptions
- Reads like a real engineer describing something they built
- Under 650 characters total
`;
};
