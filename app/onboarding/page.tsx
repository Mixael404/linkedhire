export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#07091A] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
          L
        </div>
        <h1
          className="text-3xl font-black text-white mb-4"
          style={{ fontFamily: "var(--font-geologica)" }}
        >
          Форма в разработке
        </h1>
        <p className="text-[#64748B] mb-8">
          Онбординг-форма скоро будет готова. Пока можно вернуться на главную.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-white font-semibold transition-colors"
        >
          ← На главную
        </a>
      </div>
    </main>
  );
}
