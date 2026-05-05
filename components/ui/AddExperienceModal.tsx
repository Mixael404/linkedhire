"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import {
   HiPencilSquare, HiPlus, HiXMark, HiTrash,
   HiChevronDown, HiChevronUp, HiBriefcase,
} from "react-icons/hi2";
import { defaultWorkExperience } from "@/types/onboarding";
import { ALL_TECHS } from "@/constants/onboarding/technologies";
import { ROLES } from "@/constants/onboarding/roles";
import {
   MAX_WORK_EXPERIENCES, MAX_TASKS, MAX_ACHIEVEMENTS,
   MAX_SKILLS_PER_EXP, MAX_COMPANY_LENGTH, MAX_POSITION_LENGTH,
   MAX_TASK_LENGTH, MAX_ACHIEVEMENT_LENGTH,
} from "@/constants/onboarding/experience";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { FieldLabel } from "./FieldLabel";
import { SelectField } from "./SelectField";
import { MONTHS } from "@/constants/onboarding/experience";
import { CharCount } from "./CharCount";

type Props = { isOpen: boolean; onClose: () => void; profileId: string };

// ─── Light-theme constants ────────────────────────────────────────────────────
const inputCls =
   "w-full bg-white border border-[#e2e8f0] focus:border-[#2563EB] rounded-lg px-3 py-2.5 text-[rgba(0,0,0,0.85)] text-sm outline-none transition-colors placeholder:text-[#9ca3af]";
const inputErrCls =
   "w-full bg-white border border-red-400/60 focus:border-red-500 rounded-lg px-3 py-2.5 text-[rgba(0,0,0,0.85)] text-sm outline-none transition-colors placeholder:text-[#9ca3af]";

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


// ─── Work experience card (light theme) ──────────────────────────────────────
function WorkExperienceCard({ index, onRemove }: { index: number; onRemove: () => void }) {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const { register, watch, setValue, formState: { errors } } = useFormContext<any>();
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
   const [projectOpen, setProjectOpen] = useState(false);
   const techListRef = useRef<HTMLDivElement>(null);
   const positionListRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (techActiveIdx >= 0 && techListRef.current)
         techListRef.current.querySelectorAll("button")[techActiveIdx]?.scrollIntoView({ block: "nearest" });
   }, [techActiveIdx]);

   useEffect(() => {
      if (positionActiveIdx >= 0 && positionListRef.current)
         positionListRef.current.querySelectorAll("button")[positionActiveIdx]?.scrollIntoView({ block: "nearest" });
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
   const projectType  = (watch(`${base}.projectType`) as string) ?? "";
   const projectRole  = (watch(`${base}.projectRole`) as string) ?? "";

   const positionSuggestions = positionQuery.length > 0
      ? ROLES.filter((r) => r.label.toLowerCase().includes(positionQuery.toLowerCase())).slice(0, 6)
      : [];

   const suggestions = techQuery.length > 0
      ? ALL_TECHS.filter((t) => t.toLowerCase().includes(techQuery.toLowerCase()) && !technologies.includes(t)).slice(0, 8)
      : [];

   const isSkillsAtLimit = technologies.length >= MAX_SKILLS_PER_EXP;

   const addTech = (tech: string) => {
      if (isSkillsAtLimit) return;
      setValue(`${base}.technologies`, [...technologies, tech]);
      setTechQuery("");
   };

   const setTasks        = (next: string[]) => setValue(`${base}.tasks`, next);
   const setAchievements = (next: string[]) => setValue(`${base}.achievements`, next);

   const title = [company, position].filter(Boolean).join(" · ") || `Место работы ${index + 1}`;

   return (
      <div className="border border-[#e2e8f0] rounded-2xl">
         {/* Header */}
         <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f8fafc] rounded-t-2xl">
            <button
               type="button"
               onClick={() => setOpen((o) => !o)}
               className="flex items-center gap-2 flex-1 text-left cursor-pointer min-w-0"
            >
               <HiBriefcase size={15} className="text-[#2563EB] shrink-0" />
               <span className="text-[rgba(0,0,0,0.85)] font-semibold text-sm truncate">{title}</span>
               {open
                  ? <HiChevronUp size={15} className="text-[#9ca3af] shrink-0 ml-1" />
                  : <HiChevronDown size={15} className="text-[#9ca3af] shrink-0 ml-1" />}
            </button>
            <button
               type="button"
               onClick={onRemove}
               className="text-[#9ca3af] hover:text-red-400 transition-colors cursor-pointer shrink-0"
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
                     {cardErrors?.company?.message && <p className="text-red-500 text-xs mt-1">{cardErrors.company.message}</p>}
                  </div>
                  <div>
                     <FieldLabel>Должность</FieldLabel>
                     <div className="relative">
                        <input
                           value={positionQuery || position}
                           maxLength={MAX_POSITION_LENGTH}
                           onChange={(e) => {
                              setPositionQuery(e.target.value);
                              setValue(`${base}.position`, e.target.value);
                              setPositionActiveIdx(-1);
                           }}
                           onKeyDown={(e) => {
                              if (!positionSuggestions.length) return;
                              if (e.key === "ArrowDown") { e.preventDefault(); setPositionActiveIdx((i) => Math.min(i + 1, positionSuggestions.length - 1)); }
                              else if (e.key === "ArrowUp") { e.preventDefault(); setPositionActiveIdx((i) => Math.max(i - 1, 0)); }
                              else if (e.key === "Enter" && positionActiveIdx >= 0) {
                                 e.preventDefault();
                                 setValue(`${base}.position`, positionSuggestions[positionActiveIdx].label);
                                 setPositionQuery(""); setPositionActiveIdx(-1);
                              } else if (e.key === "Escape") { setPositionQuery(""); setPositionActiveIdx(-1); }
                           }}
                           onBlur={() => setTimeout(() => { setPositionQuery(""); setPositionActiveIdx(-1); }, 150)}
                           placeholder="Frontend Developer"
                           className={`${cardErrors?.position ? inputErrCls : inputCls} pr-14`}
                        />
                        <CharCount current={position.length} max={MAX_POSITION_LENGTH} />
                        {positionSuggestions.length > 0 && (
                           <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-xl overflow-hidden z-10 shadow-xl">
                              <SimpleBar style={{ maxHeight: 200 }}>
                                 <div ref={positionListRef}>
                                    {positionSuggestions.map((r, i) => (
                                       <button
                                          key={r.value}
                                          type="button"
                                          onMouseDown={(e) => {
                                             e.preventDefault();
                                             setValue(`${base}.position`, r.label);
                                             setPositionQuery(""); setPositionActiveIdx(-1);
                                          }}
                                          className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                                             ${i === positionActiveIdx ? "bg-[#eff6ff] text-[#2563EB]" : "text-[rgba(0,0,0,0.65)] hover:bg-[#f8fafc] hover:text-[rgba(0,0,0,0.9)]"}`}
                                       >
                                          {r.label}
                                       </button>
                                    ))}
                                 </div>
                              </SimpleBar>
                           </div>
                        )}
                     </div>
                     {cardErrors?.position?.message && <p className="text-red-500 text-xs mt-1">{cardErrors.position.message}</p>}
                  </div>
               </div>

               {/* Period */}
               <div>
                  <FieldLabel>Период</FieldLabel>
                  <div className="flex flex-wrap items-center gap-2">
                     <span className="text-[#6b7280] text-xs">с</span>
                     <SelectField
                        className="w-36"
                        value={startMonth}
                        onChange={(v) => setValue(`${base}.startMonth`, v)}
                        options={MONTHS}
                        placeholder="Месяц"
                        error={!!cardErrors?.startMonth}
                     />
                     <SelectField
                        className="w-24"
                        value={startYear}
                        onChange={(v) => setValue(`${base}.startYear`, v)}
                        options={YEARS.map((y) => ({ value: y, label: y }))}
                        placeholder="Год"
                     />
                     {!isCurrent && (
                        <>
                           <span className="text-[#6b7280] text-xs">по</span>
                           <SelectField
                              className="w-36"
                              value={endMonth}
                              onChange={(v) => setValue(`${base}.endMonth`, v)}
                              options={MONTHS}
                              placeholder="Месяц"
                           />
                           <SelectField
                              className="w-24"
                              value={endYear}
                              onChange={(v) => setValue(`${base}.endYear`, v)}
                              options={YEARS.map((y) => ({ value: y, label: y }))}
                              placeholder="Год"
                           />
                        </>
                     )}
                  </div>
                  {cardErrors?.startMonth?.message && <p className="text-red-500 text-xs mt-1">{cardErrors.startMonth.message}</p>}
                  <label className="flex items-center gap-2 mt-2.5 cursor-pointer w-fit">
                     <input type="checkbox" {...register(`${base}.isCurrent`)} className="accent-[#2563EB] w-3.5 h-3.5" />
                     <span className="text-[#6b7280] text-xs">Работаю сейчас</span>
                  </label>
               </div>

               {/* Tasks */}
               <div>
                  <div className="flex items-center justify-between mb-1.5">
                     <FieldLabel>Что ты делал</FieldLabel>
                     <span className={`text-[10px] tabular-nums ${tasks.length >= MAX_TASKS ? "text-amber-500" : "text-[#9ca3af]"}`}>
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
                                 onChange={(e) => {
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
                              className="text-[#9ca3af] hover:text-red-400 transition-colors cursor-pointer shrink-0"
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
                     className="mt-2 flex items-center gap-1.5 text-[#2563EB] hover:text-[#1d4ed8] text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                     <HiPlus size={13} />
                     {tasks.length >= MAX_TASKS ? `Достигнут лимит ${MAX_TASKS} задач` : "Добавить задачу"}
                  </button>
               </div>

               {/* Technologies */}
               <div>
                  <div className="flex items-center justify-between mb-1.5">
                     <FieldLabel>Стек технологий</FieldLabel>
                     <span className={`text-[10px] tabular-nums ${isSkillsAtLimit ? "text-amber-500" : "text-[#9ca3af]"}`}>
                        {technologies.length}/{MAX_SKILLS_PER_EXP}
                     </span>
                  </div>
                  {technologies.length > 0 && (
                     <div className="flex flex-wrap gap-1.5 mb-2">
                        {technologies.map((t) => (
                           <span key={t} className="inline-flex items-center gap-1 bg-[#eff6ff] border border-[#bfdbfe] text-[#2563EB] text-xs px-2 py-0.5 rounded-full">
                              {t}
                              <button
                                 type="button"
                                 onClick={() => setValue(`${base}.technologies`, technologies.filter((x) => x !== t))}
                                 className="text-[#9ca3af] hover:text-red-400 transition-colors cursor-pointer"
                              >
                                 <HiXMark size={10} />
                              </button>
                           </span>
                        ))}
                     </div>
                  )}
                  <div className="relative">
                     <input
                        value={techQuery}
                        disabled={isSkillsAtLimit}
                        onChange={(e) => { setTechQuery(e.target.value); setTechActiveIdx(-1); }}
                        onKeyDown={(e) => {
                           if (e.key === "Enter") {
                              e.preventDefault();
                              const val = techActiveIdx >= 0 && suggestions.length > 0 ? suggestions[techActiveIdx] : techQuery.trim();
                              if (val) { addTech(val); setTechActiveIdx(-1); }
                              return;
                           }
                           if (suggestions.length > 0) {
                              if (e.key === "ArrowDown") { e.preventDefault(); setTechActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)); return; }
                              if (e.key === "ArrowUp")   { e.preventDefault(); setTechActiveIdx((i) => Math.max(i - 1, 0)); return; }
                              if (e.key === "Escape")    { setTechQuery(""); setTechActiveIdx(-1); return; }
                           }
                           if (e.key === "," && techQuery.trim()) { e.preventDefault(); addTech(techQuery.trim()); setTechActiveIdx(-1); }
                        }}
                        onBlur={() => setTimeout(() => { setTechQuery(""); setTechActiveIdx(-1); }, 150)}
                        placeholder={isSkillsAtLimit ? `Достигнут лимит ${MAX_SKILLS_PER_EXP} технологий` : "React, Node.js, Python… (Enter или запятая)"}
                        className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}
                     />
                     {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-xl overflow-hidden z-10 shadow-xl">
                           <SimpleBar style={{ maxHeight: 200 }}>
                              <div ref={techListRef}>
                                 {suggestions.map((s, i) => (
                                    <button
                                       key={s}
                                       type="button"
                                       onMouseDown={(e) => { e.preventDefault(); addTech(s); setTechActiveIdx(-1); }}
                                       className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                                          ${i === techActiveIdx ? "bg-[#eff6ff] text-[#2563EB]" : "text-[rgba(0,0,0,0.65)] hover:bg-[#f8fafc] hover:text-[rgba(0,0,0,0.9)]"}`}
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
                        <span className={`text-[10px] tabular-nums ${achievements.length >= MAX_ACHIEVEMENTS ? "text-amber-500" : "text-[#9ca3af]"}`}>
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
                                       onChange={(e) => {
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
                                    className="text-[#9ca3af] hover:text-red-400 transition-colors cursor-pointer shrink-0"
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
                           className="mt-2 flex items-center gap-1.5 text-[#2563EB] hover:text-[#1d4ed8] text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                           <HiPlus size={13} />
                           {achievements.length >= MAX_ACHIEVEMENTS ? `Достигнут лимит ${MAX_ACHIEVEMENTS} результатов` : "Добавить результат"}
                        </button>
                     </>
                  )}
                  <label className="flex items-center gap-2 mt-3 cursor-pointer w-fit">
                     <input type="checkbox" {...register(`${base}.needsAchievementHelp`)} className="accent-[#2563EB] w-3.5 h-3.5" />
                     <span className="text-[#6b7280] text-xs">Помочь сформулировать результаты</span>
                  </label>
                  {needsHelp && (
                     <p className="mt-1.5 ml-5 text-[#6b7280] text-xs leading-relaxed">
                        Система предложит примеры метрик на основе твоего опыта
                        <br />
                        <span className="text-[rgba(0,0,0,0.45)]">(Ты сможешь отредактировать их перед использованием)</span>
                     </p>
                  )}
               </div>

               {/* Project section */}
               <div className="border-t border-[#e2e8f0] pt-4">
                  <button
                     type="button"
                     onClick={() => setProjectOpen((o) => !o)}
                     className="flex items-center gap-2 text-[#6b7280] hover:text-[rgba(0,0,0,0.75)] transition-colors cursor-pointer w-full text-left"
                  >
                     {projectOpen ? <HiChevronUp size={13} className="shrink-0" /> : <HiChevronDown size={13} className="shrink-0" />}
                     <span className="text-xs font-medium">Для секции «Проекты» в LinkedIn</span>
                     <span className="text-[10px] text-[#9ca3af] ml-auto">необязательно</span>
                  </button>

                  {projectOpen && (
                     <div className="mt-4 space-y-4">
                        <p className="text-[#6b7280] text-xs leading-relaxed -mt-1">
                           Заполни, если хочешь показать этот опыт как отдельный проект.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                           <div>
                              <FieldLabel>Тип проекта</FieldLabel>
                              <SelectField
                                 value={projectType}
                                 onChange={(v) => setValue(`${base}.projectType`, v)}
                                 options={[
                                    { value: "saas_product",      label: "SaaS / продукт с реальными пользователями" },
                                    { value: "mobile_app",        label: "Мобильное приложение" },
                                    { value: "open_source",       label: "Open source проект / библиотека" },
                                    { value: "open_source_contrib",label: "Вклад в чужой open source" },
                                    { value: "design_system",     label: "Дизайн-система / UI-библиотека" },
                                    { value: "api_service",       label: "API / backend сервис" },
                                    { value: "freelance",         label: "Фриланс / заказная разработка" },
                                    { value: "internal_tool",     label: "Внутренний инструмент / автоматизация" },
                                    { value: "side_project",      label: "Pet-проект / эксперимент" },
                                    { value: "hackathon",         label: "Хакатон" },
                                    { value: "academic",          label: "Учебный / дипломный" },
                                    { value: "volunteer",         label: "Волонтёрский / некоммерческий" },
                                 ]}
                                 placeholder="Выбрать тип"
                              />
                           </div>
                           <div>
                              <FieldLabel>Роль в проекте</FieldLabel>
                              <SelectField
                                 value={projectRole}
                                 onChange={(v) => setValue(`${base}.projectRole`, v)}
                                 options={[
                                    { value: "solo",        label: "Единственный разработчик" },
                                    { value: "developer",   label: "Разработчик" },
                                    { value: "co-founder",  label: "Со-основатель" },
                                    { value: "lead",        label: "Тимлид / основной разработчик" },
                                    { value: "architect",   label: "Архитектор / Tech Lead" },
                                    { value: "fullstack",   label: "Full-stack разработчик" },
                                    { value: "frontend",    label: "Frontend разработчик" },
                                    { value: "backend",     label: "Backend разработчик" },
                                    { value: "mobile",      label: "Mobile разработчик" },
                                    { value: "devops",      label: "DevOps / Инфраструктура" },
                                    { value: "contributor", label: "Контрибьютор" },
                                    { value: "mentor",      label: "Ментор / ревьюер" },
                                 ]}
                                 placeholder="Выбрать роль"
                              />
                           </div>
                        </div>
                        <div>
                           <FieldLabel>Ссылка на проект</FieldLabel>
                           <input
                              {...register(`${base}.projectUrl`)}
                              placeholder="https://github.com/… или demo-ссылка"
                              className={inputCls}
                           />
                        </div>
                     </div>
                  )}
               </div>

            </div>
         )}
      </div>
   );
}

// ─── Standalone experience form with its own form context ────────────────────
function ExperienceForm({ onBack, profileId }: { onBack: () => void; profileId: string }) {
   const [saving, setSaving] = useState(false);
   const [saveError, setSaveError] = useState<string | null>(null);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const methods = useForm<any>({
      defaultValues: { workExperiences: [{ ...defaultWorkExperience }] },
   });
   const { control, handleSubmit } = methods;
   const { fields, append, remove } = useFieldArray({ control, name: "workExperiences" });

   const onSubmit = handleSubmit(async (data) => {
      setSaving(true);
      setSaveError(null);
      try {
         const res = await fetch(`/api/profile/${profileId}/work-experiences`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workExperiences: data.workExperiences }),
         });
         if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.error ?? "Ошибка сохранения");
         }
         window.location.reload();
      } catch (err) {
         setSaveError(err instanceof Error ? err.message : "Ошибка сохранения");
         setSaving(false);
      }
   });

   return (
      <FormProvider {...methods}>
         <form onSubmit={onSubmit} className="p-5 sm:p-6">
            <button
               type="button"
               onClick={onBack}
               className="text-[#9ca3af] hover:text-[rgba(0,0,0,0.6)] transition-colors text-xs cursor-pointer mb-4 flex items-center gap-1"
            >
               ← Назад
            </button>

            <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] leading-snug mb-4">
               Опыт работы
            </h2>

            <div className="space-y-3">
               {fields.map((field, index) => (
                  <WorkExperienceCard key={field.id} index={index} onRemove={() => remove(index)} />
               ))}
            </div>

            {fields.length < MAX_WORK_EXPERIENCES ? (
               <button
                  type="button"
                  onClick={() => append({ ...defaultWorkExperience })}
                  className={`mt-3 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed transition-all duration-150 cursor-pointer
                     ${fields.length === 0
                        ? "border-[#2563EB]/40 bg-[#eff6ff] text-[#2563EB] hover:border-[#2563EB]/70 hover:bg-[#dbeafe]"
                        : "border-[#e2e8f0] text-[#9ca3af] hover:border-[#2563EB]/40 hover:text-[#2563EB]"}`}
               >
                  <HiPlus size={16} />
                  <span className="text-sm font-medium">
                     Добавить место работы
                     <span className="ml-2 text-xs opacity-60">{fields.length}/{MAX_WORK_EXPERIENCES}</span>
                  </span>
               </button>
            ) : (
               <p className="mt-4 text-center text-[#9ca3af] text-xs">
                  Достигнут максимум {MAX_WORK_EXPERIENCES} мест работы
               </p>
            )}

            {saveError && (
               <p className="mt-4 text-[12px] text-red-500 text-center">{saveError}</p>
            )}

            <button
               type="submit"
               disabled={saving}
               className="mt-4 w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] transition-all duration-150 text-white font-bold text-[14px] shadow-lg shadow-[#0a66c2]/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
               {saving ? (
                  <>
                     <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                     Сохраняем…
                  </>
               ) : (
                  "Сохранить опыт"
               )}
            </button>
         </form>
      </FormProvider>
   );
}

// ─── Modal shell ─────────────────────────────────────────────────────────────
export default function AddExperienceModal({ isOpen, onClose, profileId }: Props) {
   const [showForm, setShowForm] = useState(false);

   const handleClose = () => {
      setShowForm(false);
      onClose();
   };

   return (
      <Modal isOpen={isOpen} onClose={handleClose}>
         <SimpleBar style={{ maxHeight: "88dvh" }}>
            {showForm ? (
               <ExperienceForm onBack={() => setShowForm(false)} profileId={profileId} />
            ) : (
               <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[11px] shrink-0">
                        L
                     </div>
                     <span className="font-bold text-[rgba(0,0,0,0.9)] text-sm tracking-tight">
                        Linked<span className="text-[#3B82F6]">Hire</span>
                     </span>
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f0f7ff] border border-[#c8dff8] mb-4">
                     <HiPencilSquare size={22} className="text-[#0a66c2]" />
                  </div>

                  <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] leading-snug mb-2">
                     Добавьте опыт работы
                  </h2>
                  <p className="text-[13px] text-[rgba(0,0,0,0.55)] mb-5 leading-relaxed">
                     Вы не заполнили раздел опыта работы. Добавьте хотя бы одно место работы — это ключевой раздел профиля LinkedIn, который видят рекрутеры в первую очередь.
                  </p>

                  <button
                     onClick={() => setShowForm(true)}
                     className="flex items-center justify-center w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] transition-all duration-150 text-white font-bold text-[14px] shadow-lg shadow-[#0a66c2]/25 cursor-pointer"
                  >
                     Заполнить опыт работы
                  </button>

                  <button
                     onClick={handleClose}
                     className="mt-2 w-full text-center text-[11px] text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors cursor-pointer"
                  >
                     Закрыть
                  </button>
               </div>
            )}
         </SimpleBar>
      </Modal>
   );
}
