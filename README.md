# GadgetWise — Student Gadget Discovery & Comparison

**Prototype** for CC 116 (Web Systems & Technologies). Static, no build step, no
backend — every product, price, review, user, and metric is demo data.

Live: https://attilahuns288452.github.io/gadgetwise-prototype/

## What it does

GadgetWise helps Filipino students decide on gadgets before they buy: see real
specs, estimate the **₱/month cost of owning** (price ÷ fixed 36-month window),
compare up to four side-by-side with differences highlighted, and get ranked
recommendations whose scoring you can audit factor by factor — no black box,
no AI in the loop.

## Data provenance

The catalog uses **real product names and Wikimedia Commons photos**; specs,
prices, scores, reviews, and issues remain illustrative demo data. Every value
classifies as exactly one of:

| Class | Fields | Source |
|---|---|---|
| RAW (marketplace) | name, brand, category, price, image, specs, specList, releaseYear | Product/marketplace source (prototype: hand-entered from retail listings; images from Wikimedia Commons) |
| GW-EDITORIAL | `scored` display/camera/storage, `value{}` (warranty, lifespan, repair path), `strengths/weaknesses/goodFor/notIdeal`, `issue` | Manually maintained GadgetWise catalog values |
| GW-CALCULATED | monthly cost, Performance to Cost index, all recommendation factor scores | Deterministic formulas, documented below |
| USER-GENERATED | rating, reviewCount, reviews | GadgetWise website users (seeded demo data) |

Marketplace sources (Shopee/Lazada in the production design) provide only product
identity, price, imagery, and basic specs. Durability beyond the editorial
`scored.durability` catalog rating, expected lifespan, and student ratings are
**never** claimed from an API.

**Core metrics (final set):** Budget Fit, Performance, Battery,
Portability, Academic Suitability, Value (cost per month), Student Rating.

**Performance to Cost index** = battery 25 (catalog battery spec) +
student rating 25 (GW users) + value 30 (price vs category median monthly
cost) + warranty 20 (catalog fact).

**Cost per month** = price ÷ 36 (fixed 36-month usage window for every
gadget — one documented assumption, applied identically, so numbers stay
comparable; no per-product lifespan invention).

**Recommendation score (100 pts)** = Budget Fit 20 (fixed, doubles as a
hard filter above the stretch limit) + Academic Suitability 25 (fixed,
criteria-weighted per use case) + Community Rating 5 (fixed) + 50
adjustable points redistributed by user priorities (performance 20 raw,
battery 15, cost per month 15, portability/display/camera/storage 0;
priorities push raw weights, then normalize to 50). Missing specs are
never invented: a missing spec shows as "Not specified" and contributes
nothing to a score. Same inputs → same ranking, always.

The whole thing runs on vanilla HTML/CSS/JS with two stylesheets
(`styles.css` tokens + `identity.css` Ledger Slate layer), two Google Fonts
(Hanken Grotesk / Spline Sans Mono), and Wikimedia Commons product
photos. No dependencies beyond that.

## Pages

### Public

| File | Route | Purpose |
|---|---|---|
| `index.html` | Home | hero with clickable showcase, trust strip, categories, editorial, scatter, flow band, CTA |
| `gadgets.html` | All Gadgets | filterable/sortable catalog with compare tray |
| `category.html?cat=` | Category | single-category view, reuses catalog grid |
| `gadget-detail.html?id=` | Gadget Detail | spec table, ownership formula, issues, reviews, similar |
| `compare.html` | Compare | side-by-side table, best-cell highlights, sticky labels |
| `recommendations.html` | Recommendations | 5-step wizard → ranked shortlist with score rings + breakdown |

### Account (mock auth)

| File | Route | Purpose |
|---|---|---|
| `wishlist.html` | Wishlist | saved gadgets |
| `profile.html` | Profile | seeded student account |
| `login.html` | Log in | mock gate (any creds) |
| `register.html` | Register | mock gate |
| `review-history.html` | Review History | seeded reviews |
| `comparison-history.html` | Comparison History | seeded + live session |

### Admin (separate shell)

| File | Route | Purpose |
|---|---|---|
| `admin-login.html` | Admin Gate | mock gate (any creds) |
| `admin-dashboard.html` | Dashboard | live counts from dataset + metrics, top views, queue preview |
| `admin-gadgets.html` | Gadget CRUD | list + search/filters + delete (persists) |
| `admin-gadget-form.html` | Add/Edit Gadget | form + mock product-API prefill; saves to the dataset |
| `admin-categories.html` | Categories | full add/edit/delete with duplicate + non-empty guards |
| `admin-reviews.html` | Moderation Queue | approve / reject / edit / delete every review; approved go public |
| `admin-issues.html` | Reported Issues | verify / under review / resolve / delete spam |
| `admin-users.html` | Users | seeded accounts + live search + suspend/activate (persists) |
| `admin-reports.html` | Reports | charts + data tables |
| `admin-quality.html` | Data Quality | unit-consistency + completeness audit across the catalog |
| `admin-data.html` | Data Export | JSON export/import of the catalog + reset to sample data |

Admin changes persist in the browser via `GWStore` (localStorage overlay over
the mock dataset, `gw_admin_overlay_v1`). They survive reloads and are visible
on the public pages — e.g. an approved review appears on the gadget detail
page and counts toward its rating. "Reset to sample data" on the Data Export
page clears every admin change.

## Architecture

```
index.html              # home (hero + showcase + trust strip + editorial + scatter + flow + CTA)
gadgets.html            # catalog (filter sidebar + grid)
category.html           # single-category catalog
gadget-detail.html      # spec table + ownership formula + reviews + issues
compare.html            # 2–4 way comparison table (sticky row labels)
recommendations.html    # 5-step wizard → scored results

admin-*.html            # 11 admin pages (dark sidebar shell, separate nav)

login.html / register.html / profile.html / wishlist.html
review-history.html / comparison-history.html

css/styles.css          # tokens + components (Ledger Slate v7)
css/identity.css        # identity layer (hero, tints, signatures)

js/data.js              # demo catalog + lookups + cost helpers
js/app.js               # shell (header/footer), icons, state, cards, tray, modals, scatter
js/catalog.js           # filter/sort/search grid logic
js/detail.js            # detail page (specs, ownership formula, reviews, issues)
js/comparison.js        # compare table rendering + best-cell logic
js/recommendations.js   # scoring engine (budget fit + academic fit + priority-weighted)
js/charts.js            # admin charts (h-bar, donut, line)
js/admin-store.js       # admin persistence: localStorage overlay applied over the dataset
js/admin.js             # admin pages logic + admin sidebar shell
js/cat-icons.js         # category SVG icons

assets/placeholders/    # legacy blue-tinted SVG placeholders (superseded by Commons photos)
```

## Design system

See `DESIGN.md` for the full contract. World: **Ledger Slate (v7, institutional)** — cool
paper ground, ink text, electric blue `#2563EB` for actions and measured
values, deep signal amber `#B45309` reserved for the best-value frontier and
favorites. Archivo / Hanken Grotesk / Spline Sans Mono.

All motion collapses under `prefers-reduced-motion`.

## Data status

Everything in `js/data.js` beyond product identity is **demo / fabricated for
the prototype**:

- Real product names/photos; specs, prices, ratings, reviews, issues, users,
  metrics — all seeded demo values
- Admin dashboard charts — all mock numbers
- No real API calls, no live data

This is deliberate: the project demonstrates information architecture, layout,
and interaction patterns without a backend.

## Run locally

```bash
cd gadgetwise-prototype
python3 -m http.server 8765
# → http://localhost:8765
```

Or just open `index.html` in a browser (no build step needed).

## Verification

```bash
# All JS modules parse
for f in js/*.js; do node -c "$f" || echo "FAIL: $f"; done

# Smoke tests (catalog filters + recommendation engine)
node test-catalog.js
node test-rec.js

# All pages + assets return 200
for p in index.html gadgets.html recommendations.html compare.html; do
  curl -s -o /dev/null -w "%{http_code} $p\n" http://localhost:8765/$p
done
```

## Status

Ledger Slate v7 pass complete: institutional re-styling (cool neutrals, one
deep blue, muted signal amber, hairline borders, no hover-lift), unified
palette and tokens, accessibility pass
(skip links, live-region toasts, modal focus trap, aria-pressed wizard cards,
44px touch targets, sticky compare labels), broken flows fixed (custom-budget
wizard dead-end, mobile search, clickable hero showcase, build-quality filter),
honesty leaks closed (footer provenance, shaped rating disclosure, no
price-chip exception). All pages carry the favicon. Ready for Figma import —
see `DESIGN.md` for the token/section mapping.

**Known gaps:**
- Contact/demo account flows are mock gates (any credentials → redirect)
- No real backend (by design — prototype scope)
- History and wishlist rely on `localStorage` (resets on clear)
- Rating distributions are shaped from averages (disclosed on the detail page)
