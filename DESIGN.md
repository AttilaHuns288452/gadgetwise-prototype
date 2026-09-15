# DESIGN.md — GadgetWise design system

Recorded from the built implementation (not intention). World name: **Ledger Slate (v7, institutional)** — designed to read like a consumer-report / university tool, not a startup landing page: cool neutral ground, white cards on hairline borders, one deep institutional blue, one muted signal amber, no decorative color, no hover-lift motion. Deliberately flat and quiet so the data (prices, scores, formulas) is the loudest thing on every page.

## World

- **Ground:** cool light. `--bg #F7F8FA` page, `--surface #FFFFFF` cards, `--surface-2 #F1F3F6` wells.
- **Ink:** near-black slate ramp. `--ink #0F1722`, `--ink-2 #3E4C61`, `--ink-3 #64748B` — all AA on their grounds.
- **Primary:** institutional blue `#1D5BA4` (hover `#164A86`, soft `#E7EFF8`, wash `#F3F7FB`). Reserved for actions, active states, and measured values (₱/month figures, score chips and rings, meter fills, best-cells, chart series). Not a decorative wash.
- **Signal amber `#9A5B10`** on light surfaces; its light-gold form `#D9A441` on the dark navy band. Uses: best-value frontier dots/line on the scatter, "Student favorite" flag, warnings/pending, stars (`--star #B07C28`). Never a large surface.
- **Semantic only:** green `#1F7A44` (approved/best), red `#B3372E` (destructive/rejected), amber `#96631F` (pending). Pills (`.badge`) are status-only; meta chips (`.tag`) are rectangular.
- **Dark surfaces:** one navy `#14213A` shared by hero, footer, compare tray, CTA, and admin sidebar. Quiet blue `#9CC3EE` only inside the admin active state and toast icons.
- **Forbidden:** gradients, glass, neon, decorative pills, hover-lift transforms, per-category tint palettes, bright electric blues (#2563EB-class).
- **Radii:** 4/8/12 — sharp, institutional. **Shadows:** near-flat (1px hairline + one soft lift, no deep stacks).

## Typography

- **UI + display:** Hanken Grotesk 400–800 — headings use weight and size, not a second family. Body 15.5px/1.6.
- **Mono:** Spline Sans Mono — every measured value (prices in tables, breakdown fractions, chart values, weights). Data set in mono is the site's typographic signature.
- Google Fonts link is identical on all 21 pages (two families, not three); fallbacks: Helvetica Neue/Arial, Consolas.

## Tokens & scale (Figma-friendly)

All spacing sits on a 4px scale (`--space-1…8` = 4→64px); radii 4/8/12 (`--r-sm/md/lg`); shadows two-step (`--shadow-1/2`); focus ring token `--ring`. `css/styles.css` is ordered **tokens → base → primitives → components → sections → responsive**, so each section maps to a Figma page/frames in the same order. The logo is a fixed 28px SVG block (`.gw-logo-mark`): rounded square #1D5BA4, white hexagon outline, three muted-gold inner lines.

## Signature components

- **Value tag** (`.value-tag`): white card, 3px cobalt top border, punched-hole detail, price rows, and the ₱/month total on a blue wash band. Home hero (as a clickable showcase card), catalog cards (compact estimate line), detail pages.
- **Hero showcase:** the home hero's product panel is a real link to the featured gadget's detail page.
- **Score ring** (`.score-ring`): SVG donut, blue arc — recommendation results.
- **Compare best-cell:** `--primary-wash` tint + 3px blue inset bar + advantage chip; only on ≥8% spreads, price included — near-ties stay quiet everywhere.
- **Meters:** 6px tracks, blue fills, mono values.
- **Priority segments** (recommendation wizard): 4-state segmented control — none/low tint gray, medium soft-blue, high solid blue.

## Admin variation

Same tokens, the shared navy sidebar, quiet-blue active nav + gold logo accent, `ADMIN` chip. Public pages never use the dark sidebar; admin pages never show the public hero.

## Charts

- Horizontal bars for magnitude (blue fills, mono value labels, recessive tracks).
- Donut for category share: fixed sequential blue order `#1D5BA4 → #4C7EBF → #7FA3D1 → #B3C8E4`, then gold `#D9A441` and slate `#33415C`; ≤6 slices; direct legend.
- Single-series line for trends: 2px blue, dots with native tooltips, recessive grid.
- Price-vs-index scatter: blue dots, **deep amber** frontier line/dots (legend spells both out).
- Every admin chart has a data-table toggle — the table is the source of truth.

## Motion

One authored entrance: home hero children fade-rise once (0.5s ease, 50ms stagger). No hover-lift transforms anywhere — cards respond with border/shadow changes only. All motion collapses under `prefers-reduced-motion`.

## Layout system

`--header-h: 64px` sticky header; containers at 1180/880px; sidebar layouts (catalog filters, rec steps, admin) collapse at 900px; grids go 3→2→1; admin nav becomes a wrapped row. Below 900px the header search swaps to a dedicated mobile search row; the mobile menu contains nav + account links.

## Accessibility

- Ink ramp AA throughout; deep signal amber `#9A5B10` = 5.4:1 on white (AA normal); light gold `#D9A441` used only on the navy band (5.2:1).
- Skip link on every shell page (`.skip-link`); `:focus-visible` ring on all controls.
- Toasts live in a polite `aria-live` region; modals trap focus and return it on close.
- Wizard choice cards and priority segments carry `aria-pressed`; tabs use `role="tablist"` with `aria-selected`.
- 44px minimum touch targets on mobile inputs, menu items, and card actions (relaxed on fine-pointer devices).
- Compare table keeps a sticky row-label column on horizontal scroll.
- Empty states have actions; honest copy on shaped rating distributions.

## Page inventory (21 HTML)

Public: `index`, `gadgets`, `category`, `gadget-detail`, `compare`, `recommendations`. Account: `wishlist`, `profile`, `review-history`, `comparison-history`, `login`, `register`. Admin: `admin-login`, `admin-dashboard`, `admin-gadgets`, `admin-gadget-form`, `admin-categories`, `admin-reviews`, `admin-issues`, `admin-users`, `admin-reports`.

JS modules: `data.js` (real-product demo catalog + lookups/cost helpers), `app.js` (shell, icons, state, cards, tray, toasts, modals, scatter), `catalog.js`, `detail.js`, `comparison.js`, `recommendations.js` (scoring engine), `charts.js`, `admin.js`, `cat-icons.js`. Styles: `css/styles.css` (tokens + components) and `css/identity.css` (Ledger Slate v7 identity layer).
