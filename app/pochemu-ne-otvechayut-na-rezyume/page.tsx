import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Почему не отвечают на резюме программисту - разбор причин",
   description:
      "Отправляешь резюме и тишина? Разбираем 5 реальных причин: ATS-фильтр, первые 6 секунд, отсутствие ключевых слов. Что именно исправить.",
   alternates: { canonical: "/pochemu-ne-otvechayut-na-rezyume" },
   openGraph: {
      title: "Почему не отвечают на резюме программисту",
      description: "5 причин молчания и что конкретно исправить в резюме и LinkedIn.",
   },
};

const REASONS = [
   {
      title: "ATS отсеивает тебя до человека",
      body: "90% крупных компаний используют ATS - систему автоматического отбора резюме. Она проверяет наличие ключевых слов из описания вакансии. Нет слов - нет просмотра человеком. Резюме, написанное «от себя», без оглядки на формулировки вакансии, проваливается на этом этапе.",
   },
   {
      title: "Первые 6 секунд: рекрутер не видит главного",
      body: "Если резюме прошло ATS, рекрутер тратит 6–10 секунд на первичный просмотр. За это время он должен понять: кто ты, что умеешь, какой уровень. Если Headline и первые строки не отвечают на это мгновенно - резюме уходит в архив.",
   },
   {
      title: "Нет правильных ключевых слов",
      body: "«Разработчик» и «Senior Backend Engineer - Python, Fintech, remote» - это разные вещи с точки зрения поиска. LinkedIn и рекрутерские базы работают как поисковики. Без точных ключевых слов тебя просто не найдут по нужным запросам.",
   },
   {
      title: "Опыт описан как список обязанностей",
      body: "«Разрабатывал бэкенд-логику» ничего не говорит рекрутеру. «Сократил время отклика API с 800мс до 120мс, обслуживая 3M+ запросов в сутки» - говорит. Западный рынок оценивает результаты и масштаб, а не обязанности.",
   },
   {
      title: "Формат не соответствует международному стандарту",
      body: "Резюме с фото, таблицами и графиками «навыков» - это российский стандарт. На западном рынке такой формат ломается в ATS, выглядит непрофессионально и сразу сигнализирует: «этот человек не знает, как здесь принято».",
   },
];

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#prichiny", label: "Причины" },
               { href: "#chto-ispravit", label: "Что исправить" },
               { href: "#mezhdunarodnyi", label: "Международный рынок" },
            ]}
         />
         <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
               <span className="section-label mb-4 inline-flex items-center gap-2">
                  <span>✦</span> Разбор
               </span>
               <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-5 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Почему не отвечают на резюме{" "}
                  <span className="text-gradient">программисту</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Ты отправляешь резюме - и тишина. Иногда автоматический отказ через 5 минут.
                  Иногда просто ничего. Это не потому что ты плохой специалист. Это системная
                  проблема, у которой есть конкретные причины - и конкретные решения.
               </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-14">
               {[
                  { v: "300+", l: "конкурентов на одну мидл-вакансию" },
                  { v: "80%", l: "резюме не доходят до живого рекрутера" },
                  { v: "6 сек", l: "рекрутер тратит на первичный просмотр" },
               ].map((s) => (
                  <div key={s.v} className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426] text-center">
                     <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-geologica)" }}>
                        {s.v}
                     </div>
                     <div className="text-[#64748B] text-sm">{s.l}</div>
                  </div>
               ))}
            </div>

            {/* 5 reasons */}
            <section id="prichiny" className="mb-14">
               <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-8"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  5 причин, почему молчат рекрутеры
               </h2>
               <div className="space-y-5">
                  {REASONS.map((r, i) => (
                     <div key={i} className="card p-6">
                        <h3
                           className="text-white font-bold text-base mb-3 flex items-start gap-3"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           <span className="text-gradient font-black text-lg shrink-0">0{i + 1}</span>
                           {r.title}
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed">{r.body}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* What to fix */}
            <section id="chto-ispravit" className="mb-14">
               <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-6"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Что конкретно исправить
               </h2>
               <div className="space-y-3">
                  {[
                     "Переписать Headline под ключевые слова нужного рынка: «Python Backend Engineer · Fintech · Open to Remote EU»",
                     "Заменить список обязанностей на кейсы с метриками: не «работал с API», а «разработал REST API, снизив время ответа на 60%»",
                     "Убрать фото, таблицы, графики - использовать простой ATS-friendly формат",
                     "Добавить ключевые слова в About, Experience и Skills - те же слова, что в описаниях вакансий",
                     "Указать уровень и специализацию сразу в заголовке профиля",
                  ].map((item, i) => (
                     <div key={i} className="flex items-start gap-3">
                        <HiCheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-[#94A3B8] text-sm leading-relaxed">{item}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* International angle */}
            <section id="mezhdunarodnyi" className="card p-8 mb-8">
               <h2
                  className="text-white font-black text-xl mb-3"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Ещё один аргумент: международный рынок ждёт
               </h2>
               <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  Пока на hh.ru 300 конкурентов на вакансию, на LinkedIn рекрутеры из США и Европы
                  сами ищут разработчиков. Разница в том, как оформлен профиль. Правильный
                  LinkedIn - и входящие сообщения начинают приходить без единого отклика с твоей
                  стороны.
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Исправить профиль за 10 минут
                  <HiArrowRight size={15} />
               </Link>
            </section>

            <ClusterLinks currentHref="/pochemu-ne-otvechayut-na-rezyume" />
         </main>
      </div>
   );
}
