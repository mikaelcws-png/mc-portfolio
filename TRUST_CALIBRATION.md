# Trust Calibration — Case Study Build Brief
*Drop this file in the Portfolio project root alongside CLAUDE.md*

---

## What this page is

A speculative product design case study. The route will be `/trust-calibration`. The page file goes at `src/app/trust-calibration/page.js`.

The case study argues that enterprise AI products skip a trust layer most users actually need. It presents a designed calibration flow for a lending auditor persona. The tone is analytical and specific, not a traditional UX portfolio piece.

---

## Design system reference

All tokens, components, and conventions are in `CLAUDE.md`. Never hardcode colors, spacing, or radii. Always use `var(--token-name)`.

Key tokens for this page:
- Background: `--color-bg` (#F4F6F3)
- Accent: `--color-accent` (#3A5635)
- Surface: `--color-surface` (#FFFFFF)
- Highlight: `--color-highlight-bg` (rgba(58,86,53,0.10))
- Shadow: `--shadow-card`
- Radius: `--radius-lg`, `--radius-md`

Typography:
- Section h2: Instrument Serif italic, `--text-3xl`
- Body: Inter regular, `--text-base`
- Sub-headings h3: Inter medium 500, `--text-base`

---

## Page structure

Build sections in this order. Each maps to a `CaseStudySection` call unless noted.

### 1. Hero
Use existing `CaseStudyHero` component.
- Title: "Trust Calibration for Enterprise AI Agents"
- Label: "Speculative Case Study"
- Summary: "Enterprise AI products are designed for users who already trust them. Most don't. This is what designing for the gap looks like."
- Cover image: `public/images/case-studies/trust-calibration-cover.png` (placeholder for now)

### 2. Problem Statement
Layout: `text-only`
- h2: "The problem nobody has designed for"
- Body copy (prose, no bullets):

Enterprise AI tools are being deployed into organizations where most users have no prior experience working with an AI agent. These users arrive without a mental model of what the agent does, how it reasons, or what happens when it gets something wrong.

The products themselves assume a level of familiarity the user hasn't earned yet. They ask for action-level trust before establishing baseline trust. The result is low adoption, shallow usage, and AI investment that doesn't convert into measurable business value.

This isn't a UI problem. It's a sequencing problem. The industry hasn't designed for the moment before the agent can be useful.

### 3. Diagnosis
Layout: `text-side-visual` — prose left, Trust Pyramid image right, both top-aligned. Image sticks while scrolling.

Prose:
- h2: "Two types of trust. One is missing."
- Paragraph explaining baseline trust vs action-level trust distinction
- Paragraph on organizational context problem
- Paragraph on traces vs calibration (from `maya-tool-context.md`): reasoning traces answer "what did it do" after the fact; calibration answers "can I rely on it" before the first real case. Traces are the raw material for trust — calibration is the mechanism that builds it.

Trust Pyramid image as `visualNode` (passed via prop, not as a child):
- Wrapped in `.cardWrap` div (`--color-surface`, `--shadow-card`, `--radius-lg`, `--space-8` padding)
- `<VisualBlock type="image" src="/images/case-studies/trust-pyramid.png" natural noShadow />`
- Caption: "Adapted from the NN/g Pyramid of Trust"

### 4. User Profile
Layout: `text-only` **with `wide` prop** — required so the PersonaCard isn't capped at 680px

Content grounded in `maya-tool-context.md` — the tool stays **unnamed** ("an enterprise AI workspace built for regulated industries"; internally modeled on North by Cohere, never mentioned in copy). Framing rule: the gap is the rollout, never the product.

- h2: "Use case"
- Three-beat narrative before the grid:
  1. Maya + the tool — mid-level lending auditor at an equipment rental company; firm-wide AI initiative rolled out an enterprise AI workspace (AI assistant, search across internal systems, customizable agents for multi-step workflows)
  2. What it should do — lending audit = pull loan file (application, income documents, credit reports, approval memos), verify decision followed policy; workspace searches/summarizes documents, extracts key figures, flags inconsistencies, drafts audit summary; a day of manual review → couple hours reviewing agent's work
  3. The gap — confusion sits in her workflow, not the product; tool logs interactions and shows reasoning traces; closes with "The capability was deployed. The working relationship wasn't."
- "What nobody told her" 3-item peach grid — reuses `.commonGround` / `.commonGroundItem` / `.commonGroundLabel` plus `.gapBelow` modifier (extra `--space-8` margin-bottom before the persona card):
  - **Delegation** — Which parts of the audit is she allowed to delegate to the agent, and which must she still do herself?
  - **Defensibility** — Is an agent-drafted summary defensible when a regulator asks who verified the income documents?
  - **Judgment** — How does the agent decide a discrepancy is worth flagging versus ignoring?

Then `PersonaCard` with `variant="automate"` (reuse existing component, new data):
- name: "Maya"
- imageAlt: "Maya, mid-level lending auditor"
- imageSrc: placeholder for now (`/images/case-studies/maya.png`)
- demographics: { age: "34", occupation: "Mid-level Lending Auditor", location: "Toronto, ON" }
- quote: "The tool can show me exactly what it did. What nobody can tell me is whether I'm allowed to rely on it."
- goals: ["Complete lending audits faster without sacrificing defensibility", "Understand what the agent is doing and why", "Build a workflow she can rely on case after case"]
- painPoints: ["No one defined which audit steps she can delegate to the agent", "Output needs to be defensible to managers and regulators", "Can't tell where the agent's judgment ends and hers begins"]
- currentSolution: "Re-verifies everything the agent produces manually - erasing the time savings"
- interests: ["Professional accuracy", "Regulatory compliance", "Efficient workflows"]

### 5. Proposed Solution — Step Flow
Layout: `text-only` for intro prose, then `TrustCalibrationFlow` React component as `visualNode`

Intro prose:
- h2: "Calibration, not onboarding"
- One paragraph: "A trust calibration layer that sits before the agent takes any action on a real case. Not onboarding. Onboarding teaches features. Calibration builds a working relationship. The core mechanic: the agent works a past resolved case the user already knows the answer to. She watches it reason through something familiar before relying on it for anything real."

Then build new component `TrustCalibrationFlow` (see component spec below).

> **Note:** The interactive prototype (section 7b below) was built first using Figma Make. The `TrustCalibrationFlow` static diagram is still planned as a summary visual above the embed.

### 6. What This Solves
Layout: `text-only` wide
- h2: "What changes"
- Three peach grid cards using `.commonGround` / `.commonGroundItem` / `.commonGroundLabel` classes in `trust-calibration.module.css` (same pattern as AutoMate):
  - Card 1 label "For Maya" — She understands what the agent does before she relies on it. Her output stays defensible because she's never guessing what the agent did or why.
  - Card 2 label "For IT" — Per-team configuration is no longer an engineering dependency. The user builds her own workflow context in plain language, grounded in how she actually works.
  - Card 3 label "For Leadership" — AI usage measured by decisions made, not tokens consumed. Faster time to actual utility. Workflows that reflect real operations.

### 7. Stakeholders
Layout: `text-only` wide
- h2: "What are their concerns?"
- HTML table wrapped in `.cardWrap` div (`--color-surface`, `--shadow-card`, `--radius-lg`)
- Table uses `.table` class from `trust-calibration.module.css`

| Stakeholder | Role | Primary concern |
|---|---|---|
| Maya (end user) | Lending auditor | Can I trust this enough to use it on real cases? |
| Maya's manager | Audit team lead | Is the team's output still defensible and reviewable? |
| IT / implementation | Enterprise deployment | Can we deploy without configuring every team individually? |
| Compliance / legal | Risk oversight | Does agent-assisted output meet regulatory standards? |
| Procurement / leadership | Budget holder | Is this producing value beyond token counts? |

### 7b. Prototype (Figma Make embed) ✓ Done
Layout: `text-full-visual`
- h2: "See it in action"
- Description paragraph explaining the 6-screen calibration flow
- "Open in full screen →" link (`--color-accent`, `--text-sm`, opens `/prototype/index.html` in new tab)
- `visualNode`: `<VisualBlock type="embed" src="/prototype/index.html" aspectRatio="16/9" />`

The prototype is a standalone Vite + React + Tailwind + shadcn/ui app (Figma Make output).
- Source files: `src/components/TrustCalibrationPrototype/` — has its own `package.json`, do not import into Next.js
- Built output: `public/prototype/` (index.html + assets/) — served as static files by Next.js and Vercel
- `vite.config.ts` must keep `base: '/prototype/'` for asset paths to resolve correctly

**To rebuild after editing in Figma Make:**
```
cd src/components/TrustCalibrationPrototype
npm run build
cp -r dist/* ../../../public/prototype/
```

The 6 screens: Context questions → Agent summary → Trial case upload → Trial analysis → Real case upload → Final analysis

### 8. What This Doesn't Solve
Layout: `text-only` wide
- h2: "What this doesn't solve"
- Prose paragraph: "This calibration layer addresses the trust gap at the product level. It does not fix the organizational problem upstream — most companies buy AI tools without defining what good usage looks like for each team. Organizational guidance, training, and success metrics still matter and sit outside the scope of this design."

### 9. Success Metrics
Layout: `text-only` wide
- h2: "How we'd measure this"
- HTML table wrapped in `.cardWrap` div (`--color-surface`, `--shadow-card`, `--radius-lg`)
- Table uses `.table` class from `trust-calibration.module.css`

| Metric | Signal |
|---|---|
| Completion rate of first-use flow | Are users finishing calibration or dropping off? |
| Time to first real case | How quickly does calibration convert to productive use? |
| User-reported confidence after step 3 | Does watching the agent work a past case build trust? |
| Review cadence on live cases | Are users over-reviewing (low trust) or under-delegating? |
| Retention at 30 and 90 days | Does early calibration produce sustained usage? |

### 10. Open Questions
Layout: `text-only` wide
- h2: "Open questions"
- Rendered as `<ol>` with `.questionList` class; each `<li>` is a 2-col grid (serif number + prose paragraph)
- Number style: `.questionNumber` — Instrument Serif italic, `--text-2xl`, `--color-accent`
  1. What happens when a user has no past case to upload? The flow needs a graceful fallback — a templated example or skip-ahead state — that doesn't break the trust-building sequence.
  2. How does the calibration layer interact with organizational compliance requirements? In regulated industries, the agent's reasoning may need to be logged regardless of user preference.
  3. At what point does a saved workflow need to be recertified? If regulations change or the user's role expands, stale preferences become a liability.

### 11. Next Steps
Layout: `text-only` wide
- h2: "Where this goes next"
- Three sub-sections with h3 + paragraph each:

**Role-adaptive flow** — The current prototype presents the same calibration experience regardless of intake answers. The next iteration uses those answers to adjust the flow: document types surfaced, judgment scenarios presented, and agent language throughout. An auditor and a sales ops analyst are doing fundamentally different work.

**Multi-team rollout model** — The current design solves for individual onboarding. The next question is organizational: how does a team lead deploy this across twelve auditors without each person starting from scratch? A shared workflow template, seeded by a team lead and adjustable per user, would reduce setup time and create consistency.

**Workflow versioning** — As regulations change or a user's role expands, saved preferences become stale. A lightweight versioning system that flags when a saved workflow hasn't been reviewed in a defined period would keep the calibration layer accurate over time.

---

## TrustCalibrationFlow component ✓ Done

File location: `src/components/TrustCalibrationFlow/TrustCalibrationFlow.js` + `TrustCalibrationFlow.module.css`

Mark `'use client'` — uses Framer Motion.

### What it is
A horizontal user flow diagram showing the five-step calibration flow. Each step is rendered inside a categorical shape (rectangle or diamond) with the title inside the shape and the annotation below it. Shapes are connected by horizontal arrows. A legend at the bottom labels the three shape types.

### Five steps

| # | Title | Annotation | Shape type |
|---|---|---|---|
| 1 | Role and context intake | The agent asks before it acts. No configuration — just four plain-language questions. | User action |
| 2 | Past case upload | She uploads a resolved case. The agent confirms its understanding. She corrects anything wrong. | User action |
| 3 | Agent works the past case | She watches the agent reason through something she already knows. This is the baseline trust moment. | System response |
| 4 | User evaluates and adjusts | She flags what it got right and what it missed. Preferences emerge from experience, not hypothesis. | Decision |
| 5 | Live case | The agent works the real case inside the context she's established. At judgment boundaries, it pauses. | User action |

### Visual design
- White card background (`--color-surface`, `--shadow-card`, `--radius-lg`, `--space-10` padding)
- Horizontal layout on desktop (`flex` row, nodes `flex: 0 0 140px`, connectors `flex: 1`); vertical stack with downward arrows on mobile (≤768px)
- **User action** (steps 1, 2, 5): rounded rectangle, `--color-highlight-bg` fill, `--color-text-primary` label, `--radius-md`, 120px wide
- **System response** (step 3): same rectangle shape, `--color-accent` fill, white (`--color-white`) label
- **Decision** (step 4): CSS rotated square `100px × 100px` (`transform: rotate(45deg)`), white fill, 2px `--color-accent` border, `--radius-sm`; inner label counter-rotated (`rotate(-45deg)`), `max-width: 60px`, `--text-xs` 500
- **Connector arrow**: `flex: 1` horizontal line (`height: 1.5px`, `rgba(82,92,80,0.3)`), `margin-top: 74px` (= `shapeArea` 148px ÷ 2); right-pointing arrowhead via `::after` CSS border triangle; on mobile rotates to downward arrow
- **shapeArea**: each node has a fixed `height: 148px` container so all shapes share the same vertical midline
- Annotation: `--text-xs`, `--color-text-secondary`, centered below `shapeArea`, `margin-top: --space-3`
- Animate: each node fades and slides up (`y: 12 → 0`, `opacity: 0 → 1`) on `useInView`, 0.08s stagger, 0.45s duration, `cubic-bezier(0.16, 1, 0.3, 1)` ease
- Legend: 3-item row below a `--color-highlight-bg` divider — user action (peach swatch), system response (sage swatch), decision (rotated mini-diamond outline)

---

## Image assets needed

Add these to `public/images/case-studies/`:
- `trust-calibration-cover.png` — hero cover (placeholder ok to start)
- `trust-pyramid.png` — the NN/g pyramid diagram already created for LinkedIn
- `maya.png` — persona photo (placeholder ok to start)

---

## Build order

1. ✓ Page file scaffold + Hero section
2. ✓ Problem Statement section (text-only)
3. ✓ Diagnosis section (text-side-visual, trust pyramid image right)
4. ✓ What This Solves peach grid (section 6)
5. ✓ Stakeholders table + card wrap (section 7)
6. ✓ What This Doesn't Solve prose (section 8)
7. ✓ Success Metrics table + card wrap (section 9)
8. ✓ Open Questions numbered list (section 10)
9. ✓ Next Steps h3 sub-sections (section 11)
10. ✓ Prototype section — Figma Make embed at /prototype/index.html (section 7b)
11. ✓ PersonaCard with Maya's data (section 4) — `variant="automate"`, `wide` section, `maya.png` at `public/images/case-studies/`
12. ✓ TrustCalibrationFlow component (section 5) — static step diagram above the Figma Make embed
