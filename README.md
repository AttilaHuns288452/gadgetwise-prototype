# GadgetWise — Student Gadget Discovery & Comparison

**Prototype** for CC 116 (Web Systems & Technologies). Static, no build step, no
backend — every product, price, review, user, and metric is mock data.

Live: https://attilahuns288452.github.io/gadgetwise-prototype/

## What it does

GadgetWise helps Filipino students decide on gadgets before they buy: see real
specs, estimate the **₱/month cost of owning** (price ÷ realistic lifespan),
compare up to four side-by-side with differences highlighted, and get ranked
recommendations whose scoring you can audit factor by factor — no black box.

The whole thing runs on vanilla HTML/CSS/JS with one shared stylesheet, four
Google Fonts (Archivo / Hanken Grotesk / Spline Sans Mono), and locally-served
SVG placeholders. No dependencies beyond that.

## Pages

### Public

| File | Route | Purpose |
|---|---|---|
| `index.html` | Home | hero with live value tag, trust strip, categories, featured, flow band, CTA |
| `gadgets.html` | All Gadgets | filterable/sortable catalog with compare tray |
| `category.html?cat=` | Category | single-category view, reuses catalog grid |
| `gadget-detail.html?id=` | Gadget Detail | spec table, ownership formula, issues, reviews, similar |
| `compare.html` | Compare | side-by-side table, best-cell highlights |
| `recommendations.html` | Recommendations | 3-step wizard → ranked shortlist with score rings + breakdown |

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
| `admin-dashboard.html` | Dashboard | mock metrics, trend/category/rec charts |
| `admin-gadgets.html` | Gadget CRUD | list + filters |
| `admin-gadget-form.html` | Add/Edit Gadget | form |
| `admin-categories.html` | Categories | list |
| `admin-reviews.html` | Moderation Queue | pending reviews |
| `admin-issues.html` | Reported Issues | triage list |
| `admin-users.html` | Users | seeded student accounts |
| `admin-reports.html` | Reports | charts + data tables |

## Architecture

```
index.html              # home (hero + trust strip + featured + flow + CTA)
gadgets.html            # catalog (filter sidebar + grid)
category.html           # single-category catalog
gadget-detail.html      # spec table + ownership formula + reviews + issues
compare.html            # 2–4 way comparison table
recommendations.html    # 3-step wizard → scored results

admin-*.html            # 9 admin pages (dark sidebar shell, separate nav)

login.html / register.html / profile.html / wishlist.html
review-history.html / comparison-history.html

css/styles.css          # 758 lines, single shared stylesheet

js/data.js              # mock dataset + lookups + cost helpers
js/app.js               # shell (header/footer), icons, state, cards, tray, modals
js/catalog.js           # filter/sort/search grid logic
js/detail.js            # detail page (specs, ownership formula, reviews, issues)
js/comparison.js        # compare table rendering + best-cell logic
js/recommendations.js   # scoring engine (budget fit + academic fit + priority-weighted)
js/charts.js            # admin charts (h-bar, donut, line)
js/admin.js             # admin dashboard rendering

assets/placeholders/    # 26 SVG placeholders (blue-tinted, per category)
```

## Design system

See `DESIGN.md` for the full contract. World: **Cobalt Ledger** — cool light
ground, ink-navy text, cobalt `#1a56db` reserved for actions and measured
values, cyan `#7cc9f5` only for admin/logo detail.

- **Display:** Archivo 500–800 (headings, buttons, prices)
- **Body:** Hanken Grotesk 400–700, 15.5px / 1.6
- **Mono:** Spline Sans Mono (every measured value: ₱/month, score rings, breakdown)
- **Signature:** the value tag (price rows → cobalt ₱/month total), score ring (SVG donut), compare best-cell (accent-wash + advantage chip)

All motion collapses under `prefers-reduced-motion`.

## Data status

Everything in `js/data.js` is **mock / fabricated for the prototype**:

- 20 gadgets across 6 categories (names, specs, prices, ratings — all fictional)
- Reviews, issues, user accounts, metrics — all seeded
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

# All pages + assets return 200
for p in index.html gadgets.html recommendations.html compare.html; do
  curl -s -o /dev/null -w "%{http_code} $p\n" http://localhost:8765/$p
done
```

## Status

Landing page restructured (multi-page architecture, proper design system, no
demo-language leaks, no admin link in public nav, honest trust strip). All
pages verified live. Ready for next round of polish.

**Known gaps:**
- Mobile nav menu JS not wired (hamburger button is markup-only)
- Contact/demo account flows are mock gates (any credentials → redirect)
- No real backend (by design — prototype scope)
- Recommendation history relies on `localStorage` (resets on clear)
