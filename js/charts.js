/* ============================================================
   GadgetWise — js/charts.js
   Admin report charts, built per the dataviz skill:
   - form follows the data's job (magnitude → bars; trend → line)
   - one hue for magnitude (cobalt), sequential steps, no rainbow
   - direct labels; recessive grid; one axis
   - tooltips on hover (line), per-mark hover on bars
   - every chart has a table view (data behind it is the same array)
   ============================================================ */

window.GWCharts = (function () {
  "use strict";
  const { esc } = GWApp;
  const fmt = n => n.toLocaleString("en-PH");

  /* ---------- horizontal magnitude bars (identity × magnitude) ---------- */
  function hbar(el, data, opts) {
    opts = opts || {};
    const max = Math.max(...data.map(d => d.value));
    el.innerHTML = `<div class="hbar-chart">${data.map(d => {
      const pct = Math.round((d.value / max) * 100);
      return `<div class="hbar" title="${esc(d.label)}: ${fmt(d.value)}">
        <span class="hb-label">${esc(d.label)}</span>
        <span class="hb-track"><span class="hb-fill" style="width:${pct}%"></span></span>
        <span class="hb-val">${fmt(d.value)}</span>
      </div>`;
    }).join("")}</div>`;
  }

  /* ---------- donut (composition; ≤6 slices, fixed hue order) ---------- */
  const SLICES = ["#5b45e6", "#8a7aec", "#b7adf3", "#ddd6fb", "#f4a340", "#18a7a0"];
  function donut(el, data) {
    const total = data.reduce((n, d) => n + d.value, 0);
    let a0 = 0;
    const segs = data.map((d, i) => {
      const a1 = a0 + (d.value / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const r = 15.915; // circumference = 100 trick
      const path = describeArc(42.5, 42.5, 36, a0, a1);
      a0 = a1;
      return `<path d="${path}" fill="${SLICES[i % SLICES.length]}" stroke="#fff" stroke-width="2"><title>${esc(d.label)}: ${d.value}%</title></path>`;
    }).join("");
    el.innerHTML = `
      <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap">
        <svg width="180" height="180" viewBox="0 0 100 100" role="img" aria-label="Category share chart">${segs}
          <text x="50" y="47" text-anchor="middle" style="font-family:var(--font-mono); font-size:9px; fill:var(--ink-3)">TOTAL</text>
          <text x="50" y="57" text-anchor="middle" style="font-family:var(--font-mono); font-size:11px; font-weight:600; fill:var(--ink)">100%</text>
        </svg>
        <div class="donut-legend" style="margin:0; flex-direction:column; align-items:flex-start">
          ${data.map((d, i) => `<span class="lg"><span class="sw" style="background:${SLICES[i % SLICES.length]}"></span>${esc(d.label)} <b>${d.value}%</b></span>`).join("")}
        </div>
      </div>`;
  }
  function polar(cx, cy, r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function describeArc(cx, cy, r, a0, a1) {
    const [x0, y0] = polar(cx, cy, r, a0 - Math.PI / 2);
    const [x1, y1] = polar(cx, cy, r, a1 - Math.PI / 2);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
  }

  /* ---------- line trend (change over time, single series) ---------- */
  function line(el, data, opts) {
    opts = opts || {};
    const W = 640, H = 220, PAD = { l: 44, r: 12, t: 14, b: 26 };
    const max = Math.max(...data.map(d => d.value)) * 1.1;
    const min = Math.min(...data.map(d => d.value)) * 0.85;
    const x = i => PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r);
    const y = v => H - PAD.b - ((v - min) / (max - min)) * (H - PAD.t - PAD.b);
    const pts = data.map((d, i) => [x(i), y(d.value)]);
    const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const gridY = [0, 0.25, 0.5, 0.75, 1].map(t => {
      const v = min + t * (max - min);
      return `<line class="grid-line" x1="${PAD.l}" x2="${W - PAD.r}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
        <text class="axis-text" x="${PAD.l - 6}" y="${(y(v) + 3).toFixed(1)}" text-anchor="end">${Math.round(v / 1000)}k</text>`;
    }).join("");
    const dots = pts.map((p, i) => `<circle class="dot" style="fill:var(--accent)" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" data-i="${i}"><title>${esc(data[i].week)}: ${fmt(data[i].value)} views</title></circle>`).join("");
    const labels = data.map((d, i) => (i % 2 === 0 ? `<text class="axis-text" x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(d.week)}</text>` : "")).join("");
    el.innerHTML = `
      <svg class="line-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Weekly page views trend">
        ${gridY}
        <path class="series" style="stroke:var(--accent)" d="${path}"/>
        ${dots}${labels}
      </svg>`;
  }

  /* ---------- table view toggle ---------- */
  function attachTableToggle(chartEl, tableHTML) {
    const wrap = chartEl.closest(".chart-block");
    if (!wrap) return;
    const btn = wrap.querySelector("[data-toggle-table]");
    if (!btn) return;
    let t = wrap.querySelector("[data-table-view]");
    if (!t) { t = document.createElement("div"); t.setAttribute("data-table-view", ""); wrap.appendChild(t); }
    let open = false;
    btn.addEventListener("click", () => {
      open = !open;
      t.innerHTML = open ? tableHTML : "";
      btn.textContent = open ? "Hide data table" : "View data table";
    });
  }
  function tableHTML(headers, rows) {
    return `<div class="table-wrap" data-table-view style="margin-top:14px"><table class="table" style="min-width:0">
      <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td class="mono">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  }

  return { hbar, donut, line, tableHTML, attachTableToggle };
})();
