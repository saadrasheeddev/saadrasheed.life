import { AlertTriangle, TrendingDown, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "You're stuck doing repetitive manual work every day",
    desc: "Copy-pasting, chasing leads, formatting reports — the same loops, every single week.",
  },
  {
    icon: TrendingDown,
    title: "Slow processes are quietly costing you money",
    desc: "Lost leads, missed follow-ups and human errors silently eat into your revenue.",
  },
  {
    icon: HelpCircle,
    title: "You know AI can help but don't know where to start",
    desc: "Overwhelmed by tools, hype and YouTube tutorials that go nowhere. You need a system.",
  },
];

const Problems = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Sound familiar?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-card border border-border/60 p-7 hover:border-primary-glow/40 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <p.icon className="h-5 w-5 text-primary-glow" />
              </div>
              <h3 className="text-lg font-semibold mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
