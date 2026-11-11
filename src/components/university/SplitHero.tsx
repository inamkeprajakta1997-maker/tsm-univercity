import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "./Link";

const panels = [
  {
    id: "academics",
    title: "Academics",
    image: "/images/hero-academics-official.webp",
    alt: "A T.S. Mishra University student working in the laboratory",
    position: "62% center",
    description:
      "Explore our schools and discover the academic path that brings your ambitions to life.",
    to: "/academics",
    action: "Explore academics",
  },
  {
    id: "campus-life",
    title: "Campus Life",
    image: "/images/hero-campus-life-official.webp",
    alt: "T.S. Mishra University students playing kabaddi on campus",
    position: "52% center",
    description:
      "A place to learn, connect, and belong. Discover the experiences beyond the classroom.",
    to: "/student-life",
    action: "Discover campus life",
  },
  {
    id: "events",
    title: "Events",
    image: "/images/hero-events-official.webp",
    alt: "T.S. Mishra University students taking part in a face-painting activity",
    position: "center",
    description:
      "Our people, our celebrations, and the moments that make university life memorable.",
    to: "/news",
    action: "View news & events",
  },
] as const;

export function SplitHero() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section
      className="hero split-hero"
      aria-labelledby="split-hero-title"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActive(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActive(null);
      }}
    >
      <div className="split-hero-introduction">
        <span>ROOTED IN VALUES. READY FOR THE WORLD.</span>
        <h1 id="split-hero-title">
          Shape your future.
          <br />
          <span>Inspire the world.</span>
        </h1>
      </div>
      <div className={`split-hero-panels ${active === null ? "" : "has-active-panel"}`}>
        {panels.map((panel, index) => (
          <article
            key={panel.id}
            className={`split-hero-panel ${active === index ? "is-active" : ""}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocusCapture={(event) => {
              if ((event.target as HTMLElement).matches(":focus-visible")) setActive(index);
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                setActive((current) => (current === index ? null : current));
            }}
          >
            <img
              className="split-panel-image"
              src={panel.image}
              alt={panel.alt}
              style={{ objectPosition: panel.position }}
              fetchPriority={index === 0 ? "high" : "auto"}
              draggable={false}
            />
            <div className="split-panel-shade" />
            <button
              className="split-panel-trigger"
              aria-label={`Preview ${panel.title}`}
              aria-expanded={active === index}
              aria-controls={`split-detail-${panel.id}`}
              onClick={() => setActive(index)}
            />
            <span className="split-panel-id" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="split-panel-label" aria-hidden="true">
              {panel.title}
            </span>
            <div
              className="split-panel-details"
              id={`split-detail-${panel.id}`}
              aria-hidden={active !== index}
              inert={active !== index}
            >
              <h2>{panel.title}</h2>
              <p>{panel.description}</p>
              <Link className="split-panel-explore" to={panel.to}>
                {panel.action}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="split-hero-footer">
        <a href="#introduction">
          <ArrowDown size={16} />
          <span>SCROLL TO DISCOVER</span>
        </a>
        <span>LUCKNOW, INDIA · A WORLD OF POSSIBILITIES</span>
      </div>
    </section>
  );
}
