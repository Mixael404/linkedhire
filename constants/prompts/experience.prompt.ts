import { ResolvedFormData } from "@/app/api/generate-profile/route";
import { PROJECT_ROLE_LABEL, PROJECT_TYPE_LABEL } from "./projects.prompt";

export type ExperienceInputData = ResolvedFormData["workExperiences"][number] & {
   overallExperience?: string;
   targetRole?: string;
};

export const experiencePrompt = (exp: ExperienceInputData, data: ResolvedFormData): string => {
   return `
      You are a senior technical recruiter and hiring manager from a top US tech company.

      Your task is to generate a HIGH-IMPACT LinkedIn Experience section for ONE role.

      The output must reflect a TOP 10% candidate profile — someone recruiters proactively reach out to.

      ---

      INPUT DATA:

      TARGET PROFILE:
      - Target role: ${data.role}
      - Career goal: ${data.goal}
      - Core technologies: ${data.technologies.join(", ")}
      ${data.taskTypes?.length ? `- Task domains (types of problems this engineer most frequently solves and is most competent in): ${data.taskTypes.join(", ")}` : ""}
      - Target region: ${data.targetRegion}
      - English level: ${data.englishLevel}

      ROLE DATA:
      - Company: ${exp.company}
      - Position: ${exp.position}
      - Start date: ${exp.startMonth} ${exp.startYear}
      - End date: ${exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}
      - Tasks: ${exp.tasks.join("; ")}
      - Technologies used: ${exp.technologies.join(", ")}
      - Achievements: ${exp.achievements.join("; ")}
      - Needs achievement help: ${exp.needsAchievementHelp ? "Yes" : "No"}
      - Project type: ${PROJECT_TYPE_LABEL[exp.projectType as string] || 'Not specified'}
      - Project role: ${PROJECT_ROLE_LABEL[exp.projectRole as string] || 'Not specified'}
      - Project URL: ${exp.projectUrl || 'Not specified'}

      ---

      CORE OBJECTIVE:

      Transform raw experience into a compelling, results-driven narrative that signals:
      - ownership
      - technical depth
      - business impact
      - seniority

      If project role is provided:
      → explicitly reflect it through ownership, leadership, or responsibility level in bullet points

      Even if the input is weak, the output MUST look strong and market-ready.

      ---

      OUTPUT FORMAT:

      1. First line:
      <Position> at <Company>

      2. Then 5–8 bullet points

      ---

      MANDATORY STRUCTURE:

      • Bullet 1 (Context — REQUIRED):
      Describe the product/system:
      - what was built
      - domain
      - scale (if inferable)
      If project type is provided:
      → incorporate it into the first bullet to clarify product context

      • Bullets 2–8:
      Mix of:
      - achievements
      - technical contributions
      - ownership
      - system improvements

      ---

      CRITICAL RULES:

      1. Every bullet MUST:
      - start with a strong action verb
      - include technical context
      - be specific and meaningful

      2. At least 3 bullets MUST include IMPACT

      3. Seniority signals MUST be present:
      - ownership
      - architecture decisions
      - system-level thinking
      - cross-team work

      ---

      ACHIEVEMENTS GENERATION (CRITICAL):

      If achievements are EMPTY and Needs achievement help = Yes:

      You MUST NOT leave the experience weak or generic.

      You MUST actively RECONSTRUCT strong, realistic achievements by analyzing:
      - tasks
      - technologies
      - role seniority
      - expectations for this role in Western companies

      Your goal is NOT to describe the input — but to UPGRADE it.

      You MUST:
      - transform responsibilities into results
      - infer likely outcomes of the work
      - add realistic impact

      You MUST NOT:
      - invent unrealistic metrics
      - fabricate specific business numbers

      You SHOULD use believable impact such as:
      - improved performance / reduced latency
      - enhanced UX
      - increased reliability
      - improved scalability
      - better developer productivity

      If input is weak → OUTPUT MUST STILL LOOK STRONG.

      ---

      WRITING STYLE:

      - Western LinkedIn style
      - concise but dense
      - no fluff
      - no generic phrases ("responsible for", "worked on")

      ---

      POSITIONING:

      Optimize for recruiters in ${data.targetRegion}
      Align with target role: ${data.role}

      If project URL is provided and looks valid:
        → include it as a final line:
        "Project link: <url>"

      ---

      Now generate the Experience section.
      `;
};
