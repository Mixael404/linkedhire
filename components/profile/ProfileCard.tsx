import { HiPencilSquare } from "react-icons/hi2";
import Card from "@/components/profile/Card";
import CopyCard from "@/components/ui/CopyCard";
import OrgRow from "@/components/profile/OrgRow";
import styles from "@/app/profile/[profileId]/profile.module.css";
import { padWithFakeWords } from "@/lib/padWithFakeWords";

type Props = {
   headline: string;
   targetCountry?: string | null;
   companyName: string;
   companyInitials: string;
   roleTitle: string;
   onBlurClick: (section: string) => void;
   is_purchased: boolean;
};

export default function ProfileCard({
   headline,
   targetCountry,
   companyName,
   companyInitials,
   roleTitle,
   onBlurClick,
   is_purchased,
}: Props) {
   return (
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
               <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-nowrap justify-between">
                     <div>
                        <div className="flex items-start gap-2 flex-wrap">
                           <h1 className="text-[18px] sm:text-[20px] font-semibold text-[rgba(0,0,0,0.9)] leading-tight">
                              John Doe
                           </h1>
                           <button className="flex items-center gap-0.75 mt-0.5 px-2 py-0.75 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[11px] font-semibold hover:bg-[#0a66c2]/5 transition-colors whitespace-nowrap">
                              <svg viewBox="0 0 20 20" width="11" height="11" fill="currentColor">
                                 <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm3.46 6.36l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 111.06 1.06z" />
                              </svg>
                              <span className="hidden sm:inline">Добавьте эмблему подтверждения</span>
                              <span className="sm:hidden">Подтверждение</span>
                           </button>
                        </div>

                        <div className="mt-2 flex items-center gap-2 flex-nowrap max-w-4/5">
                           <CopyCard
                              text={is_purchased ? headline : padWithFakeWords(headline, 90)}
                              onBlurClick={() => onBlurClick("headline")}
                              visibleCharCount={headline.length}
                              isBlurred={!is_purchased}
                              variant="light"
                           />
                        </div>
                     </div>

                     {/* Company + edu — desktop */}
                     <div className="hidden sm:flex flex-col gap-2.5 pt-2 w-47 shrink-0 mr-2">
                        {companyName && (
                           <OrgRow initials={companyInitials} name={companyName} />
                        )}
                        <OrgRow initials="YEO" name="Your education organization" round small />
                     </div>
                  </div>

                  <p className="text-sm text-[rgba(0,0,0,0.6)] mt-2">
                     {targetCountry ?? "Germany"}
                     {" · "}
                     <span className="text-[#0a66c2] font-medium cursor-pointer hover:underline">
                        Контактные сведения
                     </span>
                  </p>
                  <p className="text-sm text-[#0a66c2] font-semibold cursor-pointer hover:underline mt-0.5">
                     Более 500 контактов
                  </p>

                  {/* Company + edu — mobile */}
                  {(companyName || true) && (
                     <div className="sm:hidden flex flex-col gap-2.5 mt-3">
                        {companyName && (
                           <OrgRow initials={companyInitials} name={companyName} />
                        )}
                        <OrgRow initials="YEO" name="Your education organization" round small />
                     </div>
                  )}

                  {/* Buttons — mobile */}
                  <div className="flex sm:hidden items-center gap-2 mt-4">
                     <button className="flex-1 py-1.75 bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white text-sm font-semibold rounded-full">
                        Интересует
                     </button>
                     <button className="w-9 h-9 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center text-[18px] font-bold leading-none pb-1">
                        ···
                     </button>
                  </div>

                  {/* Buttons — desktop */}
                  <div className="hidden sm:flex items-center gap-2 mt-4 flex-wrap">
                     <button className="px-4 py-1.75 bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white text-sm font-semibold rounded-full">
                        Интересует
                     </button>
                     <button className="px-4 py-1.75 border border-[rgba(0,0,0,0.5)] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 transition-colors text-sm font-semibold rounded-full">
                        Добавить раздел
                     </button>
                  </div>
               </div>
            </div>

            {/* Open to Work promo */}
            <div className="flex flex-col w-2/4 sm:flex-row gap-3 mt-4 sm:mt-5">
               <div
                  className="flex-1 rounded-lg p-3 sm:p-4 flex items-start justify-between"
                  style={{ background: "#edf3f8", border: "1px solid rgba(0,0,0,0.08)" }}
               >
                  <div className="min-w-0">
                     <p className="text-sm font-semibold text-[rgba(0,0,0,0.9)]">В поиске работы</p>
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
            </div>
         </div>
      </Card>
   );
}
