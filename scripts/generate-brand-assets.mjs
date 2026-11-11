import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const logoPath = join(publicDir, "images", "logo.png");
const campusPath = join(publicDir, "images", "campus-hero.webp");

const crest = await sharp(logoPath)
  .extract({ left: 12, top: 20, width: 96, height: 96 })
  .resize(76, 76, { fit: "contain" })
  .png()
  .toBuffer();
const favicon = await sharp({
  create: { width: 96, height: 96, channels: 4, background: "#0d598b" },
})
  .composite([{ input: crest, left: 10, top: 10 }])
  .png()
  .toBuffer();

await writeFile(join(publicDir, "favicon.png"), favicon);
const iconPng = await sharp(favicon).resize(64, 64).png().toBuffer();
const iconHeader = Buffer.alloc(22);
iconHeader.writeUInt16LE(0, 0); // reserved
iconHeader.writeUInt16LE(1, 2); // icon resource
iconHeader.writeUInt16LE(1, 4); // one image
iconHeader.writeUInt8(64, 6);
iconHeader.writeUInt8(64, 7);
iconHeader.writeUInt8(0, 8); // no palette
iconHeader.writeUInt8(0, 9);
iconHeader.writeUInt16LE(1, 10); // color planes
iconHeader.writeUInt16LE(32, 12);
iconHeader.writeUInt32LE(iconPng.length, 14);
iconHeader.writeUInt32LE(iconHeader.length, 18);
await writeFile(join(publicDir, "favicon.ico"), Buffer.concat([iconHeader, iconPng]));

const overlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="panel" x1="0" x2="1">
      <stop offset="0" stop-color="#082d49" stop-opacity=".99"/>
      <stop offset=".58" stop-color="#0d4268" stop-opacity=".94"/>
      <stop offset=".82" stop-color="#0d4268" stop-opacity=".38"/>
      <stop offset="1" stop-color="#0d4268" stop-opacity=".08"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset=".55" stop-color="#082d49" stop-opacity="0"/>
      <stop offset="1" stop-color="#082d49" stop-opacity=".48"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#panel)"/>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="68" y="70" width="440" height="146" rx="3" fill="#fff"/>
  <rect x="68" y="70" width="7" height="146" fill="#f5bb29"/>
  <text x="78" y="280" fill="#ffd05a" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="4">TSM  ·  LUCKNOW, INDIA</text>
  <text x="74" y="370" fill="#fff" font-family="Arial, sans-serif" font-size="58" font-weight="700">Shape your future.</text>
  <text x="75" y="438" fill="#ffd05a" font-family="Georgia, serif" font-size="48" font-style="italic">Inspire the world.</text>
  <text x="78" y="500" fill="#e1edf5" font-family="Arial, sans-serif" font-size="21">Explore programmes, campus life and admissions.</text>
  <rect x="78" y="544" width="74" height="5" rx="2.5" fill="#f5bb29"/>
</svg>`);
const logo = await sharp(logoPath).resize({ width: 400, height: 134, fit: "inside" }).png().toBuffer();
const background = await sharp(campusPath)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 88, top: 76 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();
await writeFile(join(publicDir, "og-university.jpg"), background);
