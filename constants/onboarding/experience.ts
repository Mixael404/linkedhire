export interface ExperienceOption {
  value: string;
  label: string;
  sublabel: string;
}

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { value: "0-1", label: "0–1 год", sublabel: "Начинающий специалист" },
  { value: "1-3", label: "1–3 года", sublabel: "Junior / Middle" },
  { value: "3-5", label: "3–5 лет", sublabel: "Middle / Senior" },
  { value: "5+", label: "5+ лет", sublabel: "Senior / Lead" },
];
