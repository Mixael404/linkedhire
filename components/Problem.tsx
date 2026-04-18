const problems = [
  {
    icon: "📭",
    title: "0 сообщений от рекрутеров",
    desc: "Каждый месяц тишина. Профиль есть - откликов нет. LinkedIn будто тебя не существует.",
  },
  {
    icon: "📄",
    title: "Профиль как резюме с hh.ru",
    desc: "Западные рекрутеры ожидают другой формат. Твой профиль им непонятен с первого взгляда.",
  },
  {
    icon: "🔍",
    title: "Нет нужных ключевых слов",
    desc: 'Алгоритм LinkedIn просто не показывает тебя по запросам "Python developer remote" и подобным.',
  },
  {
    icon: "📉",
    title: "Опыт описан слабо",
    desc: "«Участвовал в разработке» вместо «Сократил время деплоя на 40%, обработав 5M+ запросов в сутки».",
  },
];

export default function Problem() {
  return (
    <section className="py-24 relative">
      <hr className="divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">Проблема</span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Узнаёшь себя?
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Большинство русскоязычных разработчиков сталкиваются с одними и теми
            же барьерами при выходе на международный рынок.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3
                className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                {p.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Recognition hook */}
        <div className="mt-10 text-center">
          <p className="text-[#94A3B8] text-sm">
            Если хоть один пункт - про тебя,{" "}
            <a
              href="#start"
              className="text-[#3B82F6] hover:underline font-medium"
            >
              LinkedHire решит это за минуты
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
