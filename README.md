# T.S. Mishra University - public website demo

A responsive university redesign with an blue, golden-yellow, and white design system matching the TSM Nursing / Paramedical College palette, authentic campus photography, and 165 public routes.

## Run locally

```sh
npm install
npm run dev
```

For the verification scripts, start the server on port 5173:

```sh
npm run dev -- --port 5173
npm run test:routes
npm run test:browser
```

The browser checks use the Microsoft Edge installation on Windows through Playwright. No submission is sent to the university by these checks.

```sh
npx tsc --noEmit
npm test
npm run build
```

The existing Lovable React/TypeScript/Vite/Tailwind and TanStack Start routing scaffold is preserved. GSAP/ScrollTrigger, Framer Motion, Lenis, and Lucide provide motion and interactions. Pages load in separate route chunks. Generated routing files are maintained by the router plugin.

## Included

- Cinematic homepage with two campus views, eight schools, academic pathways, campus life, research, hospital facts, news, testimonials, and admissions.
- About, administration, governance, admissions, student life, academic resources, hospital, and contact pages.
- 64 published course entries with searchable program finder, level filters, individual program pages, and school-specific course navigation.
- 12 archive news stories with official event photography.
- Responsive dropdown navigation, mobile menu, keyboard controls, skip link, back-to-top, and reduced-motion support.
- Validated admission, contact, and student feedback forms with a review state and downloadable draft. Details remain in component memory and disappear on reload; nothing is delivered or stored by a backend.
- Official PDF/resource links, verified contact links, map embed, page-specific metadata, sitemap, and redirects for mapped original .aspx URLs.

## Content and sources

Primary source: https://tsm.edu.in/ (reviewed 11 November 2026). School and hospital links also lead to their official sites. Every content record retains its official source URL in `src/data/university.json` or `src/data/programs.json`. The university logo and campus/event photographs were obtained from the official university assets; no campus or faculty photographs were generated.

News is presented as an archive, with published dates. Directory entries and hospital figures reflect the university's published information and should be confirmed before an official launch. Scholarship details, current hospital doctors/departments/facilities directories, and other unavailable material are explicitly marked for confirmation or linked to the maintained official resource. Fees, rankings, placement rates, and unverified faculty information have not been invented.

Visual references informed the direction only: Barton G, Hello Monday, and Digital Silk. Their branding and layouts were not copied.

## Maintain and publish

- Content: `src/data/university.json`, `src/data/programs.json`.
- Original URL mappings: `src/data/redirects.json`.
- Components: `src/components/university/`.
- Design and responsive rules: `src/styles.css`.
- Regenerate sitemap and the route-check manifest: `npm run sitemap`. Set `SITE_URL` to the actual deployment origin before generating a deployment sitemap; its default is the requested university domain.
- This change is local and has not been published to the live university or Lovable site. Connect a submission service through Lovable before enabling delivery of forms. Never add secrets to browser code or the repository.

Lovable project: https://lovable.dev/projects/258350c5-0c20-4e85-af57-61cdc8ce6929
Existing published app: https://tsm-campus-compass.lovable.app (not updated by these local changes).

Colour reference: https://tsmnpc.tsm.edu.in/ (primary blue #195C90, golden yellow #F5BB29, and white). Premium typography uses Public Sans headings and Manrope body text. Social shortcuts retain their brand colours, including the user-provided WhatsApp image.

Opening intro: an original line-art student animation is followed by the official university logo and a curved page reveal. The CSS timeline is 1.6 seconds, runs once per browser tab session, supports Skip intro / Escape, and is skipped for reduced motion. It never waits for a video, fonts, or data requests. The logo uses the original 438 x 134 image at a smaller display size without blur filters. To replay during development, clear the tsm-opening-intro-v1 sessionStorage entry and reload. Browser verification: node scripts/check-intro.mjs.


Homepage enquiry popup: opens 350 ms after the opening intro completes (or is skipped). It includes an authentic campus image; name, email, mobile, state/union territory, city, programme, and course fields; a refreshable arithmetic verification; and consent. State and programme selections reset their dependent fields. Other city supports locations outside the suggested list. The accessible dialog supports focus trapping, Escape, outside-click and close-button dismissal, a compact responsive layout without an internal form scrollbar, and reduced motion. It has no login or registration. Successful validation produces an explicitly unsent draft with download and edit options. Browser checks: node scripts/check-admissions-popup.mjs.


Popup layout update: removed the two requested introductory/demo lines from the initial form. A screen-reader-only dialog description remains. The form is sized to fit the viewport without scrolling; very short landscape screens use a compact layout. Other city is entered in the existing city field. Verified nine viewport sizes with scripts/check-popup-fit.mjs.

Heading typography: Public Sans, using upright semibold/bold weights throughout the homepage, inner pages, cards, and enquiry popup. Decorative italic headings were removed. Reference: https://www.albany.edu/style-guide/fonts. Font loading, five page widths, and nine non-scrolling popup sizes were checked.

Events showcase: the homepage #events section uses an original blue-and-gold postcard carousel inspired by the supplied recording. Four published university events feature authentic event photos, paper borders, a clip detail, subtle photo sway, and directional slide transitions. Previous/next buttons, numbered selection, keyboard arrows, and touch drag link through to existing event details. Reduced motion disables decorative movement. Full news remains available at /news. Verification: node scripts/check-events-showcase.mjs.

Event carousel auto-slide: advances every 5 seconds while the section is visible. Pause/Play controls are provided. Mouse hover, keyboard focus, dragging, hidden browser tabs, and leaving the section pause the timer; manual navigation restarts the interval. Reduced-motion preferences disable autoplay and decorative animation. Timer verification: node scripts/check-events-autoplay.mjs.


Homepage hero update: replaced the two-image banner with three angled, hover-expanding panels for Academics, Campus Life, and Events. Inactive images are monochrome; the active panel expands and reveals a colour photo, description, and a working page link. Keyboard focus and Escape work; mobile uses stacked tap-to-preview panels and separate navigation links. The intro, enquiry popup, and header Apply Now remain. Verification: node scripts/check-split-hero.mjs.

Official hero photographs: the Academics, Campus Life, and Events panels now use a university laboratory photograph, campus kabaddi photograph, and student face-painting activity photograph, found through image search and downloaded from official TSM/ERP sources. Original dimensions are 1512x1006, 2400x1500, and 1080x1080. Optimized WebP files and descriptive alt text are used; source URLs are retained in src/data/hero-image-sources.json.

Campus Life gallery: the homepage #campus-life section now uses a nine-photo masonry layout between Why Choose TSM and the hospital section. Desktop uses three staggered columns, tablet two, and mobile one. On hover/focus, an SVG clipping path gives photograph edges a subtle liquid wave; reduced motion keeps them still. Each photo links to its relevant university page. Five additional official photographs are documented in src/data/campus-gallery-image-sources.json. Verification: node scripts/check-campus-gallery.mjs.
