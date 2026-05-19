import { Clock, Home, Zap, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Zap, value: "< 60 sec", label: "Lead response time" },
  { icon: Home, value: "+32%", label: "More booked viewings" },
  { icon: Clock, value: "20+ hrs", label: "Saved per agent / week" },
  { icon: ShieldCheck, value: "0", label: "Missed leads after hours" },
];

const Stats = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">ROI for Agents</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            One extra deal a month <span className="gradient-text">pays for the system many times over.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-card border border-border/60 p-6 md:p-7 hover:border-primary-glow/40 transition-all"
            >
              <s.icon className="h-5 w-5 text-primary-glow mb-4" />
              <div className="text-2xl md:text-3xl font-bold gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
