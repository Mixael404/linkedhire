"use client";

import { useState } from "react";
import { HiCheck, HiClipboard, HiLink } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   profileId: string;
};

export default function OnboardingModal({ isOpen, onClose, profileId }: Props) {
   const [copied, setCopied] = useState(false);

   const shareUrl =
      typeof window !== "undefined"
         ? `${window.location.origin}/profile/${profileId}?iniciator=direct`
         : `/profile/${profileId}?iniciator=direct`;

   const handleCopy = async () => {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <div className="p-6 sm:p-7">
            {/* Header */}
            <div className="mb-5">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm shrink-0">
                     L
                  </div>
                  <span className="font-bold text-[rgba(0,0,0,0.9)] text-[17px] tracking-tight">
                     Linked<span className="text-[#3B82F6]">Hire</span>
                  </span>
               </div>
               <h2 className="text-[20px] font-bold text-[rgba(0,0,0,0.9)] leading-snug">
                  Ваш профиль готов!
               </h2>
            </div>

            {/* What is this page */}
            <div className="mb-4 p-4 bg-[#f0f7ff] rounded-xl border border-[#c8dff8]">
               <p className="text-sm text-[rgba(0,0,0,0.75)] leading-relaxed">
                  Эта страница — аналог вашего профиля в LinkedIn. Каждый раздел содержит готовый
                  текст, оптимизированный под вашу специальность и целевой рынок.
               </p>
            </div>

            {/* How to use */}
            <div className="mb-5 space-y-2.5">
               <p className="text-[13px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wide">
                  Как использовать
               </p>
               {[
                  "Откройте LinkedIn и перейдите в редактирование соответсвующего раздела вашего профиля.",
                  "Нажмите на блок с текстом здесь — он скопируется в буфер",
                  "Вставьте текст в соответствующий раздел LinkedIn",
               ].map((step, i) => (
                  <div key={i}>
                     <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0a66c2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                           {i + 1}
                        </span>
                        <p className="text-sm text-[rgba(0,0,0,0.7)]">{step}</p>
                     </div>
                     {/* {i === 0 && (
                        <p
                           className="text-[10px] text-black mt-0.5"
                        >
                           (Нажмите на ? рядом с разделом для помощи в нахождении нужного места в LinkedIn)
                        </p>
                     )} */}
                  </div>
               ))}
            </div>

            {/* No registration note */}
            <p className="text-[13px] text-[rgba(0,0,0,0.5)] mb-4 leading-relaxed">
               Мы уважаем ваше время — никакой регистрации не требуется. Профиль всегда доступен по
               ссылке ниже, сохраните её, чтобы не потерять.
            </p>

            {/* Copy link area */}
            <div
               onClick={handleCopy}
               className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                  copied
                     ? "border-green-400/60 bg-green-50"
                     : "border-[#c2d8e8] bg-[#f3f8fc] hover:border-[#0a66c2]/60"
               }`}
            >
               <HiLink size={16} className="text-[#0a66c2] shrink-0" />
               <span className="text-xs text-[rgba(0,0,0,0.6)] flex-1 truncate font-mono">
                  {shareUrl}
               </span>
               {copied ? (
                  <HiCheck size={15} className="text-green-500 shrink-0" />
               ) : (
                  <HiClipboard size={15} className="text-[rgba(0,0,0,0.35)] shrink-0" />
               )}
            </div>
            {copied && (
               <p className="text-[12px] text-green-600 mt-1.5 text-center">Ссылка скопирована!</p>
            )}
         </div>
      </Modal>
   );
}
