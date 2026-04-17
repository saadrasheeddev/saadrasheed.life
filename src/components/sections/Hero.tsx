import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import saadHeadshot from "@/assets/saad-headshot.jpg";

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow animate-pulse-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              AI Automations Specialist · Pakistan
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05]">
              I Automate the Work That's{" "}
              <span className="gradient-text">Draining Your Business</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Done-for-you AI workflows for founders and lean teams who want to save
              10–20 hours every week and scale without hiring.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="hero" size="xl" asChild>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#lead-magnet">Get My Free 5 AI Workflows Checklist</a>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Available for new projects
              </div>
              <div>⚡ 7-day delivery guarantee</div>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            <div className="absolute -inset-6 gradient-primary opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card">
              <img
                src={saadHeadshot}
                alt="Saad Rasheed, AI Automations Specialist"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Saad Rasheed</div>
                  <div className="text-xs text-muted-foreground">AI Workflow Architect</div>
                </div>
                <div className="rounded-lg bg-card/80 backdrop-blur border border-border px-3 py-1.5 text-xs">
                  50+ workflows
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
