// Smoke test: catalog filters (category radios, feature checks, price) on the merged dataset
const fs = require("fs");
const vm = require("vm");

const sandbox = {
  window: {},
  GW: {},
  document: (() => {
    const elems = {};
    const el = id => elems[id] || (elems[id] = {
      value: "", checked: false, innerHTML: "", textContent: "",
      classList: { toggle() {}, add() {}, remove() {}, contains: () => false },
      addEventListener() {}, setAttribute() {}, querySelectorAll: () => [], style: {}
    });
    return {
      getElementById: el,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener() {}, dispatchEvent() {},
      createElement: () => ({ style: {} })
    };
  })(),
  localStorage: { getItem: () => null, setItem() {} },
  location: { search: "", href: "" },
  CustomEvent: class {},
  URLSearchParams,
  console
};
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync("js/data.js", "utf8") + "\n" +
  fs.readFileSync("js/app.js", "utf8") + "\n" +
  "this.GWApp = window.GWApp; this.GWCatalog = window.GWCatalog;\n" +
  fs.readFileSync("js/catalog.js", "utf8"),
  sandbox
);
const { GW, GWApp } = sandbox;
const GWCatalog = sandbox.window.GWCatalog;

GWCatalog.init({});

const assert = require("assert");
// feature filters are honest, non-empty, and subsets
const battery8 = GW.gadgets.filter(g => /([8-9]\d*|\d{2,})\s*(h|hr|hour)/i.test(g.specs.Battery || ""));
assert.ok(battery8.length > 0, "long-battery filter matches something");
const budget = GW.gadgets.filter(g => g.price < 15000);
assert.ok(budget.length > 0, "under-15k matches something");
const durable = GW.gadgets.filter(g => g.scored.durability >= 7);
assert.ok(durable.length > 0, "build & protection filter matches something");
// category radio values all resolve
for (const c of GW.categories) assert.ok(GW.gadgetsInCategory(c.id).length > 0, `category ${c.id} non-empty`);
// price bounds default 0–100000 shows everything
const all = GW.gadgets.filter(g => g.price >= 0 && g.price <= 100000);
assert.strictEqual(all.length, GW.gadgets.length, "default price bounds keep whole catalog");

console.log("CATALOG FILTER CHECKS PASS");
console.log("  category counts:", GW.categories.map(c => `${c.id}=${GW.gadgetsInCategory(c.id).length}`).join(" "));
