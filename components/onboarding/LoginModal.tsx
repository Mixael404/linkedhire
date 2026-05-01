"use client";

import { useState } from "react";
import { HiEnvelope, HiPaperAirplane, HiXMark } from "react-icons/hi2";

type MagicLinkState = "idle" | "sending" | "sent";

interface LoginModalProps {
   onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
   const [email, setEmail] = useState("");
   const [state, setState] = useState<MagicLinkState>("idle");
   const [error, setError] = useState("");

   const sendLink = async () => {
      if (!email.trim()) {
         setError("Введите email");
         return;
      }
      setError("");
      setState("sending");

      const res = await fetch("/api/auth/send-magic-link", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
         const data = await res.json().catch(() => ({}));
         setError(data.error ?? "Не удалось отправить письмо. Попробуйте позже.");
         setState("idle");
         return;
      }

      setState("sent");
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
         <div className="relative w-full max-w-md bg-[#0D1426] border border-[#1B2847] rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
               <div>
                  <h3
                     className="text-white font-bold text-base"
                     style={{ fontFamily: "var(--font-geologica)" }}
                  >
                     Войти в существующий профиль
                  </h3>
                  <p className="text-[#64748B] text-xs mt-0.5">
                     Отправим ссылку на почту, к которой привязан ваш профиль
                  </p>
               </div>
               <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 text-[#475569] hover:text-white transition-colors cursor-pointer shrink-0"
               >
                  <HiXMark size={18} />
               </button>
            </div>

            {state === "sent" ? (
               <div className="p-5 rounded-2xl border border-[#2563EB]/30 bg-[#2563EB]/5">
                  <div className="flex items-start gap-3">
                     <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#3B82F6] shrink-0">
                        <HiPaperAirplane size={18} />
                     </div>
                     <div>
                        <p className="text-white text-sm font-semibold mb-1">Ссылка отправлена!</p>
                        <p className="text-[#64748B] text-xs leading-relaxed">
                           Проверьте почту{" "}
                           <span className="text-[#94A3B8]">{email}</span> - там ссылка для входа
                           в ваш профиль.
                        </p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="space-y-3">
                  <div className="flex gap-2">
                     <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-[#1B2847] rounded-xl bg-[#07091A] focus-within:border-[#2563EB]/60 transition-colors">
                        <HiEnvelope size={16} className="text-[#64748B] shrink-0" />
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="your@email.com"
                           className="flex-1 text-sm text-white outline-none bg-transparent placeholder:text-[#475569]"
                           onKeyDown={(e) => e.key === "Enter" && sendLink()}
                           autoFocus
                        />
                     </div>
                     <button
                        type="button"
                        onClick={sendLink}
                        disabled={state === "sending"}
                        className="shrink-0 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                     >
                        {state === "sending" ? "..." : "Войти"}
                     </button>
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
               </div>
            )}
         </div>
      </div>
   );
}
