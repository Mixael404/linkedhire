"use client";

import { startTransition, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";
import CopyCard from "@/components/ui/CopyCard";

const handleBlurClick = (section: string) => {
  console.log(`[CopyCard] blur clicked — section: ${section}`);
};

export default function ProfilePage() {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<GeneratedProfile | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(`linkedhire_profile_${profileId}`);
    if (raw) startTransition(() => setProfile(JSON.parse(raw)));
  }, [profileId]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#07091A] flex items-center justify-center">
        <p className="text-[#64748B]">Профиль не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07091A] text-white">
      {/* Header */}
      <header className="border-b border-[#1B2847]/60 bg-[#07091A]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
            <span
              className="font-bold text-white text-[17px] tracking-tight"
              style={{ fontFamily: "var(--font-geologica)" }}
            >
              Linked<span className="text-[#3B82F6]">Hire</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {/* Headline */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-2">
            Заголовок
          </p>
          <CopyCard
            text={profile.headline}
            onBlurClick={() => handleBlurClick("headline")}
            blurCharCount={40}
            isBlurred={true}
          />
        </section>

        {/* About */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-2">
            О себе
          </p>
          <CopyCard
            text={profile.about}
            onBlurClick={() => handleBlurClick("about")}
            blurCharCount={120}
            isBlurred={true}
          />
        </section>

        {/* Work Experience */}
        {profile.workExperiences.length > 0 && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-3">
              Опыт работы
            </p>
            <div className="space-y-3">
              {profile.workExperiences.map((exp, i) => (
                <div key={i}>
                  <div className="mb-2 px-1">
                    <span className="font-semibold text-white text-sm">{exp.position}</span>
                    <span className="text-[#475569] text-sm"> · {exp.company} · {exp.period}</span>
                  </div>
                  <CopyCard
                    text={exp.description}
                    onBlurClick={() => handleBlurClick(`work-${i}`)}
                    blurCharCount={150}
                    isBlurred={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {profile.projects.length > 0 && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-3">
              Проекты
            </p>
            <div className="space-y-3">
              {profile.projects.map((proj, i) => (
                <div key={i}>
                  <div className="mb-2 px-1">
                    <span className="font-semibold text-white text-sm">{proj.position}</span>
                    <span className="text-[#475569] text-sm"> · {proj.company} · {proj.period}</span>
                  </div>
                  <CopyCard
                    text={proj.description}
                    onBlurClick={() => handleBlurClick(`project-${i}`)}
                    blurCharCount={150}
                    isBlurred={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-3">
              Навыки
            </p>
            <CopyCard
              text={profile.skills.join(" · ")}
              onBlurClick={() => handleBlurClick("skills")}
              blurCharCount={30}
              isBlurred={true}
            />
          </section>
        )}
      </main>
    </div>
  );
}
