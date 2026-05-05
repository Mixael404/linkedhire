import { FC } from "react";
import { HiExclamationTriangle, HiXMark } from "react-icons/hi2";

interface IExperienceWarningModal {
	setWarningModal: (value: { open: boolean; warnings: string[] }) => void;
	advanceStep: () => void;
	warningModal: { open: boolean; warnings: string[] };
}

export const ExperienceWarningModal: FC<IExperienceWarningModal> = ({
	setWarningModal,
	advanceStep,
	warningModal,
}) => {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
         <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setWarningModal({ open: false, warnings: [] })}
         />
         <div className="relative w-full max-w-md bg-[#0D1426] border border-[#1B2847] rounded-2xl shadow-2xl p-6">
            <div className="flex items-start gap-4 mb-5">
               <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <HiExclamationTriangle size={20} className="text-amber-400" />
               </div>
               <div>
                  <h3
                     className="text-white font-bold text-base"
                     style={{ fontFamily: "var(--font-geologica)" }}
                  >
                     Проверь перед продолжением
                  </h3>
                  <p className="text-[#64748B] text-xs mt-0.5">
                     Эти данные влияют на качество профиля
                  </p>
               </div>
               <button
                  type="button"
                  onClick={() => setWarningModal({ open: false, warnings: [] })}
                  className="ml-auto text-[#475569] hover:text-white transition-colors cursor-pointer shrink-0"
               >
                  <HiXMark size={18} />
               </button>
            </div>

            <ul className="space-y-2.5 mb-6">
               {warningModal.warnings.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                     {w}
                  </li>
               ))}
            </ul>

            <div className="flex gap-3">
               <button
                  type="button"
                  onClick={() => setWarningModal({ open: false, warnings: [] })}
                  className="flex-1 py-2.5 rounded-xl border border-[#1B2847] text-[#94A3B8] hover:border-[#2563EB]/40 hover:text-white text-sm font-medium transition-colors cursor-pointer"
               >
                  Заполнить
               </button>
               <button
                  type="button"
                  onClick={() => {
                     setWarningModal({ open: false, warnings: [] });
                     advanceStep();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-colors cursor-pointer"
               >
                  Продолжить
               </button>
            </div>
            <div className="text-[12px] text-gray-500 text-center font-medium mt-4">
               Можно заполнить позже
            </div>
         </div>
      </div>
   );
}
