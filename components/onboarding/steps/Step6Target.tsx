"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { OnboardingData } from "../../../types/onboarding";
import Flags from "country-flag-icons/react/3x2";

function FlagIcon({ code, className }: { code: string; className?: string }) {
  const Flag = (
    Flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>
  )[code];
  return Flag ? <Flag className={className} /> : null;
}

export const REGION_OPTIONS = [
  { value: "worldwide", label: "Весь мир", group: "Общие", flag: null },
  { value: "west", label: "Запад (в целом)", group: "Общие", flag: null },
  { value: "eu", label: "ЕС (в целом)", group: "Общие", flag: "EU" },
  {
    value: "western_europe",
    label: "Западная Европа",
    group: "Общие",
    flag: null,
  },
  {
    value: "north_america",
    label: "Северная Америка",
    group: "Общие",
    flag: null,
  },
  { value: "usa", label: "США", group: "Страны", flag: "US" },
  { value: "germany", label: "Германия", group: "Страны", flag: "DE" },
  { value: "netherlands", label: "Нидерланды", group: "Страны", flag: "NL" },
  { value: "uk", label: "Великобритания", group: "Страны", flag: "GB" },
  { value: "canada", label: "Канада", group: "Страны", flag: "CA" },
  { value: "australia", label: "Австралия", group: "Страны", flag: "AU" },
  { value: "switzerland", label: "Швейцария", group: "Страны", flag: "CH" },
  { value: "austria", label: "Австрия", group: "Страны", flag: "AT" },
  { value: "france", label: "Франция", group: "Страны", flag: "FR" },
  { value: "sweden", label: "Швеция", group: "Страны", flag: "SE" },
  { value: "norway", label: "Норвегия", group: "Страны", flag: "NO" },
  { value: "denmark", label: "Дания", group: "Страны", flag: "DK" },
  { value: "finland", label: "Финляндия", group: "Страны", flag: "FI" },
  { value: "ireland", label: "Ирландия", group: "Страны", flag: "IE" },
  { value: "poland", label: "Польша", group: "Страны", flag: "PL" },
  { value: "czech", label: "Чехия", group: "Страны", flag: "CZ" },
  { value: "portugal", label: "Португалия", group: "Страны", flag: "PT" },
  { value: "spain", label: "Испания", group: "Страны", flag: "ES" },
  { value: "israel", label: "Израиль", group: "Страны", flag: "IL" },
  { value: "uae", label: "ОАЭ", group: "Страны", flag: "AE" },
];

export const ENGLISH_LEVELS = [
  {
    value: "a1_a2",
    label: "A1–A2",
    sublabel: "Начальный",
    description: "Базовые фразы, минимальный словарный запас",
  },
  {
    value: "b1",
    label: "B1",
    sublabel: "Средний",
    description: "Могу объясниться, понимаю простые тексты",
  },
  {
    value: "b2",
    label: "B2",
    sublabel: "Выше среднего",
    description: "Уверенно общаюсь, могу проходить интервью",
  },
  {
    value: "c1",
    label: "C1",
    sublabel: "Продвинутый",
    description: "Свободно говорю и пишу, почти без ошибок",
  },
  {
    value: "c2_native",
    label: "C2 / Native",
    sublabel: "Владею свободно",
    description: "Уровень носителя или близко к нему",
  },
];

export default function Step6Target() {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext<OnboardingData>();

  const targetRegion = watch("targetRegion");
  const englishLevel = watch("englishLevel");

  register("targetRegion", { required: "Выбери регион" });
  register("englishLevel", { required: "Выбери уровень английского" });

  // Autocomplete state
  const [query, setQuery] = useState(() => {
    const found = REGION_OPTIONS.find((o) => o.value === targetRegion);
    return found ? found.label : (targetRegion ?? "");
  });
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = REGION_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedFlag =
    REGION_OPTIONS.find((o) => o.value === targetRegion)?.flag ?? null;

  // Auto-scroll active item into view on arrow navigation
  useEffect(() => {
    if (!open || activeIdx < 0 || !listRef.current) return;
    const buttons = listRef.current.querySelectorAll<HTMLButtonElement>(
      "button[data-option]",
    );
    buttons[activeIdx]?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const selectOption = (value: string, label: string) => {
    setValue("targetRegion", value, { shouldValidate: true });
    setQuery(label);
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && activeIdx >= 0) {
        const opt = filtered[activeIdx];
        if (opt) selectOption(opt.value, opt.label);
      }
      return;
    }
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true);
        setActiveIdx(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIdx((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
    setActiveIdx(-1);
    if (!e.target.value) {
      setValue("targetRegion", "", { shouldValidate: true });
    }
  };

  // Group filtered results by group label
  const groups = Array.from(new Set(filtered.map((o) => o.group)));

  return (
    <div>
      <div className="mb-10 text-center">
        <h2
          className="text-2xl sm:text-3xl font-black text-white mb-3"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Куда ты хочешь выйти работать?
        </h2>
        <p className="text-[#64748B] text-base">
          Мы адаптируем профиль под требования рынка и уровень английского
        </p>
      </div>

      {/* Region selector */}
      <div className="mb-10">
        <h3
          className="text-white font-bold text-base mb-4"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          В каком регионе ты хочешь искать работу?
        </h3>

        <div className="relative">
          {/* Click-outside backdrop */}
          {open && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => {
                setOpen(false);
                setActiveIdx(-1);
              }}
            />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Начни вводить или выбери из списка…"
            autoComplete="off"
            className={`w-full bg-[#0D1426] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-[#64748B]
              ${selectedFlag ? "pr-10" : ""}
              ${open ? "border-[#2563EB]" : "border-[#1B2847] focus:border-[#2563EB]"}
              ${errors.targetRegion ? "border-red-500" : ""}`}
          />
          {selectedFlag && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <FlagIcon code={selectedFlag} className="w-5 h-auto rounded-sm" />
            </span>
          )}

          {open && filtered.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-[#0D1426] border border-[#1B2847] rounded-xl shadow-2xl overflow-hidden">
              <SimpleBar style={{ maxHeight: 220 }}>
                <div ref={listRef} className="py-1">
                  {groups.map((group, gi) => {
                    const groupItems = filtered.filter(
                      (o) => o.group === group,
                    );
                    const groupOffset = filtered.findIndex(
                      (o) => o.group === group,
                    );
                    return (
                      <div key={group}>
                        {gi > 0 && (
                          <div className="h-px bg-[#1B2847] mx-3 my-1" />
                        )}
                        <p className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#475569]">
                          {group}
                        </p>
                        {groupItems.map((opt, localIdx) => {
                          const globalIdx = groupOffset + localIdx;
                          const isActive = globalIdx === activeIdx;
                          const isSelected = opt.value === targetRegion;
                          return (
                            <button
                              key={opt.value}
                              data-option
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                selectOption(opt.value, opt.label);
                              }}
                              onMouseEnter={() => setActiveIdx(globalIdx)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2
                                ${isActive ? "bg-[#1B2847] text-white" : isSelected ? "text-[#3B82F6]" : "text-[#94A3B8] hover:text-white"}
                              `}
                            >
                              {opt.flag && (
                                <FlagIcon
                                  code={opt.flag}
                                  className="w-4 h-auto rounded-sm shrink-0"
                                />
                              )}
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
          )}
        </div>

        {errors.targetRegion && (
          <p className="text-red-400 text-xs mt-2">
            {errors.targetRegion.message as string}
          </p>
        )}

        <p className="text-[#475569] text-xs mt-2 leading-relaxed">
          Каждая страна имеет свои особенности найма — чем точнее ты укажешь
          рынок, тем лучше мы адаптируем профиль именно под него
        </p>
      </div>

      {/* English level */}
      <div>
        <h3
          className="text-white font-bold text-base mb-4"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Уровень английского языка
        </h3>

        <div className="flex flex-col gap-2">
          {ENGLISH_LEVELS.map((level) => {
            const isSelected = englishLevel === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() =>
                  setValue("englishLevel", isSelected ? "" : level.value, {
                    shouldValidate: true,
                  })
                }
                className={`relative flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer
                  ${
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB]/10"
                      : "border-[#1B2847] bg-[#0D1426] hover:border-[#2563EB]/40 hover:bg-[#111D35]"
                  }`}
              >
                {/* Radio indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${isSelected ? "border-[#2563EB] bg-[#2563EB]" : "border-[#475569]"}`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Level badge */}
                <div
                  className={`shrink-0 w-16 text-center font-black text-sm rounded-lg py-1 transition-colors
                    ${isSelected ? "bg-[#2563EB]/30 text-[#93C5FD]" : "bg-[#1B2847] text-[#64748B]"}`}
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {level.label}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-semibold transition-colors ${isSelected ? "text-white" : "text-[#94A3B8]"}`}
                  >
                    {level.sublabel}
                  </span>
                  <p className="text-[#64748B] text-xs mt-0.5">
                    {level.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {errors.englishLevel && (
          <p className="text-red-400 text-xs mt-2">
            {errors.englishLevel.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
