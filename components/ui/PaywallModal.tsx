"use client";

import { useState } from "react";
import { HiDocumentArrowDown, HiIdentification, HiArrowTrendingUp, HiUserGroup, HiCpuChip } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import posthog from "posthog-js";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   profileId: string;
   price: number;
};

export default function PaywallModal({ isOpen, onClose, profileId, price }: Props) {
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
         if (!res.ok) throw new Error();
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
         <div className="p-5 sm:p-6">

            {/* Brand */}
            <div className="flex items-center gap-2 mb-3">
               <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-[11px] shrink-0">
                  L
               </div>
               <span className="font-bold text-[rgba(0,0,0,0.9)] text-sm tracking-tight">
                  Linked<span className="text-[#3B82F6]">Hire</span>
               </span>
            </div>

            <h2 className="text-[20px] font-bold text-[rgba(0,0,0,0.9)] leading-snug mb-2 sm:mb-3">
               Откройте полный профиль
            </h2>

            {/* What you get */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-[rgba(0,0,0,0.35)] mb-2">Вы получаете за одну фиксированную цену</p>
            <div className="mb-3 space-y-1.5">
               <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#f5f9ff] border border-[#dbeafe]">
                  <HiIdentification size={16} className="text-[#0a66c2] shrink-0" />
                  <div className="min-w-0">
                     <p className="text-[12.5px] font-semibold text-[rgba(0,0,0,0.85)] mb-1">Готовый профиль для LinkedIn</p>
                     <p className="text-[10px] text-[rgba(0,0,0,0.35)]">Заголовок, About, весь опыт, проекты - копируй и вставляй <br /> Цена у агентства - <span className="text-[rgba(0,0,0,0.7)] font-medium">от 15 000 ₽</span></p>
                  </div>
               </div>
               <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#f5f9ff] border border-[#dbeafe]">
                  <HiDocumentArrowDown size={16} className="text-[#0a66c2] shrink-0" />
                  <div className="min-w-0">
                     <p className="text-[12.5px] font-semibold text-[rgba(0,0,0,0.85)] mb-1">PDF-резюме на английском</p>
                     <p className="text-[11px] text-[rgba(0,0,0,0.35)]">Готовый файл - скачайте и отправьте рекрутеру <br /> Цена у агентства - <span className="text-[rgba(0,0,0,0.7)] font-medium">от 10 000 ₽</span></p>
                  </div>
               </div>
            </div>

            {/* Results */}
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0]">
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a] mb-2">Что это даёт</p>
               <div className="space-y-1.5">
                  {[
                     { icon: HiArrowTrendingUp, text: "Профиль выходит в топ поиска рекрутеров" },
                     { icon: HiCpuChip,         text: "Отклики проходят ИИ-фильтры ATS" },
                     { icon: HiUserGroup,        text: "Рекрутеры начинают писать первыми" },
                  ].map(({ icon: Icon, text }) => (
                     <div key={text} className="flex items-center gap-2">
                        <Icon size={13} className="text-[#16a34a] shrink-0" />
                        <p className="text-[12px] text-[rgba(0,0,0,0.65)]">{text}</p>
                     </div>
                  ))}
               </div>
            </div>

            <p className="text-[10px] text-[rgba(0,0,0,0.45)] mb-4">
              Цена за аналогичные услуги у агенств, менторов <span className="hidden sm:inline">, консультанов</span> <span className="text-[12px] sm:text-[13px] font-medium text-[rgba(0,0,0,0.6)]">~20 000 ₽</span>
            </p>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-black text-[rgba(0,0,0,0.9)] leading-none">{price}</span>
                  <span className="text-[16px] font-bold text-[rgba(0,0,0,0.55)]">₽</span>
                  <span className="text-[11px] text-[rgba(0,0,0,0.35)] ml-1">единоразово</span>
               </div>
               <div className="text-right">
                  <p className="text-[11px] text-[rgba(0,0,0,0.3)] line-through">~20 000 ₽</p>
                  <p className="text-[10px] text-[rgba(0,0,0,0.3)]">в агентствах</p>
               </div>
            </div>

            {error && <p className="text-[12px] text-[#ef4444] text-center mb-3">{error}</p>}

            {/* CTA */}
            <button
               onClick={handlePurchase}
               disabled={loading}
               className="w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] transition-all duration-150 text-white font-bold text-[14px] shadow-lg shadow-[#0a66c2]/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
               {loading ? (
                  <>
                     <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                     Переходим к оплате...
                  </>
               ) : (
                  `Получить полный профиль за ${price} ₽`
               )}
            </button>

            <p className="text-center text-[10px] text-[rgba(0,0,0,0.3)] mt-2">
               Безопасная оплата · Мгновенный доступ · Без подписки
            </p>
         </div>
      </Modal>
   );
}
