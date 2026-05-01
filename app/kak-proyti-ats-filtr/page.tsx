import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight, HiXCircle, HiCheckCircle } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Как пройти ATS-фильтр - что убивает резюме до человека",
   description:
      "80% резюме не доходят до живого рекрутера из-за ATS. Разбираем что такое ATS, какие ошибки форматирования убивают резюме и как сделать ATS-ready документ.",
   alternates: { canonical: "/kak-proyti-ats-filtr" },
};

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#chto-takoe-ats", label: "Что такое ATS" },
               { href: "#oshibki", label: "Ошибки форматирования" },
               { href: "#kak-sdelat", label: "ATS-ready резюме" },
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
                  Как пройти{" "}
                  <span className="text-gradient">ATS-фильтр</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  80% резюме отсеиваются автоматически - до того, как их увидит живой человек.
                  ATS - это не враг, но его нужно понимать. Разберём что делает резюме невидимым
                  и как это исправить.
               </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-14">
               {[
                  { v: "90%", l: "крупных компаний используют ATS" },
                  { v: "80%", l: "резюме отсеиваются автоматически" },
                  { v: "0 сек", l: "человек смотрит на отклонённое резюме" },
               ].map((s) => (
                  <div key={s.v} className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426] text-center">
                     <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-geologica)" }}>{s.v}</div>
                     <div className="text-[#64748B] text-sm">{s.l}</div>
                  </div>
               ))}
            </div>

            <section id="chto-takoe-ats" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Что такое ATS и как он работает
               </h2>
               <div className="card p-6">
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-3">
                     ATS (Applicant Tracking System) - программа, которая получает твоё резюме раньше
                     рекрутера. Она парсит текст, ищет ключевые слова из описания вакансии и присваивает
                     резюме балл релевантности. Рекрутер видит отсортированный список - сверху те, кто
                     набрал больше баллов.
                  </p>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                     Проблема: ATS плохо читает сложное форматирование. Таблицы, колонки, картинки,
                     нестандартные шрифты - всё это ломает парсинг. Резюме может быть отличным, но ATS
                     прочитает его как набор символов и поставит 0 баллов.
                  </p>
               </div>
            </section>

            <section id="oshibki" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Ошибки форматирования, которые убивают резюме
               </h2>
               <div className="space-y-3">
                  {[
                     "Таблицы и многоколоночная вёрстка - ATS теряет структуру",
                     "Картинки, иконки, инфографика - не читаются",
                     "Заголовок в хедере файла - парсится некорректно",
                     "Нестандартные шрифты и PDF с защитой - блокируют парсинг",
                     "«Навыки» в виде полосок прогресса - ATS не понимает проценты",
                     "Фото в резюме - на западном рынке не принято и ломает разметку",
                     "Цветные блоки с текстом - часто теряются при парсинге",
                  ].map((e, i) => (
                     <div key={i} className="flex items-start gap-3">
                        <HiXCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-[#94A3B8] text-sm leading-relaxed">{e}</p>
                     </div>
                  ))}
               </div>
            </section>

            <section id="kak-sdelat" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Как сделать ATS-ready резюме
               </h2>
               <div className="space-y-3 mb-6">
                  {[
                     "Простой одноколоночный формат - никаких таблиц и колонок",
                     "Стандартные шрифты: Arial, Calibri, Georgia, размер 10–12pt",
                     "Чёткие заголовки секций: Work Experience, Education, Skills",
                     "Ключевые слова из описания вакансии - буквально те же слова",
                     "Даты в стандартном формате: Jan 2022 - Mar 2024",
                     "Сохранить в .docx или простой PDF без защиты",
                  ].map((item, i) => (
                     <div key={i} className="flex items-start gap-3">
                        <HiCheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-[#94A3B8] text-sm leading-relaxed">{item}</p>
                     </div>
                  ))}
               </div>
            </section>

            <div className="card p-8 mb-8">
               <p className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-geologica)" }}>
                  ATS-ready резюме готово за 10 минут
               </p>
               <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  LinkedHire генерирует PDF-резюме в правильном формате под US/EU стандарты - с
                  нужными ключевыми словами, без лишнего форматирования, ATS-compatible.
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Получить ATS-ready резюме
                  <HiArrowRight size={15} />
               </Link>
            </div>

            <ClusterLinks currentHref="/kak-proyti-ats-filtr" />
         </main>
      </div>
   );
}
