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
    <section className="py-24 relative bg-[#0A0D1F]">
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

        <div className="mt-12 p-6 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 text-center">
          <p className="text-[#94A3B8] text-base">
            Единственное, что тебя отделяет от этих цифр -
          </p>
          <p className="text-white font-semibold text-lg mt-1">
            правильно оформленный LinkedIn-профиль
          </p>
        </div>
      </div>
    </section>
  );
}
