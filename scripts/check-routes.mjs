import fs from "node:fs";
import assert from "node:assert/strict";
const d = JSON.parse(fs.readFileSync("src/data/university.json"));
const paths = JSON.parse(fs.readFileSync("scripts/routes.json"));
const failures = [];
const started = Date.now();
let passed = 0;
for (let i = 0; i < paths.length; i += 8)
  await Promise.all(
    paths.slice(i, i + 8).map(async (path) => {
      const r = await fetch("http://127.0.0.1:5173" + path);
      const h = await r.text();
      if (
        r.status !== 200 ||
        !h.includes("T.S. Mishra University") ||
        h.includes("This page didn&#x27;t load")
      )
        failures.push([path, r.status]);
      else passed++;
      const hrefs = [...h.matchAll(/href="(\/(?!src|images|assets|@|node_modules)[^"#?]*)"/g)].map(
        (m) => m[1],
      );
      for (const href of hrefs)
        if (!paths.includes(href) && !["/", "/favicon.ico", "/sitemap.xml"].includes(href))
          failures.push(["unregistered internal link", href, path]);
    }),
  );
const notFound = await fetch("http://127.0.0.1:5173/not-a-real-page");
assert.equal(notFound.status, 404);
const legacy = await fetch("http://127.0.0.1:5173/ug.aspx", { redirect: "manual" });
assert([301, 302, 307, 308].includes(legacy.status));
assert.equal(legacy.headers.get("location"), "/academics/undergraduate");
console.log(
  JSON.stringify(
    {
      routesPassed: passed,
      failures,
      notFound: notFound.status,
      legacyRedirect: legacy.status,
      elapsedSeconds: (Date.now() - started) / 1000,
    },
    null,
    2,
  ),
);
assert.equal(failures.length, 0);
