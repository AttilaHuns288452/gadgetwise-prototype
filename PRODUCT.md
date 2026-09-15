# Product

## Platform

web

## Stack

Static HTML/CSS/JS, single shared stylesheet, no build step. Vanilla JS modules
(no framework, no bundler), locally-served SVG placeholders, Google Fonts.
Deliberately backend-less — every product, price, review, user, and metric is
seeded mock data in `js/data.js`.

## Users

- **Primary:** Filipino students (college/high school) choosing gadgets on a
  budget. They care about: price, how long it lasts, repairability, and whether
  a recommendation engine shows its work.
- **Secondary:** CC 116 course evaluators (instructor, classmates) — the public
  pages are the grade-facing artifact; the admin console shows catalog
  moderation and reporting workflows.

## Product Purpose

GadgetWise is a purchase-decision aid, not a store. It refuses e-commerce
chrome (no cart, no checkout, no affiliate links). Its job: a student discovers
a gadget, sees its ₱/month ownership cost at a glance, verifies the math
(price ÷ catalog lifespan, formula shown), compares up to four side-by-side with
meaningful differences highlighted, then gets a ranked recommendation whose
scoring is fully auditable — factor by factor, point by point.

Success: a visitor leaves understanding *why* a gadget ranks where it does.

## Positioning

Consumer Reports, not a store. Transparent durability and ownership-cost
scoring for a student budget. Everything competitors hide (repairability,
realistic lifespan, the formula) is surfaced. Nothing is sold; no ads; no
affiliate links.

## Information architecture

Six categories, ~20 gadgets, one canonical detail page each. The browse →
evaluate → compare → recommend → save flow is the spine; every page serves
one of those steps. The trust strip, featured section, flow band, and CTA band
on the home page are the onboarding sequence into that flow.

## Design

`DESIGN.md` is the visual contract (Cobalt Ledger — cobalt on cool light,
Archivo/Hanken Grotesk/Spline Sans Mono, one accent, one stroke set, motion
collapses under `prefers-reduced-motion`). Admin reuses the same tokens with
a dark ink-navy sidebar and cyan active state.

## Honesty rules

- No real product data: every brand, model, spec, price, review, issue, user,
  and metric is fabricated and labeled as prototype data where it appears.
- No inflated social proof: trust strip shows only what the prototype actually
  contains (gadget count, review count, avg rating, categories covered).
- No black box: the recommendation engine exposes every factor, weight, and
  partial score. The home-page value tag shows the formula
  (`price ÷ (lifespan × 12)`).
- No store: no cart, no checkout, no affiliate links, no real store prices.
  Contact/auth flows are mock gates (any credentials → redirect).

## Constraints

- No backend: all state is `localStorage` (wishlist, compare set, last
  recommendation, seeded history). Clears on browser data wipe.
- No real auth: login/register/admin gates accept any input and redirect. The
  student profile, review history, and comparison history are seeded data.
- No live prices or availability: all pricing is realistic sample data only.
- No real user-generated content: reviews, issues, and moderation queue are
  seeded for the prototype.

## Status

Landing restructured to multi-page Cobalt Ledger architecture (21 pages). All
modules pass `node -c`; all routes verified 200 on local serve and on GitHub
Pages. Next: any further polish pass the user requests.
