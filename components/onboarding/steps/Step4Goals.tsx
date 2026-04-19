"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingData } from "../../../types/onboarding";

export const GOAL_OPTIONS = [
  { value: "remote_job", label: "Не могу найти нормальную работу — отклики не дают результата" },
  { value: "income", label: "Работаю, но понимаю, что на локальном рынке потолок по зарплате" },
  { value: "recruiter_responses", label: "Хочу выйти на удалёнку за границей, но не понимаю с чего начать" },
  { value: "learn_linkedin", label: "Ищу первую работу / только начинаю" },
];

export const BLOCKER_OPTIONS = [
  { value: "no_replies", label: "Отправляю отклики, но в ответ - тишина" },
  // { value: "no_interviews", label: "Вообще не зовут на собеседования" },
  { value: "competition", label: "Слишком высокая конкуренция" },
  { value: "low_salary", label: "Зарплаты сильно ниже ожиданий" },
  { value: "foreign_market", label: "Хочу на зарубежный рынок, но не понимаю как" },
  { value: "linkedin_profile", label: "Не знаю, как себя продать" },
  { value: "other", label: "Другое" },
];

export const APPLICATIONS_OPTIONS = [
  { value: "0-10", label: "0–10" },
  { value: "10-30", label: "10–30" },
  { value: "30-100", label: "30–100" },
  { value: "100+", label: "100+" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-white font-bold text-base mb-4"
      style={{ fontFamily: "var(--font-geologica)" }}
    >
      {children}
    </h3>
  );
}

export default function Step4Goals() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<OnboardingData>();

  const goal = watch("goal");
  const blockers = watch("blockers") ?? [];
  const applicationsCount = watch("applicationsCount");

  register("goal", { required: "Выбери цель" });
  register("applicationsCount", { required: "Выбери количество откликов" });

  const toggleBlocker = (value: string) => {
    if (blockers.includes(value)) {
      setValue("blockers", blockers.filter((b) => b !== value));
    } else {
      setValue("blockers", [...blockers, value]);
    }
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <h2
          className="text-2xl sm:text-3xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Твои цели и задачи
        </h2>
        <p className="text-[#64748B] text-base">
          Расскажи, что важно именно тебе — мы подберём нужный формат
        </p>
      </div>

      {/* Goal */}
      <div className="mb-10">
        <SectionTitle>Какая ситуация сейчас ближе всего к тебе?</SectionTitle>
        <div className="flex flex-col gap-2">
          {GOAL_OPTIONS.map((opt) => {
            const isSelected = goal === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("goal", isSelected ? "" : opt.value, { shouldValidate: true })}
                className={`relative flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? "border-[#2563EB] bg-[#2563EB]/10"
                    : "border-[#1B2847] bg-[#0D1426] hover:border-[#2563EB]/40 hover:bg-[#111D35]"
                  }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${isSelected ? "border-[#2563EB] bg-[#2563EB]" : "border-[#475569]"}`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`text-sm font-medium transition-colors ${isSelected ? "text-white" : "text-[#94A3B8]"}`}>
                  {opt.label}
                </span>
                {opt.value === "remote_job" && (
                  <span className="absolute top-0 -translate-y-1/2 right-0 text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest bg-[#0D1E3D] border border-[#1E3A6E] px-2 py-0.5 rounded-full">
                    Самая частая ситуация
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {errors.goal && (
          <p className="text-red-400 text-xs mt-2">{errors.goal.message}</p>
        )}
      </div>

      {/* Blockers */}
      <div className="mb-10">
        <SectionTitle>Что сейчас больше всего мешает тебе получить работу?</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {BLOCKER_OPTIONS.map((opt) => {
            const isSelected = blockers.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleBlocker(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? "bg-[#2563EB] border-[#2563EB] text-white"
                    : "bg-[#0D1426] border-[#1B2847] text-[#94A3B8] hover:border-[#2563EB]/50 hover:text-white"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {blockers.includes("other") && (
          <input
            {...register("blockersOther")}
            placeholder="Расскажи подробнее"
            className="mt-3 w-full bg-[#0D1426] border border-[#1B2847] focus:border-[#2563EB] rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-[#64748B]"
          />
        )}
      </div>

      {/* Applications count */}
      <div>
        <SectionTitle>Сколько откликов ты отправил за последний месяц?</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {APPLICATIONS_OPTIONS.map((opt) => {
            const isSelected = applicationsCount === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setValue("applicationsCount", isSelected ? "" : opt.value, { shouldValidate: true })
                }
                className={`p-4 rounded-xl border-2 text-center transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? "border-[#2563EB] bg-[#2563EB]/10"
                    : "border-[#1B2847] bg-[#0D1426] hover:border-[#2563EB]/40"
                  }`}
              >
                <div
                  className={`font-black text-lg ${isSelected ? "text-white" : "text-[#94A3B8]"}`}
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {opt.label}
                </div>
              </button>
            );
          })}
        </div>
        {errors.applicationsCount && (
          <p className="text-red-400 text-xs mt-2">{errors.applicationsCount.message}</p>
        )}
      </div>
    </div>
  );
}
