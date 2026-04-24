"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OnboardingData } from "../../../types/onboarding";
import { ROLES, ROLE_GROUPS } from "../../../constants/onboarding/roles";
import { EXPERIENCE_OPTIONS } from "../../../constants/onboarding/experience";
import Accordion from "../Accordion";

const MAX_TASK_TYPES = 5;

export const TASK_CATEGORIES = [
  {
    id: "ui_ux",
    label: "🟦 Интерфейсы и пользовательский опыт",
    subtitle: "всё, что видит пользователь",
    tasks: [
      "Дашборды и аналитика",
      "Сложные формы и валидация",
      "Таблицы / большие списки",
      "Карты / гео-интерфейсы",
      "Личные кабинеты / админки",
      "Design system / UI компоненты",
      "Drag & drop / сложные взаимодействия",
      "Оптимизация производительности UI (Core Web Vitals, рендеринг)",
    ],
  },
  {
    id: "data",
    label: "🟪 Работа с данными и интеграциями",
    subtitle: "ключевая категория для backend / fullstack",
    tasks: [
      "API (REST / GraphQL)",
      "Проектирование схем и моделей данных",
      "Оптимизация запросов к БД (индексы, explain, N+1)",
      "Интеграции (внешние сервисы, вебхуки)",
      "Платёжные системы / биллинг",
      "Кеширование / оптимизация запросов",
      "Обработка данных / бизнес-логика",
    ],
  },
  {
    id: "performance",
    label: "🟨 Нагрузка, производительность и масштаб",
    subtitle: "реальное поведение системы",
    tasks: [
      "Real-time (сокеты, стриминг)",
      "Высокая нагрузка (high-load)",
      "Производительность / оптимизация",
      "Асинхронные процессы / очереди",
      "Масштабируемые системы",
      "Observability (логи, трейсы, метрики)",
    ],
  },
  {
    id: "architecture",
    label: "🟩 Архитектура и разработка системы",
    subtitle: "senior-сигналы",
    tasks: [
      "Микросервисы / сервисная архитектура",
      "Архитектура приложения",
      "Проектирование системы",
      "CI/CD / деплой",
      "Тестирование (unit / e2e)",
      "Рефакторинг / поддержка",
    ],
  },
  {
    id: "security",
    label: "🟥 Безопасность",
    subtitle: "защита данных и инфраструктуры",
    tasks: [
      "Аутентификация / авторизация",
      "OAuth / SSO / JWT",
      "Защита API (rate limiting, валидация)",
      "Шифрование данных",
      "Пентест / аудит безопасности",
      "OWASP / уязвимости",
      "Управление секретами",
    ],
  },
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

function Chip({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150
        ${
          selected
            ? "bg-[#2563EB] border-[#2563EB] text-white cursor-pointer"
            : disabled
            ? "bg-[#0D1426] border-[#1B2847] text-[#475569] cursor-not-allowed"
            : "bg-[#0D1426] border-[#1B2847] text-[#94A3B8] hover:border-[#2563EB]/50 hover:text-white cursor-pointer"
        }`}
    >
      {label}
    </button>
  );
}

export default function Step2BasicInfo() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<OnboardingData>();

  const role = watch("role");
  const experience = watch("experience");
  const taskTypes = watch("taskTypes") ?? [];
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openTaskGroup, setOpenTaskGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) =>
    setOpenGroup((prev) => (prev === group ? null : group));

  register("role", { required: "Выбери специальность" });
  register("experience", { required: "Выбери опыт" });

  return (
    <div>
      <div className="mb-10 text-center">
        <h2
          className="text-2xl sm:text-3xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Основные данные
        </h2>
        <p className="text-[#64748B] text-base">
          Расскажи немного о себе как о специалисте
        </p>
      </div>

      {/* ── Роль ── */}
      <div className="mb-10">
        <SectionTitle>На какую позицию ты претендуешь?</SectionTitle>

        <div className="flex gap-2">
          {[ROLE_GROUPS.filter((_, i) => i % 2 === 0), ROLE_GROUPS.filter((_, i) => i % 2 !== 0)].map(
            (colGroups, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 flex-1">
                {colGroups.map((group) => {
                  const groupRoles = ROLES.filter((r) => r.group === group);
                  const hasSelection = groupRoles.some((r) => r.value === role);

                  return (
                    <Accordion
                      key={group}
                      title={group}
                      badge={hasSelection}
                      open={openGroup === group}
                      onToggle={() => toggleGroup(group)}
                    >
                      <div className="flex flex-wrap gap-2">
                        {groupRoles.map((r) => (
                          <Chip
                            key={r.value}
                            label={r.label}
                            selected={role === r.value}
                            onClick={() =>
                              setValue("role", role === r.value ? "" : r.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        ))}
                      </div>
                    </Accordion>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Custom input — показывается только при выборе "Другое" */}
        {role === "other" && (
          <input
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            {...register("customRole")}
            placeholder="Введи свою специальность"
            className="mt-3 w-full bg-[#0D1426] border border-[#1B2847] focus:border-[#2563EB] rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-[#64748B]"
          />
        )}

        {errors.role && (
          <p className="text-red-400 text-xs mt-3">{errors.role.message}</p>
        )}
      </div>

      {/* ── Опыт ── */}
      <div className="mb-10">
        <SectionTitle>Сколько у тебя опыта?</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isSelected = experience === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setValue(
                    "experience",
                    experience === opt.value ? "" : opt.value,
                    { shouldValidate: true }
                  )
                }
                className={`p-4 rounded-xl border-2 text-center transition-all duration-150 cursor-pointer
                  ${
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB]/10"
                      : "border-[#1B2847] bg-[#0D1426] hover:border-[#2563EB]/40"
                  }`}
              >
                <div
                  className={`font-black text-lg mb-0.5 ${
                    isSelected ? "text-white" : "text-[#94A3B8]"
                  }`}
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {opt.label}
                </div>
                <div className="text-[#64748B] text-xs">{opt.sublabel}</div>
              </button>
            );
          })}
        </div>
        {errors.experience && (
          <p className="text-red-400 text-xs mt-2">{errors.experience.message}</p>
        )}
      </div>

      {/* ── Типы задач ── */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <SectionTitle>С какими типами задач работал?</SectionTitle>
          <span className={`text-xs font-medium tabular-nums ${taskTypes.length >= MAX_TASK_TYPES ? "text-amber-400" : "text-[#64748B]"}`}>
            {taskTypes.length} / {MAX_TASK_TYPES}
          </span>
        </div>

        <div className="flex flex-col">
          {TASK_CATEGORIES.map((cat) => {
            const selectedInCat = taskTypes.filter((t) => cat.tasks.includes(t)).length;
            return (
              <Accordion
                key={cat.id}
                title={cat.label}
                badge={selectedInCat > 0 ? selectedInCat : undefined}
                open={openTaskGroup === cat.id}
                onToggle={() => setOpenTaskGroup((prev) => (prev === cat.id ? null : cat.id))}
              >
                <p className="text-[#475569] text-xs mb-3">👉 {cat.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.tasks.map((task) => {
                    const isSelected = taskTypes.includes(task);
                    return (
                      <Chip
                        key={task}
                        label={task}
                        selected={isSelected}
                        disabled={!isSelected && taskTypes.length >= MAX_TASK_TYPES}
                        onClick={() => {
                          if (isSelected) {
                            setValue("taskTypes", taskTypes.filter((t) => t !== task));
                          } else if (taskTypes.length < MAX_TASK_TYPES) {
                            setValue("taskTypes", [...taskTypes, task]);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}
