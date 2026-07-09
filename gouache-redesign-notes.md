# Gouache Redesign — Session Notes (July 8, 2026)

Handoff notes for the homepage video hero + site-wide gouache restyle. CLAUDE.md and ThoughtMap.md are already updated to match — this file is the narrative summary + open threads.

---

## What changed

### 1. Homepage hero → full-bleed looping video (all breakpoints)

- **Source clip:** `~/Downloads/Woman_writing_in_notebook_sea_202607081454.mp4` (AI-generated gouache illustration, 1280×720, 10s, H.264).
- **Processing (ffmpeg, now installed via Homebrew):** the raw clip's first/last frames don't match, so the last second was crossfaded into the first (`xfade`) → seamless **9s loop**. Audio stripped, `+faststart`. Output:
  - `public/videos/hero-loop.mp4` (~1.6MB)
  - `public/videos/hero-poster.jpg` (poster frame, ~78KB)
- **New component:** `src/components/VideoHero/` (`'use client'`)
  - `100svh` section, video absolutely positioned, `object-fit: cover`, `object-position: center 40%` (keeps figure + sunset in frame on mobile portrait).
  - Headline overlaid: same copy + word-stagger animation as the old `Hero` (y:16→0, 70ms stagger, 0.35s/word), Instrument Serif italic, 2-line split.
  - Headline + scroll cue are **white** (`--color-white`) with soft slate text-shadows, over a slate top scrim (`rgba(43,58,72,0.32)` → transparent 45%) that blends into the sky. (Original dark-text + cream-scrim treatment replaced at Mikael's request.)
  - "SCROLL ↓" cue → `#case-studies`, fades in at 1.6s, bobbing arrow.
  - Subheadline under the title (Mikael's positioning ask): *"Diagnosing the real problem first and designing AI products people can actually trust."* White Inter, `text-wrap: balance`, fades in at 1.05s after the word-stagger. Leads with her two core positioning angles (diagnosis-first + AI trust). A longer version explicitly naming the PD→PM transition was tried and cut as unnecessary — the transition is still her goal, just not stated on the site.
  - `prefers-reduced-motion` pauses the video via `useEffect` + `matchMedia`.
- **Homepage rewire:** `page.js` is now unified — `VideoHero` → `.below` wrapper (`padding-top: --space-24`) with `CaseStudyGrid` → `Footer`. The `.desktopOnly`/`.mobileOnly` split and the 20px notebook-grid background are gone.
- **Retired:** `ThoughtMap` — unmounted but files kept in `src/components/ThoughtMap/` for possible revival (status note added to `ThoughtMap.md`). `src/components/Hero/` **deleted** (animation lives on in VideoHero).

### 2. Gouache restyle — tokens + textures only (Mikael's decisions)

- Unified video hero: **yes** · Full-bleed: **yes** · New accent color tokens (sky/sunset/lavender): **no — declined** · Warm card borders: **no — declined, paper texture instead**.
- `globals.css` token shifts:
  | Token | New value |
  |---|---|
  | `--color-bg` | `#F5F4E8` — warm ivory with a green undertone (hue ~55°). First attempt `#F7F2E8` (yellower cream from the video's paper border) felt mismatched against the sage highlight; Mikael asked for slightly cooler-but-still-warm. Hero scrim in `VideoHero.module.css` matches this value. |
  | `--color-surface` | `#FFFDF8` (warm white) |
  | `--color-text-secondary` | `#5C5A4E` (warm gray-olive) |
  | `--color-highlight-bg` | unchanged `rgba(58,86,53,0.10)` sage — a peach sunset wash `rgba(242,178,125,0.22)` was tried and **reverted** (Mikael didn't like the orange) |
  | `--shadow-card` | `0 4px 16px rgba(92,74,50,0.14)` (warm-tinted) |
  | noise overlay | opacity 0.07 → 0.08 |
- **New `--texture-paper` token:** desaturated `feTurbulence` SVG data-URI, 5% opacity, 240px tile. Applied to 17 white card surfaces via the pattern `background: var(--color-surface) var(--texture-paper);` (PhotoCard, PersonaCard, JourneyMap, FunnelChart, ResearchBreakdown, MarketDataViz, ProcessTimeline, CozeyEmotionChart, NextProjectCard, TrustCalibrationFlow, trust-calibration + cozey page wrappers). **Not** on CaseStudyCard (surface fully covered by cover images).
- Nav glass warmed: `rgba(255,251,242,0.6)`.
- `--color-accent` sage unchanged — it matches the video's hillside.

## Verified

- Video autoplays muted, loops seamlessly (watched `currentTime` wrap past 9s), no console/server errors.
- Desktop + mobile (375px) render correctly; headline holds 2 lines; no horizontal overflow anywhere.
- Case study pages inherit the warm tokens cleanly (checked /cozey; peach highlight blocks follow `--color-highlight-bg` automatically).
- `npm run build` static export passes; `/out/videos/` contains both files.

## Open threads / nice-to-haves

1. **Video resolution:** 720p looks slightly soft on large retina screens (noise overlay masks it somewhat). If Mikael regenerates the clip at 1080p+ (ideally designed to loop, borderless for full-bleed), it's a drop-in swap at `public/videos/hero-loop.mp4` — rerun the same ffmpeg crossfade if the new clip doesn't loop.
2. **Deckled border crop:** the baked-in paper border only shows fully at ~16:9 windows; other ratios crop it. Currently accepted.
3. **Optional `hero-loop.webm`** (VP9/AV1) as a smaller first `<source>` — skipped, mp4 is only 1.6MB.
4. **Case study cover images + About photos** still pre-gouache — Mikael chose tokens+textures scope only; a "full visual overhaul" (regenerating imagery in the gouache style) was explicitly deferred.
5. **ThoughtMap revival?** If it comes back, it needs restyling for the cream palette (it assumed the old sage-white bg + notebook grid).

## Gotchas learned this session

- **Preview harness + `100svh`:** a backgrounded preview tab reports `window.innerHeight = 0`, collapsing the hero and producing blank/garbled screenshots when scrolled below it. Site is fine — verify below-fold via accessibility snapshot or `getBoundingClientRect()`. (Documented in CLAUDE.md.)
- **`npm run build` kills the running dev server** (shared `.next` dir) — restart the preview server after building.
