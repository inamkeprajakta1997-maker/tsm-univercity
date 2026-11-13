import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Building2, GraduationCap, Megaphone, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "./Link";

const highlights = [
  { icon: BookOpen, title: "25+", detail: "Programmes" },
  { icon: Users, title: "Expert", detail: "Faculty" },
  { icon: Building2, title: "Modern", detail: "Campus" },
  { icon: Trophy, title: "Academic", detail: "Excellence" },
];

export function SplitHero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const story = document.querySelector<HTMLElement>(".tsm-scroll-story");
        if (!story) return;
        const distance = Math.max(1, story.offsetHeight - window.innerHeight);
        setScrollProgress(Math.min(1, Math.max(0, -story.getBoundingClientRect().top / distance)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="tsm-scroll-story" style={{ "--hero-scroll-progress": scrollProgress } as React.CSSProperties}>
      <section className={`hero tsm-reference-hero${scrollProgress >= 0.08 ? " has-banner" : ""}`} aria-labelledby="split-hero-title">
      <div className="tsm-scroll-intro" aria-hidden={scrollProgress >= 0.08}>
        <span className="tsm-intro-mark">T.S. MISHRA UNIVERSITY <i>·</i> LUCKNOW</span>
        <div className="tsm-intro-orbit" aria-hidden="true"><span /><span /><b>TSM</b></div>
        <p>One campus.<br /><strong>Endless possibilities.</strong></p>
        <span className="tsm-intro-hint"><ArrowDown size={15} /> Scroll to discover</span>
      </div>
      <div className="tsm-scroll-banner" aria-hidden={scrollProgress < 0.08}>
      <div className="tsm-reference-photo" aria-hidden="true" />
      <div className="tsm-reference-shade" aria-hidden="true" />
      <div className="tsm-reference-content">
        <span className="tsm-admission-pill"><GraduationCap size={22} /> Admissions <strong>Open 2026–27</strong></span>
        <h1 id="split-hero-title">Build your future.<br /><em>Make your mark.</em></h1>
        <p>Discover possibilities, build knowledge and shape a future without limits at T.S. Mishra University.</p>
        <div className="tsm-reference-ctas">
          <Link to="/admissions/admission-enquiry" className="tsm-reference-apply">Apply now <ArrowRight size={19} /></Link>
          <a href="#programmes" className="tsm-reference-explore"><span aria-hidden="true">▶</span> Explore programs</a>
        </div>
      </div>
      <aside className="tsm-admission-note">
        <span className="tsm-note-icon"><Megaphone size={21} /></span>
        <div><strong>Admissions<br />Open 2026–27</strong><p>Your journey to excellence starts here!</p></div>
        <Link to="/admissions/admission-enquiry" aria-label="Explore admissions"><ArrowUpRight size={17} /></Link>
      </aside>
      <div className="tsm-hero-highlights" aria-label="University highlights">
        {highlights.map(({ icon: Icon, title, detail }) => (
          <div className="tsm-hero-highlight" key={title}><Icon size={26} aria-hidden="true" /><span><strong>{title}</strong><small>{detail}</small></span></div>
        ))}
      </div>
      <a className="tsm-reference-scroll" href="#introduction"><ArrowDown size={16} /> Scroll down</a>
      </div>
    </section>
    </div>
  );
}
