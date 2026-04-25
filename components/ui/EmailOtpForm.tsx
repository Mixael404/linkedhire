"use client";

import { useState } from "react";
import { HiEnvelope, HiCheckCircle } from "react-icons/hi2";
import { createClient } from "@/lib/supabase/client";

type Step = "idle" | "code_sent" | "confirmed";

type Props = {
   profileId: string;
   onConfirmed?: () => void;
};

export default function EmailOtpForm({ profileId, onConfirmed }: Props) {
   const [step, setStep] = useState<Step>("idle");
   const [email, setEmail] = useState("");
   const [code, setCode] = useState("");
   const [emailError, setEmailError] = useState("");
   const [codeError, setCodeError] = useState("");
   const [loadingOtp, setLoadingOtp] = useState(false);
   const [loadingVerify, setLoadingVerify] = useState(false);

   const sendOtp = async () => {
      if (!email.trim()) {
         setEmailError("Введите email");
         return;
      }
      setEmailError("");
      setLoadingOtp(true);
      const supabase = createClient();
      const emailRedirectTo = `${window.location.origin}/auth/callback?profileId=${profileId}`;
      const { error } = await supabase.auth.signInWithOtp({
         email: email.trim(),
         options: { emailRedirectTo },
      });
      setLoadingOtp(false);
      if (error) {
         setEmailError("Не удалось отправить ссылку. Проверьте email и попробуйте снова.");
         return;
      }
      setStep("code_sent");
   };

   const verifyOtp = async () => {
      if (!code.trim()) {
         setCodeError("Введите код из письма");
         return;
      }
      setCodeError("");
      setLoadingVerify(true);
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
         email: email.trim(),
         token: code.trim(),
         type: "email",
      });
      if (error) {
         setLoadingVerify(false);
         setCodeError("Неверный или просроченный код. Попробуйте снова.");
         return;
      }

      const res = await fetch(`/api/profile/${profileId}/email`, { method: "PATCH" });
      setLoadingVerify(false);
      if (!res.ok) {
         const data = await res.json().catch(() => ({}));
         setCodeError(data.error ?? "Не удалось привязать email. Попробуйте позже.");
         return;
      }
      setStep("confirmed");
      onConfirmed?.();
   };

   if (step === "confirmed") {
      return (
         <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-200">
            <HiCheckCircle size={18} className="text-green-500 shrink-0" />
            <p className="text-xs sm:text-sm text-green-700">
               Email привязан - войти в профиль можно по ссылке из письма
            </p>
         </div>
      );
   }

   if (step === "code_sent") {
      return (
         <div className="space-y-2.5">
            <p className="text-sm text-[rgba(0,0,0,0.6)]">
               Ссылка отправлена на <span className="font-medium">{email}</span>
            </p>
            <p className="text-xs text-[rgba(0,0,0,0.6)]">
               Подтвердите ваш email, перейдя по ссылке из письма. Если письмо не пришло, проверьте
               папку "Спам" или попробуйте снова.
            </p>
            {codeError && <p className="text-[11px] text-red-500">{codeError}</p>}
         </div>
      );
   }

   return (
      <div className="space-y-2.5">
         <p className="text-xs text-[rgba(0,0,0,0.55)] leading-relaxed">
            Укажите email - мы пришлём ссылку для подтверждения. Потом сможете вернуться к профилю
            по ссылке из письма.
         </p>
         <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-[#c2d8e8] rounded-lg focus-within:border-[#0a66c2] transition-colors">
               <HiEnvelope size={14} className="text-[rgba(0,0,0,0.35)] shrink-0" />
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 text-xs outline-none bg-transparent text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.35)]"
                  onKeyDown={(e) => e.key === "Enter" && sendOtp()}
               />
            </div>
            <button
               onClick={sendOtp}
               disabled={loadingOtp}
               className="shrink-0 px-3 py-2 text-xs font-semibold bg-[#0a66c2] hover:bg-[#004182] text-white rounded-lg transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
               {loadingOtp ? (
                  <svg
                     className="animate-spin"
                     width="14"
                     height="14"
                     viewBox="0 0 14 14"
                     fill="none"
                  >
                     <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                     />
                     <path
                        d="M7 1.5A5.5 5.5 0 0112.5 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                     />
                  </svg>
               ) : (
                  "Подтвердить"
               )}
            </button>
         </div>
         {emailError && <p className="text-[11px] text-red-500">{emailError}</p>}
      </div>
   );
}
