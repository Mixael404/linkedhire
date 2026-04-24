"use client";

import { useState } from "react";
import { HiCheckCircle, HiDocumentText, HiGlobeAlt, HiSparkles } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import posthog from "posthog-js";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
};

const features = [
  {
    icon: HiSparkles,
    title: "Профессиональный профиль",
    description:
      "Каждый раздел написан под вашу профессию и целевой рынок — с нужными ключевыми словами и формулировками.",
  },
  {
    icon: HiGlobeAlt,
    title: "Пожизненный доступ",
    description:
      "Профиль навсегда доступен по вашей ссылке. Никаких подписок и повторных платежей.",
  },
  {
    icon: HiDocumentText,
    title: "Резюме в PDF на английском",
    description:
      "Готовое резюме для откликов на вакансии в LinkedIn — оформлено по международным стандартам.",
  },
];

export default function PaywallModal({ isOpen, onClose, profileId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    posthog.capture("paywall_purchase_clicked", { profile_id: profileId });
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });

      if (!res.ok) {
        throw new Error("Не удалось создать платёж");
      }

      const { paymentId, confirmationUrl } = await res.json();

      sessionStorage.setItem(`linkedhire_payment_${profileId}`, paymentId);
      window.location.href = confirmationUrl;
    } catch {
      setError("Не удалось инициализировать оплату. Попробуйте позже.");
      setLoading(false);
    }
  }

  function handleClose() {
    posthog.capture("paywall_closed", { profile_id: profileId });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-5 sm:p-7">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs shrink-0">
            L
          </div>
          <span className="font-bold text-[rgba(0,0,0,0.9)] text-[15px] tracking-tight">
            Linked<span className="text-[#3B82F6]">Hire</span>
          </span>
        </div>

        {/* Headline */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0a66c2] mb-1.5">
            Полный доступ
          </p>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[rgba(0,0,0,0.9)] leading-snug">
            Откройте весь профиль
          </h2>
          <p className="mt-1.5 text-sm text-[rgba(0,0,0,0.55)]">
            Готовый профиль LinkedIn и резюме — один раз, навсегда.
          </p>
        </div>

        {/* Pricing card */}
        <div className="rounded-2xl border-2 border-[#0a66c2] bg-[#f0f7ff] p-4 sm:p-5 mb-5 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-[#0a66c2] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
              Лучший выбор
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-1.5 mb-4">
            <span className="text-[38px] sm:text-[44px] font-black text-[rgba(0,0,0,0.9)] leading-none">
              899
            </span>
            <span className="text-[20px] font-bold text-[rgba(0,0,0,0.6)] mb-1">₽</span>
            <span className="text-[13px] text-[rgba(0,0,0,0.4)] mb-1.5 ml-1">единоразово</span>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map(({ title, description }) => (
              <div key={title} className="flex gap-3">
                <div className="mt-0.5 shrink-0">
                  <HiCheckCircle size={18} className="text-[#0a66c2]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[rgba(0,0,0,0.85)]">
                    {title}
                  </p>
                  <p className="text-[12px] text-[rgba(0,0,0,0.5)] mt-0.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-[12px] text-[#ef4444] text-center mb-3">{error}</p>
        )}

        {/* CTA */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] transition-all duration-150 text-white font-bold text-[15px] shadow-lg shadow-[#0a66c2]/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Переходим к оплате...
            </>
          ) : (
            "Получить полный профиль за 899 ₽"
          )}
        </button>

        <p className="text-center text-[11px] text-[rgba(0,0,0,0.4)] mt-3">
          Безопасная оплата · Мгновенный доступ · Без подписки
        </p>
      </div>
    </Modal>
  );
}
