import {
  HiGlobeAlt,
  HiChatBubbleLeftRight,
  HiBriefcase,
} from "react-icons/hi2";

const stats = [
  {
    value: "$110K",
    label: "медианная зарплата Senior разработчика в США",
    sub: "против ~$25K в России",
    flag: "🇺🇸",
  },
  {
    value: "€70K",
    label: "средний оффер мидл-разработчика в Германии",
    sub: "плюс соцпакет и отпуск 30 дней",
    flag: "🇩🇪",
  },
  {
    value: "3×",
    label: "больше вакансий на международных платформах",
    sub: "чем на hh.ru и похожих",
    flag: "🌍",
  },
  {
    value: "70%+",
    label: "remote-first позиций в западных компаниях",
    sub: "можно работать из любой точки мира",
    flag: "🏠",
  },
];

export default function Market() {
  return (
    <section id="market" className="py-20 relative bg-[#0A0D1F]">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">
            Почему международный рынок
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Это не мечта - это математика
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Международный рынок труда для разработчиков открыт. Вопрос только в
            том, как ты себя представляешь.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.value}
              className="card p-6 text-center group hover:border-[#2563EB]/40"
            >
              <div className="text-3xl mb-3">{s.flag}</div>
              <div className="stat-number text-4xl font-black mb-2">
                {s.value}
              </div>
              <div className="text-[#94A3B8] text-sm leading-snug mb-2">
                {s.label}
              </div>
              <div className="text-[#3B82F6] text-xs font-medium">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Why it's achievable */}
        <div className="mt-16 mb-14">
          <div className="text-center mb-10">
            <h3
              className="text-2xl sm:text-3xl font-black text-white"
              style={{ fontFamily: "var(--font-geologica)" }}
            >
              Почему это реально - даже без переезда
            </h3>
            <p className="text-[#64748B] text-base mt-3 max-w-xl mx-auto">
              Большинство разработчиков считают международную работу
              недостижимой. Вот почему это не так.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: <HiGlobeAlt size={22} />,
                title: "Remote-first - новый стандарт",
                desc: "После 2020 года западные компании массово перешли на удалённый формат. Remote-anywhere вакансий с каждым годом становится больше - и они открыты для разработчиков из любой точки мира, включая Россию, Беларусь и Казахстан.",
              },
              {
                icon: <HiChatBubbleLeftRight size={22} />,
                title: "Английский не должен быть идеальным",
                desc: "В большинстве международных команд работают разработчики из Индии, Польши, Турции, Бразилии. Рабочий английский для переписки и редких звонков - это достаточный уровень. Тебя не будут оценивать как носителя языка.",
              },
              {
                icon: <HiBriefcase size={22} />,
                title: "Российский опыт - ценен",
                desc: "Опыт в highload-проектах, сложных финтех-системах и корпоративных решениях высоко ценится на западном рынке. Нужно только правильно его сформулировать: через результаты, метрики и масштаб задач.",
              },
            ].map((r) => (
              <div key={r.title} className="card p-6">
                <div className="icon-box text-[#3B82F6] mb-4">{r.icon}</div>
                <h4
                  className="text-white font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {r.title}
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-6 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 text-center">
          <p className="text-[#94A3B8] text-base">
            Единственное, что тебя отделяет от этих цифр -
          </p>
          <p className="text-white font-semibold text-lg mt-1">
            правильно оформленный LinkedIn-профиль под международный рынок
          </p>
        </div>
      </div>
    </section>
  );
}
