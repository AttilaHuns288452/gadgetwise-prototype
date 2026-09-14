# DESIGN.md — GadgetWise design system

Recorded from the built implementation (not intention). World name: **Cobalt Ledger** — the value tag reformed into a consumer report; professional, cool, quietly futuristic. Client direction pinned the palette: blue shades, professional, easy to read, slightly futuristic, explicitly not the previous jade theme.

## World

- **Ground:** cool light. `--paper #f4f6fa` page, `--surface #ffffff` cards, `--surface-2 #eef1f7` wells.
- **Ink:** navy-black ramp. `--ink #10151d`, `--ink-2 #3d4757`, `--ink-3 #667181`.
- **Lines:** cool blue-gray. `--line #dde2ec`, `--line-2 #c9d1e0`.
- **Accent:** cobalt `#1a56db` (hover `#1447b8`, soft `#e3ecfc`, wash `#eef3fe`). Reserved for actions, active states, and measured values (₱/month figures, score rings, meter fills, best-cells, chart series). Not a decorative wash.
- **Cyan `#7cc9f5`:** the one futuristic note — admin sidebar active state, admin logo detail, toast icon. Never used on public pages as a large surface.
- **Semantic only:** amber `#8a6d1f` (warnings/pending), red `#b3372e` (destructive/rejected), green `#1f7a44` (approved/best-cell tint). Stars are amber.
- **Forbidden:** the previous jade/mint palette (`#0e6b5c`, `#7fd4c2`, `#4e9d8e`, `#8fbfab`, `#c3ded4`), gradients, glass, neon, pill badges.

## Typography

- **Display:** Archivo 500–800, `-0.02em` to `-0.03em`. Headings, buttons, prices.
- **Body:** Hanken Grotesk 400–700, body size 15.5px/1.6.
- **Mono:** Spline Sans Mono — every measured value (prices in tables, breakdown fractions, chart values, weights).
- Google Fonts link is identical on all 21 pages; fallbacks: Helvetica Neue/Arial, Consolas.

## Signature components

- **Value tag** (`.value-tag`): white card with a small punched-hole detail (top-left 9px ring), price rows, and the cobalt ₱/month total with dashed rule above. Appears on home (hero), every catalog card (compact estimate line), every detail page.
- **Score ring** (`.score-ring`): SVG donut, cobalt arc on `--surface-2`, mono numeral — recommendation results.
- **Compare best-cell:** `--accent-wash` tint + cobalt value + advantage chip ("Lower price", "Cheaper to own"…), only on ≥8% spreads.
- **Meters:** 6px tracks, cobalt fills, mono values.
- **Priority segments** (recommendation wizard): 4-state segmented control — none/low tint gray, medium soft-blue, high solid cobalt.

## Admin variation

Same tokens, dark ink-navy sidebar (`#10151d`), cyan active nav + logo detail, `ADMIN` chip. Public pages never use the dark sidebar; admin pages never show the public hero.

## Charts (dataviz-compliant)

- Horizontal bars for magnitude (cobalt fills, mono value labels, recessive tracks).
- Donut for category share: fixed sequential cobalt order `#1a56db → #5c8ae6 → #93b1ee → #c3d4f6`, then navy `#33415c`/`#8195b3`; ≤6 slices; 2px white spacers; direct legend.
- Single-series line for the trend: 2px cobalt, dots with native tooltips, recessive grid, k-formatted axis.
- Every chart has a data-table toggle — the table is the source of truth.

## Motion

One authored entrance: home hero children rise in sequence (0.55s ease, 60ms stagger), value tag follows. Hover lifts on cards (`translateY(-2px)` + shadow). All motion collapses under `prefers-reduced-motion`.

## Layout system

`--header-h: 64px` sticky header; containers at 1180/880px; radii 6/10/14; shadows two-step (1px + 10-24px soft). Sidebar layouts (catalog filters, rec steps, admin) collapse to stacked at 900px; grids go 3→2→1; admin nav becomes a wrapped row.

## Accessibility

Cobalt `#1a56db` on white = 6.3:1 (AA for normal text); ink on paper > 15:1. Focus-visible ring on all controls; `aria-pressed`/`aria-selected` on toggles/tabs; empty states have actions; skip link on shell pages.

## Page inventory (21 HTML)

Public: `index`, `gadgets`, `category`, `gadget-detail`, `compare`, `recommendations`. Account: `wishlist`, `profile`, `review-history`, `comparison-history`, `login`, `register`. Admin: `admin-login`, `admin-dashboard`, `admin-gadgets`, `admin-gadget-form`, `admin-categories`, `admin-reviews`, `admin-issues`, `admin-users`, `admin-reports`.

JS modules: `data.js` (mock dataset + lookup/cost helpers), `app.js` (shell, icons, state, cards, tray, toasts, modals), `catalog.js`, `detail.js`, `comparison.js`, `recommendations.js` (scoring engine), `charts.js`, `admin.js`. Assets: 26 generated SVG placeholders in blue tints, all locally served.
