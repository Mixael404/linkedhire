import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Почему рекрутеры не отвечают - что происходит на их стороне",
   description:
      "Рекрутер видит 300 резюме в день. Разбираем как он выбирает, что заставляет его ответить и какие ошибки убивают шансы на ответ.",
   alternates: { canonical: "/pochemu-rekrutery-ne-otvechayut" },
};

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#ih-storona", label: "Их сторона" },
               { href: "#chto-zastavlyaet", label: "Что заставляет ответить" },
               { href: "#oshibki", label: "Ошибки" },
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
                  Почему рекрутеры{" "}
                  <span className="text-gradient">не отвечают</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Молчание рекрутера воспринимается как личная обида. На самом деле - это просто
                  математика. Разберём, что происходит на их стороне и как сделать так, чтобы
                  ответили именно тебе.
               </p>
            </div>

            <section id="ih-storona" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Что видит рекрутер
               </h2>
               <div className="card p-6">
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                     Средний рекрутер в активной фазе найма обрабатывает 50–150 резюме в день.
                     На просмотр одного - 6–10 секунд. Цель: быстро понять, подходит человек или
                     нет. Если за 6 секунд это непонятно - следующий.
                  </p>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                     При этом рекрутер не обязан отвечать каждому. Отказы не всегда приходят - это
                     норма, а не жестокость. Молчание не означает «ты плохой». Оно означает «ты не
                     попал в фокус».
                  </p>
               </div>
            </section>

            <section id="chto-zastavlyaet" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Что заставляет рекрутера ответить
               </h2>
               <div className="space-y-4">
                  {[
                     { t: "Headline сразу отвечает на вопрос «кто ты»", d: "«Senior Python Engineer · Fintech · Open to Remote EU» - это да. «Разработчик» - нет. Первые слова должны содержать уровень, специализацию и целевой рынок." },
                     { t: "Конкретные цифры в первых строках", d: "«5 лет опыта в highload-системах, 3M+ запросов в сутки» привлекает внимание сразу. Рекрутер понимает масштаб без необходимости читать всё резюме." },
                     { t: "Профиль найден, а не отклик отправлен", d: "Лучшие кандидаты не откликаются - их находят. Правильно настроенный LinkedIn с нужными ключевыми словами приносит входящие сообщения без единого отклика." },
                     { t: "Open to Work + правильные настройки", d: "Включённый «Open to Work», указанные типы работы (Remote) и локации (Worldwide) - это сигнал системе показывать тебя рекрутерам в поиске." },
                  ].map((item, i) => (
                     <div key={i} className="card p-5">
                        <p className="text-white font-semibold text-sm mb-2">{item.t}</p>
                        <p className="text-[#64748B] text-sm leading-relaxed">{item.d}</p>
                     </div>
                  ))}
               </div>
            </section>

            <section id="oshibki" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Ошибки, которые убивают шансы на ответ
               </h2>
               <ul className="space-y-3">
                  {[
                     "Резюме на русском - на международном рынке это сразу отсев",
                     "«Ищу интересные проекты» в About - это не о рекрутере",
                     "Нет конкретных технологий в заголовке профиля",
                     "Опыт описан через «участвовал», «помогал», «занимался»",
                     "Нет раздела Skills или он заполнен общими словами",
                  ].map((e, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-[#64748B]">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        {e}
                     </li>
                  ))}
               </ul>
            </section>

            <div className="card p-8 mb-8">
               <p className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-geologica)" }}>
                  Проблема не в тебе - в упаковке
               </p>
               <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  Каждая из этих ошибок решается за один раз. LinkedHire переписывает Headline,
                  About и опыт под стандарты международного рынка - ты получаешь готовые тексты
                  и вставляешь их в LinkedIn по инструкции.
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Получить готовый профиль
                  <HiArrowRight size={15} />
               </Link>
            </div>

            <ClusterLinks currentHref="/pochemu-rekrutery-ne-otvechayut" />
         </main>
      </div>
   );
}
