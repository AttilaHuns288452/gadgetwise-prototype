// Smoke test: recommendations wizard with category-first flow
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const html = fs.readFileSync(__dirname + "/recommendations.html", "utf8");

// Markup sanity
assert.ok(html.includes("What are you looking for?"), "step 1 question present");
assert.ok(html.includes("Heavy work, code, thesis builds"), "laptop subtitle present");
assert.ok(html.includes("Brownout and long-day insurance"), "powerbank subtitle present");
assert.ok(html.includes("catChoices"), "category choice grid present");
assert.ok(html.includes('data-step="5"'), "results is step 5");
const dataNexts = [...html.matchAll(/data-next="(\d)"/g)].map(m => +m[1]);
assert.ok(html.includes('data-next="4"') && html.includes('data-step="5"'), "wizard chains through step 4 to results (step 5)");

// Inline wizard script syntax
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
for (const b of blocks) new vm.Script(b); // throws on syntax error

// Engine: category-scoped recommend works end to end
const sandbox = { window: {}, GW: {}, console };
sandbox.document = {
  getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
  addEventListener() {}, dispatchEvent() {}, createElement: () => ({ style: {} })
};
sandbox.localStorage = { getItem: () => null, setItem() {} };
sandbox.location = { search: "", href: "" };
sandbox.CustomEvent = class {};
sandbox.URLSearchParams = URLSearchParams;
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync(__dirname + "/js/data.js", "utf8") + "\n" +
  fs.readFileSync(__dirname + "/js/app.js", "utf8") + "\n" +
  "this.GWApp = window.GWApp; this.GWRec = window.GWRec;\n" +
  fs.readFileSync(__dirname + "/js/recommendations.js", "utf8"),
  sandbox
);
const { GW, GWApp } = sandbox;
const GWRec = sandbox.window.GWRec;

const budget = GW.budgetBands[2]; // ₱20–40k
for (const cat of GW.categories) {
  const useCase = GW.useCases.find(u => u.categories.includes(cat.id)) || GW.useCases[0];
  const { results } = GWRec.recommend({ budget, useCase, priorities: {}, category: cat.id });
  assert.ok(results.length > 0, `${cat.id}: results non-empty`);
  for (const r of results) assert.strictEqual(r.gadget.category, cat.id, `${cat.id}: all results in category`);
  // scores descending
  for (let i = 1; i < results.length; i++) assert.ok(results[i - 1].score >= results[i].score, `${cat.id}: descending`);
}
console.log("RECOMMENDATIONS CATEGORY-FLOW CHECKS PASS");
console.log("  categories:", GW.categories.map(c => {
  const useCase = GW.useCases.find(u => u.categories.includes(c.id)) || GW.useCases[0];
  const { results } = GWRec.recommend({ budget, useCase, priorities: {}, category: c.id });
  return `${c.id}=${results.length}`;
}).join(" "));
