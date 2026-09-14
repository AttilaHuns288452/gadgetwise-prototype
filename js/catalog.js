/* ============================================================
   GadgetWise — js/catalog.js
   Catalog browsing: search, filters, sorting. Used by
   gadgets.html (all) and category.html (single category).
   ============================================================ */

window.GWCatalog = (function () {
  "use strict";
  const { esc } = GWApp;

  function init(cfg) {
    const p = GWApp.params();
    const catId = cfg.category || null;
    const state = {
      q: p.get("q") || "",
      brands: new Set(),
      minPrice: p.get("min") ? +p.get("min") : null,
      maxPrice: p.get("max") ? +p.get("max") : null,
      sort: p.get("sort") || "featured",
      category: catId || p.get("cat") || null
    };

    const grid = document.getElementById("catalogGrid");
    const resultMeta = document.getElementById("resultMeta");
    const searchInput = document.getElementById("catalogSearch");
    const sortSel = document.getElementById("sortSelect");
    const brandBox = document.getElementById("brandFilters");
    const minIn = document.getElementById("minPrice");
    const maxIn = document.getElementById("maxPrice");
    const clearBtn = document.getElementById("clearFilters");
    const emptyBox = document.getElementById("catalogEmpty");

    // --- populate brands present in scope
    const scope = state.category ? GW.gadgetsInCategory(state.category) : GW.gadgets;
    const brands = [...new Set(scope.map(g => g.brand))].sort();
    if (brandBox) {
      brandBox.innerHTML = brands.map(b => `
        <label class="check"><input type="checkbox" value="${esc(b)}"> ${esc(b)}</label>`).join("");
    }

    // --- apply URL state
    if (searchInput) searchInput.value = state.q;
    if (minIn && state.minPrice != null) minIn.value = state.minPrice;
    if (maxIn && state.maxPrice != null) maxIn.value = state.maxPrice;

    // --- feature filter helpers (specs live in strings/scores; these are honest heuristics)
    const FEATURES = {
      fLong:    g => /([8-9]\d*|\d{2,})\s*(h|hr|hour)/i.test(g.specs.Battery || ""),
      fBudget:  g => g.price < 15000,
      fDurable: g => (g.scored.durability || 0) >= 7,
      fRepair:  g => (g.scored.repairability || 0) >= 7
    };
    const featureChecks = ["fLong", "fBudget", "fDurable", "fRepair"]
      .map(id => document.getElementById(id)).filter(Boolean);
    const catRadios = [...document.querySelectorAll("input[name=fcat]")];

    function apply() {
      let list = state.category ? GW.gadgetsInCategory(state.category) : GW.gadgets.slice();

      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter(g =>
          `${g.brand} ${g.model} ${g.summary} ${GW.getCategory(g.category).name} ${g.tagline}`
            .toLowerCase().includes(q));
      }
      if (state.brands.size) list = list.filter(g => state.brands.has(g.brand));
      if (state.minPrice != null && state.minPrice > 0) list = list.filter(g => g.price >= state.minPrice);
      if (state.maxPrice != null && state.maxPrice > 0) list = list.filter(g => g.price <= state.maxPrice);
      for (const cb of featureChecks) {
        if (cb.checked) list = list.filter(FEATURES[cb.id]);
      }

      const monthly = GW.monthlyCost;
      switch (state.sort) {
        case "price-asc": list.sort((a, b) => a.price - b.price); break;
        case "price-desc": list.sort((a, b) => b.price - a.price); break;
        case "rating": list.sort((a, b) => b.rating - a.rating); break;
        case "monthly": list.sort((a, b) => monthly(a) - monthly(b)); break;
        case "reviews": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
        default: list.sort((a, b) => b.rating * Math.log(b.reviewCount + 2) - a.rating * Math.log(a.reviewCount + 2));
      }

      render(list);
    }

    function render(list) {
      if (resultMeta) {
        const bits = [];
        bits.push(`${list.length} gadget${list.length === 1 ? "" : "s"}`);
        if (state.category) bits.push(`in ${GW.getCategory(state.category).name}`);
        if (state.q) bits.push(`matching “${esc(state.q)}”`);
        resultMeta.innerHTML = bits.join(" · ");
      }
      if (emptyBox) emptyBox.classList.toggle("hidden", list.length > 0);
      if (grid) grid.innerHTML = list.map(g => GWApp.productCard(g)).join("");
    }

    // --- events
    if (searchInput) {
      let t;
      searchInput.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => { state.q = searchInput.value.trim(); apply(); }, 160);
      });
    }
    if (sortSel) sortSel.addEventListener("change", () => { state.sort = sortSel.value; apply(); });
    if (brandBox) brandBox.addEventListener("change", e => {
      const cb = e.target.closest("input[type=checkbox]"); if (!cb) return;
      cb.checked ? state.brands.add(cb.value) : state.brands.delete(cb.value);
      apply();
    });
    if (featureChecks.length) featureChecks.forEach(cb => cb.addEventListener("change", apply));
    if (catRadios.length) catRadios.forEach(r => r.addEventListener("change", () => {
      state.category = r.value || null;
      apply();
    }));
    [minIn, maxIn].forEach(inp => inp && inp.addEventListener("change", () => {
      state.minPrice = minIn && minIn.value ? +minIn.value : null;
      state.maxPrice = maxIn && maxIn.value ? +maxIn.value : null;
      apply();
    }));
    if (clearBtn) clearBtn.addEventListener("click", () => {
      state.q = ""; state.brands.clear(); state.minPrice = null; state.maxPrice = null;
      if (searchInput) searchInput.value = "";
      if (minIn) minIn.value = "0"; if (maxIn) maxIn.value = "100000";
      brandBox && brandBox.querySelectorAll("input").forEach(cb => cb.checked = false);
      featureChecks.forEach(cb => cb.checked = false);
      if (catRadios.length) { catRadios[0].checked = true; state.category = catId; }
      apply();
    });

    apply();
  }

  return { init };
})();
