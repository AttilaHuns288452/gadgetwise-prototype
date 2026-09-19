// Smoke test: admin-store overlay (gadget CRUD, categories, review moderation,
// issue triage) applied over the mock dataset. Mirrors test-catalog.js sandbox.
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
      addEventListener() {}, setAttribute() {}, removeAttribute() {},
      querySelectorAll: () => [], querySelector: () => null, style: {}
    });
    return {
      getElementById: el,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener() {}, dispatchEvent() {},
      createElement: () => ({ style: {}, click() {}, remove() {}, setAttribute() {}, href: "", download: "" }),
      body: { appendChild() {} }
    };
  })(),
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  location: { search: "", href: "" },
  CustomEvent: class {},
  URLSearchParams,
  URL: { createObjectURL: () => "blob:x", revokeObjectURL() {} },
  Blob: class {},
  console
};
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync("js/data.js", "utf8") + "\n" +
  fs.readFileSync("js/app.js", "utf8") + "\n" +
  "this.GWApp = window.GWApp;\n" +
  fs.readFileSync("js/admin-store.js", "utf8"),
  sandbox
);
const { GW } = sandbox;
const Store = sandbox.window.GWStore;
const assert = require("assert");
const BASE_COUNT = GW.gadgets.length;

// --- gadget CRUD ---
const before = GW.gadgets.map(g => g.id);
Store.deleteGadget("jbl-synchros-e50bt");
assert.strictEqual(GW.gadgets.length, BASE_COUNT - 1, "delete removes gadget");
assert.ok(!GW.getGadget("jbl-synchros-e50bt"), "deleted gadget unreachable");
Store.addGadget({
  id: "test-widget-1", brand: "Test", model: "Widget 1", category: "headphones",
  price: 100, rating: 0, reviewCount: 0, specs: {}, specList: [], image: "x.svg",
  value: { warrantyYears: 1, lifespanYears: 3, repairabilityLabel: "m" },
  scored: {}, reviews: [], issues: []
});
assert.strictEqual(GW.gadgets.length, BASE_COUNT, "add restores count");
assert.ok(GW.getGadget("test-widget-1"), "new gadget reachable");
Store.editGadget("test-widget-1", { price: 250, specs: { Memory: "16 gb ram" } });
const edited = GW.getGadget("test-widget-1");
assert.strictEqual(edited.price, 250, "edit updates price");
assert.strictEqual(edited.specs.Memory, "16GB ram", "unit normalizer applied on save path");

// --- category guard + CRUD ---
Store.addCategory({ id: "cameras", name: "Cameras", blurb: "test", file: "ph-camera" });
assert.ok(GW.getCategory("cameras"), "new category reachable");
Store.editCategory("cameras", { name: "Cameras & Drones" });
assert.strictEqual(GW.getCategory("cameras").name, "Cameras & Drones", "category rename");
Store.deleteCategory("cameras");
assert.ok(!GW.getCategory("cameras"), "category deleted");

// --- review moderation: approve -> public + rating recompute ---
const mac = GW.getGadget("apple-macbook-air-m1");
const pr3 = GW.pendingReviews.find(r => r.id === "pr3"); // targets the MacBook
Store.setReviewStatus("pr3", "approved", "apple-macbook-air-m1");
assert.ok(mac.reviews.some(r => r.id === "pr3"), "approved queue review published to gadget");
const expectedAvg = Math.round(((4 + 5 + 5 + 4) / 4) * 10) / 10; // pr3(4) + the three seed reviews
assert.strictEqual(mac.rating, expectedAvg, "rating recomputed with approved review");
// reject an embedded review -> hidden, rating recomputed
const r1 = mac.reviews.find(r => r.id === "r-apple-macbook-air-m1-1");
Store.setReviewStatus("r-apple-macbook-air-m1-1", "rejected", "apple-macbook-air-m1");
assert.strictEqual(r1.status, "rejected", "embedded review rejected");
// edit review
Store.setReviewEdit("pr3", "edited text", 3, "apple-macbook-air-m1");
const pub = mac.reviews.find(r => r.id === "pr3");
assert.strictEqual(pub.text, "edited text", "edit reaches published copy");
assert.strictEqual(pub.rating, 3, "edit reaches published rating");
// delete review -> gone from both lists, metrics refresh
Store.deleteReview("pr3");
assert.ok(!mac.reviews.some(r => r.id === "pr3"), "deleted review removed from gadget");
assert.ok(!GW.pendingReviews.some(r => r.id === "pr3"), "deleted review removed from queue");

// --- metrics stay consistent ---
assert.strictEqual(GW.adminMetrics.totalGadgets, GW.gadgets.length, "metrics track gadgets");
assert.strictEqual(GW.adminMetrics.pendingReviews, GW.pendingReviews.filter(r => r.status === "pending").length, "pending count accurate");

// --- unit normalizer (save path) ---
assert.deepStrictEqual(Store.normUnits("8 gb ram / 256 gb"), "8GB ram / 256GB", "normUnits fixes case+spacing");

console.log("ADMIN STORE CHECKS PASS");
console.log("  gadget CRUD, category CRUD, moderation publish, rating recompute");
