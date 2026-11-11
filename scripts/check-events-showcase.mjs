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
const stage = page.getByRole("region", { name: "College event highlights" });
await stage.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
assert.equal(await page.locator(".events-pagination button").count(), 4);
assert.equal(await stage.locator(".events-active-card h3").innerText(), "Plexus 2025");
await page.locator("#events").screenshot({ path: "scripts/events-carousel-desktop.png" });
await stage.getByRole("button", { name: "Next college event" }).click();
await page.waitForTimeout(650);
assert.equal(
  await stage.locator(".events-active-card h3").innerText(),
  "National Cricket Tournament",
);
await stage.getByRole("button", { name: "Previous college event" }).click();
await page.waitForTimeout(650);
assert.equal(await stage.locator(".events-active-card h3").innerText(), "Plexus 2025");
await page.getByRole("button", { name: "Show event 3: Diwali Utsav 2025" }).click();
await page.waitForTimeout(650);
assert.equal(await stage.locator(".events-active-card h3").innerText(), "Diwali Utsav 2025");
await stage.focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(650);
assert.equal(await stage.locator(".events-active-card h3").innerText(), "CodeCraft 2.0");
const problems = [];
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(150);
  const metrics = await stage
    .locator(".events-active-card .event-postcard")
    .evaluate((el) => ({
      width: el.clientWidth,
      scrollWidth: el.scrollWidth,
      height: el.clientHeight,
      scrollHeight: el.scrollHeight,
    }));
  if (metrics.scrollWidth > metrics.width + 2 || metrics.scrollHeight > metrics.height + 2)
    problems.push({ width, metrics });
  assert(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "page overflow " + width,
  );
}
assert.deepEqual(problems, []);
await page.setViewportSize({ width: 390, height: 844 });
await stage.scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Show event 1: Plexus 2025" }).click();
await page.waitForTimeout(650);
const box = await stage.boundingBox();
const y = Math.min(550, Math.max(160, box.y + 220));
await page.mouse.move(box.x + box.width * 0.8, y);
await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.2, y, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(700);
assert.equal(
  await stage.locator(".events-active-card h3").innerText(),
  "National Cricket Tournament",
);
await page.locator("#events").screenshot({ path: "scripts/events-carousel-mobile.png" });
const target = await stage.locator(".event-story-link").getAttribute("href");
await stage.locator(".event-story-link").click();
await page.waitForURL("**" + target);
assert(await page.locator("h1").isVisible());
assert.deepEqual(errors, []);
console.log(
  "PASS: four official event cards, arrows, numbered selection, keyboard, swipe, event-detail navigation, no card clipping or page overflow at five widths.",
);
await browser.close();
