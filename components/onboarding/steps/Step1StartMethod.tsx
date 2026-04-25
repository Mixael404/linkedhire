"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiPencilSquare, HiEnvelope, HiPaperAirplane } from "react-icons/hi2";
import { OnboardingData } from "../../../types/onboarding";


type MagicLinkState = "idle" | "sending" | "sent";

function ExistingProfileForm() {
   const [magicEmail, setMagicEmail] = useState("");
   const [magicState, setMagicState] = useState<MagicLinkState>("idle");
   const [magicError, setMagicError] = useState("");

   const sendLink = async () => {
      if (!magicEmail.trim()) {
         setMagicError("Введите email");
         return;
      }
      setMagicError("");
      setMagicState("sending");

      const res = await fetch("/api/auth/send-magic-link", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email: magicEmail.trim() }),
      });

      if (!res.ok) {
         const data = await res.json().catch(() => ({}));
         setMagicError(data.error ?? "Не удалось отправить письмо. Попробуйте позже.");
         setMagicState("idle");
         return;
      }

      setMagicState("sent");
   };

   if (magicState === "sent") {
      return (
         <div className="mt-5 max-w-xl mx-auto p-5 rounded-2xl border border-[#2563EB]/30 bg-[#2563EB]/5">
            <div className="flex items-start gap-3">
               <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#3B82F6] shrink-0">
                  <HiPaperAirplane size={18} />
               </div>
               <div>
                  <p className="text-white text-sm font-semibold mb-1">Ссылка отправлена!</p>
                  <p className="text-[#64748B] text-xs leading-relaxed">
                     Проверьте почту <span className="text-[#94A3B8]">{magicEmail}</span> - там
                     ссылка для входа в ваш профиль.
                  </p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="mt-5 max-w-xl mx-auto space-y-3">
         <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-[#1B2847] rounded-xl bg-[#0D1426] focus-within:border-[#2563EB]/60 transition-colors">
               <HiEnvelope size={16} className="text-[#64748B] shrink-0" />
               <input
                  type="email"
                  value={magicEmail}
                  onChange={(e) => setMagicEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 text-sm text-white outline-none bg-transparent placeholder:text-[#475569]"
                  onKeyDown={(e) => e.key === "Enter" && sendLink()}
               />
            </div>
            <button
               type="button"
               onClick={sendLink}
               disabled={magicState === "sending"}
               className="shrink-0 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
               {magicState === "sending" ? "..." : "Войти по ссылке"}
            </button>
         </div>
         {magicError && <p className="text-red-400 text-xs">{magicError}</p>}
         <p className="text-[#475569] text-xs">
            Отправим ссылку на почту, к которой привязан ваш профиль
         </p>
      </div>
   );
}

const OPTIONS = [
   {
      value: "manual" as const,
      icon: <HiPencilSquare size={28} />,
      title: "Заполнить вручную",
      subtitle: "Пошагово ответишь на вопросы",
      badge: null,
   },
   {
      value: "existing" as const,
      icon: <HiEnvelope size={28} />,
      title: "У меня уже есть профиль",
      subtitle: "Войти по ссылке на почту",
      badge: null,
   },
];

export default function Step1StartMethod() {
   const {
      watch,
      setValue,
      formState: { errors },
      register,
   } = useFormContext<OnboardingData>();

   const selected = watch("startMethod");

   register("startMethod", { required: "Выбери способ начала" });

   return (
      <div>
         <div className="mb-10 text-center">
            <h2
               className="text-2xl sm:text-3xl font-black text-white mb-3"
               style={{ fontFamily: "var(--font-geologica)" }}
            >
               Как тебе удобнее начать?
            </h2>
            <p className="text-[#64748B] text-base">Выбери формат - мы подстроимся под него</p>
         </div>

         <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {OPTIONS.map((opt) => {
               const isSelected = selected === opt.value;
               return (
                  <button
                     key={opt.value}
                     type="button"
                     onClick={() => setValue("startMethod", opt.value, { shouldValidate: true })}
                     className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer group
                ${
                   isSelected
                      ? "border-[#2563EB] bg-[#2563EB]/10 shadow-lg shadow-[#2563EB]/10"
                      : "border-[#1B2847] bg-[#0D1426] hover:border-[#2563EB]/40 hover:bg-[#111D35]"
                }`}
                  >
                     {opt.badge && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded-full">
                           {opt.badge}
                        </span>
                     )}

                     <div
                        className={`mb-4 transition-colors ${
                           isSelected
                              ? "text-[#3B82F6]"
                              : "text-[#64748B] group-hover:text-[#94A3B8]"
                        }`}
                     >
                        {opt.icon}
                     </div>

                     <div
                        className={`font-bold text-lg mb-1 transition-colors ${
                           isSelected ? "text-white" : "text-[#94A3B8] group-hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-geologica)" }}
                     >
                        {opt.title}
                     </div>
                     <div className="text-[#64748B] text-sm">{opt.subtitle}</div>

                     <div
                        className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                           isSelected ? "border-[#2563EB] bg-[#2563EB]" : "border-[#1B2847]"
                        }`}
                     >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                     </div>
                  </button>
               );
            })}
         </div>

         {selected === "existing" && <ExistingProfileForm />}

         {errors.startMethod && (
            <p className="text-red-400 text-sm text-center mt-4">{errors.startMethod.message}</p>
         )}
      </div>
   );
}
