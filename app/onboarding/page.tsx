import type { Metadata } from "next";
import OnboardingWizard from "../../components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Создать LinkedIn профиль для IT за рубежом | LinkedHire",
  description:
    "Заполните анкету и получите оптимизированный LinkedIn профиль для поиска IT-работы в США, Германии и Европе.",
  alternates: { canonical: "/onboarding" },
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
