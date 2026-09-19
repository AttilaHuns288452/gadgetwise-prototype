/* ============================================================
   GadgetWise — js/admin.js
   Admin console logic. All actions persist through GWStore
   (localStorage overlay over the mock dataset) and survive
   reloads; approved reviews appear on the public detail page.
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
      ${st("Total users", GW.users.length, "registered accounts", true)}
      ${st("Gadgets listed", m.totalGadgets, GW.categories.length + " categories", true)}
      ${st("Pending reviews", m.pendingReviews, "needs moderation", false, m.pendingReviews > 0)}
      ${st("Open issues", m.openIssues, "across the catalog", false, m.openIssues > 0)}`;

    const trends = document.getElementById("dashTrends");
    if (trends) {
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
          ${GW.pendingReviews.filter(r => r.status === "pending").slice(0, 4).map(r => `
            <div class="issue-item">
              <span class="sev ${r.rating >= 4 ? "sev-minor" : "sev-moderate"}"></span>
              <div>
                <div class="i-title">${esc(GWApp.fullName(GW.getGadget(r.gadget) || { brand: "", model: r.gadget }))} · ${r.rating}★</div>
                <div class="i-meta">${esc(r.user)} · ${r.date}</div>
              </div>
            </div>`).join("") || `<p class="small muted" style="margin:0">Queue clear — every review has been moderated.</p>`}
          <a class="btn btn-outline btn-sm" href="admin-reviews.html" style="margin-top:12px">Open moderation queue</a>
        </div>`;
      const el = document.getElementById("dashViews");
      const data = (m.views || []).slice(0, 5).map(v => ({ label: (GW.getGadget(v.id) || { model: v.id }).model, value: v.views }));
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
    // category filter always mirrors the live (possibly edited) category list
    if (catSel) catSel.innerHTML = `<option value="">All categories</option>` +
      GW.categories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");

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
          <td class="mono">${(g.rating || 0).toFixed(1)}★</td>
          <td><span class="badge ${g.status === "published" ? "badge-green" : "badge-gold"}">${esc(g.status)}</span></td>
          <td><div class="t-actions">
            <a class="icon-btn" href="gadget-detail.html?id=${encodeURIComponent(g.id)}" title="View public page">${icon("eye")}</a>
            <a class="icon-btn" href="admin-gadget-form.html?id=${encodeURIComponent(g.id)}" title="Edit">${icon("edit")}</a>
            <button class="icon-btn danger" data-del="${esc(g.id)}" title="Delete">${icon("trash")}</button>
          </div></td>
        </tr>`).join("") || `<tr><td colspan="7"><div class="empty-state">${icon("box")}<div class="es-title">No gadgets match</div></div></td></tr>`;

      body.querySelectorAll("[data-del]").forEach(btn => btn.addEventListener("click", () => {
        const g = GW.getGadget(btn.getAttribute("data-del"));
        const ov = GWApp.openModal(`
          <h3>Delete gadget</h3>
          <p class="modal-sub">Removes the record from the catalog — public pages, comparisons, and the recommender stop showing it.</p>
          <p>Remove <b>${esc(GWApp.fullName(g))}</b> from the catalog?</p>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn btn-danger" data-ok>Delete</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-ok]").addEventListener("click", () => {
          GWStore.deleteGadget(g.id);
          GWApp.closeModal();
          GWApp.toast("Gadget deleted", "trash");
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
    const fetchBtn = document.getElementById("fetchBtn");
    const fetchOut = document.getElementById("fetchOutput");
    const set = (name, v) => { const el = form.querySelector(`[name="${name}"]`); if (el && v !== undefined) el.value = v; };
    // category select mirrors the live category list
    const catSel = form.querySelector("[name=category]");
    if (catSel) catSel.innerHTML = GW.categories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");

    if (g) {
      document.getElementById("formTitle").textContent = `Edit — ${GWApp.fullName(g)}`;
      set("brand", g.brand); set("model", g.model); set("category", g.category);
      set("price", g.price); set("releaseYear", g.releaseYear); set("summary", g.summary);
      set("warranty", g.value && g.value.warrantyYears); set("lifespan", g.value && g.value.lifespanYears);
      set("repairLabel", g.value && g.value.repairabilityLabel);
      set("durability", g.scored && g.scored.durability); set("repairability", g.scored && g.scored.repairability);
      form.querySelector("[name=image]").value = g.image;
      // existing specs into rows
      const rows = document.getElementById("specRows");
      const entries = Object.entries(g.specs || {});
      if (entries.length) {
        rows.innerHTML = "";
        entries.forEach(([k, v]) => {
          const row = document.createElement("div");
          row.className = "row spec-row";
          row.style.cssText = "gap:10px";
          row.innerHTML = `
            <input type="text" placeholder="Label (e.g., Processor)" style="flex:1" aria-label="Spec label" value="${esc(k)}">
            <input type="text" placeholder="Value (e.g., Core Ultra 5)" style="flex:2" aria-label="Spec value" value="${esc(v)}">
            <button type="button" class="icon-btn" data-remove-spec title="Remove row" style="border:1px solid var(--line)"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
          rows.appendChild(row);
        });
      }
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
        set("model", r.name); set("brand", r.brand);
        if (catSel && GW.getCategory(r.category)) set("category", r.category);
        form.querySelector("[name=image]").value = r.image;
        fetchBtn.disabled = false;
        GWApp.toast("Mock API response received — verify before saving", "info");
      }, 800);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      // collect specs; normalize storage/RAM units on the way in (data quality)
      const specs = {};
      document.querySelectorAll(".spec-row").forEach(row => {
        const k = row.children[0].value.trim(), v = row.children[1].value.trim();
        if (k && v) specs[k] = GWStore.normUnits(v);
      });
      const price = Number(form.querySelector("[name=price]").value);
      if (!(price > 0)) { GWApp.toast("Enter a price greater than zero", "alert"); return; }
      const cat = form.querySelector("[name=category]").value;
      if (!GW.getCategory(cat)) { GWApp.toast("Pick a category from the list (manage categories on the Categories page)", "alert"); return; }

      const base = g || {};
      const patch = {
        brand: form.querySelector("[name=brand]").value.trim(),
        model: form.querySelector("[name=model]").value.trim(),
        category: cat,
        price,
        releaseYear: Number(form.querySelector("[name=releaseYear]").value) || base.releaseYear || new Date().getFullYear(),
        summary: form.querySelector("[name=summary]").value.trim(),
        image: form.querySelector("[name=image]").value.trim() ||
          (GWStore.slugify(cat).startsWith("smartphone") ? "assets/placeholders/ph-smartphone.svg" : "assets/placeholders/" + GWStore.slugify(cat) + ".svg"),
        specs
      };
      // keep specList in sync (comparison table + detail page read it)
      patch.specList = Object.entries(specs).map(([k, v]) => v);

      if (g) {
        GWStore.editGadget(g.id, patch);
        GWApp.toast("Changes saved", "checkCircle");
      } else {
        // new gadget: sensible defaults so every downstream page renders
        const id = GWStore.slugify(patch.brand + "-" + patch.model) + "-" + Math.random().toString(36).slice(2, 5);
        const num = n => (v, d) => (Number.isFinite(Number(v)) && v !== "" ? Number(v) : d);
        const durability = num(0)(form.querySelector("[name=durability]").value, 6);
        const repairability = num(0)(form.querySelector("[name=repairability]").value, 5);
        const warrantyYears = num(0)(form.querySelector("[name=warranty]").value, 1);
        const lifespanYears = num(0)(form.querySelector("[name=lifespan]").value, 3);
        const newG = Object.assign({}, patch, {
          id,
          status: "published",
          tagline: patch.summary ? patch.summary.slice(0, 60) : "Newly added to the catalog",
          rating: 0, reviewCount: 0,
          scored: { performance: 5, battery: 5, durability, portability: 5, display: 5, camera: 3, storage: 5, repairability },
          value: {
            warrantyYears,
            lifespanYears,
            repairabilityLabel: form.querySelector("[name=repairLabel]").value.trim() || "Moderate — verify with the manufacturer"
          },
          strengths: [], weaknesses: [], goodFor: [], notIdeal: [],
          cx: { perf: 50, display: 50, battery: 50, portability: 50, durab: durability * 10, repair: repairability * 10, camera: 30, storage: 50 },
          battery: 5, durab: durability / 2, repair: repairability / 2, pop: 30,
          uses: { programming: 1, design: 1, classes: 2, research: 1, gaming: 1, video: 1 },
          warranty: warrantyYears * 12,
          reviews: [], issues: []
        });
        GWStore.addGadget(newG);
        GWApp.toast("Gadget created — status: published", "checkCircle");
      }
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
    // every review in the system: gadget reviews + moderation queue
    const allReviews = () => {
      const list = [];
      GW.gadgets.forEach(g => (g.reviews || []).forEach(r => list.push(Object.assign({ gadgetRef: g.id }, r))));
      GW.pendingReviews.forEach(r => list.push(Object.assign({ gadgetRef: r.gadget }, r)));
      // dedupe (approved queue reviews exist in both lists)
      const seen = new Set();
      return list.filter(r => !seen.has(r.id) && seen.add(r.id));
    };

    // review id -> "approved" (embedded catalog reviews are live content; queue
    // reviews start pending until moderated)
    const queueIds = new Set(GW.pendingReviews.map(r => r.id));

    function render() {
      const f = filter.value;
      const store = allReviews().map(r => Object.assign(r, { status: r.status || (queueIds.has(r.id) ? "pending" : "approved") }));
      const badge = document.getElementById("queueCount");
      if (badge) badge.textContent = store.filter(r => (r.status || "pending") === "pending").length + " pending";
      const list = f === "all" ? store : store.filter(r => (r.status || "pending") === f);
      body.innerHTML = list.map(r => {
        const g = GW.getGadget(r.gadgetRef) || { brand: "", model: r.gadgetRef };
        const name = GW.getGadget(r.gadgetRef) ? GWApp.fullName(g) : r.gadgetRef;
        const status = r.status || "pending";
        return `<tr>
          <td><div class="t-title">${esc(name)}</div><div class="t-sub">${esc(r.user)} · ${esc(r.date)}</div></td>
          <td class="mono">${r.rating}★</td>
          <td style="max-width:420px"><span class="small" style="color:var(--ink-2)">“${esc(r.text.slice(0, 140))}${r.text.length > 140 ? "…" : ""}”</span></td>
          <td><span class="badge ${status === "approved" ? "badge-green" : status === "rejected" ? "badge-red" : "badge-gold"}">${esc(status)}</span></td>
          <td><div class="row-actions-inline">
            <button class="btn btn-sm" data-approve="${r.id}" ${status === "approved" ? "disabled" : ""}>Approve</button>
            <button class="btn btn-outline btn-sm" data-reject="${r.id}" ${status === "rejected" ? "disabled" : ""}>Reject</button>
            <button class="btn btn-outline btn-sm" data-edit="${r.id}">Edit</button>
            <button class="icon-btn danger" data-remove="${r.id}" title="Delete review" style="width:30px;height:30px">${icon("trash")}</button>
          </div></td>
        </tr>`;
      }).join("") || `<tr><td colspan="5"><div class="empty-state">${icon("checkCircle")}<div class="es-title">Queue clear</div><p class="small">No reviews with this status.</p></div></td></tr>`;

      const find = id => allReviews().find(x => x.id === id);
      body.querySelectorAll("[data-approve]").forEach(b => b.addEventListener("click", () => {
        GWStore.setReviewStatus(b.getAttribute("data-approve"), "approved", find(b.getAttribute("data-approve")).gadgetRef);
        GWApp.toast("Review approved — now visible on the gadget page", "checkCircle");
        render();
      }));
      body.querySelectorAll("[data-reject]").forEach(b => b.addEventListener("click", () => {
        GWStore.setReviewStatus(b.getAttribute("data-reject"), "rejected", find(b.getAttribute("data-reject")).gadgetRef);
        GWApp.toast("Review rejected — hidden from the public site", "x");
        render();
      }));
      body.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => {
        const r = find(b.getAttribute("data-edit"));
        const ov = GWApp.openModal(`
          <h3>Edit review</h3>
          <p class="modal-sub">Fix profanity, personal information, or formatting. The reviewer name stays.</p>
          <div class="field"><label>Rating (1–5)</label><input id="erRating" type="number" min="1" max="5" step="1" value="${r.rating}"></div>
          <div class="field"><label>Review text</label><textarea id="erText" rows="5">${esc(r.text)}</textarea></div>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn" data-save>Save</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-save]").addEventListener("click", () => {
          const rating = Math.min(5, Math.max(1, Number(ov.querySelector("#erRating").value) || r.rating));
          const text = ov.querySelector("#erText").value.trim();
          if (!text) { GWApp.toast("Review text cannot be empty", "alert"); return; }
          GWStore.setReviewEdit(r.id, text, rating, r.gadgetRef);
          GWApp.closeModal();
          GWApp.toast("Review edited", "edit");
          render();
        });
      }));
      body.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => {
        const r = find(b.getAttribute("data-remove"));
        const ov = GWApp.openModal(`
          <h3>Delete review</h3>
          <p>Permanently remove the review by <b>${esc(r.user)}</b>?</p>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn btn-danger" data-ok>Delete</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-ok]").addEventListener("click", () => {
          GWStore.deleteReview(r.id);
          GWApp.closeModal();
          GWApp.toast("Review deleted", "trash");
          render();
        });
      }));
    }
    filter.addEventListener("change", render);
    render();
  }

  /* ---------- issues ---------- */
  function issues() {
    const body = document.getElementById("issueRows");
    if (!body) return;

    function render() {
      // rebuild each render — the store mutates the dataset in place
      const store = [];
      GW.gadgets.forEach(g => (g.issues || []).forEach(i => store.push(Object.assign({}, i, { gadget: g.id }))));
      (GW.extraIssues || []).forEach(i => store.push(Object.assign({}, i)));
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
            ${["pending", "investigating"].includes(i.status) ? `<button class="btn btn-sm" data-verify="${i.id}" title="Mark as verified/confirmed">Verify</button>` : ""}
            ${i.status !== "confirmed" && i.status !== "resolved" ? `<button class="btn btn-outline btn-sm" data-investigate="${i.id}">Under review</button>` : ""}
            ${i.status !== "resolved" ? `<button class="btn btn-outline btn-sm" data-resolve="${i.id}">Resolve</button>` : `<span class="small muted">—</span>`}
            <button class="icon-btn danger" data-remove-issue="${i.id}" title="Delete report (spam/invalid)" style="width:30px;height:30px">${icon("trash")}</button>
          </div></td>
        </tr>`;
      }).join("") || `<tr><td colspan="6"><div class="empty-state">${icon("checkCircle")}<div class="es-title">No reported issues</div></div></td></tr>`;

      const find = id => store.find(x => x.id === id);
      const setStatus = (id, status, label) => {
        GWStore.setIssueStatus(id, status);
        GWApp.toast("Issue " + label, status === "resolved" ? "checkCircle" : "flag");
        render();
      };
      body.querySelectorAll("[data-verify]").forEach(b => b.addEventListener("click", () => setStatus(b.getAttribute("data-verify"), "confirmed", "marked verified")));
      body.querySelectorAll("[data-investigate]").forEach(b => b.addEventListener("click", () => setStatus(b.getAttribute("data-investigate"), "investigating", "placed under review")));
      body.querySelectorAll("[data-resolve]").forEach(b => b.addEventListener("click", () => setStatus(b.getAttribute("data-resolve"), "resolved", "marked resolved")));
      body.querySelectorAll("[data-remove-issue]").forEach(b => b.addEventListener("click", () => {
        const i = find(b.getAttribute("data-remove-issue"));
        const ov = GWApp.openModal(`
          <h3>Delete issue report</h3>
          <p>Remove <b>${esc(i.title)}</b> as spam or invalid? This cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn btn-danger" data-ok>Delete</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-ok]").addEventListener("click", () => {
          GWStore.deleteIssue(i.id);
          GWApp.closeModal();
          GWApp.toast("Issue report removed", "trash");
          render();
        });
      }));
    }
    render();
  }

  /* ---------- users ---------- */
  function users() {
    const body = document.getElementById("userRows");
    if (!body) return;
    const search = document.getElementById("userSearch");
    function render() {
      const q = search ? (search.value || "").toLowerCase() : "";
      const list = GW.users.filter(u =>
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
      body.innerHTML = list.map(u => `
        <tr>
          <td><div class="row" style="gap:10px"><span class="avatar">${esc(u.name.split(" ").map(s => s[0]).join("").slice(0, 2))}</span> <div><div class="t-title">${esc(u.name)}</div><div class="t-sub">${esc(u.email)}</div></div></div></td>
          <td class="mono">${esc(u.registered)}</td>
          <td><span class="badge ${u.status === "active" ? "badge-green" : u.status === "suspended" ? "badge-red" : "badge-gray"}">${esc(u.status)}</span></td>
          <td class="mono">${u.reviews}</td>
        </tr>`).join("") || `<tr><td colspan="4"><div class="empty-state">${icon("users")}<div class="es-title">No users match</div></div></td></tr>`;
    }
    if (search) search.addEventListener("input", render);
    render();
  }

  /* ---------- categories ---------- */
  function categories() {
    const grid = document.getElementById("catGrid");
    if (!grid) return;
    const addBtn = document.getElementById("addCatBtn");
    if (addBtn) addBtn.addEventListener("click", () => catModal(null));

    function render() {
      grid.innerHTML = GW.categories.map(c => {
        const list = GW.gadgetsInCategory(c.id);
        const avg = list.length ? (list.reduce((n, g) => n + g.rating, 0) / list.length).toFixed(1) : "—";
        // unknown categories get a neutral "box" glyph; known ones reuse the site icon set
        const ico = (window.GWCatIcons && GWCatIcons[c.id]) ||
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:40px;height:40px"><path d="m12 2 8 4.5v9L12 22l-8-6.5v-9L12 2Z"/><path d="m4 6.5 8 4.5 8-4.5M12 11v11"/></svg>`;
        return `
        <div class="panel">
          <div class="row-between" style="margin-bottom:10px">
            <div class="row" style="gap:12px">
              <span style="width:44px;height:44px;display:grid;place-items:center;color:var(--ink-2)">${ico}</span>
              <div><h3 style="font-size:1rem">${esc(c.name)}</h3><div class="t-sub">${list.length} gadget${list.length === 1 ? "" : "s"} · avg ${avg}★</div></div>
            </div>
            <div class="t-actions">
              <a class="icon-btn" href="category.html?cat=${encodeURIComponent(c.id)}" title="View public category">${icon("eye")}</a>
              <button class="icon-btn" title="Edit category" data-edit-cat="${esc(c.id)}">${icon("edit")}</button>
              <button class="icon-btn danger" title="Delete category" data-del-cat="${esc(c.id)}" style="width:30px;height:30px">${icon("trash")}</button>
            </div>
          </div>
          <p class="small muted" style="margin:0">${esc(c.blurb)}</p>
        </div>`;
      }).join("");
      grid.querySelectorAll("[data-edit-cat]").forEach(b => b.addEventListener("click", () => catModal(GW.getCategory(b.getAttribute("data-edit-cat")))));
      grid.querySelectorAll("[data-del-cat]").forEach(b => b.addEventListener("click", () => {
        const c = GW.getCategory(b.getAttribute("data-del-cat"));
        const count = GW.gadgetsInCategory(c.id).length;
        const ov = GWApp.openModal(`
          <h3>Delete category</h3>
          <p class="modal-sub">${count ? `It still holds ${count} gadget${count === 1 ? "" : "s"} — move them to another category first.` : "The category is empty and will be removed."}</p>
          <p>Delete <b>${esc(c.name)}</b>?</p>
          <div class="modal-actions">
            <button class="btn btn-outline" data-close>Cancel</button>
            <button class="btn btn-danger" data-ok ${count ? "disabled" : ""}>Delete</button>
          </div>`);
        ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
        ov.querySelector("[data-ok]").addEventListener("click", () => {
          GWStore.deleteCategory(c.id);
          GWApp.closeModal();
          GWApp.toast("Category deleted", "trash");
          render();
        });
      }));
    }

    function catModal(c) {
      const isNew = !c;
      const ov = GWApp.openModal(`
        <h3>${isNew ? "Add category" : "Edit category"}</h3>
        <p class="modal-sub">Category names appear in browse filters, the recommender, and the admin console.</p>
        <div class="field"><label for="cName">Name</label><input id="cName" type="text" value="${c ? esc(c.name) : ""}" placeholder="e.g., Cameras"></div>
        <div class="field"><label for="cBlurb">Description</label><textarea id="cBlurb" rows="2" placeholder="One line on what belongs here.">${c ? esc(c.blurb) : ""}</textarea></div>
        <div class="modal-actions">
          <button class="btn btn-outline" data-close>Cancel</button>
          <button class="btn" data-save>${isNew ? "Add" : "Save"}</button>
        </div>`);
      ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
      ov.querySelector("[data-save]").addEventListener("click", () => {
        const name = ov.querySelector("#cName").value.trim();
        const blurb = ov.querySelector("#cBlurb").value.trim() || "No description yet.";
        if (!name) { GWApp.toast("Give the category a name", "alert"); return; }
        // guard: duplicate names would fork the taxonomy
        if (GW.categories.some(x => x.name.toLowerCase() === name.toLowerCase() && (!c || x.id !== c.id))) {
          GWApp.toast("A category with that name already exists", "alert"); return;
        }
        const id = isNew ? GWStore.slugify(name) : c.id;
        const exists = GW.getCategory(id);
        const rec = { id, name, blurb, file: (c && c.file) || "ph-" + GWStore.slugify(name) };
        if (isNew && !exists) GWStore.addCategory(rec); else GWStore.editCategory(id, rec);
        GWApp.closeModal();
        GWApp.toast(isNew ? "Category added" : "Category updated", "checkCircle");
        render();
      });
    }

    render();
  }

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
    ({ dashboard, gadgets, gadgetForm, reviews, issues, users, categories }[page] || (() => {}))();
  }

  return { init };
})();
