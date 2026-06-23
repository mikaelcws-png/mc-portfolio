# ThoughtMap Component

Interactive thought-map hero for the homepage. Dots start clustered at center, scatter to final positions simultaneously, edges and labels reveal as they arrive. Hovering any node highlights its direct edges and shows a case study card near the cursor. Clicking navigates to the case study.

---

## File location

```
src/components/ThoughtMap/
├── ThoughtMap.js
└── ThoughtMap.module.css
```

Used in `src/app/page.js` as the sole hero section — replaces the former `Hero` + `CaseStudyGrid`.

---

## Tech stack notes

- `'use client'` required — uses canvas, refs, mouse events, and `requestAnimationFrame`
- Canvas 2D API for dots, edges, labels, and scatter animation
- Framer Motion for headline fade-in after scatter completes, and `AnimatePresence` for hover card
- CSS Modules for the hover card and layout
- No external libraries needed beyond what's already in the project

---

## Data structure

### Clusters

4 clusters, each with one main node and satellite nodes. All satellites belong to exactly one cluster and inherit that cluster's case study for hover card and navigation.

```js
const CLUSTERS = [
  {
    id: "automate",
    label: "AutoMate",
    url: "/automate",
    image: "/images/case-studies/automate-cover.png",
    anchor: [0.22, 0.28], // [fx, fy] — fractional position on canvas
    satellites: [
      "Conversion funnel",
      "User onboarding",
      "A/B testing",
      "Accessibility",
    ],
  },
  {
    id: "cozey",
    label: "Cozey",
    url: "/cozey",
    image: "/images/case-studies/cozey-cover.png",
    anchor: [0.72, 0.25],
    satellites: [
      "Cognitive load",
      "Modular components",
      "Information architecture",
    ],
  },
  {
    id: "itinera",
    label: "Itinera",
    url: "/itinera",
    image: "/images/case-studies/itinera-cover.png",
    anchor: [0.25, 0.70],
    satellites: [
      "Journey mapping",
      "Design systems",
      "Interaction patterns",
      "Prototyping",
    ],
  },
  {
    id: "trust",
    label: "Trust Calibration",
    url: "/trust-calibration",
    image: "/images/case-studies/trust-calibration-cover.png",
    anchor: [0.72, 0.68],
    satellites: [
      "Agentic UX",
      "Mental models",
      "Problem reframing",
      "Heuristic evaluation",
    ],
  },
];
```

Update `label`, `url`, `image`, `anchor`, and `satellites` as needed.

### Edges

Two types:

1. **Intra-cluster edges** — each satellite connects to its cluster's main node. Generated automatically from the cluster data.
2. **Cross-cluster edges** — manually defined pairs by node label. Add or remove as needed.

```js
const CROSS_EDGES = [
  ["Cognitive load", "User onboarding"],
  ["Design systems", "Modular components"],
  ["Problem reframing", "Conversion funnel"],
  ["Agentic UX", "Trust Calibration"],
  ["Journey mapping", "User onboarding"],
  ["Heuristic evaluation", "A/B testing"],
];
```

---

## Layout and positioning

### Canvas

Full-viewport height (`100vh`), full-width section. `position: absolute; inset: 0` on the canvas element.

HiDPI: `canvas.width = W * dpr`, `canvas.height = H * dpr`, `ctx.scale(dpr, dpr)`. All drawing uses logical CSS pixel coordinates.

### Satellite positions

Satellites are **not** evenly distributed in a polar ring. Instead, each cluster fans its satellites in an outward-biased arc computed in pixel space:

1. Compute the outward angle: `atan2(mainPy - H/2, mainPx - W/2)` — direction from canvas center to the cluster anchor
2. Spread across a 200° arc centered on that angle (`spreadStart = outwardAngle - 100°`)
3. Distribute satellites evenly across the arc, then add per-slot jitter and radius variation:

```js
const ORBIT_FRAC   = 0.09;  // base orbit radius = 9% of canvas width
const ARC_SPREAD   = (200 * Math.PI) / 180;

// Deterministic per-slot offsets — create organic, non-symmetrical placement
const JITTER_ANGLES = [0.22, -0.28, 0.14, -0.20, 0.32]; // radians
const RADIUS_MULTS  = [1.0,   1.25,  0.82,  1.12,  0.95];
```

Satellite `fx`/`fy` are stored as fractions (`satPx / W`, `satPy / H`) so positions recompute correctly on resize.

The 4 clusters sit in the four quadrants of the canvas. With outward-biased satellites, the overall layout reads as a roughly circular cloud of nodes.

### Headline

Absolutely positioned DOM element (`position: absolute; left: 50%; top: 66%; transform: translateX(-50%) translateY(-50%)`). Instrument Serif italic, `clamp(1rem, 4.2vw, 3rem)`, same 2-line split and word-by-word Framer Motion animation as the former `Hero` component.

Starts at `opacity: 0`. After scatter animation completes (+200ms), fades to `opacity: 1` with 1.0s Framer Motion transition. On any node hover, transitions to `opacity: 0.12` in 150ms. Returns to `opacity: 1` on mouse leave.

---

## Animation

### Phase 1: Scatter (all dots move simultaneously)

- All dots start at canvas center `(W/2, H/2)`
- On mount, all dots move to their final positions simultaneously
- Duration: 900ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (matches `--ease-out-expo`)
- Edges draw at `opacity = BASE_EDGE_OPACITY * t` during scatter
- Node labels fade in during the last 35% of scatter: `labelAlpha = Math.max(0, (t - 0.65) / 0.35)`
- After scatter completes, everything stays static

### Phase 2: Headline fade

- Starts 200ms after scatter completes (`scatterDoneRef.current = true`)
- Framer Motion: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` with `duration: 1.0`

### Implementation note

Use `requestAnimationFrame` for the scatter. Store `startTime` on first frame. Each frame, compute `t = elapsed / 900` clamped to `[0, 1]`, apply `easeOutExpo`, interpolate each dot's position from `(W/2, H/2)` to its final position using `ipos(n)`:

```js
function ipos(n) {
  return {
    ix: W / 2 + (n.fx * W - W / 2) * t,
    iy: H / 2 + (n.fy * H - H / 2) * t,
  };
}
```

---

## Labels

Labels are drawn directly on the canvas in `draw()`, after the dots.

| Node type | Font | Color |
|---|---|---|
| Main node | `italic 400 12px 'Instrument Serif', Georgia, serif` | `#111111` |
| Satellite | `400 10px 'Inter', system-ui, sans-serif` | `#525C50` |

**Positioning:**
- If `n.fy > 0.55` (lower half of canvas): label goes **above** the dot (`textBaseline: 'bottom'`, `y = dotCenter - radius - 6px`)
- Otherwise: label goes **below** the dot (`textBaseline: 'top'`, `y = dotCenter + radius + 6px`)
- X is center-aligned on the dot and clamped to `[halfTextWidth + 8, W - halfTextWidth - 8]` to avoid clipping at canvas edges

**Fade timing:** `labelAlpha = Math.max(0, (t - 0.65) / 0.35)` — labels appear only in the last 35% of the scatter, so they read as "arriving" rather than pre-existing.

---

## Hover behavior

### On node hover (mouse within 20px of any dot center)

1. All edges dim: `rgba(82, 92, 80, BASE_EDGE_OPACITY * 0.3)`
2. Edges directly connected to the hovered node highlight: 1.2px, `rgba(58, 86, 53, 0.5)`
3. Hovered dot: radius +2px, same fill
4. Hover card appears near cursor (see below)
5. Headline fades to `opacity: 0.12` in 150ms
6. Cursor: `pointer`

### On mouse leave

All edges return to base opacity. Headline returns to `opacity: 1`. Hover card disappears. Cursor: `default`.

### Which case study a node maps to

Every node (main or satellite) stores `caseId`, `url`, `image`, and `clusterLabel` at build time — hover and click handlers read these directly without walking the cluster tree.

---

## Hover card

Positioned near the cursor with `(+16px, -8px)` offset. Repositions if near viewport edge to stay fully visible. `position: fixed`, z-index 100.

```
┌─────────────────────────────┐
│  [cover image, 120×80px]    │
│                             │
│  Case Study Title           │
└─────────────────────────────┘
```

- Width: 200px
- Image: full-width, `height: 80px`, `object-fit: cover`, `var(--radius-sm)`
- Title: Instrument Serif italic, `var(--text-sm)`, `var(--color-text-primary)`
- Background: `var(--color-surface)`, `var(--shadow-card)`, `var(--radius-md)`, `var(--space-3)` padding
- Animated with Framer Motion `AnimatePresence` (`y: 6 → 0`, `opacity: 0 → 1`, 150ms); exits the same way

---

## Click behavior

Clicking any node (main or satellite) navigates to that cluster's case study URL using Next.js `router.push()`.

---

## Canvas draw order (each frame)

1. `clearRect`
2. Draw all edges (at interpolated opacity during scatter)
3. If a node is hovered: redraw edges — dim all, then highlight connected ones
4. Draw satellite dots (3px) first, then main nodes (5px) on top
5. Draw labels for all nodes (faded in via `labelAlpha`)

### Dot styling

- Main nodes: radius 5px, `#3A5635`
- Satellite nodes: radius 3px, `#525C50`
- Hovered node: radius +2px, same fill

### Edge styling

- Base: 0.6px, `rgba(82, 92, 80, 0.15)`
- Highlighted: 1.2px, `rgba(58, 86, 53, 0.5)`
- Dimmed (when hovering another node): `rgba(82, 92, 80, 0.045)`

---

## Resize handling

On `window resize` (debounced 100ms):
- Reset `canvas.width`/`canvas.height` to `offsetWidth/Height * dpr` — this clears the canvas and resets the transform
- Re-apply `ctx.scale(dpr, dpr)`
- Call `recomputePixels(nodes, W, H)` which sets `n.px = n.fx * W, n.py = n.fy * H`
- Redraw at `t = 1` (no re-animation)

---

## Accessibility

- Canvas wrapper has `role="img"` and an `aria-label` describing the thought map
- Headline text is a real DOM element (screen-reader readable)
- A visually hidden `<ul>` of case study links appears below the canvas as a keyboard/screen-reader fallback

---

## Component API

No props. All data (`CLUSTERS`, `CROSS_EDGES`) is internal. To update content, edit the constants at the top of `ThoughtMap.js`.

---

## Files

| File | Purpose |
|---|---|
| `src/components/ThoughtMap/ThoughtMap.js` | Component — all logic, data, and rendering |
| `src/components/ThoughtMap/ThoughtMap.module.css` | Layout, headline, hover card styles |
| `src/app/page.js` | Renders `<ThoughtMap />` + `<Footer />` |
