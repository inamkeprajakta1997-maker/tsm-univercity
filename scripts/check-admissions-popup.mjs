import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (m) => {
  if (/hydration|hydrated/i.test(m.text())) errors.push(m.text());
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "domcontentloaded" });
const popup = page.getByRole("dialog", { name: "Admissions 2026" });
await popup.waitFor({ state: "visible" });
assert.equal(await page.locator("[data-opening-intro]").count(), 0);
assert.equal(await popup.getByRole("link", { name: /login|register/i }).count(), 0);
await page.screenshot({ path: "scripts/admissions-popup-desktop.png" });
await popup.getByRole("button", { name: "Submit enquiry" }).click();
assert.equal(await popup.getByText("Your enquiry draft is ready.", { exact: true }).count(), 0);
await popup.getByLabel("Name *", { exact: true }).fill("Demo Visitor");
await popup.getByLabel("Email *", { exact: true }).fill("demo@example.com");
await popup.getByLabel("Mobile number *", { exact: true }).fill("9876543210");
await popup.getByLabel("State / Union territory *").selectOption("Uttar Pradesh");
await popup.getByRole("combobox", { name: /^City/ }).selectOption("Lucknow");
await popup.getByLabel("State / Union territory *").selectOption("Maharashtra");
assert.equal(await popup.getByRole("combobox", { name: /^City/ }).inputValue(), "");
await popup.getByLabel("State / Union territory *").selectOption("Uttar Pradesh");
await popup.getByRole("combobox", { name: /^City/ }).selectOption("Lucknow");
await popup.getByRole("combobox", { name: /^Programme/ }).selectOption("Undergraduate");
await popup.getByRole("combobox", { name: /^Course/ }).selectOption("MBBS");
await popup.getByRole("button", { name: "Refresh verification sum" }).click();
assert(await popup.getByLabel("What is 8 plus 7?").isVisible());
await popup.getByLabel("Verification answer *").fill("0");
await popup.getByRole("checkbox").check();
await popup.getByRole("button", { name: "Submit enquiry" }).click();
assert(await popup.getByRole("alert").isVisible());
await popup.getByLabel("Verification answer *").fill("15");
await popup.getByRole("button", { name: "Submit enquiry" }).click();
assert(await popup.getByText("Your enquiry draft is ready.", { exact: true }).isVisible());
assert(await popup.getByText("Demo Visitor", { exact: true }).isVisible());
const download = page.waitForEvent("download");
await popup.getByRole("button", { name: "Download draft" }).click();
assert.equal((await download).suggestedFilename(), "tsm-admission-enquiry-draft.json");
await popup.getByRole("button", { name: "Edit enquiry" }).click();
assert.equal(await popup.getByLabel("Name *", { exact: true }).inputValue(), "Demo Visitor");
await page.keyboard.press("Escape");
await popup.waitFor({ state: "hidden" });
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
const mobilePopup = mobile.getByRole("dialog", { name: "Admissions 2026" });
await mobilePopup.waitFor({ state: "visible" });
await mobile.screenshot({ path: "scripts/admissions-popup-mobile.png" });
for (const width of [320, 390, 768, 1440]) {
  await mobile.setViewportSize({ width, height: 900 });
  await mobile.waitForTimeout(100);
  assert(
    await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "page overflow " + width,
  );
  assert(
    await mobilePopup.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    "modal overflow " + width,
  );
}
await mobilePopup.getByRole("button", { name: "Close admission enquiry" }).click();
await mobilePopup.waitFor({ state: "hidden" });
assert.deepEqual(errors, []);
console.log(
  "PASS: popup follows intro, exact enquiry fields, dependent city/course lists, validation, refreshed sum, draft download/edit, close/Escape, 4 viewport widths, reduced motion, no login/register or hydration errors.",
);
await browser.close();
