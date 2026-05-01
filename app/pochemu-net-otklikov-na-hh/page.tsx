import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Почему нет откликов на hh.ru - что происходит на самом деле",
   description:
      "300+ конкурентов на одну вакансию, алгоритм hh, демпинг курсов. Почему hh.ru перестал работать для опытных разработчиков и что делать вместо этого.",
   alternates: { canonical: "/pochemu-net-otklikov-na-hh" },
};

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#algoritm", label: "Алгоритм hh" },
               { href: "#konkurenty", label: "Конкуренция" },
               { href: "#alternativa", label: "Альтернатива" },
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
                  Почему нет откликов{" "}
                  <span className="text-gradient">на hh.ru</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Ты заполнил профиль, загрузил резюме, откликаешься каждый день - и ничего.
                  Максимум автоматический отказ через час. Это не твоя вина - это математика
                  перегруженного рынка.
               </p>
            </div>

            <section id="algoritm" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Как работает алгоритм hh.ru
               </h2>
               <div className="card p-6 mb-4">
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                     hh.ru сортирует отклики по времени отклика, рейтингу резюме и соответствию
                     ключевым словам. Рекрутер видит сверху самых «релевантных» - тех, кого алгоритм
                     посчитал подходящими. Если твоё резюме не набирает нужный балл, оно просто не
                     попадает в первый экран просмотра.
                  </p>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                     На практике: рекрутер открывает первые 20–30 резюме из 300+. До остальных руки
                     просто не доходят. Если ты не в первой волне - тебя нет.
                  </p>
               </div>
            </section>

            <section id="konkurenty" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  300+ конкурентов - это не цифра, это приговор
               </h2>
               <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  На типичную мидл-вакансию в 2024 году приходит от 200 до 500 откликов за первые
                  сутки. При этом рекрутер физически не может просмотреть все. Он открывает 15–30
                  штук - и закрывает задачу.
               </p>
               <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  Дополнительный фактор - демпинг. Тысячи выпускников онлайн-курсов готовы работать
                  за половину твоей ставки. Компании в условиях сокращения бюджетов часто выбирают
                  самых дешёвых. Опытный разработчик проигрывает не по скиллам, а по цене.
               </p>
               <div className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426]">
                  <p className="text-white font-semibold text-sm">
                     Это не значит, что тебя не возьмут. Это значит, что hh.ru - не лучшее место
                     для поиска.
                  </p>
               </div>
            </section>

            <section id="alternativa" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Что работает вместо hh.ru
               </h2>
               <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  LinkedIn - это другая механика. Здесь рекрутеры сами ищут разработчиков по
                  ключевым словам. При правильно оформленном профиле входящие сообщения начинают
                  приходить без единого отклика с твоей стороны. Конкуренция есть, но она
                  принципиально другая: рекрутер уже хочет тебя найти.
               </p>
               <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                     { label: "hh.ru", points: ["300+ конкурентов на вакансию", "Ты откликаешься - тебя игнорируют", "Алгоритм отсеивает до человека", "Демпинг курсов"] },
                     { label: "LinkedIn", points: ["Рекрутеры сами пишут тебе", "Выход на US/EU рынок без переезда", "Меньше конкуренции среди опытных", "В 3× больше вакансий"] },
                  ].map((col) => (
                     <div key={col.label} className="card p-5">
                        <p className="text-white font-bold text-sm mb-3">{col.label}</p>
                        <ul className="space-y-2">
                           {col.points.map((p) => (
                              <li key={p} className="text-[#64748B] text-xs flex items-start gap-2">
                                 <span className="w-1 h-1 rounded-full bg-[#475569] mt-1.5 shrink-0" />
                                 {p}
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Настроить LinkedIn под международный рынок
                  <HiArrowRight size={15} />
               </Link>
            </section>

            <ClusterLinks currentHref="/pochemu-net-otklikov-na-hh" />
         </main>
      </div>
   );
}
