import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "./Link";

export function SplitHero() {
  return (
    <section className="hero cinematic-hero" aria-labelledby="split-hero-title">
      <img
        className="hero-background cinematic-hero-image"
        src="/images/campus-hero.webp"
        alt="Aerial view of the T.S. Mishra University campus in Lucknow"
        fetchPriority="high"
        decoding="async"
      />
      <div className="cinematic-hero-shade" aria-hidden="true" />
      <div className="cinematic-hero-grain" aria-hidden="true" />
      <div className="cinematic-hero-content">
        <span className="cinematic-hero-kicker"><i /> T.S. MISHRA UNIVERSITY <b>·</b> LUCKNOW, INDIA</span>
        <h1 id="split-hero-title">Shaping minds.<br /><em>Building futures.</em></h1>
        <p>
          A multidisciplinary university bringing together healthcare, technology, law,
          management and more—where knowledge grows into meaningful work.
        </p>
        <div className="cinematic-hero-actions">
          <Link to="/programs" className="cinematic-hero-primary">Explore Programs <ArrowUpRight size={17} /></Link>
          <Link to="/admissions/admission-enquiry" className="cinematic-hero-secondary">Apply Now <ArrowUpRight size={17} /></Link>
        </div>
      </div>
      <a className="cinematic-hero-scroll" href="#introduction">
        <span>SCROLL TO DISCOVER</span><ArrowDown size={16} aria-hidden="true" />
      </a>
      <span className="cinematic-hero-index" aria-hidden="true">01 <i>/</i> 08 SCHOOLS</span>
    </section>
  );
}
