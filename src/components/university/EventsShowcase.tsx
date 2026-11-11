import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Pause,
  Play,
} from "lucide-react";
import { Link } from "./Link";
import data from "../../data/university.json";

const highlights = [
  {
    key: "plexus",
    headline: "Plexus 2025",
    category: "CAMPUS CULTURE",
    description:
      "Six days of campus spirit, cultural performances, and moments that bring our university together.",
    moments: ["Cultural performances", "Student activities", "A shared campus celebration"],
  },
  {
    key: "25th-dr",
    headline: "National Cricket Tournament",
    category: "SPORT & INCLUSION",
    description:
      "The 25th Dr. Shakuntala Misra National Cricket Tournament for visually impaired players celebrates inclusion and sporting spirit.",
    moments: ["Inclusive sport", "National tournament", "Community and team spirit"],
  },
  {
    key: "diwali-utsav",
    headline: "Diwali Utsav 2025",
    category: "CELEBRATIONS AT TSM",
    description:
      "A campus celebration filled with creativity, culture, and the warmth of coming together.",
    moments: ["Campus celebrations", "Cultural activities", "Creativity and togetherness"],
  },
  {
    key: "codecraft",
    headline: "CodeCraft 2.0",
    category: "IDEAS & INNOVATION",
    description:
      "An Engineer’s Day event bringing students and the university community together around technology and new ideas.",
    moments: ["Engineer’s Day", "Technology and ideas", "Student community"],
  },
];
const events = highlights.flatMap((highlight) => {
  const news = data.news.find((item) => item.slug.startsWith(highlight.key));
  return news ? [{ ...news, ...highlight }] : [];
});
type CampusEvent = (typeof events)[number];

function EventPostcard({
  event,
  number,
  active = false,
}: {
  event: CampusEvent;
  number: number;
  active?: boolean;
}) {
  return (
    <article className="event-postcard">
      <span className="event-postcard-number" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <div className="event-postcard-copy">
        <span className="event-postcard-category">{event.category}</span>
        <h3>{event.headline}</h3>
        <p>{event.description}</p>
        <div className="event-postcard-facts">
          <span>
            <CalendarDays size={15} />
            {event.date.replace("'25", "2025")}
          </span>
          <span>
            <MapPin size={15} />
            TSM, Lucknow
          </span>
        </div>
        <ul>
          {event.moments.map((moment, index) => (
            <li key={moment}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {moment}
            </li>
          ))}
        </ul>
        {active ? (
          <Link to={`/news/${event.slug}`} className="text-link event-story-link">
            Explore this event <ArrowUpRight size={17} />
          </Link>
        ) : (
          <span className="event-peek-link">
            Explore this event <ArrowUpRight size={17} />
          </span>
        )}
      </div>
      <div className="event-photo-frame">
        <svg
          className="event-photo-clip"
          viewBox="0 0 50 80"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 0 15 45m17-45 3 45M11 44h28v20H11zM17 44l2-10h12l2 10M17 64v6c0 4 16 4 16 0v-6" />
        </svg>
        <img
          src={`/images/${event.image}`}
          alt={active ? event.title : ""}
          loading="lazy"
          draggable={false}
        />
        <span className="event-photo-caption">
          {event.headline}
          <span>TSM MOMENTS</span>
        </span>
      </div>
    </article>
  );
}

export function EventsShowcase({ archiveAnchor }: { archiveAnchor?: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.25,
    });
    if (section.current) observer.observe(section.current);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || reduced || !inView || !pageVisible || hovered || focused || dragging) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((previous) => (previous + 1) % events.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [index, playing, reduced, inView, pageVisible, hovered, focused, dragging]);
  const current = events[index];
  if (!current) return null;
  function move(delta: number) {
    setDirection(delta > 0 ? 1 : -1);
    setIndex((previous) => (previous + delta + events.length) % events.length);
  }
  function select(next: number) {
    if (next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }
  function swipe(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    setDragging(false);
    if (info.offset.x < -55) move(1);
    else if (info.offset.x > 55) move(-1);
  }
  const previous = events[(index - 1 + events.length) % events.length]!;
  const next = events[(index + 1) % events.length]!;
  const variants = {
    enter: (dir: number) => ({
      x: reduced ? 0 : `${dir * 90}%`,
      rotate: reduced ? 0 : dir * 4,
      opacity: 0,
      scale: reduced ? 1 : 0.96,
    }),
    center: { x: 0, rotate: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: reduced ? 0 : `${dir * -90}%`,
      rotate: reduced ? 0 : dir * -3,
      opacity: 0,
      scale: reduced ? 1 : 0.96,
    }),
  };
  return (
    <section
      ref={section}
      id="events"
      className="events-showcase"
      aria-labelledby="events-showcase-title"
    >
      <div className="container events-showcase-heading">
        <div>
          <span className="eyebrow">THE MOMENTS THAT MAKE US</span>
          <h2 id="events-showcase-title">
            Life at TSM.
            <br />
            <span>Worth remembering.</span>
          </h2>
        </div>
        <div>
          <p>Our people. Our celebrations. Our campus stories.</p>
          {archiveAnchor ? (
            <a href={archiveAnchor} className="text-link">
              Browse all stories <ArrowUpRight size={17} />
            </a>
          ) : (
            <Link to="/news" className="text-link">
              All news & events <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
      </div>
      <div
        className="events-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="College event highlights"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={(event) => {
          if ((event.target as HTMLElement).matches(":focus-visible")) setFocused(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="events-peek events-peek--previous" aria-hidden="true">
          <EventPostcard
            event={previous}
            number={((index - 1 + events.length) % events.length) + 1}
          />
        </div>
        <div className="events-peek events-peek--next" aria-hidden="true">
          <EventPostcard event={next} number={((index + 1) % events.length) + 1} />
        </div>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            className="events-active-card"
            key={current.slug}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0 : 0.52, ease: [0.22, 0.68, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={reduced ? 0 : 0.12}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={swipe}
          >
            <EventPostcard event={current} number={index + 1} active />
          </motion.div>
        </AnimatePresence>
        <button
          className="events-arrow events-arrow--previous"
          aria-label="Previous college event"
          onClick={() => move(-1)}
        >
          <ArrowLeft size={23} />
        </button>
        <button
          className="events-arrow events-arrow--next"
          aria-label="Next college event"
          onClick={() => move(1)}
        >
          <ArrowRight size={23} />
        </button>
      </div>
      <div className="container events-showcase-bottom">
        <span className="events-swipe-hint">A LITTLE LOOK BACK. A LOT TO CELEBRATE.</span>
        <div className="events-controls">
          <div className="events-pagination" aria-label="Choose an event">
            {events.map((event, number) => (
              <button
                key={event.slug}
                aria-label={`Show event ${number + 1}: ${event.headline}`}
                aria-pressed={index === number}
                className={index === number ? "is-active" : ""}
                onClick={() => select(number)}
              >
                {String(number + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          {
            <button
              className="events-autoplay"
              onClick={() => setPlaying((previous) => !previous)}
              aria-label={playing ? "Pause event slideshow" : "Play event slideshow"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
          }
        </div>
        <span className="events-archive-label">FROM THE UNIVERSITY ARCHIVE</span>
      </div>
      <p className="sr-only" aria-live={playing && !focused ? "off" : "polite"} aria-atomic="true">
        Event {index + 1} of {events.length}: {current.title}, {current.date}
      </p>
    </section>
  );
}
