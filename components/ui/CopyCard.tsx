"use client";

import { maskText } from "@/lib/maskText";
import { useEffect, useRef, useState } from "react";
import { HiClipboard, HiCheck, HiLockClosed } from "react-icons/hi2";

interface CopyCardProps {
  text: string;
  onBlurClick: () => void;
  visibleCharCount: number;
  isBlurred: boolean;
  variant?: "dark" | "light";
}

export default function CopyCard({
  text,
  onBlurClick,
  visibleCharCount,
  isBlurred,
  variant = "dark",
}: CopyCardProps) {
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

  const isDark = variant === "dark";

  const containerCls = isDark
    ? `bg-[#0D1426] ${copied ? "border-green-500/50 shadow-[0_0_16px_rgba(34,197,94,0.12)]" : "border-[#1B2847] hover:border-[#2563EB]/40"}`
    : `bg-[#f3f8fc] ${copied ? "border-green-400/60 shadow-[0_0_12px_rgba(34,197,94,0.08)]" : "border-[#c2d8e8] hover:border-[#0a66c2]/60"}`;

  const textCls = isDark ? "text-[#94A3B8]" : "text-[rgba(0,0,0,0.75)]";

  const lockCls = isDark ? "text-[#475569]" : "text-gray-400";

  return (
    <div
      onClick={handleClick}
      className={`relative group p-4 border rounded-xl cursor-pointer transition-all duration-200 select-none ${containerCls}`}
    >
      {/* Top-right icon */}
      <div className="absolute top-3 right-3">
        {isBlurred ? (
          <HiLockClosed size={14} className={lockCls} />
        ) : copied ? (
          <HiCheck size={14} className="text-green-500" />
        ) : (
          <HiClipboard
            size={14}
            className={`${lockCls} opacity-0 group-hover:opacity-100 transition-opacity duration-150`}
          />
        )}
      </div>

      {/* Text */}
      <p className={`text-sm leading-relaxed pr-5 ${textCls}`}>
        {visiblePart}
        {isBlurred && blurredPart && (
          <span
            style={{ filter: "blur(5px)", userSelect: "none", WebkitUserSelect: "none" }}
          >
            {maskText(blurredPart, 0)}
          </span>
        )}
      </p>

      {/* Copied flash */}
      {copied && (
        <div className="absolute inset-0 rounded-xl flex items-center justify-center pointer-events-none">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-green-600 shadow-lg border border-green-300/50 ${isDark ? "bg-[#0D1426]" : "bg-white"}`}
          >
            <HiCheck size={12} />
            Скопировано
          </div>
        </div>
      )}
    </div>
  );
}
