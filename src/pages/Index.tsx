import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/sections/Hero";
import IntroVideo from "@/components/sections/IntroVideo";
import SocialProof from "@/components/sections/SocialProof";
import Stats from "@/components/sections/Stats";
import Problems from "@/components/sections/Problems";
import WhatYouGet from "@/components/sections/WhatYouGet";
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
        <IntroVideo />
        <Testimonials />
        <WhatYouGet />
        <SocialProof />
        <Stats />
        <Problems />
        <About />
        <Packages />
        <HowItWorks />
        <FAQ />
        <LeadMagnet />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;


// export default function Index() {
//   return <h1>TEST RENDER 2</h1>;
// }