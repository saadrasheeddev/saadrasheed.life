import saadHeadshot from "@/assets/saad-headshot.jpg";

const About = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">About</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              I build the systems<br />that replace human follow-up.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm Saad — a specialist in AI calling agents and revenue automation.
                I work with busy founders and agencies who are tired of losing leads
                because no one followed up in time.
              </p>
              <p>
                Every system I build is tied to one thing: more booked meetings, less
                manual work, and revenue that no longer depends on you being online.
              </p>
              <p className="text-foreground font-medium pt-2">
                I don't build AI demos — I build systems that directly impact your revenue.
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
