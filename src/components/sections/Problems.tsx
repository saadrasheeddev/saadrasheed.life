import { AlertTriangle, TrendingDown, HelpCircle, Moon } from "lucide-react";

const problems = [
  {
    icon: Moon,
    title: "Inbound listing inquiries die after hours",
    desc: "Leads come in at 9pm from Zillow, Rightmove, Bayut or your website. By morning, they've already toured a property with another agent.",
  },
  {
    icon: AlertTriangle,
    title: "Manual follow-up is killing your day",
    desc: "Hours lost dialing buyers, chasing renters and re-qualifying tire-kickers, taking time away from closing deals and showing properties.",
  },
  {
    icon: TrendingDown,
    title: "You're losing deals to faster agents",
    desc: "Buyers overwhelmingly go with the first agent who responds. If you're not calling in 60 seconds, you're losing commission.",
  },
  {
    icon: HelpCircle,
    title: "Your team can't keep up with lead volume",
    desc: "Paid ads and portals push leads in faster than your agents can call. Hot inquiries sit unattended and go cold within an hour.",
  },
];

const Problems = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Sound familiar, agent?
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Every missed inquiry is a viewing booked with someone else.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
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
