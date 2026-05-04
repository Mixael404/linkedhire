"use client";

import { useMemo } from "react";
import type { GeneratedWorkExperience } from "@/app/api/generate-profile/route";
import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";
import WorkItem from "@/components/profile/WorkItem";
import { sortByFinishDateDesc } from "@/lib/sortByDate";
import { padWithFakeWords } from "@/lib/padWithFakeWords";
import { HiBuildingOffice2 } from "react-icons/hi2";

type Props = {
   workExperiences: GeneratedWorkExperience[];
   onBlurClick: (section: string) => void;
   onAddExperienceClick: () => void;
   is_purchased: boolean;
   targetCountry: string;
};

const FAKE_ITEMS = [
   { position: "Senior Product Manager", company: "TechCorp Solutions", period: "Jan 2021 – Present" },
   { position: "Software Engineer", company: "Innovate Labs", period: "Mar 2018 – Dec 2020" },
] as const;


export default function ExperienceSection({
   workExperiences,
   onBlurClick,
   onAddExperienceClick,
   is_purchased,
   targetCountry,
}: Props) {
   const fakeTexts = useMemo(() => [
      padWithFakeWords("x", Math.floor(Math.random() * 201) + 1000),
      padWithFakeWords("x", Math.floor(Math.random() * 201) + 1000),
   ], []);

   if (workExperiences.length === 0) {
      const handleClick = () => is_purchased ? onAddExperienceClick() : onBlurClick("experience-empty");

      return (
         <Card className="p-4 sm:p-5">
            <SectionHeader title="Опыт работы" />
            <div className="space-y-5">
               {FAKE_ITEMS.map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4 cursor-pointer" onClick={handleClick}>
                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#e8f0f8] border border-[#c8d8e8] shrink-0 flex items-center justify-center text-[#5b8db8]">
                        <HiBuildingOffice2 size={22} />
                     </div>
                     <div className="flex-1 min-w-0 select-none">
                        <p
                           className="font-semibold text-[rgba(0,0,0,0.9)] text-[18px] leading-snug"
                           style={{ filter: "blur(5px)", userSelect: "none" }}
                        >
                           {item.position}
                        </p>
                        <p
                           className="font-medium text-[rgba(0,0,0,0.9)] text-[14px] mt-0.5"
                           style={{ filter: "blur(5px)", userSelect: "none" }}
                        >
                           {item.company}
                        </p>
                        <p
                           className="text-[11px] text-[rgba(0,0,0,0.75)] mt-0.5 mb-3"
                           style={{ filter: "blur(5px)", userSelect: "none" }}
                        >
                           {item.period}
                        </p>
                        <div className="relative p-4 border rounded-xl bg-[#f3f8fc] border-[#c2d8e8] hover:border-[#0a66c2]/60 transition-all duration-200">
                           <div className="absolute top-3 right-3 text-gray-400">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 1C8.676 1 6 3.676 6 7v1H4v15h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                              </svg>
                           </div>
                           <p
                              className="text-sm leading-relaxed text-[rgba(0,0,0,0.75)] pr-5"
                              style={{ filter: "blur(5px)", userSelect: "none", WebkitUserSelect: "none" }}
                           >
                              {fakeTexts[i]}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Card>
      );
   }

   const sorted = sortByFinishDateDesc(workExperiences);

   return (
      <Card className="p-4 sm:p-5">
         <SectionHeader title="Опыт работы" />
         <div className="space-y-5">
            {sorted.map((exp, i) => (
               <WorkItem
                  key={i}
                  item={exp}
                  sectionKey={`work-${i}`}
                  onBlurClick={onBlurClick}
                  is_purchased={is_purchased}
                  targetCountry={targetCountry}
               />
            ))}
         </div>
      </Card>
   );
}
