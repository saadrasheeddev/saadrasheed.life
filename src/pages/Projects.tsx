import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

// [REPLACE WITH REAL PROJECTS]
const projects = [
  {
    title: "AI Calling Agent for Real Estate Agency",
    problem: "Half of inbound leads went unanswered after hours and on weekends.",
    solution:
      "Deployed an AI voice agent that calls every new lead in under 60 seconds, qualifies intent, and books a viewing into the agent's calendar.",
    result: "+32% more booked calls in 14 days. Saved 22 hrs/week.",
    tags: ["Vapi", "GPT-4", "GoHighLevel", "Calendly"],
    gradient: "from-purple-500/30 via-fuchsia-500/20 to-blue-500/20",
  },
  {
    title: "Lead Follow-Up Engine for B2B Agency",
    problem: "Reps were manually chasing 200+ leads/month and missing half.",
    solution:
      "Built an AI follow-up sequence that calls, emails and DMs every lead on a multi-touch cadence — escalating only hot ones to humans.",
    result: "+47% show-rate. $11k MRR added in 6 weeks.",
    tags: ["Make.com", "OpenAI", "HubSpot", "Twilio"],
    gradient: "from-blue-500/30 via-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Automated Client Onboarding for SaaS",
    problem: "Onboarding new accounts took 4 hours of manual setup each.",
    solution:
      "n8n flow that provisions Slack, Notion and Drive + sends a personalized welcome sequence — triggered the moment Stripe fires.",
    result: "Onboarding time cut from 4 hrs → 6 minutes.",
    tags: ["n8n", "Stripe", "Notion", "Slack"],
    gradient: "from-pink-500/30 via-rose-500/20 to-orange-500/20",
  },
  {
    title: "Internal AI Knowledge Assistant",
    problem: "Team kept asking the same SOP questions in Slack every day.",
    solution:
      "Custom GPT trained on Notion docs + connected to Slack as an internal /ask bot. Answers instantly, with sources.",
    result: "Saved 8 hrs/week of repeated answers across the team.",
    tags: ["OpenAI", "Notion", "Slack", "Pinecone"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-purple-500/20",
  },
];

const Projects = () => {
  useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-36">
        <section className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 fade-in-up">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
              Projects
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Work I've <span className="gradient-text">Done</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real AI calling agents and automations. Real revenue results. Zero fluff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl bg-card border border-border/60 overflow-hidden hover:border-primary-glow/40 transition-all fade-in-up"
              >
                {/* Placeholder screenshot area */}
                <div
                  className={`relative aspect-[16/9] bg-gradient-to-br ${p.gradient} border-b border-border/60 overflow-hidden`}
                >
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-xl bg-background/40 backdrop-blur border border-border/60 px-5 py-3 text-sm text-muted-foreground">
                      {/* [REPLACE WITH REAL UI MOCKUP/SCREENSHOT] */}
                      UI Mockup
                    </div>
                  </div>
                </div>

                <div className="p-7 lg:p-8 space-y-5">
                  <h2 className="text-xl md:text-2xl font-bold leading-snug">
                    {p.title}
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-primary-glow font-semibold">Problem: </span>
                      <span className="text-muted-foreground">{p.problem}</span>
                    </div>
                    <div>
                      <span className="text-primary-glow font-semibold">Solution: </span>
                      <span className="text-muted-foreground">{p.solution}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
                    <div className="text-xs uppercase tracking-wider text-primary-glow mb-1">
                      Result
                    </div>
                    <div className="font-bold text-foreground">{p.result}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

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
                  Want results like these?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Let's map your AI calling system in a free 30-minute call.
                </p>
                <Button variant="hero" size="xl" className="w-full sm:w-auto whitespace-normal h-auto min-h-14 py-3 px-5 sm:px-9 text-sm sm:text-base text-center leading-tight" asChild>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
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
