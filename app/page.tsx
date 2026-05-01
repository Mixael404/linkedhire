import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
import Hero from "../components/Hero";
import WhatYouGet from "../components/WhatYouGet";
import Problem from "../components/Problem";
import Market from "../components/Market";
import LinkedInBarriers from "../components/LinkedInBarriers";
import Solution from "../components/Solution";
import HowItWorks from "../components/HowItWorks";
import BeforeAfter from "../components/BeforeAfter";
import ForWho from "../components/ForWho";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import AuthErrorToast from "../components/ui/AuthErrorToast";
import { Suspense } from "react";
import 'simplebar-react/dist/simplebar.min.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense><AuthErrorToast /></Suspense>
      <main>
        <Hero />
        <Problem />
        <Solution />
        <WhatYouGet />
        <BeforeAfter />
        <Market />
        <LinkedInBarriers />
        <HowItWorks />
        {/* <ForWho /> */}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
