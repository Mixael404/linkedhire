const features = [
  {
    icon: "🎯",
    title: "Анализируем твой опыт",
    desc: "Загружаешь резюме или описываешь опыт - мы понимаем, кто ты как специалист и в чём твоя ценность.",
  },
  {
    icon: "✍️",
    title: "Создаём сильный профиль",
    desc: "Headline, About, Experience - всё переписываем под международные стандарты на языке, который понимают рекрутеры.",
  },
  {
    icon: "🌍",
    title: "Адаптируем под страну",
    desc: "США, Германия, Великобритания - у каждого рынка свои ожидания. Мы адаптируем профиль под нужный регион.",
  },
  {
    icon: "🗺️",
    title: "Показываем, что именно изменить в LinkedIn",
    desc: "Точные инструкции: куда нажать, что скопировать, что изменить в LinkedIn. Без догадок.",
  },
  {
    icon: "📄",
    title: "Даём готовое резюме для откликов",
    desc: "ATS-friendly резюме для отклика на вакансии - в дополнение к LinkedIn-профилю.",
  },
  {
    icon: "🔑",
    title: "Добавляем ключевые слова",
    desc: "Нужные SEO-термины в профиле, чтобы LinkedIn-алгоритм показывал тебя по релевантным запросам.",
  },
];

export default function Solution() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">Решение</span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Что мы делаем для тебя
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            LinkedHire - это не просто редактор. Это полный пайплайн превращения
            твоего опыта в международный LinkedIn-профиль.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <div className="icon-box mb-4">{f.icon}</div>
              <h3
                className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                {f.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
