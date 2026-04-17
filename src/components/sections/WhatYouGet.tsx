import { PhoneCall, Inbox, Database } from "lucide-react";

const items = [
  {
    icon: PhoneCall,
    title: "AI Calling Agent",
    desc: "Calls, follows up, and books meetings automatically — without a human lifting a finger.",
  },
  {
    icon: Inbox,
    title: "Lead Capture + Routing",
    desc: "Instantly responds to new leads and routes them to the right place in under 60 seconds.",
  },
  {
    icon: Database,
    title: "Backend Automation",
    desc: "CRMs, sheets, and internal systems updated automatically — no manual data entry, ever.",
  },
];

const WhatYouGet = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
            What You Actually Get
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Three systems. One outcome: <span className="gradient-text">more booked meetings.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-card border border-border/60 p-8 hover:border-primary-glow/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_hsl(270_80%_50%/0.35)] transition-all"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <it.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
