import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Market from "../components/Market";
import LinkedInBarriers from "../components/LinkedInBarriers";
import Solution from "../components/Solution";
import HowItWorks from "../components/HowItWorks";
import BeforeAfter from "../components/BeforeAfter";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main>
        <Hero />
        <Problem />
        <Market />
        <LinkedInBarriers />
        <Solution />
        <HowItWorks />
        <BeforeAfter />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
