import { Inbox, PhoneCall, CheckCircle2, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: Inbox,
    number: "01",
    title: "Lead comes in",
    desc: "From Zillow, Rightmove, Bayut, your website, Facebook ads or Google. Any source, any hour.",
  },
  {
    icon: PhoneCall,
    number: "02",
    title: "AI calls in under 60 seconds",
    desc: "A natural-sounding AI agent calls instantly, introduces your brand, and asks about the property.",
  },
  {
    icon: CheckCircle2,
    number: "03",
    title: "Lead is qualified",
    desc: "Budget, timeline, financing, location, and intent are all captured before a human gets involved.",
  },
  {
    icon: CalendarCheck,
    number: "04",
    title: "Viewing booked into your calendar",
    desc: "Qualified, ready-to-tour leads land directly in your agent's calendar and CRM. You only talk to serious buyers.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold">From inquiry to booked viewing in 4 simple steps.</h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Your agents stop chasing. They just show up to qualified appointments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s) => (
            <div
              key={s.number}
              className="rounded-2xl bg-card border border-border/60 p-7 hover:border-primary-glow/40 transition-all"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">{s.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
