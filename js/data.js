/* ============================================================
   GadgetWise — mock dataset (CC 116 prototype)
   All product records are fictional, created for this prototype.
   None of the brands, models, reviews, users, or figures are
   real-world verified data. Prices are realistic PHP samples.
   ============================================================ */

window.GW = window.GW || {};

/* ---------- Categories ---------- */
GW.categories = [
  { id: "smartphones", name: "Smartphones",   blurb: "Everyday drivers, campus workhorses, and camera-first picks.", file: "ph-smartphone" },
  { id: "laptops",     name: "Laptops",       blurb: "From note-taking ultrabooks to programming and editing rigs.", file: "ph-laptop" },
  { id: "tablets",     name: "Tablets",       blurb: "Light readers, note-takers, and portable media screens.",   file: "ph-tablet" },
  { id: "headphones",  name: "Headphones",    blurb: "Focus on lectures, commutes, and late-night study.",        file: "ph-headphones" },
  { id: "powerbanks",  name: "Power Banks",   blurb: "Outlast brownouts, long commutes, and full class days.",    file: "ph-powerbank" },
  { id: "smartwatches",name: "Smartwatches",  blurb: "Trackers and watchfaces that survive a student schedule.",  file: "ph-watch" }
];

/* ---------- Scored factors (0–10 each; used by the recommendation engine) ----------
   performance, battery, durability, portability, display, camera, storage,
   repairability  — normalized so every factor can be combined fairly.      */
/* ponytail: the catalog IS the 10 real products below (GW.realGadgetEntries).
   The alias assignment happens after the array literal so both names point at
   one array. Swap back to a literal array here if mock data ever returns. */

/* ============================================================
   Real-product catalog — ported from the fac3629 prototype.
   Real brands and Wikimedia Commons photos; specs, prices and
   scores remain illustrative demo data.
   ============================================================ */
const WISH_IMGS = {"laptop1":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MacBook_Air_M1.png/960px-MacBook_Air_M1.png","laptop2":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Acer_Aspire_A515-51.jpg/960px-Acer_Aspire_A515-51.jpg","laptop3":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Asus_Vivobook_15.jpg/960px-Asus_Vivobook_15.jpg","tablet1":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/IPad_9th_Generation_2024.jpg/960px-IPad_9th_Generation_2024.jpg","tablet2":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Xiaomi_Pad_7.jpg/960px-Xiaomi_Pad_7.jpg","phone1":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Redmi_Note_11_front.jpg/960px-Redmi_Note_11_front.jpg","phone2":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Back_of_the_Samsung_Galaxy_S23.jpg/960px-Back_of_the_Samsung_Galaxy_S23.jpg","head1":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/JBL_Synchros_E50BT.jpg/960px-JBL_Synchros_E50BT.jpg","power1":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Anker_power_bank_lit.jpg/960px-Anker_power_bank_lit.jpg","watch1":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Amazfit_Bip_Inside.jpg/960px-Amazfit_Bip_Inside.jpg"};

GW.realGadgetEntries = [
 {
  id:  "apple-macbook-air-m1",
  brand:  "Apple",
  model:  "MacBook Air M1",
  category:  "laptops",
  price:  46999,
  rating:  4.9,
  reviewCount:  180,
  releaseYear:  2020,
  status:  "published",
  tagline:  "The laptop students keep past graduation",
  summary:  "Silent, fanless, and 14–15 hours of real battery. Base storage and out-of-warranty repairs are the trade-offs.",
  image:  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MacBook_Air_M1.png/960px-MacBook_Air_M1.png",
  specs:  {
   Chipset:  "Apple M1 8-core CPU",
   Memory:  "8GB unified · 256GB SSD",
   Display:  "13.3-inch Retina 2560×1600",
   Battery:  "Real-world battery 14–15 hr · 30W USB-C",
   Weight:  "1.29 kg, fanless"
  },
  specList:  [
   "Apple M1 8-core CPU",
   "8GB unified · 256GB SSD",
   "13.3-inch Retina 2560×1600",
   "Real-world battery 14–15 hr · 30W USB-C",
   "1.29 kg, fanless"
  ],
  scored:  {
   performance:  8.5,
   battery:  10,
   durability:  8.8,
   portability:  9.2,
   display:  9.2,
   camera:  7.2,
   storage:  5.5,
   repairability:  3.5
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  5,
   repairabilityLabel:  "Hard — authorized service only"
  },
  strengths:  [
   "14–15 hr real-world battery",
   "Silent, fanless operation",
   "Best-in-class trackpad and speakers"
  ],
  weaknesses:  [
   "256GB base storage fills fast",
   "RAM is not upgradeable",
   "Expensive out-of-warranty repairs"
  ],
  goodFor:  [
   "Programming and thesis builds",
   "Research and writing",
   "All-day classes away from outlets"
  ],
  notIdeal:  [
   "Tight budgets",
   "Students who upgrade parts later"
  ],
  cx:  {
   perf:  85,
   display:  92,
   battery:  100,
   portability:  92,
   durab:  88,
   repair:  35,
   camera:  72,
   storage:  55
  },
  battery:  14.5,
  durab:  4.6,
  repair:  2.1,
  raters:  180,
  pop:  88,
  issue:  "256GB base storage fills fast",
  uses:  {
   programming:  3,
   design:  3,
   classes:  3,
   research:  3,
   gaming:  1,
   video:  2
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-apple-macbook-air-m1-1",
    user:  "Kai M.",
    rating:  5,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "Left the charger at home all week. Still on 30% by Saturday review sessions. The battery alone is worth it."
   },
   {
    id:  "r-apple-macbook-air-m1-2",
    user:  "Rina P.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Compiles our thesis Android app in seconds. Speakers embarrass laptops twice the price."
   },
   {
    id:  "r-apple-macbook-air-m1-3",
    user:  "Doms L.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "One dent after a backpack drop. Screen replacement quote was ₱18k — insure this one."
   }
  ],
  issues:  [
   {
    id:  "i-apple-macbook-air-m1",
    title:  "256GB base storage fills fast",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "acer-aspire-5-a515",
  brand:  "Acer",
  model:  "Acer Aspire 5 A515",
  category:  "laptops",
  price:  28999,
  rating:  4.3,
  reviewCount:  240,
  releaseYear:  2023,
  status:  "published",
  tagline:  "The budget workhorse you can fix yourself",
  summary:  "Standard parts, user-upgradeable RAM and SSD, strong performance per peso. The chassis and display show the price.",
  image:  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Acer_Aspire_A515-51.jpg/960px-Acer_Aspire_A515-51.jpg",
  specs:  {
   Chipset:  "AMD Ryzen 5 7520U",
   Memory:  "16GB RAM · 512GB SSD",
   Display:  "15.6-inch IPS FHD",
   Battery:  "Battery 9 hr claimed · 65W USB-C",
   Weight:  "1.78 kg"
  },
  specList:  [
   "AMD Ryzen 5 7520U",
   "16GB RAM · 512GB SSD",
   "15.6-inch IPS FHD",
   "Battery 9 hr claimed · 65W USB-C",
   "1.78 kg"
  ],
  scored:  {
   performance:  7.2,
   battery:  6,
   durability:  7,
   portability:  5.5,
   display:  6.5,
   camera:  5,
   storage:  7,
   repairability:  8.8
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  4,
   repairabilityLabel:  "Easy — standard parts, cheap fixes"
  },
  strengths:  [
   "Standard parts — cheap, available fixes",
   "RAM and SSD are user-upgradeable",
   "Strong performance per peso"
  ],
  weaknesses:  [
   "Plastic chassis flexes under torsion",
   "Display is dim for outdoor use"
  ],
  goodFor:  [
   "Programming on a budget",
   "Documents and presentations",
   "Students who repair instead of replace"
  ],
  notIdeal:  [
   "Design and color-critical work",
   "Daily long carries"
  ],
  cx:  {
   perf:  72,
   display:  65,
   battery:  60,
   portability:  55,
   durab:  70,
   repair:  88,
   camera:  50,
   storage:  70
  },
  battery:  7.5,
  durab:  3.8,
  repair:  4.2,
  raters:  240,
  pop:  85,
  issue:  "Early batches had a rattly trackpad",
  uses:  {
   programming:  3,
   design:  1,
   classes:  3,
   research:  3,
   gaming:  2,
   video:  1
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-acer-aspire-5-a515-1",
    user:  "JC R.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Handles docs, Zoom, VS Code and light Blender. Keyboard flex is the only gripe."
   },
   {
    id:  "r-acer-aspire-5-a515-2",
    user:  "Mai S.",
    rating:  5,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Upgraded the SSD myself in 15 minutes. Every part is a standard size — repairs are cheap here."
   },
   {
    id:  "r-acer-aspire-5-a515-3",
    user:  "Fons M.",
    rating:  4,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "Charger brick is small, fits the same pouch as my power bank."
   }
  ],
  issues:  [
   {
    id:  "i-acer-aspire-5-a515",
    title:  "Early batches had a rattly trackpad",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "asus-vivobook-15",
  brand:  "ASUS",
  model:  "ASUS Vivobook 15",
  category:  "laptops",
  price:  32999,
  rating:  4.4,
  reviewCount:  160,
  releaseYear:  2023,
  status:  "published",
  tagline:  "Two-year warranty, OLED, no upgrade tax",
  summary:  "The longest laptop warranty here plus an OLED panel for design work. Fan noise and battery life are the trade.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Asus_Vivobook_15.jpg/960px-Asus_Vivobook_15.jpg",
  specs:  {
   Chipset:  "Intel Core i5-1335U",
   Memory:  "16GB RAM · 512GB SSD",
   Display:  "15.6-inch OLED option",
   Battery:  "Battery 7 hr · 65W USB-C",
   Weight:  "1.7 kg"
  },
  specList:  [
   "Intel Core i5-1335U",
   "16GB RAM · 512GB SSD",
   "15.6-inch OLED option",
   "Battery 7 hr · 65W USB-C",
   "1.7 kg"
  ],
  scored:  {
   performance:  7.8,
   battery:  5.2,
   durability:  8.2,
   portability:  6.2,
   display:  8.8,
   camera:  5.5,
   storage:  7,
   repairability:  8
  },
  value:  {
   warrantyYears:  2,
   lifespanYears:  4,
   repairabilityLabel:  "Easy — standard parts, cheap fixes"
  },
  strengths:  [
   "Two-year warranty — longest of the laptops",
   "OLED panel for design work",
   "16GB RAM out of the box"
  ],
  weaknesses:  [
   "Fan spins up under sustained compiles",
   "Battery trails the class average"
  ],
  goodFor:  [
   "Design and multimedia coursework",
   "Programming with longer warranty cover",
   "Presentations on external displays"
  ],
  notIdeal:  [
   "All-day off-charger use",
   "Quiet environments like libraries"
  ],
  cx:  {
   perf:  78,
   display:  88,
   battery:  52,
   portability:  62,
   durab:  82,
   repair:  80,
   camera:  55,
   storage:  70
  },
  battery:  7,
  durab:  4.4,
  repair:  4.3,
  raters:  160,
  pop:  74,
  issue:  "Fan spins up under sustained load",
  uses:  {
   programming:  3,
   design:  2,
   classes:  3,
   research:  2,
   gaming:  2,
   video:  2
  },
  warranty:  24,
  reviews:  [
   {
    id:  "r-asus-vivobook-15-1",
    user:  "Bea T.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "The OLED makes Figma layouts pop. 16GB out of the box means no upgrade tax."
   },
   {
    id:  "r-asus-vivobook-15-2",
    user:  "Ogie W.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Fan gets chatty on long compiles but never thermal-throttled on me."
   },
   {
    id:  "r-asus-vivobook-15-3",
    user:  "Shai G.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Two-year warranty sealed it for me. Service center fixed a hinge in 3 days."
   }
  ],
  issues:  [
   {
    id:  "i-asus-vivobook-15",
    title:  "Fan spins up under sustained load",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "apple-ipad-9",
  brand:  "Apple",
  model:  "iPad 9th Generation",
  category:  "tablets",
  price:  19499,
  rating:  4.7,
  reviewCount:  210,
  releaseYear:  2021,
  status:  "published",
  tagline:  "Cheapest real entry into the Pencil workflow",
  summary:  "Long software support, strong resale, paperless note-taking on a budget. Base storage is tight and extras cost more.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/IPad_9th_Generation_2024.jpg/960px-IPad_9th_Generation_2024.jpg",
  specs:  {
   Chipset:  "A13 Bionic chip",
   Storage:  "64GB · Wi-Fi",
   Display:  "10.2-inch Retina",
   Battery:  "Battery 9–10 hr video",
   Extras:  "Apple Pencil (1st gen) supported"
  },
  specList:  [
   "A13 Bionic chip",
   "64GB · Wi-Fi",
   "10.2-inch Retina",
   "Battery 9–10 hr video",
   "Apple Pencil (1st gen) supported"
  ],
  scored:  {
   performance:  6.2,
   battery:  7.8,
   durability:  8.2,
   portability:  9,
   display:  7.5,
   camera:  6,
   storage:  3.5,
   repairability:  4.5
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  5,
   repairabilityLabel:  "Hard — authorized service only"
  },
  strengths:  [
   "Longest software support in the tablet class",
   "Cheapest entry into the Pencil note-taking workflow",
   "Strong resale value"
  ],
  weaknesses:  [
   "64GB base storage is tight",
   "Non-laminated display adds glare",
   "Pencil and keyboard cost extra"
  ],
  goodFor:  [
   "Paperless note-taking",
   "Reading and PDF annotation",
   "Media consumption between classes"
  ],
  notIdeal:  [
   "Primary laptop replacement",
   "Large offline media libraries"
  ],
  cx:  {
   perf:  62,
   display:  75,
   battery:  78,
   portability:  90,
   durab:  82,
   repair:  45,
   camera:  60,
   storage:  35
  },
  battery:  9,
  durab:  4.3,
  repair:  2.8,
  raters:  210,
  pop:  79,
  issue:  "Non-laminated display shows more glare",
  uses:  {
   programming:  1,
   design:  2,
   classes:  3,
   research:  3,
   gaming:  2,
   video:  3
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-apple-ipad-9-1",
    user:  "Nadine C.",
    rating:  5,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "GoodNotes replaced all my notebooks. Still gets iPadOS updates years in — that's the long-term value."
   },
   {
    id:  "r-apple-ipad-9-2",
    user:  "Iya V.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Split-screen lecture PDF + Zoom runs smooth. Storage is tight though."
   },
   {
    id:  "r-apple-ipad-9-3",
    user:  "Trina U.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Cheapest real iPad. Resale after 3 years still recovers half the price."
   }
  ],
  issues:  [
   {
    id:  "i-apple-ipad-9",
    title:  "Non-laminated display shows more glare",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "xiaomi-pad-7",
  brand:  "Xiaomi",
  model:  "Xiaomi Pad 7",
  category:  "tablets",
  price:  16999,
  rating:  4.5,
  reviewCount:  130,
  releaseYear:  2024,
  status:  "published",
  tagline:  "144Hz 3.2K display at a mid-range price",
  summary:  "A full day of classes on one charge and a display that embarrasses pricier tablets. Stylus and keyboard sold separately.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Xiaomi_Pad_7.jpg/960px-Xiaomi_Pad_7.jpg",
  specs:  {
   Chipset:  "Snapdragon 7+ Gen 3",
   Memory:  "8GB RAM · 128GB",
   Display:  "11.2-inch 3.2K 144Hz",
   Battery:  "Battery 8,850 mAh · 45W",
   Stylus:  "Focus stylus + keyboard support"
  },
  specList:  [
   "Snapdragon 7+ Gen 3",
   "8GB RAM · 128GB",
   "11.2-inch 3.2K 144Hz",
   "Battery 8,850 mAh · 45W",
   "Focus stylus + keyboard support"
  ],
  scored:  {
   performance:  8.2,
   battery:  8.8,
   durability:  7.5,
   portability:  8.5,
   display:  9.5,
   camera:  4.5,
   storage:  6,
   repairability:  4
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  4,
   repairabilityLabel:  "Moderate — some parts need a shop"
  },
  strengths:  [
   "144Hz 3.2K display at a mid-range price",
   "Snapdragon 7+ Gen 3 handles heavy apps",
   "8,850 mAh lasts full-day schedules"
  ],
  weaknesses:  [
   "Stylus and keyboard sold separately",
   "Note-app ecosystem trails iPad"
  ],
  goodFor:  [
   "Video streaming and reading",
   "Digital flashcards and PDF markup",
   "Budget-conscious media students"
  ],
  notIdeal:  [
   "Deep Pencil-style workflows",
   "Students already in the Apple ecosystem"
  ],
  cx:  {
   perf:  82,
   display:  95,
   battery:  88,
   portability:  85,
   durab:  75,
   repair:  40,
   camera:  45,
   storage:  60
  },
  battery:  10,
  durab:  4,
  repair:  3,
  raters:  130,
  pop:  68,
  issue:  "Stylus sold separately",
  uses:  {
   programming:  1,
   design:  2,
   classes:  3,
   research:  3,
   gaming:  3,
   video:  3
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-xiaomi-pad-7-1",
    user:  "Enzo H.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "144Hz at this price is unfair. A full Thursday of classes on one charge."
   },
   {
    id:  "r-xiaomi-pad-7-2",
    user:  "Paolo D.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Great for notes and video. App ecosystem still behind iPad for note apps."
   },
   {
    id:  "r-xiaomi-pad-7-3",
    user:  "Luigi B.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Doubles as my second monitor for the laptop. Stylus buying separately stings."
   }
  ],
  issues:  [
   {
    id:  "i-xiaomi-pad-7",
    title:  "Stylus sold separately",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "redmi-note-11",
  brand:  "Redmi",
  model:  "Redmi Note 11",
  category:  "smartphones",
  price:  6999,
  rating:  4.2,
  reviewCount:  300,
  releaseYear:  2022,
  status:  "published",
  tagline:  "The first phone that survives an allowance",
  summary:  "AMOLED 90Hz and one-hour charging at ₱7k, with parts everywhere. Gaming and low-light photos are where it saves.",
  image:  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Redmi_Note_11_front.jpg/960px-Redmi_Note_11_front.jpg",
  specs:  {
   Display:  "6.43-inch AMOLED 90Hz",
   Chipset:  "Helio G96",
   Memory:  "6GB RAM · 128GB",
   Battery:  "5,000 mAh · 33W",
   Camera:  "50MP main camera"
  },
  specList:  [
   "6.43-inch AMOLED 90Hz",
   "Helio G96",
   "6GB RAM · 128GB",
   "5,000 mAh · 33W",
   "50MP main camera"
  ],
  scored:  {
   performance:  4.5,
   battery:  8,
   durability:  6.8,
   portability:  9.5,
   display:  8,
   camera:  5.5,
   storage:  6.5,
   repairability:  8.2
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  3,
   repairabilityLabel:  "Moderate — some parts need a shop"
  },
  strengths:  [
   "AMOLED 90Hz at a budget price",
   "33W charging — full in about an hour",
   "Parts and technicians are everywhere"
  ],
  weaknesses:  [
   "Helio G96 slows on heavy apps",
   "Camera struggles in low light",
   "Bloatware out of the box"
  ],
  goodFor:  [
   "Calls, GCash, school apps",
   "First phone on a tight allowance",
   "Backup phone for fieldwork"
  ],
  notIdeal:  [
   "Mobile gaming",
   "Photo-heavy coursework"
  ],
  cx:  {
   perf:  45,
   display:  80,
   battery:  80,
   portability:  95,
   durab:  68,
   repair:  82,
   camera:  55,
   storage:  65
  },
  battery:  8.2,
  durab:  3.6,
  repair:  3.9,
  raters:  300,
  pop:  86,
  issue:  "Preloaded bloatware",
  uses:  {
   programming:  1,
   design:  1,
   classes:  3,
   research:  2,
   gaming:  1,
   video:  2,
   photography:  2
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-redmi-note-11-1",
    user:  "Tin A.",
    rating:  5,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "AMOLED at ₱7k carried my whole first year. Charges during one lunch break."
   },
   {
    id:  "r-redmi-note-11-2",
    user:  "Rey F.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Camera is fine for board notes and GCash scans. Loads ML files slowly."
   },
   {
    id:  "r-redmi-note-11-3",
    user:  "Kaye L.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Dropped screen-first twice with a case — survived. Parts are everywhere."
   }
  ],
  issues:  [
   {
    id:  "i-redmi-note-11",
    title:  "Preloaded bloatware",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "samsung-galaxy-s23",
  brand:  "Samsung",
  model:  "Samsung Galaxy S23",
  category:  "smartphones",
  price:  38990,
  rating:  4.7,
  reviewCount:  190,
  releaseYear:  2023,
  status:  "published",
  tagline:  "Flagship camera in a one-hand body",
  summary:  "Night-mode camera for thesis documentation, compact build, 4 OS updates promised. Battery needs top-ups.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Back_of_the_Samsung_Galaxy_S23.jpg/960px-Back_of_the_Samsung_Galaxy_S23.jpg",
  specs:  {
   Display:  "6.1-inch Dynamic AMOLED 120Hz",
   Chipset:  "Snapdragon 8 Gen 2",
   Memory:  "8GB RAM · 256GB",
   Battery:  "3,900 mAh · 25W",
   Durability:  "IP68 water resistant"
  },
  specList:  [
   "6.1-inch Dynamic AMOLED 120Hz",
   "Snapdragon 8 Gen 2",
   "8GB RAM · 256GB",
   "3,900 mAh · 25W",
   "IP68 water resistant"
  ],
  scored:  {
   performance:  9.2,
   battery:  6.2,
   durability:  8.6,
   portability:  9.6,
   display:  9.5,
   camera:  9,
   storage:  8,
   repairability:  3.8
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  4,
   repairabilityLabel:  "Hard — authorized service only"
  },
  strengths:  [
   "Flagship camera — night mode handles indoor events",
   "Compact one-handed body",
   "4 OS + 5 years security updates"
  ],
  weaknesses:  [
   "Small 3,900 mAh battery needs top-ups",
   "25W charging is slow for the class",
   "Premium repair costs"
  ],
  goodFor:  [
   "Photography and content creation",
   "Research on the go",
   "Students keeping a phone 4+ years"
  ],
  notIdeal:  [
   "Heavy mobile gaming sessions",
   "Students who forget power banks"
  ],
  cx:  {
   perf:  92,
   display:  95,
   battery:  62,
   portability:  96,
   durab:  86,
   repair:  38,
   camera:  90,
   storage:  80
  },
  battery:  8,
  durab:  4.4,
  repair:  2.9,
  raters:  190,
  pop:  81,
  issue:  "Battery health dips faster than expected",
  uses:  {
   programming:  2,
   design:  2,
   classes:  3,
   research:  3,
   gaming:  3,
   video:  3,
   photography:  3
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-samsung-galaxy-s23-1",
    user:  "Jopay K.",
    rating:  5,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "Flagship camera for thesis documentation. Night mode saves my indoor shots."
   },
   {
    id:  "r-samsung-galaxy-s23-2",
    user:  "Doms L.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Compact size is the selling point — actually fits one hand. Battery needs a power bank on long days."
   },
   {
    id:  "r-samsung-galaxy-s23-3",
    user:  "Aira S.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Four years of updates promised. Cost per year beats cheaper phones."
   }
  ],
  issues:  [
   {
    id:  "i-samsung-galaxy-s23",
    title:  "Battery health dips faster than expected",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "jbl-synchros-e50bt",
  brand:  "JBL",
  model:  "JBL Synchros E50BT",
  category:  "headphones",
  price:  4499,
  rating:  4,
  reviewCount:  95,
  releaseYear:  2018,
  status:  "published",
  tagline:  "Bass for the commute, aux for the dead battery",
  summary:  "Pure Bass sound that drowns the LRT, aux fallback, folds flat. Ear pads flake around month 11 and there is no ANC.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/JBL_Synchros_E50BT.jpg/960px-JBL_Synchros_E50BT.jpg",
  specs:  {
   Type:  "Over-ear, wireless",
   Sound:  "JBL Pure Bass sound",
   Battery:  "Battery ~16 hr",
   Connectivity:  "Bluetooth + aux fallback",
   Design:  "Foldable, padded headband"
  },
  specList:  [
   "Over-ear, wireless",
   "JBL Pure Bass sound",
   "Battery ~16 hr",
   "Bluetooth + aux fallback",
   "Foldable, padded headband"
  ],
  scored:  {
   performance:  5.5,
   battery:  5.5,
   durability:  6.5,
   portability:  7,
   display:  6.2,
   camera:  5,
   storage:  5,
   repairability:  6
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  2.5,
   repairabilityLabel:  "Moderate — some parts need a shop"
  },
  strengths:  [
   "Pure Bass sound for commutes",
   "Aux cable works when the battery dies",
   "Folds flat inside a bag"
  ],
  weaknesses:  [
   "Ear pads flake around month 11",
   "No active noise cancelling",
   "Mic quality is average for calls"
  ],
  goodFor:  [
   "Jeepney and LRT commutes",
   "Casual listening between classes",
   "Backup wired/wireless pair"
  ],
  notIdeal:  [
   "All-day library wear",
   "Online recitation-heavy schedules"
  ],
  cx:  {
   perf:  55,
   comfort:  62,
   battery:  55,
   portability:  70,
   durab:  65,
   repair:  60,
   mic:  50
  },
  battery:  7.5,
  durab:  3.5,
  repair:  3.2,
  raters:  95,
  pop:  55,
  issue:  "Ear pads flake after about a year",
  uses:  {
   programming:  0,
   design:  1,
   classes:  3,
   research:  2,
   gaming:  2,
   video:  1
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-jbl-synchros-e50bt-1",
    user:  "Shai G.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Bass drowns the LRT noise during commute reviews. Pads get warm after 2 hours."
   },
   {
    id:  "r-jbl-synchros-e50bt-2",
    user:  "Enzo H.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Aux cable saved me when the battery died mid-library session."
   },
   {
    id:  "r-jbl-synchros-e50bt-3",
    user:  "Mai S.",
    rating:  3,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Pads started flaking at month 11. Replaceable, but annoying."
   }
  ],
  issues:  [
   {
    id:  "i-jbl-synchros-e50bt",
    title:  "Ear pads flake after about a year",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 },
 {
  id:  "anker-powercore-20100",
  brand:  "Anker",
  model:  "Anker PowerCore 20100",
  category:  "powerbanks",
  price:  2450,
  rating:  4.8,
  reviewCount:  350,
  releaseYear:  2018,
  status:  "published",
  tagline:  "Brownout insurance with an 18-month warranty",
  summary:  "20,000 mAh that trickle-charges laptops and outlasts outages. Heavy in a small bag, slow to recharge itself.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Anker_power_bank_lit.jpg/960px-Anker_power_bank_lit.jpg",
  specs:  {
   Capacity:  "20,000 mAh",
   Output:  "18W USB-C PD in/out",
   "Laptop charging": "Charges a laptop (trickle)",
   Display:  "4-LED charge display",
   Safety:  "Airline-safe capacity"
  },
  specList:  [
   "20,000 mAh",
   "18W USB-C PD in/out",
   "Charges a laptop (trickle)",
   "4-LED charge display",
   "Airline-safe capacity"
  ],
  scored:  {
   performance:  7.5,
   battery:  9.5,
   durability:  9.2,
   portability:  4,
   display:  3,
   camera:  0,
   storage:  5,
   repairability:  5.5
  },
  value:  {
   warrantyYears:  1.5,
   lifespanYears:  3,
   repairabilityLabel:  "Moderate — some parts need a shop"
  },
  strengths:  [
   "18W PD tops phones fast, trickle-charges laptops",
   "18-month warranty — rare in this class",
   "Four years of service without swelling"
  ],
  weaknesses:  [
   "Heavy in a small bag (≈355 g)",
   "Slow to recharge itself overnight"
  ],
  goodFor:  [
   "Long field days and brownouts",
   "Laptop users between outlets",
   "Group-work charging duty"
  ],
  notIdeal:  [
   "Everyday minimal carry",
   "Quick recharges between classes"
  ],
  cx:  {
   perf:  75,
   comfort:  30,
   battery:  95,
   portability:  40,
   durab:  92,
   repair:  55,
   mic:  0
  },
  battery:  9.5,
  durab:  4.5,
  repair:  3.4,
  raters:  350,
  pop:  82,
  issue:  "None reported yet",
  uses:  {
   programming:  2,
   design:  1,
   classes:  3,
   research:  2,
   gaming:  2,
   video:  2
  },
  warranty:  18,
  reviews:  [
   {
    id:  "r-anker-powercore-20100-1",
    user:  "Fons M.",
    rating:  5,
    date:  "2026-08-14",
    context:  "Year 3 student",
    text:  "Brownout insurance. Kept my router, phone and laptop alive through a 6-hour outage."
   },
   {
    id:  "r-anker-powercore-20100-2",
    user:  "Kaye L.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Heavy, but that's physics. Four years of daily service and it never swelled."
   },
   {
    id:  "r-anker-powercore-20100-3",
    user:  "Iya V.",
    rating:  5,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Pays for itself the first time it saves a 20% battery before a quiz."
   }
  ],
  issues:  []
 },
 {
  id:  "amazfit-bip",
  brand:  "Amazfit",
  model:  "Amazfit Bip",
  category:  "smartwatches",
  price:  3190,
  rating:  4.3,
  reviewCount:  140,
  releaseYear:  2018,
  status:  "published",
  tagline:  "Charge it monthly, forget it daily",
  summary:  "Up to 30 days per charge, silent alarms for early classes, light enough to forget. Basic metrics, scratchy screen.",
  image:  "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Amazfit_Bip_Inside.jpg/960px-Amazfit_Bip_Inside.jpg",
  specs:  {
   Display:  "1.28-inch always-on display",
   Battery:  "Up to 30-day battery",
   Sensors:  "GPS + SpO2 + heart rate",
   "Water resistance": "5 ATM water resistant",
   Alarms:  "Silent vibrating alarms"
  },
  specList:  [
   "1.28-inch always-on display",
   "Up to 30-day battery",
   "GPS + SpO2 + heart rate",
   "5 ATM water resistant",
   "Silent vibrating alarms"
  ],
  scored:  {
   performance:  4,
   battery:  10,
   durability:  7.2,
   portability:  10,
   display:  8.5,
   camera:  0,
   storage:  3,
   repairability:  4.5
  },
  value:  {
   warrantyYears:  1,
   lifespanYears:  3,
   repairabilityLabel:  "Hard — authorized service only"
  },
  strengths:  [
   "Up to 30-day battery — charge monthly",
   "Silent vibrating alarms for early classes",
   "Lightweight enough to forget wearing"
  ],
  weaknesses:  [
   "GPS locks slowly near tall buildings",
   "Basic fitness metrics only",
   "Screen scratches without a film"
  ],
  goodFor:  [
   "7:30am class alarms",
   "Habit and sleep tracking",
   "Budget fitness logging"
  ],
  notIdeal:  [
   "Serious run training",
   "Replying to messages from the wrist"
  ],
  cx:  {
   perf:  40,
   comfort:  85,
   battery:  100,
   portability:  100,
   durab:  72,
   repair:  45,
   camera:  0,
   storage:  30
  },
  battery:  9.9,
  durab:  3.8,
  repair:  2.9,
  raters:  140,
  pop:  58,
  issue:  "GPS locks slowly near tall buildings",
  uses:  {
   programming:  0,
   design:  0,
   classes:  3,
   research:  1,
   gaming:  0,
   video:  0
  },
  warranty:  12,
  reviews:  [
   {
    id:  "r-amazfit-bip-1",
    user:  "Trina U.",
    rating:  5,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Silent alarms for 7:30am classes saved my attendance. Charges like once a month."
   },
   {
    id:  "r-amazfit-bip-2",
    user:  "Ogie W.",
    rating:  4,
    date:  "2025-09-10",
    context:  "Year 1 student",
    text:  "Tracks my commute walks honestly. GPS takes a minute to lock near buildings."
   },
   {
    id:  "r-amazfit-bip-3",
    user:  "Luigi B.",
    rating:  4,
    date:  "2026-02-20",
    context:  "Year 2 student",
    text:  "Paired with Google Fit fine. Screen scratches if you're careless."
   }
  ],
  issues:  [
   {
    id:  "i-amazfit-bip",
    title:  "GPS locks slowly near tall buildings",
    reportedBy:  "Community report",
    date:  "2026-06-01",
    status:  "confirmed",
    severity:  "moderate"
   }
  ]
 }
];
/* ---------- end GW.realGadgetEntries (GW.gadgets aliases this array) ---------- */
GW.gadgets = GW.realGadgetEntries;

/* ---------- Reported issues for gadgets without one (pool for admin) ---------- */
GW.extraIssues = [
  { id: "i-gen1", gadget: "redmi-note-11", title: "Stock charger overheats with third-party cables", reportedBy: "Uly B.", date: "2026-06-05", status: "pending", severity: "moderate" },
  { id: "i-gen2", gadget: "apple-macbook-air-m1", title: "Hinge squeaks after months of tablet-style opening", reportedBy: "Rhea T.", date: "2026-06-21", status: "pending", severity: "minor" },
  { id: "i-gen3", gadget: "xiaomi-pad-7", title: "microSD occasionally unmounts when battery is low", reportedBy: "Pat L.", date: "2026-07-01", status: "pending", severity: "minor" }
];

/* ---------- Registered users (admin view) ---------- */
GW.users = [
  { id: "u1", name: "Andrea Villanueva", email: "andrea.villanueva@student.edu.ph", registered: "2025-06-12", status: "active",   reviews: 6, role: "student" },
  { id: "u2", name: "Jomar Tolentino",   email: "jomar.t@student.edu.ph",         registered: "2025-07-03", status: "active",   reviews: 4, role: "student" },
  { id: "u3", name: "Bea Mercado",       email: "bea.mercado@student.edu.ph",     registered: "2025-08-19", status: "active",   reviews: 3, role: "student" },
  { id: "u4", name: "Ramon Alcantara",   email: "ramon.alc@student.edu.ph",       registered: "2025-09-08", status: "active",   reviews: 2, role: "student" },
  { id: "u5", name: "Hazel Ventura",     email: "hazel.ventura@student.edu.ph",   registered: "2025-10-21", status: "inactive", reviews: 1, role: "student" },
  { id: "u6", name: "Miguel Cruz",       email: "miguel.cruz@student.edu.ph",     registered: "2025-11-30", status: "active",   reviews: 5, role: "student" },
  { id: "u7", name: "Rina Prado",        email: "rina.prado@student.edu.ph",      registered: "2026-01-17", status: "active",   reviews: 2, role: "student" },
  { id: "u8", name: "Dennis Lim",        email: "dennis.lim@student.edu.ph",      registered: "2026-02-05", status: "suspended",reviews: 0, role: "student" }
];

/* ---------- Pending review queue (admin moderation) ---------- */
GW.pendingReviews = [
  { id: "pr1", gadget: "samsung-galaxy-s23",       user: "Miguel Cruz",    rating: 5, date: "2026-09-01", status: "pending", text: "Third month with this as my main org-camera phone. Shutter lag is gone compared to my old phone, and editing straight on device is fast. Only complaint is smudges — clean it hourly or it looks greasy in photos of the phone itself." },
  { id: "pr2", gadget: "anker-powercore-20100", user: "Rina Prado",  rating: 4, date: "2026-09-03", status: "pending", text: "Bought this for thesis fieldwork in the province. Two full days of drone controller + phone charging. Gauge stayed accurate. Minus one star because the rubber shell collects lint like crazy." },
  { id: "pr3", gadget: "apple-macbook-air-m1",   user: "Bea Mercado",    rating: 4, date: "2026-09-05", status: "pending", text: "One sem in. Still on one charge per day, still doesn't get hot on my lap during 3-hour lectures. Windows updates once interrupted a recording, but that's Windows, not the laptop." },
  { id: "pr4", gadget: "jbl-synchros-e50bt",     user: "Dennis Lim",     rating: 2, date: "2026-09-06", status: "pending", text: "ANC stopped working on the right side after 5 months. Service center says 3 weeks turnaround. Sound without ANC is fine, but I paid for the ANC." },
  { id: "pr5", gadget: "acer-aspire-5-a515", user: "Ramon Alcantara",rating: 5, date: "2026-09-08", status: "pending", text: "Upgraded the RAM as suggested here in the reviews and now it runs our accounting software + 20 tabs fine. This site's repairability score is what sold me. One year in, zero problems." },
  { id: "pr6", gadget: "amazfit-bip",   user: "Hazel Ventura",  rating: 4, date: "2026-09-09", status: "pending", text: "Battery claim is real — 13 days on my usage. Sleep tracking matches how I actually feel. Wish it could reply to messages, but at this price I'm satisfied." },
  { id: "pr7", gadget: "apple-ipad-9", user: "Andrea Villanueva", rating: 5, date: "2026-09-10", status: "pending", text: "Bought after the recommendation tool scored it 91 for graphic design. It was right. Drawing for 4+ hours, no lag, no heat. Save up for the official keyboard though — third-party ones feel mushy." }
];

/* ---------- Admin dashboard metrics (mock) ---------- */
GW.adminMetrics = {
  totalUsers: 2438,
  totalGadgets: GW.gadgets.length,
  totalReviews: GW.gadgets.reduce((n, g) => n + g.reviews.length, 0) + GW.pendingReviews.length,
  pendingReviews: GW.pendingReviews.length,
  openIssues: 9,
  pageViewsThisMonth: 48213,
  // most viewed (page views per gadget, this month) — real catalog ids
  views: [
    { id: "apple-macbook-air-m1", views: 4820 }, { id: "samsung-galaxy-s23", views: 4310 },
    { id: "acer-aspire-5-a515", views: 3960 }, { id: "asus-vivobook-15", views: 3544 },
    { id: "apple-ipad-9", views: 3102 }, { id: "xiaomi-pad-7", views: 2478 },
    { id: "redmi-note-11", views: 2211 }, { id: "anker-powercore-20100", views: 1980 }
  ],
  comparisons: [
    { id: "apple-macbook-air-m1", count: 1840 }, { id: "acer-aspire-5-a515", count: 1615 },
    { id: "xiaomi-pad-7", count: 1204 }, { id: "asus-vivobook-15", count: 1178 },
    { id: "samsung-galaxy-s23", count: 1102 }, { id: "redmi-note-11", count: 864 }
  ],
  recommended: [
    { id: "acer-aspire-5-a515", count: 942 }, { id: "apple-macbook-air-m1", count: 901 },
    { id: "redmi-note-11", count: 776 }, { id: "apple-ipad-9", count: 523 },
    { id: "anker-powercore-20100", count: 468 }, { id: "samsung-galaxy-s23", count: 401 }
  ],
  categoryShare: { smartphones: 34, laptops: 31, tablets: 13, headphones: 10, powerbanks: 7, smartwatches: 5 },
  viewsTrend: [
    { week: "Jul 20", value: 8100 }, { week: "Jul 27", value: 9400 }, { week: "Aug 3", value: 10250 },
    { week: "Aug 10", value: 9800 }, { week: "Aug 17", value: 11600 }, { week: "Aug 24", value: 12800 },
    { week: "Aug 31", value: 12100 }, { week: "Sep 7", value: 13950 }
  ]
};

/* ---------- Recommendation engine inputs ---------- */
GW.budgetBands = [
  { id: "under-10k", label: "Under ₱10,000",       min: 0,     max: 10000 },
  { id: "10-20k",    label: "₱10,000 – ₱20,000",   min: 10000, max: 20000 },
  { id: "20-40k",    label: "₱20,000 – ₱40,000",   min: 20000, max: 40000 },
  { id: "40-60k",    label: "₱40,000 – ₱60,000",   min: 40000, max: 60000 },
  { id: "60k-plus",  label: "₱60,000 and above",   min: 60000, max: Infinity }
];

GW.useCases = [
  { id: "general",       label: "General Student Use", categories: ["smartphones", "laptops", "tablets"],
    note: "Browsing, documents, video calls, and media.",
    criteria: { performance: 3, battery: 3, portability: 2, display: 2, storage: 1, camera: 1, durability: 1 } },
  { id: "programming",   label: "Programming", categories: ["laptops"],
    note: "IDEs, compilers, virtual machines, long compile cycles.",
    criteria: { performance: 5, storage: 3, display: 3, battery: 2, durability: 2, portability: 2 } },
  { id: "online-classes",label: "Online Classes", categories: ["smartphones", "tablets", "laptops"],
    note: "Video calls, lecture playback, note-taking from home.",
    criteria: { battery: 4, display: 3, performance: 2, camera: 2, storage: 2, portability: 1 } },
  { id: "office",        label: "Office / Productivity", categories: ["laptops", "tablets"],
    note: "Documents, spreadsheets, presentations, email.",
    criteria: { performance: 3, battery: 4, portability: 3, display: 2, storage: 2, durability: 1 } },
  { id: "graphic-design",label: "Graphic Design", categories: ["laptops", "tablets"],
    note: "Illustration, layout, color-accurate work, pen input.",
    criteria: { display: 5, performance: 4, storage: 3, portability: 2, battery: 1 } },
  { id: "video-editing", label: "Video Editing", categories: ["laptops", "smartphones"],
    note: "Timeline editing, rendering, color grading, large files.",
    criteria: { performance: 5, storage: 4, display: 3, battery: 1, portability: 1 } }
];

GW.priorityFactors = [
  { id: "performance",   label: "Performance",    base: 15, hint: "Processor, RAM, sustained speed" },
  { id: "battery",       label: "Battery Life",   base: 10, hint: "Hours per charge or unplugged" },
  { id: "durability",    label: "Durability",     base: 10, hint: "Build, water/drop resistance" },
  { id: "portability",   label: "Portability",    base: 0,  hint: "Weight and size for commuting" },
  { id: "display",       label: "Display",        base: 0,  hint: "Panel quality, brightness, size" },
  { id: "camera",        label: "Camera",         base: 0,  hint: "Photo and video capture" },
  { id: "storage",       label: "Storage",        base: 0,  hint: "Space for files, apps, projects" },
  { id: "value",         label: "Long-term Value",base: 10, hint: "Ownership cost vs. lifespan" },
  { id: "repairability", label: "Repairability",  base: 5,  hint: "Fixable instead of replaceable" },
  { id: "budget",        label: "Budget discipline", base: 0, hint: "How strictly to stay under your ceiling" }
];

/* ---------- Community trust stats (home page) ---------- */
GW.community = {
  gadgetsTracked: GW.gadgets.length,
  reviewsWritten: GW.gadgets.reduce((n, g) => n + g.reviewCount, 0),
  issuesReported: 132,
  avgRating: (GW.gadgets.reduce((n, g) => n + g.rating, 0) / GW.gadgets.length).toFixed(1)
};

GW.currentUser = {
  name: "Andrea Villanueva",
  program: "BS Information Technology · 3rd Year",
  school: "State university, Quezon City",
  memberSince: "June 2025",
  avatarInitials: "AV"
};

/* Seeded history for the prototype account (mock) — real catalog ids */
GW.seedCompareHistory = [
  { id: "ch1", date: "2026-08-14", items: ["acer-aspire-5-a515", "apple-macbook-air-m1"] },
  { id: "ch2", date: "2026-08-29", items: ["samsung-galaxy-s23", "redmi-note-11", "apple-ipad-9"] }
];
GW.seedRecommendationHistory = [
  { id: "rh1", date: "2026-09-10", budget: 45000, use: "graphic-design",
    top: { id: "apple-ipad-9", score: 91 } }
];

/* ---------- Lookups ---------- */
GW.getGadget = function (id) { return GW.gadgets.find(g => g.id === id) || null; };
GW.getCategory = function (id) { return GW.categories.find(c => c.id === id) || null; };
GW.gadgetsInCategory = function (catId) { return GW.gadgets.filter(g => g.category === catId); };
GW.gadgetsByIds = function (ids) { return ids.map(GW.getGadget).filter(Boolean); };

/* Estimated monthly ownership cost — the ONE formula:
   price / (lifespan years × 12). Displayed everywhere as an estimate. */
GW.monthlyCost = function (g) {
  const months = (g.value.lifespanYears || 1) * 12;
  return g.price / months;
};
GW.categoryMedianMonthly = function (catId) {
  const list = GW.gadgetsInCategory(catId).map(GW.monthlyCost).sort((a, b) => a - b);
  if (!list.length) return 0;
  const mid = Math.floor(list.length / 2);
  return list.length % 2 ? list[mid] : (list[mid - 1] + list[mid]) / 2;
};
