"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface AccordionProps {
  title: string;
  badge?: number | boolean;
  children: React.ReactNode;
}

export default function Accordion({ title, badge, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  const showNumericBadge = typeof badge === "number" && badge > 0;
  const showDotBadge = badge === true;

  return (
    <div className="border border-[#1B2847] rounded-xl overflow-hidden mb-2">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#111D35] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="text-[#94A3B8] font-semibold text-sm group-hover:text-white"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            {title}
          </span>

          {showNumericBadge && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#2563EB] text-white text-[10px] font-bold rounded-full">
              {badge}
            </span>
          )}
          {showDotBadge && (
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          )}
        </div>

        <HiChevronDown
          size={18}
          className={`text-[#64748B] transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Collapsible body — CSS grid trick for smooth animation */}
      <div
        className={`grid transition-all duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
