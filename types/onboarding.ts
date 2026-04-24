export interface WorkExperience {
  company: string;
  position: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  tasks: string[];
  technologies: string[];
  achievements: string[];
  needsAchievementHelp: boolean;
  // Project section enrichment (optional)
  projectType: 'saas_product' | 'mobile_app' | 'open_source' | 'open_source_contrib' | 'design_system' | 'api_service' | 'freelance' | 'internal_tool' | 'side_project' | 'hackathon' | 'academic' | 'volunteer' | '';
  projectRole: 'solo' | 'developer' | 'lead' | 'contributor' | 'co-founder' | 'architect' | 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'mentor' | '';
  projectUrl: string;
}

export const defaultWorkExperience: WorkExperience = {
  company: "",
  position: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  isCurrent: false,
  tasks: [""],
  technologies: [],
  achievements: [],
  needsAchievementHelp: false,
  projectType: "",
  projectRole: "",
  projectUrl: "",
};

export interface OnboardingData {
  // Step 1
  startMethod: "resume" | "manual" | "existing" | "";
  resumeFile: string;
  // Step 2
  role: string;
  customRole: string;
  experience: string;
  taskTypes: string[];
  // Step 3
  technologies: string[];
  customTechnology: string;
  // Step 4
  goal: string;
  blockers: string[];
  blockersOther: string;
  applicationsCount: string;
  // Step 5
  workExperiences: WorkExperience[];
  // Step 6
  targetRegion: string;
  englishLevel: string;
}

export const defaultOnboardingData: OnboardingData = {
  startMethod: "",
  resumeFile: "",
  role: "",
  customRole: "",
  experience: "",
  taskTypes: [],
  technologies: [],
  customTechnology: "",
  goal: "",
  blockers: [],
  blockersOther: "",
  applicationsCount: "",
  workExperiences: [],
  targetRegion: "",
  englishLevel: "",
};

export interface StoredOnboarding {
  step: number;
  formData: OnboardingData;
}

export const ONBOARDING_STORAGE_KEY = "linkedhire_onboarding";

export const STEP_FIELDS: Record<number, (keyof OnboardingData)[]> = {
  0: ["startMethod"],
  1: ["role", "experience"],
  2: [],
  3: ["goal", "applicationsCount"],
  4: [],
  5: ["targetRegion", "englishLevel"],
};
