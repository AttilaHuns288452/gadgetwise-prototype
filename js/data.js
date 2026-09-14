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
GW.gadgets = [
  /* ================= SMARTPHONES ================= */
  {
    id: "novatek-spark-5g", brand: "Novatek", model: "Spark 5G", category: "smartphones",
    price: 8999, rating: 4.1, reviewCount: 148, releaseYear: 2025, status: "published",
    tagline: "The budget phone that got its priorities right",
    summary: "A 5,000 mAh battery and clean software at a price a student allowance can survive. Camera and build are where it saves.",
    image: "assets/placeholders/ph-smartphone-01.svg",
    specs: { "Display": "6.6\" IPS LCD, 90Hz", "Processor": "Snapdragon 6-series (6nm)", "RAM": "8 GB", "Storage": "128 GB + microSD", "Battery": "5,000 mAh, 18W", "Rear camera": "50 MP main + 2 MP depth", "Front camera": "8 MP", "OS": "Android 15 (2 OS updates)", "Weight": "199 g" },
    scored: { performance: 5.5, battery: 9.0, durability: 6.0, portability: 7.5, display: 6.0, camera: 4.5, storage: 6.5, repairability: 7.0 },
    value: { warrantyYears: 1, lifespanYears: 3, repairabilityLabel: "Easy — replaceable battery and cheap parts" },
    strengths: ["Battery life", "Price", "Clean software"],
    weaknesses: ["Camera", "Low-light video", "Only 2 OS updates"],
    reviews: [
      { id: "r-sp1", user: "Bea M.", rating: 4, date: "2026-06-02", context: "General student use · 11 months",
        text: "Used this for online classes and note-taking since last sem. Battery lasts a full class day plus commute, and it never lags on Google Docs. Camera is weak at night but I barely use it." },
      { id: "r-sp2", user: "Jomar T.", rating: 4, date: "2026-03-18", context: "Online classes · 8 months",
        text: "Sulit for the price. Charging is a bit slow, around 1.5 hours, but I just plug it in while reviewing. Screen is fine indoors, hard to read under sunlight." },
      { id: "r-sp3", user: "Aling R.", rating: 3, date: "2025-11-05", context: "General use · 3 months",
        text: "Works well but the back panel creaks. Dropped it once and the corner chipped. Good thing a replacement back cover is cheap." }
    ],
    issues: [
      { id: "i-sp1", title: "LCD shows faint shadow after long sun exposure", reportedBy: "Karl D.", date: "2026-05-11", status: "investigating", severity: "minor" },
      { id: "i-sp2", title: "Charging port loosens after ~6 months of daily use", reportedBy: "Mika S.", date: "2026-04-02", status: "confirmed", severity: "moderate" }
    ]
  },
  {
    id: "kaido-note-12-lite", brand: "Kaido", model: "Note 12 Lite", category: "smartphones",
    price: 14999, rating: 4.4, reviewCount: 236, releaseYear: 2025, status: "published",
    tagline: "Mid-range all-rounder for the commuting student",
    summary: "Fast charging, a bright AMOLED panel, and dependable performance for multi-app study sessions.",
    image: "assets/placeholders/ph-smartphone-02.svg",
    specs: { "Display": "6.67\" AMOLED, 120Hz", "Processor": "Snapdragon 7-series (4nm)", "RAM": "8 GB", "Storage": "256 GB", "Battery": "5,500 mAh, 45W", "Rear camera": "50 MP OIS + 8 MP ultrawide", "Front camera": "16 MP", "OS": "Android 15 (3 OS updates)", "Weight": "187 g" },
    scored: { performance: 7.0, battery: 8.5, durability: 7.0, portability: 8.0, display: 8.0, camera: 7.0, storage: 8.0, repairability: 6.0 },
    value: { warrantyYears: 1, lifespanYears: 3.5, repairabilityLabel: "Moderate — battery swap needs a shop" },
    strengths: ["Display", "Charging speed", "Storage"],
    weaknesses: ["No IP rating", "Plastic frame"],
    reviews: [
      { id: "r-kn1", user: "Rina P.", rating: 5, date: "2026-07-21", context: "Programming + media · 1 year",
        text: "I code practice problems on it, stream lectures, and it handles both without heating. The 45W charging is a lifesaver between classes — 30 minutes gives me most of the day." },
      { id: "r-kn2", user: "Dennis L.", rating: 4, date: "2026-01-14", context: "General student use · 10 months",
        text: "AMOLED is great for reading PDFs at night. Wish it had water resistance; got soaked once in sudden rain and I panicked. It survived, but still." }
    ],
    issues: [
      { id: "i-kn1", title: "Fingerprint sensor occasionally fails with sweaty fingers", reportedBy: "Trish G.", date: "2026-06-30", status: "investigating", severity: "minor" }
    ]
  },
  {
    id: "aurio-x9-pro", brand: "Aurio", model: "X9 Pro", category: "smartphones",
    price: 24990, rating: 4.6, reviewCount: 189, releaseYear: 2026, status: "published",
    tagline: "Flagship-grade camera without the flagship price",
    summary: "The strongest camera and chipset combination in its bracket, with a premium aluminum build.",
    image: "assets/placeholders/ph-smartphone-03.svg",
    specs: { "Display": "6.7\" LTPO AMOLED, 120Hz", "Processor": "Flagship 4nm chipset", "RAM": "12 GB", "Storage": "256 GB (UFS 4.0)", "Battery": "5,000 mAh, 67W", "Rear camera": "50 MP OIS + 12 MP ultrawide + 10 MP tele", "Front camera": "32 MP", "OS": "Android 16 (4 OS updates)", "Weight": "194 g" },
    scored: { performance: 9.0, battery: 8.0, durability: 8.0, portability: 8.0, display: 9.0, camera: 9.0, storage: 8.5, repairability: 5.5 },
    value: { warrantyYears: 1, lifespanYears: 4, repairabilityLabel: "Moderate — screen parts available, back glass risky" },
    strengths: ["Camera", "Performance", "Display", "Longer update support"],
    weaknesses: ["Price", "Glass back attracts smudges"],
    reviews: [
      { id: "r-ax1", user: "Miguel C.", rating: 5, date: "2026-08-04", context: "Content creation · 6 months",
        text: "I shoot and edit org event videos on this. 4K editing on-device is smooth and the telephoto actually gets usable shots from the back of the venue." },
      { id: "r-ax2", user: "Hazel V.", rating: 4, date: "2026-04-27", context: "Graphic design + classes · 5 months",
        text: "Fast and beautiful. The 67W charger is bulky to bring though — I carry a smaller 30W GaN instead and it still charges decently." }
    ],
    issues: [
      { id: "i-ax1", title: "Case included in box cracks near the camera bump", reportedBy: "Owen F.", date: "2026-07-12", status: "resolved", severity: "minor" }
    ]
  },
  {
    id: "vantor-edge-40", brand: "Vantor", model: "Edge 40", category: "smartphones",
    price: 32999, rating: 4.3, reviewCount: 96, releaseYear: 2025, status: "published",
    tagline: "Compact, rugged, and built to be repaired",
    summary: "A smaller flagship with an IP68 rating, replaceable screen module, and a 5-year parts pledge.",
    image: "assets/placeholders/ph-smartphone-04.svg",
    specs: { "Display": "6.1\" OLED, 120Hz", "Processor": "Prior-gen flagship (5nm)", "RAM": "8 GB", "Storage": "256 GB", "Battery": "4,400 mAh, 40W", "Rear camera": "48 MP OIS + 12 MP ultrawide", "Front camera": "20 MP", "OS": "Android 15 (4 OS updates)", "Weight": "172 g" },
    scored: { performance: 8.0, battery: 6.5, durability: 9.0, portability: 9.5, display: 8.0, camera: 7.5, storage: 7.5, repairability: 9.0 },
    value: { warrantyYears: 2, lifespanYears: 4.5, repairabilityLabel: "Easy — official self-repair kits and 5-year parts pledge" },
    strengths: ["Durability", "Repairability", "Compact size", "2-year warranty"],
    weaknesses: ["Battery capacity", "Older chipset for the price"],
    reviews: [
      { id: "r-ve1", user: "Paolo R.", rating: 4, date: "2026-02-19", context: "Field work + classes · 1 year",
        text: "Brought this through field surveys, rain, and a drop on concrete. Screen protector did its job and the phone never complained. I replaced the battery myself at month 10 using the official kit." },
      { id: "r-ve2", user: "Ivy N.", rating: 5, date: "2025-12-08", context: "General use · 1 year",
        text: "Small hands, small phone, big relief. Chipset is last year's but I honestly can't feel the difference for schoolwork." }
    ],
    issues: [
      { id: "i-ve1", title: "Battery drains faster on 5G standby", reportedBy: "Leo M.", date: "2026-05-23", status: "investigating", severity: "moderate" }
    ]
  },
  {
    id: "lumina-ultra-5g", brand: "Lumina", model: "Ultra 5G", category: "smartphones",
    price: 54995, rating: 4.7, reviewCount: 211, releaseYear: 2026, status: "published",
    tagline: "The no-compromise flagship",
    summary: "Top-tier performance, the best camera system on this list, and 7 years of updates — at a serious price.",
    image: "assets/placeholders/ph-smartphone-05.svg",
    specs: { "Display": "6.8\" LTPO AMOLED 2K, 120Hz", "Processor": "Current-gen flagship (3nm)", "RAM": "16 GB", "Storage": "512 GB", "Battery": "5,200 mAh, 90W", "Rear camera": "50 MP OIS + 48 MP ultrawide + 12 MP 5x tele", "Front camera": "32 MP", "OS": "Android 16 (7 OS updates)", "Weight": "213 g" },
    scored: { performance: 10, battery: 8.5, durability: 8.0, portability: 6.5, display: 10, camera: 10, storage: 9.5, repairability: 5.0 },
    value: { warrantyYears: 1, lifespanYears: 5, repairabilityLabel: "Moderate — parts locked to authorized centers" },
    strengths: ["Performance", "Camera", "Display", "7-year updates"],
    weaknesses: ["Price", "Heavy", "Large for one-handed use"],
    reviews: [
      { id: "r-lu1", user: "Gab T.", rating: 5, date: "2026-07-30", context: "Video editing · 4 months",
        text: "Editing thesis film footage on this is unreal. Price stung — I saved for two sems — but with 7 years of updates I'm calling it my last phone for the decade." },
      { id: "r-lu2", user: "Sheila B.", rating: 4, date: "2026-05-16", context: "General + photography · 3 months",
        text: "Everything is excellent but it is heavy in a small bag with a wallet case. Battery gets through my 8AM–6PM schedule with 20% left." }
    ],
    issues: []
  },

  /* ================= LAPTOPS ================= */
  {
    id: "novatek-probook-15", brand: "Novatek", model: "ProBook 15", category: "laptops",
    price: 32499, rating: 4.2, reviewCount: 174, releaseYear: 2025, status: "published",
    tagline: "The dependable default campus laptop",
    summary: "A balanced 15-inch workhorse for documents, browsing, light coding, and presentation days.",
    image: "assets/placeholders/ph-laptop-01.svg",
    specs: { "Display": "15.6\" IPS, 1080p", "Processor": "Ryzen 5 7000-series", "RAM": "16 GB DDR5 (1 slot free)", "Storage": "512 GB NVMe SSD", "Battery": "47 Wh · ~7 hrs light use", "Weight": "1.72 kg", "Ports": "USB-C, 2× USB-A, HDMI, SD", "OS": "Windows 11 Home" },
    scored: { performance: 7.0, battery: 7.0, durability: 7.0, portability: 6.0, display: 6.5, camera: 4.0, storage: 7.0, repairability: 8.5 },
    value: { warrantyYears: 1, lifespanYears: 4, repairabilityLabel: "Easy — bottom panel opens; RAM and SSD upgradeable" },
    strengths: ["Price", "Upgradability", "All-day battery for classes"],
    weaknesses: ["Display is dim outdoors", "Average webcam"],
    reviews: [
      { id: "r-np1", user: "Carlo J.", rating: 4, date: "2026-06-15", context: "BS Accountancy · 1 year",
        text: "Excel, Zoom, Chrome with 30 tabs — no complaints. I added an 8GB stick myself for ₱1,500 and it flies. Screen is hard to read beside a window though." },
      { id: "r-np2", user: "Faye W.", rating: 4, date: "2026-02-03", context: "Education major · 8 months",
        text: "Reliable for lesson plans and lectures. Battery still gets me through a 3-hour block. Webcam is grainy but I use my phone for that." }
    ],
    issues: [
      { id: "i-np1", title: "Fan audibly spins up during video calls", reportedBy: "Ramon A.", date: "2026-04-19", status: "investigating", severity: "minor" }
    ]
  },
  {
    id: "kaido-airbook-14", brand: "Kaido", model: "AirBook 14", category: "laptops",
    price: 39999, rating: 4.5, reviewCount: 158, releaseYear: 2026, status: "published",
    tagline: "Light, quiet, and lasts two class days",
    summary: "A 1.19 kg ultrabook with an OLED panel and genuine all-day battery — the commuter's pick.",
    image: "assets/placeholders/ph-laptop-02.svg",
    specs: { "Display": "14\" OLED, 1080p, 400 nits", "Processor": "Core Ultra 5", "RAM": "16 GB LPDDR5", "Storage": "512 GB NVMe SSD", "Battery": "63 Wh · ~12 hrs light use", "Weight": "1.19 kg", "Ports": "2× USB-C, USB-A, HDMI", "OS": "Windows 11 Home" },
    scored: { performance: 7.5, battery: 9.0, durability: 7.5, portability: 9.5, display: 9.0, camera: 5.0, storage: 7.0, repairability: 5.0 },
    value: { warrantyYears: 2, lifespanYears: 4.5, repairabilityLabel: "Moderate — soldered RAM; SSD replaceable" },
    strengths: ["Battery life", "Portability", "OLED display", "2-year warranty"],
    weaknesses: ["RAM not upgradeable", "Speakers are flat"],
    reviews: [
      { id: "r-ka1", user: "Nadine S.", rating: 5, date: "2026-07-09", context: "BS Psychology · 7 months",
        text: "I commute from Cavite and this is the first laptop that doesn't make my bag feel like a gym set. Battery survives my 8AM–7PM Tuesday and that's with note-taking and Netflix on the ride home." },
      { id: "r-ka2", user: "Erik D.", rating: 4, date: "2026-03-22", context: "Programming · 6 months",
        text: "Runs VS Code + browser + Docker lightly with no drama. Compiling bigger projects is where it breathes hard. OLED makes reading code at night easy on the eyes." }
    ],
    issues: []
  },
  {
    id: "aurio-studio-16", brand: "Aurio", model: "Studio 16", category: "laptops",
    price: 58900, rating: 4.6, reviewCount: 87, releaseYear: 2026, status: "published",
    tagline: "The design and video editing rig",
    summary: "A 16-inch creator laptop with a color-accurate display and dedicated graphics for heavy coursework.",
    image: "assets/placeholders/ph-laptop-03.svg",
    specs: { "Display": "16\" IPS, 2.5K, 100% sRGB", "Processor": "Core i7 H-series", "Graphics": "8 GB discrete GPU", "RAM": "32 GB DDR5", "Storage": "1 TB NVMe SSD", "Battery": "90 Wh · ~6 hrs light use", "Weight": "2.1 kg", "Ports": "USB-C (PD), 2× USB-A, HDMI 2.1, SD", "OS": "Windows 11 Home" },
    scored: { performance: 9.5, battery: 6.0, durability: 7.5, portability: 5.0, display: 9.5, camera: 5.0, storage: 9.5, repairability: 7.0 },
    value: { warrantyYears: 2, lifespanYears: 4.5, repairabilityLabel: "Moderate — two RAM slots and a free SSD bay" },
    strengths: ["Performance", "Display quality", "RAM/storage headroom"],
    weaknesses: ["Heavy", "Battery under load", "Charger is a brick"],
    reviews: [
      { id: "r-as1", user: "Josh M.", rating: 5, date: "2026-08-01", context: "Multimedia arts · 5 months",
        text: "Premiere and Blender run like the spec sheet promised. 32GB RAM means I never close my browser anymore. I do not bring this daily though — it stays in the dorm and the old laptop goes to class." },
      { id: "r-as2", user: "Lara Q.", rating: 4, date: "2026-05-28", context: "Architecture · 4 months",
        text: "SketchUp and rendering are smooth. On battery it throttles, so plan renders near an outlet. Screen calibration was accurate out of the box — passed our studio's color check." }
    ],
    issues: [
      { id: "i-as1", title: "Runs hot on the palm rest during long renders", reportedBy: "Vince O.", date: "2026-06-25", status: "confirmed", severity: "moderate" }
    ]
  },
  {
    id: "fiora-flexmate-13", brand: "Fiora", model: "FlexMate 13", category: "laptops",
    price: 45995, rating: 4.4, reviewCount: 64, releaseYear: 2025, status: "published",
    tagline: "The 2-in-1 for note-takers",
    summary: "A convertible with pen support that turns lecture slides into handwritten notes and back.",
    image: "assets/placeholders/ph-laptop-04.svg",
    specs: { "Display": "13.3\" IPS touchscreen, 1080p, 360° hinge", "Processor": "Core i5 U-series", "RAM": "16 GB LPDDR5", "Storage": "512 GB NVMe SSD", "Battery": "58 Wh · ~9 hrs light use", "Weight": "1.34 kg", "Ports": "2× USB-C, USB-A", "Stylus": "Included, magnetic attach", "OS": "Windows 11 Home" },
    scored: { performance: 6.5, battery: 8.0, durability: 8.0, portability: 9.0, display: 7.5, camera: 4.5, storage: 7.0, repairability: 4.5 },
    value: { warrantyYears: 1, lifespanYears: 4, repairabilityLabel: "Difficult — compact internals; service center repairs" },
    strengths: ["Pen + touch", "Portability", "Versatile hinge"],
    weaknesses: ["Performance ceiling", "Only USB-C fast ports"],
    reviews: [
      { id: "r-ff1", user: "Bea M.", rating: 5, date: "2026-04-11", context: "Medtech · 1 year",
        text: "Annotating lecture PDFs with the pen changed how I study — everything is in OneNote, searchable. Hinge still feels tight after a year of tablet mode every day." },
      { id: "r-ff2", user: "Ryan K.", rating: 4, date: "2025-12-19", context: "Business analytics · 10 months",
        text: "Great for notes and light spreadsheets. You feel the i5 when multitasking with big Excel files, but for the pen and form factor I'd take the trade-off again." }
    ],
    issues: [
      { id: "i-ff1", title: "Pen tip wears quickly with heavy use", reportedBy: "Cheska L.", date: "2026-03-08", status: "resolved", severity: "minor" }
    ]
  },
  {
    id: "vantor-gamebook-15", brand: "Vantor", model: "GameBook 15", category: "laptops",
    price: 49990, rating: 4.3, reviewCount: 132, releaseYear: 2025, status: "published",
    tagline: "Value gaming that doubles as an engineering workstation",
    summary: "A discrete-GPU laptop that runs CAD, simulations, and games — bulky, but honest value per peso.",
    image: "assets/placeholders/ph-laptop-05.svg",
    specs: { "Display": "15.6\" IPS, 1080p 144Hz", "Processor": "Ryzen 7 H-series", "Graphics": "6 GB discrete GPU", "RAM": "16 GB DDR5 (2 slots)", "Storage": "512 GB NVMe SSD + free bay", "Battery": "57 Wh · ~4 hrs light use", "Weight": "2.3 kg", "Ports": "USB-C, 3× USB-A, HDMI, LAN", "OS": "Windows 11 Home" },
    scored: { performance: 8.5, battery: 4.5, durability: 7.5, portability: 4.0, display: 7.5, camera: 4.0, storage: 7.5, repairability: 8.5 },
    value: { warrantyYears: 2, lifespanYears: 4, repairabilityLabel: "Easy — two RAM slots, free SSD bay, standard parts" },
    strengths: ["Raw performance per peso", "Upgradeability", "High refresh display"],
    weaknesses: ["Battery life", "Weight", "Loud fans"],
    reviews: [
      { id: "r-vg1", user: "Marco E.", rating: 4, date: "2026-06-08", context: "Computer Engineering · 1 year",
        text: "Runs Quartus, MATLAB, and my ML notebooks without crying. Battery is a joke unplugged — budget maybe 3 hours of notes max. But as a desktop replacement for the dorm, sulit." },
      { id: "r-vg2", user: "Tim A.", rating: 5, date: "2026-01-30", context: "IT · 1 year",
        text: "League between classes, thesis VMs at night. The LAN port is actually useful for our lab. Added a second SSD for ₱2,800, tools included in the box." }
    ],
    issues: [
      { id: "i-vg1", title: "Stock thermal paste dries within a year; runs hotter", reportedBy: "Gio P.", date: "2026-07-15", status: "investigating", severity: "moderate" }
    ]
  },

  /* ================= TABLETS ================= */
  {
    id: "kaido-pad-mini", brand: "Kaido", model: "Pad Mini", category: "tablets",
    price: 13499, rating: 4.3, reviewCount: 119, releaseYear: 2025, status: "published",
    tagline: "The budget reader-and-notes tablet",
    summary: "An 8.8-inch tablet light enough for one-hand reading, with pen support at a student price.",
    image: "assets/placeholders/ph-tablet-01.svg",
    specs: { "Display": "8.8\" IPS, 1080p, 90Hz", "Processor": "Mid-range 6nm chipset", "RAM": "6 GB", "Storage": "128 GB + microSD", "Battery": "6,650 mAh · ~11 hrs reading", "Weight": "372 g", "Stylus": "Optional pen (₱1,999)", "OS": "Android 15" },
    scored: { performance: 6.0, battery: 8.5, durability: 6.5, portability: 9.5, display: 7.0, camera: 3.5, storage: 6.5, repairability: 5.5 },
    value: { warrantyYears: 1, lifespanYears: 3.5, repairabilityLabel: "Moderate — screen replacement common part" },
    strengths: ["Portability", "Battery", "Price"],
    weaknesses: ["Small for split-screen", "Plastic back", "Camera useless"],
    reviews: [
      { id: "r-kp1", user: "Trina Y.", rating: 4, date: "2026-05-20", context: "Nursing · 9 months",
        text: "Perfect size for reviewing e-books on the LRT. I read one-handed while standing. Split-screen for video + notes is cramped, but I mainly bought it to read." },
      { id: "r-kp2", user: "Dom S.", rating: 4, date: "2026-02-27", context: "General · 8 months",
        text: "Battery lasts a whole weekend of casual use. Got the optional pen for sticky-note reviewing — works fine, but note the pen costs extra." }
    ],
    issues: []
  },
  {
    id: "aurio-tab-11", brand: "Aurio", model: "Tab 11", category: "tablets",
    price: 18999, rating: 4.4, reviewCount: 142, releaseYear: 2026, status: "published",
    tagline: "The balanced study tablet",
    summary: "An 11-inch 2K display with quad speakers and pen support — the default classroom companion.",
    image: "assets/placeholders/ph-tablet-02.svg",
    specs: { "Display": "11\" IPS, 2K, 120Hz", "Processor": "Snapdragon 6-series (6nm)", "RAM": "8 GB", "Storage": "128 GB + microSD", "Battery": "8,000 mAh · ~12 hrs video", "Weight": "480 g", "Stylus": "Included", "Speakers": "Quad, tuned for lectures", "OS": "Android 16" },
    scored: { performance: 6.5, battery: 8.5, durability: 7.0, portability: 8.5, display: 8.5, camera: 4.0, storage: 7.0, repairability: 6.0 },
    value: { warrantyYears: 1, lifespanYears: 4, repairabilityLabel: "Moderate — standard parts, third-party shops handle screens" },
    strengths: ["Display", "Speakers", "Included stylus", "Battery"],
    weaknesses: ["Mid performance for the price", "No official keyboard in box"],
    reviews: [
      { id: "r-at1", user: "Jasmine H.", rating: 5, date: "2026-07-19", context: "Education · 5 months",
        text: "I record lectures while taking notes with the included pen and the audio playback is clear even at the back of the room. Battery is a two-day affair with my usage." },
      { id: "r-at2", user: "Basti R.", rating: 4, date: "2026-03-14", context: "General · 4 months",
        text: "Screen is lovely for the price. Streaming + doc + music all at once is fine, heavy games less so. Keyboard sold separately adds to the real cost — factor that in." }
    ],
    issues: [
      { id: "i-at1", title: "Speaker rattle at max volume after a few months", reportedBy: "Angel U.", date: "2026-06-02", status: "investigating", severity: "minor" }
    ]
  },
  {
    id: "lumina-tab-pro-129", brand: "Lumina", model: "Tab Pro 12.9", category: "tablets",
    price: 41999, rating: 4.7, reviewCount: 78, releaseYear: 2026, status: "published",
    tagline: "Laptop-grade tablet for serious digital art",
    summary: "A 12.9-inch 120Hz OLED canvas with desktop-class silicon for art students and heavy multitaskers.",
    image: "assets/placeholders/ph-tablet-03.svg",
    specs: { "Display": "12.9\" OLED, 120Hz", "Processor": "Desktop-class tablet silicon", "RAM": "12 GB", "Storage": "256 GB", "Battery": "10,090 mAh · ~10 hrs", "Weight": "582 g", "Stylus": "Low-latency pen, included", "OS": "Latest tablet OS (5+ yrs updates)" },
    scored: { performance: 9.5, battery: 8.0, durability: 7.5, portability: 7.5, display: 10, camera: 7.0, storage: 7.5, repairability: 4.0 },
    value: { warrantyYears: 1, lifespanYears: 5, repairabilityLabel: "Difficult — glued assembly; authorized service only" },
    strengths: ["Display", "Performance", "Long update support"],
    weaknesses: ["Price", "Accessories expensive", "Repair difficulty"],
    reviews: [
      { id: "r-lt1", user: "Kianna F.", rating: 5, date: "2026-08-06", context: "Fine Arts · 3 months",
        text: "This replaced my portable drawing monitor. The pen latency is genuinely invisible now. Expensive, but it also runs my editing apps better than my old laptop did." },
      { id: "r-lt2", user: "Chino D.", rating: 4, date: "2026-05-04", context: "Architecture · 4 months",
        text: "Great as a second screen and sketchbook. Just know the official keyboard case is almost ₱9K — the tablet alone isn't the whole story on cost." }
    ],
    issues: [
      { id: "i-lt1", title: "Pen pairing drops after OS update (fixed in patch)", reportedBy: "Mau G.", date: "2026-04-22", status: "resolved", severity: "minor" }
    ]
  },

  /* ================= HEADPHONES ================= */
  {
    id: "novatek-buds-pro-3", brand: "Novatek", model: "Buds Pro 3", category: "headphones",
    price: 5499, rating: 4.2, reviewCount: 264, releaseYear: 2025, status: "published",
    tagline: "ANC earbuds at a student price",
    summary: "Effective noise canceling for commute and library use, with a pocketable case and multipoint pairing.",
    image: "assets/placeholders/ph-headphones-01.svg",
    specs: { "Type": "True wireless, in-ear", "Noise canceling": "Active ANC + transparency", "Battery": "7 hrs buds · 28 hrs with case", "Codecs": "AAC, SBC, LDAC", "Water resistance": "IPX5", "Multipoint": "Yes — laptop + phone", "Weight": "4.8 g per bud" },
    scored: { performance: 7.0, battery: 8.0, durability: 6.5, portability: 10, display: 0, camera: 0, storage: 0, repairability: 3.0 },
    value: { warrantyYears: 1, lifespanYears: 2.5, repairabilityLabel: "None — sealed buds; battery is consumable" },
    strengths: ["ANC at this price", "Multipoint", "Portability"],
    weaknesses: ["Ear tips wear out", "No repair path"],
    reviews: [
      { id: "r-nb1", user: "Cee J.", rating: 5, date: "2026-06-27", context: "Commute + library · 1 year",
        text: "ANC kills most jeepney engine noise. Multipoint between my phone and laptop during online exams is seamless. Case hinge is still tight after a year of pocket life." },
      { id: "r-nb2", user: "Wendy L.", rating: 3, date: "2026-01-09", context: "Online classes · 1 year",
        text: "Sound is good but the small ear tips caused me discomfort after an hour. Battery dropped to ~5.5 hrs by month 10 — normal for buds but plan for it." }
    ],
    issues: [
      { id: "i-nb1", title: "Left bud charging contact oxidizes; intermittent", reportedBy: "Noel V.", date: "2026-05-09", status: "confirmed", severity: "moderate" }
    ]
  },
  {
    id: "aurio-studiocans-40", brand: "Aurio", model: "StudioCans 40", category: "headphones",
    price: 9995, rating: 4.5, reviewCount: 97, releaseYear: 2025, status: "published",
    tagline: "Over-ear comfort for long study nights",
    summary: "Light over-ears with a neutral tuning, replaceable pads, and a wired mode that never runs out of battery.",
    image: "assets/placeholders/ph-headphones-02.svg",
    specs: { "Type": "Over-ear, closed-back", "Noise canceling": "Passive isolation", "Battery": "40 hrs wireless · wired mode unlimited", "Codecs": "AAC, SBC", "Pads": "User-replaceable", "Foldable": "Yes, with hard case", "Weight": "254 g" },
    scored: { performance: 7.5, battery: 9.0, durability: 8.0, portability: 7.5, display: 0, camera: 0, storage: 0, repairability: 7.0 },
    value: { warrantyYears: 2, lifespanYears: 3.5, repairabilityLabel: "Easy — replaceable pads, detachable cable" },
    strengths: ["Comfort for long sessions", "Battery", "Repairable"],
    weaknesses: ["No ANC", "Neutral sound may feel flat to bass fans"],
    reviews: [
      { id: "r-as40-1", user: "Pia C.", rating: 5, date: "2026-07-02", context: "Review nights · 8 months",
        text: "Wore these through board-exam review season, 6-hour stretches, no ear fatigue. When I forgot to charge, the included cable saved me. Pads are ₱400 to replace — I love that." },
      { id: "r-as40-2", user: "Ike M.", rating: 4, date: "2026-02-14", context: "Music + study · 7 months",
        text: "Sound is clean and balanced; if you want heavy bass this isn't it. Build feels sturdier than the price suggests." }
    ],
    issues: []
  },
  {
    id: "kaido-wave-700", brand: "Kaido", model: "Wave 700", category: "headphones",
    price: 14990, rating: 4.6, reviewCount: 156, releaseYear: 2026, status: "published",
    tagline: "Reference ANC for the daily commuter",
    summary: "Top-tier active noise canceling with adaptive transparency and a 30-hour battery.",
    image: "assets/placeholders/ph-headphones-03.svg",
    specs: { "Type": "Over-ear, closed-back", "Noise canceling": "Adaptive ANC + transparency", "Battery": "30 hrs ANC on · wired fallback", "Codecs": "AAC, SBC, LDAC", "App": "EQ presets, wear detection", "Foldable": "Flat-fold, travel case", "Weight": "268 g" },
    scored: { performance: 8.5, battery: 8.5, durability: 7.5, portability: 8.0, display: 0, camera: 0, storage: 0, repairability: 4.5 },
    value: { warrantyYears: 2, lifespanYears: 3.5, repairabilityLabel: "Moderate — pads replaceable; hinges serviceable at centers" },
    strengths: ["ANC quality", "Sound", "Travel-friendly"],
    weaknesses: ["Price", "App required for EQ"],
    reviews: [
      { id: "r-kw1", user: "Sandy O.", rating: 5, date: "2026-08-10", context: "Commute · 6 months",
        text: "Bus rides are silent. I've stopped playing rain sounds to study in noisy cafés. Transparency mode is clear enough for announcements without removing them." },
      { id: "r-kw2", user: "Borg T.", rating: 4, date: "2026-04-30", context: "Online classes · 5 months",
        text: "Mic quality on calls surprised my groupmates. Clamps slightly at first but loosened after a week. Expensive but the ANC is the real deal." }
    ],
    issues: [
      { id: "i-kw1", title: "Headband stitching frays with heavy bag storage", reportedBy: "Lils A.", date: "2026-06-18", status: "investigating", severity: "minor" }
    ]
  },

  /* ================= POWER BANKS ================= */
  {
    id: "vantor-chargepack-20k", brand: "Vantor", model: "ChargePack 20K", category: "powerbanks",
    price: 1799, rating: 4.5, reviewCount: 342, releaseYear: 2025, status: "published",
    tagline: "The default 20,000 mAh class companion",
    summary: "20,000 mAh, 22.5W fast charge, and a digital readout — enough for two phone refills and then some.",
    image: "assets/placeholders/ph-powerbank-01.svg",
    specs: { "Capacity": "20,000 mAh", "Output": "22.5W (USB-C PD + USB-A)", "Ports": "USB-C in/out, 2× USB-A", "Display": "Digital % readout", "Recharge time": "~5.5 hrs (20W input)", "Weight": "410 g", "Airline safe": "Yes (74 Wh)" },
    scored: { performance: 8.0, battery: 9.0, durability: 7.5, portability: 7.0, display: 0, camera: 0, storage: 0, repairability: 4.0 },
    value: { warrantyYears: 1, lifespanYears: 3, repairabilityLabel: "None — sealed cells; replace the unit when degraded" },
    strengths: ["Capacity per peso", "Digital readout", "Charges 3 devices"],
    weaknesses: ["Heavy in a small bag", "Slow to recharge itself at stock cable"],
    reviews: [
      { id: "r-vc1", user: "Jules R.", rating: 5, date: "2026-07-11", context: "Daily commute · 1 year",
        text: "Survives a 3-day org retreat with everyone borrowing it. The % readout is more useful than I expected — no guessing. Still holds ~90% capacity after a year of daily use." },
      { id: "r-vc2", user: "Aina Z.", rating: 4, date: "2026-03-05", context: "Field work · 9 months",
        text: "Reliable and cheap. It is heavy though — you feel it in a tote. Charging the bank itself takes almost a whole night with the included cable." }
    ],
    issues: [
      { id: "i-vc1", title: "Included cable degrades at the connector within months", reportedBy: "Renz B.", date: "2026-04-28", status: "resolved", severity: "minor" }
    ]
  },
  {
    id: "novatek-powergo-100w", brand: "Novatek", model: "PowerGo 100W", category: "powerbanks",
    price: 3299, rating: 4.6, reviewCount: 187, releaseYear: 2026, status: "published",
    tagline: "Laptop charging for long library days",
    summary: "100W PD output that genuinely charges USB-C laptops and tablets — the dorm-to-library power plan.",
    image: "assets/placeholders/ph-powerbank-02.svg",
    specs: { "Capacity": "24,000 mAh", "Output": "100W PD 3.1 (USB-C), 30W (USB-C#2)", "Ports": "2× USB-C in/out, USB-A", "Display": "Wattage + % readout", "Recharge time": "~1.8 hrs (65W input)", "Weight": "525 g", "Airline safe": "Yes (86.4 Wh)" },
    scored: { performance: 9.0, battery: 9.0, durability: 8.0, portability: 6.5, display: 0, camera: 0, storage: 0, repairability: 4.0 },
    value: { warrantyYears: 1.5, lifespanYears: 3.5, repairabilityLabel: "None — sealed; long warranty offsets it" },
    strengths: ["Laptop charging", "Fast self-recharge", "Wattage display"],
    weaknesses: ["Price for a power bank", "Weight"],
    reviews: [
      { id: "r-np100-1", user: "Drei S.", rating: 5, date: "2026-07-26", context: "Architecture studio · 4 months",
        text: "Charges my laptop at ~70W while I render — the readout shows it live. One bank covers a full studio day off-grid. Heavier than the cheap ones but that's the physics." },
      { id: "r-np100-2", user: "Kayla P.", rating: 4, date: "2026-05-15", context: "IT · 3 months",
        text: "Recharges itself in under 2 hours with a GaN brick, which no 20K bank I owned did. Price is steep but it replaced a generator run at our thesis site visit." }
    ],
    issues: []
  },

  /* ================= SMARTWATCHES ================= */
  {
    id: "aurio-fitwatch-5", brand: "Aurio", model: "FitWatch 5", category: "smartwatches",
    price: 6990, rating: 4.3, reviewCount: 203, releaseYear: 2025, status: "published",
    tagline: "Two weeks of battery, basic tracking done right",
    summary: "A focused fitness watch with 14-day battery, GPS, and silent alarms that actually respect your sleep.",
    image: "assets/placeholders/ph-watch-01.svg",
    specs: { "Display": "1.43\" AMOLED", "Battery": "14 days typical use", "GPS": "Built-in", "Water resistance": "5 ATM", "Sensors": "HR, SpO2, sleep, stress", "Calls": "Notifications only", "Weight": "36 g (no strap)" },
    scored: { performance: 6.0, battery: 10, durability: 8.0, portability: 10, display: 7.5, camera: 0, storage: 0, repairability: 3.5 },
    value: { warrantyYears: 1, lifespanYears: 3, repairabilityLabel: "None — sealed unit; straps and chargers widely available" },
    strengths: ["Battery", "Price", "Durability (5 ATM)"],
    weaknesses: ["No calls/replies", "Basic watchfaces"],
    reviews: [
      { id: "r-af1", user: "Maya D.", rating: 5, date: "2026-06-14", context: "Jogging + classes · 1 year",
        text: "Charge it every two weeks, that's the whole maintenance routine. Silent alarm wakes me without waking my roommate. GPS locks fast for my morning runs." },
      { id: "r-af2", user: "Franz H.", rating: 4, date: "2026-01-25", context: "General · 10 months",
        text: "Does the fitness basics honestly. You can't reply to messages — it's a tracker first. Screen is bright enough under the noon sun at the oval." }
    ],
    issues: []
  },
  {
    id: "kaido-pulse-s", brand: "Kaido", model: "Pulse S", category: "smartwatches",
    price: 11999, rating: 4.4, reviewCount: 121, releaseYear: 2026, status: "published",
    tagline: "The mini smartphone on your wrist",
    summary: "Wearable-grade OS with app support, on-wrist calls, and 5-day battery — the connected pick.",
    image: "assets/placeholders/ph-watch-02.svg",
    specs: { "Display": "1.6\" AMOLED, sapphire coating", "Battery": "5 days typical use", "GPS": "Built-in, dual-band", "Water resistance": "5 ATM + IP68", "Calls": "Bluetooth calling + quick replies", "Storage": "8 GB (music offline)", "ECG": "Yes", "Weight": "44 g" },
    scored: { performance: 7.5, battery: 7.0, durability: 8.5, portability: 10, display: 8.5, camera: 0, storage: 0, repairability: 3.5 },
    value: { warrantyYears: 1, lifespanYears: 3.5, repairabilityLabel: "None — sealed; official strap ecosystem" },
    strengths: ["Wearable OS + apps", "Calls on wrist", "Build quality"],
    weaknesses: ["Needs nightly-ish charging", "Price"],
    reviews: [
      { id: "r-kps1", user: "Tin B.", rating: 4, date: "2026-08-02", context: "Clinical duties · 4 months",
        text: "Quick replies during duty hours when my phone must stay in the locker — this alone justified it. Battery gets me through a 4-day week, charging Sunday night." },
      { id: "r-kps2", user: "Otep C.", rating: 5, date: "2026-04-09", context: "Running + classes · 5 months",
        text: "Dual-band GPS tracked my half-marathon accurately against the official timing chip. Sapphire glass still flawless in a bag with keys." }
    ],
    issues: [
      { id: "i-kps1", title: "Battery drops ~15% after latest firmware (patch promised)", reportedBy: "Gil A.", date: "2026-07-08", status: "investigating", severity: "minor" }
    ]
  }
];

/* ============================================================
   Real-product additions — ported from the fac3629 prototype.
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

GW.gadgets.push(...GW.realGadgetEntries);

/* ---------- Reported issues for gadgets without one (pool for admin) ---------- */
GW.extraIssues = [
  { id: "i-gen1", gadget: "lumina-ultra-5g", title: "Stock charger overheats with third-party cables", reportedBy: "Uly B.", date: "2026-06-05", status: "pending", severity: "moderate" },
  { id: "i-gen2", gadget: "kaido-airbook-14", title: "Hinge squeaks after months of tablet-style opening", reportedBy: "Rhea T.", date: "2026-06-21", status: "pending", severity: "minor" },
  { id: "i-gen3", gadget: "kaido-pad-mini", title: "microSD occasionally unmounts when battery is low", reportedBy: "Pat L.", date: "2026-07-01", status: "pending", severity: "minor" }
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
  { id: "pr1", gadget: "aurio-x9-pro",       user: "Miguel Cruz",    rating: 5, date: "2026-09-01", status: "pending", text: "Third month with this as my main org-camera phone. Shutter lag is gone compared to my old phone, and editing straight on device is fast. Only complaint is smudges — clean it hourly or it looks greasy in photos of the phone itself." },
  { id: "pr2", gadget: "vantor-chargepack-20k", user: "Rina Prado",  rating: 4, date: "2026-09-03", status: "pending", text: "Bought this for thesis fieldwork in the province. Two full days of drone controller + phone charging. Gauge stayed accurate. Minus one star because the rubber shell collects lint like crazy." },
  { id: "pr3", gadget: "kaido-airbook-14",   user: "Bea Mercado",    rating: 4, date: "2026-09-05", status: "pending", text: "One sem in. Still on one charge per day, still doesn't get hot on my lap during 3-hour lectures. Windows updates once interrupted a recording, but that's Windows, not the laptop." },
  { id: "pr4", gadget: "kaido-wave-700",     user: "Dennis Lim",     rating: 2, date: "2026-09-06", status: "pending", text: "ANC stopped working on the right side after 5 months. Service center says 3 weeks turnaround. Sound without ANC is fine, but I paid for the ANC." },
  { id: "pr5", gadget: "novatek-probook-15", user: "Ramon Alcantara",rating: 5, date: "2026-09-08", status: "pending", text: "Upgraded the RAM as suggested here in the reviews and now it runs our accounting software + 20 tabs fine. This site's repairability score is what sold me. One year in, zero problems." },
  { id: "pr6", gadget: "aurio-fitwatch-5",   user: "Hazel Ventura",  rating: 4, date: "2026-09-09", status: "pending", text: "Battery claim is real — 13 days on my usage. Sleep tracking matches how I actually feel. Wish it could reply to messages, but at this price I'm satisfied." },
  { id: "pr7", gadget: "lumina-tab-pro-129", user: "Andrea Villanueva", rating: 5, date: "2026-09-10", status: "pending", text: "Bought after the recommendation tool scored it 91 for graphic design. It was right. Drawing for 4+ hours, no lag, no heat. Save up for the official keyboard though — third-party ones feel mushy." }
];

/* ---------- Admin dashboard metrics (mock) ---------- */
GW.adminMetrics = {
  totalUsers: 2438,
  totalGadgets: GW.gadgets.length,
  totalReviews: GW.gadgets.reduce((n, g) => n + g.reviews.length, 0) + GW.pendingReviews.length,
  pendingReviews: GW.pendingReviews.length,
  openIssues: 9,
  pageViewsThisMonth: 48213,
  // most viewed (page views per gadget, this month)
  views: [
    { id: "kaido-airbook-14", views: 4820 }, { id: "aurio-x9-pro", views: 4310 },
    { id: "novatek-probook-15", views: 3960 }, { id: "lumina-ultra-5g", views: 3544 },
    { id: "novatek-spark-5g", views: 3102 }, { id: "aurio-tab-11", views: 2478 },
    { id: "vantor-gamebook-15", views: 2211 }, { id: "kaido-note-12-lite", views: 1980 }
  ],
  comparisons: [
    { id: "kaido-airbook-14", count: 1840 }, { id: "novatek-probook-15", count: 1615 },
    { id: "aurio-studio-16", count: 1204 }, { id: "vantor-gamebook-15", count: 1178 },
    { id: "aurio-x9-pro", count: 1102 }, { id: "novatek-spark-5g", count: 864 }
  ],
  recommended: [
    { id: "novatek-probook-15", count: 942 }, { id: "kaido-airbook-14", count: 901 },
    { id: "novatek-spark-5g", count: 776 }, { id: "aurio-tab-11", count: 523 },
    { id: "vantor-chargepack-20k", count: 468 }, { id: "aurio-x9-pro", count: 401 }
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

/* Seeded history for the prototype account (mock) */
GW.seedCompareHistory = [
  { id: "ch1", date: "2026-08-14", items: ["novatek-probook-15", "kaido-airbook-14"] },
  { id: "ch2", date: "2026-08-29", items: ["aurio-x9-pro", "kaido-note-12-lite", "lumina-ultra-5g"] }
];
GW.seedRecommendationHistory = [
  { id: "rh1", date: "2026-09-10", budget: 45000, use: "graphic-design",
    top: { id: "lumina-tab-pro-129", score: 91 } }
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
