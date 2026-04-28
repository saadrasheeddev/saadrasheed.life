import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import saadHeadshot from "@/assets/saad-hero.png";

const heroBullets = [
  "Calls leads instantly after they sign up",
  "Follows up multiple times automatically",
  "Books directly into your calendar",
];

const Hero = () => {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 md:pb-32 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow animate-pulse-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              AI Calling Agents · Built for Founders & Agencies
            </div>

            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold sm:leading-[1.05]">
              AI Calling Agents That{" "}
              <span className="gradient-text">Book Appointments For You 24/7</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              I build AI voice agents that call, follow up, and convert your leads into
              booked meetings — so you never lose opportunities or waste time chasing prospects.
            </p>

            <ul className="space-y-2.5 max-w-xl">
              {heroBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-foreground/90">
                  <span className="mt-1 h-5 w-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary-glow" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="hero" size="xl" className="w-full sm:w-auto whitespace-normal h-auto min-h-14 py-3 px-5 sm:px-9 text-sm sm:text-base text-center leading-tight" asChild>
                <a href="https://cal.com/saadrasheed/free-strategy-call" target="_blank" rel="noopener noreferrer">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto whitespace-normal h-auto min-h-14 py-3 px-5 sm:px-9 text-sm sm:text-base text-center leading-tight" asChild>
                <a href="#lead-magnet">
                  <span className="sm:hidden">Get 5 Free AI Workflows</span>
                  <span className="hidden sm:inline">Get 5 AI Workflows That Save 10+ Hours/Week</span>
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Takes 30 seconds to book · No commitment
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <div>⚡ Leads contacted in &lt; 60 seconds</div>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            <div className="absolute -inset-6 gradient-primary opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card">
              <img
                src={saadHeadshot}
                alt="Saad Rasheed, AI Calling Agents Specialist"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Saad Rasheed</div>
                  <div className="text-xs text-muted-foreground">AI Calling Agents Specialist</div>
                </div>
                <div className="rounded-lg bg-card/80 backdrop-blur border border-border px-3 py-1.5 text-xs">
                  50+ deployed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
