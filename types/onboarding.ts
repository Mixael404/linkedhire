export interface OnboardingData {
  // Step 1
  startMethod: "resume" | "manual" | "";
  resumeFile: string;
  // Step 2
  role: string;
  customRole: string;
  experience: string;
  technologies: string[];
  customTechnology: string;
}

export const defaultOnboardingData: OnboardingData = {
  startMethod: "",
  resumeFile: "",
  role: "",
  customRole: "",
  experience: "",
  technologies: [],
  customTechnology: "",
};

export interface StoredOnboarding {
  step: number;
  formData: OnboardingData;
}

export const ONBOARDING_STORAGE_KEY = "linkedhire_onboarding";

export const STEP_FIELDS: Record<number, (keyof OnboardingData)[]> = {
  0: ["startMethod"],
  1: ["role", "experience"],
  2: [], // technologies is optional
};
