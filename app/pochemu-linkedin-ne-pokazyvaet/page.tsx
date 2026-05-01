import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Почему LinkedIn не показывает тебя рекрутерам - как работает алгоритм",
   description:
      "Профиль заполнен, а сообщений нет? Разбираем алгоритм поиска LinkedIn, почему ты невидим и что изменить чтобы начать появляться в результатах.",
   alternates: { canonical: "/pochemu-linkedin-ne-pokazyvaet" },
};

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#algoritm", label: "Алгоритм" },
               { href: "#klyuchevye-slova", label: "Ключевые слова" },
               { href: "#chto-izmenit", label: "Что изменить" },
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
                  Почему LinkedIn не показывает тебя{" "}
                  <span className="text-gradient">рекрутерам</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Ты заполнил профиль - но сообщений нет. LinkedIn работает как поисковик: если ты
                  не оптимизирован под запросы рекрутеров, тебя просто нет в результатах их поиска.
               </p>
            </div>

            <section id="algoritm" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Как работает алгоритм поиска LinkedIn
               </h2>
               <div className="card p-6 mb-4">
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                     Когда рекрутер ищет «Backend Engineer Python remote», LinkedIn ранжирует
                     результаты по релевантности. Он смотрит на Headline, текущую должность, раздел
                     Skills и ключевые слова в About и Experience. Если этих слов в твоём профиле
                     нет - ты не появляешься.
                  </p>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                     Важный нюанс: LinkedIn Premium и Recruiter Lite дают рекрутерам расширенные
                     фильтры - по месту работы, стеку, уровню, типу занятости. Каждый пустой или
                     неточный раздел в твоём профиле - это фильтр, который тебя отсекает.
                  </p>
               </div>
            </section>

            <section id="klyuchevye-slova" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Ключевые слова: какие и где ставить
               </h2>
               <div className="space-y-4">
                  {[
                     {
                        place: "Headline",
                        example: "Senior Python Engineer · Fintech · Remote EU/US",
                        desc: "Самое важное место. LinkedIn индексирует его с максимальным весом. Должна содержать уровень + специализацию + целевой рынок.",
                     },
                     {
                        place: "About",
                        example: "«...5 лет в highload backend, Python, Django, FastAPI. Опыт в fintech и e-commerce. Ищу remote-позиции в EU/US компаниях...»",
                        desc: "Первые 2–3 предложения - ключевые слова под поиск. Остальное - контекст и достижения.",
                     },
                     {
                        place: "Skills",
                        desc: "Добавь все технологии из своего стека. LinkedIn использует их напрямую в поиске. Минимум 10–15 навыков.",
                     },
                     {
                        place: "Experience - должности",
                        example: "Backend Engineer (Python / Django) вместо просто «Разработчик»",
                        desc: "Название должности в каждом опыте тоже индексируется. Используй англоязычные названия, близкие к рыночным стандартам.",
                     },
                  ].map((item) => (
                     <div key={item.place} className="card p-5">
                        <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-wider mb-1">{item.place}</p>
                        {item.example && (
                           <p className="text-white text-sm font-mono bg-[#07091A] rounded px-3 py-2 mb-2 text-xs">{item.example}</p>
                        )}
                        <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            <section id="chto-izmenit" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Чек-лист: что изменить прямо сейчас
               </h2>
               <div className="space-y-2.5">
                  {[
                     "Включи «Open to Work» с настройкой типов работы: Remote, Full-time",
                     "Обнови Headline: уровень + технологии + «Open to Remote EU/US»",
                     "Добавь ключевые слова в первый абзац About на английском",
                     "Переименуй должности в Experience на англоязычные рыночные названия",
                     "Заполни Skills минимум 10–15 технологиями своего стека",
                     "Укажи Location: «Anywhere» или целевую страну в настройках поиска работы",
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
                  Сделать всё это правильно с первого раза
               </p>
               <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  LinkedHire генерирует готовый Headline, About и описания опыта с правильными
                  ключевыми словами под нужный рынок. Ты просто копируешь и вставляешь.
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Настроить LinkedIn за 10 минут
                  <HiArrowRight size={15} />
               </Link>
            </div>

            <ClusterLinks currentHref="/pochemu-linkedin-ne-pokazyvaet" />
         </main>
      </div>
   );
}
