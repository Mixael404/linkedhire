"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Наверх"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
        bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-[#2563EB]/30
        flex items-center justify-center
        transition-all duration-300 cursor-pointer
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <HiArrowUp size={20} />
    </button>
  );
}
