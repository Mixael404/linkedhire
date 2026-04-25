import CTAButton from "./ui/CTAButton";
import { HiArrowRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07091A] to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-1/3 left-10 w-64 h-64 rounded-full bg-[#2563EB]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-[#06B6D4]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto py-20 w-full px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <div className="anim-1 mb-6">
              <span className="section-label">
                <span>✦</span>
                Работа в IT за рубежом · Удалёнка в USD/EUR
              </span>
            </div>

            <h1
              className="anim-2 text-4xl sm:text-lime-400xl lg:text-[56px] font-black leading-[1.1] tracking-tight text-white mb-6"
              style={{ fontFamily: "var(--font-geologica)" }}
            >
              Хочешь выйти на
              <br />
              <span className="text-gradient">валютную удалёнку?</span>
            </h1>

            <p className="anim-3 text-xl text-[#94A3B8] leading-relaxed mb-3 max-w-lg">
              Пока российский IT-рынок закрывается, в США и Европе тысячи
              remote-вакансий для разработчиков - без переезда и без идеального
              английского.
            </p>
            <ul
              style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}
              className="anim-3 text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-lg"
            >
              <li>Получай отклики от рекрутеров из США и Европы</li>
              <li>Упакуй опыт под международные стандарты</li>
              <li>Готовый LinkedIn + PDF-резюме за 10 минут</li>
            </ul>

            <div className="anim-4 flex flex-col sm:flex-row gap-4 mb-10">
              <CTAButton href="/onboarding">
                Начать бесплатно
                <HiArrowRight size={16} />
              </CTAButton>
              <CTAButton href="#how" variant="secondary">
                Как это работает
              </CTAButton>
            </div>

            <div className="anim-5 flex items-center gap-3 text-sm text-[#64748B]">
              <div className="flex -space-x-2">
                {["🇷🇺", "🇧🇾", "🇰🇿"].map((flag, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#0D1426] border border-[#1B2847] flex items-center justify-center text-sm"
                  >
                    {flag}
                  </div>
                ))}
              </div>
              <span>
                <span className="text-white font-semibold">500+</span>{" "}
                разработчиков уже получают отклики с новым профилем
              </span>
            </div>
          </div>

          {/* Right: LinkedIn card mockup */}
          <div className="anim-float hidden lg:block">
            <div className="relative">
              {/* Main profile card */}
              <div className="card p-6 rounded-2xl relative overflow-hidden">
                {/* Card top gradient */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/10 rounded-t-2xl" />

                <div className="relative">
                  {/* Profile header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-2xl font-bold text-white">
                        АК
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#0D1426]" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-bold text-white text-[15px]">
                        Алексей Козлов
                      </div>
                      <div className="text-[#3B82F6] text-[13px] font-medium mt-1 leading-snug">
                        Senior Backend Engineer · Python & Django
                        <br />
                        Fintech · Open to Remote EU/US
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#64748B] text-xs">
                          📍 Москва
                        </span>
                        <span className="text-[#64748B] text-xs">·</span>
                        <span className="text-[#64748B] text-xs">
                          500+ связей
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { label: "Просмотры", value: "248", delta: "+180%" },
                      { label: "Появления", value: "1.2K", delta: "+320%" },
                      { label: "Отклики", value: "12", delta: "Новых" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-[#111D35] rounded-xl p-3 text-center border border-[#1B2847]"
                      >
                        <div className="text-white font-bold text-lg leading-none">
                          {stat.value}
                        </div>
                        <div className="text-[#64748B] text-[10px] mt-1">
                          {stat.label}
                        </div>
                        <div className="text-green-400 text-[10px] font-semibold mt-0.5">
                          {stat.delta}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python",
                      "Django",
                      "FastAPI",
                      "PostgreSQL",
                      "Remote",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-[#111D35] border border-[#1B2847] text-[#94A3B8] px-2.5 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge: "Optimized" */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1">
                <span>✓</span> Оптимизирован
              </div>

              {/* Floating recruiter message */}
              <div className="absolute -bottom-4 -left-4 card p-3 rounded-xl text-xs max-w-[200px] border-[#2563EB]/30">
                <div className="text-[#64748B] mb-1">
                  Рекрутер · TechCorp Berlin
                </div>
                <div className="text-[#F1F5F9] font-medium">
                  &quot;Hi Alexey! We&apos;d love to discuss a Senior Backend
                  role...&quot;
                </div>
                <div className="text-green-400 text-[10px] mt-1.5 font-semibold">
                  Только что
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
