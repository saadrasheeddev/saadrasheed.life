import { AlertTriangle, TrendingDown, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Leads come in… but no one follows up fast enough",
    desc: "You see the notifications. You promise to call back. By the time you do, they've already booked with someone else.",
  },
  {
    icon: TrendingDown,
    title: "You're manually calling or messaging every prospect",
    desc: "Your day is a treadmill of dials, DMs and reminders — instead of closing, building or growing.",
  },
  {
    icon: HelpCircle,
    title: "Hot opportunities go cold because of delays",
    desc: "A 5-minute response wins. A 5-hour one loses. Without a system, you're losing revenue you'll never see.",
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
