import {
   HiPencilSquare,
   HiDocumentText,
   HiBriefcase,
   HiCodeBracket,
   HiArrowDownTray,
   HiBookOpen,
   HiStar,
} from "react-icons/hi2";

const ITEMS = [
   {
      icon: HiPencilSquare,
      title: "LinkedIn Headline",
      subtitle: "Первое, что видит рекрутер - заточен под международный рынок",
      accent: { bg: "bg-[#2563EB]/10", border: "border-[#2563EB]/20", text: "text-[#3B82F6]" },
   },
   {
      icon: HiDocumentText,
      title: "About section",
      subtitle: "Твоя история на английском - убедительно и без воды",
      accent: { bg: "bg-[#06B6D4]/10", border: "border-[#06B6D4]/20", text: "text-[#06B6D4]" },
   },
   {
      icon: HiBriefcase,
      title: "Experience bullets",
      subtitle: "Достижения в международном формате с цифрами и результатами",
      accent: { bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20", text: "text-[#A78BFA]" },
   },
   {
      icon: HiStar,
      title: "Recommendations",
      subtitle: "Готовые тексты рекомендаций от коллег и руководителей - под международный формат",
      accent: { bg: "bg-[#F97316]/10", border: "border-[#F97316]/20", text: "text-[#FDBA74]" },
   },
   {
      icon: HiCodeBracket,
      title: "Skills / keywords",
      subtitle: "ATS-оптимизированные теги - тебя найдут нужные рекрутеры",
      accent: { bg: "bg-[#10B981]/10", border: "border-[#10B981]/20", text: "text-[#34D399]" },
   },
   {
      icon: HiArrowDownTray,
      title: "PDF-резюме на английском",
      subtitle: "Готово к отправке - в международном формате",
      accent: { bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/20", text: "text-[#FCD34D]" },
   },
   // {
   //    icon: HiBookOpen,
   //    title: "Инструкция куда всё вставить",
   //    subtitle: "Пошаговый гайд - в LinkedIn и куда отправлять резюме",
   //    accent: { bg: "bg-[#EC4899]/10", border: "border-[#EC4899]/20", text: "text-[#F472B6]" },
   // },
];

export default function WhatYouGet() {
   return (
      <section className="py-10 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F2B]/60 to-transparent pointer-events-none" />
         <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="section-label mb-4 inline-flex items-center gap-2">
                  <span>✦</span>
                  Результат
               </span>
               <h2
                  className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white leading-tight tracking-tight mt-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Что ты получишь <span className="text-gradient">за 10 минут</span>
               </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {ITEMS.map(({ icon: Icon, title, subtitle, accent }, i) => (
                  <div
                     key={i}
                     className={`card p-5 rounded-2xl border ${accent.border} hover:brightness-110 transition-all duration-200`}
                  >
                     <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${accent.bg} border ${accent.border} mb-4 ${accent.text}`}
                     >
                        <Icon size={20} />
                     </div>
                     <h3
                        className="text-white font-bold text-[15px] mb-1.5"
                        style={{ fontFamily: "var(--font-geologica)" }}
                     >
                        {title}
                     </h3>
                     <p className="text-[#64748B] text-sm leading-relaxed">{subtitle}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
