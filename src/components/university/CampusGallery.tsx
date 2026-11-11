import { useId, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Link } from "./Link";

const photographs = [
  {
    title: "Ideas begin in the classroom.",
    image: "campus-gallery-classroom.webp",
    alt: "Students in a lecture theatre at T.S. Mishra University",
    height: 275,
    position: "center",
    tags: ["Academics", "Learning"],
    to: "/academics",
  },
  {
    title: "Make room for a new perspective.",
    image: "campus-gallery-library.webp",
    alt: "Students studying in the T.S. Mishra University library",
    height: 420,
    position: "center",
    tags: ["Library", "Discovery"],
    to: "/academics/library",
  },
  {
    title: "Find your team. Find your energy.",
    image: "hero-campus-life-official.webp",
    alt: "T.S. Mishra University students playing kabaddi outdoors",
    height: 315,
    position: "52% center",
    tags: ["Sports", "Wellbeing"],
    to: "/student-life/sports",
  },
  {
    title: "Put your curiosity into practice.",
    image: "hero-academics-official.webp",
    alt: "A T.S. Mishra University student carrying out laboratory work",
    height: 395,
    position: "60% center",
    tags: ["Laboratories", "Hands-on learning"],
    to: "/academics/laboratories",
  },
  {
    title: "The moments you take with you.",
    image: "campus-gallery-celebrations.webp",
    alt: "Students celebrating a farewell event at T.S. Mishra University",
    height: 290,
    position: "center",
    tags: ["Celebrations", "Student life"],
    to: "/student-life/activities-and-events",
  },
  {
    title: "A place to feel at home.",
    image: "campus-gallery-hostel.webp",
    alt: "Hostel buildings and landscaped paths at T.S. Mishra University",
    height: 420,
    position: "center",
    tags: ["Hostel", "Campus living"],
    to: "/student-life/hostel",
  },
  {
    title: "Your voice. Your stage.",
    image: "campus-gallery-creativity.webp",
    alt: "TSM students performing a theatre activity on the campus lawn",
    height: 280,
    position: "center",
    tags: ["Creativity", "Student activities"],
    to: "/student-life/student-organizations",
  },
  {
    title: "A campus full of possibilities.",
    image: "campus-hero.webp",
    alt: "An aerial view of the T.S. Mishra University campus",
    height: 365,
    position: "62% center",
    tags: ["Campus", "Community"],
    to: "/student-life/campus-facilities",
  },
  {
    title: "New faces. New beginnings.",
    image: "story-12.webp",
    alt: "The Deeksharambh student orientation at T.S. Mishra University",
    height: 270,
    position: "center",
    tags: ["Orientation", "Belonging"],
    to: "/news/deeksharambh-2025-welcoming-the-future-of-t-s-mishra-university",
  },
];

// Matching path commands allow a smooth vector edge morph without distorting the photograph.
const resting =
  "M .02 0 C .28 0 .72 0 .98 0 C 1 .02 1 .4 1 .5 C 1 .6 1 .98 .98 1 C .7 1 .3 1 .02 1 C 0 .98 0 .65 0 .5 C 0 .35 0 .02 .02 0 Z";
const waveA =
  "M .02 .01 C .28 .035 .72 -.02 .98 .01 C 1 .08 .87 .29 .95 .5 C 1.025 .68 .96 .94 .98 .99 C .7 1.015 .3 .975 .02 .99 C -.025 .88 .14 .66 .055 .5 C -.025 .32 .03 .1 .02 .01 Z";
const waveB =
  "M .02 .01 C .28 -.02 .72 .025 .98 .01 C 1.02 .17 .91 .37 .96 .5 C 1.025 .68 .87 .9 .98 .99 C .7 .975 .3 1.02 .02 .99 C .06 .87 -.025 .68 .045 .5 C .12 .32 -.015 .11 .02 .01 Z";

function GalleryPhotograph({ photo }: { photo: (typeof photographs)[number] }) {
  const id = "campus-photo-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const waving = hovered && !reduced;
  return (
    <article
      className="campus-gallery-card"
      data-reveal
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <svg
        className="campus-gallery-definitions"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <motion.path
              initial={false}
              animate={{ d: waving ? [resting, waveA, waveB, resting] : resting }}
              transition={{
                duration: waving ? 2.4 : 0.4,
                repeat: waving ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </clipPath>
        </defs>
      </svg>
      <Link to={photo.to} className="campus-gallery-link" aria-label={`Explore: ${photo.title}`}>
        <div
          className="campus-gallery-photo"
          style={
            {
              clipPath: `url(#${id})`,
              "--campus-photo-height": `${photo.height}px`,
            } as CSSProperties
          }
        >
          <img
            src={`/images/${photo.image}`}
            alt={photo.alt}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.position }}
          />
        </div>
        <h3>
          {photo.title}
          <ArrowUpRight size={18} />
        </h3>
      </Link>
    </article>
  );
}

export function CampusGallery() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  return (
    <section
      id="campus-life"
      className="campus-gallery-section"
      aria-labelledby="campus-gallery-title"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const sectionBounds = event.currentTarget.getBoundingClientRect();
        const overCard = (event.target as HTMLElement).closest(".campus-gallery-card") !== null;
        setCursor({
          x: event.clientX - sectionBounds.left,
          y: event.clientY - sectionBounds.top,
          visible: overCard,
        });
      }}
      onPointerLeave={() => setCursor((current) => ({ ...current, visible: false }))}
    >
      <div className="container">
        <div className="campus-gallery-heading" data-reveal>
          <div>
            <span className="eyebrow">LIFE, IN FULL COLOUR</span>
            <h2 id="campus-gallery-title">
              Life at TSM.
              <br />
              <span>Beyond the classroom.</span>
            </h2>
          </div>
          <div>
            <p>A closer look at the spaces, people, and experiences that make our campus.</p>
            <Link to="/student-life" className="text-link">
              Explore campus life <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="campus-masonry-grid">
          {photographs.map((photo) => (
            <GalleryPhotograph key={photo.image} photo={photo} />
          ))}
        </div>
      </div>
      <span
        className={`campus-gallery-cursor${cursor.visible ? " is-visible" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        <GraduationCap size={22} strokeWidth={1.8} />
      </span>
    </section>
  );
}
