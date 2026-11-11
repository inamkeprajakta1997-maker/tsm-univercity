import { slugify } from "../../data/paths";
import { Link } from "./Link";
import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Search,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Download,
  FileText,
  ArrowRight,
  BookOpen,
  Stethoscope,
  Users,
  GraduationCap,
} from "lucide-react";
import { Shell, ButtonLink, navigation } from "./Layout";
import { Entrance, MotionProvider } from "./Motion";
import { SectionTitle, SchoolGrid, NewsGrid } from "./Collections";
import { EventsShowcase } from "./EventsShowcase";
import data from "../../data/university.json";
import programs from "../../data/programs.json";
const descriptions: Record<string, string> = {
  about: "Rooted in a legacy of education. Inspired by the possibilities ahead.",
  academics:
    "Explore disciplines, discover new ideas, and build the knowledge to make a difference.",
  admissions: "Your next chapter begins with a first step. Let us help you find your direction.",
  "student-life": "A place to learn, belong, and become. Discover the life beyond your lectures.",
  administration: "Meet the people and the governance behind our university.",
  hospital: "Healthcare, education, and compassion · brought together.",
  news: "A closer look at the ideas, people, and moments shaping TSM.",
  contact: "We are here to help you take the next step.",
  schools: "Eight schools. A world of opportunity. Find the discipline that speaks to you.",
  programs: "Find the right path for your interests, ambitions, and future.",
};
export function InnerHero({
  title,
  category,
  description,
  image = "campus-hero.webp",
}: {
  title: string;
  category: string;
  description?: string | undefined;
  image?: string;
}) {
  return (
    <section className="inner-hero">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{category}</span>
        </div>
        <Entrance>
          <span className="eyebrow">T.S. MISHRA UNIVERSITY · LUCKNOW</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </Entrance>
      </div>
      <img src={"/images/" + image} alt="T.S. Mishra University campus and learning" />
    </section>
  );
}
export function EnquiryForm({
  contact = false,
  feedback = false,
}: {
  contact?: boolean;
  feedback?: boolean;
}) {
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const v = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setValues(v);
    setStatus(true);
  }
  function download() {
    const blob = new Blob([JSON.stringify(values, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tsm-enquiry-draft.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="form-panel">
      <span className="eyebrow">
        {feedback ? "YOUR VOICE MATTERS" : contact ? "LET'S TALK" : "YOUR FUTURE STARTS HERE"}
      </span>
      <h2>
        {feedback ? "Share your feedback." : contact ? "Say hello." : "Start a conversation."}
      </h2>
      <p>Required fields are marked with an asterisk.</p>
      {status ? (
        <div className="form-result" role="status">
          <CheckCircle2 size={34} />
          <h3>Your {feedback ? "feedback" : "enquiry"} draft is ready.</h3>
          <p>
            This demo has not sent or saved your information. Download your draft, or contact the
            university directly to continue.
          </p>
          <dl>
            {Object.entries(values)
              .filter(([k]) => k !== "consent")
              .map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
          <div className="button-row">
            <button className="button" onClick={download}>
              Download draft <Download size={16} />
            </button>
            <button className="text-link" onClick={() => setStatus(false)}>
              Edit details
            </button>
          </div>
          <a className="text-link" href="mailto:admissions@tsm.edu.in">
            Email the admissions team <ArrowUpRight size={16} />
          </a>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="form-grid">
            <label>
              Full name *
              <input
                required
                name="Name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                placeholder="Your full name"
                defaultValue={values["Name"]}
              />
            </label>
            <label>
              Email address *
              <input
                required
                name="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                defaultValue={values["Email"]}
              />
            </label>
            <label>
              Mobile number *
              <input
                required
                name="Phone"
                type="tel"
                autoComplete="tel"
                pattern="[+]?[0-9 ()\-]{10,18}"
                title="Enter a valid phone number (10 to 18 characters)"
                placeholder="+91 98765 43210"
                defaultValue={values["Phone"]}
              />
            </label>
            <label>
              {contact ? "Department" : "Area of interest"} *
              <select required name="Interest" defaultValue={values["Interest"] || ""}>
                <option value="" disabled>
                  Select an option
                </option>
                {(contact
                  ? ["Admissions", "Student cell", "Examination", "Finance", "General enquiry"]
                  : data.schools.map((s) => s.name)
                ).map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            {!contact && !feedback && (
              <label className="full-width">
                Program level *
                <select required name="Level" defaultValue={values["Level"] || ""}>
                  <option value="" disabled>
                    Select your level
                  </option>
                  {["Diploma", "Undergraduate", "Postgraduate", "Doctoral"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="full-width">
              {feedback ? "Your feedback" : "Your message"} *
              <textarea
                required
                name="Message"
                minLength={10}
                maxLength={2000}
                rows={4}
                placeholder="Tell us how we can help (at least 10 characters)"
                defaultValue={values["Message"]}
              />
            </label>
          </div>
          <label className="consent">
            <input type="checkbox" required name="consent" value="Agreed" />I understand that this
            is a demo and my details will not be sent or stored.
          </label>
          <button type="submit" className="button">
            Review {feedback ? "feedback" : "enquiry"} <ArrowRight size={17} />
          </button>
          <p className="form-note">
            For an official application, use the{" "}
            <a href="https://erp.tsm.edu.in/CandidateSignUp.aspx" target="_blank" rel="noreferrer">
              university admissions portal ?
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
function ResourceList({ group }: { group: string }) {
  return (
    <div className="resource-grid">
      {data.pages
        .filter((p) => p.group === group)
        .map((p, i) => (
          <Link to={`/${group}/${p.slug}`} className="resource-card" key={p.slug}>
            <span className="resource-index">{String(i + 1).padStart(2, "0")}</span>
            <h3>{p.title}</h3>
            <ArrowUpRight size={21} />
          </Link>
        ))}
    </div>
  );
}
function ProgramFinder({ level }: { level?: string | undefined }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    level ? level.charAt(0).toUpperCase() + level.slice(1) : "All",
  );
  const filtered = programs.filter(
    (p) =>
      (selected === "All" || p.level === selected) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="program-tools">
        <div className="filter-tabs" aria-label="Program level">
          {["All", "Diploma", "Undergraduate", "Postgraduate", "Doctoral"].map((x) => (
            <button
              className={selected === x ? "active" : ""}
              onClick={() => setSelected(x)}
              key={x}
              aria-pressed={selected === x}
            >
              {x}
            </button>
          ))}
        </div>
        <label className="search-input">
          <Search size={19} />
          <input
            aria-label="Search programs"
            placeholder="Search your ambition..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} programs to explore · Published course information
      </p>
      <div className="program-results">
        {filtered.map((p, i) => (
          <Link key={p.name + i} to={`/programs/${slugify(p.name)}`} className="program-result">
            <div>
              <span className="eyebrow">{p.level}</span>
              <h3>{p.name}</h3>
            </div>
            <span>{p.duration}</span>
            <ArrowUpRight size={22} />
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search size={30} />
          <h3>No matching programs</h3>
          <p>Try another keyword or choose a different program level.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setSelected("All");
            }}
          >
            Clear filters <ArrowRight size={16} />
          </button>
        </div>
      )}
      <p className="content-note">
        Program availability, eligibility, fees, and regulatory requirements must be confirmed with
        admissions for your intake.
      </p>
    </>
  );
}
function NewsListing() {
  const [filter, setFilter] = useState("All");
  return (
    <div id="news-archive">
      <SectionTitle label="NEWS & EVENTS ARCHIVE" title="Explore every story." />
      <div className="filter-tabs news-tabs">
        {["All", "University events", "Research & learning", "Achievements"].map((x) => (
          <button
            key={x}
            className={filter === x ? "active" : ""}
            onClick={() => setFilter(x)}
            aria-pressed={filter === x}
          >
            {x}
          </button>
        ))}
      </div>
      <NewsGrid limit={12} filter={filter} />
    </div>
  );
}
function Contact() {
  return (
    <>
      <div className="contact-layout">
        <div>
          <span className="eyebrow">FIND YOUR WAY TO TSM</span>
          <h2>
            Let's begin
            <br />
            <em>with hello.</em>
          </h2>
          <div className="contact-detail">
            <MapPin />
            <div>
              <h3>University campus</h3>
              <p>
                Opposite Amausi Railway Station,
                <br />
                Anaura, Lucknow,
                <br />
                Uttar Pradesh · 226008
              </p>
              <a
                href="https://maps.google.com/?q=T.S.+Mishra+University+Lucknow"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Get directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="contact-detail">
            <Phone />
            <div>
              <h3>Speak with admissions</h3>
              <a href="tel:+919005462229">+91 9005462229</a>
              <a href="tel:+919005462226">+91 9005462226</a>
              <a href="tel:05223538080">0522-3538080</a>
            </div>
          </div>
          <div className="contact-detail">
            <Mail />
            <div>
              <h3>Write to us</h3>
              <a href="mailto:admissions@tsm.edu.in">admissions@tsm.edu.in</a>
              <a href="mailto:contact@tsm.edu.in">contact@tsm.edu.in</a>
            </div>
          </div>
          <p className="content-note">
            Head office: Vedic and Futuristic Edutech,
            <br />
            17/9 Windsor Place, Lucknow · 226001
          </p>
        </div>
        <EnquiryForm contact />
      </div>
      <iframe
        className="campus-map"
        title="T.S. Mishra University campus location"
        src="https://maps.google.com/maps?q=TS%20Mishra%20University%20Lucknow&t=&z=14&ie=UTF8&iwloc=&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="department-grid">
        {[
          ["Student cell", "studentcell@tsm.edu.in"],
          ["Examinations", "ec.exam@tsm.edu.in"],
          ["Finance", "finance@tsm.edu.in"],
          ["Alumni", "alumni@tsm.edu.in"],
          ["Human resources", "hrdepartment@tsm.edu.in"],
          ["IT department", "itcell@tsm.edu.in"],
        ].map(([title, email]) => (
          <div key={email}>
            <h3>{title}</h3>
            <a href={"mailto:" + email}>
              {email}
              <ArrowUpRight size={15} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
function Hospital() {
  return (
    <>
      <div className="editorial-split">
        <div>
          <span className="eyebrow">CARE THAT CONNECTS US</span>
          <h2>
            Knowledge in action.
            <br />
            <em>Compassion at heart.</em>
          </h2>
          <p>
            The TSM Super Speciality Hospital connects medical education with the real needs of
            patients. Discover the teaching hospital's clinical services, doctors, and patient
            facilities through its official website.
          </p>
          <a className="button" href="https://www.tsmmch.org/" target="_blank" rel="noreferrer">
            Visit the hospital website <ArrowUpRight size={17} />
          </a>
        </div>
        <img
          src="/images/clinical.jpg"
          alt="Clinical education and healthcare at TSM"
          loading="lazy"
        />
      </div>
      <div className="big-stats">
        {[
          ["1,200", "Beds"],
          ["150+", "Doctors"],
          ["300+", "Nurses & paramedics"],
          ["21", "Departments"],
        ].map(([n, l]) => (
          <div key={l}>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="stat-source">
        Figures as published on the university website; confirm current services with the hospital.
      </p>
      <div className="feature-grid">
        {[
          {
            icon: Stethoscope,
            title: "Departments",
            body: "Explore the hospital's clinical departments and specialist services.",
            path: "/hospital/departments",
          },
          {
            icon: HeartIcon,
            title: "Facilities",
            body: "Discover the hospital's patient care and clinical facilities.",
            path: "/hospital/facilities",
          },
          {
            icon: Users,
            title: "Doctors & clinical teams",
            body: "Find current medical teams through the official hospital directory.",
            path: "/hospital/doctors",
          },
        ].map((x) => (
          <Link to={x.path} className="feature-card" key={x.title}>
            <x.icon size={30} />
            <h3>{x.title}</h3>
            <p>{x.body}</p>
            <ArrowUpRight size={22} />
          </Link>
        ))}
      </div>
      <p className="content-note">
        For appointments and medical enquiries, contact the hospital directly. University enquiry
        forms do not book appointments.
      </p>
    </>
  );
}
const HeartIcon = Stethoscope;
export function DetailPage({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  const group = segments[0] || "about";
  const slug = segments.slice(1).join("/");
  const page = data.pages.find((p) => p.group === group && p.slug === slug);
  const school = data.schools.find((s) => s.slug === slug && group === "schools");
  const news = data.news.find((n) => n.slug === slug && group === "news");
  const program = programs.find((p) => slugify(p.name) === slug && group === "programs");
  const isLevel =
    group === "programs" && ["diploma", "undergraduate", "postgraduate", "doctoral"].includes(slug);
  const title =
    school?.name ||
    news?.title ||
    program?.name ||
    page?.title ||
    (isLevel
      ? slug.charAt(0).toUpperCase() + slug.slice(1) + " programs"
      : navigation.find((n) => n.path === "/" + group)?.label ||
        { schools: "Our schools", programs: "Find your program" }[group as "schools"] ||
        "Explore TSM");
  const valid =
    !!page ||
    !!school ||
    !!news ||
    !!program ||
    isLevel ||
    (!slug && Object.keys(descriptions).includes(group)) ||
    (group === "hospital" && ["departments", "facilities", "doctors"].includes(slug));
  if (!valid)
    return (
      <Shell>
        <InnerHero
          title="A new direction awaits."
          category="Page not found"
          description="We couldn't find this page. Explore our schools or return to the homepage."
        />
        <div className="section container">
          <ButtonLink to="/">Back to home</ButtonLink>
        </div>
      </Shell>
    );
  return (
    <Shell>
      <MotionProvider>
        <InnerHero
          title={title}
          category={group.replace("-", " ")}
          description={
            school?.description ||
            (!slug
              ? descriptions[group]
              : isLevel
                ? "Explore published programs and find your next step."
                : undefined)
          }
          image={
            school?.image ||
            (group === "student-life"
              ? "campus-life.webp"
              : group === "hospital"
                ? "clinical.jpg"
                : "campus-hero.webp")
          }
        />
        {group === "news" && !slug && <EventsShowcase archiveAnchor="#news-archive" />}
        <section className="section container inner-content">
          {group === "contact" ? (
            <Contact />
          ) : group === "programs" ? (
            program ? (
              <div className="article-layout">
                <article>
                  <span className="eyebrow">{program.level} PROGRAM</span>
                  <h2>{program.name}</h2>
                  <div className="program-facts">
                    <div>
                      <span>Published duration</span>
                      <strong>{program.duration}</strong>
                    </div>
                    <div>
                      <span>Study level</span>
                      <strong>{program.level}</strong>
                    </div>
                  </div>
                  <p>
                    Explore this program at T.S. Mishra University. Our admissions team can help you
                    understand entry requirements, the application process, and the latest course
                    information.
                  </p>
                  <p className="content-note">
                    Fees, current intake, curriculum, and eligibility are subject to official
                    confirmation. Please check the university listing before applying.
                  </p>
                  <a href={program.source} target="_blank" rel="noreferrer" className="text-link">
                    View official course listing <ArrowUpRight size={17} />
                  </a>
                </article>
                <aside>
                  <h3>Your next step</h3>
                  <p>Get guidance on choosing your program.</p>
                  <ButtonLink to="/admissions/admission-enquiry">Enquire now</ButtonLink>
                  <Link to="/admissions/eligibility-criteria">Eligibility criteria</Link>
                  <Link to="/admissions/admission-process">How to apply</Link>
                </aside>
              </div>
            ) : (
              <ProgramFinder level={isLevel ? slug : undefined} />
            )
          ) : group === "schools" ? (
            school ? (
              <>
                <div className="editorial-split">
                  <div>
                    <span className="eyebrow">A SCHOOL FOR YOUR AMBITION</span>
                    <h2>
                      Discover your discipline.
                      <br />
                      <em>Define your future.</em>
                    </h2>
                    <p>{school.body || school.description}</p>
                    <p>
                      Explore the school's academic focus, practical learning opportunities, and
                      official information. Speak with our admissions team about the programs
                      available for your intake.
                    </p>
                    <div className="button-row">
                      <ButtonLink to="/programs">Explore programs</ButtonLink>
                      <a
                        href={school.source}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
                        Official school information <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                  <img src={"/images/" + school.image} alt={school.name} loading="lazy" />
                </div>
                <SectionTitle label="ACADEMIC PATHWAYS" title="Programs in this school." />
                <div className="program-results">
                  {programs
                    .filter((p) => p.school === school.slug)
                    .map((p) => (
                      <Link
                        key={p.name}
                        to={`/programs/${slugify(p.name)}`}
                        className="program-result"
                      >
                        <div>
                          <span className="eyebrow">{p.level}</span>
                          <h3>{p.name}</h3>
                        </div>
                        <span>{p.duration}</span>
                        <ArrowUpRight size={20} />
                      </Link>
                    ))}
                </div>
                <SectionTitle label="YOUR NEXT STEP" title="Make a considered choice." />
                <div className="feature-grid">
                  {[
                    ["Programs", "Find your academic path.", "/programs"],
                    [
                      "Admissions",
                      "Understand the application process.",
                      "/admissions/admission-process",
                    ],
                    [
                      "Learning resources",
                      "Explore the spaces that support your learning.",
                      "/academics/resources",
                    ],
                  ].map(([title, desc, to]) => (
                    <Link key={title} to={to!} className="feature-card">
                      <GraduationCap />
                      <h3>{title}</h3>
                      <p>{desc}</p>
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <SchoolGrid />
            )
          ) : group === "news" ? (
            news ? (
              <div className="article-layout">
                <article>
                  <span className="eyebrow">
                    {news.type} · {news.date}
                  </span>
                  <img className="article-image" src={"/images/" + news.image} alt={news.title} />
                  <h2>{news.title}</h2>
                  <p>
                    {news.body ||
                      "Discover this university event through the official announcement."}
                  </p>
                  <a href={news.source} className="text-link" target="_blank" rel="noreferrer">
                    Read the official announcement <ArrowUpRight size={16} />
                  </a>
                  <p className="content-note">
                    From the university news archive. Read the original announcement for complete
                    event details.
                  </p>
                </article>
                <aside>
                  <h3>More from TSM</h3>
                  {data.news
                    .filter((n) => n.slug !== news.slug)
                    .slice(0, 4)
                    .map((n) => (
                      <Link to={`/news/${n.slug}`} key={n.slug}>
                        {n.title}
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                </aside>
              </div>
            ) : (
              <NewsListing />
            )
          ) : group === "hospital" ? (
            slug ? (
              <>
                <h2>Hospital {slug}.</h2>
                <p className="lead">
                  Current medical teams and service information are maintained by the hospital.
                </p>
                <p>
                  Use the official T.S. Misra Medical College & Hospital website for the department
                  directory, available facilities, and doctors. These details require confirmation
                  before they are reproduced in this demo.
                </p>
                <a
                  className="button"
                  href="https://www.tsmmch.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore official hospital information <ArrowUpRight size={17} />
                </a>
                <div className="content-note">
                  Content confirmation required: current {slug} directory.
                </div>
              </>
            ) : (
              <Hospital />
            )
          ) : page ? (
            ["admission-enquiry", "student-s-feedback"].includes(page.slug) ? (
              <div className="contact-layout">
                <div>
                  <span className="eyebrow">WE'RE HERE TO HELP</span>
                  <h2>
                    {page.slug === "student-s-feedback"
                      ? "Help shape your university."
                      : "Great things start with a conversation."}
                  </h2>
                  <p>
                    Connect with our team for verified guidance on university programs, eligibility,
                    and admissions.
                  </p>
                  <a href="tel:+919005462229" className="text-link">
                    <Phone size={16} /> +91 9005462229
                  </a>
                </div>
                <EnquiryForm feedback={page.slug === "student-s-feedback"} />
              </div>
            ) : [
                "diploma-programs",
                "undergraduate",
                "post-graduate",
                "doctoral-programs",
              ].includes(page.slug) ? (
              <ProgramFinder
                level={
                  {
                    "diploma-programs": "diploma",
                    undergraduate: "undergraduate",
                    "post-graduate": "postgraduate",
                    "doctoral-programs": "doctoral",
                  }[page.slug]
                }
              />
            ) : (
              <ResourceDetail page={page} />
            )
          ) : (
            <Overview group={group} />
          )}
        </section>
      </MotionProvider>
    </Shell>
  );
}
function ResourceDetail({ page }: { page: (typeof data.pages)[number] }) {
  return (
    <div className="article-layout">
      <article>
        <span className="eyebrow">{page.group.replace("-", " ")} · TSM</span>
        <h2>{page.title}</h2>
        {page.body && !page.needsConfirmation ? (
          <div className="article-copy">
            {page.body
              .split(/(?<=\.)\s+(?=[A-Z])/)
              .reduce<string[]>((acc, s) => {
                if (!acc.length || acc[acc.length - 1]!.length > 350) acc.push(s);
                else acc[acc.length - 1] += " " + s;
                return acc;
              }, [])
              .map((p, i) => (
                <p key={i}>
                  {p}
                  {i === 0 ? "" : ""}
                </p>
              ))}
          </div>
        ) : (
          <>
            <p className="lead">Explore {page.title.toLowerCase()} at T.S. Mishra University.</p>
            <p>
              {page.source.includes(".pdf")
                ? "The official university document is available through the resource link below. Review the current document for complete information."
                : page.source.includes("erp.")
                  ? "Continue to the university's secure portal to view official payment options. Payments are handled by the university."
                  : "Please contact the university for confirmed information on this topic. Details have not been invented for the demo."}
            </p>
          </>
        )}
        {page.documents && page.documents.length > 0 && (
          <div className="document-list">
            {page.documents.map((doc) => (
              <a href={doc.url} key={doc.url} target="_blank" rel="noreferrer">
                <FileText size={18} />
                <span>{doc.label}</span>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        )}
        {page.slug === "admission-process" && (
          <ol className="admission-steps">
            {[
              "Register yourself",
              "Verify your email",
              "Start the application form",
              "Pay the application fee",
              "Complete and submit your application",
            ].map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
              </li>
            ))}
          </ol>
        )}
        {page.needsConfirmation && !/pdf|erp\./.test(page.source) && (
          <div className="content-note">
            Content confirmation required. The official source does not currently provide verified
            details for this demo.
          </div>
        )}
        {!page.source.includes("ErrorPage") && (
          <a className="button" href={page.source} target="_blank" rel="noreferrer">
            {page.source.includes(".pdf") ? "Open official document" : "View official information"}{" "}
            {page.source.includes(".pdf") ? <FileText size={17} /> : <ArrowUpRight size={17} />}
          </a>
        )}
        <p className="stat-source">
          Source: T.S. Mishra University · Content reviewed for this demonstration. Refer to
          official notices for current policy.
        </p>
      </article>
      <aside>
        <h3>Explore {navigation.find((n) => n.group === page.group)?.label}</h3>
        {data.pages
          .filter((p) => p.group === page.group && p.slug !== page.slug)
          .map((p) => (
            <Link key={p.slug} to={`/${p.group}/${p.slug}`}>
              {p.title}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        <div className="aside-help">
          <BookOpen size={26} />
          <h3>Find your next step.</h3>
          <p>Our team can help you explore the possibilities.</p>
          <Link to="/contact" className="text-link">
            Talk to us <ArrowUpRight size={16} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
function Overview({ group }: { group: string }) {
  return (
    <>
      {group === "about" && (
        <div className="editorial-split">
          <div>
            <span className="eyebrow">A LEGACY. A NEW POSSIBILITY.</span>
            <h2>
              Learning with purpose.
              <br />
              <em>Growing with values.</em>
            </h2>
            <p>
              Established in memory of the late Justice Tribeni Sahai Misra, T.S. Mishra University
              is built around education, knowledge, and wisdom. The university brings together
              disciplines across healthcare, technology, business, law, and traditional medicine.
            </p>
            <p>
              Our vision is to develop each student's potential to contribute to society, the
              economy, and culture · equipping the next generation with knowledge and the capacity
              to embrace change.
            </p>
          </div>
          <img src="/images/campus-students.webp" alt="Students learning at TSM" loading="lazy" />
        </div>
      )}
      {group === "academics" && (
        <>
          <SectionTitle
            label="DISCOVER YOUR DISCIPLINE"
            title="Different paths."
            italic="Shared ambition."
            link="View every school"
            to="/schools"
          />
          <SchoolGrid limit={4} />
          <div className="section-divider" />
          <ButtonLink to="/programs">Find your program</ButtonLink>
        </>
      )}
      {group === "admissions" && (
        <div className="admissions-overview">
          <div>
            <span className="eyebrow">BEGIN AT TSM</span>
            <h2>
              Bring your ambition.
              <br />
              <em>We'll help with the rest.</em>
            </h2>
            <p>
              Explore your options, check program-specific eligibility, and connect with admissions.
              Official applications and payments are completed through the university's portal.
            </p>
            <ButtonLink to="/admissions/admission-enquiry">Make an enquiry</ButtonLink>
          </div>
          <ol className="admission-steps">
            {[
              "Find your program",
              "Check your eligibility",
              "Register and apply",
              "Prepare for your next chapter",
            ].map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
              </li>
            ))}
          </ol>
        </div>
      )}
      {group === "student-life" && (
        <div className="life-gallery">
          {[
            ["events.jpg", "Make memories.", "activities-and-events"],
            ["sports.jpg", "Find your energy.", "sports"],
            ["classroom.jpg", "Find your community.", "campus-facilities"],
          ].map(([img, title, slug]) => (
            <Link to={`/student-life/${slug}`} key={title}>
              <img src={"/images/" + img} alt={title + " at TSM"} loading="lazy" />
              <h2>
                {title}
                <ArrowUpRight size={24} />
              </h2>
            </Link>
          ))}
        </div>
      )}
      {group === "administration" && (
        <p className="lead">
          Explore the university leadership, administrative offices, and governance bodies. Profiles
          below are drawn from the university's official published information.
        </p>
      )}
      <SectionTitle
        label="EXPLORE FURTHER"
        title={
          {
            about: "Get to know us.",
            academics: "The resources to go further.",
            admissions: "Everything you need to begin.",
            "student-life": "Life beyond the classroom.",
            administration: "Leadership & governance.",
          }[group] || "Discover more."
        }
      />
      <ResourceList group={group} />
    </>
  );
}
