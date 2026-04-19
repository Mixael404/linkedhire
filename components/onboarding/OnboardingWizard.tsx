"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
import {
  HiArrowRight,
  HiArrowLeft,
  HiExclamationTriangle,
  HiXMark,
} from "react-icons/hi2";

import {
  OnboardingData,
  defaultOnboardingData,
  ONBOARDING_STORAGE_KEY,
  STEP_FIELDS,
  StoredOnboarding,
} from "../../types/onboarding";
import ProgressBar from "./ProgressBar";
import Step1StartMethod from "./steps/Step1StartMethod";
import Step2BasicInfo from "./steps/Step2BasicInfo";
import Step3Technologies from "./steps/Step3Technologies";
import Step4Goals, { GOAL_OPTIONS, BLOCKER_OPTIONS, APPLICATIONS_OPTIONS } from "./steps/Step4Goals";
import Step5WorkExperience, { MONTHS } from "./steps/Step5WorkExperience";
import Step6Target, { REGION_OPTIONS, ENGLISH_LEVELS } from "./steps/Step6Target";
import { ROLES } from "../../constants/onboarding/roles";
import { EXPERIENCE_OPTIONS } from "../../constants/onboarding/experience";
import Link from "next/link";

function resolveFormData(data: OnboardingData) {
  const role =
    data.role === "other"
      ? data.customRole
      : (ROLES.find((r) => r.value === data.role)?.label ?? data.role);

  const experience =
    EXPERIENCE_OPTIONS.find((e) => e.value === data.experience)?.label ??
    data.experience;

  const startMethod =
    data.startMethod === "resume"
      ? "Загрузить резюме"
      : data.startMethod === "manual"
        ? "Заполнить вручную"
        : data.startMethod;

  const goal =
    GOAL_OPTIONS.find((g) => g.value === data.goal)?.label ?? data.goal;

  const blockers = data.blockers.map(
    (b) => BLOCKER_OPTIONS.find((o) => o.value === b)?.label ?? b,
  );

  const applicationsCount =
    APPLICATIONS_OPTIONS.find((a) => a.value === data.applicationsCount)
      ?.label ?? data.applicationsCount;

  const targetRegion =
    REGION_OPTIONS.find((r) => r.value === data.targetRegion)?.label ??
    data.targetRegion;

  const englishLevelOpt = ENGLISH_LEVELS.find(
    (l) => l.value === data.englishLevel,
  );
  const englishLevel = englishLevelOpt
    ? `${englishLevelOpt.label} — ${englishLevelOpt.sublabel}`
    : data.englishLevel;

  const workExperiences = data.workExperiences.map((exp) => ({
    ...exp,
    startMonth:
      MONTHS.find((m) => m.value === exp.startMonth)?.label ?? exp.startMonth,
    endMonth: exp.isCurrent
      ? "По настоящее время"
      : (MONTHS.find((m) => m.value === exp.endMonth)?.label ?? exp.endMonth),
    tasks: exp.tasks.filter((t) => t.trim()),
    achievements: exp.achievements.filter((a) => a.trim()),
  }));

  return {
    startMethod,
    resumeFile: data.resumeFile,
    role,
    experience,
    technologies: data.technologies,
    goal,
    blockers,
    blockersOther: data.blockersOther,
    applicationsCount,
    workExperiences,
    targetRegion,
    englishLevel,
  };
}

const STEPS = [
  { label: "С чего начнём", component: Step1StartMethod },
  { label: "О тебе", component: Step2BasicInfo },
  { label: "Стек технологий", component: Step3Technologies },
  { label: "Твои цели", component: Step4Goals },
  { label: "Опыт работы", component: Step5WorkExperience },
  { label: "Целевой рынок", component: Step6Target },
];

const TOTAL_STEPS = STEPS.length;

function loadFromStorage(): StoredOnboarding | null {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredOnboarding) : null;
  } catch {
    return null;
  }
}

function saveToStorage(step: number, formData: OnboardingData) {
  try {
    const { resumeFile: _, ...rest } = formData;
    localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify({ step, formData: rest } as StoredOnboarding),
    );
  } catch {}
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [warningModal, setWarningModal] = useState<{
    open: boolean;
    warnings: string[];
  }>({ open: false, warnings: [] });
  const [stepError, setStepError] = useState<string | null>(null);
  const lastParsedFile = useRef<string>("");

  const methods = useForm<OnboardingData>({
    defaultValues: defaultOnboardingData,
    mode: "onChange",
  });

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      methods.reset(saved.formData);
      setCurrentStep(Math.min(saved.step, TOTAL_STEPS - 1));
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    const subscription = methods.watch((formData) => {
      saveToStorage(currentStep, formData as OnboardingData);
    });
    return () => subscription.unsubscribe();
  }, [hydrated, currentStep, methods]);

  // Also persist when step changes
  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(currentStep, methods.getValues());
  }, [currentStep, hydrated]);

  const advanceStep = () => {
    setStepError(null);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    const isValid = await methods.trigger(fields);
    if (!isValid) return;

    if (currentStep === 0) {
      const { startMethod, resumeFile } = methods.getValues();
      if (startMethod === "resume") {
        const needsParsing = resumeFile !== lastParsedFile.current;
        console.log(
          needsParsing
            ? `[Resume] Парсинг нужен: ${resumeFile}`
            : `[Resume] Файл не изменился, парсинг не нужен`,
        );
        if (needsParsing) lastParsedFile.current = resumeFile;
      }
    }

    if (currentStep === 4) {
      const experiences = methods.getValues("workExperiences");
      methods.clearErrors("workExperiences");

      // Hard validation
      let hasHardErrors = false;
      experiences.forEach((exp, i) => {
        if (!exp.company) {
          methods.setError(
            `workExperiences.${i}.company` as FieldPath<OnboardingData>,
            { message: "Укажи компанию" },
          );
          hasHardErrors = true;
        }
        if (!exp.position) {
          methods.setError(
            `workExperiences.${i}.position` as FieldPath<OnboardingData>,
            { message: "Укажи должность" },
          );
          hasHardErrors = true;
        }
        if (!exp.startMonth || !exp.startYear) {
          methods.setError(
            `workExperiences.${i}.startMonth` as FieldPath<OnboardingData>,
            { message: "Укажи период работы" },
          );
          hasHardErrors = true;
        }
      });
      if (hasHardErrors) {
        setStepError(
          "Заполни обязательные поля (компания, должность, период работы), чтобы продолжить",
        );
        return;
      }
      setStepError(null);

      // Soft warnings
      const warnings: string[] = [];
      if (experiences.length === 0) {
        warnings.push(
          "Рекомендуем заполнить опыт работы — наличие опыта многократно повышает шансы на успешный найм",
        );
      }
      experiences.forEach((exp) => {
        const name =
          [exp.company, exp.position].filter(Boolean).join(" · ") ||
          "Место работы";
        if (exp.tasks.filter((t) => t.trim()).length < 2) {
          warnings.push(
            `${name} — рекомендуем указать не менее 2 задач, которые ты выполнял на данной позиции`,
          );
        }
        if (
          exp.achievements.filter((a) => a.trim()).length === 0 &&
          !exp.needsAchievementHelp
        ) {
          warnings.push(
            `${name} — рекомендуем добавить достижения или попросить помочь с их формулировкой`,
          );
        }
      });
      if (warnings.length > 0) {
        setWarningModal({ open: true, warnings });
        return;
      }
    }

    advanceStep();
  };

  const goBack = () => {
    setStepError(null);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Form submitted:", resolveFormData(data));
  });

  const watchedValues = methods.watch();
  const isStepComplete = (step: number): boolean => {
    const fields = STEP_FIELDS[step];
    if (!fields || fields.length === 0) return true;
    const baseValid = fields.every((f) => {
      const val = watchedValues[f];
      if (Array.isArray(val)) return val.length > 0;
      return !!val;
    });
    if (step === 0 && watchedValues.startMethod === "resume") {
      return baseValid && !!watchedValues.resumeFile;
    }
    return baseValid;
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const canAdvance = isStepComplete(currentStep);

  if (!hydrated) return null; // prevent SSR flash

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="min-h-screen bg-[#07091A] flex flex-col"
      >
        {/* Header */}
        <header className="border-b border-[#1B2847]/60 bg-[#07091A]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                L
              </div>
              <span
                className="font-bold text-white text-[17px] tracking-tight"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                Linked<span className="text-[#3B82F6]">Hire</span>
              </span>
            </Link>
            <span className="text-[#64748B] text-sm">
              Шаг{" "}
              <span className="text-white font-semibold">
                {currentStep + 1}
              </span>
              {" из "}
              {TOTAL_STEPS}
            </span>
          </div>
        </header>

        {/* Step content */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 pb-32">
          <CurrentStepComponent />

          {/* Navigation buttons */}
          <div className="mt-12 pt-6 border-t border-[#1B2847]">
            {stepError && (
              <p className="text-red-400 text-sm text-center mb-4">
                {stepError}
              </p>
            )}
            <div className="flex items-center justify-between">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-[#64748B] hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <HiArrowLeft size={16} />
                  Назад
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={isLastStep ? onSubmit : goNext}
                disabled={!canAdvance}
                className={`btn-glow inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200
                ${
                  canAdvance
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer"
                    : "bg-[#2563EB]/40 text-white/50 cursor-not-allowed"
                }`}
              >
                {isLastStep ? "Собрать мой профиль" : "Далее"}
                <HiArrowRight size={16} />
              </button>
            </div>
          </div>
        </main>

        {/* Fixed progress bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepLabels={STEPS.map((s) => s.label)}
        />

        {/* Warning modal */}
        {warningModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setWarningModal({ open: false, warnings: [] })}
            />
            <div className="relative w-full max-w-md bg-[#0D1426] border border-[#1B2847] rounded-2xl shadow-2xl p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <HiExclamationTriangle size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3
                    className="text-white font-bold text-base"
                    style={{ fontFamily: "var(--font-geologica)" }}
                  >
                    Проверь перед продолжением
                  </h3>
                  <p className="text-[#64748B] text-xs mt-0.5">
                    Эти данные влияют на качество профиля
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWarningModal({ open: false, warnings: [] })}
                  className="ml-auto text-[#475569] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              <ul className="space-y-2.5 mb-6">
                {warningModal.warnings.map((w, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-[#94A3B8]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setWarningModal({ open: false, warnings: [] })}
                  className="flex-1 py-2.5 rounded-xl border border-[#1B2847] text-[#94A3B8] hover:border-[#2563EB]/40 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Заполнить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWarningModal({ open: false, warnings: [] });
                    advanceStep();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  Продолжить
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
