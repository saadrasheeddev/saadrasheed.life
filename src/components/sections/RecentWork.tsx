import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "AI Voice Agent",
    category: "Lead Conversion",
    desc: "Inbound lead qualification and live calendar booking system.",
    link: "/projects/ai-receptionist"
  },
  {
    title: "Computer Store Call System",
    category: "Inbound Automation",
    desc: "24/7 answering, automatic CRM logging, and two-way SMS follow-up.",
    link: "/projects/inbound-call-system"
  },
  {
    title: "FrontApp to Asana",
    category: "Workflow Automation",
    desc: "Automated task routing and assignment from shared email discussions.",
    link: "/projects/frontapp-asana"
  },
  {
    title: "Multi-Platform SQL Chatbot",
    category: "Business Intelligence",
    desc: "Self-serve data querying via Telegram, Email, and Web interface.",
    link: "/projects/sql-chatbot"
  }
];

const RecentWork = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">Recent Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Systems I've shipped across industries. <span className="gradient-text">Now focused on real estate.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Real AI systems I've built and shipped to production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => (
            <a 
              key={p.title}
              href={p.link}
              className="group block rounded-2xl bg-card border border-border/60 p-6 hover:border-primary-glow/40 hover:shadow-[0_10px_40px_-10px_hsl(270_80%_50%/0.3)] transition-all"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary-glow font-semibold mb-2">
                {p.category}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-glow transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {p.desc}
              </p>
              <div className="text-xs font-semibold flex items-center gap-1 text-foreground/80 group-hover:text-primary-glow transition-colors">
                View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
