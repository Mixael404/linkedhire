import type { GeneratedProject } from "@/app/api/generate-profile/route";
import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";
import WorkItem from "@/components/profile/WorkItem";
import { sortByFinishDateDesc } from "@/lib/sortByDate";

type Props = {
   projects: GeneratedProject[];
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
   targetCountry: string;
};

export default function ProjectsSection({ projects, onBlurClick, is_purchased, targetCountry }: Props) {
   if (projects.length === 0) return null;

   const sorted = sortByFinishDateDesc(projects);

   return (
      <Card className="p-4 sm:p-5">
         <SectionHeader title="Проекты" />
         <div className="space-y-5">
            {sorted.map((proj, i) => (
               <WorkItem
                  key={i}
                  item={proj}
                  sectionKey={`project-${i}`}
                  onBlurClick={onBlurClick}
                  is_purchased={is_purchased}
                  targetCountry={targetCountry}
               />
            ))}
         </div>
      </Card>
   );
}
