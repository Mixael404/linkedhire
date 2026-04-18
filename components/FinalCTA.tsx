export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="mb-6">
          <span className="section-label inline-flex">Начать прямо сейчас</span>
        </div>

        <h2
          className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Готов к офферам
          <br />
          <span className="text-gradient">из США и Европы?</span>
        </h2>

        <p className="text-[#94A3B8] text-lg mb-10 max-w-lg mx-auto">
          Начни прямо сейчас - загрузи своё резюме и получи оптимизированный
          LinkedIn-профиль для международного рынка.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="#"
            className="btn-glow inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 py-4 rounded-xl text-base font-bold transition-colors"
          >
            Начать бесплатно
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

        {/* Reassurance */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#64748B]">
          {[
            "✓ Без регистрации",
            "✓ Результат за 5–10 минут",
            "✓ Для разработчиков",
            "✓ Русский интерфейс",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {/* Divider with social proof */}
        <div className="mt-14 pt-10 border-t border-[#1B2847]">
          <p className="text-[#64748B] text-sm mb-4">
            Уже помогли разработчикам из
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-base">
            {["🇷🇺 Россия", "🇧🇾 Беларусь", "🇰🇿 Казахстан"].map(
              (c) => (
                <span key={c} className="text-[#94A3B8]">
                  {c}
                </span>
              ),
            )}
          </div>
          <p className="text-[#64748B] text-sm mt-3">
            получить работу в{" "}
            <span className="text-white">
              США, Германии, Нидерландах и Великобритании
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
