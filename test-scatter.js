// Smoke test: header wiring + scatter math (no DOM needed for the math part)
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const html = fs.readFileSync(__dirname + "/index.html", "utf8");

// 1. Header markup sanity: new Cobalt-style header elements present, old ones gone
assert.ok(html.includes("hdrAvatar"), "header avatar present");
assert.ok(html.includes("hdrWlCount") && html.includes("hdrCmpCount"), "header counters present");
assert.ok(html.includes("topbar-search"), "header search present");
assert.ok(!html.includes("navUser"), "old nav-user container removed");
assert.ok(html.includes("goWishlist") && html.includes("doHeaderSearch"), "header handlers defined");
// nav buttons keep SPA routing
assert.ok(html.includes('data-nav="recommend" onclick="go(\'recommend\')"'), "nav routes via go()");
// scatter category tabs still wired
assert.ok(html.includes("scatterCats") && html.includes("setScatterCat"), "scatter category tabs present");

// 2. Script syntax + data/scatter math via vm
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
let src = blocks.join("\n");
const cut = src.indexOf("/* ═══════════ RECOMMEND QUIZ");
src = src.slice(0, cut) + "\n;({ G, CATS, ownIndex, frontier, byId });";
const sandbox = {
  document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  location: { search: "" },
  console,
};
vm.createContext(sandbox);
const { G, CATS, ownIndex, frontier, byId } = vm.runInContext(src, sandbox);

assert.strictEqual(G.length, 10, "10 gadgets");
const mac = ownIndex(byId(1));
assert.strictEqual(mac, Math.round(4.6/5*25 + 2.1/5*20 + Math.min(14.5/12,1)*20 + Math.min(12/24,1)*15 + 4.9/5*20), "formula parity");
for (const k of [null, ...Object.keys(CATS)]) {
  const items = k ? G.filter(g => g.cat === k) : G;
  const f = frontier(items.map(g => g.id));
  assert.ok(f.size >= 1, `frontier sane for ${k || "all"}`);
}

console.log("ALL HEADER+SCATTER CHECKS PASS");
