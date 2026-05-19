import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import logoS from "@/assets/logo-s.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center p-1.5">
              <img src={logoS} alt="Saad Rasheed logo" width={36} height={36} loading="lazy" className="h-full w-full object-contain brightness-0 invert" />
            </div>
            <span className="font-bold text-lg">Saad Rasheed</span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            {/* <a href="#contact" className="hover:text-foreground transition-colors">Contact</a> */}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/saadrasheeddev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary-glow transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@saadrasheed.life"
              aria-label="Email"
              className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary-glow transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Saad Rasheed. AI Automations done right.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
