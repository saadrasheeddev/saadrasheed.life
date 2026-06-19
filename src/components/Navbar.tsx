import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoS from "@/assets/logo-s.png";

interface NavbarProps {
  currentPath?: string;
}

const Navbar = ({ currentPath = "/" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors",
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/75 border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center glow-primary p-1.5">
            <img src={logoS.src || logoS} alt="Saad Rasheed logo" width={36} height={36} className="h-full w-full object-contain brightness-0 invert" />
          </div>
          <span className="font-bold text-base md:text-lg tracking-tight">
            Saad Rasheed
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className={linkClass(currentPath === "/")}>
            Home
          </a>
          <a href="/projects" className={linkClass(currentPath === "/projects" || currentPath.startsWith("/projects/"))}>
            Projects
          </a>
        </nav>

        <div className="hidden md:block">
          <Button variant="hero" size="default" asChild>
            <a href="/demo">
              <span className="relative flex h-2.5 w-2.5 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
              </span>
              Live Demo
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-6 flex flex-col gap-5">
            <a href="/" onClick={() => setOpen(false)} className={linkClass(currentPath === "/")}>
              Home
            </a>
            <a href="/projects" onClick={() => setOpen(false)} className={linkClass(currentPath === "/projects" || currentPath.startsWith("/projects/"))}>
              Projects
            </a>
            <Button variant="hero" className="w-full" asChild>
              <a href="/demo">
                <span className="relative flex h-2.5 w-2.5 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
                </span>
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
