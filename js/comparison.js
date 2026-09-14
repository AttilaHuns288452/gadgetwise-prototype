/* ============================================================
   GadgetWise — js/comparison.js
   Side-by-side comparison of 2–4 gadgets with meaningful
   differences highlighted, plus comparison history recording.
   ============================================================ */

window.GWCompare = (function () {
  "use strict";
  const { esc, money, icon } = GWApp;
  const peso = "\u20B1";

  const LS_HISTORY = "gw_compare_history";

  /* ---------- row model ----------
     better: "low" | "high" | null  (null = informational row) */
  function rowsFor(gadgets) {
    const cats = new Set(gadgets.map(g => g.category));
    const multiCategory = cats.size > 1;
    const rows = [];
    const row = (label, get, better, fmt) => rows.push({ label, values: gadgets.map(get), better, fmt });

    row("Price", g => g.price, "low", v => peso + v.toLocaleString("en-PH"));
    row("Rating", g => g.rating, "high", v => v.toFixed(1) + " \u2605");
    row("Est. monthly ownership", g => GW.monthlyCost(g), "low", v => "\u2248 " + money(v) + "/mo");
    row("Warranty", g => g.value.warrantyYears, "high", v => v + (v === 1 ? " yr" : " yrs"));
    row("Est. lifespan", g => g.value.lifespanYears, "high", v => v + " yrs");
    row("Repairability", g => g.scored.repairability, "high", v => v.toFixed(1) + "/10");
    row("Durability", g => g.scored.durability, "high", v => v.toFixed(1) + "/10");
    row("Performance", g => g.scored.performance, "high", v => v.toFixed(1) + "/10");
    row("Battery", g => g.scored.battery, "high", v => v.toFixed(1) + "/10");
    if (multiCategory) {
      row("Portability", g => g.scored.portability, "high", v => v.toFixed(1) + "/10");
      row("Display", g => g.scored.display, "high", v => v.toFixed(1) + "/10");
    }
    // Category-relevant spec rows
    if (cats.size === 1) {
      const cat = [...cats][0];
      const specRows = {
        smartphones: ["Display", "Processor", "RAM", "Storage", "Battery", "Rear camera", "OS"],
        laptops: ["Processor", "RAM", "Storage", "Battery", "Weight", "Ports", "OS"],
        tablets: ["Display", "Processor", "RAM", "Storage", "Battery", "Stylus", "OS"],
        headphones: ["Type", "Noise canceling", "Battery", "Codecs", "Weight"],
        powerbanks: ["Capacity", "Output", "Ports", "Recharge time", "Weight"],
        smartwatches: ["Display", "Battery", "GPS", "Water resistance", "Calls", "Weight"]
      }[cat] || [];
      specRows.forEach(k => {
        if (gadgets.every(g => g.specs[k] !== undefined)) {
          row(k, g => g.specs[k], null, v => v);
        }
      });
    }
    row("Repair path", g => g.value.repairabilityLabel, null, v => v);
    return rows;
  }

  function bestIndices(row) {
    if (!row.better || row.values.some(v => v == null)) return [];
    const numeric = row.values.every(v => typeof v === "number");
    if (!numeric) return [];
    const target = row.better === "low" ? Math.min(...row.values) : Math.max(...row.values);
    const spread = Math.max(...row.values) - Math.min(...row.values);
    if (spread === 0) return [];
    const edge = row.better === "low" ? Math.min(...row.values) : Math.max(...row.values);
    // highlight only a meaningful spread (>8% relative), so near-ties stay quiet
    const rel = row.values[0] !== 0 ? Math.abs(spread / Math.max(...row.values.map(Math.abs))) : 1;
    if (rel < 0.08 && row.label !== "Price") return [];
    return row.values.map((v, i) => (v === edge ? i : -1)).filter(i => i >= 0);
  }

  function advantageLabel(row) {
    switch (row.label) {
      case "Price": return "Lower price";
      case "Rating": return "Higher rating";
      case "Est. monthly ownership": return "Cheaper to own";
      case "Warranty": return "Longer warranty";
      case "Est. lifespan": return "Longer lifespan";
      case "Repairability": return "Easier to repair";
      case "Durability": return "Tougher build";
      case "Performance": return "Faster";
      case "Battery": return "Better battery";
      case "Portability": return "More portable";
      case "Display": return "Better display";
      default: return "Better";
    }
  }

  /* ---------- history ---------- */
  function recordHistory(gadgets) {
    if (gadgets.length < 2) return;
    let hist = [];
    try { hist = JSON.parse(localStorage.getItem(LS_HISTORY) || "[]"); } catch (e) { hist = []; }
    const key = gadgets.map(g => g.id).sort().join("|");
    if (hist.length && hist[0].key === key) return; // don't spam duplicates on refresh
    hist.unshift({ key, date: new Date().toISOString().slice(0, 10), items: gadgets.map(g => g.id) });
    try { localStorage.setItem(LS_HISTORY, JSON.stringify(hist.slice(0, 12))); } catch (e) { /* ignore */ }
  }
  function getHistory() {
    let hist = [];
    try { hist = JSON.parse(localStorage.getItem(LS_HISTORY) || "[]"); } catch (e) { hist = []; }
    return hist;
  }

  /* ---------- page renderer ---------- */
  let wlHooked = false;
  function renderComparePage() {
    const stage = document.getElementById("compareStage");
    if (!stage) return;
    let ids = [...GWApp.state.compare];
    const p = GWApp.params();
    if (p.get("ids")) ids = p.get("ids").split(",").slice(0, 4);

    const gadgets = GW.gadgetsByIds(ids);

    if (gadgets.length < 2) {
      stage.innerHTML = GWApp.emptyState("scale",
        gadgets.length === 1 ? "Add one more gadget" : "No gadgets selected yet",
        gadgets.length === 1 ? "Pick at least one more gadget from the catalog to compare side by side." :
        "Browse the catalog and use the Compare checkbox on product cards to select 2–4 gadgets.",
        `<a class="btn" href="gadgets.html">Browse gadgets ${icon("arrowRight")}</a>`);
      return;
    }

    recordHistory(gadgets);
    const rows = rowsFor(gadgets);

    const head = gadgets.map(g => `
      <th class="cmp-product-cell">
        <a href="${GWApp.gadgetUrl(g.id)}" style="display:block">
          <img src="${g.image}" alt="Placeholder artwork for ${esc(g.brand)} ${esc(g.model)}">
          <div class="g-brand" style="margin-top:10px">${esc(g.brand)}</div>
          <div class="t-title" style="font-family:var(--font-display);font-size:1.02rem;color:var(--ink)">${esc(g.model)}</div>
          <div class="small muted">${esc(GWApp.catLabel(g.category))} · ${g.rating.toFixed(1)}★ (${g.reviewCount})</div>
        </a>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline btn-sm" data-wl="${g.id}" aria-pressed="${GWApp.inWishlist(g.id)}" style="${GWApp.inWishlist(g.id) ? "background:var(--accent-soft);border-color:var(--accent);color:var(--accent-strong)" : ""}">${icon("heart")}<span class="wl-label">${GWApp.inWishlist(g.id) ? "Saved" : "Wishlist"}</span></button>
          <button class="btn btn-outline btn-sm" data-cmp-remove-btn="${g.id}">${icon("x")} Remove</button>
        </div>
      </th>`).join("");

    const body = rows.map(r => {
      const best = bestIndices(r);
      return `<tr>
        <td class="row-label">${esc(r.label)}</td>
        ${r.values.map((v, i) => {
          const isBest = best.includes(i);
          const shown = r.fmt ? r.fmt(v) : String(v);
          return `<td class="${isBest ? "cmp-best" : ""}">
            <span class="cell-val mono">${esc(shown)}</span>
            ${isBest ? `<span class="adv">${icon("trendUp")}${advantageLabel(r)}</span>` : ""}
          </td>`;
        }).join("")}
      </tr>`;
    }).join("");

    const verdict = verdictHTML(gadgets, rows);

    stage.innerHTML = `
      <div class="cmp-scroll">
        <table class="cmp-table">
          <thead><tr><th class="row-label">Compare ${gadgets.length} gadgets</th>${head}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
      ${verdict}
      <p class="small muted" style="margin-top:14px">Values are prototype mock data. Highlighted cells mark a meaningful difference of at least 8% — near-ties stay unmarked. Lifespan and monthly cost are estimates.</p>`;

    stage.querySelectorAll("[data-cmp-remove-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        GWApp.toggleCompare(btn.getAttribute("data-cmp-remove-btn"), false);
        renderComparePage();
      });
    });
    if (!wlHooked) {
      document.addEventListener("gw:wishlist-change", renderComparePage);
      wlHooked = true;
    }
  }

  /* ---------- plain-language verdict ---------- */
  function verdictHTML(gadgets, rows) {
    const find = label => rows.find(r => r.label === label);
    const price = find("Price"), monthly = find("Est. monthly ownership"),
          life = find("Est. lifespan"), rating = find("Rating");
    const picks = [];
    if (price) {
      const min = Math.min(...price.values), g = gadgets[price.values.indexOf(min)];
      picks.push(`Lowest price: <b>${esc(g.brand)} ${esc(g.model)}</b> at ${money(min)}`);
    }
    if (monthly) {
      const min = Math.min(...monthly.values), g = gadgets[monthly.values.indexOf(min)];
      picks.push(`Cheapest long-term: <b>${esc(g.brand)} ${esc(g.model)}</b> at ≈ ${money(min)}/month`);
    }
    if (life) {
      const max = Math.max(...life.values), g = gadgets[life.values.indexOf(max)];
      picks.push(`Longest estimated lifespan: <b>${esc(g.brand)} ${esc(g.model)}</b> at ${max} years`);
    }
    if (rating) {
      const max = Math.max(...rating.values), g = gadgets[rating.values.indexOf(max)];
      picks.push(`Highest rated: <b>${esc(g.brand)} ${esc(g.model)}</b> at ${max.toFixed(1)}★`);
    }

    // Spread-aware verdict (ported from fac3629): near-ties on the Ownership Index read differently
    const ranked = [...gadgets].sort((a, b) => GWApp.ownIndex(b) - GWApp.ownIndex(a));
    const cheap = [...gadgets].sort((a, b) => GW.monthlyCost(a) - GW.monthlyCost(b))[0];
    const rated = ranked[0];
    const spread = GWApp.ownIndex(ranked[0]) - GWApp.ownIndex(ranked[ranked.length - 1]);
    let line;
    if (spread <= 4) {
      line = `These are very close (Ownership Index ${GWApp.ownIndex(ranked[0])} vs ${GWApp.ownIndex(ranked[ranked.length - 1])}). ` +
        `<b>${esc(cheap.brand)} ${esc(cheap.model)}</b> still costs the least per month (≈ ${money(GW.monthlyCost(cheap))}/mo), ` +
        `so the trade-offs above should decide it, not the totals.`;
    } else {
      line = `Over each gadget's estimated lifetime, <b>${esc(cheap.brand)} ${esc(cheap.model)}</b> costs the least per month (≈ ${money(GW.monthlyCost(cheap))}/mo). ` +
        `Students rate <b>${esc(rated.brand)} ${esc(rated.model)}</b> highest (${rated.rating.toFixed(1)}\u2605). ` +
        `Upfront price alone doesn't decide this: a cheaper gadget with a short lifespan can cost more per month.`;
    }

    return `
      <div class="panel" style="margin-top:24px">
        <h3 style="margin-bottom:12px">At a glance</h3>
        <ul class="rr-why">${picks.map(p => `<li>${icon("check")}${p}</li>`).join("")}</ul>
        <p class="small" style="margin:12px 0 0">${line}</p>
      </div>`;
  }

  return { renderComparePage, rowsFor, recordHistory, getHistory, advantageLabel };
})();
