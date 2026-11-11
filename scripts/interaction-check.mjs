import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (message) => {
  if (/hydration|hydrated|server rendered/i.test(message.text())) errors.push(message.text());
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Close admission enquiry" }).click();
await page.waitForTimeout(1200);
await page.screenshot({ path: "scripts/hero-desktop.png" });
for (let y = 0; y < 8500; y += 650) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(100);
}
await page.waitForTimeout(1000);
await page.screenshot({ path: "scripts/home-complete.png", fullPage: true });
await page.evaluate(() => window.scrollTo(0, 0));
await page.getByRole("button", { name: "Explore Academics", exact: true }).click();
assert(
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Explore all schools", exact: true })
    .isVisible(),
);
await page.keyboard.press("Escape");
await page.goto("http://127.0.0.1:5173/programs", { waitUntil: "networkidle" });
await page.getByRole("textbox", { name: "Search programs" }).fill("BBA");
assert((await page.locator(".program-result").count()) >= 2);
await page.getByRole("textbox", { name: "Search programs" }).fill("zzzzzz");
assert(await page.getByText("No matching programs", { exact: true }).isVisible());
await page.getByRole("button", { name: "Clear filters" }).click();
await page.getByRole("button", { name: "Postgraduate", exact: true }).click();
assert((await page.locator(".program-result").count()) > 0);
await page.locator(".program-result").first().click();
assert(await page.getByText("Published duration", { exact: true }).isVisible());
await page.goto("http://127.0.0.1:5173/admissions/admission-enquiry", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Review enquiry" }).click();
assert(!(await page.getByText("Your enquiry draft is ready.", { exact: true }).isVisible()));
await page.getByLabel("Full name *").fill("Demo Visitor");
await page.getByLabel("Email address *").fill("demo@example.com");
await page.getByLabel("Mobile number *").fill("9876543210");
await page.getByLabel("Area of interest *").selectOption({ index: 1 });
await page.getByLabel("Program level *").selectOption("Undergraduate");
await page.getByLabel("Your message *").fill("Please share verified program information.");
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Review enquiry" }).click();
assert(await page.getByText("Your enquiry draft is ready.", { exact: true }).isVisible());
assert(await page.getByText("Demo Visitor", { exact: true }).isVisible());
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Download draft" }).click();
assert.equal((await downloadPromise).suggestedFilename(), "tsm-enquiry-draft.json");
await page.getByRole("button", { name: "Edit details" }).click();
assert.equal(await page.getByLabel("Full name *").inputValue(), "Demo Visitor");
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  assert(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "overflow at " + width,
  );
  if (width === 390) {
    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    await page.getByRole("button", { name: "Explore Admissions", exact: true }).click();
    await page.getByRole("link", { name: "Admission Enquiry", exact: true }).click();
    assert(page.url().includes("admission-enquiry"));
    await page.screenshot({ path: "scripts/enquiry-mobile.png", fullPage: true });
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.screenshot({ path: "scripts/hero-mobile.png" });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://127.0.0.1:5173/about", { waitUntil: "networkidle" });
assert(await page.locator("h1").isVisible());
assert.deepEqual(errors, []);
console.log(
  "PASS: program search, filters, details, form validation and review, mobile navigation, desktop mega-menu, 5 viewport overflow checks, no browser errors.",
);
await browser.close();
