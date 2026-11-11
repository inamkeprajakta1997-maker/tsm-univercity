import { CampusGallery } from "./CampusGallery";
import { SectionTitle, SchoolGrid } from "./Collections";
import { EventsShowcase } from "./EventsShowcase";
import { Link } from "./Link";
import { useCallback, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Globe2,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { Shell, ButtonLink } from "./Layout";
import { MotionProvider } from "./Motion";
import { SplitHero } from "./SplitHero";
import { OpeningIntro } from "./OpeningIntro";
import { AdmissionsPopup } from "./AdmissionsPopup";
function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonials = [
    {
      name: "Shefali Awasthi",
      quote: "The library is a reliable place when exams are near.",
      summary:
        "Shefali values the quiet study environment, book collection, and spaces to relax between classes.",
    },
    {
      name: "Tanisha Gupta",
      quote: "I feel privileged to study at T. S MISHRA UNIVERSITY.",
      summary:
        "Tanisha highlights supportive faculty and an education grounded in ethical, compassionate care.",
    },
    {
      name: "Avyay Sagar Sharma",
      quote: "The lecture halls are actually good to sit in for long hours.",
      summary:
        "Avyay appreciates the well-lit lecture halls, audiovisual systems, and hands-on laboratory exposure.",
    },
  ];
  const t = testimonials[index]!;
  return (
    <section className="testimonial-section">
      <div className="container testimonial-layout">
        <div>
          <span className="eyebrow">THE TSM EXPERIENCE</span>
          <h2>
            In their
            <br />
            <em>own words.</em>
          </h2>
          <div className="carousel-controls">
            <button aria-label="Previous testimonial" onClick={() => setIndex((index + 2) % 3)}>
              <ChevronLeft size={19} />
            </button>
            <button aria-label="Next testimonial" onClick={() => setIndex((index + 1) % 3)}>
              <ChevronRight size={19} />
            </button>
            <span>0{index + 1} / 03</span>
          </div>
        </div>
        <div className="quote" aria-live="polite">
          <span className="quote-mark">“</span>
          <blockquote key={index}>{t.quote}</blockquote>
          <p>{t.summary}</p>
          <div className="quote-person">
            <span>
              {t.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <strong>{t.name}</strong>
              <small>Student, T.S. Mishra University</small>
            </div>
            <a
              href="https://tsm.edu.in/"
              target="_blank"
              rel="noreferrer"
              aria-label="Read original student testimonial"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  return (
    <Shell>
      <OpeningIntro onComplete={handleIntroComplete} />
      <AdmissionsPopup ready={introComplete} />
      <MotionProvider>
        <SplitHero />
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
        <section className="section container intro-section" id="introduction">
          <div className="intro-copy" data-reveal>
            <span className="eyebrow">WELCOME TO T.S. MISHRA UNIVERSITY</span>
            <h2>
              Great futures begin
              <br />
              with <em>great foundations.</em>
            </h2>
            <p className="lead">
              More than an education.
              <br />A way to discover who you can become.
            </p>
            <p>
              Established in memory of Justice Tribeni Sahai Misra, our university brings together
              knowledge, character, and a commitment to society. Here, tradition meets new thinking,
              and learning reaches beyond the classroom.
            </p>
            <Link to="/about" className="text-link">
              Get to know TSM <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="intro-visual" data-reveal>
            <img
              src="/images/campus-students.webp"
              alt="TSM medical students in the college"
              loading="lazy"
            />
            <div className="intro-tag">
              <BookOpen size={25} />
              <span>
                Learning for life.
                <br />
                <strong>Leading with purpose.</strong>
              </span>
            </div>
            <span className="image-caption">A COMMUNITY BUILT AROUND YOUR POTENTIAL</span>
          </div>
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
                  data-reveal
                >
                  <span>{p.no}</span>
                  <div>
                    <h3>
                      {p.name}
                      <br />
                      programs
                    </h3>
                    <p>{p.desc}</p>
                  </div>
                  <ArrowUpRight size={27} />
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
            <SectionTitle
              label="THE TSM DIFFERENCE"
              title="An education that"
              italic="goes beyond."
            />
            <div className="why-grid">
              {[
                {
                  icon: BookOpen,
                  title: "Learn with purpose",
                  text: "Explore academic knowledge through practical learning and experienced faculty.",
                  to: "/academics",
                },
                {
                  icon: Globe2,
                  title: "Connect to opportunity",
                  text: "Discover career counselling, industry exposure, and training and placement support.",
                  to: "/student-life/training-and-placements",
                },
                {
                  icon: HeartPulse,
                  title: "Make a real difference",
                  text: "Connect healthcare education with clinical experience at our teaching hospital.",
                  to: "/hospital",
                },
                {
                  icon: Sparkles,
                  title: "Become your best self",
                  text: "Find room to grow through sports, student activities, and campus experiences.",
                  to: "/student-life",
                },
              ].map((x) => (
                <Link to={x.to} className="why-item" key={x.title} data-reveal>
                  <x.icon strokeWidth={1.2} size={32} />
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CampusGallery />
        <section className="section hospital-section container">
          <div className="hospital-photo" data-reveal>
            <img src="/images/clinical.jpg" alt="Clinical learning at TSM" loading="lazy" />
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
                  <img src={"/images/" + img} alt={title + " at TSM"} loading="lazy" />
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
