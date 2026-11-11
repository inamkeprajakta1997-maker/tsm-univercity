import { useLocation } from "@tanstack/react-router";
import { Link } from "./Link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  MapPin,
} from "lucide-react";
import data from "../../data/university.json";
import { FloatingSocials } from "./FloatingSocials";
export const navigation = [
  { label: "About us", path: "/about", group: "about" },
  { label: "Academics", path: "/academics", group: "academics" },
  { label: "Admissions", path: "/admissions", group: "admissions" },
  { label: "Student life", path: "/student-life", group: "student-life" },
  { label: "Administration", path: "/administration", group: "administration" },
  { label: "Hospital", path: "/hospital", group: "hospital" },
  { label: "News & events", path: "/news", group: "news" },
  { label: "Contact", path: "/contact", group: "contact" },
];
export function ButtonLink({
  to,
  children,
  light = false,
  outline = false,
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link to={to!} className={`button ${light ? "light" : ""} ${outline ? "outline" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [location.pathname]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        <span>
          <i /> A new chapter begins. <strong>Admissions open 2026–27</strong>
        </span>
        <Link to="/admissions/admission-enquiry">
          Begin your journey <ArrowRight size={14} />
        </Link>
        <a className="announcement-phone" href="tel:+919005462229">
          <Phone size={12} /> +91 90054 62229
        </a>
      </div>
      <header className="header" onMouseLeave={() => setOpen(null)}>
        <div className="nav-inner">
          <Link to="/" aria-label="T.S. Mishra University home" className="brand">
            <img src="/images/logo.png" alt="T.S. Mishra University" width="195" height="58" />
          </Link>
          <nav
            aria-label="Main navigation"
            className={mobile ? "main-nav mobile-open" : "main-nav"}
          >
            {navigation.map((n) => (
              <div className="nav-item" key={n.path}>
                <div className="nav-label">
                  <Link
                    to={n.path}
                    className={location.pathname.startsWith(n.path) ? "active" : ""}
                  >
                    {n.label}
                  </Link>
                  {data.pages.some((p) => p.group === n.group) && (
                    <button
                      aria-label={`Explore ${n.label}`}
                      aria-expanded={open === n.group}
                      onClick={() => setOpen(open === n.group ? null : n.group)}
                      onMouseEnter={() => !mobile && setOpen(n.group)}
                    >
                      <ChevronDown size={11} />
                    </button>
                  )}
                </div>
                {open === n.group && (
                  <div className="mega-menu">
                    <div className="mega-intro">
                      <span className="eyebrow">DISCOVER TSM</span>
                      <h2>{n.label}</h2>
                      <Link to={n.path}>
                        Explore the overview <ArrowUpRight size={18} />
                      </Link>
                    </div>
                    <div className="mega-links">
                      {n.group === "academics" && (
                        <Link to="/schools">
                          Explore all schools <ArrowUpRight size={14} />
                        </Link>
                      )}
                      {data.pages
                        .filter((p) => p.group === n.group)
                        .map((p) => (
                          <Link key={p.slug} to={`/${p.group}/${p.slug}`}>
                            {p.title}
                            <ArrowUpRight size={13} />
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link className="nav-apply" to="/admissions/admission-enquiry">
            Apply now <ArrowUpRight size={15} />
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function AdmissionCTA() {
  return (
    <section className="admission-cta">
      <div className="container" data-reveal>
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <div className="cta-row">
          <h2>
            Your journey to
            <br />
            <em>excellence starts here.</em>
          </h2>
          <div>
            <p>
              Big ambitions deserve the right beginning.
              <br />
              Find yours at T.S. Mishra University.
            </p>
            <div className="button-row">
              <ButtonLink to="/admissions/admission-enquiry" light>
                Apply now
              </ButtonLink>
              <Link to="/admissions" className="text-link">
                Explore admissions <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/">
            <img src="/images/logo.png" width="210" height="65" alt="T.S. Mishra University" />
          </Link>
          <p>
            Rooted in values.
            <br />
            Inspired by possibility.
          </p>
          <span>Lucknow, Uttar Pradesh, India</span>
          <FloatingSocials placement="footer" />
        </div>
        <div>
          <h3>Explore</h3>
          {navigation.slice(0, 6).map((n) => (
            <Link key={n.path} to={n.path}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Your future</h3>
          <Link to="/programs">Find a program</Link>
          <Link to="/schools">Our schools</Link>
          <Link to="/admissions/admission-process">Admission process</Link>
          <Link to="/admissions/scholarship">Scholarships</Link>
          <Link to="/student-life/training-and-placements">Training & placements</Link>
          <a href="https://tsm.edu.in/pdf/prospectus.pdf" target="_blank" rel="noreferrer">
            Download prospectus ?
          </a>
          <Link to="/academics/academic-calendar-2026-27">Academic calendar</Link>
        </div>
        <div className="footer-contact">
          <h3>Come find your place</h3>
          <p>
            <MapPin size={18} /> Opposite Amausi Railway Station,
            <br />
            Anaura, Lucknow,
            <br />
            Uttar Pradesh · 226008
          </p>
          <a href="tel:+919005462229">+91 9005462229</a>
          <a href="tel:+919005462226">+91 9005462226</a>
          <a href="mailto:admissions@tsm.edu.in">admissions@tsm.edu.in</a>
          <Link to="/contact" className="text-link">
            Get directions <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} T.S. Mishra University. All rights reserved.
        </span>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <AdmissionCTA />
      <Footer />
      <FloatingSocials />
    </>
  );
}
