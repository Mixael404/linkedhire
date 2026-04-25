"use client";

import { useState } from "react";
import { HiArrowDownTray } from "react-icons/hi2";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";
import ResumeDataModal, { type ResumeExtraData } from "@/components/ui/ResumeDataModal";

type Props = { profile: GeneratedProfile };

export default function DownloadResumeButton({ profile }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (extraData: ResumeExtraData) => {
    setLoading(true);
    try {
      const [{ pdf }, { default: ResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/pdf/ResumePdf"),
      ]);

      const blob = await pdf(<ResumePdf profile={profile} extraData={extraData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = extraData.name.trim().replace(/\s+/g, "_") || "Resume";
      a.download = `${safeName}_Resume_LinkedHire.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setModalOpen(false);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-1.75 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors text-sm font-semibold rounded-full cursor-pointer"
      >
        <HiArrowDownTray size={14} />
        Скачать резюме
      </button>

      <ResumeDataModal
        isOpen={modalOpen}
        onClose={() => { if (!loading) setModalOpen(false); }}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </>
  );
}
