"use client";

import { useState } from "react";
import Link from "next/link";
import NavItem from "@/components/profile/NavItem";
import EmailRegistrationModal from "@/components/ui/EmailRegistrationModal";
import { HiClipboard, HiCheck } from "react-icons/hi2";

type Props = {
   profileId?: string;
   hasEmail?: boolean;
};

export default function ProfileHeader({ profileId, hasEmail }: Props) {
   const [copied, setCopied] = useState(false);
   const [regModalOpen, setRegModalOpen] = useState(false);

   const handleCopy = async () => {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <>
         <header
            className="bg-white fixed top-0 left-0 w-full z-30"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}
         >
            {/* Info strip */}
            <div className="bg-[#EBF3FF] border-b border-[#c2d8f0]">
               <div className="max-w-282 mx-auto px-3 sm:px-4 py-1.5 sm:py-0 sm:h-9 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                  <p className="hidden sm:block text-[11px] sm:text-[12px] text-[rgba(0,0,0,0.6)] shrink-0 leading-tight">
                     <span className="hidden sm:inline">Эта страница — аналог вашего профиля в LinkedIn. </span>
                     Сохраните ссылку:
                  </p>
                  <button
                     onClick={handleCopy}
                     className="flex items-center gap-1.5 min-w-0 w-full sm:flex-1 sm:max-w-xs bg-white border border-[#c2d8f0] hover:border-[#0a66c2] rounded px-2.5 py-1 text-[11px] text-[#0a66c2] font-medium transition-colors"
                  >
                     {copied ? <HiCheck size={12} className="text-green-500 shrink-0" /> : <HiClipboard size={12} className="shrink-0" />}
                     <span className="truncate">{typeof window !== "undefined" ? window.location.href : ""}</span>
                  </button>

                  {profileId && !hasEmail && (
                     <button
                        onClick={() => setRegModalOpen(true)}
                        className="shrink-0 text-[11px] sm:text-[12px] text-[#0a66c2] hover:underline whitespace-nowrap cursor-pointer"
                     >
                        или <span className="font-semibold">зарегистрируйтесь</span>, чтобы профиль всегда был под рукой
                     </button>
                  )}
               </div>
            </div>

            <div className="max-w-282 mx-auto px-3 sm:px-4 flex items-center gap-1 h-13">
               <Link href="/" className="flex items-center gap-2 mr-1 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
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
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.45)">
                     <path d="M21.7 20.3l-5.4-5.4A8 8 0 1010 18a8 8 0 004.9-1.7l5.4 5.4 1.4-1.4zM4 10a6 6 0 1112 0A6 6 0 014 10z" />
                  </svg>
                  <span className="text-sm text-[rgba(0,0,0,0.38)]">Поиск</span>
               </div>

               <nav className="flex items-center ml-auto">
                  <NavItem
                     label="Главная"
                     className="hidden sm:block"
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M23 9.36L12.56 2.31a1 1 0 00-1.12 0L1 9.36v1.06h2.09v9.79A1.85 1.85 0 005 22h5v-5h4v5h5a1.85 1.85 0 001.85-1.85v-9.73H23z" />
                        </svg>
                     }
                  />
                  <NavItem
                     className="hidden sm:block"
                     label="Сеть"
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6zm7 4h-2v-1a5 5 0 00-10 0v1H5v-1a7 7 0 0114 0v1z" />
                        </svg>
                     }
                  />
                  <NavItem
                     className="hidden sm:block"
                     label="Вакансии"
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M9 2v2H4a2 2 0 00-2 2v13a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-5V2H9zm0 2h6v1H9V4zM4 8h16v11H4V8zm3 2v2h10v-2H7zm0 4v2h7v-2H7z" />
                        </svg>
                     }
                  />
                  <NavItem
                     label="Сообщения"
                     badge={3}
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M2 3h20v14H13.41L8 21.41V17H2V3zm2 2v10h6v2.59L14.59 15H20V5H4z" />
                        </svg>
                     }
                  />
                  <NavItem
                     label="Уведомления"
                     badge={2}
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M20 18H4v-1l2-2V9a6 6 0 014-5.66V3a2 2 0 014 0v.34A6 6 0 0118 9v6l2 2v1zm-8 4a2 2 0 002-2h-4a2 2 0 002 2z" />
                        </svg>
                     }
                  />
                  <NavItem
                     active
                     label="Профиль"
                     icon={
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                           <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6zm0 4c-4 0-7 1.79-7 4v1h14v-1c0-2.21-3-4-7-4z" />
                        </svg>
                     }
                  />
               </nav>
            </div>
         </header>

         {profileId && !hasEmail && (
            <EmailRegistrationModal
               isOpen={regModalOpen}
               onClose={() => setRegModalOpen(false)}
               profileId={profileId}
            />
         )}
      </>
   );
}
