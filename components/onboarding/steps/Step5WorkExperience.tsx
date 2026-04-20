"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { HiPlus, HiXMark, HiTrash, HiChevronDown, HiChevronUp, HiBriefcase } from "react-icons/hi2";
import { OnboardingData, defaultWorkExperience } from "../../../types/onboarding";
import { ALL_TECHS } from "../../../constants/onboarding/technologies";
import { ROLES } from "../../../constants/onboarding/roles";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const MONTHS = [
  { value: "01", label: "Январь" }, { value: "02", label: "Февраль" },
  { value: "03", label: "Март" },   { value: "04", label: "Апрель" },
  { value: "05", label: "Май" },    { value: "06", label: "Июнь" },
  { value: "07", label: "Июль" },   { value: "08", label: "Август" },
  { value: "09", label: "Сентябрь" },{ value: "10", label: "Октябрь" },
  { value: "11", label: "Ноябрь" }, { value: "12", label: "Декабрь" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 26 }, (_, i) => String(CURRENT_YEAR - i));

const TASK_PLACEHOLDERS = [
  "Разрабатывал интерфейсы на React",
  "Оптимизировал загрузку страниц",
  "Интегрировал API",
  "Настраивал CI/CD пайплайны",
  "Покрывал код тестами",
];

const ACHIEVEMENT_PLACEHOLDERS = [
  "Ускорил загрузку страниц на 30%",
  "Снизил количество ошибок на 40%",
  "Увеличил покрытие тестами до 80%",
];

export const MAX_WORK_EXPERIENCES = 6;
export const MAX_TASKS = 20;
export const MAX_ACHIEVEMENTS = 20;
export const MAX_SKILLS_PER_EXP = 20;
export const MAX_COMPANY_LENGTH = 50;
export const MAX_POSITION_LENGTH = 50;
export const MAX_TASK_LENGTH = 150;
export const MAX_ACHIEVEMENT_LENGTH = 150;

const inputCls = "w-full bg-[#07091A] border border-[#1B2847] focus:border-[#2563EB] rounded-lg px-3 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-[#475569]";
const inputErrCls = "w-full bg-[#07091A] border border-red-500/60 focus:border-red-500 rounded-lg px-3 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-[#475569]";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[#64748B] text-xs mb-1.5 block">{children}</span>;
}

function CharCount({ current, max }: { current: number; max: number }) {
  const pct = current / max;
  const color = pct >= 1 ? "text-red-400" : pct >= 0.8 ? "text-amber-400" : "text-[#3B4A6B]";
  return (
    <span className={`absolute bottom-2.5 right-3 text-[10px] pointer-events-none select-none tabular-nums ${color}`}>
      {current}/{max}
    </span>
  );
}

interface SelectFieldProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  error?: boolean;
}

function SelectField({ value, onChange, options, placeholder = "Выбрать", className = "", error }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className={`relative ${className}`}>
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-2 bg-[#07091A] border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors cursor-pointer
          ${error ? "border-red-500/60 hover:border-red-500" : "border-[#1B2847] hover:border-[#2563EB]/50"}`}
      >
        <span className={selected ? "text-white" : "text-[#475569]"}>
          {selected ? selected.label : placeholder}
        </span>
        <HiChevronDown size={13} className={`text-[#64748B] transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D1426] border border-[#1B2847] rounded-xl overflow-hidden z-20 shadow-2xl">
          <SimpleBar style={{ maxHeight: 200 }}>
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                  ${opt.value === value
                    ? "text-white bg-[#2563EB]/10"
                    : "text-[#94A3B8] hover:bg-[#111D35] hover:text-white"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </SimpleBar>
        </div>
      )}
    </div>
  );
}

function WorkExperienceCard({ index, onRemove }: { index: number; onRemove: () => void }) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<OnboardingData>();
  type CardErrors = {
    company?: { message?: string };
    position?: { message?: string };
    startMonth?: { message?: string };
  };
  const cardErrors = (errors.workExperiences as unknown as CardErrors[] | undefined)?.[index];

  const [open, setOpen] = useState(true);
  const [techQuery, setTechQuery] = useState("");
  const [techActiveIdx, setTechActiveIdx] = useState(-1);
  const [positionQuery, setPositionQuery] = useState("");
  const [positionActiveIdx, setPositionActiveIdx] = useState(-1);
  const techInputRef = useRef<HTMLInputElement>(null);
  const techListRef = useRef<HTMLDivElement>(null);
  const positionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (techActiveIdx >= 0 && techListRef.current) {
      techListRef.current.querySelectorAll("button")[techActiveIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [techActiveIdx]);

  useEffect(() => {
    if (positionActiveIdx >= 0 && positionListRef.current) {
      positionListRef.current.querySelectorAll("button")[positionActiveIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [positionActiveIdx]);

  const base = `workExperiences.${index}` as const;

  const company      = (watch(`${base}.company`) as string) ?? "";
  const position     = (watch(`${base}.position`) as string) ?? "";
  const isCurrent    = watch(`${base}.isCurrent`) as boolean;
  const startMonth   = watch(`${base}.startMonth`) as string;
  const startYear    = watch(`${base}.startYear`) as string;
  const endMonth     = watch(`${base}.endMonth`) as string;
  const endYear      = watch(`${base}.endYear`) as string;
  const tasks        = (watch(`${base}.tasks`) as string[]) ?? [];
  const technologies = (watch(`${base}.technologies`) as string[]) ?? [];
  const achievements = (watch(`${base}.achievements`) as string[]) ?? [];
  const needsHelp    = watch(`${base}.needsAchievementHelp`) as boolean;

  const positionSuggestions = positionQuery.length > 0
    ? ROLES.filter(r => r.label.toLowerCase().includes(positionQuery.toLowerCase())).slice(0, 6)
    : [];

  const suggestions = techQuery.length > 0
    ? ALL_TECHS.filter(t =>
        t.toLowerCase().includes(techQuery.toLowerCase()) && !technologies.includes(t)
      ).slice(0, 8)
    : [];

  const isSkillsAtLimit = technologies.length >= MAX_SKILLS_PER_EXP;

  const addTech = (tech: string) => {
    if (isSkillsAtLimit) return;
    setValue(`${base}.technologies`, [...technologies, tech]);
    setTechQuery("");
  };

  const setTasks = (next: string[]) => setValue(`${base}.tasks`, next);
  const setAchievements = (next: string[]) => setValue(`${base}.achievements`, next);

  const title = [company, position].filter(Boolean).join(" · ") || `Место работы ${index + 1}`;

  return (
    <div className="border border-[#1B2847] rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#0D1426] rounded-t-2xl">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 flex-1 text-left cursor-pointer min-w-0"
        >
          <HiBriefcase size={15} className="text-[#3B82F6] shrink-0" />
          <span className="text-white font-semibold text-sm truncate">{title}</span>
          {open
            ? <HiChevronUp size={15} className="text-[#64748B] shrink-0 ml-1" />
            : <HiChevronDown size={15} className="text-[#64748B] shrink-0 ml-1" />
          }
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-[#475569] hover:text-red-400 transition-colors cursor-pointer shrink-0"
        >
          <HiTrash size={15} />
        </button>
      </div>

      {/* Body */}
      {open && (
        <div className="px-5 pb-6 pt-5 space-y-6">

          {/* Company + Position */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Компания</FieldLabel>
              <div className="relative">
                <input
                  {...register(`${base}.company`, {
                    maxLength: { value: MAX_COMPANY_LENGTH, message: `Максимум ${MAX_COMPANY_LENGTH} символов` },
                  })}
                  placeholder="Яндекс / Freelance"
                  className={`${cardErrors?.company ? inputErrCls : inputCls} pr-14`}
                />
                <CharCount current={company.length} max={MAX_COMPANY_LENGTH} />
              </div>
              {cardErrors?.company?.message && (
                <p className="text-red-400 text-xs mt-1">{cardErrors.company.message}</p>
              )}
            </div>
            <div>
              <FieldLabel>Должность</FieldLabel>
              <div className="relative">
                <input
                  value={positionQuery || position}
                  maxLength={MAX_POSITION_LENGTH}
                  onChange={e => {
                    setPositionQuery(e.target.value);
                    setValue(`${base}.position`, e.target.value);
                    setPositionActiveIdx(-1);
                  }}
                  onKeyDown={e => {
                    if (!positionSuggestions.length) return;
                    if (e.key === "ArrowDown") { e.preventDefault(); setPositionActiveIdx(i => Math.min(i + 1, positionSuggestions.length - 1)); }
                    else if (e.key === "ArrowUp") { e.preventDefault(); setPositionActiveIdx(i => Math.max(i - 1, 0)); }
                    else if (e.key === "Enter" && positionActiveIdx >= 0) {
                      e.preventDefault();
                      setValue(`${base}.position`, positionSuggestions[positionActiveIdx].label);
                      setPositionQuery("");
                      setPositionActiveIdx(-1);
                    } else if (e.key === "Escape") { setPositionQuery(""); setPositionActiveIdx(-1); }
                  }}
                  onBlur={() => setTimeout(() => { setPositionQuery(""); setPositionActiveIdx(-1); }, 150)}
                  placeholder="Frontend Developer"
                  className={`${cardErrors?.position ? inputErrCls : inputCls} pr-14`}
                />
                <CharCount current={position.length} max={MAX_POSITION_LENGTH} />
                {positionSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D1426] border border-[#1B2847] rounded-xl overflow-hidden z-10 shadow-xl">
                    <SimpleBar style={{ maxHeight: 200 }}>
                      <div ref={positionListRef}>
                        {positionSuggestions.map((r, i) => (
                          <button
                            key={r.value}
                            type="button"
                            onMouseDown={e => {
                              e.preventDefault();
                              setValue(`${base}.position`, r.label);
                              setPositionQuery("");
                              setPositionActiveIdx(-1);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                              ${i === positionActiveIdx ? "bg-[#2563EB]/15 text-white" : "text-[#94A3B8] hover:bg-[#111D35] hover:text-white"}`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </SimpleBar>
                  </div>
                )}
              </div>
              {cardErrors?.position?.message && (
                <p className="text-red-400 text-xs mt-1">{cardErrors.position.message}</p>
              )}
            </div>
          </div>

          {/* Period */}
          <div>
            <FieldLabel>Период</FieldLabel>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#64748B] text-xs">с</span>
              <SelectField
                className="w-36"
                value={startMonth}
                onChange={v => setValue(`${base}.startMonth`, v)}
                options={MONTHS}
                placeholder="Месяц"
                error={!!cardErrors?.startMonth}
              />
              <SelectField
                className="w-24"
                value={startYear}
                onChange={v => setValue(`${base}.startYear`, v)}
                options={YEARS.map(y => ({ value: y, label: y }))}
                placeholder="Год"
              />
              {!isCurrent && (
                <>
                  <span className="text-[#64748B] text-xs">по</span>
                  <SelectField
                    className="w-36"
                    value={endMonth}
                    onChange={v => setValue(`${base}.endMonth`, v)}
                    options={MONTHS}
                    placeholder="Месяц"
                  />
                  <SelectField
                    className="w-24"
                    value={endYear}
                    onChange={v => setValue(`${base}.endYear`, v)}
                    options={YEARS.map(y => ({ value: y, label: y }))}
                    placeholder="Год"
                  />
                </>
              )}
            </div>
            {cardErrors?.startMonth?.message && (
              <p className="text-red-400 text-xs mt-1">{cardErrors.startMonth.message}</p>
            )}
            <label className="flex items-center gap-2 mt-2.5 cursor-pointer w-fit">
              <input
                type="checkbox"
                {...register(`${base}.isCurrent`)}
                className="accent-[#2563EB] w-3.5 h-3.5"
              />
              <span className="text-[#94A3B8] text-xs">Работаю сейчас</span>
            </label>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <FieldLabel>Что ты делал</FieldLabel>
              <span className={`text-[10px] tabular-nums ${tasks.length >= MAX_TASKS ? "text-amber-400" : "text-[#3B4A6B]"}`}>
                {tasks.length}/{MAX_TASKS}
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      value={task}
                      maxLength={MAX_TASK_LENGTH}
                      onChange={e => {
                        const next = [...tasks];
                        next[i] = e.target.value;
                        setTasks(next);
                      }}
                      placeholder={TASK_PLACEHOLDERS[i % TASK_PLACEHOLDERS.length]}
                      className={`${inputCls} pr-14`}
                    />
                    <CharCount current={task.length} max={MAX_TASK_LENGTH} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setTasks(tasks.filter((_, j) => j !== i))}
                    className="text-[#475569] hover:text-red-400 transition-colors cursor-pointer shrink-0"
                  >
                    <HiXMark size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTasks([...tasks, ""])}
              disabled={tasks.length >= MAX_TASKS}
              className="mt-2 flex items-center gap-1.5 text-[#3B82F6] hover:text-[#60A5FA] text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <HiPlus size={13} />
              {tasks.length >= MAX_TASKS ? `Достигнут лимит ${MAX_TASKS} задач` : "Добавить задачу"}
            </button>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <FieldLabel>Стек технологий</FieldLabel>
              <span className={`text-[10px] tabular-nums ${isSkillsAtLimit ? "text-amber-400" : "text-[#3B4A6B]"}`}>
                {technologies.length}/{MAX_SKILLS_PER_EXP}
              </span>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {technologies.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#93C5FD] text-xs px-2 py-0.5 rounded-full"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => setValue(`${base}.technologies`, technologies.filter(x => x !== t))}
                      className="text-[#64748B] hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <HiXMark size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="relative">
              <input
                ref={techInputRef}
                value={techQuery}
                disabled={isSkillsAtLimit}
                onChange={e => { setTechQuery(e.target.value); setTechActiveIdx(-1); }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = techActiveIdx >= 0 && suggestions.length > 0
                      ? suggestions[techActiveIdx]
                      : techQuery.trim();
                    if (value) { addTech(value); setTechActiveIdx(-1); }
                    return;
                  }
                  if (suggestions.length > 0) {
                    if (e.key === "ArrowDown") { e.preventDefault(); setTechActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); return; }
                    if (e.key === "ArrowUp")   { e.preventDefault(); setTechActiveIdx(i => Math.max(i - 1, 0)); return; }
                    if (e.key === "Escape")    { setTechQuery(""); setTechActiveIdx(-1); return; }
                  }
                  if (e.key === "," && techQuery.trim()) { e.preventDefault(); addTech(techQuery.trim()); setTechActiveIdx(-1); }
                }}
                onBlur={() => setTimeout(() => { setTechQuery(""); setTechActiveIdx(-1); }, 150)}
                placeholder={isSkillsAtLimit ? `Достигнут лимит ${MAX_SKILLS_PER_EXP} технологий` : "React, Node.js, Python… (Enter или запятая)"}
                className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D1426] border border-[#1B2847] rounded-xl overflow-hidden z-10 shadow-xl">
                  <SimpleBar style={{ maxHeight: 200 }}>
                    <div ref={techListRef}>
                      {suggestions.map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={e => { e.preventDefault(); addTech(s); setTechActiveIdx(-1); }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                            ${i === techActiveIdx ? "bg-[#2563EB]/15 text-white" : "text-[#94A3B8] hover:bg-[#111D35] hover:text-white"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </SimpleBar>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <FieldLabel>Достижения / результаты</FieldLabel>
              {!needsHelp && (
                <span className={`text-[10px] tabular-nums ${achievements.length >= MAX_ACHIEVEMENTS ? "text-amber-400" : "text-[#3B4A6B]"}`}>
                  {achievements.length}/{MAX_ACHIEVEMENTS}
                </span>
              )}
            </div>
            {!needsHelp && (
              <>
                <div className="space-y-2">
                  {achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          value={ach}
                          maxLength={MAX_ACHIEVEMENT_LENGTH}
                          onChange={e => {
                            const next = [...achievements];
                            next[i] = e.target.value;
                            setAchievements(next);
                          }}
                          placeholder={ACHIEVEMENT_PLACEHOLDERS[i % ACHIEVEMENT_PLACEHOLDERS.length]}
                          className={`${inputCls} pr-14`}
                        />
                        <CharCount current={ach.length} max={MAX_ACHIEVEMENT_LENGTH} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setAchievements(achievements.filter((_, j) => j !== i))}
                        className="text-[#475569] hover:text-red-400 transition-colors cursor-pointer shrink-0"
                      >
                        <HiXMark size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setAchievements([...achievements, ""])}
                  disabled={achievements.length >= MAX_ACHIEVEMENTS}
                  className="mt-2 flex items-center gap-1.5 text-[#3B82F6] hover:text-[#60A5FA] text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HiPlus size={13} />
                  {achievements.length >= MAX_ACHIEVEMENTS ? `Достигнут лимит ${MAX_ACHIEVEMENTS} результатов` : "Добавить результат"}
                </button>
              </>
            )}
            <label className="flex items-center gap-2 mt-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                {...register(`${base}.needsAchievementHelp`)}
                className="accent-[#2563EB] w-3.5 h-3.5"
              />
              <span className="text-[#94A3B8] text-xs">Помочь сформулировать результаты</span>
            </label>
            {needsHelp && (
              <p className="mt-1.5 ml-5 text-[#475569] text-xs leading-relaxed">
                Система предложит примеры метрик на основе твоего опыта<br />
                <span className="text-[#374151]">(Ты сможешь отредактировать их перед использованием)</span>
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default function Step5WorkExperience() {
  const { control } = useFormContext<OnboardingData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperiences",
  });

  return (
    <div>
      <div className="mb-10 text-center">
        <h2
          className="text-xl sm:text-2xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Опиши свой опыт — мы превратим его в профиль под зарубежный рынок
        </h2>
        <p className="text-[#64748B] text-base">
          Добавь места работы — от последнего к первому
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <WorkExperienceCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      {fields.length < MAX_WORK_EXPERIENCES ? (
        <button
          type="button"
          onClick={() => append({ ...defaultWorkExperience })}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed transition-all duration-150 cursor-pointer
            ${fields.length === 0
              ? "border-[#2563EB]/40 bg-[#2563EB]/5 text-[#3B82F6] hover:border-[#2563EB]/70 hover:bg-[#2563EB]/10"
              : "border-[#1B2847] text-[#64748B] hover:border-[#2563EB]/40 hover:text-[#3B82F6]"
            }`}
        >
          <HiPlus size={16} />
          <span className="text-sm font-medium">
            Добавить место работы
            <span className="ml-2 text-xs opacity-60">{fields.length}/{MAX_WORK_EXPERIENCES}</span>
          </span>
        </button>
      ) : (
        <p className="mt-4 text-center text-[#64748B] text-xs">
          Достигнут максимум {MAX_WORK_EXPERIENCES} мест работы
        </p>
      )}
    </div>
  );
}
