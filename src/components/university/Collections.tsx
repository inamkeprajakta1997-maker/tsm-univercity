import { Link } from "./Link";
import { ArrowUpRight } from "lucide-react";
import data from "../../data/university.json";
export function SectionTitle({
  label,
  title,
  italic,
  link,
  to,
}: {
  label: string;
  title: string;
  italic?: string;
  link?: string;
  to?: string;
}) {
  return (
    <div className="section-title" data-reveal>
      <div>
        <span className="eyebrow">{label}</span>
        <h2>
          {title}
          {italic && (
            <>
              <br />
              <em>{italic}</em>
            </>
          )}
        </h2>
      </div>
      {link && to && (
        <Link className="text-link" to={to!}>
          {link}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function SchoolGrid({ limit }: { limit?: number }) {
  return (
    <div className="school-grid">
      {data.schools.slice(0, limit).map((s, i) => (
        <Link className="school-card" to={`/schools/${s.slug}`} key={s.slug} data-reveal>
          <div className="school-image">
            <img src={"/images/" + s.image} alt={s.name + " at TSM"} loading="lazy" data-image-motion />
            <span className="school-number">0{i + 1}</span>
            <span className="circle-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </Link>
      ))}
    </div>
  );
}
export function NewsGrid({ limit = 3, filter = "All" }: { limit?: number; filter?: string }) {
  return (
    <div className="news-grid">
      {data.news
        .filter((n) => filter === "All" || n.type === filter)
        .slice(0, limit)
        .map((n) => (
          <Link to={`/news/${n.slug}`} className="news-card" key={n.slug}>
            <div className="news-image">
              <img src={"/images/" + n.image} alt={n.title} loading="lazy" data-image-motion />
              <span>{n.type}</span>
            </div>
            <div className="news-meta">{n.date.replace("'", " ")}</div>
            <h3>{n.title}</h3>
            <span className="text-link">
              Read story <ArrowUpRight size={15} />
            </span>
          </Link>
        ))}
    </div>
  );
}
