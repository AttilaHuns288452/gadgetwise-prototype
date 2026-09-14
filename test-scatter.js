// Smoke test: data + scatter math from index.html (no DOM needed).
// Runs the page script once with vm, in a context where the consts are reachable.
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const html = fs.readFileSync(__dirname + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
let src = blocks.join("\n");

// Cut before the recommend quiz (it touches DOM at load)
const cut = src.indexOf("/* ═══════════ RECOMMEND QUIZ");
src = src.slice(0, cut) + "\n;({ G, CATS, ownIndex, frontier, byId });";

const sandbox = {
  document: {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  location: { search: "" },
  console,
};
vm.createContext(sandbox);
const { G, CATS, ownIndex, frontier, byId } = vm.runInContext(src, sandbox);

assert.strictEqual(G.length, 10, "10 gadgets in catalog");

// ownIndex formula parity (MacBook Air M1: durab 4.6, repair 2.1, battery 14.5, warranty 12, rating 4.9)
const mac = ownIndex(byId(1));
const expected = Math.round(4.6/5*25 + 2.1/5*20 + Math.min(14.5/12,1)*20 + Math.min(12/24,1)*15 + 4.9/5*20);
assert.strictEqual(mac, expected, "ownIndex formula parity");
assert.ok(mac > 0 && mac <= 100, "ownIndex in range");

// frontier: non-empty subset
const f = frontier(G.map(g => g.id));
assert.ok(f.size >= 1 && f.size <= G.length, "frontier sane");

// per-category frontiers (used by the category-filtered scatter) — every category yields >=1
for (const k of Object.keys(CATS)) {
  const items = G.filter(g => g.cat === k);
  const ff = frontier(items.map(g => g.id));
  assert.ok(ff.size >= 1 && ff.size <= items.length, `frontier for ${k} sane`);
}
// single-item category edge: its frontier is itself
const solo = G.filter(g => g.cat === "powerbanks");
assert.strictEqual(frontier(solo.map(g => g.id)).size, 1, "single-item frontier = itself");

// Pareto property: nothing on the frontier is beaten on both axes by another member
for (const k of [null, ...Object.keys(CATS)]) {
  const items = k ? G.filter(g => g.cat === k) : G;
  const pts = items.map(g => ({ id: g.id, p: g.price, s: ownIndex(g) }));
  const f2 = frontier(items.map(g => g.id));
  for (const a of pts) {
    if (!f2.has(a.id)) continue;
    for (const b of pts) {
      if (b.id === a.id) continue;
      assert.ok(!(b.p <= a.p && b.s >= a.s && (b.p < a.p || b.s > a.s)),
        `frontier member ${a.id} must not be Pareto-beaten by ${b.id}`);
    }
  }
}

console.log("ALL SCATTER/DATA CHECKS PASS");
console.log("  gadgets:", G.length, "| MacBook index:", mac, "| all-frontier:", [...f].map(id => byId(id).model).join(", "));
