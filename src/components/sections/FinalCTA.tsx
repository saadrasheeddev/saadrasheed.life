import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 fade-in-up">
      <div className="container">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-primary-glow/30 bg-gradient-to-br from-card via-card to-[hsl(270_30%_10%)] p-6 sm:p-10 md:p-20 text-center">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow animate-pulse-glow pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5 sm:space-y-6">
            <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              Stop Losing Leads Because<br className="hidden sm:block" />{" "}
              <span className="gradient-text">No One Followed Up.</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Let AI handle your calls and bookings while you focus on closing.
              30-minute strategy call. Walk away with a clear plan — even if we don't work together.
            </p>

            <div className="pt-2 sm:pt-4">
              <Button variant="hero" size="xl" className="w-full sm:w-auto whitespace-normal h-auto min-h-14 py-3 px-5 sm:px-9 text-sm sm:text-base text-center leading-tight" asChild>
                <a href="https://cal.com/saadrasheed/free-strategy-call" target="_blank" rel="noopener noreferrer">
                  <span className="sm:hidden">Book Your Free Call Now</span>
                  <span className="hidden sm:inline">Book Your Free Strategy Call Now</span>
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Takes 30 seconds to book · No commitment · No pitch deck
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
