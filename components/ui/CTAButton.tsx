"use client";

import { ReactNode } from "react";
import posthog from "posthog-js";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "sm";
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
}: CTAButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 transition-colors font-bold";

  const variants = {
    primary: {
      default:
        "btn-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base",
      sm: "btn-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-sm font-semibold",
    },
    secondary: {
      default:
        "border border-[#1B2847] hover:border-[#2563EB]/50 text-[#94A3B8] hover:text-white px-6 py-2.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-medium",
      sm: "border border-[#1B2847] hover:border-[#2563EB]/50 text-[#94A3B8] hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium",
    },
  };

  const sizeClass = variant === "secondary" ? "" : "font-bold";
  const variantClass = variants[variant][size];

  return (
    <a
      href={href}
      onClick={() =>
        posthog.capture("landing_CTA_clicked", { href, variant })
      }
      className={`${base} ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
