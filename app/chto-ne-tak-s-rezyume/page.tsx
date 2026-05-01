import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight, HiXCircle, HiCheckCircle } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Что не так с моим резюме - чек-лист типичных ошибок",
   description:
      "6 ошибок в резюме, которые срезают шансы до живого рекрутера. Нет метрик, список обязанностей, неправильный заголовок, формат ломает ATS - разбираем каждую.",
   alternates: { canonical: "/chto-ne-tak-s-rezyume" },
};

const errors = [
   {
      id: "01",
      title: "Нет метрик - только обязанности",
      bad: "«Разрабатывал API для мобильного приложения, поддерживал базу данных, участвовал в code review»",
      good: "«Разработал REST API для iOS/Android: 2M+ запросов в сутки, p99 latency 90ms. Оптимизировал 12 медленных SQL-запросов - сократил время ответа в 3×»",
      why: "Рекрутер не может оценить масштаб задачи без цифр. «Разрабатывал» читается как любой джуниор. Метрики дают контекст и вес.",
   },
   {
      id: "02",
      title: "Заголовок не соответствует вакансии",
      bad: "«Software Developer» на вакансию «Senior Backend Engineer (Python)»",
      good: "«Senior Python Engineer · Backend · Fintech»",
      why: "ATS ищет точное совпадение с названием вакансии. Рекрутер сканирует заголовок за 2 секунды. Несоответствие = следующий кандидат.",
   },
   {
      id: "03",
      title: "Нет ключевых слов для ATS",
      bad: "Опыт описан через «работал с технологиями», «использовал фреймворки», «занимался бэкендом»",
      good: "Python, Django, FastAPI, PostgreSQL, Redis, Docker, Kubernetes, REST API, microservices - прямо в тексте каждого опыта",
      why: "ATS парсит резюме и считает вхождения ключевых слов из описания вакансии. Если слова не совпадают буквально - балл низкий, резюме отсевается автоматически.",
   },
   {
      id: "04",
      title: "Резюме слишком длинное или слишком короткое",
      bad: "5 страниц с детальным описанием всех проектов за 10 лет. Или 0.5 страницы с одним абзацем на весь опыт.",
      good: "1–2 страницы: последние 5–7 лет опыта, только релевантные проекты, без лирики и хобби",
      why: "Рекрутер тратит 6–10 секунд на первичный просмотр. Длинное резюме перегружает, короткое выглядит как скрытие опыта. Стандарт US/EU - 1–2 страницы.",
   },
   {
      id: "05",
      title: "Формат ломает ATS-парсинг",
      bad: "Таблицы, колонки, иконки, цветные блоки, шкалы прогресса навыков, фото, заголовок в хедере файла",
      good: "Одноколоночный текст, стандартные шрифты (Arial, Calibri), PDF без защиты или .docx",
      why: "ATS парсит резюме в plain text. Таблицы и колонки разрушают структуру - технологии перемешиваются с должностями. Результат: 0 баллов релевантности.",
   },
   {
      id: "06",
      title: "Summary без конкретики",
      bad: "«Опытный разработчик, ищу интересные проекты, люблю работать в команде и учиться новому»",
      good: "«Senior Python Engineer, 6 лет в fintech. Строил highload-системы на FastAPI/Django (до 10M событий в сутки). Ищу remote EU/US позиции.»",
      why: "Первый блок - единственное, что читают всегда. Общие фразы не дают рекрутеру ни одной причины продолжать читать. Конкретика создаёт интерес.",
   },
];

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#oshibki", label: "6 ошибок" },
               { href: "#kak-proverit", label: "Как проверить" },
            ]}
         />
         <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
               <span className="section-label mb-4 inline-flex items-center gap-2">
                  <span>✦</span> Чек-лист
               </span>
               <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-5 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Что не так{" "}
                  <span className="text-gradient">с моим резюме</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Опыт есть - ответов нет. Чаще всего дело не в квалификации, а в конкретных
                  ошибках оформления и подачи. Разбираем 6 самых частых.
               </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-14">
               {[
                  { v: "6 сек", l: "рекрутер тратит на первичный просмотр" },
                  { v: "80%", l: "резюме не проходят ATS-фильтр" },
                  { v: "×3", l: "больше ответов при наличии метрик" },
               ].map((s) => (
                  <div key={s.v} className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426] text-center">
                     <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-geologica)" }}>{s.v}</div>
                     <div className="text-[#64748B] text-sm">{s.l}</div>
                  </div>
               ))}
            </div>

            <section id="oshibki" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-7" style={{ fontFamily: "var(--font-geologica)" }}>
                  6 типичных ошибок
               </h2>
               <div className="space-y-6">
                  {errors.map((e) => (
                     <div key={e.id} className="card p-6">
                        <div className="flex items-start gap-4 mb-4">
                           <span
                              className="text-3xl font-black text-[#2563EB]/30 leading-none shrink-0"
                              style={{ fontFamily: "var(--font-geologica)" }}
                           >
                              {e.id}
                           </span>
                           <h3 className="text-white font-bold text-base leading-snug pt-1">{e.title}</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                           <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-4">
                              <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                 <HiXCircle size={13} /> Как обычно
                              </p>
                              <p className="text-[#94A3B8] text-xs leading-relaxed italic">{e.bad}</p>
                           </div>
                           <div className="rounded-xl bg-green-500/5 border border-green-500/15 p-4">
                              <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                 <HiCheckCircle size={13} /> Как надо
                              </p>
                              <p className="text-[#94A3B8] text-xs leading-relaxed">{e.good}</p>
                           </div>
                        </div>

                        <p className="text-[#475569] text-xs leading-relaxed border-t border-[#1B2847] pt-3">
                           <span className="text-[#64748B] font-semibold">Почему важно: </span>
                           {e.why}
                        </p>
                     </div>
                  ))}
               </div>
            </section>

            <section id="kak-proverit" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Как проверить своё резюме прямо сейчас
               </h2>
               <div className="space-y-2.5 mb-6">
                  {[
                     "Открой резюме и найди хотя бы 3 конкретные цифры/метрики в опыте",
                     "Проверь, совпадает ли заголовок с названием целевой вакансии",
                     "Посчитай сколько раз упоминаются ключевые технологии из стека",
                     "Убедись что нет таблиц, колонок, иконок, шкал прогресса",
                     "Длина: не более 2 страниц, охват - последние 7 лет",
                     "Summary: есть уровень, специализация, цифры, целевой рынок",
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
                  Исправить всё за 10 минут
               </p>
               <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  LinkedHire генерирует резюме под международный рынок с нужными ключевыми словами,
                  конкретными достижениями и правильным форматированием. ATS-compatible, US/EU стандарт.
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Получить готовое резюме
                  <HiArrowRight size={15} />
               </Link>
            </div>

            <ClusterLinks currentHref="/chto-ne-tak-s-rezyume" />
         </main>
      </div>
   );
}
