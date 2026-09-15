/* ============================================================
   GadgetWise — js/recommendations.js
   Transparent weighted scoring engine. No ML: every point is
   accounted for and shown to the user.

   Score structure (out of 100):
     Budget Fit             20 pts (fixed)
     Academic Suitability   25 pts (fixed)
     Adjustable factors     50 pts (rebalanced by user priorities)
     Community Rating        5 pts (fixed)

   Adjustable factor raw weights (sum to 1 before priority
   redistribution):
     performance 20, battery 15, cost per month 15,
     portability/display/camera/storage 0,
     display 0, camera 0, storage 0

   The user's priority selections (none / low / medium / high)
   push additional weight into their chosen factors. High = 2,
   Medium = 1, Low = -0.5 (low explicitly signals "don't care").
   Factor scores are normalized 0–1 against the category pool
   before weighting, so 0–10 spec ratings combine fairly.
   ============================================================ */

window.GWRec = (function () {
  "use strict";

  const money = n => GWApp.money(n);
  const esc = s => GWApp.esc(s);

  /* ---------------- helpers ---------------- */
  function clamp01(x) { return Math.max(0, Math.min(1, x)); }

  // Normalize a 0–10 spec score to 0–1 relative to its category pool.
  // With fewer than 3 points in a pool, fall back to the absolute scale.
  function normalize(value, pool) {
    if (!pool || pool.length < 3) return clamp01(value / 10);
    const min = Math.min(...pool), max = Math.max(...pool);
    if (max - min < 0.75) return clamp01(value / 10); // near-uniform pool
    return clamp01((value - min) / (max - min));
  }

  // Budget fit (0–1): comfortably under budget scores best.
  function budgetFit(price, min, max) {
    if (max === Infinity) {
      return price >= min ? 1 : clamp01(price / Math.max(min, 1));
    }
    if (price >= min && price <= max) {
      // 1.0 at ≤70% of the band used, easing to 0.85 at the top of the band.
      const used = (price - min) / (max - min);
      return 1 - used * 0.15;
    }
    const ceiling = max;
    if (price < min) {
      // far below the band: fits budget but flags possible under-buy
      return clamp01(0.55 + 0.45 * (1 - Math.min(1, (min - price) / Math.max(min, 1))));
    }
    const over = (price - ceiling) / Math.max(ceiling, 1);
    return clamp01(1 - over * 2.2); // 30% over → 0.34; 45%+ → 0
  }

  // Academic suitability (0–1) from the use-case criteria profile.
  function academicFit(gadget, useCase, pool) {
    const crit = useCase.criteria; // { factor: importance 1..5 }
    let sum = 0, weight = 0;
    for (const [factor, imp] of Object.entries(crit)) {
      const v = factor === "storage" ? gadget.scored.storage : gadget.scored[factor];
      sum += imp * normalize(v, pool[factor]);
      weight += imp;
    }
    return weight ? sum / weight : 0;
  }

  // Ownership value (0–1): lower monthly cost vs. category pool is better.
  function ownershipValue(gadget, pool) {
    const monthly = GW.monthlyCost(gadget);
    return 1 - normalize(monthly, pool._monthly);
  }

  function buildPools() {
    const pools = {};
    const factors = ["performance", "battery", "portability", "display", "camera", "storage"];
    GW.categories.forEach(c => {
      const list = GW.gadgetsInCategory(c.id);
      factors.forEach(f => { (pools[f] = pools[f] || []).push(...list.map(g => g.scored[f])); });
      pools._monthly = pools._monthly || [];
      pools._monthly.push(...list.map(GW.monthlyCost));
    });
    return pools;
  }

  /* ---------------- priorities ---------------- */
  const FACTOR_META = {
    performance:   { label: "Performance",    raw: 20, pts: 20 },
    battery:       { label: "Battery life",   raw: 15, pts: 15 },
    value:         { label: "Cost per month", raw: 15, pts: 15 },
    portability:   { label: "Portability",    raw: 0,  pts: 0 },
    display:       { label: "Display",        raw: 0,  pts: 0 },
    camera:        { label: "Camera",         raw: 0,  pts: 0 },
    storage:       { label: "Storage",        raw: 0,  pts: 0 }
  };
  const PUSH = { low: -0.5, medium: 1, high: 2 };

  // Rebalance the adjustable 50 points according to user priorities.
  // Returns { weights: {factor: pts}, notes: [strings] }
  function rebalance(priorities) {
    const notes = [];
    const meta = { ...FACTOR_META };
    // Apply pushes
    for (const [f, sel] of Object.entries(priorities || {})) {
      if (!meta[f] || sel === "none") continue;
      const before = meta[f].raw;
      meta[f].raw = Math.max(0, before + (before > 0 ? before : 4) * PUSH[sel] * (before > 0 ? 0.5 : 1));
      if (meta[f].raw === 0 && PUSH[sel] > 0) meta[f].raw = 2; // a 0-raw factor can still be elevated
    }
    const total = Object.values(meta).reduce((n, m) => n + m.raw, 0);
    const weights = {};
    for (const [f, m] of Object.entries(meta)) {
      weights[f] = (m.raw / total) * 50;
    }
    // Human-readable note
    const elevated = Object.entries(priorities || {}).filter(([f, s]) => (s === "high" || s === "medium") && FACTOR_META[f])
      .map(([f, s]) => `${FACTOR_META[f].label} (${s})`);
    if (elevated.length) notes.push(`Priorities shifted weight toward ${elevated.join(", ")}.`);
    const dropped = Object.entries(priorities || {}).filter(([f, s]) => s === "low" && FACTOR_META[f]).map(([f]) => FACTOR_META[f].label);
    if (dropped.length) notes.push(`${dropped.join(", ")} marked low priority — less weight assigned.`);
    return { weights, notes };
  }

  /* ---------------- scoring ---------------- */
  /**
   * scoreGadget(gadget, opts) →
   * { total, factors: [{key, label, earned, max, note}], totalMax: 100 }
   */
  function scoreGadget(gadget, opts) {
    const pools = buildPools();
    const catPools = pools; // pools are global; per-category would over-normalize small sets
    const weights = opts.weights;
    const useCase = opts.useCase;
    const budget = opts.budget; // {min, max, label}
    const factors = [];

    // 1. Budget fit — 20
    const bf = budgetFit(gadget.price, budget.min, budget.max);
    factors.push({
      key: "budget", label: "Budget Fit", earned: +(bf * 20).toFixed(1), max: 20,
      note: budget.max === Infinity
        ? `₱${gadget.price.toLocaleString("en-PH")} vs. your ${budget.label} budget`
        : (gadget.price > budget.max
          ? `₱${gadget.price.toLocaleString("en-PH")} is ${money(gadget.price - budget.max)} over your budget`
          : `₱${gadget.price.toLocaleString("en-PH")} within your budget`)
    });

    // 2. Academic suitability — 25
    const af = academicFit(gadget, useCase, catPools);
    factors.push({
      key: "academic", label: "Academic Suitability", earned: +(af * 25).toFixed(1), max: 25,
      note: `Matched against “${useCase.label}” requirements`
    });

    // 3–10. Adjustable factors — 50 total
    const adjust = [
      ["performance", g => g.scored.performance],
      ["battery", g => g.scored.battery],
      ["value", g => ownershipValue(g, catPools), "vs. category monthly cost"],
      ["portability", g => g.scored.portability],
      ["display", g => g.scored.display],
      ["camera", g => g.scored.camera],
      ["storage", g => g.scored.storage]
    ];
    adjust.forEach(([key, get, note]) => {
      const max = weights[key] || 0;
      if (max <= 0.01) return;
      let v01;
      if (key === "value") v01 = ownershipValue(gadget, catPools);
      else v01 = normalize(get(gadget), catPools[key]);
      factors.push({
        key, label: FACTOR_META[key].label, earned: +(v01 * max).toFixed(1), max: +max.toFixed(1),
        note: note || (typeof get(gadget) === "number" && key !== "value" ? `${get(gadget).toFixed(1)} / 10 among comparable gadgets` : "")
      });
    });

    // 11. Community rating — 5
    const cr = clamp01((gadget.rating - 3.2) / 1.8); // 3.2★ → 0, 5★ → 1
    factors.push({
      key: "community", label: "Community Rating", earned: +(cr * 5).toFixed(1), max: 5,
      note: `${gadget.rating.toFixed(1)}★ from ${gadget.reviewCount} student reviews`
    });

    const total = factors.reduce((n, f) => n + f.earned, 0);
    return { total: Math.round(total), factors };
  }

  /* ---------------- reasons ---------------- */
  function reasons(gadget, breakdown, opts) {
    const out = [];
    const f = Object.fromEntries(breakdown.factors.map(x => [x.key, x]));
    if (f.budget.earned >= f.budget.max * 0.85) {
      if (gadget.price < opts.budget.min) out.push(`Under your ${opts.budget.label} budget at ${money(gadget.price)}`);
      else out.push(`Fits your ${opts.budget.label} budget at ${money(gadget.price)}`);
    }
    else if (f.budget.earned >= f.budget.max * 0.6) out.push(`Close to your budget at ${money(gadget.price)}`);
    if (f.academic && f.academic.earned >= f.academic.max * 0.7) out.push(`Strong fit for ${opts.useCase.label.toLowerCase()}`);
    if (f.value && f.value.max >= 6 && f.value.earned >= f.value.max * 0.7) out.push(`Low cost per month (${money(GW.monthlyCost(gadget))}/month, 36-month window)`);
    if (f.performance && f.performance.earned >= f.performance.max * 0.75) out.push("Strong sustained performance for schoolwork");
    if (f.battery && f.battery.earned >= f.battery.max * 0.75) out.push("Battery comfortably lasts a full class day");
    if (f.display && f.display.earned >= f.display.max * 0.75) out.push("Display is easy on the eyes for long reading");
    if (f.portability && f.portability.max >= 6 && f.portability.earned >= f.portability.max * 0.75) out.push("Light enough for the daily commute");
    if (f.community.earned >= f.community.max * 0.8) out.push(`Highly rated by students (${gadget.rating.toFixed(1)}★)`);
    if (f.budget.earned < f.budget.max * 0.5) out.push(`Stretches past your budget — consider the trade-off`);
    return out.slice(0, 6);
  }

  function strengthsWeaknesses(gadget, opts) {
    const s = gadget.strengths.slice(0, 3);
    const w = gadget.weaknesses.slice(0, 3);
    if (opts.priorities) {
      // surface a priority-relevant weakness first if it exists
      const highP = Object.entries(opts.priorities).filter(([, v]) => v === "high").map(([k]) => k);
      for (const p of highP) {
        const map = { performance: "Performance", battery: "Battery", display: "Display", camera: "Camera", storage: "Storage", portability: "Portability", value: "Value" };
        const hit = gadget.weaknesses.find(x => x.toLowerCase().includes((map[p] || "").toLowerCase()));
        if (hit) { w.unshift(hit); break; }
      }
    }
    return { strengths: [...new Set(s)], weaknesses: [...new Set(w)].slice(0, 3) };
  }

  /* ---------------- main entry ---------------- */
  /**
   * recommend({ budget, useCase, priorities, category }) →
   * { results, weights, notes, hiddenCount, stretchLimit }
   *
   * Stretch rule: gadgets far above the budget ceiling are excluded from
   * ranking entirely (20 budget points cannot outvote 80 spec points).
   * The "Budget discipline" priority sets the tolerance:
   *   high → 5%, medium → 15%, none/low → 35% over the ceiling.
   */
  function recommend(input) {
    const { budget, useCase, priorities } = input;
    const { weights, notes } = rebalance(priorities);
    const stretch = { high: 0.05, medium: 0.15 }[priorities && priorities.budget] || 0.35;
    const pool = input.category
      ? GW.gadgetsInCategory(input.category)
      : (GW.gadgetsInCategory(useCase.categories[0]).length > 2
        ? useCase.categories.flatMap(c => GW.gadgetsInCategory(c))
        : GW.gadgets);

    let ranked = pool;
    let hiddenCount = 0;
    if (budget.max !== Infinity) {
      const limit = budget.max * (1 + stretch);
      ranked = pool.filter(g => g.price <= limit);
      hiddenCount = pool.length - ranked.length;
      if (hiddenCount > 0) {
        notes.push(`Gadgets above ${money(limit)} (your ceiling + ${Math.round(stretch * 100)}% stretch) are not ranked.`);
      }
      if (priorities && priorities.budget && priorities.budget !== "none") {
        notes.push(`Budget discipline: ${priorities.budget} — stretch tolerance ${Math.round(stretch * 100)}%.`);
      }
    }

    const results = ranked.map(gadget => {
      const breakdown = scoreGadget(gadget, { weights, useCase, budget });
      return {
        gadget,
        breakdown,
        score: breakdown.total,
        reasons: reasons(gadget, breakdown, { budget, useCase, priorities }),
        ...strengthsWeaknesses(gadget, { priorities })
      };
    });
    results.sort((a, b) => b.score - a.score);
    return { results, weights, notes, hiddenCount, stretchLimit: budget.max === Infinity ? null : budget.max * (1 + stretch) };
  }

  return { recommend, rebalance, scoreGadget, FACTOR_META, buildPools };
})();
