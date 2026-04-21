import type { GeneratedWorkExperience, GeneratedProject } from "@/app/api/generate-profile/route";
import CopyCard from "@/components/ui/CopyCard";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { padWithFakeWords } from "@/lib/padWithFakeWords";
import { formatPeriod } from "@/lib/formatPeriod";

export default function WorkItem({
   item,
   sectionKey,
   onBlurClick,
   is_purchased,
   targetCountry,
}: {
   item: GeneratedWorkExperience | GeneratedProject;
   sectionKey: string;
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
   targetCountry: string;
}) {

   const descriptionText = is_purchased
      ? item.description
      : padWithFakeWords(item.description, 1000);

   return (
      <div className="flex gap-3 sm:gap-4">
         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#e8f0f8] border border-[#c8d8e8] shrink-0 flex items-center justify-center text-[#5b8db8]">
            <HiBuildingOffice2 size={22} />
         </div>
         <div className="flex-1 min-w-0">
            <p className="font-semibold text-[rgba(0,0,0,0.9)] text-[18px] leading-snug">
               {item.position}
            </p>
            <p className="font-medium text-[rgba(0,0,0,0.9)] text-[14px] mt-0.5">{item.company}</p>
            <p className="text-[11px] text-[rgba(0,0,0,0.75)] mt-0.5 mb-0.5">
               {formatPeriod(item.start_date, item.finish_date, item.is_current)}
            </p>
            <p className="text-[11px] text-[rgba(0,0,0,0.75)] mb-3">
               {targetCountry}
            </p>
            <CopyCard
               text={descriptionText}
               onBlurClick={() => onBlurClick(sectionKey)}
               visibleCharCount={0}
               isBlurred={!is_purchased}
               variant="light"
            />
         </div>
      </div>
   );
}
