const steps = [
  {
    n: "01",
    title: "Загрузи резюме или опиши опыт",
    desc: "Вставь текст резюме, PDF или просто расскажи о своём опыте. Мы разберёмся сами.",
    detail:
      "Поддерживаем любой формат: PDF, Word, текст, ссылка на текущий LinkedIn.",
  },
  {
    n: "02",
    title: "ИИ оптимизирует профиль",
    desc: "Система создаёт сильный Headline, About и описания опыта под международный рынок.",
    detail:
      "Учитываем нужную страну: USA, DE, UK - у каждого рынка свои ожидания.",
  },
  {
    n: "03",
    title: "Получи пошаговый гайд",
    desc: "Точная инструкция: куда зайти в LinkedIn, что скопировать и куда вставить.",
    detail:
      "Скриншоты, порядок действий, объяснение каждого шага - ничего лишнего.",
  },
  {
    n: "04",
    title: "Получай офферы",
    desc: "Рекрутеры начинают находить тебя сами. Отвечай на входящие и откликайся с готовым PDF-резюме.",
    detail: "ATS-friendly резюме для откликов генерируется автоматически.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-[#0A0D1F]">
      <div className="absolute left-0 right-0 h-px divider" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">Как работает</span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            4 шага к офферу
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            От текущего резюме до оптимизированного LinkedIn-профиля - за одну
            сессию.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Step number */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  style={{
                    background: `linear-gradient(135deg, #2563EB, #06B6D4)`,
                    fontFamily: "var(--font-geologica)",
                  }}
                >
                  {step.n}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-3">
                  {step.desc}
                </p>
                <div className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mb-0.5 flex-shrink-0 relative bottom-1">
                    →
                  </span>
                  <span className="text-[#64748B] text-sm">{step.detail}</span>
                </div>
              </div>

              {/* Progress indicator */}
              {i < steps.length - 1 && (
                <div className="hidden sm:flex items-center text-[#1B2847]">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="#2563EB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
