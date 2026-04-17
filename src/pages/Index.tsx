import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Stats from "@/components/sections/Stats";
import Problems from "@/components/sections/Problems";
import About from "@/components/sections/About";
import Packages from "@/components/sections/Packages";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LeadMagnet from "@/components/sections/LeadMagnet";
import FinalCTA from "@/components/sections/FinalCTA";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const Index = () => {
  useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Stats />
        <Problems />
        <About />
        <Packages />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <LeadMagnet />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
