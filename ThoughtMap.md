# ThoughtMap Component

Interactive thought-map hero for the **desktop homepage only** (>768px — see `src/app/page.module.css`). The headline appears first, inside an oval "hub" node at canvas center; 900ms later, four cluster dots scatter outward from that hub, connected to it by edges, while satellites and cross-links reveal alongside. Hovering any node highlights its direct edges and shows a case study card near the cursor. Clicking navigates to the case study. On mobile (≤768px), the original `Hero` + `CaseStudyGrid` render instead — see the Homepage section in `CLAUDE.md`.

---

## File location

```
src/components/ThoughtMap/
├── ThoughtMap.js
└── ThoughtMap.module.css
```

Used in `src/app/page.js`, wrapped in a `.desktopOnly` div (`page.module.css`) alongside a `.mobileOnly` div containing `Hero` + `CaseStudyGrid`. Both are always mounted; CSS `display` toggles between them at the `768px` breakpoint. `ThoughtMap`'s animation loop keeps running while hidden on mobile — a known, accepted tradeoff (negligible cost on this site).

---

## Tech stack notes

- `'use client'` required — uses canvas, refs, mouse events, and `requestAnimationFrame`
- Canvas 2D API for dots, edges, labels, and scatter animation
- Framer Motion for the headline's word-by-word reveal and opacity transitions, and `AnimatePresence` for the hover card
- CSS Modules for the headline/oval, hover card, and grid background
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

### Center node

A zero-radius node with `isCenter: true`, pushed into `nodes` first (index 0) in `buildGraph()`, anchored at `fx: 0.5, fy: 0.5` (canvas center — same point the DOM headline/oval sits on top of). It has no `url`/`image`/`caseId` and is explicitly excluded from:
- dot/label rendering in `draw()` (`order` filters out `isCenter`)
- hover hit-testing in `handleMouseMove` (`if (n.isCenter) continue`)
- click hit-testing in `handleClick` (same guard)

It exists purely as an edge endpoint — the DOM headline/oval is the only visual representation.

### Edges

Three types:

1. **Center → main edges** — one per cluster, added right after each main node is pushed (`edges.push({ a: centerIdx, b: mainIdx })`). These are what visually connect the oval to AutoMate/Cozey/Itinera/Trust Calibration.
2. **Intra-cluster edges** — each satellite connects to its cluster's main node. Generated automatically from the cluster data.
3. **Cross-cluster edges** — manually defined pairs by node label. Add or remove as needed.

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

### Headline + oval ("hub" node)

Absolutely positioned DOM element (`position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)`) — centered on the canvas, exactly where the center node (`fx: 0.5, fy: 0.5`) lives. Instrument Serif italic, `clamp(1rem, 3.6vw, 2.5rem)` — smaller than the old `Hero`/pre-redesign max (`3rem`), since it now has to coexist with four scattered clusters rather than standing alone.

The `.headline` div itself **is** the oval: `padding: 1.4em 2.2em` + `border-radius: 50%`. A box with `border-radius: 50%` always renders as a true ellipse inscribed in its own bounding box, so the oval automatically hugs however much space the two text lines take up — no manual width/height tuning needed.

**Styling went through a few iterations this session, landing on:**
- `border: 1px solid rgba(82, 92, 80, 0.25)` — a muted gray-green, matching the edge-line color family. (Earlier attempts used the saturated `--color-accent` border, then a full glassmorphic treatment matching `Nav`/the hover card — both were tried and rejected: the saturated border read as too strong against the rest of the muted canvas, and the glass treatment visually competed with the `Nav` pill above it.)
- `background: rgba(244, 246, 243, 0.88)` — `--color-bg` at high opacity, mainly so the lines/labels passing underneath the oval don't distract from the headline text. Not glassmorphic — no `backdrop-filter`. A blur was tried at `32px` but removed: the oval mostly sits over sparse canvas content (a few thin lines), so there usually wasn't enough behind it for a blur to visibly do anything.
- No `box-shadow` — kept deliberately flat so it doesn't read as a floating card.

**Animation sequencing (this was a deliberate reversal of the original design):** the headline + oval fade in **first** (`setHeadlineVisible(true)` fires immediately on mount), then the four-cluster scatter animation starts 900ms later (`setTimeout` gating the `requestAnimationFrame` loop). Originally the scatter ran immediately on mount and the headline faded in 200ms *after* it finished — that order was flipped so the hub feels like the origin the map grows out of, not an overlay added afterward.

On any node hover, the headline/oval transitions to `opacity: 0.12` in 150ms (dimming the whole oval, border included, since it's one element). Returns to `opacity: 1` on mouse leave.

### Lines starting at the oval's border, not its center

Since the center node's canvas coordinate is a single point, edges naturally draw from dead-center outward by default — which looked wrong once the oval had real visual size (lines would appear to originate from inside the text). To fix this, `computeOvalRect(canvas, headlineEl)` reads the **live** headline DOM element's `getBoundingClientRect()` every time `draw()` runs, converts it to canvas-relative coordinates, and returns `{ cx, cy, rx, ry }`.

For any edge where one endpoint `isCenter`, `draw()` computes the angle from the oval's center toward the other node, then finds where a ray at that angle crosses the ellipse boundary:

```js
function ellipseRadiusAtAngle(angle, rx, ry) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return 1 / Math.sqrt((cos / rx) ** 2 + (sin / ry) ** 2);
}
```

That boundary point — not the literal center — becomes the line's start. Because the main nodes move in a straight line from canvas-center to their final anchor during the scatter, the *angle* from center to each main node is constant throughout the animation (only the distance changes), so this boundary point doesn't need to be recalculated differently mid-scatter — it just naturally tracks correctly every frame.

This is recomputed on every `draw()` call (mount animation, hover, resize) via a `headlineRef` — no caching, since the oval's pixel size can change with viewport width (the font is set in `vw`-based `clamp()`).

---

## Animation

### Phase 1: Headline + oval appear

- `setHeadlineVisible(true)` fires immediately on mount (in the same `useEffect` that builds the graph), alongside `setMounted(true)`
- Framer Motion: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`, word-by-word stagger for the two text lines (70ms per word, 0.35s duration each — same timing as the original `Hero`)
- The oval is just the `.headline` div's own border/background — it fades in as part of the same opacity transition, no separate element

### Phase 2: Scatter (all dots move simultaneously, 900ms later)

- A `setTimeout(() => requestAnimationFrame(animate), 900)` gates the start of the scatter loop, so the headline/oval settle in before any node motion begins
- All dots start at canvas center `(W/2, H/2)` — including the new center node, which never moves (`fx: 0.5, fy: 0.5` for its entire life)
- On mount, all dots move to their final positions simultaneously
- Duration: 900ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (matches `--ease-out-expo`)
- Edges draw at `opacity = BASE_EDGE_OPACITY * t` during scatter — this includes the 4 center→main edges, so they visibly stretch outward from the oval as each cluster scatters
- Node labels fade in during the last 35% of scatter: `labelAlpha = Math.max(0, (t - 0.65) / 0.35)`
- After scatter completes, everything stays static (`scatterDoneRef.current = true`)

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
| Main node | `400 20px 'Inter', system-ui, sans-serif` | `#111111` |
| Satellite | `400 16px 'Inter', system-ui, sans-serif` | `#525C50` |

Main and satellite labels intentionally share the same family and weight now — hierarchy comes from size and color alone. An earlier pass tried main labels in Instrument Serif italic (to visually match the headline), then tried Inter at weight 500 ("slightly heavier" than satellites) — both were reverted: the serif read as a mismatched font entirely, and weight 500 felt too heavy once combined with the larger 20px size. Plain `400` Inter, just bigger and darker, was the one that didn't feel off.

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

## Background grid

`.section` has a `background-image` of two tiled 1px `linear-gradient`s (horizontal + vertical), `rgba(0, 0, 0, 0.05)`, `background-size: 20px 20px` — a faint notebook-paper grid sitting behind the canvas, nodes, and oval. Opacity was deliberately kept at 5%: visible enough to add texture, faint enough that nothing drawn on top competes with it.

## Canvas draw order (each frame)

1. `clearRect`
2. Compute `ovalRect` via `computeOvalRect(canvas, headlineRef.current)` — read fresh every frame, not cached
3. Draw all edges (at interpolated opacity during scatter). For any edge touching the center node, start/end at the oval's ellipse boundary (see "Lines starting at the oval's border" above) instead of the literal center point
4. If a node is hovered: redraw edges — dim all, then highlight connected ones
5. Draw satellite dots (3px) first, then main nodes (5px) on top — the center node is excluded from this pass entirely
6. Draw labels for all nodes (faded in via `labelAlpha`) — center node excluded here too

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
- Redraw at `t = 1` (no re-animation), passing a freshly computed `ovalRect` — no special resize handling needed for the oval itself, since `computeOvalRect` always reads the DOM element's current `getBoundingClientRect()` rather than a cached value

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
| `src/components/ThoughtMap/ThoughtMap.module.css` | Layout, headline/oval, hover card, grid background styles |
| `src/app/page.js` | Renders `<ThoughtMap />` inside `.desktopOnly`, `<Hero />` + `<CaseStudyGrid />` inside `.mobileOnly`, plus shared `<Footer />` |
| `src/app/page.module.css` | `.desktopOnly` / `.mobileOnly` display toggles at `768px` |
