import { CalendarCheck, Map, Rocket } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Book your free call",
    desc: "30 minutes. We pinpoint where leads are leaking and what to automate first.",
  },
  {
    icon: Map,
    number: "02",
    title: "I design your AI calling system",
    desc: "Voice agent, follow-up sequences, calendar + CRM — mapped to your exact pipeline.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Your leads get contacted and booked automatically",
    desc: "The system runs 24/7. Every lead gets called, followed up, and booked — without you.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold">From missed leads to booked meetings in 3 steps.</h2>
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
