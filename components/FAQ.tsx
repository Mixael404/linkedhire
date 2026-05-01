"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const items = [
   {
      q: "Что именно я получу после оплаты?",
      a: "LinkedIn Headline, About section, Experience bullets, Skills/keywords - всё на английском. Плюс PDF-резюме, готовое к отправке, и инструкцию куда и что вставить.",
   },
   {
      q: "Это будет готовый PDF-файл?",
      a: "Да. Скачать PDF-резюме на английском можно одной кнопкой прямо из профиля - готово к отправке рекрутеру без редактирования.",
   },
   {
      q: "Можно ли использовать без знания английского?",
      a: "Да. Форму заполняешь на русском - ИИ сам генерирует все тексты на английском, включая правильную терминологию под выбранный рынок.",
   },
   {
      q: "Вы заходите в мой LinkedIn?",
      a: "Нет. Мы не запрашиваем доступ к аккаунту. Ты получаешь готовые тексты - и сам вставляешь их в LinkedIn за 5–10 минут по нашей инструкции.",
   },
   {
      q: "Нужно ли уже иметь LinkedIn?",
      a: "Нет, аккаунт LinkedIn не обязателен для генерации профиля. Но чтобы тебя находили рекрутеры - он понадобится. Мы даём инструкцию по созданию и заполнению с нуля.",
   },
   {
      q: "Можно ли использовать для Германии / США / UK?",
      a: "Да. На шаге онбординга выбираешь целевой рынок - профиль и ключевые слова генерируются под стандарты именно этого рынка.",
   },
   {
      q: "Подходит ли для Junior / Middle / Senior?",
      a: "Да, для любого уровня. ИИ адаптирует подачу под опыт: Junior делает упор на стек и потенциал, Middle и Senior - на результаты, масштаб и leadership.",
   },
   {
      q: "Это гарантия оффера?",
      a: "Нет. Мы не обещаем оффер. Мы помогаем правильно упаковать опыт под международный рынок.",
   },
   {
      q: "Это конструктор резюме?",
      a: "LinkedHire - больше, чем конструктор резюме. Это полная оптимизация под международный рынок: LinkedIn-профиль, ATS-ready PDF и ключевые слова под нужную страну. Всё на основе твоего реального опыта.",
   },
   {
      q: "Под какие IT-специальности подходит?",
      a: "Под большинство технических ролей: разработка (frontend, backend, fullstack), DevOps, QA, data, product. ИИ автоматически адаптирует профиль под твою специальность.",
   },
   {
      q: "Сколько времени занимает весь процесс?",
      a: "10–15 минут на заполнение формы, ещё 1–2 минуты на генерацию. Итого - меньше получаса от нуля до готового профиля.",
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
         {open && <p className="text-[#94A3B8] text-sm leading-relaxed pb-5">{a}</p>}
      </div>
   );
}

export default function FAQ() {
   return (
      <section className="py-10">
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
