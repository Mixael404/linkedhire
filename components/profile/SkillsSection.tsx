import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";
import CopyCard from "@/components/ui/CopyCard";

type Props = {
   skills: string[];
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
};

export default function SkillsSection({ skills, onBlurClick, is_purchased }: Props) {
   if (skills.length === 0) return null;

   return (
      <Card className="p-4 sm:p-5">
         <SectionHeader title="Навыки" />
         <div className="space-y-3 mb-4">
            {skills.slice(0, 3).map((skill, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(0,0,0,0.35)]" />
                  <span className="text-sm font-semibold text-[rgba(0,0,0,0.9)]">{skill}</span>
               </div>
            ))}
         </div>
         <CopyCard
            text={skills.join(" · ")}
            onBlurClick={() => onBlurClick("skills")}
            visibleCharCount={skills.slice(0, 3).join(" · ").length}
            isBlurred
            variant="light"
         />
      </Card>
   );
}
