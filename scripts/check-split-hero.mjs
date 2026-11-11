import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (/hydration|hydrated/i.test(m.text())) errors.push(m.text());
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Close admission enquiry" }).click();
await page.mouse.move(1, 1);
await page.waitForTimeout(800);
assert.equal(await page.locator(".split-hero-panel").count(), 3);
assert.equal(await page.locator(".split-hero-panel.is-active").count(), 0);
await page.getByRole("button", { name: "Preview Academics", exact: true }).hover({ force: true });
await page.waitForTimeout(850);
let panels = await page
  .locator(".split-hero-panel")
  .evaluateAll((es) =>
    es.map((e) => ({
      width: e.getBoundingClientRect().width,
      active: e.classList.contains("is-active"),
      filter: getComputedStyle(e.querySelector("img")).filter,
    })),
  );
assert(panels[0].active);
assert(panels[0].width > panels[1].width * 1.7);
assert(panels[0].filter.includes("grayscale(0)"));
await page.screenshot({ path: "scripts/split-hero-desktop.png" });
await page.getByRole("button", { name: "Preview Events", exact: true }).hover({ force: true });
await page.waitForTimeout(850);
assert(await page.getByRole("link", { name: "View news & events", exact: true }).isVisible());
assert.equal(
  await page.getByRole("link", { name: "View news & events", exact: true }).getAttribute("href"),
  "/news",
);
await page.mouse.move(1, 1);
await page.waitForTimeout(100);
await page.getByRole("button", { name: "Preview Campus Life", exact: true }).focus();
assert.equal(
  await page
    .getByRole("button", { name: "Preview Campus Life", exact: true })
    .getAttribute("aria-expanded"),
  "true",
);
await page.keyboard.press("Escape");
assert.equal(
  await page
    .getByRole("button", { name: "Preview Campus Life", exact: true })
    .getAttribute("aria-expanded"),
  "false",
);
for (const width of [320, 390, 768, 1024, 1340, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(150);
  assert(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "overflow " + width,
  );
}
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  reducedMotion: "reduce",
});
await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Close admission enquiry" }).click();
await mobile.getByRole("button", { name: "Preview Campus Life", exact: true }).tap();
assert.equal(
  await mobile
    .getByRole("button", { name: "Preview Campus Life", exact: true })
    .getAttribute("aria-expanded"),
  "true",
);
await mobile.locator(".split-hero").screenshot({ path: "scripts/split-hero-mobile.png" });
await mobile.getByRole("link", { name: "Discover campus life", exact: true }).click();
await mobile.waitForURL("**/student-life");
assert(await mobile.locator("h1").isVisible());
assert.deepEqual(errors, []);
console.log(
  "PASS: three expanding panels, colour reveal, width transition, desktop hover, keyboard/Escape, mobile tap/link, six responsive widths, intro/enquiry preserved, no runtime/hydration errors.",
);
await browser.close();
