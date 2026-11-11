import fs from "node:fs";
const data = JSON.parse(fs.readFileSync("src/data/university.json"));
const programs = JSON.parse(fs.readFileSync("src/data/programs.json"));
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const paths = [
  ...new Set([
    "/",
    "/about",
    "/academics",
    "/admissions",
    "/student-life",
    "/administration",
    "/hospital",
    "/news",
    "/contact",
    "/schools",
    "/programs",
    ...data.pages.map((p) => `/${p.group}/${p.slug}`),
    ...data.schools.map((p) => `/schools/${p.slug}`),
    ...data.news.map((p) => `/news/${p.slug}`),
    ...programs.map((p) => `/programs/${slug(p.name)}`),
    ...["diploma", "undergraduate", "postgraduate", "doctoral"].map((p) => `/programs/${p}`),
    ...["departments", "facilities", "doctors"].map((p) => `/hospital/${p}`),
  ]),
];
const base = (process.env.SITE_URL || "https://tsm.edu.in").replace(/\/$/, "");
fs.writeFileSync(
  "public/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join("\n") +
    "\n</urlset>\n",
);
fs.writeFileSync("scripts/routes.json", JSON.stringify(paths, null, 2) + "\n");
console.log("Generated", paths.length, "sitemap routes");
