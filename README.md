# GadgetWise — Student Gadget Comparison & Recommendation

**Prototype** for CC 116. Single-page app — the entire site lives in
`index.html` (no build step, no backend; all products/prices/reviews are
demo data, labeled as such on-page).

Live: https://attilahuns288452.github.io/gadgetwise-prototype/

## What's inside

- **Views:** Home · Browse · Recommend (6-step quiz with priority sliders) ·
  Compare (2–3 way table) · Account (wishlist/reviews/history/profile) ·
  Admin (dashboard, API fetch demo, moderation) — all SPA-routed via `go()`.
- **Price vs Ownership Index scatter** — AA-style: price (x) vs Ownership
  Index (y), amber Pareto-frontier dots, clickable dots open the detail
  modal. **Category filter tabs** (All + 6 categories with counts); axes
  auto-rescale per filter so category views use the full plot.
- **Ownership Index** = durability 25 + repairability 20 + battery 20 +
  warranty 15 + student rating 20 (out of 100). Formula shown in the chart
  caption and card tooltips.
- **10 real products** (MacBook Air M1, Aspire 5, Vivobook, iPad 9, Xiaomi
  Pad 7, Redmi Note 11, Galaxy S23, JBL E50BT, Anker PowerCore, Amazfit Bip)
  with Wikimedia Commons photos, strengths/weaknesses, good-for/not-ideal,
  student reviews, reported issues.
- **Recommend quiz v3** — budget bands + custom slider, main use, AA-style
  labeled priority sliders (Skip it → Top priority), must-have chips,
  auditable scoring with full breakdown.
- **Compare honesty** — ties are never marked as wins; near-close verdicts
  say so; monthly cost = price ÷ lifespan ÷ 12.

## Verify

```bash
node test-scatter.js   # formula parity + Pareto property across all category filters
python3 -m http.server 8765
curl -s -o /dev/null -w '%{http_code}' http://localhost:8765/index.html   # 200
```

## History

- `fac3629` — the refined single-page build (this one).
- `639a342`–`d3f0e77` — a multi-page "Cobalt Ledger" redesign experiment
  (21 pages, separate css/js); user preferred the original, reverted in
  `6192b7a`. The scatter's category-filter improvement from that round was
  kept. Old docs (PRODUCT.md, DESIGN.md, messaging.md) describe that
  superseded build and are kept for reference only.
