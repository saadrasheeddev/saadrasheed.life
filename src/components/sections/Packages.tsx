import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Starter",
    price: "$99",
    cadence: "one-time",
    tagline: "Automation Audit",
    description: "1 workflow reviewed + recorded Loom walkthrough + actionable plan.",
    features: [
      "Full workflow audit (1 process)",
      "Recorded Loom walkthrough",
      "Tool & stack recommendations",
      "Actionable 30-day plan",
      "Async Q&A for 7 days",
    ],
    cta: "Get Started",
    popular: false,
    note: "",
  },
  {
    name: "Appointment Booking System",
    price: "$499",
    cadence: "one-time",
    tagline: "Most Popular",
    description: "Your AI calling agent + lead follow-up engine, built and deployed end-to-end.",
    features: [
      "AI calling agent setup",
      "Lead follow-up automation",
      "Calendar booking integration",
      "Basic CRM sync (HubSpot / Pipedrive / Sheets)",
      "Full handover + Loom walkthroughs",
    ],
    cta: "Get Started",
    popular: true,
    note: "If it doesn't save you time or book meetings, you don't pay.",
  },
  {
    name: "Scale",
    price: "$1,499",
    cadence: "/month",
    tagline: "Full Automation System",
    description: "Ongoing builds, AI agents, monthly support & optimization.",
    features: [
      "Unlimited workflow requests (1 active)",
      "Custom AI agents & assistants",
      "Monthly optimization sprint",
      "Slack support, 24h response",
      "Performance reports each month",
    ],
    cta: "Get Started",
    popular: false,
    note: "Cancel anytime.",
  },
];

const Packages = () => {
  return (
    <section id="packages" className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-glow/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow">
            <span className="h-2 w-2 rounded-full bg-primary-glow animate-pulse" />
            Only 5 new clients accepted this month
          </div>
        </div>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">Offerings</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Pick the system that fits your growth.
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Transparent pricing. No retainers. No fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {packages.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-2xl bg-card border p-7 lg:p-8 flex flex-col transition-all",
                p.popular
                  ? "border-primary-glow/60 shadow-[0_0_60px_-15px_hsl(270_80%_50%/0.4)] md:-translate-y-2"
                  : "border-border/60 hover:border-primary-glow/30"
              )}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl md:text-5xl font-bold">{p.price}</span>
                <span className="text-muted-foreground ml-1 text-sm">{p.cadence}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.description}</p>

              <ul className="space-y-3 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary-glow mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {p.note && (
                <div className="mb-5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-medium text-primary-glow text-center">
                  ✓ {p.note}
                </div>
              )}

              <Button variant={p.popular ? "hero" : "heroOutline"} className="w-full" size="lg" asChild>
                <a href="https://cal.com/saadrasheed/free-strategy-call" target="_blank" rel="noopener noreferrer">
                  {p.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
