"use client";

import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
   useEffect(() => {
      if (!isOpen) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
         document.removeEventListener("keydown", onKey);
         document.body.style.overflow = "";
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center p-4"
         aria-modal="true"
         role="dialog"
      >
         {/* Backdrop */}
         <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
         />

         {/* Panel */}
         <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90dvh] overflow-y-auto">
            <button
               onClick={onClose}
               className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.5)]"
               aria-label="Закрыть"
            >
               <HiXMark size={18} />
            </button>

            {children}
         </div>
      </div>
   );
}
