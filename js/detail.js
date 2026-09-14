/* ============================================================
   GadgetWise — js/detail.js
   Gadget detail page: overview, specs, value analysis,
   ownership cost, reviews, reported issues, actions.
   ============================================================ */

window.GWDetail = (function () {
  "use strict";
  const { esc, money, icon, stars } = GWApp;

  function ratingBars(g) {
    // Derive a stable star distribution from the rating (mock data basis)
    const r = g.rating;
    const w = { 5: Math.round((r - 3) * 38), 4: 30, 3: 16, 2: 8, 1: 6 };
    w[5] = Math.max(4, Math.min(72, w[5]));
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    const rows = [5, 4, 3, 2, 1].map(n => {
      const pct = Math.round((w[n] / total) * 100);
      return `<div class="rb"><span>${n}★</span><span class="track"><span class="fill" style="width:${pct}%"></span></span><span>${pct}%</span></div>`;
    });
    return rows.join("");
  }

  function reviewHTML(rv) {
    const initials = rv.user.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
    return `
      <article class="review">
        <span class="avatar">${esc(initials)}</span>
        <div>
          <div class="review-head">
            <span class="name">${esc(rv.user)}</span>
            ${stars(rv.rating)}
            <span class="date">${new Date(rv.date).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}</span>
          </div>
          <div class="review-ctx">${esc(rv.context)}</div>
          <p class="review-text">${esc(rv.text)}</p>
        </div>
      </article>`;
  }

  function init() {
    const id = GWApp.params().get("id") || "novatek-spark-5g";
    const g = GW.getGadget(id);
    const stage = document.getElementById("detailStage");
    if (!g) {
      stage.innerHTML = GWApp.emptyState("box", "Gadget not found",
        "This gadget may have been removed from the catalog.",
        `<a class="btn" href="gadgets.html">Browse the catalog ${icon("arrowRight")}</a>`);
      return;
    }
    const cat = GW.getCategory(g.category);
    const monthly = GW.monthlyCost(g);
    document.title = `${g.brand} ${g.model} — GadgetWise`;

    // ---- media + title + tag
    stage.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a><span class="sep">/</span>
        <a href="gadgets.html">Gadgets</a><span class="sep">/</span>
        <a href="category.html?cat=${g.category}">${esc(cat.name)}</a><span class="sep">/</span>
        <span>${esc(g.model)}</span>
      </nav>

      <div class="detail-grid" style="margin-top:22px">
        <div class="detail-media">
          <img src="${g.image}" alt="Placeholder artwork for ${esc(g.brand)} ${esc(g.model)}">
          <div class="detail-actions">
            <button class="btn btn-outline" data-wl="${g.id}" aria-pressed="${GWApp.inWishlist(g.id)}">${icon("heart")}<span class="wl-label">${GWApp.inWishlist(g.id) ? "Saved" : "Add to Wishlist"}</span></button>
            <button class="btn btn-outline" data-cmp-btn="${g.id}">${icon("scale")} <span class="cmp-label">${GWApp.inCompare(g.id) ? "In Compare" : "Add to Compare"}</span></button>
            <button class="btn" data-review-btn>${icon("message")} Write Review</button>
          </div>
          <div class="small muted" style="padding:10px 16px 14px; border-top:1px solid var(--line)">
            Placeholder artwork — replace with real product photography in production.
          </div>
        </div>

        <div>
          <div class="detail-title-row">
            <div>
              <div class="g-brand">${esc(g.brand)} · ${esc(cat.name)} · ${g.releaseYear}</div>
              <h1 style="font-size:clamp(1.6rem,2.6vw,2.2rem); margin-top:4px">${esc(g.model)}</h1>
              <p class="lede" style="margin:10px 0 12px">${esc(g.tagline)}. ${esc(g.summary)}</p>
              ${GWApp.ratingLine(g)}
            </div>
            <div class="detail-price-block">
              ${GWApp.priceBlock(g, "lg")}
              <div class="small muted" style="margin-top:6px; max-width:24ch">Estimated from price ÷ lifespan. Not a selling price.</div>
            </div>
          </div>

          <!-- The signature value tag -->
          <div class="value-tag" aria-label="Ownership value summary">
            <div class="vt-head">
              <span class="vt-name">Ownership value tag</span>
              <span class="tag tag-accent">${esc(cat.name)}</span>
            </div>
            <div class="vt-rows">
              <div class="vt-row"><span>Price</span><b>${money(g.price)}</b></div>
              <div class="vt-row"><span>Estimated lifespan</span><b>${g.value.lifespanYears} years</b></div>
              <div class="vt-row"><span>Warranty</span><b>${g.value.warrantyYears} ${g.value.warrantyYears === 1 ? "year" : "years"}</b></div>
              <div class="vt-row"><span>Repairability</span><b>${esc(g.value.repairabilityLabel)}</b></div>
            </div>
            <div class="vt-total">
              <span class="t-label">ESTIMATED MONTHLY OWNERSHIP</span>
              <span class="t-value">${money(monthly)}<span style="font-size:.85rem; color:var(--ink-3)"> /month</span></span>
            </div>
            <div class="vt-note">Estimate only. Price ÷ (lifespan × 12). Actual costs vary with care and usage.</div>
          </div>

          <details class="tag-flip" open>
            <summary>How this estimate is calculated <span class="chev">${icon("chevDown")}</span></summary>
            <div class="tf-body">
              <div class="formula-box">
                <span class="f-line">Estimated Monthly Ownership Cost =</span>
                <span class="f-line">Product Price ÷ (Estimated Lifespan × 12)</span>
                <span class="f-line"><b>${money(g.price)}</b> ÷ (<b>${g.value.lifespanYears}</b> × 12) =</span>
                <span class="f-result">≈ ${money(monthly)} per month</span>
              </div>
              <p class="small muted" style="margin:12px 0 0">
                A single transparent formula — the same one used across every gadget, so numbers can be compared fairly.
                The production system may extend this with electricity, insurance, or repair-cost data.
              </p>
            </div>
          </details>

          <div class="row" style="gap:8px; margin-top:16px; flex-wrap:wrap">
            ${g.strengths.map(s => `<span class="tag tag-green">${icon("check", "icon-sm")}${esc(s)}</span>`).join("")}
            ${g.weaknesses.map(w => `<span class="tag tag-red">${esc(w)}</span>`).join("")}
          </div>

          ${g.goodFor || g.notIdeal ? `
          <div class="grid-2" style="margin-top:18px; gap:14px">
            ${g.goodFor ? `<div class="panel" style="padding:14px 18px"><h4 style="margin:0 0 8px">Good for</h4><ul class="swlist">${g.goodFor.map(s => `<li class="good">${esc(s)}</li>`).join("")}</ul></div>` : ""}
            ${g.notIdeal ? `<div class="panel" style="padding:14px 18px"><h4 style="margin:0 0 8px">Not ideal for</h4><ul class="swlist">${g.notIdeal.map(s => `<li class="bad">${esc(s)}</li>`).join("")}</ul></div>` : ""}
          </div>` : ""}

          ${g.specList ? `
          <details class="tag-flip" style="margin-top:18px">
            <summary>Specifications <span class="chev">${icon("chevDown")}</span></summary>
            <div class="tf-body"><ul class="spec-list" style="margin:0">${g.specList.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
          </details>` : ""}

          ${g.durab != null ? `
          <div class="panel" style="margin-top:18px; padding:14px 18px">
            <h4 style="margin:0 0 10px">Ownership scores</h4>
            <div class="grid-3" style="gap:12px">
              ${[["Durability", g.durab], ["Repairability", g.repair], ["Battery", Math.min(g.battery / 12 * 5, 5)]].map(([l, v]) => `
                <div><div class="row-between" style="font-size:.85rem; margin-bottom:4px"><span>${l}</span><b class="mono">${v.toFixed(1)}</b></div><span class="meter" style="display:block"><span class="track"><span class="fill" style="width:${v / 5 * 100}%"></span></span></span></div>`).join("")}
              <div class="small muted" style="grid-column:1/-1">Warranty: ${g.value.warrantyYears} year${g.value.warrantyYears === 1 ? "" : "s"} · Scores are mock data on a 1–5 scale.</div>
            </div>
          </div>` : ""}

          ${g.issue && g.issue !== "None reported yet" ? `
          <div class="issue-callout" style="margin-top:18px; background:var(--gold-soft); border:1px solid var(--line-2); border-radius:var(--r-sm); padding:10px 14px; font-size:.9rem; color:var(--gold)"><b>Common issue:</b> ${esc(g.issue)}</div>` : ""}
        </div>
      </div>

      <!-- Tabs -->
      <div class="section-tight" style="margin-top:36px">
        <div class="tabs" role="tablist" aria-label="Gadget information">
          <button class="tab-btn active" role="tab" aria-selected="true" data-tab="specs">Specifications</button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="value">Value Analysis</button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="ownership">Ownership Cost</button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="reviews">Reviews (${g.reviews.length})</button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="issues">Reported Issues (${g.issues.length})</button>
        </div>

        <div class="tab-panel" data-panel="specs" role="tabpanel">
          <div class="panel" style="padding:8px 24px">
            <table class="spec-table">
              ${Object.entries(g.specs).map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
            </table>
          </div>
        </div>

        <div class="tab-panel" data-panel="value" role="tabpanel" hidden>
          <div class="grid-2">
            <div class="panel">
              <h3 style="margin-bottom:16px">Value analysis</h3>
              <div class="value-list">
                ${GWApp.valueRow("Durability", meterHTML(g.scored.durability))}
                ${GWApp.valueRow("Warranty", `<b class="mono">${g.value.warrantyYears} yr${g.value.warrantyYears === 1 ? "" : "s"}</b>`)}
                ${GWApp.valueRow("Est. lifespan", `<b class="mono">${g.value.lifespanYears} yrs</b>`)}
                ${GWApp.valueRow("Repairability", meterHTML(g.scored.repairability))}
                ${GWApp.valueRow("Ownership value", meterHTML(ownershipScore(g)))}
              </div>
              <p class="small muted" style="margin-top:14px">Scores are 0–10 ratings from mock expert assessment, normalized against ${cat.name.toLowerCase()} in this catalog.</p>
            </div>
            <div class="panel">
              <h3 style="margin-bottom:16px">Category context</h3>
              ${contextHTML(g)}
            </div>
  <div class="panel" style="margin-top:24px">
              <h4 style="margin-bottom:8px">Why these numbers?</h4>
              <p class="small muted" style="margin:0">
                Durability, repairability, and lifespan estimates combine published specs with community feedback in the
                production design. In this prototype they are mock values — clearly labeled, consistently applied, and
                comparable across every gadget.
              </p>
            </div>
          </div>
        </div>

        <div class="tab-panel" data-panel="ownership" role="tabpanel" hidden>
          <div class="grid-2">
            <div class="panel">
              <h3 style="margin-bottom:14px">Estimated ownership cost</h3>
              <div class="formula-box">
                <span class="f-line"><b>Price</b> ÷ (Lifespan × 12)</span>
                <span class="f-line">${money(g.price)} ÷ (${g.value.lifespanYears} × 12)</span>
                <span class="f-result">≈ ${money(monthly)} / month</span>
              </div>
              <table class="spec-table" style="margin-top:16px">
                <tr><th>Over 1 year</th><td class="mono">${money(monthly * 12)}</td></tr>
                <tr><th>Over full lifespan</th><td class="mono">${money(monthly * 12 * g.value.lifespanYears)}</td></tr>
                <tr><th>Warranty coverage</th><td>${g.value.warrantyYears} yr${g.value.warrantyYears === 1 ? "" : "s"} — ${Math.round((g.value.warrantyYears / g.value.lifespanYears) * 100)}% of lifespan</td></tr>
              </table>
            </div>
            <div class="panel">
              <h3 style="margin-bottom:14px">Against its category</h3>
              ${contextHTML(g)}
            </div>
          </div>
        </div>

        <div class="tab-panel" data-panel="reviews" role="tabpanel" hidden>
          <div class="panel">
            <div class="rating-summary" style="margin-bottom:8px">
              <div>
                <div class="big">${g.rating.toFixed(1)}</div>
                ${stars(g.rating)}
                <div class="small muted">${g.reviewCount} student reviews · mock data</div>
              </div>
              <div class="rating-bars">${ratingBars(g)}</div>
            </div>
            <hr class="divider">
            <div>${g.reviews.map(reviewHTML).join("")}</div>
            <div class="row-between" style="margin-top:18px">
              <button class="btn btn-outline" data-review-btn>${icon("message")} Write a review</button>
              <span class="small muted">Showing ${g.reviews.length} of ${g.reviewCount} — rest hidden in prototype</span>
            </div>
          </div>
        </div>

        <div class="tab-panel" data-panel="issues" role="tabpanel" hidden>
          <div class="panel">
            ${g.issues.length ? `
              <p class="small muted" style="margin-top:0">Problems students reported to the community. Severity is editorial (mock).</p>
              ${g.issues.map(i => `
                <div class="issue-item">
                  <span class="sev sev-${esc(i.severity)}" title="${esc(i.severity)}"></span>
                  <div>
                    <div class="i-title">${esc(i.title)}</div>
                    <div class="i-meta">Reported by ${esc(i.reportedBy)} · ${new Date(i.date).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })} · <span class="tag tag-warn" style="font-size:.68rem">${esc(i.status)}</span></div>
                  </div>
                </div>`).join("")}`
            : GWApp.emptyState("checkCircle", "No reported issues", "No problems have been reported for this gadget yet in the mock dataset.")}
            <p class="small muted" style="margin-bottom:0">Found a problem? <a href="#" data-issue-btn>Report an issue</a> — reviewed by moderators before appearing here.</p>
          </div>
        </div>
      </div>`;

    // ---- tab behavior
    stage.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        stage.querySelectorAll(".tab-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        stage.querySelectorAll(".tab-panel").forEach(p => { p.hidden = p.getAttribute("data-panel") !== btn.getAttribute("data-tab"); });
      });
    });

    // ---- compare button
    const cmpBtn = stage.querySelector("[data-cmp-btn]");
    cmpBtn.addEventListener("click", () => {
      if (!GWApp.inCompare(g.id) && GWApp.state.compareFull) {
        GWApp.toast("Compare holds 4 gadgets — remove one first", "scale");
        return;
      }
      GWApp.toggleCompare(g.id, !GWApp.inCompare(g.id));
      const on = GWApp.inCompare(g.id);
      cmpBtn.querySelector(".cmp-label").textContent = on ? "In Compare" : "Add to Compare";
      document.addEventListener("gw:compare-change", function h() {
        document.removeEventListener("gw:compare-change", h);
        cmpBtn.querySelector(".cmp-label").textContent = GWApp.inCompare(g.id) ? "In Compare" : "Add to Compare";
      });
    });

    // ---- write review modal
    stage.querySelectorAll("[data-review-btn]").forEach(btn =>
      btn.addEventListener("click", () => openReviewModal(g)));
    stage.querySelectorAll("[data-issue-btn]").forEach(btn =>
      btn.addEventListener("click", e => { e.preventDefault(); openIssueModal(g); }));

    // ---- similar gadgets
    const similar = GW.gadgetsInCategory(g.category).filter(x => x.id !== g.id).slice(0, 3);
    const similarBox = document.getElementById("similarGrid");
    if (similarBox) similarBox.innerHTML = similar.map(s => GWApp.productCard(s)).join("");
  }

  function meterHTML(v) {
    return `<span class="meter" style="flex:1"><span class="track"><span class="fill" style="width:${v * 10}%"></span></span><span class="val">${v.toFixed(1)}/10</span></span>`;
  }
  function ownershipScore(g) {
    const pool = GW.gadgetsInCategory(g.category).map(GW.monthlyCost);
    const min = Math.min(...pool), max = Math.max(...pool);
    return max === min ? 7.5 : +(10 - 10 * (GW.monthlyCost(g) - min) / (max - min)).toFixed(1);
  }
  function contextHTML(g) {
    const list = GW.gadgetsInCategory(g.category).map(x => ({
      g: x, m: GW.monthlyCost(x)
    })).sort((a, b) => a.m - b.m);
    const rows = list.map(x => `
      <div class="meter" style="margin-bottom:10px">
        <span style="width:150px; font-size:.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${esc(x.g.brand)} ${esc(x.g.model)}</span>
        <span class="track"><span class="fill" style="width:${Math.round(100 - 100 * (x.m - list[0].m) / (list[list.length - 1].m - list[0].m || 1))}%"></span></span>
        <span class="val">${money(x.m)}</span>
      </div>`).join("");
    return `
      <p class="small muted" style="margin-top:0">Estimated monthly ownership among ${GWApp.catLabel(g.category).toLowerCase()} in the prototype catalog:</p>
      ${rows}
      <p class="small muted" style="margin-bottom:0">Lower bar = cheaper to own per month.</p>`;
  }

  function openReviewModal(g) {
    const ov = GWApp.openModal(`
      <h3>Write a review</h3>
      <p class="modal-sub">Prototype form — submission is simulated and goes to the moderation queue.</p>
      <div class="field"><label for="rvRating">Rating</label>
        <select id="rvRating"><option value="5">★★★★★ Excellent</option><option value="4" selected>★★★★ Good</option><option value="3">★★★ Fair</option><option value="2">★★ Poor</option><option value="1">★ Poor</option></select>
      </div>
      <div class="field"><label for="rvContext">Usage context <span class="hint">(optional)</span></label>
        <input id="rvContext" type="text" placeholder="e.g., Programming + online classes · 8 months">
      </div>
      <div class="field"><label for="rvText">Your review</label>
        <textarea id="rvText" placeholder="How has it held up for schoolwork? Battery? Durability?"></textarea>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline" data-close>Cancel</button>
        <button class="btn" data-submit>Submit for moderation</button>
      </div>`);
    ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
    ov.querySelector("[data-submit]").addEventListener("click", () => {
      const text = ov.querySelector("#rvText").value.trim();
      if (text.length < 10) { GWApp.toast("Please write at least 10 characters", "alert"); return; }
      GWApp.closeModal();
      GWApp.toast("Review submitted — pending moderation (simulated)", "checkCircle");
    });
  }

  function openIssueModal(g) {
    const ov = GWApp.openModal(`
      <h3>Report an issue</h3>
      <p class="modal-sub">Prototype form — reports enter the admin moderation queue (simulated).</p>
      <div class="field"><label for="isTitle">Issue</label>
        <input id="isTitle" type="text" placeholder="Short summary of the problem">
      </div>
      <div class="field"><label for="isSev">Severity</label>
        <select id="isSev"><option>Minor</option><option selected>Moderate</option><option>Major</option></select>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline" data-close>Cancel</button>
        <button class="btn" data-submit>Submit report</button>
      </div>`);
    ov.querySelector("[data-close]").addEventListener("click", GWApp.closeModal);
    ov.querySelector("[data-submit]").addEventListener("click", () => {
      const t = ov.querySelector("#isTitle").value.trim();
      if (t.length < 5) { GWApp.toast("Please describe the issue briefly", "alert"); return; }
      GWApp.closeModal();
      GWApp.toast("Issue reported — pending moderation (simulated)", "checkCircle");
    });
  }

  return { init };
})();
