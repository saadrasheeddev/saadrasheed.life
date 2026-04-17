import saadHeadshot from "@/assets/saad-headshot.jpg";

const About = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">About</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              I build the systems<br />top operators run on.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm Saad — an AI automations specialist who's spent the last few years
                building workflows that quietly run the back-office of fast-growing founders
                and lean teams across 12 countries.
              </p>
              <p>
                I obsess over the boring work most people hate: the lead routing, the
                onboarding, the reporting, the follow-ups. I turn it into AI-powered systems
                that work 24/7 — accurately, predictably, at a fraction of a hire.
              </p>
              <p className="text-foreground font-medium pt-2">
                I don't just build automations — I build systems that run while you sleep.
              </p>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 w-full max-w-sm">
            <div className="absolute -inset-4 gradient-primary opacity-25 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card">
              <img
                src={saadHeadshot}
                alt="Saad Rasheed"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
