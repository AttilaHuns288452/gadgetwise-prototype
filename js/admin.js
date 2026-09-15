/* ============================================================
   GadgetWise — js/admin.js
   Admin console logic. Every action is simulated on mock data:
   moderation status changes, gadget CRUD, and the mock product
   API fetch that stands in for the future server-side API.
   ============================================================ */

window.GWAdmin = (function () {
  "use strict";
  const { esc, money, icon } = GWApp;

  /* ---------- dashboard ---------- */
  function dashboard() {
    const m = GW.adminMetrics;
    const st = (l, v, d, up, alert) => `
      <div class="stat ${alert ? "alert" : ""}">
        <div class="s-label">${esc(l)}</div>
        <div class="s-value">${v}</div>
        ${d ? `<div class="s-delta ${up ? "up" : "down"}">${icon("trendUp", "icon-sm")} ${esc(d)}</div>` : ""}
      </div>`;
    const box = document.getElementById("statGrid");
    if (box) box.innerHTML = `
      ${st("Total users", m.totalUsers.toLocaleString("en-PH"), "+124 this month", true)}
      ${st("Gadgets listed", m.totalGadgets, "6 categories", true)}
      ${st("Pending reviews", m.pendingReviews, "needs moderation", false, true)}
      ${st("Open issues", m.openIssues, "3 new this week", false, true)}`;

    const trends = document.getElementById("dashTrends");
    if (trends) {
      const labels = Object.fromEntries(GW.gadgets.map(g => [g.id, GWApp.fullName(g)]));
      trends.innerHTML = `
        <div class="panel">
          <div class="row-between" style="margin-bottom:14px">
            <h3>Top viewed this month</h3>
            <a class="small" href="admin-reports.html">Full reports ${icon("arrowRight", "icon-sm")}</a>
          </div>
          <div id="dashViews"></div>
        </div>
        <div class="panel">
          <h3 style="margin-bottom:14px">Moderation queue preview</h3>
          ${GW.pendingReviews.slice(0, 4).map(r => `
            <div class="issue-item">
              <span class="sev ${r.rating >= 4 ? "sev-minor" : "sev-moderate"}"></span>
              <div>
                <div class="i-title">${esc(labels[r.gadget] || r.gadget)} · ${r.rating}★</div>
                <div class="i-meta">${esc(r.user)} · ${r.date}</div>
              </div>
            </div>`).join("")}
          <a class="btn btn-outline btn-sm" href="admin-reviews.html" style="margin-top:12px">Open moderation queue</a>
        </div>`;
      const el = document.getElementById("dashViews");
      const data = m.views.slice(0, 5).map(v => ({ label: (GW.getGadget(v.id) || { model: v.id }).model, value: v.views }));
      GWCharts.hbar(el, data);
    }
  }

  /* ---------- gadget management ---------- */
  function gadgets() {
    const body = document.getElementById("gadgetRows");
    const search = document.getElementById("adminGadgetSearch");
    const catSel = document.getElementById("adminCatFilter");
    const statusSel = document.getElementById("adminStatusFilter");
    if (!body) return;

    function render() {
      const q = (search.value || "").toLowerCase();
      const cat = catSel.value, status = statusSel.value;
      const list = GW.gadgets.filter(g =>
        (!cat || g.category === cat) &&
        (!status || g.status === status) &&          (!q || GWApp.fullName(g).toLowerCase().includes(q)));
      body.innerHTML = list.map(g => `
        <tr>
          <td><img class="t-media" src="${g.image}" alt=""></td>
          <td><div class="t-title">${esc(GWApp.fullName(g))}</div><div class="t-sub">${g.id}</div></td>
          <td>${esc(GWApp.catLabel(g.category))}</td>
          <td class="mono">${money(g.price)}</td>
          <td class="mono">${g.rating.toFixed(1)}★</td>
          <td><span class="badge ${g.status === "published" ? "badge-green" : "badge-gold"}">${esc(g.status)}</span></td>
          <td><div class="t-actions">
            <a class="icon-btn" href="gadget-detail.html?id=${g.id}" title="View public page">${icon("eye")}</a>
            <a class="icon-btn" href="admin-gadget-form.html?id=${g.id}" title="Edit">${icon("edit")}</a>
            <button class="icon-btn danger" data-del="${g.id}" title="Delete">${icon("trash")}</button>
          </div></td>
        </tr>`).join("") || `<tr><td colspan="7"><div class="empty-state">${icon("box")}<div class="es-title">No gadgets match</div></div></td></tr>`;

      body.querySelectorAll("[data-del]").forEach(btn => btn.addEventListener("click", () => {
        const g = GW.getGadget(btn.getAttribute("data-del"));
        const ov = GWApp.openModal(`
          <h3>Delete gadget</h3>
          <p class="modal-sub">This simulates deletion in the prototype dataset.</p>
          <p>Remove <b>${esc(GWApp.fullName(g))}</b> from the catalog?</p>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn btn-danger" data-ok>Delete</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-ok]").addEventListener("click", () => {
          const i = GW.gadgets.indexOf(g);
          if (i >= 0) GW.gadgets.splice(i, 1);
          GWApp.closeModal();
          GWApp.toast("Gadget deleted (simulated)", "trash");
          render();
        });
      }));
    }
    [search, catSel, statusSel].forEach(el => el && el.addEventListener("input", render));
    render();
  }

  /* ---------- gadget form (add/edit) + mock API fetch ---------- */
  function gadgetForm() {
    const form = document.getElementById("gadgetForm");
    if (!form) return;
    const p = GWApp.params();
    const editId = p.get("id");
    const g = editId ? GW.getGadget(editId) : null;
    const stage = document.getElementById("apiConsole");
    const fetchBtn = document.getElementById("fetchBtn");
    const fetchOut = document.getElementById("fetchOutput");
    const set = (name, v) => { const el = form.querySelector(`[name="${name}"]`); if (el && v !== undefined) el.value = v; };

    if (g) {
      document.getElementById("formTitle").textContent = `Edit — ${GWApp.fullName(g)}`;
      set("brand", g.brand); set("model", g.model); set("category", g.category);
      set("price", g.price); set("releaseYear", g.releaseYear); set("summary", g.summary);
      set("warranty", g.value.warrantyYears); set("lifespan", g.value.lifespanYears);
      set("repairLabel", g.value.repairabilityLabel);
      set("durability", g.scored.durability); set("repairability", g.scored.repairability);
      form.querySelector("[name=image]").value = g.image;
    }

    // Mock "Fetch Product Information" — represents the future server-side API
    const MOCK_RESULTS = [
      { name: "Spark 5G (2025)", brand: "Novatek", category: "smartphones", image: "assets/placeholders/ph-smartphone-01.svg", confidence: "high" },
      { name: "AirBook 14 (2026)", brand: "Kaido", category: "laptops", image: "assets/placeholders/ph-laptop-02.svg", confidence: "high" },
      { name: "Tab 11 (2026)", brand: "Aurio", category: "tablets", image: "assets/placeholders/ph-tablet-02.svg", confidence: "medium" },
      { name: "Wave 700", brand: "Kaido", category: "headphones", image: "assets/placeholders/ph-headphones-03.svg", confidence: "high" },
      { name: "ChargePack 20K", brand: "Vantor", category: "powerbanks", image: "assets/placeholders/ph-powerbank-01.svg", confidence: "medium" },
      { name: "Pulse S (2026)", brand: "Kaido", category: "smartwatches", image: "assets/placeholders/ph-watch-02.svg", confidence: "high" }
    ];
    fetchBtn.addEventListener("click", () => {
      fetchBtn.disabled = true;
      fetchOut.classList.remove("hidden");
      fetchOut.innerHTML = `<div class="api-console">
        <div class="api-head"><span class="t">External product API — mock response</span><span class="tag">simulated · 0.8 s</span></div>
        <div class="api-body"><div class="api-fields" style="width:100%; display:grid; place-items:center; padding:30px; color:var(--ink-3)">${icon("refresh")} Fetching…</div></div>
      </div>`;
      setTimeout(() => {
        const r = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
        fetchOut.innerHTML = `
        <div class="api-console">
          <div class="api-head"><span class="t">External product API — mock response</span><span class="tag">simulated · 0.8 s</span></div>
          <div class="api-body">
            <img class="api-img" src="${r.image}" alt="Mock API placeholder image">
            <div class="api-fields">
              <div class="af"><b>NAME</b>${esc(r.name)}</div>
              <div class="af"><b>BRAND</b>${esc(r.brand)}</div>
              <div class="af"><b>CATEGORY</b>${esc(GWApp.catLabel(r.category))}</div>
              <div class="af"><b>IMAGE</b>${esc(r.image.split("/").pop())}</div>
              <div class="af"><b>CONFIDENCE</b>${esc(r.confidence)}</div>
              <div class="af"><b>LICENSE</b>CC-BY (mock)</div>
            </div>
          </div>
          <div class="api-foot">${icon("alert", "icon-sm")} Verify every field before saving — API data is unverified until an administrator approves it.</div>
        </div>`;
        // populate fields (admin still verifies/edits)
        set("model", r.name); set("brand", r.brand); set("category", r.category);
        form.querySelector("[name=image]").value = r.image;
        fetchBtn.disabled = false;
        GWApp.toast("Mock API response received — verify before saving", "info");
      }, 800);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      GWApp.toast(g ? "Changes saved (simulated)" : "Gadget created (simulated) — status: published", "checkCircle");
      setTimeout(() => { location.href = "admin-gadgets.html"; }, 700);
    });
    document.getElementById("cancelForm").addEventListener("click", () => history.back());
  }

  /* ---------- reviews moderation ---------- */
  function reviews() {
    const body = document.getElementById("reviewRows");
    if (!body) return;
    let filter = document.getElementById("reviewFilter");
    if (!filter) {
      filter = document.createElement("select");
      filter.id = "reviewFilter";
      filter.className = "hidden";
      filter.innerHTML = `<option value="all">all</option><option value="pending">pending</option><option value="approved">approved</option><option value="rejected">rejected</option>`;
      document.body.appendChild(filter);
    }
    let store = GW.pendingReviews.map(r => ({ ...r }));

    function render() {
      const f = filter.value;
      const badge = document.getElementById("queueCount");
      if (badge) badge.textContent = store.filter(r => r.status === "pending").length + " pending";
      const list = f === "all" ? store : store.filter(r => r.status === f);
      body.innerHTML = list.map(r => {
        const g = GW.getGadget(r.gadget) || { brand: "", model: r.gadget };
        const name = GW.getGadget(r.gadget) ? GWApp.fullName(g) : r.gadget;
        return `<tr>
          <td><div class="t-title">${esc(name)}</div><div class="t-sub">${esc(r.user)} · ${esc(r.date)}</div></td>
          <td class="mono">${r.rating}★</td>
          <td style="max-width:420px"><span class="small" style="color:var(--ink-2)">“${esc(r.text.slice(0, 140))}${r.text.length > 140 ? "…" : ""}”</span></td>
          <td><span class="badge ${r.status === "approved" ? "badge-green" : r.status === "rejected" ? "badge-red" : "badge-gold"}">${esc(r.status)}</span></td>
          <td><div class="row-actions-inline">
            <button class="btn btn-sm" data-approve="${r.id}" ${r.status === "approved" ? "disabled" : ""}>Approve</button>
            <button class="btn btn-outline btn-sm" data-reject="${r.id}" ${r.status === "rejected" ? "disabled" : ""}>Reject</button>
          </div></td>
        </tr>`;
      }).join("") || `<tr><td colspan="5"><div class="empty-state">${icon("checkCircle")}<div class="es-title">Queue clear</div><p class="small">No reviews with this status.</p></div></td></tr>`;

      body.querySelectorAll("[data-approve]").forEach(b => b.addEventListener("click", () => setStatus(b.getAttribute("data-approve"), "approved")));
      body.querySelectorAll("[data-reject]").forEach(b => b.addEventListener("click", () => setStatus(b.getAttribute("data-reject"), "rejected")));
    }
    function setStatus(id, status) {
      const r = store.find(x => x.id === id); if (!r) return;
      r.status = status;
      GWApp.toast(`Review ${status} (simulated)`, status === "approved" ? "checkCircle" : "x");
      render();
    }
    filter.addEventListener("change", render);
    render();
  }

  /* ---------- issues ---------- */
  function issues() {
    const body = document.getElementById("issueRows");
    if (!body) return;
    // Build the full issue list: gadget-embedded + pool
    let store = [];
    GW.gadgets.forEach(g => g.issues.forEach(i => store.push({ ...i, gadget: g.id })));
    GW.extraIssues.forEach(i => store.push({ ...i }));

    function render() {
      body.innerHTML = store.map(i => {
        const g = GW.getGadget(i.gadget) || { brand: "", model: "—" };
        const badge = { pending: "badge-gold", investigating: "badge-gold", confirmed: "badge-red", resolved: "badge-green" }[i.status] || "badge-gray";
        return `<tr>
          <td><div class="t-title">${esc(g.brand)} ${esc(g.model)}</div><div class="t-sub">${esc(i.title)}</div></td>
          <td class="mono" style="text-transform:capitalize">${esc(i.severity)}</td>
          <td>${esc(i.reportedBy)}</td>
          <td class="mono">${esc(i.date)}</td>
          <td><span class="badge ${badge}">${esc(i.status)}</span></td>
          <td><div class="row-actions-inline">
            ${i.status !== "resolved" ? `<button class="btn btn-sm" data-resolve="${i.id}">Mark resolved</button>` : `<span class="small muted">—</span>`}
          </div></td>
        </tr>`;
      }).join("");
      body.querySelectorAll("[data-resolve]").forEach(b => b.addEventListener("click", () => {
        const i = store.find(x => x.id === b.getAttribute("data-resolve"));
        i.status = "resolved";
        GWApp.toast("Issue marked resolved (simulated)", "checkCircle");
        render();
      }));
    }
    render();
  }

  /* ---------- users ---------- */
  function users() {
    const body = document.getElementById("userRows");
    if (!body) return;
    body.innerHTML = GW.users.map(u => `
      <tr>
        <td><div class="row" style="gap:10px"><span class="avatar">${esc(u.name.split(" ").map(s => s[0]).join("").slice(0, 2))}</span> <div><div class="t-title">${esc(u.name)}</div><div class="t-sub">${esc(u.email)}</div></div></div></td>
        <td class="mono">${esc(u.registered)}</td>
        <td><span class="badge ${u.status === "active" ? "badge-green" : u.status === "suspended" ? "badge-red" : "badge-gray"}">${esc(u.status)}</span></td>
        <td class="mono">${u.reviews}</td>
        <td><div class="row-actions-inline">
          ${u.status === "active" ? `<button class="btn btn-outline btn-sm" data-suspend="${u.id}">Suspend</button>` : `<button class="btn btn-sm" data-activate="${u.id}">Activate</button>`}
        </div></td>
      </tr>`).join("");
    body.addEventListener("click", e => {
      const s = e.target.closest("[data-suspend]"), a = e.target.closest("[data-activate]");
      if (s) { GW.users.find(u => u.id === s.getAttribute("data-suspend")).status = "suspended"; GWApp.toast("User suspended (simulated)", "flag"); users(); }
      if (a) { GW.users.find(u => u.id === a.getAttribute("data-activate")).status = "active"; GWApp.toast("User activated (simulated)", "checkCircle"); users(); }
    });
  }

  /* ---------- categories ---------- */
  function categories() {
    const grid = document.getElementById("catGrid");
    if (!grid) return;
    grid.innerHTML = GW.categories.map(c => {
      const list = GW.gadgetsInCategory(c.id);
      const avg = list.length ? (list.reduce((n, g) => n + g.rating, 0) / list.length).toFixed(1) : "—";
      return `
      <div class="panel">
        <div class="row-between" style="margin-bottom:10px">
          <div class="row" style="gap:12px">
            <img src="assets/placeholders/${c.file}.svg" alt="" style="width:44px;height:44px;border-radius:8px;border:1px solid var(--line)">
            <div><h3 style="font-size:1rem">${esc(c.name)}</h3><div class="t-sub">${list.length} gadget${list.length === 1 ? "" : "s"} · avg ${avg}★</div></div>
          </div>
          <div class="t-actions">
            <a class="icon-btn" href="category.html?cat=${c.id}" title="View public category">${icon("eye")}</a>
            <button class="icon-btn" title="Edit category (simulated)" data-edit-cat="${c.id}">${icon("edit")}</button>
          </div>
        </div>
        <p class="small muted" style="margin:0">${esc(c.blurb)}</p>
      </div>`;
    }).join("");
    grid.querySelectorAll("[data-edit-cat]").forEach(b => b.addEventListener("click", () =>
      GWApp.toast("Category editing is simulated in this prototype", "info")));
  }

  /* ---------- reports ---------- */
  function reports() {
    const m = GW.adminMetrics;
    const viewsData = m.views.map(v => { const g = GW.getGadget(v.id) || { model: v.id }; return { label: `${g.brand || ""} ${g.model}`.trim(), value: v.views }; });
    const cmpData = m.comparisons.map(v => { const g = GW.getGadget(v.id) || { model: v.id }; return { label: `${g.brand || ""} ${g.model}`.trim(), value: v.count }; });
    const recData = m.recommended.map(v => { const g = GW.getGadget(v.id) || { model: v.id }; return { label: `${g.brand || ""} ${g.model}`.trim(), value: v.count }; });
    const catData = Object.entries(m.categoryShare).map(([id, v]) => ({ label: GWApp.catLabel(id), value: v }));

    GWCharts.hbar(document.getElementById("chartViews"), viewsData);
    GWCharts.hbar(document.getElementById("chartComp"), cmpData);
    GWCharts.hbar(document.getElementById("chartRec"), recData);
    GWCharts.donut(document.getElementById("chartCat"), catData);
    GWCharts.line(document.getElementById("chartTrend"), m.viewsTrend);

    GWCharts.attachTableToggle(document.getElementById("chartViews"),
      GWCharts.tableHTML(["Gadget", "Views (this month)"], viewsData.map(d => [d.label, fmt(d.value)])));
    GWCharts.attachTableToggle(document.getElementById("chartComp"),
      GWCharts.tableHTML(["Gadget", "Comparisons"], cmpData.map(d => [d.label, fmt(d.value)])));
    GWCharts.attachTableToggle(document.getElementById("chartRec"),
      GWCharts.tableHTML(["Gadget", "Times recommended"], recData.map(d => [d.label, fmt(d.value)])));
    GWCharts.attachTableToggle(document.getElementById("chartCat"),
      GWCharts.tableHTML(["Category", "Share of views"], catData.map(d => [d.label, d.value + "%"])));
    GWCharts.attachTableToggle(document.getElementById("chartTrend"),
      GWCharts.tableHTML(["Week", "Page views"], m.viewsTrend.map(d => [d.week, fmt(d.value)])));
  }
  function fmt(n) { return n.toLocaleString("en-PH"); }

  /* ---------- admin shell (sidebar) ---------- */
  const NAV_ICONS = {
    dashboard: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    reports: '<path d="M4 20h16"/><rect x="6" y="10" width="3" height="7" rx="0.5"/><rect x="11" y="6" width="3" height="11" rx="0.5"/><rect x="16" y="13" width="3" height="4" rx="0.5"/>',
    gadgets: '<path d="m12 2 8 4.5v9L12 22l-8-6.5v-9L12 2Z"/><path d="m4 6.5 8 4.5 8-4.5M12 11v11"/>',
    categories: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    reviews: '<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"/>',
    issues: '<path d="M5 21V4"/><path d="M5 4h13l-2.5 4L18 12H5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3 3-4.5 6.5-4.5s5.8 1.5 6.5 4.5"/>',
    site: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>'
  };
  function renderShell() {
    const shell = document.querySelector(".admin-shell");
    if (!shell) return;
    const here = location.pathname.split("/").pop();
    const link = (href, ic, label) =>
      `<a href="${href}"${here === href ? ' class="active" aria-current="page"' : ""}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex:none">${NAV_ICONS[ic]}</svg>${label}</a>`;
    shell.insertAdjacentHTML("afterbegin", `
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <a class="logo" href="admin-dashboard.html">Gadget<span class="logo-wise">Wise</span></a>
          <span class="admin-chip">ADMIN</span>
        </div>
        <nav class="admin-nav" aria-label="Admin">
          <div class="group">OVERVIEW</div>
          ${link("admin-dashboard.html", "dashboard", "Dashboard")}
          ${link("admin-reports.html", "reports", "Reports")}
          <div class="group">CATALOG</div>
          ${link("admin-gadgets.html", "gadgets", "Gadgets")}
          ${link("admin-categories.html", "categories", "Categories")}
          <div class="group">COMMUNITY</div>
          ${link("admin-reviews.html", "reviews", "Reviews")}
          ${link("admin-issues.html", "issues", "Reported Issues")}
          <div class="group">PEOPLE</div>
          ${link("admin-users.html", "users", "Users")}
          <div class="group">SESSION</div>
          ${link("index.html", "site", "View public site")}
          <a href="admin-login.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex:none">${NAV_ICONS.logout}</svg>Sign out</a>
        </nav>
      </aside>`);
  }

  /* ---------- router ---------- */
  function init() {
    renderShell();
    const page = document.body.getAttribute("data-admin-page");
    ({ dashboard, gadgets, gadgetForm, reviews, issues, users, categories, reports }[page] || (() => {}))();
  }

  return { init };
})();
