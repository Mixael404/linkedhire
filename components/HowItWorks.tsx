import { HiArrowRight } from "react-icons/hi2";
import CTAButton from "./ui/CTAButton";

const steps = [
   {
      n: "01",
      time: "~5 минут",
      title: "Проходишь анкетирование по опыту и стеку",
      bullets: [
         "Мы вытаскиваем твои: стек, проекты, результаты, достижения, метрики",
         "Даже если опыт «сыроват» - мы разберёмся",
         "Просто отвечаешь на вопросы на русском",
      ],
   },
   {
      n: "02",
      time: "~30 секунд",
      title: "Получаешь готовый LinkedIn-профиль под международный рынок",
      bullets: [
         "Headline → под поиск рекрутеров",
         "About → с цифрами и результатами",
         "Experience → как “кейсы”, а не обязанности",
         "Recommendations → рекомендации от коллег и руководителей",
         "Skills → ATS-оптимизированные теги",
         "PDF-резюме → готово к отправке",
      ],
   },
   {
      n: "03",
      time: "~30 секунд",
      title: "Добавляем ключевые слова:",
      bullets: [
         "Python developer remote",
         "Backend engineer EU",
         "Fintech APIs",
         "👉 чтобы тебя начали находить",
      ],
   },
   {
      n: "04",
      time: "~5 минут",
      title: "Тебе показывают, куда это вставить в LinkedIn",
      bullets: [
         "Точные шаги - без «разберись сам»",
         "Копируешь → вставляешь → готово",
         "Инструкция встроена прямо в профиль",
      ],
   },
   {
      n: "05",
      time: "сразу после",
      title: "Начинаешь появляться в поиске рекрутеров",
      bullets: [
         "Профиль индексируется по нужным запросам",
         "Готовое PDF-резюме - можно сразу откликаться",
         "Принимаешь входящие от рекрутеров",
      ],
   },
];

const NO_NEED = [
   "Не нужно идеально знать английский",
   "Не нужно разбираться в LinkedIn",
   "Не нужно ничего придумывать самому",
];

export default function HowItWorks() {
   return (
      <section id="how" className="py-20 bg-[#0A0D1F]">
         <div className="absolute left-0 right-0 h-px divider" />
         <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
               <span className="section-label mb-4 inline-flex">Как работает</span>
               <h2
                  className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  От анкеты к готовому LinkedIn -{" "}
                  <span className="text-gradient">за 10 минут</span>
               </h2>
               <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                  Без догадок, без английского, без шаблонов.
               </p>
            </div>

            <div className="space-y-4 mb-12">
               {steps.map((step) => (
                  <div
                     key={step.n}
                     className="card p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-start"
                  >
                     <div className="shrink-0">
                        <div
                           className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm"
                           style={{
                              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                              fontFamily: "var(--font-geologica)",
                           }}
                        >
                           {step.n}
                        </div>
                     </div>

                     <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                           <h3
                              className="text-white font-bold text-[17px]"
                              style={{ fontFamily: "var(--font-geologica)" }}
                           >
                              {step.title}
                           </h3>
                           <span className="text-xs font-semibold text-[#3B82F6] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-0.5 rounded-full shrink-0">
                              {step.time}
                           </span>
                        </div>
                        <ul className="space-y-1.5 mt-3">
                           {step.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2 text-sm text-[#64748B]">
                                 <HiArrowRight
                                    className="text-[#3B82F6] shrink-0 mt-0.5"
                                    size={14}
                                 />
                                 {b}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>

            {/* After results */}
            <div className="card p-7 mb-6">
               <p
                  className="text-white font-bold text-lg mb-6"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Что происходит после
               </p>
               <div className="space-y-0 mb-8">
                  {[
                     { range: "1–3 дня", event: "появляются просмотры профиля" },
                     { range: "3–7 дней", event: "первые сообщения от рекрутеров" },
                     { range: "1–2 недели", event: "первые технические интервью" },
                  ].map(({ range, event }, i, arr) => (
                     <div key={range} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                           <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1 shrink-0" />
                           {i < arr.length - 1 && (
                              <div className="w-px flex-1 bg-[#1B2847] my-1 min-h-7" />
                           )}
                        </div>
                        <div className="pb-5">
                           <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
                              Через {range}
                           </span>
                           <p className="text-[#94A3B8] text-sm mt-0.5">{event}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <CTAButton href="/onboarding">
                  Получить за 10 минут
                  <HiArrowRight size={16} />
               </CTAButton>
            </div>

            {/* Anti-fear */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
               {NO_NEED.map((item) => (
                  <span key={item} className="text-[#475569] text-sm flex items-center gap-1.5">
                     <span className="w-1 h-1 rounded-full bg-[#475569]" />
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </section>
   );
}
