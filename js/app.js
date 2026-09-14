/* ============================================================
   GadgetWise — js/app.js
   Shared shell: icons, state, header/footer, cards, tray, toasts.
   ============================================================ */

window.GWApp = (function () {
  "use strict";

  /* ---------------- Icons (one drawn set, single stroke weight) ---------------- */
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.3a5 5 0 1 1 7.5 6.3Z"/>',
    scale: '<path d="M12 3v18"/><path d="M5 7h14"/><path d="m5 7-3 6a3.5 3.5 0 0 0 6 0L5 7Z"/><path d="m19 7-3 6a3.5 3.5 0 0 0 6 0l-3-6Z"/><path d="M8 21h8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21c.8-3.5 3.6-5 7-5s6.2 1.5 7 5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevDown: '<path d="m6 9 6 6 6-6"/>',
    chevRight: '<path d="m9 6 6 6-6 6"/>',
    arrowRight: '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/>',
    check: '<path d="m4 12 5.2 5.2L20 6.4"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.4 2.4 4.8-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    sliders: '<path d="M4 8h10M18 8h2M4 16h4M12 16h8"/><circle cx="16" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>',
    sort: '<path d="M8 5v14M8 19l-3-3M8 19l3-3" transform="translate(0,-1)"/><path d="M16 19V5M16 5l-3 3M16 5l3 3" transform="translate(0,1)"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    tag: '<path d="m3 12 9-9h9v9l-9 9-9-9Z"/><circle cx="16.5" cy="7.5" r="1.5"/>',
    battery: '<rect x="2" y="8" width="16" height="8" rx="2"/><path d="M22 11v2"/><path d="M6 11v2M9.5 11v2M13 11v2"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z"/>',
    wrench: '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.9L3 18l3 3 5.8-5.7a4.5 4.5 0 0 0 5.9-6L14 13l-3-3 3.7-3.7Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/>',
    download: '<path d="M12 3v12M12 15l-4-4M12 15l4-4"/><path d="M4 19h16"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    box: '<path d="m12 2 8 4.5v9L12 22l-8-6.5v-9L12 2Z"/><path d="m4 6.5 8 4.5 8-4.5M12 11v11"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3 3-4.5 6.5-4.5s5.8 1.5 6.5 4.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 15.6c2 .6 3.4 2 4 4.4"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h13l-2.5 4L18 12H5"/>',
    chart: '<path d="M4 20h16"/><rect x="6" y="10" width="3" height="7" rx="0.5"/><rect x="11" y="6" width="3" height="11" rx="0.5"/><rect x="16" y="13" width="3" height="4" rx="0.5"/>',
    fileText: '<path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v4h4"/><path d="M9 12h6M9 16h6"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
    smartphone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    tablet: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 17.5h2"/>',
    headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    watch: '<circle cx="12" cy="12" r="6"/><path d="M9 5.5 8.5 2h7L15 5.5M9 18.5 8.5 22h7L15 18.5"/>',
    message: '<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    trendUp: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    moon: '<path d="M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    bookOpen: '<path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2V4Z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22V4Z"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 3"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M16 15h2"/>'
  };
  function icon(name, cls) {
    const body = I[name] || I.info;
    return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
  }
  function iconRaw(name, attrs) {
    const body = I[name] || I.info;
    return `<svg viewBox="0 0 24 24" aria-hidden="true" ${attrs || ""}>${body}</svg>`;
  }

  /* ---------------- Formatting ---------------- */
  const peso = "\u20B1";
  function money(n) {
    const rounded = Math.round(n * 100) / 100;
    const hasCents = rounded % 1 !== 0;
    return peso + rounded.toLocaleString("en-PH", {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: hasCents ? 2 : 0
    });
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function params() { return new URLSearchParams(location.search); }

  /* ---------------- Ownership Index (formula ported from the fac3629 prototype, must match exactly) ----------------
     durability 25 + repairability 20 + battery 20 + warranty 15 + student rating 20, out of 100. */
  function ownIndex(g) {
    const s = g.durab / 5 * 25 + g.repair / 5 * 20 + Math.min(g.battery / 12, 1) * 20
            + Math.min(g.value.warrantyYears * 12 / 24, 1) * 15 + g.rating / 5 * 20;
    return Math.round(s);
  }
  /* Pareto frontier: no other gadget is both cheaper AND higher-indexed */
  function frontier(gadgets) {
    const pts = gadgets.map(g => ({ id: g.id, p: g.price, s: ownIndex(g) }));
    return new Set(pts.filter(a => !pts.some(b => b !== a && b.p <= a.p && b.s >= a.s && (b.p < a.p || b.s > a.s))).map(a => a.id));
  }
  function gadgetUrl(id) { return "gadget-detail.html?id=" + encodeURIComponent(id); }

  /* ---------------- State ---------------- */
  const LS = { wl: "gw_wishlist", cmp: "gw_compare", rec: "gw_rec_last", rr: "gw_rec_history" };
  function loadSet(key, cap) {
    try {
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      return new Set(Array.isArray(arr) ? arr.slice(0, cap || Infinity) : []);
    } catch (e) { return new Set(); }
  }
  function saveSet(key, set) {
    try { localStorage.setItem(key, JSON.stringify([...set])); } catch (e) { /* storage unavailable */ }
  }
  const state = {
    wishlist: loadSet(LS.wl, 200),
    compare: loadSet(LS.cmp, 4),
    get compareFull() { return this.compare.size >= 4; },
    // ponytail: mock auth — no backend; any credentials work, gates wishlist/review actions
    loggedIn: false,
    user: null
  };
  function requireLogin(action) {
    if (state.loggedIn) return true;
    openLoginModal(action);
    return false;
  }
  function openLoginModal(action) {
    const ov = openModal(`
      <h3>Log in to ${esc(action || "continue")}</h3>
      <p class="modal-sub">Prototype auth — any credentials work; nothing is stored or sent.</p>
      <div class="field"><label for="lmEmail">Email</label>
        <input id="lmEmail" type="email" placeholder="you@student.edu.ph" autocomplete="email"></div>
      <div class="field"><label for="lmPass">Password</label>
        <input id="lmPass" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" autocomplete="current-password"></div>
      <div class="modal-actions">
        <button class="btn btn-outline" data-close>Cancel</button>
        <button class="btn" data-login>Log in</button>
      </div>`);
    ov.querySelector("[data-close]").addEventListener("click", closeModal);
    const submit = () => {
      const email = ov.querySelector("#lmEmail").value.trim();
      if (!email) { toast("Enter any email to continue (demo)", "alert"); return; }
      state.loggedIn = true;
      state.user = { name: email.split("@")[0], email };
      closeModal();
      toast("Welcome back, " + state.user.name + "!", "checkCircle");
      document.dispatchEvent(new CustomEvent("gw:login"));
    };
    ov.querySelector("[data-login]").addEventListener("click", submit);
    ov.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
  }
  function inWishlist(id) { return state.wishlist.has(id); }
  function inCompare(id) { return state.compare.has(id); }
  function toggleWishlist(id) {
    const g = GW.getGadget(id); if (!g) return;
    if (state.wishlist.has(id)) {
      state.wishlist.delete(id);
      toast("Removed from wishlist", "heart");
    } else {
      state.wishlist.add(id);
      toast(`${g.brand} ${g.model} saved to wishlist`, "heart");
    }
    saveSet(LS.wl, state.wishlist);
    document.querySelectorAll(`[data-wl="${id}"]`).forEach(btn => {
      btn.classList.toggle("on", state.wishlist.has(id));
      btn.setAttribute("aria-pressed", String(state.wishlist.has(id)));
      const lbl = btn.querySelector(".wl-label");
      if (lbl) lbl.textContent = state.wishlist.has(id) ? "Saved" : "Add to Wishlist";
    });
    updateCounts();
    document.dispatchEvent(new CustomEvent("gw:wishlist-change"));
  }
  function toggleCompare(id, checked) {
    const g = GW.getGadget(id); if (!g) return;
    if (checked === undefined) checked = !state.compare.has(id);
    if (checked) {
      if (state.compare.has(id)) return;
      if (state.compareFull) {
        toast("Compare holds 4 gadgets — remove one first", "scale");
        uncheckCompareInputs(id);
        return;
      }
      state.compare.add(id);
      toast(`${g.brand} ${g.model} added to compare`, "scale");
    } else {
      state.compare.delete(id);
    }
    saveSet(LS.cmp, state.compare);
    syncCompareInputs();
    updateCounts();
    document.dispatchEvent(new CustomEvent("gw:compare-change"));
  }
  function uncheckCompareInputs(id) {
    document.querySelectorAll(`input[data-cmp="${id}"]`).forEach(inp => { inp.checked = false; });
  }
  function syncCompareInputs() {
    document.querySelectorAll("input[data-cmp]").forEach(inp => {
      inp.checked = state.compare.has(inp.getAttribute("data-cmp"));
    });
    document.querySelectorAll("[data-cmp-remove]").forEach(btn => { /* tray handles itself */ });
  }
  function clearCompare() {
    state.compare.clear();
    saveSet(LS.cmp, state.compare);
    syncCompareInputs();
    updateCounts();
    document.dispatchEvent(new CustomEvent("gw:compare-change"));
  }

  /* ---------------- Toast ---------------- */
  function toast(msg, ic) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = icon(ic || "checkCircle") + `<span>${esc(msg)}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  /* ---------------- Modal ---------------- */
  function openModal(html) {
    closeModal();
    const ov = document.createElement("div");
    ov.className = "modal-overlay";
    ov.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => { if (e.target === ov) closeModal(); });
    document.addEventListener("keydown", escClose);
    const f = ov.querySelector("input, select, textarea, button.btn");
    if (f) setTimeout(() => f.focus(), 30);
    return ov;
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  function closeModal() {
    const ov = document.querySelector(".modal-overlay");
    if (ov) ov.remove();
    document.removeEventListener("keydown", escClose);
  }

  /* ---------------- Stars ---------------- */
  function starSVG(fill) {
    return `<svg viewBox="0 0 24 24" fill="${fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/></svg>`;
  }
  function stars(rating) {
    let out = "";
    for (let i = 1; i <= 5; i++) out += starSVG(i <= Math.round(rating));
    return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">${out}</span>`;
  }
  function ratingLine(g) {
    return `<span class="rating-line">${stars(g.rating)}<span class="num">${g.rating.toFixed(1)}</span><span class="count">(${g.reviewCount})</span></span>`;
  }

  /* ---------------- Value tag / price ---------------- */
  function estimateLine(g, cls) {
    return `<span class="price-estimate ${cls || ""}"><span class="label">EST. OWNERSHIP</span><span>≈ ${money(GW.monthlyCost(g))}<em>/month</em></span></span>`;
  }
  function priceBlock(g, size) {
    const cls = size === "lg" ? "price-lg" : size === "compact" ? "price-compact" : "";
    return `<span class="price ${cls}"><span class="price-amount"><span class="peso">${peso}</span>${g.price.toLocaleString("en-PH")}</span>${estimateLine(g)}</span>`;
  }

  /* ---------------- Product card ---------------- */
  const cardSpecKeys = {
    smartphones: ["Display", "Processor", "Battery"],
    laptops: ["Processor", "RAM", "Battery"],
    tablets: ["Display", "Battery", "Stylus"],
    headphones: ["Noise canceling", "Type", "Battery"],
    powerbanks: ["Capacity", "Output", "Recharge time"],
    smartwatches: ["Display", "Battery", "GPS"]
  };
  function cardSpecs(g) {
    const keys = cardSpecKeys[g.category] || Object.keys(g.specs).slice(0, 3);
    return keys.filter(k => g.specs[k]).slice(0, 3)
      .map(k => `<li><b>${esc(k)}</b><span>${esc(g.specs[k])}</span></li>`).join("");
  }
  function productCard(g, opts) {
    opts = opts || {};
    const cat = GW.getCategory(g.category);
    const saved = inWishlist(g.id);
    const cmpChecked = inCompare(g.id);
    const score = opts.score;
    return `
    <article class="g-card card-hover" data-gadget="${g.id}">
      <a class="g-media" href="${gadgetUrl(g.id)}" aria-label="${esc(g.brand + " " + g.model)}">
        <img src="${g.image}" alt="Placeholder artwork for ${esc(g.brand)} ${esc(g.model)}" loading="lazy">
        <span class="g-cat">${esc(cat ? cat.name : "")}</span>
      </a>
      <div class="g-body">
        <span class="g-brand">${esc(g.brand)}</span>
        <h3 class="g-title"><a href="${gadgetUrl(g.id)}">${esc(g.model)}</a></h3>
        ${ratingLine(g)}
        <p class="g-summary">${esc(g.summary)}</p>
        ${g.goodFor ? `<p class="gcard-bestfor"><b>Best for:</b> ${esc(g.goodFor.slice(0, 2).join(" + "))}</p>`
                   : `<p class="gcard-bestfor"><b>Best for:</b> ${esc(cat ? cat.name : "")} on a student budget</p>`}
        ${g.strengths && g.strengths.length ? `<p class="gcard-why"><b>Why it stands out:</b> ${esc(g.strengths[0])}</p>` : ""}
        <ul class="g-specs">${cardSpecs(g)}</ul>
      </div>
      <div class="g-foot">
        <div class="price-block">
          ${priceBlock(g, "compact")}
        </div>
        <div class="g-actions">
          ${score ? `<span class="score-chip" title="Recommendation match score">${score}<small>/100</small></span>` : ""}
          <button class="icon-btn ${saved ? "on" : ""}" data-wl="${g.id}" aria-pressed="${saved}" title="${saved ? "Remove from wishlist" : "Add to wishlist"}">${icon("heart")}</button>
        </div>
      </div>
      <div class="g-foot" style="border-top:0; padding-top:0; margin-top:2px;">
        <span class="cmp-check"><input type="checkbox" data-cmp="${g.id}" ${cmpChecked ? "checked" : ""} aria-label="Compare ${esc(g.brand)} ${esc(g.model)}"> Compare</span>
        <a class="btn btn-ghost btn-sm" href="${gadgetUrl(g.id)}">Details ${icon("arrowRight")}</a>
      </div>
    </article>`;
  }

  /* ---------------- Compare tray ---------------- */
  function trayHTML() {
    if (state.compare.size === 0) return "";
    const items = [...state.compare].map(id => {
      const g = GW.getGadget(id); if (!g) return "";
      return `<span class="tray-item">${esc(g.brand)} ${esc(g.model)}
        <button type="button" data-cmp-remove="${g.id}" aria-label="Remove ${esc(g.model)} from compare">${icon("x", "icon-sm")}</button></span>`;
    }).join("");
    const disabled = state.compare.size < 2 ? "disabled" : "";
    const hint = state.compare.size < 2 ? `<span class="tray-hint">Add at least 2 gadgets to compare</span>` : "";
    return `
      <span class="tray-label">COMPARE (${state.compare.size}/4)</span>
      <span class="tray-items">${items}</span>
      ${hint}
      <a class="btn btn-light btn-sm" href="compare.html" ${disabled ? `aria-disabled="true" onclick="return false"` : ""}>Compare now ${icon("arrowRight")}</a>`;
  }
  function renderTray() {
    const tray = document.getElementById("compareTray");
    if (!tray) return;
    const inner = tray.querySelector(".tray-inner");
    inner.innerHTML = trayHTML();
    tray.classList.toggle("show", state.compare.size > 0);
  }
  function updateCounts() {
    const wl = document.getElementById("wlCount");
    if (wl) { wl.textContent = state.wishlist.size; wl.style.display = state.wishlist.size ? "" : "none"; }
    const cc = document.getElementById("cmpCount");
    if (cc) { cc.textContent = state.compare.size; cc.style.display = state.compare.size ? "" : "none"; }
    renderTray();
  }

  /* ---------------- Header / footer shell ---------------- */
  function headerHTML() {
    const nav = [
      ["index.html", "Home"],
      ["gadgets.html", "Gadgets"],
      ["compare.html", "Compare"],
      ["recommendations.html", "Recommendations"]
    ];
    return `
    <header class="site-header">
      <div class="container header-inner">
        <button class="icon-btn mobile-nav-btn" id="mobileNavBtn" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
        <a class="logo" href="index.html" aria-label="GadgetWise home">
          <svg class="logo-mark" viewBox="0 0 28 28" aria-hidden="true">
            <rect x="1.5" y="1.5" width="25" height="25" rx="6" fill="#1a56db"/>
            <path d="M14 6.5 7.5 10v8L14 21.5 20.5 18v-8L14 6.5Z" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M14 10v8M10.7 8.9v10.2M17.3 8.9v10.2" stroke="#7cc9f5" stroke-width="1.4"/>
          </svg>
          Gadget<span class="logo-wise">Wise</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          ${nav.map(([href, label]) => `<a href="${href}" data-nav="${href}">${label}</a>`).join("")}
        </nav>
        <form class="header-search search-box" role="search" data-search-form>
          ${icon("search")}
          <input type="search" name="q" placeholder="Search gadgets, brands, categories…" aria-label="Search gadgets">
        </form>
        <div class="header-actions">
          <a class="icon-btn" href="wishlist.html" title="Wishlist" aria-label="Wishlist">${icon("heart")}<span class="count" id="wlCount" hidden>0</span></a>
          <a class="icon-btn" href="compare.html" title="Compare" aria-label="Comparison">${icon("scale")}<span class="count" id="cmpCount" hidden>0</span></a>
          <span class="header-divider"></span>
          <a class="avatar" href="profile.html" title="Profile — Andrea V.">AV</a>
        </div>
      </div>
      <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile">
        ${nav.map(([href, label]) => `<a href="${href}" data-nav="${href}">${label}</a>`).join("")}
        <a href="wishlist.html">Wishlist</a>
        <a href="profile.html">Profile</a>
      </nav>
    </header>`;
  }
  function footerHTML() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="f-brand">
            <a class="logo" href="index.html">Gadget<span class="logo-wise">Wise</span></a>
            <p>Student-centered gadget discovery, comparison, and long-term value analysis. Made for Filipino students.</p>
            <p class="small" style="color:rgba(255,255,255,.45)">Prototype — all products, prices, reviews, and metrics are mock data for a school project (CC&nbsp;116).</p>
          </div>
          <div>
            <h4>DISCOVER</h4>
            <ul>
              <li><a href="gadgets.html">All Gadgets</a></li>
              <li><a href="category.html?cat=smartphones">Smartphones</a></li>
              <li><a href="category.html?cat=laptops">Laptops</a></li>
              <li><a href="category.html?cat=tablets">Tablets</a></li>
              <li><a href="category.html?cat=headphones">Headphones</a></li>
            </ul>
          </div>
          <div>
            <h4>DECIDE</h4>
            <ul>
              <li><a href="recommendations.html">Get Recommendations</a></li>
              <li><a href="compare.html">Compare Gadgets</a></li>
              <li><a href="wishlist.html">Wishlist</a></li>
              <li><a href="comparison-history.html">Comparison History</a></li>
            </ul>
          </div>
          <div>
            <h4>ACCOUNT</h4>
            <ul>
              <li><a href="profile.html">Profile</a></li>
              <li><a href="review-history.html">Review History</a></li>
              <li><a href="login.html">Log in</a></li>
              <li><a href="register.html">Create account</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-base">
          <span>GadgetWise — a CC 116 frontend prototype. Not a store; no products are sold here.</span>
          <span>Estimates shown are for demonstration only.</span>
        </div>
      </div>
    </footer>
    <div class="compare-tray" id="compareTray" aria-live="polite"><div class="container tray-inner"></div></div>`;
  }

  function initShell(opts) {
    opts = opts || {};
    document.body.insertAdjacentHTML("afterbegin", headerHTML());
    document.body.insertAdjacentHTML("beforeend", footerHTML());

    // active nav
    const active = opts.active;
    if (active) {
      document.querySelectorAll(`[data-nav="${active}"]`).forEach(a => a.classList.add("active"));
    }
    // mobile menu
    const mbtn = document.getElementById("mobileNavBtn"), mm = document.getElementById("mobileMenu");
    if (mbtn) mbtn.addEventListener("click", () => {
      const open = mm.classList.toggle("open");
      mbtn.setAttribute("aria-expanded", String(open));
      mbtn.innerHTML = icon(open ? "x" : "menu");
    });
    // search
    document.querySelectorAll("[data-search-form]").forEach(f => {
      f.addEventListener("submit", e => {
        e.preventDefault();
        const q = f.querySelector("input[name=q]").value.trim();
        location.href = "gadgets.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      });
    });
    // global delegation: wishlist buttons, compare checkboxes, tray remove
    document.addEventListener("click", e => {
      const wl = e.target.closest("[data-wl]");
      if (wl) { toggleWishlist(wl.getAttribute("data-wl")); return; }
      const rm = e.target.closest("[data-cmp-remove]");
      if (rm) { toggleCompare(rm.getAttribute("data-cmp-remove"), false); return; }
    });
    document.addEventListener("change", e => {
      const cmp = e.target.closest("input[data-cmp]");
      if (cmp) { toggleCompare(cmp.getAttribute("data-cmp"), cmp.checked); return; }
    });
    updateCounts();
  }

  /* ---------------- Misc ---------------- */
  function catLabel(id) { const c = GW.getCategory(id); return c ? c.name : id; }
  function emptyState(ic, title, text, actionHTML) {
    return `<div class="empty-state">${icon(ic)}<div class="es-title">${esc(title)}</div><p class="small">${text}</p>${actionHTML || ""}</div>`;
  }
  function valueRow(name, valueHTML) {
    return `<div class="value-row"><span class="v-name">${esc(name)}</span><span>${valueHTML}</span></div>`;
  }

  /* ---------------- Price vs Ownership Index scatter (ported from fac3629) ---------------- */
  let scatterCat = "";
  function setScatterCat(k) {
    scatterCat = k;
    document.querySelectorAll("#scatterCats button").forEach(b => {
      const on = b.getAttribute("data-scat") === k;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    renderScatter();
  }
  function renderScatter() {
    const area = document.getElementById("scatterArea");
    if (!area) return;
    const items = GW.gadgets.filter(g => g.durab != null && (!scatterCat || g.category === scatterCat));
    const W = 760, H = 380, P = { l: 56, r: 24, t: 26, b: 46 };
    // auto-rescale: price axis fits the current filter, index axis keeps 0–100 anchoring
    const pMax = Math.max(...items.map(g => g.price), 10000) * 1.06;
    const px = p => P.l + (Math.min(p, pMax) / pMax) * (W - P.l - P.r);
    const py = s => H - P.b - (s / 100) * (H - P.t - P.b);
    const f = frontier(items);
    const fr = items.filter(g => f.has(g.id)).sort((a, b) => a.price - b.price);
    const step = pMax > 40000 ? 10000 : pMax > 20000 ? 5000 : 2500;
    let grid = "";
    for (let t = step; t <= pMax; t += step) grid += `<line x1="${px(t)}" y1="${P.t}" x2="${px(t)}" y2="${H - P.b}" stroke="var(--line)" stroke-width="1"/><text x="${px(t)}" y="${H - P.b + 18}" text-anchor="middle" font-size="11" fill="var(--ink-3)" font-family="var(--font-mono)">₱${(t / 1000)}k</text>`;
    for (const t of [20, 40, 60, 80, 100]) grid += `<line x1="${P.l}" y1="${py(t)}" x2="${W - P.r}" y2="${py(t)}" stroke="var(--line)" stroke-width="1"/><text x="${P.l - 10}" y="${py(t) + 4}" text-anchor="end" font-size="11" fill="var(--ink-3)" font-family="var(--font-mono)">${t}</text>`;
    const dots = items.map(g => {
      const on = f.has(g.id), x = px(g.price).toFixed(1), y = py(ownIndex(g)).toFixed(1);
      return `<circle cx="${x}" cy="${y}" r="${on ? 8 : 6.5}" fill="${on ? "var(--amber)" : "var(--accent)"}" fill-opacity=".9" stroke="#fff" stroke-width="1.5" style="cursor:pointer" data-dot="${g.id}" role="button" tabindex="0" aria-label="${esc(g.brand)} ${esc(g.model)}, ${money(g.price)}, Ownership Index ${ownIndex(g)}${on ? ", on best-value frontier" : ""}"><title>${esc(g.brand)} ${esc(g.model)} — ${money(g.price)} · Index ${ownIndex(g)}${on ? " · on best-value frontier" : ""}</title></circle>`;
    }).join("");
    const path = fr.map((g, i) => `${i ? "L" : "M"}${px(g.price).toFixed(1)},${py(ownIndex(g)).toFixed(1)}`).join(" ");
    area.innerHTML = `
      <div class="panel">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Scatter plot of gadget price versus Ownership Index${scatterCat ? " for " + esc(GWApp.catLabel(scatterCat)) : ""}">
          ${grid}
          <text x="${W - P.r}" y="${H - P.b + 34}" text-anchor="end" font-size="11" fill="var(--ink-2)">Price — lower is better ↓</text>
          <text x="${P.l}" y="${P.t - 10}" font-size="11" fill="var(--ink-2)">Ownership Index — higher is better ↑</text>
          <path d="${path}" fill="none" stroke="var(--amber)" stroke-width="1.6" stroke-dasharray="5 4" opacity=".8"/>
          ${dots}
        </svg>
        <div class="row" style="gap:16px;flex-wrap:wrap;font-size:.85rem;color:var(--ink-2);margin-top:8px">
          <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--accent);margin-right:5px"></span>Catalog gadget</span>
          <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--amber);margin-right:5px"></span>Best-value frontier (Pareto)</span>
          <span style="margin-left:auto">${items.length} shown · Index = durability 25 + repairability 20 + battery 20 + warranty 15 + student rating 20.</span>
        </div>
      </div>`;
    area.addEventListener("click", e => {
      const dot = e.target.closest("[data-dot]");
      if (dot) location.href = gadgetUrl(dot.getAttribute("data-dot"));
    });
    area.addEventListener("keydown", e => {
      const dot = e.target.closest("[data-dot]");
      if (dot && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); location.href = gadgetUrl(dot.getAttribute("data-dot")); }
    });
  }
  function renderScatterCats() {
    const box = document.getElementById("scatterCats");
    if (!box) return;
    const pool = GW.gadgets.filter(g => g.durab != null);
    const count = k => k ? pool.filter(g => g.category === k).length : pool.length;
    const tabs = [["", "All categories"], ...GW.categories.map(c => [c.id, c.name])].filter(([k]) => !k || count(k) > 0);
    box.innerHTML = tabs.map(([k, label]) =>
      `<button type="button" class="tab-btn${scatterCat === k ? " active" : ""}" data-scat="${k}" aria-pressed="${scatterCat === k}" onclick="GWApp.setScatterCat('${k}')">${esc(label)} <span class="mono" style="opacity:.6">${count(k)}</span></button>`
    ).join("");
  }

  return {
    icon, iconRaw, money, esc, params, gadgetUrl, ownIndex, frontier, renderScatter, setScatterCat, renderScatterCats,
    state, inWishlist, inCompare, toggleWishlist, toggleCompare, clearCompare,
    requireLogin, openLoginModal,
    toast, openModal, closeModal, stars, ratingLine, priceBlock, estimateLine,
    productCard, initShell, catLabel, emptyState, valueRow,
    LS_KEYS: LS
  };
})();
 