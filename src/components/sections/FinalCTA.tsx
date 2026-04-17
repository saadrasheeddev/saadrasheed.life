import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 fade-in-up">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden border border-primary-glow/30 bg-gradient-to-br from-card via-card to-[hsl(270_30%_10%)] p-10 md:p-20 text-center">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow animate-pulse-glow pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-glow/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow">
              <span className="h-2 w-2 rounded-full bg-primary-glow animate-pulse" />
              Only 5 strategy calls available this week
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Ready to Stop Doing<br />
              <span className="gradient-text">Everything Manually?</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Book your free 30-minute strategy call and walk away with a clear
              automation plan — even if we don't end up working together.
            </p>

            <div className="pt-4">
              <Button variant="hero" size="xl" asChild>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                  Book Your Free Strategy Call Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                No obligation. No pitch deck. Just clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
