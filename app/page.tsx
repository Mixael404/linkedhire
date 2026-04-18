import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Market from "../components/Market";
import Solution from "../components/Solution";
import HowItWorks from "../components/HowItWorks";
import BeforeAfter from "../components/BeforeAfter";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Market />
        <Solution />
        <HowItWorks />
        <BeforeAfter />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
