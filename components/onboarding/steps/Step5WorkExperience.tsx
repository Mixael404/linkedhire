"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { HiPlus } from "react-icons/hi2";
import { OnboardingData, defaultWorkExperience } from "../../../types/onboarding";
import "simplebar-react/dist/simplebar.min.css";
import { WorkExperienceCard } from "../WorkExperienceCard/WorkExperienceCard";
import { MAX_WORK_EXPERIENCES } from "@/constants/onboarding/experience";

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
               Опиши свой опыт - мы превратим его в профиль под зарубежный рынок
            </h2>
            <p className="text-[#64748B] text-base">
               Добавь места работы - от последнего к первому
            </p>
         </div>

         <div className="space-y-3">
            {fields.map((field, index) => (
               <WorkExperienceCard key={field.id} index={index} onRemove={() => remove(index)} />
            ))}
         </div>

         {fields.length < MAX_WORK_EXPERIENCES ? (
            <button
               type="button"
               onClick={() => append({ ...defaultWorkExperience })}
               className={`mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed transition-all duration-150 cursor-pointer
            ${
               fields.length === 0
                  ? "border-[#2563EB]/40 bg-[#2563EB]/5 text-[#3B82F6] hover:border-[#2563EB]/70 hover:bg-[#2563EB]/10"
                  : "border-[#1B2847] text-[#64748B] hover:border-[#2563EB]/40 hover:text-[#3B82F6]"
            }`}
            >
               <HiPlus size={16} />
               <span className="text-sm font-medium">
                  Добавить место работы
                  <span className="ml-2 text-xs opacity-60">
                     {fields.length}/{MAX_WORK_EXPERIENCES}
                  </span>
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
