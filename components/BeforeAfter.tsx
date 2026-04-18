const comparisons = [
  {
    section: "Headline",
    before: "Опытный программист | Backend Developer | Python, Django",
    after:
      "Senior Backend Engineer · Python & Django · Fintech APIs | Open to Remote EU/US",
    note: "Ключевые слова + специализация + рынок",
  },
  {
    section: "About",
    before:
      "Работаю программистом 5 лет. Знаю Python, Django, PostgreSQL. Ищу новые возможности.",
    after:
      "Backend Engineer with 5+ years building scalable fintech APIs. Shipped systems processing $2M+ daily transactions. Proficient in Python, Django, FastAPI. Open to senior remote roles in EU/US fintech.",
    note: "Результаты + цифры + специализация + целевой рынок",
  },
  {
    section: "Experience",
    before:
      "Разрабатывал бэкенд для сервиса. Участвовал в проектировании архитектуры.",
    after:
      "Designed and built REST API serving 500K+ daily requests. Reduced p95 latency by 60% through Redis caching. Led team of 3 engineers during product relaunch.",
    note: "Метрики + достижения + роль в команде",
  },
];

export default function BeforeAfter() {
  return (
    <section id="start" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">До и после</span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Разница - очевидна
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Вот как выглядит профиль до и после оптимизации LinkedHire. Это не
            магия - это правильная структура.
          </p>
        </div>

        <div className="space-y-6">
          {comparisons.map((c) => (
            <div key={c.section}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-geologica)" }}
                >
                  {c.section}
                </span>
                <div className="flex-1 h-px bg-[#1B2847]" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Before */}
                <div className="before-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs">
                      ✕
                    </span>
                    <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
                      До
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {c.before}
                  </p>
                </div>

                {/* After */}
                <div className="after-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-xs">
                      ✓
                    </span>
                    <span className="text-[#3B82F6] text-xs font-semibold uppercase tracking-wider">
                      После
                    </span>
                  </div>
                  <p className="text-[#F1F5F9] text-sm leading-relaxed font-medium">
                    {c.after}
                  </p>
                  <div className="mt-3 text-[#3B82F6] text-xs flex items-center gap-1.5">
                    <span>✦</span>
                    {c.note}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after comparison */}
        <div className="mt-12 text-center">
          <a
            href="#start"
            className="btn-glow inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl text-base font-bold transition-colors"
          >
            Получить такой профиль
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
