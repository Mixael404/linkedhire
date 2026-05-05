"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export interface SelectFieldProps {
   value: string;
   onChange: (val: string) => void;
   options: { value: string; label: string }[];
   placeholder?: string;
   className?: string;
   error?: boolean;
   variant?: "light" | "dark";
}

const themes = {
   light: {
      button: "bg-white",
      borderNormal: "border-[#e2e8f0] hover:border-[#2563EB]/50",
      borderError: "border-red-400/60 hover:border-red-500",
      textSelected: "text-[rgba(0,0,0,0.85)]",
      textPlaceholder: "text-[#9ca3af]",
      chevron: "text-[#9ca3af]",
      dropdown: "bg-white border-[#e2e8f0]",
      optionSelected: "text-[#2563EB] bg-[#eff6ff]",
      optionDefault: "text-[rgba(0,0,0,0.65)] hover:bg-[#f8fafc] hover:text-[rgba(0,0,0,0.9)]",
   },
   dark: {
      button: "bg-[#07091A]",
      borderNormal: "border-[#1B2847] hover:border-[#2563EB]/50",
      borderError: "border-red-500/60 hover:border-red-500",
      textSelected: "text-white",
      textPlaceholder: "text-[#475569]",
      chevron: "text-[#64748B]",
      dropdown: "bg-[#0D1426] border-[#1B2847]",
      optionSelected: "text-white bg-[#2563EB]/10",
      optionDefault: "text-[#94A3B8] hover:bg-[#111D35] hover:text-white",
   },
};

export function SelectField({
   value,
   onChange,
   options,
   placeholder = "Выбрать",
   className = "",
   error,
   variant = "light",
}: SelectFieldProps) {
   const [open, setOpen] = useState(false);
   const t = themes[variant];
   const selected = options.find((o) => o.value === value);

   return (
      <div className={`relative ${className}`}>
         {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
         <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-2 ${t.button} border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors cursor-pointer
               ${error ? t.borderError : t.borderNormal}`}
         >
            <span className={selected ? t.textSelected : t.textPlaceholder}>
               {selected ? selected.label : placeholder}
            </span>
            <HiChevronDown
               size={13}
               className={`${t.chevron} transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}
            />
         </button>

         {open && (
            <div className={`absolute top-full left-0 right-0 mt-1 ${t.dropdown} border rounded-xl overflow-hidden z-20 shadow-xl`}>
               <SimpleBar style={{ maxHeight: 200 }}>
                  {options.map((opt) => (
                     <button
                        key={opt.value}
                        type="button"
                        onClick={() => { onChange(opt.value); setOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                           ${opt.value === value ? t.optionSelected : t.optionDefault}`}
                     >
                        {opt.label}
                     </button>
                  ))}
               </SimpleBar>
            </div>
         )}
      </div>
   );
}
