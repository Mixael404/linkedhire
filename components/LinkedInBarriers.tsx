import {
  HiEnvelopeOpen,
  HiDocumentMagnifyingGlass,
  HiMagnifyingGlass,
  HiClipboardDocumentList,
  HiPuzzlePiece,
  HiCheckCircle,
} from "react-icons/hi2";
import { ReactNode } from "react";

const barriers: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <HiEnvelopeOpen size={22} />,
    title: "0 сообщений от рекрутеров",
    desc: "Профиль есть - откликов нет. Месяц за месяцем тишина. LinkedIn будто не знает о твоём существовании, хотя ты всё делаешь правильно.",
  },
  {
    icon: <HiDocumentMagnifyingGlass size={22} />,
    title: "Профиль выглядит как резюме с hh.ru",
    desc: "Западные рекрутеры ожидают принципиально другой формат подачи. Твой профиль им непонятен с первого взгляда - и они идут дальше.",
  },
  {
    icon: <HiMagnifyingGlass size={22} />,
    title: "Нет нужных ключевых слов",
    desc: 'Алгоритм LinkedIn просто не показывает тебя по запросам "Python developer remote", "Backend Engineer Europe" и подобным. Ты невидим для поиска.',
  },
  {
    icon: <HiClipboardDocumentList size={22} />,
    title: "Опыт описан слабо",
    desc: "«Участвовал в разработке» вместо «Сократил время деплоя на 40%, обрабатывая 5M+ запросов в сутки». Западный рекрутер выбирает по результатам - а не по обязанностям.",
  },
];

export default function LinkedInBarriers() {
  return (
    <section id="linkedin-barriers" className="py-20 relative bg-[#0A0D1F]">
      <div className="absolute top-0 left-0 right-0 h-px divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">
            Препятствия LinkedIn
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Но на пути в LinkedIn
            <br />
            <span className="text-gradient">есть реальные барьеры</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            LinkedIn - главный канал найма на международном рынке. Но
            большинство русскоязычных разработчиков сталкиваются с одинаковыми
            проблемами при попытке им воспользоваться. Не потому что они плохие
            специалисты - а потому что LinkedIn работает по другим правилам.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {barriers.map((b, i) => (
            <div key={i} className="card p-6 flex flex-col">
              <div className="icon-box text-[#3B82F6] mb-4">{b.icon}</div>
              <h3
                className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                {b.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed flex-1">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Context block */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="card p-6">
            <h4
              className="text-white font-bold text-base mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-geologica)" }}
            >
              <HiPuzzlePiece className="text-[#3B82F6] shrink-0" size={18} />
              Почему это происходит
            </h4>
            <p className="text-[#64748B] text-sm leading-relaxed">
              LinkedIn - это не просто сайт с резюме. Это платформа с
              собственным алгоритмом поиска, рекрутерскими фильтрами и
              стандартами форматирования, сложившимися на западном рынке.
              Профиль, написанный «как у нас принято» - просто не работает там.
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
              Каждый из этих барьеров имеет конкретное решение: правильный
              headline, About с достижениями, SEO-слова в нужных местах, опыт
              через метрики. LinkedHire помогает пройти через этот процесс
              быстро и без лишних догадок.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#94A3B8] text-sm">
            Если хоть один пункт - про тебя,{" "}
            <a
              href="#features"
              className="text-[#3B82F6] hover:underline font-medium"
            >
              LinkedHire разберётся с этим за 10 минут
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
