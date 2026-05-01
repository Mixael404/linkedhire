"use client";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi2";

const reviews = [
   {
      name: "Алексей Козлов",
      role: "Backend Developer · Python",
      avatar: "АК",
      color: "from-[#2563EB] to-[#06B6D4]",
      text: "Три месяца отправлял резюме на hh.ru - ноль ответов. Обновил LinkedIn по инструкции - через две недели первые диалоги с рекрутерами из Германии, через месяц оффер. Не верил, что дело именно в профиле.",
   },
   {
      name: "Мария Лебедева",
      role: "Frontend Developer · React",
      avatar: "МЛ",
      color: "from-[#8B5CF6] to-[#EC4899]",
      text: "Полгода тишина. Поменяла headline и about - через полторы недели первое сообщение из Берлина. Сейчас работаю с командой в Нидерландах, без переезда. Очень жалею, что не сделала это раньше.",
   },
   {
      name: "Дмитрий Волков",
      role: "DevOps Engineer",
      avatar: "ДВ",
      color: "from-[#10B981] to-[#06B6D4]",
      text: "Думал, что без переезда невозможно попасть в западную компанию. Оказалось, что проблема была в том, как я себя подавал. Теперь работаю удалённо с командой в Амстердаме.",
   },
   {
      name: "Сергей Тихонов",
      role: "Fullstack · Node.js / React",
      avatar: "СТ",
      color: "from-[#F59E0B] to-[#EF4444]",
      text: "За 10 минут заполнил форму - получил готовый профиль. Не ожидал, что тексты будут такого качества. Через примерно две недели первый диалог с рекрутером, через три - оффер из Польши.",
   },
   {
      name: "Анна Соколова",
      role: "QA Engineer · Automation",
      avatar: "АС",
      color: "from-[#EC4899] to-[#8B5CF6]",
      text: "Английский у меня совсем не идеальный, боялась что не получится. Но сервис сам всё написал - я просто скопировала и вставила. Первый оффер из UK получила через три недели.",
   },
   {
      name: "Игорь Петров",
      role: "Data Engineer · Python / Spark",
      avatar: "ИП",
      color: "from-[#06B6D4] to-[#2563EB]",
      text: "До этого LinkedIn висел мёртвым грузом. После обновления начали находить рекрутеры сами - без моих откликов. Очень удобно, что не нужно разбираться в алгоритмах LinkedIn самому.",
   },
];

export default function Testimonials() {
   const [page, setPage] = useState(0);
   const perPage = 3;
   const total = Math.ceil(reviews.length / perPage);
   const visible = reviews.slice(page * perPage, page * perPage + perPage);

   return (
      <section className="py-20">
         <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="section-label mb-4 inline-flex items-center gap-2">
                  <span>✦</span> Отзывы
               </span>
               <h2
                  className="text-3xl sm:text-4xl font-black text-white mt-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Что говорят разработчики
               </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
               {visible.map((r) => (
                  <div key={r.name} className="card p-6 flex flex-col">
                     {/* Stars */}
                     <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                           <HiStar key={i} size={16} className="text-[#F59E0B]" />
                        ))}
                     </div>

                     {/* Text */}
                     <p className="text-[#94A3B8] text-sm leading-relaxed flex-1 mb-6">
                        &ldquo;{r.text}&rdquo;
                     </p>

                     {/* Author */}
                     <div className="flex items-center gap-3">
                        <div
                           className={`w-10 h-10 rounded-full bg-linear-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                        >
                           {r.avatar}
                        </div>
                        <div>
                           <p
                              className="text-white text-sm font-semibold"
                              style={{ fontFamily: "var(--font-geologica)" }}
                           >
                              {r.name}
                           </p>
                           <p className="text-[#475569] text-xs">{r.role}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
               <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="w-9 h-9 rounded-full border border-[#1B2847] flex items-center justify-center text-[#64748B] hover:border-[#2563EB]/50 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
               >
                  <HiChevronLeft size={18} />
               </button>

               <div className="flex gap-2">
                  {Array.from({ length: total }).map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                           i === page ? "w-6 bg-[#2563EB]" : "w-1.5 bg-[#1B2847] hover:bg-[#2563EB]/40"
                        }`}
                     />
                  ))}
               </div>

               <button
                  onClick={() => setPage((p) => Math.min(p + 1, total - 1))}
                  disabled={page === total - 1}
                  className="w-9 h-9 rounded-full border border-[#1B2847] flex items-center justify-center text-[#64748B] hover:border-[#2563EB]/50 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
               >
                  <HiChevronRight size={18} />
               </button>
            </div>
         </div>
      </section>
   );
}
