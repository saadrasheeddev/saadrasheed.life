import { CalendarCheck, Map, Rocket } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Book your free strategy call",
    desc: "30 minutes. We diagnose your biggest time-drains and pick the workflows with the highest ROI.",
  },
  {
    icon: Map,
    number: "02",
    title: "I map your exact automations",
    desc: "You get a clear plan: tools, triggers, outcomes, timeline. No jargon. No guesswork.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "You get your time back",
    desc: "I build, test and deploy. Your systems run 24/7. You focus on the work only you can do.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold">From overloaded to automated in 3 steps.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative">
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
