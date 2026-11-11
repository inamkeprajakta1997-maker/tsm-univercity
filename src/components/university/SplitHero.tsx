import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "./Link";

const heroVideoClips = [
  "https://videos.pexels.com/video-files/38684065/16431978_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/8198511/8198511-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/38684062/16431985_1920_1080_25fps.mp4",
];

const heroClipMessages = [
  { lead: "Learn with purpose.", accent: "Lead with compassion." },
  { lead: "Discover your path.", accent: "Create what comes next." },
  { lead: "Grow together.", accent: "Make a difference." },
];

export function SplitHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeClip, setActiveClip] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const timer = window.setInterval(() => {
      setActiveClip((current) => (current + 1) % heroVideoClips.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.querySelector<HTMLElement>(".tcu-inspired-hero");
        if (!hero) return;
        const distance = Math.max(1, hero.offsetHeight);
        setScrollProgress(Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / distance)));
      });
    };
    if (!reducedMotion.matches) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      className="hero cinematic-hero tcu-inspired-hero"
      aria-labelledby="split-hero-title"
      style={{ "--hero-scroll-progress": scrollProgress } as React.CSSProperties}
    >
      <div className="tcu-video-wrap" aria-hidden="true">
        <video
          key={heroVideoClips[activeClip]}
          className="tcu-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/campus-hero.webp"
          onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 1.7; }}
        >
          <source src={heroVideoClips[activeClip]} type="video/mp4" />
        </video>
        <img className="tcu-hero-poster" src="/images/campus-hero.webp" alt="" />
      </div>
      <div className="tcu-hero-video-shade" aria-hidden="true" />
      <div className="tcu-hero-copy" aria-live="polite">
        <span className="tcu-hero-eyebrow">T.S. MISHRA UNIVERSITY · LUCKNOW</span>
        <h1 id="split-hero-title" key={activeClip}>
          {heroClipMessages[activeClip]?.lead}<br />
          <em>{heroClipMessages[activeClip]?.accent}</em>
        </h1>
      </div>
      <a className="cinematic-hero-scroll" href="#introduction" aria-label="Scroll to discover">
        <ArrowDown size={16} aria-hidden="true" />
      </a>
      <nav className="cinematic-hero-actions" aria-label="Quick links">
        <Link to="/admissions/admission-enquiry" className="cinematic-hero-primary">Apply <ArrowUpRight size={17} /></Link>
        <Link to="/contact" className="cinematic-hero-secondary">Visit <ArrowUpRight size={17} /></Link>
        <Link to="/admissions/admission-enquiry" className="cinematic-hero-secondary">Request Info <ArrowUpRight size={17} /></Link>
        <Link to="/programs" className="cinematic-hero-secondary">Explore Programs <ArrowUpRight size={17} /></Link>
      </nav>
    </section>
  );
}
