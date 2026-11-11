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
const gallery = page.getByRole("region", { name: "Life at TSM. Beyond the classroom." });
await gallery.waitFor();
assert.equal(await gallery.locator(".campus-gallery-card").count(), 9);
const bounds = await gallery.evaluate((el) => ({
  top: el.getBoundingClientRect().top + scrollY,
  height: el.getBoundingClientRect().height,
}));
for (let y = bounds.top; y < bounds.top + bounds.height; y += 500) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(80);
}
await page.waitForTimeout(1000);
await gallery.locator(".campus-gallery-card").first().scrollIntoViewIfNeeded();
await page.mouse.move(1, 1);
const card = gallery.locator(".campus-gallery-card").first();
const original = await card.locator("clipPath path").getAttribute("d");
await card.hover({ force: true });
await page.waitForTimeout(650);
const changed = await card.locator("clipPath path").getAttribute("d");
assert.notEqual(changed, original, "Wave shape should change on hover");
await gallery.screenshot({ path: "scripts/campus-masonry-desktop.png" });
await page.mouse.move(1, 1);
await page.waitForTimeout(550);
assert.equal(await card.locator("clipPath path").getAttribute("d"), original);
assert(
  await gallery
    .locator("img")
    .evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)),
);
assert.equal(
  await gallery.locator(".campus-masonry-grid").evaluate((el) => getComputedStyle(el).columnCount),
  "3",
);
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(150);
  assert(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "overflow " + width,
  );
}
await page.setViewportSize({ width: 390, height: 844 });
await gallery.screenshot({ path: "scripts/campus-masonry-mobile.png" });
assert.equal(
  await gallery.locator(".campus-masonry-grid").evaluate((el) => getComputedStyle(el).columnCount),
  "1",
);
const library = gallery.getByRole("link", { name: "Explore: Make room for a new perspective." });
await library.click();
await page.waitForURL("**/academics/library");
assert(await page.locator("h1").isVisible());
const reduced = await browser.newPage({ reducedMotion: "reduce" });
reduced.on("pageerror", (e) => errors.push(e.message));
reduced.on("console", (m) => {
  if (/hydration|hydrated/i.test(m.text())) errors.push(m.text());
});
await reduced.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await reduced.getByRole("button", { name: "Close admission enquiry" }).click();
const staticCard = reduced.locator(".campus-gallery-card").first();
await staticCard.scrollIntoViewIfNeeded();
const before = await staticCard.locator("clipPath path").getAttribute("d");
await staticCard.hover({ force: true });
await reduced.waitForTimeout(600);
assert.equal(await staticCard.locator("clipPath path").getAttribute("d"), before);
assert.deepEqual(errors, []);
console.log(
  "PASS: nine official photos, 3-column masonry, liquid edge hover/reset, all images loaded, mobile 1-column, five viewport widths, library link, reduced motion, no hydration errors.",
);
await browser.close();
