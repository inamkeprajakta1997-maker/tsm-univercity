import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import redirects from "../data/redirects.json";
import { slugify } from "../data/paths";
import data from "../data/university.json";
import programs from "../data/programs.json";
const groups = [
  "about",
  "academics",
  "admissions",
  "student-life",
  "administration",
  "hospital",
  "news",
  "contact",
  "schools",
  "programs",
];
export const Route = createFileRoute("/$")({
  beforeLoad: ({ params, location }) => {
    const url = new URL(location.href, "https://tsm.edu.in");
    const aliases: Record<string, string> = redirects;
    const target = aliases[url.pathname + url.search] || aliases[url.pathname];
    if (target) throw redirect({ href: target, statusCode: 301 });
    const parts = params._splat?.split("/").filter(Boolean) || [];
    const [group = "", slug = ""] = parts;
    const valid =
      (parts.length === 1 && groups.includes(group)) ||
      (parts.length === 2 &&
        (data.pages.some((p) => p.group === group && p.slug === slug) ||
          (group === "schools" && data.schools.some((s) => s.slug === slug)) ||
          (group === "news" && data.news.some((n) => n.slug === slug)) ||
          (group === "programs" &&
            (["diploma", "undergraduate", "postgraduate", "doctoral"].includes(slug) ||
              programs.some((p) => slugify(p.name) === slug))) ||
          (group === "hospital" && ["doctors", "facilities", "departments"].includes(slug))));
    if (!valid) throw notFound();
  },
  head: ({ params }) => {
    const path = params._splat || "";
    const [group = "", slug = ""] = path.split("/");
    const title =
      data.pages.find((p) => p.group === group && p.slug === slug)?.title ||
      data.schools.find((s) => group === "schools" && s.slug === slug)?.name ||
      data.news.find((n) => group === "news" && n.slug === slug)?.title ||
      programs.find((p) => group === "programs" && slugify(p.name) === slug)?.name ||
      (slug || group).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const description = `Explore ${title} at T.S. Mishra University, Lucknow. Discover official university information, resources, and your next step.`;
    return {
      meta: [
        { title: `${title} | T.S. Mishra University` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | T.S. Mishra University` },
        { property: "og:description", content: description },
      ],
    };
  },
});
