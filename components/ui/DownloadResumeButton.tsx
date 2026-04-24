"use client";

import { useState } from "react";
import { HiArrowDownTray } from "react-icons/hi2";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";

type Props = { profile: GeneratedProfile };

export default function DownloadResumeButton({ profile }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const [{ pdf }, { default: ResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/pdf/ResumePdf"),
      ]);

      const blob = await pdf(<ResumePdf profile={profile} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume-linkedhire.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-4 py-1.75 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors text-sm font-semibold rounded-full disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
          <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <HiArrowDownTray size={14} />
      )}
      {loading ? "Генерируем…" : "Скачать резюме"}
    </button>
  );
}
