import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const projects = [
  {
    title: "Stop Losing Tasks in Messy Email Threads",
    category: "Operations Automation",
    description:
      "Turn internal email comments into fully categorized, prioritized, and assigned Asana tasks instantly.",
    hook:
      "Tired of client requests falling through the cracks because your team is overwhelmed by their inbox?",
    tags: ["FrontApp", "n8n", "Asana", "Claude AI"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/20",
  },
  {
    title: "A Voice Agent That Never Misses a Call",
    category: "Lead Conversion",
    description:
      "Answers inbound calls, qualifies leads with custom questions, and books confirmed meetings onto your calendar — no human input required.",
    hook:
      "How many high-value clients are you losing simply because no one picked up after hours?",
    tags: ["VAPI", "n8n", "Calendly"],
    gradient: "from-blue-500/30 via-indigo-500/20 to-purple-500/20",
  },
  {
    title: "Log Every Caller & Build Your Marketing Database",
    category: "Customer Database Builder",
    description:
      "A 24/7 AI phone system that answers inbound calls, logs every customer into your CRM, and builds a database ready for future marketing campaigns.",
    hook:
      "What if every person who called your store was automatically saved, ready for your next campaign?",
    tags: ["VAPI", "n8n", "Vtiger CRM", "Telegram"],
    gradient: "from-orange-500/30 via-amber-500/20 to-rose-500/20",
  },
  {
    title: "Talk to Your Database in Plain English",
    category: "Business Intelligence",
    description:
      "Ask questions on Telegram or Slack and get formatted answers, charts, and downloadable Excel reports instantly. No SQL required.",
    hook:
      "Tired of waiting days for a developer just to run a simple data report?",
    tags: ["Supabase", "PostgreSQL", "LLM", "Telegram"],
    gradient: "from-purple-500/30 via-fuchsia-500/20 to-violet-500/20",
  },
  {
    title: "Scale Your Content Without Scaling Your Team",
    category: "Content Automation",
    description:
      "Enter a topic in Google Sheets and instantly generate a full video script, aligned voiceover, and YouTube description in your Drive.",
    hook:
      "How much time are you wasting formatting scripts instead of actually recording content?",
    tags: ["Google Sheets", "Apps Script", "LLM", "Google Drive"],
    gradient: "from-amber-500/30 via-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Detect Contract Risks in Seconds, Not Days",
    category: "Legal Risk Mitigation",
    description:
      "Upload any NDA to surface missing clauses, ambiguous language, and risky terms — complete with suggested rewrites inserted as Word comments.",
    hook:
      "Are you signing agreements blindly because professional legal review takes too long and costs too much?",
    tags: ["Google Forms", "Apps Script", "LLM", "Word API"],
    gradient: "from-emerald-500/30 via-green-500/20 to-teal-500/20",
  },
  {
    title: "Recover Visitors Who Leave Without Booking",
    category: "Revenue Recovery",
    description:
      "Capture visitor emails before they bounce, detect incomplete bookings, and trigger a personalized follow-up sequence automatically.",
    hook:
      "How many potential clients browse your portfolio, love your work, but leave without ever saying hello?",
    tags: ["Zapier", "System.io", "Calendly"],
    gradient: "from-pink-500/30 via-rose-500/20 to-fuchsia-500/20",
  },
  {
    title: "Studio-Quality Photos Without the Photoshoot",
    category: "E-Commerce AI",
    description:
      "Upload clothing flats, pick an AI model, and generate realistic styled product photos instantly — ready for your store.",
    hook:
      "Is expensive studio photography delaying your product launches and eating into your margins?",
    tags: ["Supabase", "Nano Banana AI", "Web Interface"],
    gradient: "from-sky-500/30 via-cyan-500/20 to-blue-500/20",
  },
];

const Projects = () => {
  useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects — AI Automations & Calling Agents | Saad Rasheed</title>
        <meta name="description" content="Real AI automation projects: voice agents, lead recovery, contract review, BI chatbots, content engines and more. See the stack and the outcome." />
        <link rel="canonical" href="https://flow-forge-ai-80.lovable.app/projects" />
        <meta property="og:title" content="Projects — AI Automations & Calling Agents" />
        <meta property="og:description" content="Case studies of AI automations Saad Rasheed has shipped for agencies, founders, and lean teams." />
        <meta property="og:url" content="https://flow-forge-ai-80.lovable.app/projects" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Projects — AI Automations & Calling Agents",
          "url": "https://flow-forge-ai-80.lovable.app/projects",
          "description": "Portfolio of AI calling agents and automation systems built by Saad Rasheed.",
          "hasPart": projects.map((p) => ({
            "@type": "CreativeWork",
            "name": p.title,
            "about": p.category,
            "description": p.description,
          })),
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <section className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 fade-in-up">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
              Projects
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Work I've <span className="gradient-text">Shipped</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real AI systems running in production. Real businesses. Zero fluff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group relative rounded-2xl bg-card border border-border/60 overflow-hidden hover:border-primary-glow/50 hover:shadow-[0_10px_40px_-10px_hsl(270_80%_50%/0.35)] transition-all fade-in-up"
              >
                {/* Accent header */}
                <div
                  className={`relative h-2 bg-gradient-to-r ${p.gradient}`}
                />

                <div className="p-7 lg:p-8 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-primary-glow font-semibold">
                      {p.category}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-snug">
                    {p.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {p.description}
                  </p>

                  <blockquote className="relative rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 mb-4">
                    <span className="absolute -top-2 left-3 text-xs px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-semibold">
                      Consider this
                    </span>
                    <p className="text-sm italic text-foreground mt-1">
                      "{p.hook}"
                    </p>
                  </blockquote>

                  <div className="flex flex-wrap gap-2 pt-1 mb-4">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" 
                    asChild
                  >
                    <a href={`/project-details#s${projects.indexOf(p) + 1}`} className="whitespace-normal h-auto text-center py-2 flex items-center justify-center">
                      <span className="hidden sm:inline">View more details about the project</span>
                      <span className="sm:hidden">View project details</span>
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA banner */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="relative rounded-3xl overflow-hidden border border-primary-glow/30 bg-gradient-to-br from-card to-[hsl(270_30%_10%)] p-10 md:p-16 text-center fade-in-up">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] radial-glow animate-pulse-glow" />
              <div className="relative space-y-6">
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  Want a system like these?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Let's map your AI workflow in a free 30-minute call.
                </p>
                <Button variant="hero" size="xl" className="w-full sm:w-auto whitespace-normal h-auto min-h-14 py-3 px-5 sm:px-9 text-sm sm:text-base text-center leading-tight" asChild>
                  <a href="https://cal.com/saadrasheed/free-strategy-call" target="_blank" rel="noopener noreferrer">
                    Book a Free Strategy Call
                    <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">Takes 30 seconds to book · No commitment</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
