"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const items = [
   {
      q: "Это конструктор резюме?",
      a: "LinkedHire - больше, чем просто конструктор резюме. Это инструмент полной оптимизации: LinkedIn-профиль с правильным Headline и About, ATS-ready PDF-резюме на английском и ключевые слова под нужную страну. Всё генерируется на основе вашего реального опыта, а не пустых шаблонов.",
   },
   {
      q: "Получу ли я готовый образец резюме для скачивания?",
      a: "Да. После оптимизации вы получаете PDF-резюме на английском - профессиональный образец, готовый к отправке рекрутеру. Скачать резюме можно одной кнопкой прямо из вашего профиля.",
   },
   {
      q: "Поможет ли сервис найти работу на удалёнке?",
      a: "Именно для этого создан LinkedHire. Профиль оптимизируется под remote-позиции в США и Европе: правильные ключевые слова, формат, который читают международные рекрутеры, и LinkedIn-профиль, который выходит в топ поиска. Работа на удалёнке - не привилегия, а стандарт для IT за рубежом.",
   },
   {
      q: "Под какие IT-вакансии подходит оптимизация?",
      a: "Под большинство технических специальностей: разработка (frontend, backend, fullstack), DevOps, QA, аналитика данных, продуктовый дизайн, продакт-менеджмент. ИИ автоматически адаптирует профиль под вашу специальность и целевой рынок.",
   },
   {
      q: "Нужно ли знать английский для заполнения?",
      a: "Нет. Форму заполняете на русском - всё остальное делает ИИ. Тексты для LinkedIn и PDF-резюме генерируются на английском автоматически, в том числе с правильной терминологией под выбранный рынок.",
   },
   {
      q: "Сколько времени занимает весь процесс?",
      a: "Обычно 10–15 минут на заполнение формы, ещё 1–2 минуты на генерацию. Итого - меньше получаса от нуля до готового LinkedIn-профиля и PDF-резюме.",
   },
];

function Item({ q, a }: { q: string; a: string }) {
   const [open, setOpen] = useState(false);
   return (
      <div className="border-b border-[#1B2847] last:border-0">
         <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
         >
            <span
               className="text-white font-semibold text-[15px] group-hover:text-[#3B82F6] transition-colors"
               style={{ fontFamily: "var(--font-geologica)" }}
            >
               {q}
            </span>
            <HiChevronDown
               size={18}
               className={`text-[#64748B] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
         </button>
         {open && (
            <p className="text-[#94A3B8] text-sm leading-relaxed pb-5">{a}</p>
         )}
      </div>
   );
}

export default function FAQ() {
   return (
      <section className="py-20">
         <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="section-label mb-4 inline-flex">FAQ</span>
               <h2
                  className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Частые вопросы
               </h2>
            </div>

            <div className="card px-6">
               {items.map((item) => (
                  <Item key={item.q} {...item} />
               ))}
            </div>
         </div>
      </section>
   );
}
