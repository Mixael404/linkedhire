"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Анализирую ваш опыт...",
  "Подбираю ключевые слова для рекрутеров...",
  "Оптимизирую заголовок профиля...",
  "Составляю раздел «О себе»...",
  "Улучшаю описание опыта работы...",
  "Выделяю ключевые достижения...",
  "Адаптирую под целевой рынок...",
  "Финальные штрихи...",
];

export default function GeneratingLoader() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07091A]">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-[#1B2847]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2563EB] border-r-[#06B6D4] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-base">
            L
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-white font-bold text-xl mb-3"
        style={{ fontFamily: "var(--font-geologica)" }}
      >
        Создаём ваш профиль
      </h2>

      {/* Rotating message */}
      <p
        className="text-[#64748B] text-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {MESSAGES[msgIndex]}
      </p>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-8">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: i === msgIndex ? "#2563EB" : "#1B2847" }}
          />
        ))}
      </div>
    </div>
  );
}
