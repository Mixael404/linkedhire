"use client";

import { useState } from "react";
import { HiCheck, HiClipboard, HiLink } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import EmailOtpForm from "@/components/ui/EmailOtpForm";
import posthog from "posthog-js";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   profileId: string;
};

export default function OnboardingModal({ isOpen, onClose, profileId }: Props) {
   const [copied, setCopied] = useState(false);
   const [emailConfirmed, setEmailConfirmed] = useState(false);

   const shareUrl =
      typeof window !== "undefined"
         ? `${window.location.origin}/profile/${profileId}?iniciator=direct`
         : `/profile/${profileId}?iniciator=direct`;

   const handleCopy = async () => {
      await navigator.clipboard.writeText(shareUrl);
      posthog.capture("profile_link_copied", { profile_id: profileId });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <SimpleBar style={{ maxHeight: "85dvh" }}>
         <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="mb-3 sm:mb-5">
               <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                     L
                  </div>
                  <span className="font-bold text-[rgba(0,0,0,0.9)] text-[15px] sm:text-[17px] tracking-tight">
                     Linked<span className="text-[#3B82F6]">Hire</span>
                  </span>
               </div>
               <h2 className="text-[16px] sm:text-[20px] font-bold text-[rgba(0,0,0,0.9)] leading-snug">
                  Ваш профиль готов!
               </h2>
            </div>

            {/* What is this page */}
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-[#f0f7ff] rounded-xl border border-[#c8dff8]">
               <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.75)] leading-relaxed">
                  Эта страница — аналог вашего профиля в LinkedIn. Каждый раздел содержит готовый
                  текст, оптимизированный под вашу специальность и целевой рынок.
               </p>
            </div>

            {/* How to use */}
            <div className="mb-3 sm:mb-5 space-y-2">
               <p className="text-[10px] sm:text-[13px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wide">
                  Как использовать
               </p>
               {[
                  "Откройте LinkedIn и перейдите в редактирование соответсвующего раздела вашего профиля.",
                  "Нажмите на блок с текстом здесь — он скопируется в буфер",
                  "Вставьте текст в соответствующий раздел LinkedIn",
               ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                     <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a66c2] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                     </span>
                     <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.7)]">{step}</p>
                  </div>
               ))}
            </div>

            {/* Copy link area */}
            <div
               onClick={handleCopy}
               className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                  copied
                     ? "border-green-400/60 bg-green-50"
                     : "border-[#c2d8e8] bg-[#f3f8fc] hover:border-[#0a66c2]/60"
               }`}
            >
               <HiLink size={14} className="text-[#0a66c2] shrink-0" />
               <span className="text-[10px] sm:text-xs text-[rgba(0,0,0,0.6)] flex-1 truncate font-mono">
                  {shareUrl}
               </span>
               {copied ? (
                  <HiCheck size={14} className="text-green-500 shrink-0" />
               ) : (
                  <HiClipboard size={14} className="text-[rgba(0,0,0,0.35)] shrink-0" />
               )}
            </div>
            {copied && (
               <p className="text-[11px] text-green-600 mt-1.5 text-center">Ссылка скопирована!</p>
            )}

            {/* Email registration section */}
            <div className="mt-4 pt-4 border-t border-[#e8f0f8]">
               <p className="text-[10px] sm:text-[13px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wide mb-3">
                  Сохраните доступ к профилю
               </p>
               <EmailOtpForm profileId={profileId} onConfirmed={() => setEmailConfirmed(true)} />
               {!emailConfirmed && (
                  <button
                     onClick={onClose}
                     className="mt-2 text-[11px] text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors cursor-pointer"
                  >
                     Пропустить, буду хранить ссылку
                  </button>
               )}
            </div>
         </div>
         </SimpleBar>
      </Modal>
   );
}
