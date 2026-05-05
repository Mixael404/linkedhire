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

export const MAX_WORK_EXPERIENCES = 6;
export const MAX_TASKS = 20;
export const MAX_ACHIEVEMENTS = 20;
export const MAX_SKILLS_PER_EXP = 20;
export const MAX_COMPANY_LENGTH = 50;
export const MAX_POSITION_LENGTH = 50;
export const MAX_TASK_LENGTH = 150;
export const MAX_ACHIEVEMENT_LENGTH = 150;

export const MONTHS = [
   { value: "01", label: "Январь" },
   { value: "02", label: "Февраль" },
   { value: "03", label: "Март" },
   { value: "04", label: "Апрель" },
   { value: "05", label: "Май" },
   { value: "06", label: "Июнь" },
   { value: "07", label: "Июль" },
   { value: "08", label: "Август" },
   { value: "09", label: "Сентябрь" },
   { value: "10", label: "Октябрь" },
   { value: "11", label: "Ноябрь" },
   { value: "12", label: "Декабрь" },
];

export const TASK_PLACEHOLDERS = [
   "Разрабатывал интерфейсы на React",
   "Оптимизировал загрузку страниц",
   "Интегрировал API",
   "Настраивал CI/CD пайплайны",
   "Покрывал код тестами",
];

export const ACHIEVEMENT_PLACEHOLDERS = [
   "Ускорил загрузку страниц на 30%",
   "Снизил количество ошибок на 40%",
   "Увеличил покрытие тестами до 80%",
];