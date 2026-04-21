import type { GeneratedWorkExperience } from "@/app/api/generate-profile/route";
import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";
import WorkItem from "@/components/profile/WorkItem";
import { sortByFinishDateDesc } from "@/lib/sortByDate";

type Props = {
   workExperiences: GeneratedWorkExperience[];
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
   targetCountry: string;
};

export default function ExperienceSection({ 
   workExperiences, 
   onBlurClick, 
   is_purchased, 
   targetCountry 
}: Props) {
   if (workExperiences.length === 0) return null;

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
