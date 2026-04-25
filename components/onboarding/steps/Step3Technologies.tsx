"use client";

import { useState, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { HiXMark, HiPlus } from "react-icons/hi2";
import { OnboardingData } from "../../../types/onboarding";
import { TECH_GROUPS } from "../../../constants/onboarding/technologies";
import Accordion from "../Accordion";

function Chip({
   label,
   selected,
   onClick,
}: {
   label: string;
   selected: boolean;
   onClick: () => void;
}) {
   return (
      <button
         type="button"
         onClick={onClick}
         className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer
        ${
           selected
              ? "bg-[#2563EB] border-[#2563EB] text-white"
              : "bg-[#0D1426] border-[#1B2847] text-[#94A3B8] hover:border-[#2563EB]/50 hover:text-white"
        }`}
      >
         {label}
      </button>
   );
}

const MAX_SKILLS = 100;

export default function Step3Technologies() {
   const { watch, setValue } = useFormContext<OnboardingData>();

   const technologies = watch("technologies") ?? [];
   const [customTechInput, setCustomTechInput] = useState("");
   const isAtLimit = technologies.length >= MAX_SKILLS;

   const toggleTech = (tech: string) => {
      if (technologies.includes(tech)) {
         setValue(
            "technologies",
            technologies.filter((t) => t !== tech),
         );
      } else if (!isAtLimit) {
         setValue("technologies", [...technologies, tech]);
      }
   };

   const addCustomTech = () => {
      const val = customTechInput.trim();
      if (val && !technologies.includes(val) && !isAtLimit) {
         setValue("technologies", [...technologies, val]);
      }
      setCustomTechInput("");
   };

   const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
         e.preventDefault();
         addCustomTech();
      }
   };

   return (
      <div>
         <div className="mb-10 text-center">
            <h2
               className="text-2xl sm:text-3xl font-black text-white mb-3"
               style={{ fontFamily: "var(--font-geologica)" }}
            >
               Твой стек технологий
            </h2>
            <p className="text-[#64748B] text-base">
               Выбери всё, с чем работаешь - чем точнее, тем лучше профиль
            </p>
         </div>

         {/* Selected tags strip */}
         {technologies.length > 0 && (
            <div
               className={`flex flex-wrap gap-2 mb-5 p-3 bg-[#0D1426] rounded-xl border ${isAtLimit ? "border-amber-500/50" : "border-[#1B2847]"}`}
            >
               <span className="text-[#64748B] text-xs self-center mr-1">
                  Выбрано:{" "}
                  <span className={isAtLimit ? "text-amber-400 font-semibold" : ""}>
                     {technologies.length}/{MAX_SKILLS}
                  </span>
               </span>
               <button
                  type="button"
                  onClick={() => setValue("technologies", [])}
                  className="ml-auto text-[#64748B] hover:text-red-400 text-xs font-medium transition-colors cursor-pointer self-center shrink-0"
               >
                  Очистить всё
               </button>
               {technologies.map((tech) => (
                  <span
                     key={tech}
                     className="inline-flex items-center gap-1.5 bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#93C5FD] text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                     {tech}
                     <button
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className="text-[#64748B] hover:text-red-400 transition-colors cursor-pointer"
                     >
                        <HiXMark size={12} />
                     </button>
                  </span>
               ))}
            </div>
         )}

         {/* Tech groups in accordions */}
         {TECH_GROUPS.map((group) => {
            const selectedCount = group.items.filter((t) => technologies.includes(t)).length;

            return (
               <Accordion key={group.group} title={group.group} badge={selectedCount}>
                  <div className="flex flex-wrap gap-2">
                     {group.items.map((tech) => (
                        <Chip
                           key={tech}
                           label={tech}
                           selected={technologies.includes(tech)}
                           onClick={() => toggleTech(tech)}
                        />
                     ))}
                  </div>
               </Accordion>
            );
         })}

         {/* Custom tech input */}
         <div className="flex gap-2 mt-4">
            <input
               value={customTechInput}
               onChange={(e) => setCustomTechInput(e.target.value)}
               onKeyDown={handleKey}
               disabled={isAtLimit}
               placeholder={
                  isAtLimit
                     ? `Лимит ${MAX_SKILLS} технологий достигнут`
                     : "Добавить свой стек (Enter или запятая)"
               }
               className="flex-1 bg-[#0D1426] border border-[#1B2847] focus:border-[#2563EB] rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-[#64748B] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
               type="button"
               onClick={addCustomTech}
               disabled={isAtLimit}
               className="w-10 h-10 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <HiPlus size={18} />
            </button>
         </div>
         {isAtLimit && (
            <p className="text-amber-400 text-xs mt-2">
               Достигнут максимум {MAX_SKILLS} технологий. Удалите лишние, чтобы добавить новые.
            </p>
         )}
      </div>
   );
}
