"use client";

import { startTransition, useCallback, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type {
  GeneratedProfile,
  GeneratedWorkExperience,
  GeneratedProject,
} from "@/app/api/generate-profile/route";
import CopyCard from "@/components/ui/CopyCard";
import { HiPencilSquare, HiXMark } from "react-icons/hi2";
import { getInitials } from "@/lib/initials";
import styles from "./profile.module.css";

/* ─── Nav item: labels hidden on xs, visible on sm+ ─── */
function NavItem({
  icon,
  label,
  active = false,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <button
      className={`relative flex flex-col items-center justify-center gap-0.5 px-2 sm:px-4 h-13 text-[11px] leading-none transition-colors ${
        active
          ? "text-[rgba(0,0,0,0.9)] border-b-2 border-[rgba(0,0,0,0.9)]"
          : "text-[rgba(0,0,0,0.55)] hover:text-[rgba(0,0,0,0.9)] border-b-2 border-transparent"
      }`}
    >
      <span className="relative flex items-center justify-center w-6 h-6">
        {icon}
        {badge !== undefined && (
          <span className="absolute -top-1 -right-2 bg-[#e34d26] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1 leading-none">
            {badge}
          </span>
        )}
      </span>
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}

/* ─── White card wrapper ─── */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden ${className}`}
      style={{
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section header with + and pencil ─── */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-[18px] font-semibold text-[rgba(0,0,0,0.9)]">
        {title}
      </h2>
      <div className="flex gap-1">
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
          <HiPencilSquare size={18} />
        </button>
      </div>
    </div>
  );
}

/* ─── Company / education row ─── */
function OrgRow({
  initials,
  name,
  round = false,
}: {
  initials: string;
  name: string;
  round?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 sm:w-8.5 sm:h-8.5 ${round ? "rounded-full bg-[#c8102e]" : "rounded-sm bg-gray-100 border border-gray-200"} shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${round ? "text-white" : "text-gray-500"}`}
      >
        {initials}
      </div>
      <span className="text-sm text-[rgba(0,0,0,0.7)] leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  );
}

/* ─── Experience / project row ─── */
function WorkItem({
  item,
  sectionKey,
  onBlurClick,
}: {
  item: GeneratedWorkExperience | GeneratedProject;
  sectionKey: string;
  onBlurClick: (section: string) => void;
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
        {getInitials(item.company)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[rgba(0,0,0,0.9)] text-[15px] leading-snug">
          {item.position}
        </p>
        <p className="text-sm text-[rgba(0,0,0,0.7)] mt-0.5">{item.company}</p>
        <p className="text-xs text-[rgba(0,0,0,0.45)] mt-0.5 mb-3">
          {item.period}
        </p>
        <CopyCard
          text={item.description}
          onBlurClick={() => onBlurClick(sectionKey)}
          visibleCharCount={100}
          isBlurred
          variant="light"
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function ProfilePage() {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<GeneratedProfile | null>(null);
  console.log("ProfilePage rendered with profileId:", profileId);

  useEffect(() => {
    fetch(`/api/profile/${profileId}`)
      .then((res) => res.json())
      .then((data) => startTransition(() => setProfile(data)))
      .catch(console.error);
  }, [profileId]);

  const onBlurClick = useCallback((section: string) => {
    console.log(`[CopyCard] blur clicked — section: ${section}`);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Профиль не найден</p>
      </div>
    );
  }

  const roleTitle = profile.workExperiences[0]?.position ?? "Developer";
  const companyName = profile.workExperiences[0]?.company ?? "";
  const companyInitials = getInitials(companyName);

  return (
    <div
      className="min-h-screen bg-[#f3f2ef]"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* ══ HEADER ══ */}
      <header
        className="bg-white sticky top-0 z-30"
        style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-282 mx-auto px-3 sm:px-4 flex items-center gap-1 h-13">
          <Link href="/" className="flex items-center gap-2 mr-1 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
            <span
              className="font-bold text-[rgba(0,0,0,0.9)] text-[17px] tracking-tight"
              style={{ fontFamily: "var(--font-geologica)" }}
            >
              Linked<span className="text-[#3B82F6]">Hire</span>
            </span>
          </Link>

          {/* Search — hidden on mobile */}
          <div className="hidden sm:flex items-center bg-[#eef3f8] rounded px-3 py-1.75 gap-2 w-52 lg:w-57 shrink-0">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="rgba(0,0,0,0.45)"
            >
              <path d="M21.7 20.3l-5.4-5.4A8 8 0 1010 18a8 8 0 004.9-1.7l5.4 5.4 1.4-1.4zM4 10a6 6 0 1112 0A6 6 0 014 10z" />
            </svg>
            <span className="text-sm text-[rgba(0,0,0,0.38)]">Поиск</span>
          </div>

          <nav className="flex items-center ml-auto">
            <NavItem
              active
              label="Главная"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M23 9.36L12.56 2.31a1 1 0 00-1.12 0L1 9.36v1.06h2.09v9.79A1.85 1.85 0 005 22h5v-5h4v5h5a1.85 1.85 0 001.85-1.85v-9.73H23z" />
                </svg>
              }
            />
            <NavItem
              label="Сеть"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6zm7 4h-2v-1a5 5 0 00-10 0v1H5v-1a7 7 0 0114 0v1z" />
                </svg>
              }
            />
            <NavItem
              label="Вакансии"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M9 2v2H4a2 2 0 00-2 2v13a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-5V2H9zm0 2h6v1H9V4zM4 8h16v11H4V8zm3 2v2h10v-2H7zm0 4v2h7v-2H7z" />
                </svg>
              }
            />
            <NavItem
              label="Сообщения"
              badge={3}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M2 3h20v14H13.41L8 21.41V17H2V3zm2 2v10h6v2.59L14.59 15H20V5H4z" />
                </svg>
              }
            />
            <NavItem
              label="Уведомления"
              badge={2}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M20 18H4v-1l2-2V9a6 6 0 014-5.66V3a2 2 0 014 0v.34A6 6 0 0118 9v6l2 2v1zm-8 4a2 2 0 002-2h-4a2 2 0 002 2z" />
                </svg>
              }
            />
            <NavItem
              label="Профиль"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6zm0 4c-4 0-7 1.79-7 4v1h14v-1c0-2.21-3-4-7-4z" />
                </svg>
              }
            />
          </nav>
        </div>
      </header>

      {/* ══ PAGE BODY ══ */}
      <div className="max-w-235 mx-auto px-3 sm:px-4 py-4 pb-12 flex flex-col lg:flex-row gap-5 items-start">
        {/* ════ LEFT COLUMN ════ */}
        <div className="w-full min-w-0 space-y-3">
          {/* ── Profile header card ── */}
          <Card>
            {/* Banner */}
            <div className="h-28 sm:h-40 lg:h-48 w-full relative overflow-hidden bg-[#d0cfc9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&crop=top&auto=format"
                alt="banner"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <button className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[rgba(0,0,0,0.55)] shadow-sm transition-colors">
                <HiPencilSquare size={13} />
              </button>
            </div>

            <div className="px-3 sm:px-5 pb-4 sm:pb-5">
              {/* Avatar row */}
              <div className="flex justify-between items-start">
                <div className={styles.avatar}>
                  <div className={styles.avatarInner}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/opentowork-ring.png"
                    alt="#OpenToWork"
                    className="absolute inset-0 w-full h-full pointer-events-none select-none"
                    style={{ objectFit: "contain", zIndex: 2 }}
                    draggable={false}
                  />
                </div>
                <button className="mt-2 sm:mt-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                  <HiPencilSquare size={17} />
                </button>
              </div>

              {/* Name area */}
              <div className="mt-1 flex flex-col sm:flex-row sm:gap-4">
                {/* Left: name, headline, location, buttons */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-nowrap justify-between">
                    <div>
                      <div className="flex items-start gap-2 flex-wrap">
                        <h1 className="text-[18px] sm:text-[20px] font-semibold text-[rgba(0,0,0,0.9)] leading-tight">
                          John Doe
                        </h1>
                        <button className="flex items-center gap-0.75 mt-0.5 px-2 py-0.75 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[11px] font-semibold hover:bg-[#0a66c2]/5 transition-colors whitespace-nowrap">
                          <svg
                            viewBox="0 0 20 20"
                            width="11"
                            height="11"
                            fill="currentColor"
                          >
                            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm3.46 6.36l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 111.06 1.06z" />
                          </svg>
                          <span className="hidden sm:inline">
                            Добавьте эмблему подтверждения
                          </span>
                          <span className="sm:hidden">Подтверждение</span>
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-2 flex-nowrap">
                        <CopyCard
                          text={profile.headline}
                          onBlurClick={() => onBlurClick("headline")}
                          visibleCharCount={42}
                          isBlurred
                          variant="light"
                        />
                      </div>
                    </div>

                    {/* Company + edu — desktop right column */}
                    <div className="hidden sm:flex flex-col gap-2.5 pt-2 w-47 shrink-0 mr-2">
                      {companyName && (
                        <OrgRow initials={companyInitials} name={companyName} />
                      )}
                      <OrgRow
                        initials="DMU"
                        name="De Montfort University"
                        round
                      />
                    </div>
                  </div>

                  <p className="text-sm text-[rgba(0,0,0,0.6)] mt-2">
                    {profile.targetCountry ?? "Germany"}
                    {" · "}
                    <span className="text-[#0a66c2] font-medium cursor-pointer hover:underline">
                      Контактные сведения
                    </span>
                  </p>
                  <p className="text-sm text-[#0a66c2] font-semibold cursor-pointer hover:underline mt-0.5">
                    27 контактов
                  </p>

                  {/* Company + edu — mobile only (below connections) */}
                  {(companyName || true) && (
                    <div className="sm:hidden flex flex-col gap-2.5 mt-3">
                      {companyName && (
                        <OrgRow initials={companyInitials} name={companyName} />
                      )}
                      <OrgRow
                        initials="DMU"
                        name="De Montfort University"
                        round
                      />
                    </div>
                  )}

                  {/* Buttons — mobile: fewer items */}
                  <div className="flex sm:hidden items-center gap-2 mt-4">
                    <button className="flex-1 py-1.75 bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white text-sm font-semibold rounded-full">
                      Интересует
                    </button>
                    <button className="w-9 h-9 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center text-[18px] font-bold leading-none pb-1">
                      ···
                    </button>
                  </div>

                  {/* Buttons — desktop: all items */}
                  <div className="hidden sm:flex items-center gap-2 mt-4 flex-wrap">
                    <button className="px-4 py-1.75 bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white text-sm font-semibold rounded-full">
                      Интересует
                    </button>
                    <button className="px-4 py-1.75 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors text-sm font-semibold rounded-full">
                      Добавить раздел
                    </button>
                    <button className="px-4 py-1.75 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors text-sm font-semibold rounded-full">
                      Улучшить профиль
                    </button>
                    <button className="w-9 h-9 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center text-[18px] font-bold leading-none pb-1">
                      ···
                    </button>
                  </div>
                </div>
              </div>

              {/* Open to Work + Services promo */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-5">
                <div
                  className="flex-1 rounded-lg p-3 sm:p-4 flex items-start justify-between"
                  style={{
                    background: "#edf3f8",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[rgba(0,0,0,0.9)]">
                      В поиске работы
                    </p>
                    <p className="text-sm text-[rgba(0,0,0,0.55)] mt-0.5 truncate">
                      Должности «{roleTitle}…»
                    </p>
                    <button className="text-sm text-[#0a66c2] font-semibold mt-1 hover:underline">
                      Показать сведения
                    </button>
                  </div>
                  <button className="shrink-0 ml-2 mt-0.5 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.7)]">
                    <HiPencilSquare size={15} />
                  </button>
                </div>

                <div
                  className="flex-1 rounded-lg p-3 sm:p-4 flex items-start justify-between bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="min-w-0">
                    <p className="text-sm text-[rgba(0,0,0,0.6)] leading-snug">
                      Продемонстрируйте свои услуги в виде раздела в профиле,
                      чтобы вашу компанию можно было легко найти.
                    </p>
                    <button className="text-sm text-[#0a66c2] font-semibold mt-1 hover:underline">
                      Добавить услуги
                    </button>
                  </div>
                  <button className="shrink-0 ml-2 mt-0.5 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.7)]">
                    <HiXMark size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* ── About ── */}
          <Card className="p-4 sm:p-5">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-[18px] font-semibold text-[rgba(0,0,0,0.9)]">
                О себе
              </h2>
              <button className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                <HiPencilSquare size={18} />
              </button>
            </div>
            <CopyCard
              text={profile.about}
              onBlurClick={() => onBlurClick("about")}
              visibleCharCount={80}
              isBlurred
              variant="light"
            />
          </Card>

          {/* ── Experience ── */}
          {profile.workExperiences.length > 0 && (
            <Card className="p-4 sm:p-5">
              <SectionHeader title="Опыт работы" />
              <div className="space-y-5">
                {profile.workExperiences.map((exp, i) => (
                  <WorkItem
                    key={i}
                    item={exp}
                    sectionKey={`work-${i}`}
                    onBlurClick={onBlurClick}
                  />
                ))}
              </div>
            </Card>
          )}

          {/* ── Projects ── */}
          {profile.projects.length > 0 && (
            <Card className="p-4 sm:p-5">
              <SectionHeader title="Проекты" />
              <div className="space-y-5">
                {profile.projects.map((proj, i) => (
                  <WorkItem
                    key={i}
                    item={proj}
                    sectionKey={`project-${i}`}
                    onBlurClick={onBlurClick}
                  />
                ))}
              </div>
            </Card>
          )}

          {/* ── Skills ── */}
          {profile.skills.length > 0 && (
            <Card className="p-4 sm:p-5">
              <SectionHeader title="Навыки" />
              <div className="space-y-3 mb-4">
                {profile.skills.slice(0, 3).map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[rgba(0,0,0,0.35)]" />
                    <span className="text-sm font-semibold text-[rgba(0,0,0,0.9)]">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
              <CopyCard
                text={profile.skills.join(" · ")}
                onBlurClick={() => onBlurClick("skills")}
                visibleCharCount={profile.skills.slice(0, 3).join(" · ").length}
                isBlurred
                variant="light"
              />
            </Card>
          )}
        </div>

        {/* ════ RIGHT SIDEBAR ════ */}
        <div className="w-full lg:w-64 lg:shrink-0 space-y-3">
          <Card className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)]">
                Язык профиля
              </h3>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                <HiPencilSquare size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#057642] text-white text-sm font-semibold rounded-full">
                Английский
              </button>
              <button className="px-3 py-1 border border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.65)] text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
                Русский
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)] leading-snug">
                Общедоступный
                <br />
                профиль и URL-адрес
              </h3>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 shrink-0 flex items-center justify-center text-[rgba(0,0,0,0.55)] transition-colors">
                <HiPencilSquare size={16} />
              </button>
            </div>
            <p className="text-sm text-[rgba(0,0,0,0.55)] break-all leading-snug">
              www.linkedin.com/in/john-doe-b9991125b
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
