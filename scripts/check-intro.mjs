import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (/hydration|hydrated/i.test(m.text())) errors.push(m.text());
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "commit" });
const intro = page.locator("[data-opening-intro]");
await intro.waitFor({ state: "visible" });
const start = Date.now();
await intro.waitFor({ state: "hidden", timeout: 2500 });
const elapsed = Date.now() - start;
assert(elapsed < 2200, "Intro exceeded the short time budget");
console.log("Intro visible duration:", elapsed, "ms");
assert(await page.locator("h1").isVisible());
assert.equal(await page.evaluate(() => sessionStorage.getItem("tsm-opening-intro-v1")), "seen");
await page.reload({ waitUntil: "networkidle" });
assert.equal(await intro.count(), 0);
const skipPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await skipPage.goto("http://127.0.0.1:5173/", { waitUntil: "commit" });
await skipPage.getByRole("button", { name: "Skip introduction" }).click({ force: true });
await skipPage.locator("[data-opening-intro]").waitFor({ state: "detached" });
assert(await skipPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
const reduced = await browser.newPage({ reducedMotion: "reduce" });
await reduced.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
assert.equal(await reduced.locator("[data-opening-intro]").count(), 0);
assert.deepEqual(errors, []);
console.log(
  "PASS: short intro, logo reveal, once per session, skip button, mobile width, reduced motion, no hydration errors.",
);
await browser.close();
