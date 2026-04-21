import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";

export default function EducationSection() {
   return (
      <Card className="p-4 sm:p-5">
         <SectionHeader title="Образование" />
         <div className="flex gap-3 sm:gap-4">
            <div
               className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white"
               style={{ background: "#c8102e" }}
            >
               YEO
            </div>
            <div className="flex-1 min-w-0">
               <p className="font-semibold text-[rgba(0,0,0,0.9)] text-[15px] leading-snug">
                  Your educational organization
               </p>
               <p className="text-[14px] text-[rgba(0,0,0,0.75)] mt-0.5">
                  Bachelor&apos;s degree, Computer Science
               </p>
               <p className="text-[12px] text-[rgba(0,0,0,0.55)] mt-0.5">
                  сент. 2022 г. – настоящее время
               </p>
            </div>
         </div>
      </Card>
   );
}
