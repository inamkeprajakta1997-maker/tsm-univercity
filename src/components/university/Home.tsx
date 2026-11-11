import { CampusGallery } from "./CampusGallery";
import { SectionTitle, SchoolGrid } from "./Collections";
import { EventsShowcase } from "./EventsShowcase";
import { Link } from "./Link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Globe2,
  HeartPulse,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { Shell, ButtonLink } from "./Layout";
import { MotionProvider } from "./Motion";
import { SplitHero } from "./SplitHero";
import { OpeningIntro } from "./OpeningIntro";
import { AdmissionsPopup } from "./AdmissionsPopup";
import university from "../../data/university.json";
function Testimonials() {
  const testimonials = [
    { name: "Shefali Awasthi", course: "Student · 2024 batch", topic: "LIBRARY & STUDY", image: "campus-gallery-library.webp", alt: "Students studying in the T.S. Mishra University library", summary: "She values the quiet library, useful book collection and comfortable spaces to study, especially near exams." },
    { name: "Tanisha Gupta", course: "Student · 2024 batch", topic: "STUDENT EXPERIENCE", image: "hero-academics-official.webp", alt: "A student carrying out laboratory work at T.S. Mishra University", summary: "She appreciates the faculty support and a curriculum shaped around ethical, compassionate care." },
    { name: "Avyay Sagar Sharma", course: "Student · 2024 batch", topic: "LEARNING SPACES", image: "campus-gallery-classroom.webp", alt: "Students in a lecture theatre at T.S. Mishra University", summary: "He highlights well-lit lecture halls, useful classroom technology and opportunities for hands-on learning." },
    { name: "Vijay Sharma", course: "B.Sc. Nursing · 2017 batch", topic: "NURSING", image: "clinical.jpg", alt: "Clinical training at T.S. Mishra University", summary: "He values the nursing college’s infrastructure, teaching and clinical learning opportunities." },
    { name: "Shivansh Mishra", course: "B.Sc. Nursing · 2023–24 batch", topic: "FACULTY & LEARNING", image: "hero-academics-official.webp", alt: "A student learning in a T.S. Mishra University laboratory", summary: "He appreciates the comprehensive curriculum, faculty investment and focus on compassionate care." },
    { name: "Shreya Victor", course: "B.Sc. Nursing · 2023–24 batch", topic: "CAMPUS & RESEARCH", image: "campus-gallery-classroom.webp", alt: "Learning spaces at T.S. Mishra University", summary: "She highlights dedicated faculty, equipped labs, research opportunities and a vibrant campus." },
    { name: "Rahul Yadav", course: "B.Sc. Nursing · 2023–24 batch", topic: "CLINICAL LEARNING", image: "clinical.jpg", alt: "Clinical learning at T.S. Mishra University", summary: "He describes hands-on clinical experience and faculty encouragement as important parts of his education." },
    { name: "Sonali Singh", course: "B.Sc. Nursing · 2023–24 batch", topic: "CAMPUS COMMUNITY", image: "hero-campus-life-official.webp", alt: "T.S. Mishra University students enjoying campus life", summary: "She values the inclusive environment, faculty support and opportunities to explore interests beyond class." },
    { name: "Dr. Ashish Shahi", course: "MBBS · 2018–19 batch", topic: "GROWTH & CONFIDENCE", image: "clinical.jpg", alt: "Clinical learning at T.S. Mishra University", summary: "He credits faculty and staff with helping him build professional skills, discipline and confidence." },
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", containScroll: false });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 5000);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateIndex = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", updateIndex);
    return () => { emblaApi.off("select", updateIndex); };
  }, [emblaApi]);

  return (
    <section className="testimonial-section student-testimonial-section">
      <div className="container student-testimonial-container">
        <div className="student-testimonial-heading">
          <div>
            <span className="eyebrow">VOICES OF TSM</span>
            <h2>Life at TSM, <em>in their words.</em></h2>
            <p>Experiences shared by students across our campus.</p>
          </div>
          <div className="student-testimonial-controls">
            <span>{String(index + 1).padStart(2, "0")} <i>/</i> {String(testimonials.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Previous student review" onClick={() => emblaApi?.scrollPrev()}><ChevronLeft size={19} /></button>
            <button type="button" aria-label="Next student review" onClick={() => emblaApi?.scrollNext()}><ChevronRight size={19} /></button>
          </div>
        </div>
        <div
          className="student-review-viewport"
          ref={emblaRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          <div className="student-review-track">
            {testimonials.map((review, reviewIndex) => (
              <div className="student-review-slide" key={review.name}>
                <article className="student-review-card student-story-card">
                  <div className="student-story-photo">
                    <img src={`/images/${review.image}`} alt={review.alt} loading={reviewIndex < 2 ? "eager" : "lazy"} />
                    <span>STUDENT STORIES <i>·</i> TSM</span>
                  </div>
                  <div className="student-story-content">
                  <div className="student-review-card-top">
                    <div className="student-review-identity">
                      <span className="student-review-avatar" aria-hidden="true">
                        {review.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                      </span>
                      <div><strong>{review.name}</strong><small>{review.course}</small></div>
                    </div>
                    <img className="student-review-brand" src="/favicon.png" alt="T.S. Mishra University" />
                  </div>
                  <div className="student-review-label">STUDENT FEEDBACK <span>0{reviewIndex + 1}</span></div>
                  <p className="student-review-summary">{review.summary}</p>
                  <div className="student-review-bottom">
                    <div className="student-review-topics"><span>{review.topic}</span></div>
                    <a href="https://www.tsm.edu.in/student-feedback.aspx" target="_blank" rel="noreferrer">
                      VIEW ON TSM <ArrowUpRight size={15} />
                    </a>
                  </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <a className="student-testimonial-source" href="https://www.tsm.edu.in/student-feedback.aspx" target="_blank" rel="noreferrer">
          Read more student feedback <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

function CampusVideoDialog({ onClose }: { onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="campus-video-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="campus-video-dialog" role="dialog" aria-modal="true" aria-labelledby="campus-video-title">
        <div className="campus-video-dialog-heading">
          <div>
            <span>DISCOVER T.S. MISHRA UNIVERSITY</span>
            <h2 id="campus-video-title">Take a look around campus</h2>
            <a href="https://www.youtube.com/watch?v=tbIFtGQFQ1A" target="_blank" rel="noreferrer">
              Open on YouTube <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close campus tour">
            <X size={22} />
          </button>
        </div>
        <div className="campus-video-frame">
          <iframe
            src="https://www.youtube.com/embed/tbIFtGQFQ1A?autoplay=1&rel=0&playsinline=1"
            title="T.S. Mishra University Lucknow Campus Tour 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}

function CampusAmbientVideo() {
  const [playAmbient, setPlayAmbient] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => setPlayAmbient(!reducedMotion.matches);
    updatePlayback();
    reducedMotion.addEventListener("change", updatePlayback);
    return () => reducedMotion.removeEventListener("change", updatePlayback);
  }, []);

  if (!playAmbient) return null;
  return (
    <iframe
      src="https://www.youtube.com/embed/tbIFtGQFQ1A?autoplay=1&mute=1&controls=0&loop=1&playlist=tbIFtGQFQ1A&playsinline=1&disablekb=1&modestbranding=1"
      title="Muted ambient T.S. Mishra University campus tour"
      tabIndex={-1}
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
    />
  );
}

export function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [campusVideoOpen, setCampusVideoOpen] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const closeCampusVideo = useCallback(() => setCampusVideoOpen(false), []);
  return (
    <Shell>
      <OpeningIntro onComplete={handleIntroComplete} />
      <AdmissionsPopup ready={introComplete} />
      <MotionProvider>
        <SplitHero />
        <section className="university-overview section" id="introduction">
          <div className="overview-curtain" aria-hidden="true">
            <span className="overview-curtain-panel overview-curtain-left" />
            <span className="overview-curtain-panel overview-curtain-right" />
            <span className="overview-curtain-seam" />
          </div>
          <div className="container university-overview-layout">
            <div className="university-overview-copy" data-reveal>
              <span className="eyebrow">YOUR UNIVERSITY, AT A GLANCE</span>
              <h2>
                One university.
                <br />
                Many <em>possibilities.</em>
              </h2>
              <p className="lead">
                A place where students build their future—and families can see what comes next.
              </p>
              <p>
                Eight schools bring together 150+ programmes across healthcare,
                technology, management, law, and more. Discover practical learning, campus life,
                and our teaching hospital.
              </p>
              <div className="university-overview-stats" aria-label="T.S. Mishra University at a glance">
                <div>
                  <strong>{String(university.schools.length).padStart(2, "0")}</strong>
                  <span>schools</span>
                </div>
                <div>
                  <strong>150+</strong>
                  <span>programmes</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>teaching hospital</span>
                </div>
              </div>
              <div className="university-overview-links">
                <Link to="/schools" className="overview-audience-link">
                  <span>FOR STUDENTS</span>
                  <strong>Find your programme and school</strong>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
                <Link to="/admissions" className="overview-audience-link">
                  <span>FOR PARENTS & FAMILIES</span>
                  <strong>Explore admissions and university life</strong>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className="university-overview-visual" data-reveal>
              <div className="campus-video-stage">
                <div className="campus-ambient-video" aria-hidden="true">
                  <CampusAmbientVideo />
                  <span />
                </div>
                <button
                  className="campus-video-trigger"
                  type="button"
                  onClick={() => setCampusVideoOpen(true)}
                  aria-label="Play the official T.S. Mishra University campus tour"
                >
                  <img
                    src="https://img.youtube.com/vi/tbIFtGQFQ1A/maxresdefault.jpg"
                    alt=""
                    loading="lazy"
                    data-image-motion
                    onError={(event) => {
                      event.currentTarget.src = "/images/campus-hero.webp";
                    }}
                  />
                  <span className="campus-video-shade" aria-hidden="true" />
                  <span className="campus-video-play" aria-hidden="true">
                    <Play size={28} fill="currentColor" />
                  </span>
                </button>
              </div>
              <figcaption>
                <span>ONE CAMPUS. MANY POSSIBILITIES.</span>
                <strong>T.S. Mishra University · Lucknow</strong>
              </figcaption>
            </figure>
          </div>
        </section>
        {campusVideoOpen && <CampusVideoDialog onClose={closeCampusVideo} />}
        <section className="next-step-band" aria-labelledby="next-step-title">
          <div className="next-step-heading">
            <span className="eyebrow">YOUR AMBITION. OUR COMMITMENT.</span>
            <h2 id="next-step-title">What’s your next step?</h2>
          </div>
          <nav className="next-step-grid" aria-label="Explore T.S. Mishra University">
            <Link to="/schools" className="next-step-card">
              <span className="next-step-number" aria-hidden="true">01</span>
              <span className="next-step-copy">
                <strong>Explore our schools</strong>
                <small>8 schools. Find where you belong.</small>
              </span>
              <ArrowUpRight className="next-step-arrow" size={23} aria-hidden="true" />
            </Link>
            <Link to="/programs" className="next-step-card">
              <span className="next-step-number" aria-hidden="true">02</span>
              <span className="next-step-copy">
                <strong>Find your programme</strong>
                <small>Choose a path for your ambition.</small>
              </span>
              <ArrowUpRight className="next-step-arrow" size={23} aria-hidden="true" />
            </Link>
            <Link to="/admissions/admission-enquiry" className="next-step-card">
              <span className="next-step-number" aria-hidden="true">03</span>
              <span className="next-step-copy">
                <strong>Admissions 2026–27</strong>
                <small>Your next chapter starts here.</small>
              </span>
              <ArrowUpRight className="next-step-arrow" size={23} aria-hidden="true" />
            </Link>
          </nav>
        </section>
        <section className="program-section section">
          <div className="container">
            <SectionTitle
              label="FIND YOUR DIRECTION"
              title="Your passion."
              italic="Your possibilities."
              link="Find your program"
              to="/programs"
            />
            <div className="program-paths">
              {[
                { name: "Diploma", desc: "Build skills. Begin your journey.", no: "01" },
                { name: "Undergraduate", desc: "Find your focus. Expand your world.", no: "02" },
                { name: "Postgraduate", desc: "Deepen your expertise. Go further.", no: "03" },
                { name: "Doctoral", desc: "Ask new questions. Create new knowledge.", no: "04" },
              ].map((p) => (
                <Link
                  to={`/programs/${p.name.toLowerCase()}`}
                  key={p.name}
                  className="program-path"
                  data-step={p.no}
                  data-reveal
                >
                  <span className="program-path-number" aria-hidden="true">{p.no}</span>
                  <div className="program-path-copy">
                    <span className="program-path-stage">
                      {p.no === "01" ? "START HERE" : p.no === "02" ? "BUILD YOUR BASE" : p.no === "03" ? "GO FURTHER" : "PURSUE DISCOVERY"}
                    </span>
                    <h3>
                      {p.name}
                      <br />
                      programs
                    </h3>
                    <p>{p.desc}</p>
                  </div>
                  <span className="program-path-arrow" aria-hidden="true">
                    <ArrowUpRight size={21} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="section container">
          <SectionTitle
            label="MANY DISCIPLINES. ONE VISION."
            title="Find your place."
            italic="Make your mark."
            link="Explore all schools"
            to="/schools"
          />
          <SchoolGrid />
          <div className="school-feature-cards" aria-label="Explore university life">
            <Link to="/schools" className="school-feature-card" data-school-feature-card>
              <img src="/images/hero-academics-official.webp" alt="Students learning at T.S. Mishra University" loading="lazy" />
              <span className="school-feature-number">01 / LEARN</span>
              <div className="school-feature-copy">
                <span>FIND YOUR DIRECTION</span>
                <h3>Explore our schools.</h3>
                <p>Find the discipline and programme that fits your ambition.</p>
                <span className="school-feature-link">Explore all schools <ArrowUpRight size={18} /></span>
              </div>
            </Link>
            <Link to="/student-life" className="school-feature-card" data-school-feature-card>
              <img src="/images/hero-campus-life-official.webp" alt="Students sharing campus life at T.S. Mishra University" loading="lazy" />
              <span className="school-feature-number">02 / BELONG</span>
              <div className="school-feature-copy">
                <span>MAKE THE MOST OF EVERY DAY</span>
                <h3>Discover campus life.</h3>
                <p>Meet your community and find the experiences that make university yours.</p>
                <span className="school-feature-link">Discover student life <ArrowUpRight size={18} /></span>
              </div>
            </Link>
            <Link to="/hospital" className="school-feature-card" data-school-feature-card>
              <img src="/images/clinical.jpg" alt="Clinical training at T.S. Mishra University" loading="lazy" />
              <span className="school-feature-number">03 / CARE</span>
              <div className="school-feature-copy">
                <span>LEARNING THAT MAKES A DIFFERENCE</span>
                <h3>Care in action.</h3>
                <p>Connect healthcare education with real clinical experience and compassionate care.</p>
                <span className="school-feature-link">Explore our hospital <ArrowUpRight size={18} /></span>
              </div>
            </Link>
          </div>
          <div className="schools-bottom">
            <p>
              From healing lives to shaping tomorrow's technology.
              <br />
              Discover all eight schools at TSM.
            </p>
            <ButtonLink to="/schools" outline>
              Discover every school
            </ButtonLink>
          </div>
        </section>
        <section className="why-section section">
          <div className="container">
            <div className="why-showcase-heading" data-reveal>
              <span className="eyebrow">THE TSM DIFFERENCE</span>
              <h2>
                An education that <em>goes beyond.</em>
              </h2>
              <p>Explore the experiences that shape confident, capable graduates.</p>
            </div>
            <div className="why-tile-grid">
              {[
                {
                  icon: BookOpen,
                  title: "Learn with purpose",
                  text: "Explore academic knowledge through practical learning and experienced faculty.",
                  to: "/academics",
                  image: "hero-academics-official.webp",
                  label: "ACADEMICS",
                },
                {
                  icon: Globe2,
                  title: "Connect to opportunity",
                  text: "Discover career counselling, industry exposure, and training and placement support.",
                  to: "/student-life/training-and-placements",
                  image: "labs.jpg",
                  label: "YOUR FUTURE",
                },
                {
                  icon: HeartPulse,
                  title: "Make a real difference",
                  text: "Connect healthcare education with clinical experience at our teaching hospital.",
                  to: "/hospital",
                  image: "clinical.jpg",
                  label: "CARE IN ACTION",
                },
                {
                  icon: Sparkles,
                  title: "Become your best self",
                  text: "Find room to grow through sports, student activities, and campus experiences.",
                  to: "/student-life",
                  image: "events.jpg",
                  label: "CAMPUS LIFE",
                },
              ].map((x, i) => (
                <Link to={x.to} className="why-tile" key={x.title} data-reveal>
                  <div className="why-tile-visual">
                    <img src={`/images/${x.image}`} alt="" loading="lazy" data-image-motion />
                    <span className="why-tile-label">{x.label}</span>
                    <span className="why-tile-count">0{i + 1}</span>
                    <x.icon className="why-tile-icon" strokeWidth={1.5} size={27} aria-hidden="true" />
                  </div>
                  <div className="why-tile-content">
                    <div>
                      <h3>{x.title}</h3>
                      <p>{x.text}</p>
                    </div>
                    <span className="why-tile-arrow" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CampusGallery />
        <section className="section hospital-section container">
          <div className="hospital-photo" data-reveal>
            <img src="/images/clinical.jpg" alt="Clinical learning at TSM" loading="lazy" data-image-motion />
            <span className="image-caption">COMPASSION IN PRACTICE</span>
          </div>
          <div data-reveal>
            <span className="eyebrow">TSM SUPER SPECIALITY HOSPITAL</span>
            <h2>
              Where knowledge
              <br />
              meets <em>humanity.</em>
            </h2>
            <p className="lead">
              Learning to care.
              <br />
              Caring to make a difference.
            </p>
            <p>
              Our teaching hospital brings healthcare and medical education together, connecting
              clinical experience with a commitment to patient care.
            </p>
            <div className="hospital-stats">
              <div>
                <strong data-counter="1200">1,200</strong>
                <span>Hospital beds</span>
              </div>
              <div>
                <strong data-counter="21">21</strong>
                <span>Departments</span>
              </div>
              <div>
                <strong data-counter="150" data-suffix="+">
                  150+
                </strong>
                <span>Doctors</span>
              </div>
            </div>
            <small className="stat-source">Figures published by T.S. Mishra University.</small>
            <Link to="/hospital" className="text-link">
              Explore our hospital <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <section className="section research-section">
          <div className="container">
            <SectionTitle
              label="CURIOSITY HAS A HOME HERE"
              title="Discover. Question."
              italic="Create what's next."
              link="Explore learning resources"
              to="/academics/resources"
            />
            <div className="research-grid">
              {[
                [
                  "Laboratories",
                  "labs.jpg",
                  "laboratories",
                  "Turn theory into practical understanding.",
                ],
                [
                  "Library & learning",
                  "classroom.jpg",
                  "library",
                  "Make room for ideas that move you forward.",
                ],
                [
                  "Clinical experience",
                  "clinical.jpg",
                  "resources",
                  "Bring learning into the real world.",
                ],
              ].map(([title, img, slug, desc]) => (
                <Link to={`/academics/${slug}`} className="research-card" key={title} data-reveal>
                  <img src={"/images/" + img} alt={title + " at TSM"} loading="lazy" data-image-motion />
                  <div>
                    <h3>
                      {title}
                      <ArrowUpRight size={22} />
                    </h3>
                    <p>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <EventsShowcase />
        <Testimonials />
      </MotionProvider>
    </Shell>
  );
}
