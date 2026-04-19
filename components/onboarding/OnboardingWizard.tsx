"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";

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
import Step4Goals from "./steps/Step4Goals";
import Step5WorkExperience from "./steps/Step5WorkExperience";
import Link from "next/link";

const STEPS = [
  { label: "С чего начнём", component: Step1StartMethod },
  { label: "О тебе", component: Step2BasicInfo },
  { label: "Стек технологий", component: Step3Technologies },
  { label: "Твои цели", component: Step4Goals },
  { label: "Опыт работы", component: Step5WorkExperience },
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
      JSON.stringify({ step, formData: rest } as StoredOnboarding)
    );
  } catch {}
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
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

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    const isValid = await methods.trigger(fields);
    if (!isValid) return;

    if (currentStep === 0) {
      const { startMethod, resumeFile } = methods.getValues();
      if (startMethod === "resume") {
        const needsParsing = resumeFile !== lastParsedFile.current;
        console.log(needsParsing ? `[Resume] Парсинг нужен: ${resumeFile}` : `[Resume] Файл не изменился, парсинг не нужен`);
        if (needsParsing) lastParsedFile.current = resumeFile;
      }
    }

    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = methods.handleSubmit((data) => {
    // Final submit — will send to API in future steps
    console.log("Form submitted:", data);
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
              <span className="text-white font-semibold">{currentStep + 1}</span>
              {" из "}
              {TOTAL_STEPS}
            </span>
          </div>
        </header>

        {/* Step content */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 pb-32">
          <CurrentStepComponent />

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#1B2847]">
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

            {isLastStep ? (
              <button
                type="submit"
                disabled={!canAdvance}
                className={`btn-glow inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200
                  ${canAdvance
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer"
                    : "bg-[#2563EB]/40 text-white/50 cursor-not-allowed"
                  }`}
              >
                Получить профиль
                <HiArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance}
                className={`btn-glow inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200
                  ${canAdvance
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer"
                    : "bg-[#2563EB]/40 text-white/50 cursor-not-allowed"
                  }`}
              >
                Далее
                <HiArrowRight size={16} />
              </button>
            )}
          </div>
        </main>

        {/* Fixed progress bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepLabels={STEPS.map((s) => s.label)}
        />
      </form>
    </FormProvider>
  );
}
