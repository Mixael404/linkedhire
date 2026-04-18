export default function Footer() {
  return (
    <footer className="border-t border-[#1B2847] bg-[#07091A] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs">
            L
          </div>
          <span
            className="font-bold text-white text-base tracking-tight"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Linked<span className="text-[#3B82F6]">Hire</span>
          </span>
        </div>

        <p className="text-[#64748B] text-sm text-center">
          LinkedIn-оптимизация для русскоязычных разработчиков · Удалённая работа в USD/EUR
        </p>

        <div className="flex gap-5 text-sm text-[#64748B]">
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
