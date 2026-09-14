# GadgetWise — Messaging Fact-Check Register

**Purpose:** every claim the prototype makes (copy, data, metrics) is tracked
here. If a claim isn't in this register, it isn't on the site.

- **Source:** `js/data.js` (all mock data) + `DESIGN.md` (visual contract)
- **Pages:** all 21 HTML files (`index.html`, public set, account set, admin set)
- **Owner:** CC 116 frontend prototype

---

## Claim register

| # | Claim | Where used | Source | Status |
|---|---|---|---|---|
| C1 | 20 gadgets in 6 categories (smartphones, laptops, tablets, headphones, powerbanks, smartwatches) | trust strip, footer | `data.js` `GW.gadgets` | ✅ seeded |
| C2 | Prices are realistic Philippine peso samples | gadgets.html lede | `data.js` | ✅ realistic range (₱8,999–₱39,999) |
| C3 | Ownership cost = price ÷ (lifestime × 12) | value tag formula, detail page | `data.js` `GW.monthlyCost` | ✅ formula shown verbatim |
| C4 | Durability and repairability scored | home hero points | `data.js` `g.value.repairabilityLabel`, `g.scored.repairability` | ✅ seeded 0–10 |
| C5 | "Explainable recommendations (no black box)" | home hero points | `recommendations.js` — full breakdown table | ✅ every factor shown |
| C6 | "Compare up to four gadgets" | home flow band, tray | `app.js` (compare cap = 4) | ✅ enforced in UI |
| C7 | "Keep a wishlist and comparison history" | home flow band | `app.js` (wishlist + compare sets) | ✅ localStorage-backed |
| C8 | Budget brackets: under ₱10k / 10–20k / 20–40k / 40–60k / 60k+ | recs step 1 | `data.js` `GW.budgetBands` | ✅ seeded |
| C9 | Academic use cases: General, Programming, Online Classes, Graphic Design, Research, Note-taking | recs step 2 | `data.js` `GW.useCases` | ✅ seeded |
| C10 | Priority factors: performance, battery, portability, display, storage, camera, durability, repairability | recs step 3 | `data.js` `GW.priorityFactors` | ✅ seeded |
| C11 | "Every point is accounted for" (rec breakdown) | rec result detail | `recommendations.js` `breakdown` | ✅ table shown |
| C12 | Average catalog rating | trust strip | `data.js` `GW.community.avgRating` | ✅ computed from seeded ratings |
| C13 | "Prototype — all products, prices, reviews, and metrics are mock data" | footer | footer copy | ✅ hard-coded |
| C14 | "Not a store; no products are sold here" | footer | footer copy | ✅ hard-coded |
| C15 | Admin dashboard metrics (users, views, trends) | admin-dashboard.html | `data.js` `GW.adminMetrics` | ✅ mock only |
| C16 | Moderation queue (pending reviews) | admin-reviews.html | `data.js` `GW.pendingReviews` | ✅ seeded |
| C17 | Reported issues triage | admin-issues.html | `data.js` `GW.issues` | ✅ seeded |
| C18 | User accounts (admin view) | admin-users.html | `data.js` `GW.users` | ✅ seeded |
| C19 | Charts: popular categories, views trend, comparisons, recommended | admin-reports.html, admin-dashboard.html | `js/charts.js` | ✅ mock data |
| C20 | "Prototype — separate from student accounts" | admin-login.html | hard-coded | ✅ copy |
| C21 | "Any credentials work" (mock gate) | admin-login.html, login.html | form submit handler | ✅ no real auth |

## Honest omissions (do NOT add without flagging)

- **No real product data** — every brand/model is fabricated (Novatek, Kaido, Aurio, Vantor, Lumina — none are real products)
- **No live pricing** — all prices are sample estimates only
- **No real user reviews** — all reviewers are fictional students with seeded quotes
- **No real social proof** — no follower counts, no "X students bought this" claims
- **No affiliate links** — no shopping CTAs, no "buy now" buttons
- **No real recommendation accuracy** — scoring is heuristic, not trained on purchase data

## Visual-only claims (design system)

| # | Claim | Where | Source | Status |
|---|---|---|---|---|
| D1 | Cobalt `#1a56db` = 6.3:1 contrast on white (AA) | DESIGN.md | WCAG calc | ✅ verified |
| D2 | All motion collapses under `prefers-reduced-motion` | `styles.css` L697 | media query | ✅ implemented |
| D3 | Single stroke weight for all icons | `app.js` icon system | 1.8 stroke | ✅ consistent |
| D4 | One accent (cural), one futuristic note (cyan) | DESIGN.md | token system | ✅ enforced |

## Fact-check method

1. Every piece of visible copy traced to a register row above before inclusion
2. Mock data ranges verified realistic (₱ prices appropriate for PH student market, ratings 3.0–5.0, specs plausible)
3. No inflated metrics (trust strip shows actual catalog count, not fabricated large numbers)
4. All claims about "real" data explicitly labeled as prototype/mock
5. Admin metrics clearly labeled "mock" in the dashboard copy

## Open questions for next iteration

| # | Question | Owner | Blocks |
|---|---|---|---|
| Q1 | Wire mobile nav hamburger to toggle menu class | — | mobile UX |
| Q2 | Add loading states to recommendation wizard transitions | — | perceived perf |
| Q3 | Confirm category icon choices match real product types | — | visual accuracy |
