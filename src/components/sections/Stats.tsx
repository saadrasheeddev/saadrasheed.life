import { Clock, Workflow, Zap, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Clock, value: "10–20 hrs", label: "Saved per week" },
  { icon: Workflow, value: "50+", label: "Automations deployed" },
  { icon: Zap, value: "< 60 sec", label: "Lead response time" },
  { icon: ShieldCheck, value: "0", label: "Missed follow-ups" },
];

const Stats = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
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
