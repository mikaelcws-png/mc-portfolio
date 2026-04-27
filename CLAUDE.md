# Mikael Cheung Portfolio — Project Guide

Personal portfolio site for Mikael Cheung, UX/product designer based in Toronto.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js (App Router) | Framework — `output: 'export'` → static site |
| Framer Motion | Animations |
| CSS Modules | Component-level styles (co-located `.module.css` files) |
| CSS custom properties | Design tokens in `src/styles/globals.css` |
| Inter (next/font/google) | Primary sans-serif — self-hosted at build time, zero FOUT |
| Instrument Serif (next/font/google) | Display serif — hero headline, About headings, case study h1 + h2s |
| Vercel | Deployment |
| JavaScript | No TypeScript |

---

## Project Structure

```
Portfolio/
├── public/
│   ├── images/
│   │   ├── about/           ← Photos for the About Me page
│   │   └── case-studies/    ← Cover images for case study cards
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js        ← Root layout: loads Inter + Instrument Serif, globals.css, wraps Nav + Footer
│   │   ├── page.js          ← Homepage
│   │   ├── about/page.js    ← About Me (horizontal snap-scroll)
│   │   ├── automate/page.js ← Case study stub
│   │   ├── cozey/page.js    ← Case study stub
│   │   └── itinera/page.js  ← Case study stub
│   ├── components/
│   │   ├── Nav/             ← Nav.js + Nav.module.css
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── CaseStudyCard/
│   │   ├── CaseStudyGrid/
│   │   ├── PhotoCard/
│   │   ├── Highlight/       ← Inline peach-tinted text emphasis span
│   │   ├── AboutSection/    ← Horizontal snap-scroll container (highest complexity)
│   │   └── CaseStudyStub/   ← Shared placeholder for unbuilt case studies
│   └── styles/
│       └── globals.css      ← All design tokens + base reset
├── next.config.mjs
├── netlify.toml
└── jsconfig.json            ← @/* maps to src/*
```

**Conventions:**
- Each component lives in its own folder with a co-located CSS Module: `ComponentName/ComponentName.js` + `ComponentName/ComponentName.module.css`
- All styling values come from CSS custom properties in `globals.css` via `var(--token-name)` — do not hardcode colors, spacing, or radii
- Any component using React hooks (`useScroll`, `useState`, etc.) must be marked `'use client'` at the top

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#F4F6F3` | Page background (sage-tinted off-white) |
| `--color-surface` | `#FFFFFF` | Cards, nav pill background |
| `--color-accent` | `#3A5635` | "MC" logo, links, active states |
| `--color-text-primary` | `#111111` | Headings and body copy |
| `--color-text-secondary` | `#525C50` | Muted labels, nav links at rest |
| `--color-highlight-bg` | `rgba(58,86,53,0.10)` | Inline text highlight sage wash |
| `--color-white` | `#ffffff` | Pure white — card text on dark/image backgrounds |
| `--color-white-muted` | `rgba(255,255,255,0.8)` | Muted white — secondary text on dark/image backgrounds |

### Typography

- **Sans-serif:** Inter, loaded via `next/font/google`, CSS variable `--font-inter` → used as `--font-sans`
- **Serif:** Instrument Serif, loaded via `next/font/google` with `normal` + `italic` styles, CSS variable `--font-instrument-serif` → used as `--font-serif`
- **Inter weights:** 400 (regular), 500 (medium), 700 (bold)
- **Instrument Serif:** weight 400 only; always rendered `font-style: italic` in this project

**Where `--font-serif` is used:**
- `Hero` — full headline, `font-size: clamp(1rem, 4.2vw, 3rem)` (16px–48px), forced 2-line split via `display: block` spans. Marked `'use client'`. Each word animates in with a bottom-to-top slide (`y: 16 → 0`) + fade, staggered at 70ms per word, 0.35s per-word duration, `cubic-bezier(0.4, 0, 0.2, 1)` easing — full sentence completes in ~0.98s.
- `AboutSection` — all panel headings (`.heading` class)
- `CaseStudyHero` — `.title` (case study name)
- `CaseStudySection` — all `h2` section headings

| Token | Value |
|---|---|
| `--text-xs` | 0.75rem (12px) |
| `--text-sm` | 0.875rem (14px) |
| `--text-base` | 1rem (16px) |
| `--text-lg` | 1.125rem (18px) |
| `--text-xl` | 1.25rem (20px) |
| `--text-2xl` | 1.5rem (24px) |
| `--text-3xl` | 2rem (32px) |
| `--text-4xl` | 2.5rem (40px) |
| `--text-5xl` | 3.5rem (56px) — hero display |

### Spacing

8-point scale: `--space-1` (4px) → `--space-24` (96px). Full list in `globals.css`.

### Shape & Shadow

```css
--radius-sm:   8px;
--radius-md:   16px;
--radius-lg:   24px;    /* card outer */
--radius-pill: 100px;   /* nav */
--radius-img:  18px;    /* image inside card */

--shadow-card:       0 8px 40px rgba(0,0,0,0.08);
--shadow-nav:        0 4px 24px rgba(0,0,0,0.06);
--shadow-card-hover: 0 16px 56px rgba(0,0,0,0.13);
```

### Background & Texture

- Page background: `#F9F7F4` (no grid lines — previously used `linear-gradient` grid, now removed)
- Noise texture: `body::after` fixed layer, SVG `feTurbulence` filter at 7% opacity, `background-size: 200px 200px`, `pointer-events: none`, `z-index: 9999` — applies globally over all pages and sections

### Motion

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;
```

### Layout

```css
--max-width-content: 1200px;
--page-gutter: clamp(1.5rem, 5vw, 4rem);
```

---

## Pages

### Homepage (`/`)
Hero → Case study grid (AutoMate, Cozey, Itinera) → Footer.

Hero copy: *"I'm Mikael, and I overthink / so you don't have to."* — forced 2-line break via two `<span className={styles.line}>` blocks (`display: block; white-space: nowrap`). Full sentence in Instrument Serif italic. Font scales via `clamp(1rem, 4.2vw, 3rem)` (16px–48px) to stay 2 lines at all viewport widths.

Each word is wrapped in a `<motion.span>` (inside a `<Fragment>` with a trailing `{' '}` for natural spacing). Words animate bottom-to-top (`y: 16 → 0`) with fade-in, staggered at 70ms per word, 0.35s duration each, `cubic-bezier(0.4, 0, 0.2, 1)` ease — all 10 words complete in ~0.98s. `Hero` is marked `'use client'`.

### About Me (`/about`)
Three sections that snap horizontally. Each section is `100vw` wide. CSS `scroll-snap-type: x mandatory` handles the snap; Framer Motion `useScroll({ container: ref, axis: 'x' })` drives content animations.

Layout per section:
- Panel 1: text left, photo right — h1: *"Honestly? I have never thought of being a designer"* — photo: `public/images/about/panel 1 image.png`
- Panel 2: photo left, text right — h2: *"Design is just understanding people, with a screen in between."* — photo: `public/images/about/panel 2 image.png`
- Panel 3: text left, photo right — h2: *"When I'm not designing?"* — photo: `public/images/about/panel 3 image.png`

All panel headings use Instrument Serif italic via the `.heading` class in `AboutSection.module.css`.

### Case Studies
AutoMate, Cozey, Itinera — each page uses `CaseStudySection` to structure content with optional visuals. Visuals can be:
- **Images** via `VisualBlock` component (Figma exports, product screenshots)
- **React components** for structured/data-driven visuals (see "React-based Visuals" below)

**Typography conventions in case studies:**
- Case study name (`CaseStudyHero` `.title`): Instrument Serif italic, `--text-4xl`, weight 400
- Section headings (`h2` inside `CaseStudySection`): Instrument Serif italic, `--text-3xl`, weight 400
- Sub-headings (`h3`, `h4`): Inter medium, `--text-base`, weight 500 — with `margin-top: --space-4` for breathing room
- Body copy: Inter regular, `--text-base`
- AutoMate context section heading: "TL;DR"

---

## Component Notes

**`Nav`** — Floating pill, `position: fixed`, centered with `width: fit-content; margin: 0 auto`. "MC" in `--color-accent` on left, links on right.

**`PhotoCard`** — White card (`--color-surface`, `--radius-lg`, `--shadow-card`) containing an image with `--radius-img`. Can have a subtle `rotate` CSS transform for the "floating photo" aesthetic.

**`Highlight`** — Inline `<span>` with `background: var(--color-highlight-bg)` and `border-radius: 4px`. Used in headings for sage emphasis.

**`AboutSection`** — Mark `'use client'`. Set `overflow-x: scroll; scroll-snap-type: x mandatory; scrollbar-width: none` on the container. Pass a `ref` to `useScroll({ container: ref, axis: 'x' })` for scroll-driven animations.

**`CaseStudyCard`** — Use Framer Motion `whileHover={{ y: -4, boxShadow: '...' }}` for the lift effect.

**`CaseStudySection`** — Accepts either `visual` (VisualBlock props) or `visualNode` (React component) to render custom visuals alongside text. Use `visualNode` for data-driven charts, diagrams, and structured layouts that benefit from being live components.

**`VisualBlock`** — Props: `type` (`'image'` | `'image-grid'` | `'video'` | `'embed'`), `src`, `alt`, `caption`, `items`, `aspectRatio` (default `'16/9'`), `natural` (boolean, default `false`), `noShadow` (boolean, default `false`). When `natural={true}`, the image renders at its intrinsic proportions (`height: auto`, no aspect-ratio box) — use this for diagrams, wireframes, and screenshots where cropping would hide content. When `noShadow={true}`, the drop shadow is removed from the image or wrapper — use this for images that already have a transparent or designed background. Styled with `--radius-lg` and `--shadow-card` by default.

---

## React-based Visuals

For structured, data-driven visuals (process diagrams, persona cards, charts, stats) that don't require freeform illustration, build them as React components instead of exporting from Figma. This keeps them on-brand automatically and makes content updates easier.

**Pattern:**
1. Create component in `src/components/ComponentName/` with `.js` and `.module.css`
2. Build with design tokens (`--color-accent`, `--text-sm`, etc.)
3. Use `'use client'` if using Framer Motion or React hooks
4. Pass data as props with sensible defaults
5. Wire into case study via `visualNode={<ComponentName />}` on `CaseStudySection`

**Example: `FunnelChart`** (`src/components/FunnelChart/`)
- Renders a descending funnel with y-axis gridlines, bar labels, drop-off callouts
- Props: `steps` (array of {step, label, value}), `dropOffs` (array of {startIndex, label}), `caption`
- Defaults to AutoMate inspection checkout flow
- Animates on scroll using Framer Motion `useInView`; bars scale from 0 to their value with staggered timing
- Responsive: bars scale with viewport; drop-off badge offset increases at `1200px` breakpoint

---

## Build & Deploy

```bash
npm run dev      # local dev at localhost:3000
npm run build    # builds to /out (static export)
```

Deploy by connecting the GitHub repo to Vercel. No server-side features are used.

---

## Images & Visual Assets

### Image Files (`public/images/case-studies/`)

**AutoMate** (✓ all present)
- `automate-cover.png` — hero cover image
- `automate-company.png` — AutoMate logo (used in Company section via `visualNode` with `maxHeight: 260px`, `objectFit: contain`, no shadow)
- `automate-problem-2.png` — list view UX problem screenshot (`natural`, `noShadow`)
- `automate-problem-3.png` — payment page trust problem screenshot (`natural`, `noShadow`)
- `automate-solution-lofi.png` — lo-fi prototype wireframes for early concept (Solution section, `natural`, `noShadow`, full-width via `text-full-visual` visualNode)
- `automate-final-location.png` — map view final design (Final Result section, `natural`, `noShadow`)
- `automate-final-payment.png` — deposit checkout final design (Final Result section, `natural`, `noShadow`)
- `Norris.png`, `Jennifer.png` — AutoMate persona photos

**Cozey** (✓ all present)
- `cozey-cover.png` — hero cover image
- `cozey-company.png` — modular sofa product overview (Company section, `text-side-visual`, no caption)
- `cozey-problem-1.png` — average apartment sizes graphic (Problem section, right col of `.problemIntroGrid`, `natural`, with `--shadow-card`, caption "Average apartment size" centered, white card wrapper with 16px padding)
- `cozey-current-state-2.png` — current state website screenshots (Problem section, right col of `.currentStateGrid`, rendered via `ZoomImage` — click to expand)
- `cozey-competitive.png` — competitive analysis table (Problem section, right col of `.currentStateGrid`, rendered via `ZoomImage` — click to expand)
- `cozey-solution-1.png` — scenario-based visualization concept (Solution section, left col of `.solutionImageGrid`)
- `cozey-solution-2.png` — customer stories & social proof concept (Solution section, right col of `.solutionImageGrid`)
- ~~`cozey-testing.png`~~ — removed from User Testing section

**Itinera** (✓ all present)
- `itinera-cover.png` — hero cover image
- `itinera-user-flow.png` — user flow diagram (Solution section, `natural` prop)
- `itinera-function-map.png` — functional map (Solution section, `natural` prop)
- `itinera-lofi.png` — low-fidelity prototype wireframes (User Testing section, `natural` prop)
- `itinera-testing.png` — user testing session photo (User Testing section, right col of `.testingLayout`, `natural` prop)
- `itinera-ai-personalized.png` — AI personalized itinerary screens (Final Result section, `natural` prop)
- `itinera-itinerary-detail.png` — itinerary detail screens (Final Result section, `natural` prop)
- `itinera-profile.png` — profile screens (Final Result section, `natural` prop)
- `itinera-explore.png` — explore and blog screens (Final Result section, `natural` prop)
- `William.png`, `laura.png` — Itinera persona photos
- ~~`itinera-journey-william.jpg`~~ — replaced by `JourneyMap` React component
- ~~`itinera-journey-laura.jpg`~~ — replaced by `JourneyMap` React component

### React Components (built in code → `src/components/`)
Build these as live React components using design tokens:

**AutoMate**
- `FunnelChart` — drop-off funnel / analytics breakdown (✓ done). Placed inline inside the `#problem` section's `text-only` layout, immediately after the first paragraph. Has `margin: var(--space-10) 0` for breathing room above and below.
- `PersonaCard` (variant="automate") — Norris Chung and Jennifer Kwan persona cards (✓ done) — reuses the `PersonaCard` component from Itinera via a `variant` prop. AutoMate variant renders: photo (full card height) + demographics grid + quote in top row; Goals / Pain Points / Current Solution / Interests in a 2×2 grid below. Photos at `public/images/case-studies/Norris.png` and `Jennifer.png`. Followed by a 3-column peach common-ground block with emoji + text + left-aligned caption.

**Shared utilities**
- `ZoomImage` (`src/components/ZoomImage/`) — `'use client'` component. Renders an `<img>` with `cursor: zoom-in`; clicking opens a full-screen fixed overlay (`z-index: 10000`, dark bg) with the full image centered. Click overlay to close. Props: `src`, `alt`, `className`. Used in Cozey `#problem` section for `cozey-current-state-2.png` and `cozey-competitive.png`.
- **`VisualBlock` caption** — globally right-aligned (`text-align: right`) in `VisualBlock.module.css`.

**Cozey**
- `CozeyEmotionChart` — emotion/sentiment curve showing the customer journey on the Cozey product page (✓ done). Renders in the `#problem` section. SVG cubic bezier curve over a 1000×200 viewBox; filled area at 8% opacity; dashed midline at y=100 (positive/negative threshold). Animates on scroll via Framer Motion `useInView` — fill fades in, curve draws via `pathLength`, markers fade/slide up with stagger.
  - **Card layout:** white card (`--color-surface`, `--radius-lg`, `--shadow-card`), `padding: var(--space-16) var(--space-6) var(--space-10)` — extra top padding ensures markers above the curve stay within the white background; extra bottom padding gives breathing room below the negative-area markers.
  - **Y-axis labels:** "POSITIVE" top, "NEGATIVE" bottom — `writing-mode: vertical-rl; transform: rotate(180deg)`, `--text-xs`, `--color-text-secondary`.
  - **Chart area:** `height: 260px`, `position: relative`. SVG uses `overflow: visible`.
  - **Markers:** each point has `leftPct` (horizontal %) and `curveYPct` (vertical % within chartArea) mapping to a position on the curve, plus `labelPosition: 'above' | 'below'`.
    - `markerAbove`: `transform: translate(-50%, calc(-100% - 14px))` — floats label+emoji 14px above the curve point.
    - `markerBelow`: `transform: translate(-50%, 14px)` — drops label+emoji 14px below the curve point.
    - Inner flex column: label (`--text-xs`, `max-width: 90px`) + emoji (22px). `markerAbove` stacks label then emoji (top→bottom); `markerBelow` reverses (emoji then label).
  - **5 data points:**
    | # | leftPct | curveYPct | emoji | label | labelPosition |
    |---|---|---|---|---|---|
    | 1 | 11% | 13% | 🤩 | Wow, so aesthetic! | above |
    | 2 | 30% | 65% | 😟 | So many options | below |
    | 3 | 51% | 36% | 🤔 | This sofa looks nice | above |
    | 4 | 67% | 26% | 🤔 | But how would it fit my home | above |
    | 5 | 90% | 67.5% | 🤔 | Are the comments real? | below |

**Itinera**
- `ProcessTimeline` — horizontal timeline bar. On-brand peach gradient bar spanning between 4 circular icon nodes (search, lightbulb, checkmark, sparkle). Date labels (Aug 2024 / Dec 2024) aligned above first and last nodes using the same 4-col grid. Phase labels (Discover, Define, Develop, Deliver) centered below each node. Bar animates scaleX on scroll; nodes and labels fade/slide in with stagger. (✓ done)
- `ResearchBreakdown` — semi-structured interview stats (✓ done) — renders in #user-testing section, replacing session image placeholder
- `PersonaCard` — William and Laura persona cards (✓ done) — reusable component, rendered twice in #user section; photos at `public/images/case-studies/William.png` and `laura.png`
- `MarketDataViz` — Canadian traveller market stats (✓ done) — renders in #problem section, replacing the VisualBlock placeholder. 3-column card: left stats (Overseas Spending $6.5B, Avg Spending per Trip $2,353) | center globe SVG decoration | right (Spending Growth horizontal bars 2023 +35.7% vs 2019 +31.2%, Avg Trip Length 13.2 nights). Left column is right-aligned on desktop. Bars animate scaleX on scroll; stat values use Instrument Serif italic in `--color-accent`. 40px column gap. Mobile stacks to single column.
- `JourneyMap` — User journey maps for William and Laura (✓ done) — renders in #user section, one per persona. Data exported as `WILLIAM_DATA` and `LAURA_DATA` constants from the component file. Each map has: 4-column header row (`--color-highlight-bg` bg, `--color-accent` text), numbered step lists, and a curve area (460px tall) with a hand-tuned SVG cubic bezier path, emoji markers, and speech bubbles absolutely positioned by `colIndex` + `topPct`. Curve draws via Framer Motion `pathLength` on scroll. Mobile: horizontal scroll with hidden scrollbar. William's curve dips at Compare; Laura's dips at Evaluate.

### Usage
- Image files: use `<VisualBlock type="image" src="/images/case-studies/..." alt="..." />`
- Diagrams / wireframes / screenshots where full image must show: add `natural` prop — `<VisualBlock type="image" src="..." alt="..." natural />`
- React components: use `<CaseStudySection visualNode={<ComponentName />} />` on case study page

Use standard `<img>` tags with `loading="lazy"` in components, or Framer Motion for animated visuals.

---

## AutoMate — Section Layout Notes

### #company section
- Layout: `text-side-visual`
- Visual: `visualNode` with a plain `<img>` — `maxHeight: 260px`, `objectFit: contain`, `borderRadius: var(--radius-lg)`, no shadow. This keeps the logo proportional and no taller than the text column beside it.

### #problem section
- Layout: `text-only` (wide)
- Order: h2 → first paragraph → `<FunnelChart />` (inline, `margin: var(--space-10) 0`) → remaining paragraphs → `.problemBlock`
- `.problemBlock` — flex column, `gap: var(--space-20)`, `margin-top: var(--space-12)`
- Each `.problemItem` — 2-column grid (`1fr 1fr`), `gap: var(--space-10)`, `align-items: center`, stacks to single column on mobile (≤768px)
- Each item: `.problemText` (h3 + paragraphs) left, `<VisualBlock natural noShadow />` right

### #user section
- Two `PersonaCard` (variant="automate") rendered sequentially; second card wrapped in `.personaSpacing` (`margin-top: var(--space-16)`) for breathing room
- Followed by `.commonGround` — 3-column peach grid with emoji + text + caption. Stacks to 1 column on mobile
- `.researchBlock` at the bottom with h3/h4 subheadings for competitor analysis and design references

### #solution section (split across multiple `CaseStudySection` calls)
1. `text-full-visual`, id="solution", label="Solution" — children: h2 + h3 "Early concept" + paragraph; visualNode: `automate-solution-lofi.png` (`natural`, `noShadow`) renders full-width below prose
2. `text-full-visual`, no id/label — children: h3 "User feedback"; visualNode: `.feedbackGrid` — 3-column peach cards with emoji + text, stacks to 1 column on mobile (≤768px)
3. `text-only`, no id/label — bridge paragraph explaining the two design responses (map view + deposit model)

### #final-result section
- Layout: `text-only` (wide)
- `.finalResultBlock` — flex column, `gap: var(--space-20)`, `margin-top: var(--space-12)`
- Each `.finalResultItem` — 2-column grid (`1fr 1fr`), `gap: var(--space-10)`, `align-items: center`, stacks to single column on mobile (≤768px)
- Each item: `.finalResultText` (h3 + paragraphs) left, `<VisualBlock natural noShadow />` right
- Items: Auto shop location (map view) and Deposit (deposit-only checkout)

### #learning section
- Layout: `text-only`
- h2: "Trust matters more than features" (Instrument Serif italic)
- Single paragraph opening with bold **57% increase in conversion rate** stat, followed by reflection on trust-first design and next opportunity (transparent quotation workflow)

---

## Cozey — Section Layout Notes

### #company section
- Layout: `text-side-visual` — text left, image right (2-column grid)
- Visual: `cozey-company.png` via `visual` prop — no caption

### #problem section
- Layout: `text-only` (wide) — all content rendered as children
- Order:
  1. h2 "What we hadn't noticed"
  2. `.problemIntroGrid` — 2-column grid (`1fr 1fr`, `gap: var(--space-10)`, `align-items: stretch`): left = `.problemIntroText` div (flex column, `gap: var(--space-5)`) with two paragraphs; right = `<VisualBlock natural />` (`cozey-problem-1.png`) — figure has white card wrapper (`--color-surface` bg, `--shadow-card`, `--radius-lg`, `padding: var(--space-4)`); img uses `object-fit: cover`, `--radius-md`, no shadow; caption "Average apartment size" center-aligned
  3. `<CozeyEmotionChart />` — full width, inline
  4. `.currentStateGrid` — 2-column grid (`2fr 1fr`, `gap: var(--space-10)`, `align-items: start`, `margin-top: var(--space-10)`): left = current state paragraph; right = `<ZoomImage />` (`cozey-current-state-2.png`) — click to expand full screen
  5. `.currentStateGrid` — same layout: left = competitive intro paragraph; right = `<ZoomImage />` (`cozey-competitive.png`)
  6. `.competitorSummaryHeading` — "What is missing among the competitors?" (`margin: var(--space-10) 0 var(--space-2)`)
  7. `.competitorSummary` — 2-column peach grid (`margin-top: 0`, 💡 and 🙅 items), stacks to 1 column on mobile

### #solution section
- Layout: `text-full-visual`
- `visualNode`: `.solutionImageGrid` — 2-column grid (`1fr 1fr`, `gap: var(--space-6)`) with plain `<img>` tags (`loading="lazy"`, `width: 100%`, `height: auto`, `border-radius: var(--radius-lg)`)
- Images: `cozey-solution-1.png` (left) and `cozey-solution-2.png` (right)

### #user-testing section
- Layout: `text-only` (wide)
- No image — `cozey-testing.png` removed
- Order: h2 → first paragraph → `.testingStatsGrid` (3-column peach grid)
- `.testingStatsGrid` — `repeat(3, 1fr)`, `gap: var(--space-6)`, `margin-top: var(--space-8)`, stacks to 1 column on mobile
- Each `.testingStatItem`: peach bg (`--color-highlight-bg`), `--radius-md`, `padding: var(--space-6)`, flex column
- Stat value (`.testingStatValue`): Instrument Serif italic, `--text-3xl`, `--color-accent`
- Three stats: **83%** Task Completion Rate / **3 min** Per user (avg time on task) / **4.3/5** Helpfulness

### #final-result section
- Layout: `text-only`
- h2: "Final interfaces"
- One paragraph describing scenario-based visualization and customer stories integrated into the existing product page

### #learning section
- Layout: `text-only`
- h2: "Authenticity over aesthetics"

---

## Itinera — Component Content

### ResearchBreakdown content
6 testers from different ethnic backgrounds, income levels, and age groups. Interviewed earlier in the project for user insight. Played with the prototype freely, then answered semi-structured questions about their thoughts on the design. Sessions were recorded with permission. Testers spoke aloud about good/bad reactions; notes were taken during the process.
Key stats to highlight: **6 participants**, **semi-structured interviews**, **think-aloud protocol**, **recorded sessions**.

### PersonaCard content

**Persona 1 — Family-oriented William**
- Number: 1
- Name: William
- Archetype: Family-oriented
- Description: William is a family-oriented person. He loves providing great experience to his family in their day-to-day and vacations.
- Scenario quote: "How am I supposed to plan a trip that keeps both my kids excited and my parents comfortable without someone feeling left out or exhausted?"
- Expectations (bullet list):
  - Clear online information of all available spots and restaurants
  - Ability to compare different rating of the tourist spots
  - Easy to turn the information to an itinerary
- Photo: `/images/case-studies/itinera-william.jpg` (circular crop)

**Persona 2 — Adventurer Laura**
- Number: 2
- Name: Laura
- Archetype: Adventurer
- Description: Laura is an adventurer who loves visiting exotic places. She also loves to visiting off-the-beaten-path locations.
- Scenario quote: "I just want to go somewhere I'll love, but I have no idea where to start!"
- Expectations (bullet list):
  - Getting information from visual-based sources
  - Prefer recommendations that feel more local or less commercialized
  - Narrow down options rapidly without feeling bogged down by excess choices
- Photo: `/images/case-studies/itinera-laura.jpg` (circular crop)

**PersonaCard props (default / Itinera variant):** `number`, `name`, `archetype`, `description`, `quote`, `expectations` (string[]), `imageSrc`, `imageAlt`
Layout: circular photo left → name/archetype/description/quote center → expectations right (3-column at desktop, stacked on mobile)

**PersonaCard props (automate variant):** `variant="automate"`, `name`, `imageSrc`, `imageAlt`, `demographics` ({ age, occupation, location }), `quote`, `goals` (string[]), `painPoints` (string[]), `currentSolution`, `interests` (string[])
Layout: photo (full height, rounded rect) + demographics + quote in top row → 2×2 grid of Goals / Pain Points / Current Solution / Interests below. Mobile: 70px photo + meta top row, quote full-width below, grid stacks to 1 column.

### Itinera #user section order
Content renders in this exact order inside the `<CaseStudySection id="user">`:
1. `<PersonaCard>` — William
2. `<JourneyMap data={WILLIAM_DATA} />` — William's journey map
3. `<PersonaCard>` — Laura
4. `<JourneyMap data={LAURA_DATA} />` — Laura's journey map
5. Similarity / Differences text blocks

### Itinera #user-testing section layout
- Lofi prototype image (`natural`) renders above the Testing heading
- Testing paragraph and `itinera-testing.png` sit side-by-side inside `.testingLayout` (2-col grid, `--space-16` / 64px gap) — paragraph left, image right
- `<ResearchBreakdown />` renders below the testing layout

### Itinera #final-result section layout
Each feature (AI personalized itinerary, Itinerary detail, Profile, Explore) is wrapped in `.resultItem` — a 2-col grid with text left and a `natural` `VisualBlock` right. Column gap and margin-bottom between items: `--space-16` (64px). Stacks to single column on mobile.

### JourneyMap bubble positioning notes
Speech bubble positions (`topPct`) are percentage offsets from the top of the 460px curve area. When adjusting:
- Emoji markers sit at `curveYPct` — bubbles must clear the emoji by ~14px (half emoji size)
- William's Compare column (colIndex 1, curveYPct 79%) has both bubbles above the line — topPct 20 and 44
- Keep all bubbles within ~92% topPct to avoid overflow clipping (figure has `overflow: hidden`)
