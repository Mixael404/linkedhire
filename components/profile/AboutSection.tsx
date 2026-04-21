import { HiPencilSquare, HiArrowRight } from "react-icons/hi2";
import { IoDiamondOutline } from "react-icons/io5";
import Card from "@/components/profile/Card";
import CopyCard from "@/components/ui/CopyCard";
import { padWithFakeWords } from "@/lib/padWithFakeWords";
import Tooltip from "../ui/Tooltip";

type Props = {
   about: string;
   skills: string[];
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
};

export default function AboutSection({ about, skills, onBlurClick, is_purchased }: Props) {
   const skillsText = skills.join(" • ");

   return (
      <Card className="p-4 sm:p-5">
         <div className="flex justify-between items-start mb-3">
            <h2 className="text-[18px] font-semibold text-[rgba(0,0,0,0.9)]">Общие сведения</h2>
            <Tooltip content="Редактирование общих сведений (О себе)">
               <div className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                  <HiPencilSquare size={18} />
               </div>
            </Tooltip>
         </div>
         <CopyCard
            text={is_purchased ? about : padWithFakeWords(about, 1000)}
            onBlurClick={() => onBlurClick("about")}
            visibleCharCount={about.length}
            isBlurred={!is_purchased}
            variant="light"
         />

         {skills.length > 0 && (
            <div
               className="mt-4 flex items-center justify-between gap-3 p-4 border border-[#b6b6b6] rounded-xl select-none"
               onClick={() => onBlurClick("skills-about")}
            >
               <div className="flex items-start gap-3 min-w-0">
                  <IoDiamondOutline size={20} className="text-[#757575] shrink-0" />
                  <div className="min-w-0">
                     <p className="text-sm font-semibold text-[rgba(0,0,0,0.9)]">Основные навыки</p>
                     <p
                        className="text-xs text-[rgba(0,0,0,0.55)] mt-1.5 truncate"
                        style={!is_purchased ? { filter: "blur(5px)", userSelect: "none" } : undefined}
                     >
                        {skillsText.slice(0, 100)}
                     </p>
                  </div>
               </div>
               <HiArrowRight size={18} className="text-[rgba(0,0,0,0.4)] shrink-0" />
            </div>
         )}
      </Card>
   );
}
