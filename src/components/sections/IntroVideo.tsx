const IntroVideo = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
            Meet Saad & See How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Watch this <span className="gradient-text">90-second intro</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 bg-card shadow-[0_30px_80px_-30px_hsl(270_80%_50%/0.4)]">
            <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative aspect-video bg-black">
              {/* [REPLACE WITH REAL INTRO VIDEO URL] */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/_iSWMVSTfo0?si=D9ZdDXrD0rP46QBS"
                title="Meet Saad — 90-second intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-center text-sm sm:text-base text-muted-foreground leading-relaxed mt-6 sm:mt-8 max-w-2xl mx-auto px-2">
            Hi, I'm Saad Rasheed. In this quick video I show you exactly how my AI agents
            book appointments on autopilot.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroVideo;
