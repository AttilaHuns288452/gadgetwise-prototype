/* ============================================================
   GadgetWise — js/admin-store.js
   Admin persistence: a localStorage overlay applied over the
   mock dataset on every page load. Every admin action (gadget
   & category CRUD, review moderation, issue triage, user
   status) writes here, so changes survive reloads and appear
   on the public pages. No backend in the prototype — this
   stands in for one. Load AFTER js/data.js.
   ============================================================ */

window.GWStore = (function () {
  "use strict";
  const KEY = "gw_admin_overlay_v1";

  function blank() {
    return {
      gadgets: [],             // full stored copies (new + edited gadgets)
      deletedGadgetIds: [],
      categories: [],          // stored copies (new + edited categories)
      deletedCategoryIds: [],
      reviewStatus: {},        // reviewId -> "approved" | "rejected" | "pending"
      reviewEdits: {},         // reviewId -> { text, rating }
      deletedReviewIds: [],
      newReviews: [],          // admin-added reviews (full objects)
      issueStatus: {},         // issueId -> status
      deletedIssueIds: [],
      userStatus: {},          // userId -> "active" | "suspended" | "inactive"
      recalc: {},              // gadgetId -> true (rating needs recompute)
      updatedAt: null
    };
  }

  function read() {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || "null");
      return o ? Object.assign(blank(), o) : blank();
    } catch (e) { return blank(); }
  }
  function write(o) { o.updatedAt = new Date().toISOString(); try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* storage unavailable */ } }

  /* ---------- slug + id helpers (shared with admin.js) ---------- */
  function slugify(s) {
    return String(s || "").toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "item";
  }
  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ---------- recompute derived numbers for one gadget ---------- */
  function recalcGadget(g) {
    const rs = (g.reviews || []).filter(r => r.status !== "rejected");
    if (rs.length) {
      g.rating = Math.round((rs.reduce((n, r) => n + Number(r.rating || 0), 0) / rs.length) * 10) / 10;
      g.reviewCount = rs.length;
    } else {
      g.rating = 0; g.reviewCount = 0;
    }
  }
  function refreshMetrics() {
    if (!GW.adminMetrics) return;
    const live = id => !!GW.getGadget(id);
    GW.adminMetrics.totalGadgets = GW.gadgets.length;
    GW.adminMetrics.pendingReviews = GW.pendingReviews.filter(r => r.status === "pending").length;
    GW.adminMetrics.openIssues =
      GW.gadgets.reduce((n, g) => n + (g.issues || []).filter(i => i.status !== "resolved").length, 0) +
      (GW.extraIssues || []).filter(i => i.status !== "resolved").length;
    GW.adminMetrics.views = (GW.adminMetrics.views || []).filter(v => live(v.id));
    GW.adminMetrics.comparisons = (GW.adminMetrics.comparisons || []).filter(v => live(v.id));
    GW.adminMetrics.recommended = (GW.adminMetrics.recommended || []).filter(v => live(v.id));
    GW.adminMetrics.totalReviews =
      GW.gadgets.reduce((n, g) => n + (g.reviews || []).length, 0) + GW.pendingReviews.length;
    if (GW.community) {
      GW.community.gadgetsTracked = GW.gadgets.length;
      GW.community.reviewsWritten = GW.gadgets.reduce((n, g) => n + (g.reviewCount || 0), 0);
    }
  }

  /* ---------- apply the overlay to the in-memory dataset ---------- */
  function applyToData(o) {
    // gadgets: deletes first (delete wins over an edit), then upserts
    o.deletedGadgetIds.forEach(id => {
      const i = GW.gadgets.findIndex(g => g.id === id);
      if (i >= 0) GW.gadgets.splice(i, 1);
    });
    o.gadgets.forEach(g => {
      const i = GW.gadgets.findIndex(x => x.id === g.id);
      if (i >= 0) GW.gadgets[i] = g; else GW.gadgets.push(g);
    });
    // categories: upserts then deletes
    o.categories.forEach(c => {
      const i = GW.categories.findIndex(x => x.id === c.id);
      if (i >= 0) GW.categories[i] = c; else GW.categories.push(c);
    });
    GW.categories = GW.categories.filter(c => !o.deletedCategoryIds.includes(c.id));
    // reviews: removals, status, edits, admin-added
    GW.pendingReviews = GW.pendingReviews.filter(r => !o.deletedReviewIds.includes(r.id));
    GW.gadgets.forEach(g => {
      g.reviews = (g.reviews || []).filter(r => !o.deletedReviewIds.includes(r.id));
    });
    GW.pendingReviews.forEach(r => {
      if (o.reviewStatus[r.id]) r.status = o.reviewStatus[r.id];
      const e = o.reviewEdits[r.id];
      if (e) { r.text = e.text; r.rating = e.rating; }
    });
    // same for reviews embedded in gadget records (status defaults to approved)
    GW.gadgets.forEach(g => (g.reviews || []).forEach(r => {
      if (o.reviewStatus[r.id]) r.status = o.reviewStatus[r.id];
      const e = o.reviewEdits[r.id];
      if (e) { r.text = e.text; r.rating = e.rating; }
    }));
    (o.newReviews || []).forEach(r => {
      const g = GW.getGadget(r.gadget);
      if (g && !(g.reviews || []).some(x => x.id === r.id)) g.reviews.unshift(r);
    });
    // approved queue reviews become public: copy onto their gadget's review list
    GW.pendingReviews.filter(r => r.status === "approved").forEach(r => {
      const g = GW.getGadget(r.gadget);
      if (g && !(g.reviews || []).some(x => x.id === r.id)) {
        g.reviews.unshift({ id: r.id, user: r.user, rating: r.rating, date: r.date, context: r.context || "Student review", text: r.text, status: "approved" });
      }
    });
    // rating recompute only for gadgets an admin actually touched
    GW.gadgets.forEach(g => { if (o.recalc[g.id]) recalcGadget(g); });
    // issues
    GW.gadgets.forEach(g => {
      g.issues = (g.issues || []).filter(i => !o.deletedIssueIds.includes(i.id));
      g.issues.forEach(i => { if (o.issueStatus[i.id]) i.status = o.issueStatus[i.id]; });
    });
    GW.extraIssues = (GW.extraIssues || []).filter(i => !o.deletedIssueIds.includes(i.id));
    GW.extraIssues.forEach(i => { if (o.issueStatus[i.id]) i.status = o.issueStatus[i.id]; });
    // users
    GW.users.forEach(u => { if (o.userStatus[u.id]) u.status = o.userStatus[u.id]; });
    refreshMetrics();
  }

  /* ---------- public actions ---------- */
  function addGadget(g) { const o = read(); o.gadgets.push(g); o.recalc[g.id] = true; write(o); applyToData(o); }
  function editGadget(id, patch) {
    const o = read();
    const g = GW.getGadget(id); if (!g) return;
    const next = JSON.parse(JSON.stringify(g)); // stored copy — deep, so edits to specs/reviews persist
    if (patch.specs) for (const k of Object.keys(patch.specs)) patch.specs[k] = normUnits(patch.specs[k]);
    Object.assign(next, patch);
    const i = o.gadgets.findIndex(x => x.id === id);
    if (i >= 0) o.gadgets[i] = next; else o.gadgets.push(next);
    o.recalc[id] = true;
    write(o); applyToData(o);
  }
  function deleteGadget(id) {
    const o = read();
    o.gadgets = o.gadgets.filter(g => g.id !== id);
    if (!o.deletedGadgetIds.includes(id)) o.deletedGadgetIds.push(id);
    write(o); applyToData(o);
  }
  function addCategory(c) { const o = read(); o.categories.push(c); write(o); applyToData(o); }
  function editCategory(id, patch) {
    const o = read();
    const c = GW.getCategory(id); if (!c) return;
    const next = Object.assign({}, c, patch);
    const i = o.categories.findIndex(x => x.id === id);
    if (i >= 0) o.categories[i] = next; else o.categories.push(next);
    write(o); applyToData(o);
  }
  function deleteCategory(id) {
    const o = read();
    o.categories = o.categories.filter(c => c.id !== id);
    if (!o.deletedCategoryIds.includes(id)) o.deletedCategoryIds.push(id);
    write(o); applyToData(o);
  }
  function setReviewStatus(id, status, gadgetHint) {
    const o = read(); o.reviewStatus[id] = status;
    const g = GW.getGadget(gadgetHint); if (g) o.recalc[gadgetHint] = true;
    write(o); applyToData(o);
  }
  function setReviewEdit(id, text, rating, gadgetHint) {
    const o = read(); o.reviewEdits[id] = { text, rating };
    if (gadgetHint) o.recalc[gadgetHint] = true;
    write(o); applyToData(o);
  }
  function deleteReview(id) {
    const o = read();
    if (!o.deletedReviewIds.includes(id)) o.deletedReviewIds.push(id);
    delete o.reviewStatus[id]; delete o.reviewEdits[id];
    // mark every gadget recalc — cheap and always correct
    GW.gadgets.forEach(g => { if ((g.reviews || []).some(r => r.id === id)) o.recalc[g.id] = true; });
    GW.pendingReviews.filter(r => r.id === id).forEach(r => { if (r.gadget) o.recalc[r.gadget] = true; });
    write(o); applyToData(o);
  }
  function addReview(r) {
    const o = read();
    o.newReviews.push(r);
    if (!o.reviewStatus[r.id]) o.reviewStatus[r.id] = "approved";
    o.recalc[r.gadget] = true;
    write(o); applyToData(o);
  }
  function setIssueStatus(id, status) { const o = read(); o.issueStatus[id] = status; write(o); applyToData(o); }
  function deleteIssue(id) {
    const o = read();
    if (!o.deletedIssueIds.includes(id)) o.deletedIssueIds.push(id);
    delete o.issueStatus[id];
    write(o); applyToData(o);
  }
  function setUserStatus(id, status) { const o = read(); o.userStatus[id] = status; write(o); applyToData(o); }

  /* ---------- data quality: unit + completeness audit ---------- */
  function normUnits(s) {
    return String(s || "")
      .replace(/\b(\d+(?:\.\d+)?)\s*gb\b/gi, "$1GB")
      .replace(/\b(\d+(?:\.\d+)?)\s*tb\b/gi, "$1TB")
      .replace(/\b(\d+(?:\.\d+)?)\s*mb\b/gi, "$1MB")
      .replace(/\b(\d+(?:[.,]\d+)?)\s*mah\b/gi, "$1mAh");
  }
  function auditGadget(g) {
    const w = [];
    if (!g.brand || !g.model) w.push("Missing brand or model name");
    if (!GW.getCategory(g.category)) w.push("Category is not in the category list");
    if (!(Number(g.price) > 0)) w.push("Price is missing or not a positive number");
    if (!g.image) w.push("No image set");
    if (!g.releaseYear) w.push("Release year missing");
    Object.entries(g.specs || {}).forEach(([k, v]) => {
      if (/ram|memory|storage/i.test(k) && !/(gb|tb|mb)\b/i.test(String(v))) w.push(k + ": no GB/TB unit in value (\"" + v + "\")");
    });
    const bat = String((g.specs || {}).Battery || "");
    if (bat && !/(mah|whr|\bhr\b|hour)/i.test(bat)) w.push("Battery spec has no mAh/hr unit (\"" + bat + "\")");
    return w;
  }
  function auditAll() {
    return GW.gadgets
      .map(g => ({ id: g.id, name: (GWApp && GWApp.fullName ? GWApp.fullName(g) : g.model), warnings: auditGadget(g) }))
      .filter(x => x.warnings.length);
  }

  /* ---------- export / import (catalog backup as JSON) ---------- */
  function exportJSON() {
    const payload = { exportedAt: new Date().toISOString(), categories: GW.categories, gadgets: GW.gadgets };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gadgetwise-catalog.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { return "File is not valid JSON."; }
    if (!data || !Array.isArray(data.gadgets)) return "No \"gadgets\" array found in the file.";
    const bad = data.gadgets.find(g => !g.id || !g.model);
    if (bad) return "Every gadget needs at least an id and a model.";
    const o = blank();
    o.gadgets = data.gadgets;
    if (Array.isArray(data.categories)) o.categories = data.categories;
    write(o); applyToData(o);
    return null;
  }
  function resetAll() { try { localStorage.removeItem(KEY); } catch (e) {} applyToData(read()); }

  function active() { const o = read(); return !!(o.gadgets.length || o.deletedGadgetIds.length || o.categories.length || o.deletedCategoryIds.length || Object.keys(o.reviewStatus).length || Object.keys(o.reviewEdits).length || o.deletedReviewIds.length || o.newReviews.length || Object.keys(o.issueStatus).length || o.deletedIssueIds.length || Object.keys(o.userStatus).length); }

  /* apply whatever is stored as soon as this script loads */
  applyToData(read());

  return {
    addGadget, editGadget, deleteGadget,
    addCategory, editCategory, deleteCategory,
    setReviewStatus, setReviewEdit, deleteReview, addReview,
    setIssueStatus, deleteIssue, setUserStatus,
    auditGadget, auditAll, normUnits,
    exportJSON, importJSON, resetAll, active, slugify, uid
  };
})();
