"use client";

import { maskText } from "@/lib/maskText";
import { useEffect, useRef, useState } from "react";
import { HiClipboard, HiCheck, HiLockClosed } from "react-icons/hi2";

interface CopyCardProps {
  text: string;
  onBlurClick: () => void;
  visibleCharCount: number;
  isBlurred: boolean;
}

export default function CopyCard({ text, onBlurClick, visibleCharCount, isBlurred }: CopyCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const visiblePart = isBlurred ? text.slice(0, visibleCharCount) : text;
  const blurredPart = isBlurred ? text.slice(visibleCharCount) : "";

  const handleClick = async () => {
    if (isBlurred) {
      onBlurClick();
      return;
    }
    await navigator.clipboard.writeText(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative group p-5 border rounded-2xl bg-[#0D1426] cursor-pointer
        transition-all duration-200 select-none
        ${copied
          ? "border-green-500/50 shadow-[0_0_16px_rgba(34,197,94,0.12)]"
          : isBlurred
            ? "border-[#1B2847] hover:border-[#2563EB]/40"
            : "border-[#1B2847] hover:border-[#2563EB]/40"
        }
      `}
    >
      {/* Top-right icon */}
      <div className="absolute top-3.5 right-3.5">
        {isBlurred ? (
          <HiLockClosed size={15} className="text-[#475569]" />
        ) : copied ? (
          <HiCheck size={15} className="text-green-400" />
        ) : (
          <HiClipboard
            size={15}
            className="text-[#475569] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          />
        )}
      </div>

      {/* Text */}
      <p className="text-[#94A3B8] text-sm leading-relaxed pr-6">
        {visiblePart}
        {isBlurred && blurredPart && (
          <span
            style={{
              filter: "blur(6px)",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            {maskText(blurredPart, 0)}
          </span>
        )}
      </p>

      {/* Copied flash */}
      {copied && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D1426] border border-green-500/30 text-xs font-medium text-green-400 shadow-lg">
            <HiCheck size={12} />
            Скопировано
          </div>
        </div>
      )}
    </div>
  );
}
