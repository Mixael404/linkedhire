import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import ArticleNavbar from "@/components/article/ArticleNavbar";
import ClusterLinks from "@/components/article/ClusterLinks";

export const metadata: Metadata = {
   title: "Почему не берут на работу программистом - честный разбор",
   description:
      "Опыт есть, стек сильный, а оффера нет. Разбираем почему квалификация - не единственный фактор и как упаковка опыта определяет результат.",
   alternates: { canonical: "/pochemu-ne-beryut-na-rabotu-programmistom" },
};

export default function Page() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         <ArticleNavbar
            anchors={[
               { href: "#rynok", label: "Рынок" },
               { href: "#upakovka", label: "Упаковка" },
               { href: "#vyhod", label: "Выход" },
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
                  Почему не берут на работу{" "}
                  <span className="text-gradient">программистом</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed">
                  Опыт есть. Стек сильный. Но офферов нет месяцами. Это знакомо многим. Разберём
                  честно: что происходит на рынке и почему дело часто не в квалификации.
               </p>
            </div>

            <section id="rynok" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Что изменилось на рынке
               </h2>
               <div className="space-y-4">
                  <div className="card p-6">
                     <p className="text-white font-semibold text-sm mb-2">Меньше вакансий, больше кандидатов</p>
                     <p className="text-[#64748B] text-sm leading-relaxed">
                        После 2022 года российский IT-рынок объективно сжался. Международные компании
                        ушли, оставшиеся замораживают найм. При этом количество разработчиков на рынке
                        выросло - в том числе за счёт выпускников курсов, готовых работать дёшево.
                     </p>
                  </div>
                  <div className="card p-6">
                     <p className="text-white font-semibold text-sm mb-2">Демпинг курсов</p>
                     <p className="text-[#64748B] text-sm leading-relaxed">
                        Компании в условиях сокращения бюджетов выбирают самых дешёвых. Джуниор за
                        60к vs. мидл за 200к - при прочих равных выбор очевиден с точки зрения
                        расходов. Опытный разработчик проигрывает не по скиллам, а по экономике.
                     </p>
                  </div>
               </div>
            </section>

            <section id="upakovka" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Упаковка vs. квалификация
               </h2>
               <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  Представь двух кандидатов с одинаковым опытом. Первый пишет:
               </p>
               <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="card p-5 border-red-500/20">
                     <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-3">Слабая упаковка</p>
                     <p className="text-[#64748B] text-sm italic leading-relaxed">
                        «Разрабатывал бэкенд-логику для различных проектов. Опыт работы с Python,
                        Django, PostgreSQL. Умею работать в команде.»
                     </p>
                  </div>
                  <div className="card p-5 border-green-500/20">
                     <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-3">Сильная упаковка</p>
                     <p className="text-[#94A3B8] text-sm leading-relaxed">
                        «Senior Python Engineer · 5 лет в fintech. Спроектировал платёжный сервис
                        на Django/FastAPI, обрабатывающий 3M+ транзакций в сутки. Сократил latency
                        API с 800ms до 120ms.»
                     </p>
                  </div>
               </div>
               <p className="text-[#64748B] text-sm leading-relaxed">
                  У обоих одинаковый опыт. Но второй получает ответы - первый нет. Дело не в
                  скиллах, а в том, как они поданы.
               </p>
            </section>

            <section id="vyhod" className="mb-12">
               <h2 className="text-2xl font-black text-white mb-5" style={{ fontFamily: "var(--font-geologica)" }}>
                  Выход: международный рынок и правильная упаковка
               </h2>
               <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                  На международном рынке твой опыт стоит дороже. Российские разработчики ценятся
                  за highload-опыт, сложные системы, способность работать в условиях ограниченных
                  ресурсов. Проблема одна: нужно правильно это сформулировать на английском и
                  по западным стандартам.
               </p>
               <div className="p-6 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 mb-6">
                  <p className="text-white font-semibold text-sm">
                     Квалификация у тебя есть. Не хватает упаковки под международный рынок -
                     именно этим занимается LinkedHire.
                  </p>
               </div>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
               >
                  Упаковать опыт за 10 минут
                  <HiArrowRight size={15} />
               </Link>
            </section>

            <ClusterLinks currentHref="/pochemu-ne-beryut-na-rabotu-programmistom" />
         </main>
      </div>
   );
}
