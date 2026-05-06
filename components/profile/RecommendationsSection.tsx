"use client";

import { useMemo } from "react";
import type { GeneratedRecommendation } from "@/app/api/generate-profile/route";
import Card from "@/components/profile/Card";
import SectionHeader from "@/components/profile/SectionHeader";
import CopyCard from "@/components/ui/CopyCard";
import { padWithFakeWords } from "@/lib/padWithFakeWords";
import { HiUser } from "react-icons/hi2";

const MOCK_RECOMMENDERS = [
   { name: "Alex Johnson", title: "Engineering Manager", company: "TechCorp Solutions" },
   { name: "Sarah Mitchell", title: "Senior Software Engineer", company: "Innovate Labs" },
   { name: "David Chen", title: "CTO", company: "Digital Ventures" },
   { name: "Emma Wilson", title: "Tech Lead", company: "CloudBase Inc" },
   { name: "Michael Brown", title: "VP of Engineering", company: "Nexus Systems" },
   { name: "Laura Davis", title: "Principal Engineer", company: "Apex Technologies" },
] as const;

type Props = {
   recommendations: GeneratedRecommendation[];
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
};

export default function RecommendationsSection({ recommendations, onBlurClick, is_purchased }: Props) {
   const fakeTexts = useMemo(
      () =>
         Array.from({ length: Math.max(2, recommendations.length) }, () =>
            padWithFakeWords("x", Math.floor(Math.random() * 201) + 1000),
         ),
      [recommendations.length],
   );

   if (recommendations.length === 0) return null;
   const tooltipText = (
      <>
         Попросите коллегу или менеджера оставить рекомендацию в LinkedIn. Лучше выбрать человека с сильным профилем, с которым вы работали вместе — такие рекомендации выглядят убедительнее.
         <br /><br />
         Как добавить:<br /><br />
         1. Нажмите «Добавить раздел» и выберите «Рекомендации»<br />
         2. В разделе нажмите «+» → «Запросить рекомендацию»
      </>
   );

   return (
      <Card className="p-4 sm:p-5">
         <SectionHeader title="Рекомендации" tooltip={tooltipText} />
         <div className="space-y-5">
            {recommendations.map((rec, i) => {
               const mock = MOCK_RECOMMENDERS[i % MOCK_RECOMMENDERS.length];
               const bodyText = is_purchased
                  ? (rec.text ?? "")
                  : padWithFakeWords(rec.text ?? "", 1000);

               return (
                  <div key={rec.id} className="flex gap-3 sm:gap-4">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8f0f8] border border-[#c8d8e8] shrink-0 flex items-center justify-center text-[#5b8db8]">
                        <HiUser size={22} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p
                           className="font-semibold text-[rgba(0,0,0,0.9)] text-[16px] leading-snug"
                           style={!is_purchased ? { filter: "blur(5px)", userSelect: "none" } : {}}
                        >
                           {mock.name}
                        </p>
                        <p
                           className="text-[13px] text-[rgba(0,0,0,0.75)] mt-0.5"
                           style={!is_purchased ? { filter: "blur(5px)", userSelect: "none" } : {}}
                        >
                           {mock.title} · {mock.company}
                        </p>
                        <div className="mt-3">
                           <CopyCard
                              text={bodyText}
                              onBlurClick={() => onBlurClick(`recommendation-${i}`)}
                              visibleCharCount={0}
                              isBlurred={!is_purchased}
                              variant="light"
                           />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </Card>
   );
}
