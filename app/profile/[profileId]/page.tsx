"use client";

import { startTransition, useCallback, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";
import { getInitials } from "@/lib/initials";
import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import AboutSection from "@/components/profile/AboutSection";
import ExperienceSection from "@/components/profile/ExperienceSection";
import EducationSection from "@/components/profile/EducationSection";
import ProjectsSection from "@/components/profile/ProjectsSection";
import SkillsSection from "@/components/profile/SkillsSection";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import OnboardingModal from "@/components/ui/OnboardingModal";

export default function ProfilePage() {
   const { profileId } = useParams<{ profileId: string }>();
   const searchParams = useSearchParams();
   const [profile, setProfile] = useState<GeneratedProfile | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [modalOpen, setModalOpen] = useState(
      () => searchParams.get("iniciator") === "onboarding"
   );

   useEffect(() => {
      fetch(`/api/profile/${profileId}`)
         .then((res) => {
            if (!res.ok) throw new Error("not found");
            return res.json();
         })
         .then((data) =>
            startTransition(() => {
               setProfile(data);
               setLoading(false);
            }),
         )
         .catch(() => {
            setError(true);
            setLoading(false);
         });
   }, [profileId]);

   const onBlurClick = useCallback((section: string) => {
      console.log(`[CopyCard] blur clicked — section: ${section}`);
   }, []);

   if (loading) {
      return (
         <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-[#e0e0e0] border-t-[#0a66c2] animate-spin" />
         </div>
      );
   }

   if (error || !profile) {
      return (
         <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
            <p className="text-gray-500 text-sm">Профиль не найден</p>
         </div>
      );
   }

   const roleTitle = profile.workExperiences[0]?.position ?? "Developer";
   const companyName = profile.workExperiences[0]?.company ?? "";
   const companyInitials = getInitials(companyName);
	 console.log(profile);

   return (
      <div
         className="min-h-screen bg-[#f3f2ef]"
         style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
         }}
      >
         <ProfileHeader />

         {/* ══ PAGE BODY ══ */}
         <div className="max-w-285 mx-auto px-3 sm:px-4 py-4 pb-12 flex flex-col lg:flex-row gap-5 items-start">
            <div className="w-full min-w-0 space-y-3">
               <ProfileCard
                  headline={profile.headline}
                  targetCountry={profile.target_country}
                  companyName={companyName}
                  companyInitials={companyInitials}
                  roleTitle={roleTitle}
                  onBlurClick={onBlurClick}
                  is_purchased={profile.is_purchased}
               />

               <AboutSection
                  about={profile.about}
                  skills={profile.skills}
                  onBlurClick={onBlurClick}
                  is_purchased={profile.is_purchased}
               />

               <ExperienceSection
                  workExperiences={profile.workExperiences}
                  onBlurClick={onBlurClick}
                  is_purchased={profile.is_purchased}
                  targetCountry={profile.target_country}
               />

               <EducationSection />

               <ProjectsSection
                  projects={profile.projects}
                  onBlurClick={onBlurClick}
                  is_purchased={profile.is_purchased}
                  targetCountry={profile.target_country}
               />

               <SkillsSection
                  skills={profile.skills}
                  onBlurClick={onBlurClick}
                  is_purchased={profile.is_purchased}
               />
            </div>

            <ProfileSidebar />
         </div>

         <OnboardingModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            profileId={profileId}
         />
      </div>
   );
}
