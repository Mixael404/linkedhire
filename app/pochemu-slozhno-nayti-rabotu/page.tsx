import type { Metadata } from "next";
import Link from "next/link";
import {
   HiArrowRight,
   HiArrowTrendingDown,
   HiUserGroup,
   HiBanknotes,
   HiXCircle,
   HiAcademicCap,
   HiLockClosed,
   HiGlobeAlt,
   HiChatBubbleLeftRight,
   HiBriefcase,
   HiEnvelopeOpen,
   HiDocumentMagnifyingGlass,
   HiMagnifyingGlass,
   HiClipboardDocumentList,
   HiPuzzlePiece,
   HiCheckCircle,
} from "react-icons/hi2";

export const metadata: Metadata = {
   title: "Почему сложно найти работу в IT в 2026 году",
   description:
      "Системный анализ: почему опытные разработчики не могут найти работу на hh.ru, как рынок изменился после 2022 года и что реально работает сейчас.",
   alternates: {
      canonical: "/pochemu-slozhno-nayti-rabotu",
   },
   openGraph: {
      title: "Почему сложно найти работу в IT - полный разбор",
      description:
         "300+ конкурентов, 80% откликов без ответа, рынок сужается. Разбираем системные причины и что с этим делать.",
   },
};

const marketProblems = [
   {
      icon: HiArrowTrendingDown,
      title: "Рынок IT в России сужается",
      desc: "После 2022 года многие зарубежные компании ушли с российского рынка. Оставшиеся замораживают найм или оптимизируют штат. Качественных вакансий для опытных разработчиков становится меньше с каждым кварталом.",
      tag: "Меньше вакансий",
   },
   {
      icon: HiUserGroup,
      title: "300–500 конкурентов на одну позицию",
      desc: "На типичную мидл-вакансию на hh.ru приходят сотни откликов. Рекрутеры физически не могут рассмотреть каждое резюме - твоя заявка уходит в корзину после пяти секунд просмотра.",
      tag: "Огромная конкуренция",
   },
   {
      icon: HiBanknotes,
      title: "Зарплаты в рублях не растут",
      desc: "Инфляция съедает реальную покупательную способность. Компании держат зарплатный уровень на месте, а рост расходов делает любые прибавки незаметными. Работать больше - получать столько же.",
      tag: "Падение доходов",
   },
   {
      icon: HiXCircle,
      title: "Сотни однотипных отказов",
      desc: "Откликаешься на десятки вакансий - получаешь автоматические отказы или просто тишину. На собеседование попасть всё сложнее даже с реальным опытом в 5+ лет и сильным стеком.",
      tag: "Нет ответов",
   },
   {
      icon: HiAcademicCap,
      title: "Рынок затопили выпускники курсов",
      desc: "Десятки тысяч выпускников IT-курсов ежегодно выходят на рынок с минимальным опытом и готовы работать дёшево. Компании выбирают самых дешёвых - опытные разработчики проигрывают по цене.",
      tag: "Демпинг",
   },
   {
      icon: HiLockClosed,
      title: "Карьерный рост заблокирован",
      desc: "Позиций для роста меньше, команды не расширяются, интересных задач всё меньше. Многие Senior-разработчики годами стоят на одном месте без перспектив - ни новых задач, ни повышения, ни смысла.",
      tag: "Потолок карьеры",
   },
];

const keyFacts = [
   { value: "−40%", label: "открытых вакансий в IT за последние 2 года" },
   { value: "300+", label: "откликов в среднем на одну мидл-позицию" },
   { value: "80%", label: "откликов остаются без ответа или приходит авто-отказ" },
];

const internationalStats = [
   { value: "$110K", label: "медианная зарплата Senior разработчика в США", sub: "против ~$25K в России", flag: "🇺🇸" },
   { value: "€70K", label: "средний оффер мидл-разработчика в Германии", sub: "плюс соцпакет и отпуск 30 дней", flag: "🇩🇪" },
   { value: "3×", label: "больше вакансий на международных платформах", sub: "чем на hh.ru и похожих", flag: "🌍" },
   { value: "70%+", label: "remote-first позиций в западных компаниях", sub: "можно работать из любой точки мира", flag: "🏠" },
];

const linkedinBarriers = [
   {
      icon: HiEnvelopeOpen,
      title: "0 сообщений от рекрутеров",
      desc: "Профиль есть - откликов нет. Месяц за месяцем тишина. LinkedIn будто не знает о твоём существовании, хотя ты всё делаешь правильно.",
   },
   {
      icon: HiDocumentMagnifyingGlass,
      title: "Профиль выглядит как резюме с hh.ru",
      desc: "Западные рекрутеры ожидают принципиально другой формат подачи. Твой профиль им непонятен с первого взгляда - и они идут дальше.",
   },
   {
      icon: HiMagnifyingGlass,
      title: "Нет нужных ключевых слов",
      desc: "Алгоритм LinkedIn просто не показывает тебя по запросам «Python developer remote», «Backend Engineer Europe» и подобным. Ты невидим для поиска.",
   },
   {
      icon: HiClipboardDocumentList,
      title: "Опыт описан слабо",
      desc: "«Участвовал в разработке» вместо «Сократил время деплоя на 40%, обрабатывая 5M+ запросов в сутки». Западный рекрутер выбирает по результатам - а не по обязанностям.",
   },
];

const whyAchievable = [
   {
      icon: HiGlobeAlt,
      title: "Remote-first - новый стандарт",
      desc: "После 2020 года западные компании массово перешли на удалённый формат. Remote-anywhere вакансий с каждым годом становится больше - и они открыты для разработчиков из России, Беларуси и Казахстана.",
   },
   {
      icon: HiChatBubbleLeftRight,
      title: "Английский не должен быть идеальным",
      desc: "В большинстве международных команд работают разработчики из Индии, Польши, Турции, Бразилии. Рабочий английский для переписки и редких звонков - это достаточный уровень.",
   },
   {
      icon: HiBriefcase,
      title: "Российский опыт - ценен",
      desc: "Опыт в highload-проектах, сложных финтех-системах и корпоративных решениях высоко ценится на западном рынке. Нужно только правильно его сформулировать: через результаты, метрики и масштаб задач.",
   },
];

export default function WhyHardToFindJob() {
   return (
      <div className="min-h-screen bg-[#07091A]">
         {/* Navbar */}
         <header className="sticky top-0 z-50 border-b border-[#1B2847]/60 bg-[#07091A]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                     L
                  </div>
                  <span
                     className="font-bold text-white text-[17px] tracking-tight"
                     style={{ fontFamily: "var(--font-geologica)" }}
                  >
                     Linked<span className="text-[#3B82F6]">Hire</span>
                  </span>
               </Link>

               <nav className="hidden md:flex items-center gap-8 text-sm text-[#94A3B8]">
                  <a href="#rynok" className="hover:text-white transition-colors">Рынок</a>
                  <a href="#linkedin" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#mezhdunarodny" className="hover:text-white transition-colors">Международный рынок</a>
               </nav>

               <Link
                  href="/onboarding"
                  className="btn-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
               >
                  Найти работу за границей
               </Link>
            </div>
         </header>

         <main className="max-w-4xl mx-auto px-6 py-16">
            {/* Hero */}
            <div className="mb-16">
               <span className="section-label mb-4 inline-flex items-center gap-2">
                  <span>✦</span> Разбор рынка
               </span>
               <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-6 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Почему сложно найти работу в IT -{" "}
                  <span className="text-gradient">системный разбор</span>
               </h1>
               <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
                  Если ты разработчик с реальным опытом и всё равно не можешь найти нормальную
                  работу - это не потому что ты недостаточно хорош. Российский рынок IT объективно
                  изменился. Разбираем причины и что с этим делать.
               </p>
            </div>

            {/* Key facts */}
            <div id="rynok" className="grid sm:grid-cols-3 gap-4 mb-16">
               {keyFacts.map((f) => (
                  <div
                     key={f.value}
                     className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426] text-center"
                  >
                     <div
                        className="text-3xl font-black text-white mb-1"
                        style={{ fontFamily: "var(--font-geologica)" }}
                     >
                        {f.value}
                     </div>
                     <div className="text-[#64748B] text-sm">{f.label}</div>
                  </div>
               ))}
            </div>

            {/* 6 problems */}
            <section className="mb-16">
               <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-8"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  6 причин, почему это происходит
               </h2>
               <div className="grid sm:grid-cols-2 gap-5">
                  {marketProblems.map((p, i) => (
                     <div key={i} className="card p-6 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                           <div className="icon-box text-[#3B82F6]">
                              <p.icon size={22} />
                           </div>
                           <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded-full">
                              {p.tag}
                           </span>
                        </div>
                        <h3
                           className="text-white font-bold text-base mb-3"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {p.title}
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed flex-1">{p.desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* Not your fault */}
            <section className="card p-8 mb-16">
               <h2
                  className="text-white font-black text-xl mb-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Это не вопрос твоей квалификации
               </h2>
               <div className="grid sm:grid-cols-2 gap-6 text-[#94A3B8] text-sm leading-relaxed">
                  <p>
                     Если ты разработчик с реальным опытом - React, Python, Java, Go, DevOps - и
                     всё равно не можешь найти нормальную работу в IT, это не потому что ты
                     недостаточно хорош. Российский рынок IT объективно стал тесным: меньше
                     вакансий, больше кандидатов, ниже бюджеты на найм.
                  </p>
                  <p>
                     Компании массово срезают расходы. Многие оффшорные центры закрылись. Стартапы
                     не растут - они выживают. Крупные корпорации не расширяют разработку - они
                     автоматизируют. В этой ситуации продолжать бесконечно откликаться на hh.ru -
                     это стратегия без выхода.
                  </p>
               </div>
            </section>

            {/* LinkedIn barriers */}
            <section id="linkedin" className="mb-16">
               <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-3"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Почему LinkedIn не работает у большинства
               </h2>
               <p className="text-[#64748B] text-base mb-8 leading-relaxed">
                  LinkedIn - главный канал найма на международном рынке. Но большинство
                  русскоязычных разработчиков сталкиваются с одинаковыми проблемами. Не потому что
                  они плохие специалисты - а потому что LinkedIn работает по другим правилам.
               </p>
               <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {linkedinBarriers.map((b, i) => (
                     <div key={i} className="card p-6 flex flex-col">
                        <div className="icon-box text-[#3B82F6] mb-4">
                           <b.icon size={22} />
                        </div>
                        <h3
                           className="text-white font-bold text-base mb-2"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {b.title}
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed flex-1">{b.desc}</p>
                     </div>
                  ))}
               </div>
               <div className="grid sm:grid-cols-2 gap-5">
                  <div className="card p-6">
                     <h4
                        className="text-white font-bold text-base mb-3 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-geologica)" }}
                     >
                        <HiPuzzlePiece className="text-[#3B82F6] shrink-0" size={18} />
                        Почему это происходит
                     </h4>
                     <p className="text-[#64748B] text-sm leading-relaxed">
                        LinkedIn - это не просто сайт с резюме. Это платформа с собственным
                        алгоритмом поиска, рекрутерскими фильтрами и стандартами форматирования,
                        сложившимися на западном рынке. Профиль, написанный «как у нас принято» -
                        просто не работает там.
                     </p>
                  </div>
                  <div className="card p-6">
                     <h4
                        className="text-white font-bold text-base mb-3 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-geologica)" }}
                     >
                        <HiCheckCircle className="text-green-400 shrink-0" size={18} />
                        Это решаемо
                     </h4>
                     <p className="text-[#64748B] text-sm leading-relaxed">
                        Каждый из этих барьеров имеет конкретное решение: правильный headline,
                        About с достижениями, SEO-слова в нужных местах, опыт через метрики.
                        LinkedHire помогает пройти через этот процесс быстро и без лишних догадок.
                     </p>
                  </div>
               </div>
            </section>

            {/* International market */}
            <section id="mezhdunarodny" className="mb-16">
               <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-3"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Международный рынок - это математика, не мечта
               </h2>
               <p className="text-[#64748B] text-base mb-8 leading-relaxed">
                  Пока российский рынок сжимается, международный открыт для разработчиков из
                  России, Беларуси и Казахстана. Без переезда, без идеального английского.
               </p>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {internationalStats.map((s) => (
                     <div key={s.value} className="card p-6 text-center">
                        <div className="text-3xl mb-3">{s.flag}</div>
                        <div
                           className="text-4xl font-black text-white mb-2"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {s.value}
                        </div>
                        <div className="text-[#94A3B8] text-sm leading-snug mb-2">{s.label}</div>
                        <div className="text-[#3B82F6] text-xs font-medium">{s.sub}</div>
                     </div>
                  ))}
               </div>

               <h3
                  className="text-xl font-black text-white mb-6"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Почему это реально - даже без переезда
               </h3>
               <div className="grid sm:grid-cols-3 gap-5 mb-10">
                  {whyAchievable.map((r) => (
                     <div key={r.title} className="card p-6">
                        <div className="icon-box text-[#3B82F6] mb-4">
                           <r.icon size={22} />
                        </div>
                        <h4
                           className="text-white font-bold text-base mb-2"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {r.title}
                        </h4>
                        <p className="text-[#64748B] text-sm leading-relaxed">{r.desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* CTA */}
            <div className="p-8 rounded-2xl border border-[#2563EB]/30 bg-linear-to-br from-[#2563EB]/8 to-[#06B6D4]/5 text-center">
               <p className="text-[#94A3B8] text-base mb-2">
                  Единственное, что тебя отделяет от этих цифр -
               </p>
               <p className="text-white font-bold text-xl mb-5">
                  правильно оформленный LinkedIn-профиль под международный рынок
               </p>
               <Link
                  href="/onboarding"
                  className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-base font-bold transition-colors"
               >
                  Найти работу за границей
                  <HiArrowRight size={16} />
               </Link>
            </div>
         </main>
      </div>
   );
}
