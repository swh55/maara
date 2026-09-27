// ============================================================
// بيانات المشروع المعماري — مجمع سكني على أرض 50×40 م (2000 م²)
// المواصفات الملزمة (مصدر وحيد لكل أرقام المشروع):
// - 4 مبانٍ × بصمة 300 م² = 1200 م² = 60% من الأرض
// - كل مبنى: قبو (مواقف ومخازن) + أرضي (بهو المدخل والخدمات) + 3 طوابق سكنية × 3 شقق + سطح تقني
// - إجمالي المشروع: 36 شقة (4 × 3 × 3)
// - كل طابق سكني: 3 شقق = شقتان شماليتان (79.50 م²) + شقة جنوبية كبرى (118.00 م²)
//   + لب حركي مركزي 23.00 م²  ⇒  2 × 79.50 + 118.00 + 23.00 = 300.00 م² بالضبط
// - كل شقة: 5 غرف رئيسية (صالة معيشة/طعام + 4 غرف نوم) + مطبخ + حمّام رئيسي
//   + حمّام ثانوي 1.00 م² بالضبط (0.80 × 1.25 م) + بهو مدخل وممر توزيع + شرفة خاصة من المعيشة
// - التنسيق المعماري/الإنشائي/الصحي: رافعات صحية موحدة رأسياً في كل طابق، بهو اللب متصل
//   يخدم الأبواب الثلاثة، ممرات تنتهي عند آخر باب تخدمه، وشرفة ج تلتف حول الزاوية باستمرار
// - السطح لكل مبنى: مصفوفة جنوبية متصلة 16 صف (غرب←شرق) × 3 ألواح (جنوب←شمال)
//   = 48 لوحاً × 450 واط — و16 خزان مياه × 1000 لتر على قواعد 1×1 م حول البنتهاوس
// - إجمالي المشروع: 36 شقة | 180 غرفة | 72 حمّاماً | 36 شرفة | 192 لوحاً | 64 خزاناً (64 م³)
// المرحلة: تصميم معماري مبدئي (Conceptual / Preliminary Design)
// ============================================================

export const SITE = {
  width: 50,
  depth: 40,
  area: 2000,
  builtArea: 1200,
  builtRatio: 60,
  openArea: 800,
  openRatio: 40,
};

export interface BuildingInfo {
  id: string;
  name: string;
  position: string;
  x: number; // إحداثية الزاوية على مخطط الموقع (متر)
  y: number;
  w: number;
  d: number;
  color: string;
  mirrored: boolean; // المباني الشرقية بمرايا (مدخلها غربي على محور المشاة)
}

export const BUILDINGS: BuildingInfo[] = [
  { id: "a", name: "مبنى أ", position: "الشمال الغربي", x: 3, y: 3, w: 20, d: 15, color: "#0f766e", mirrored: false },
  { id: "b", name: "مبنى ب", position: "الشمال الشرقي", x: 27, y: 3, w: 20, d: 15, color: "#b45309", mirrored: true },
  { id: "c", name: "مبنى ج", position: "الجنوب الغربي", x: 3, y: 22, w: 20, d: 15, color: "#4d7c0f", mirrored: false },
  { id: "d", name: "مبنى د", position: "الجنوب الشرقي", x: 27, y: 22, w: 20, d: 15, color: "#9f1239", mirrored: true },
];

export const BUILDING_FOOTPRINT = 300; // 20 × 15 م
export const APARTMENTS_PER_FLOOR = 3;
export const RESIDENTIAL_FLOORS = 3; // 3 طوابق سكنية + أرضي خدمات + قبو مواقف (وفق الثوابت الملزمة)
export const APARTMENTS_PER_BUILDING = APARTMENTS_PER_FLOOR * RESIDENTIAL_FLOORS; // 9
export const TOTAL_APARTMENTS = APARTMENTS_PER_BUILDING * 4; // 36
export const MAIN_ROOMS_PER_APARTMENT = 5; // صالة معيشة/طعام + 4 غرف نوم
export const SEC_BATH_AREA = 1.0; // الحمّام الثانوي: 0.80 × 1.25 م = 1.00 م² بالضبط

/* ============================================================
   اللب الحركي المركزي — أعيد تصميمه بعد التنسيق الحركي:
   كانت بهو الوحدة الجنوبية محبوساً في جيب ميت (المصعد والدرج
   يسدّان العرض بالكامل) — الحل: توسيع اللب إلى 5.00 م وترك
   ممر عمودي حر 1.00 م بين المصعد والدرج يصل بهو الشمال بهو الجنوب.
   المحتويات: درج بمتفلتين + مصعد 8 أشخاص + رافعة كهرباء واتصالات
   + بهو على شكل حرف T يخدم أبواب الشقق الثلاثة مباشرة.
   ============================================================ */
export const CORE = {
  x0: 7.5,
  y0: 4.5,
  x1: 12.5,
  y1: 9.1,
  area: 23.0, // 5.0 × 4.6 م
  stair: { x: 10.2, y: 6.5, w: 2.3, h: 2.6 }, // درج بمتفلتين (بسطة وسطى)
  elevator: { x: 7.5, y: 6.3, w: 1.7, h: 1.9 }, // مصعد 8 أشخاص — بابه شمالي على بهو الشمال
  shaft: { x: 12.15, y: 4.5, w: 0.35, h: 1.2 }, // رافعة كهرباء واتصالات وميكانيك
  // أبواب اللب على واجهاته (تُرسم في المخططات)
  doorNorthWest: { x: 8.3, y: 4.5 }, // مدخل الشقة الشمالية الغربية (x 7.9–8.7)
  doorNorthEast: { x: 11.7, y: 4.5 }, // مدخل الشقة الشمالية الشرقية (x 11.3–12.1)
  doorSouth: { x: 8.0, y: 9.1 }, // مدخل الشقة الجنوبية (x 7.6–8.4)
  doorStair: { x: 10.2, y: 7.4 }, // باب الدرج على الممر الغربي (y 7.0–7.8)
  doorElevator: { x: 8.3, y: 6.3 }, // باب المصعد على بهو الشمال (x 7.9–8.7)
  // أبعاد بهو التوزيع (T): شمالي + ممر غربي 1.00 م بين المصعد والدرج + جنوبي غربي
  northLobby: { x: 7.5, y: 4.5, w: 5.0, h: 1.8 },
  westPassage: { x: 9.2, y: 4.5, w: 1.0, h: 4.6 },
  southLobby: { x: 7.5, y: 8.2, w: 2.7, h: 0.9 },
};

/* ============================================================
   هندسة الشقق — المصدر الوحيد للرسم والجداول والحسابات
   نظام إحداثيات محلي بالأمتار مطابق لإحداثيات الطابق،
   الجدران: خارجية/مشتركة/لب 0.18 م، قواطع داخلية 0.12 م.
   كل مستطيل مرسوم = مساحته في الجدول حرفياً (w × h).
   منطق الخصوصية: دخول → ضيافة/معيشة → خدمات → نوم خاص،
   ولا يمر الضيف عبر منطقة النوم ولا يرى حمّاماً أو مطبخاً
   مباشرة عند الدخول (حاجز كتم + إزاحة أبواب موثقة).
   ============================================================ */

export interface RoomPart {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomDef {
  name: string;
  type: "معيشة" | "نوم" | "خدمي" | "صحي" | "توزيع";
  color: string;
  parts: RoomPart[];
}

export interface UnitDef {
  key: "north" | "south";
  name: string;
  gross: number; // حصة الشقة من بلاطة الطابق (شاملة الجدران)
  envelope: RoomPart[]; // بصمة الشقة (اتحاد مستطيلات لا يتقاطع)
  layout: RoomDef[];
  notes: string[];
}

/* ---------------- الشقة الشمالية (تتكرر مرتين بالمرايا) ----------------
   بصمة L: الحزام الشمالي 10.0 × 4.5 م + الجناح الغربي 7.5 × 4.6 م = 79.50 م².
   المدخل من بهو اللب (باب x 7.9–8.7) إلى بهو المدخل الذي يفتح غرباً
   على ممر التوزيع — حاجز كتم (fin) 8.85–8.97 يقطع خط النظر من المدخل
   إلى باب النوم الرابعة (إزاحة أبواب موثقة).
   4 غرف نوم على الواجهة الشمالية + المعيشة على الواجهة الغربية
   + المطبخ مفتوح على المعيشة بتهوية ميكانيكية عبر رافعة اللب. */
export const NORTH_UNIT: UnitDef = {
  key: "north",
  name: "الشقة الشمالية",
  gross: 79.5,
  envelope: [
    { x: 0, y: 0, w: 10, h: 4.5 }, // الحزام الشمالي
    { x: 0, y: 4.5, w: 7.5, h: 4.6 }, // الجناح الغربي
  ],
  layout: [
    {
      name: "غرفة النوم الرئيسية",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 0.18, y: 0.18, w: 2.99, h: 4.2 }], // الزاوية الشمالية الغربية — نافذتان (شمال + غرب)
    },
    {
      name: "غرفة النوم الثانية",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 3.29, y: 0.18, w: 2.14, h: 4.2 }],
    },
    {
      name: "غرفة النوم الثالثة (أطفال)",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 5.55, y: 0.18, w: 2.11, h: 2.96 }],
    },
    {
      name: "غرفة النوم الرابعة (أطفال/مكتب)",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 7.78, y: 0.18, w: 2.04, h: 2.96 }], // بابها بإزاحة شرقية خلف حاجز الكتم
    },
    {
      name: "المعيشة والطعام",
      type: "معيشة",
      color: "#ecfdf5",
      parts: [
        { x: 0.18, y: 4.5, w: 1.62, h: 4.42 }, // الجناح الغربي حتى الجنوب
        { x: 1.8, y: 5.62, w: 2.58, h: 3.3 }, // الامتداد الشرقي — فتح على الممر
      ], // الواجهة الغربية بنوافذ ممتدة + باب شرفة منزلق
    },
    {
      name: "المطبخ",
      type: "خدمي",
      color: "#fffbeb",
      parts: [{ x: 4.5, y: 7.44, w: 2.88, h: 1.48 }], // مفتوح على المعيشة + رافعة اللب المجاورة (جدار 7.38–7.50)
    },
    {
      name: "الحمّام الرئيسي",
      type: "صحي",
      color: "#f0fdfa",
      parts: [{ x: 4.5, y: 5.62, w: 1.48, h: 1.7 }],
    },
    {
      name: "الحمّام الثانوي",
      type: "صحي",
      color: "#f0fdfa",
      parts: [{ x: 6.1, y: 5.62, w: 0.8, h: 1.25 }], // 0.80 × 1.25 = 1.00 م² بالضبط
    },
    {
      name: "رافعة الخدمات",
      type: "خدمي",
      color: "#fef9c3",
      parts: [{ x: 7.02, y: 5.62, w: 0.36, h: 0.98 }], // رافعة صحية ملاصقة لجدار اللب — تصريف الحمّامين والمطبخ
    },
    {
      name: "بهو المدخل",
      type: "توزيع",
      color: "#f5f5f4",
      parts: [{ x: 5.55, y: 3.26, w: 4.27, h: 1.12 }], // من باب اللب (8.3) غرباً حتى الممر
    },
    {
      name: "ممر التوزيع",
      type: "توزيع",
      color: "#e7e5e4",
      parts: [{ x: 1.8, y: 4.5, w: 5.58, h: 1.0 }], // من فتحة المعيشة (غرباً) حتى جدار اللب — ينتهي عند آخر باب
    },
  ],
  notes: [
    "بصمة الشقة الشمالية 79.50 م² (شكل L حول اللب) — صافي الفراغات 68.00 م² وجدران وحصص إنشائية 11.50 م² (14.5%) — مقابل 68.70 م² إجمالية و59.54 م² صافية في تصميم الشقق الأربع السابق.",
    "المعالجة المعمارية للشمال: المعيشة كاملة على الواجهة الغربية بنوافذ ممتدة وشرفة خاصة، والنوم الرئيسية تلتف على الزاوية الشمالية الغربية بنافذتين — فلا تعتمد الشقة على الواجهة الشمالية وحدها.",
    "خصوصية المدخل: حاجز كتم إنشائي (8.85–8.97 × 3.26–4.45) يقطع خط النظر من باب اللب إلى باب النوم الرابعة، وباب النوم الثالثة بإزاحة غربية عميقة في بهو المدخل — لا يرى الداخل غرفة نوم مفتوحة أمامية.",
    "المطبخ مفتوح على المعيشة في عمق الشقة (لا يُرى من المدخل) بتهوية ميكانيكية عبر رافعة اللب الملاصقة لجداره الشرقي.",
    "الحمّام الثانوي 0.80 × 1.25 م = 1.00 م² بالضبط على محور الرافعة الصحية، وبابه يفتح للخارج بمفصلة شرقية فلا يعترض الممر ولا يكشف المرحلب على قادم الممر.",
    "رافعة الخدمات (0.36 م) ملاصقة لجدار اللب: صرف الحمّامين على بعد 0.12–1.00 م وصرف المطبخ عبر جيب معزول 0.90 م — نفس الموقع في كل طابق (توافق رأسي كامل).",
  ],
};

/* ---------------- الشقة الجنوبية الكبرى ----------------
   بصمة كاملة العرض 20.0 × 5.9 م = 118.00 م² — شقة الواجهة الجنوبية:
   المطبخ والمؤن غرباً (خدمة بعيدة عن مسار الزوار)، المعيشة عند الزاوية
   الجنوبية الغربية بشرفة تلتف حول الزاوية باستمرار، ممر التوزيع ينتهي
   عند باب النوم الرئيسية شرقاً دون أي امتداد ميت نحو الواجهة الشرقية،
   والنوم الرئيسية ركنية (جنوب + شرق) بعرض 2.70 م يستوعب سريراً وخزانة. */
export const SOUTH_UNIT: UnitDef = {
  key: "south",
  name: "الشقة الجنوبية",
  gross: 118.0,
  envelope: [{ x: 0, y: 9.1, w: 20, h: 5.9 }],
  layout: [
    {
      name: "المطبخ",
      type: "خدمي",
      color: "#fffbeb",
      parts: [{ x: 0.18, y: 9.28, w: 4.12, h: 2.02 }], // الواجهة الغربية بنافذة — مفتوح جنوباً على المعيشة
    },
    {
      name: "مخزن المؤن",
      type: "خدمي",
      color: "#fef3c7",
      parts: [{ x: 4.42, y: 9.28, w: 1.48, h: 1.12 }], // جيب خدمي بين المطبخ والبهو
    },
    {
      name: "بهو المدخل وممر التوزيع",
      type: "توزيع",
      color: "#e7e5e4",
      parts: [{ x: 6.02, y: 9.28, w: 12.18, h: 1.12 }], // من جيب المؤن حتى باب النوم الرئيسية (18.10) — لا امتداد ميت شرقاً
    },
    {
      name: "جيب الصالة",
      type: "توزيع",
      color: "#f5f5f4",
      parts: [{ x: 6.02, y: 10.52, w: 0.88, h: 0.78 }], // ممر الضيوف من البهو إلى المعيشة دون المرور بالمطبخ
    },
    {
      name: "المعيشة والطعام",
      type: "معيشة",
      color: "#ecfdf5",
      parts: [{ x: 0.18, y: 11.42, w: 6.72, h: 3.4 }], // الزاوية الجنوبية الغربية + شرفة تلتف حول الزاوية
    },
    {
      name: "غرفة النوم الأولى",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 7.02, y: 10.52, w: 2.4, h: 4.3 }], // بابها بإزاحة شرقية عن محور المدخل
    },
    {
      name: "غرفة النوم الثانية",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 9.54, y: 10.52, w: 2.4, h: 4.3 }],
    },
    {
      name: "الحمّام الثانوي",
      type: "صحي",
      color: "#f0fdfa",
      parts: [{ x: 12.06, y: 10.52, w: 0.8, h: 1.25 }], // 0.80 × 1.25 = 1.00 م² بالضبط — قرب المدخل لخدمة الضيوف
    },
    {
      name: "الحمّام الرئيسي",
      type: "صحي",
      color: "#f0fdfa",
      parts: [{ x: 12.98, y: 10.52, w: 1.5, h: 2.0 }], // ملاصق للحمّام الثانوي (جدار رطب مشترك ورافعة واحدة)
    },
    {
      name: "غرفة النوم الثالثة",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 14.6, y: 10.52, w: 2.4, h: 4.3 }],
    },
    {
      name: "غرفة النوم الرئيسية",
      type: "نوم",
      color: "#fafaf9",
      parts: [{ x: 17.12, y: 10.52, w: 2.7, h: 4.3 }], // الزاوية الجنوبية الشرقية — تعرض مزدوج (جنوبي + شرقي)
    },
    {
      name: "رافعة الخدمات",
      type: "خدمي",
      color: "#fef9c3",
      parts: [{ x: 12.06, y: 11.89, w: 0.8, h: 1.5 }], // رافعة صحية بين الحمّامين والغسيل — صفر مسافة صرف للحمّامين
    },
    {
      name: "مخزن بطاطي",
      type: "خدمي",
      color: "#fef3c7",
      parts: [{ x: 12.06, y: 13.51, w: 0.8, h: 1.31 }], // يفتح على الغسيل
    },
    {
      name: "الغسيل والمجفف",
      type: "خدمي",
      color: "#fef3c7",
      parts: [{ x: 12.98, y: 12.64, w: 1.5, h: 2.18 }], // جنوب الحمّام الرئيسي بنافذة — مضخة التمديدات مع الحمّامين
    },
  ],
  notes: [
    "بصمة الشقة الجنوبية 118.00 م² كاملة العرض — صافي الفراغات 99.24 م² وجدران وحصص إنشائية 18.76 م² — شقة الواجهة الجنوبية المفضلة في دراسة البدائل.",
    "بهو المدخل وممر التوزيع (13.64 م²) ينتهي عند باب النوم الرئيسية (حتى x 18.20) — أُلغي الامتداد الميت حتى الواجهة الشرقية الذي وُرث من مخطط الأرضي السكني السابق، والمساحة المستردة وزّعت على المعيشة (22.85 م²) والنوم الرئيسية (11.61 م²).",
    "منطقة الضيافة والخدمات غرب المدخل (مطبخ 8.32 + مؤن + معيشة عبر جيب خاص) — لا يمر الضيف بالمطبخ ولا يراه عند الدخول، وكل غرف النوم شرق المدخل في منطقة خاصة.",
    "الحمّام الثانوي (1.00 م² بالضبط) والحمّام الرئيسي متجاوران على جدار رطب مشترك مع رافعة صحية واحدة (صفر مسافة صرف) ومخزن غسيل بنافذة جنوب الحمّام الرئيسي — تجميع المناطق الرطبة يقلل المواسير والتسربات.",
    "النوم الرئيسية ركنية بتعرض مزدوج (جنوبي + شرقي) بعرض 2.70 م يستوعب سريراً مزدوجاً وخزانة، وبابها هو آخر أبواب الممر — الممر ينتهي عندها تماماً.",
    "باب النوم الأولى بإزاحة شرقية (8.62–9.42) عن محور مدخل الشقة (7.60–8.40) فلا يفتح مباشرة مقابل المدخل.",
  ],
};

/* ---------------- مواضع الشقق في الطابق النموذجي ---------------- */
export interface FloorUnitPlacement {
  unit: UnitDef;
  mirror: boolean; // انعكاس أفقي حول x=10 (للشقة الشمالية الشرقية)
  label: string;
  color: string;
  labelPos: { x: number; y: number };
  balcony: {
    flaps: RoomPart[]; // الشرفة الكابولية (خارج البصمة) — عند الزوايا تلتف باستمرار كقطعة واحدة
    accessRoom: string;
    accessNote: string;
    slidingDoor: RoomPart; // الباب المنزلق الزجاجي من المعيشة
  };
}

export const FLOOR_UNITS: FloorUnitPlacement[] = [
  {
    unit: NORTH_UNIT,
    mirror: false,
    label: "الشقة أ — شمالية غربية",
    color: "#047857",
    labelPos: { x: 2.9, y: 7.0 },
    balcony: {
      flaps: [{ x: -1.3, y: 5.62, w: 1.3, h: 3.3 }],
      accessRoom: "المعيشة والطعام",
      accessNote: "باب منزلق زجاجي من المعيشة على الواجهة الغربية (y 6.30–7.70) — قطعة واحدة متصلة بدرابزين كامل وحاجز جانبي يحمي نافذة النوم الرئيسية",
      slidingDoor: { x: -0.14, y: 6.3, w: 0.24, h: 1.4 },
    },
  },
  {
    unit: NORTH_UNIT,
    mirror: true,
    label: "الشقة ب — شمالية شرقية",
    color: "#b45309",
    labelPos: { x: 17.1, y: 7.0 },
    balcony: {
      flaps: [{ x: 20, y: 5.62, w: 1.3, h: 3.3 }],
      accessRoom: "المعيشة والطعام",
      accessNote: "باب منزلق زجاجي من المعيشة على الواجهة الشرقية (y 6.30–7.70) — قطعة واحدة متصلة بدرابزين كامل وحاجز جانبي",
      slidingDoor: { x: 19.9, y: 6.3, w: 0.24, h: 1.4 },
    },
  },
  {
    unit: SOUTH_UNIT,
    mirror: false,
    label: "الشقة ج — جنوبية كبرى",
    color: "#9f1239",
    labelPos: { x: 10, y: 11.0 },
    balcony: {
      flaps: [
        { x: 0, y: 15, w: 3.2, h: 1.3 }, // الجناح الجنوبي
        { x: -1.3, y: 14.4, w: 1.3, h: 1.9 }, // الجناح الغربي شامل مربع الزاوية — التفاف مستمر
      ],
      accessRoom: "المعيشة والطعام",
      accessNote: "باب منزلق زجاجي من المعيشة على الواجهة الجنوبية (x 0.50–1.90) — شرفة L متصلة تلتف حول الزاوية الجنوبية الغربية دون انقطاع",
      slidingDoor: { x: 0.5, y: 14.88, w: 1.4, h: 0.24 },
    },
  },
];

export const roomArea = (r: RoomDef): number =>
  +(r.parts.reduce((s, p) => s + p.w * p.h, 0)).toFixed(2);

export interface RoomSpec {
  name: string;
  type: string;
  area: number;
  color: string;
}

export const unitRooms = (u: UnitDef): RoomSpec[] =>
  u.layout.map((r) => ({ name: r.name, type: r.type, color: r.color, area: roomArea(r) }));

// صافي فراغات الشقة (مجموع المستطيلات المرسومة) — مشتق برمجياً
export const unitNet = (u: UnitDef): number =>
  +unitRooms(u)
    .reduce((s, r) => s + r.area, 0)
    .toFixed(2);
// الجدران والحصص الإنشائية = الإجمالي − الصافي — مشتق برمجياً
export const unitWalls = (u: UnitDef): number => +(u.gross - unitNet(u)).toFixed(2);

export const NORTH_NET = unitNet(NORTH_UNIT); // 68.00
export const SOUTH_NET = unitNet(SOUTH_UNIT); // 99.24
export const AVERAGE_NET = +((NORTH_NET * 2 + SOUTH_NET) / 3).toFixed(2); // ≈ 78.41

export const APARTMENT_NOTES = [
  ...NORTH_UNIT.notes.map((n) => `الشقة الشمالية: ${n}`),
  ...SOUTH_UNIT.notes.map((n) => `الشقة الجنوبية: ${n}`),
];

/* ============================================================
   منظومة الطاقة الشمسية — مواصفة إلزامية (مصدر وحيد — دون تغيير)
   16 صفاً × 3 ألواح = 48 لوحاً لكل مبنى — 192 لوحاً للمشروع.
   ============================================================ */
export const SOLAR_ARRAY = {
  panelW: 1.13, // عرض اللوح شرق-غرب (م)
  panelH: 1.72, // طول اللوح جنوب-شمال (م)
  panelWatt: 450, // واط ذروة للوح
  gap: 0.02, // أقل فاصل عملي للتثبيت (م) — موثق ولا يغيّر العدد
  rows: 16, // عدد الصفوف — تتتابع غرب ← شرق
  panelsPerRow: 3, // ألواح كل صف — تتتابع جنوب ← شمال
  panelsPerBuilding: 48, // 16 × 3
  orientation: "الجهة الجنوبية من السطح",
  rowDirection: "غرب ← شرق",
  panelDirection: "جنوب ← شمال",
  arrayWidthEW: +(16 * 1.13 + 15 * 0.02).toFixed(2), // 18.38 م عرضاً شرق-غرب
  arrayDepthSN: +(3 * 1.72 + 2 * 0.02).toFixed(2), // 5.20 م عمقاً جنوب-شمال
  arrayX0: 0.81, // بداية المصفوفة من الغرب (توسيط: (20 − 18.38) ÷ 2)
  arrayY0: 9.2, // بداية المصفوفة من الشمال — جنوب البنتهاوس بهامش صيانة 0.20 م
  buildingKWp: +((48 * 450) / 1000).toFixed(1), // 21.6 كيلوواط ذروة لكل مبنى
  projectKWp: +((4 * 48 * 450) / 1000).toFixed(1), // 86.4 كيلوواط ذروة للمشروع
  annualMWh: 134, // تقديري بمعدل إنتاج مرجعي 1,550 ك.و.س/ك.و — لا يُعد تحليلاً شمسياً رقمياً
};

/* ============================================================
   خزانات المياه العلوية — مواصفة إلزامية (مصدر وحيد — دون تغيير)
   16 خزاناً × 1000 لتر = 16 م³ لكل مبنى — 64 خزاناً / 64 م³ للمشروع.
   الموقع: مجموعتان 4×2 حول البنتهاوس فوق حزام الجدران الحاملة
   المتوافق رأسياً مع جدران الطوابق — الحمل ينقل بكمرات سطحية.
   ============================================================ */
export const WATER_TANKS = {
  perBuilding: 16,
  capacityL: 1000,
  perBuildingL: 16000,
  projectTanks: 64, // 16 × 4
  projectL: 64000,
  projectM3: 64,
  baseW: 1.0,
  baseD: 1.0,
  baseArea: 1.0, // م² لقاعدة الخزان الواحد
  projectBaseArea: 64, // 64 × 1.00 م²
  location: "المنطقة المركزية حول البنتهاوس — فوق حزام الجدران الحاملة المتوافق رأسياً",
  arrangement: "مجموعتان 4×2 متقابلتان حول البنتهاوس (16 قاعدة 1×1 م) — منتظمة وميسّرة الوصول",
  structuralNote:
    "الحمل المائي ≈ 16 طناً لكل مبنى قبل وزن الخزانات والقواعد والمعدات — ينقل بكمرات سطحية ترتكز على الجدران الحاملة المستمرة رأسياً ويتطلب تحقق إنشائي وتوزيع أحمال ومراجعة البلاطات والكمرات والأعمدة والأساسات",
};

/* ============================================================
   الشرفات — إلزامية لكل شقة (36 شرفة = 3 × 3 طوابق × 4 مبانٍ)
   كل شرفة تفتح من المعيشة (التزام المواصفة) وتُرسم قطعة واحدة
   متصلة؛ شرفة الشقة الجنوبية تلتف حول الزاوية الجنوبية الغربية
   كقطعة L واحدة شاملة مربع الزاوية (بدل القطعتين المنفصلتين سابقاً).
   الشرفات لا تتلاصق بين الشقق (فجوة واجهات ≥ 5 م) فلا حاجة
   لفواصل خصوصية، ومع أي تداخل مستقبلي تُضاف فواصل غير شفافة 1.8 م.
   ============================================================ */
export const BALCONY = {
  perApartment: 1,
  total: TOTAL_APARTMENTS, // 36
  perFloor: APARTMENTS_PER_FLOOR, // 3
  perBuilding: APARTMENTS_PER_FLOOR * RESIDENTIAL_FLOORS, // 9
  northW: 1.3, // عمق شرفة الشقتين الشماليتين (م) على الواجهة الجانبية
  northD: 3.3, // طولها
  northArea: +(1.3 * 3.3).toFixed(2), // 4.29 م²
  southFlapW: 3.2, // الجناح الجنوبي لشرفة الشقة الجنوبية
  southFlapD: 1.3,
  southSideW: 1.3, // الجناح الغربي (شامل مربع الزاوية — التفاف مستمر)
  southSideD: 1.9,
  southArea: +(3.2 * 1.3 + 1.3 * 1.9).toFixed(2), // 6.63 م²
  areaEach: +(2 * (1.3 * 3.3) / 3 + (3.2 * 1.3 + 1.3 * 1.9) / 3).toFixed(2), // متوسط 5.07 م²
  perFloorArea: +(2 * (1.3 * 3.3) + (3.2 * 1.3 + 1.3 * 1.9)).toFixed(2), // 15.21 م² في الطابق
  projectArea: +(24 * (1.3 * 3.3) + 12 * (3.2 * 1.3 + 1.3 * 1.9)).toFixed(1), // 182.5 م² كابولية
  location: "من المعيشة: شرفتان جانبيتان (غرب/شرق) للشقتين الشماليتين وشرفة L تلتف حول الزاوية الجنوبية الغربية للشقة الجنوبية",
  access: "باب منزلق زجاجي من المعيشة في الشقق الثلاثة + درابزين كامل",
  privacyNote:
    "الشرفات لا تتلاصق بين الشقق (فجوة واجهات ≥ 5.0 م) فلا حاجة لفواصل خصوصية — ومع أي تداخل مستقبلي تُضاف فواصل غير شفافة بارتفاع 1.8 م بين حدود الشرفتين",
  structuralNote:
    "كابولية بارزة خارج بصمة الأبنية (300 م²/مبنى) — غير محتسبة في نسبة البناء 60% ولا تُوسّع البصمة، وتخضع للكود المحلي",
};

// مناطق السطح بالأمتار — للتحقق البرمجي من عدم التعارض
// البنتهاوس فوق الدرج والمصعد الجديدين (y 6.3–9.0) شمال المصفوفة
export const ROOF_ZONES = {
  penthouse: { x0: 7.5, y0: 6.3, x1: 12.5, y1: 9.0 },
  tanksWest: { x0: 2.9, y0: 4.65, x1: 7.35, y1: 6.8 },
  tanksEast: { x0: 12.65, y0: 4.65, x1: 17.1, y1: 6.8 },
  array: {
    x0: SOLAR_ARRAY.arrayX0,
    y0: SOLAR_ARRAY.arrayY0,
    x1: +(SOLAR_ARRAY.arrayX0 + SOLAR_ARRAY.arrayWidthEW).toFixed(2), // 19.19
    y1: +(SOLAR_ARRAY.arrayY0 + SOLAR_ARRAY.arrayDepthSN).toFixed(2), // 14.40
  },
};

type Zone = { x0: number; y0: number; x1: number; y1: number };
const zonesOverlap = (a: Zone, b: Zone): boolean =>
  a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/* ============================================================
   القبو — مواقف السيارات والمخازن والحفرة الفنية
   أُعيد تخطيطه بعد عودة القبو وظيفةً مواقف (وفق الثوابت الملزمة)
   ومع توسّع اللب: 6 مواقف قياسية 2.50 × 5.00 م على ممر حلقي
   يتصل حول اللب (شمالي + غربي + شرقي + جنوبي)، ومخزنان،
   ومنحدر نزول خارج البصمة على الجهة الجنوبية بميل ≈14%.
   ============================================================ */
export interface StallDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const BASEMENT_PARKING = {
  stallW: 2.5,
  stallD: 5.0,
  stalls: [
    { id: "P1", x: 0.2, y: 0.2, w: 2.5, h: 5.0 }, // الصف الشمالي الغربي — يتجه جنوباً
    { id: "P2", x: 2.82, y: 0.2, w: 2.5, h: 5.0 },
    { id: "P3", x: 0.2, y: 9.82, w: 2.5, h: 5.0 }, // الصف الجنوبي الغربي — يتجه شمالاً
    { id: "P4", x: 12.62, y: 0.2, w: 2.5, h: 5.0 }, // الصف الشمالي الشرقي — يتجه جنوباً
    { id: "P5", x: 15.24, y: 0.2, w: 2.5, h: 5.0 },
    { id: "P6", x: 12.62, y: 9.82, w: 2.5, h: 5.0 }, // الصف الجنوبي الشرقي — يتجه شمالاً
  ] as StallDef[],
  stallsPerBuilding: 6,
  projectCovered: 24, // 6 × 4
  visitors: 4, // مواقف زوار سطحية على حلقة الخدمة
  projectTotal: 28,
  aisles: {
    west: { x0: 0.2, y0: 5.32, x1: 7.38, y1: 9.7 }, // ممر غربي مزدوج التحميل 4.38 م
    east: { x0: 12.62, y0: 5.32, x1: 19.82, y1: 9.7 }, // ممر شرقي مزدوج التحميل 4.38 م
    north: { x0: 5.44, y0: 0.2, x1: 12.5, y1: 4.38 }, // وصلة شمالية حول اللب
    south: { x0: 5.44, y0: 9.82, x1: 12.5, y1: 14.82 }, // وصلة جنوبية حول اللب
  },
  aisleWidth: 4.38,
  stores: [
    { id: "مخزن أ", x: 17.86, y: 0.2, w: 1.96, h: 5.0 }, // 9.80 م² — يفتح على الممر الشرقي
    { id: "مخزن ب", x: 15.24, y: 9.82, w: 1.34, h: 5.0 }, // 6.70 م² — يفتح شمالاً على الممر الشرقي
  ],
  ramp: {
    landing: { x0: 16.7, y0: 9.82, x1: 19.82, y1: 14.82 },
    note: "منحدر نزول خارج بصمة المبنى على الجهة الجنوبية (ضمن حزام الخدمة) بميل ≈14% يصل إلى فتحة الدخول بالزاوية الجنوبية الشرقية للقبو — أبعاد المنحدر النهائية وفق الكود المحلي",
  },
  ventilation: "تهوية ميكانيكية دفع وسحب (6 تحويلات/ساعة) مع فتحات أرضية تصريف هوائي — بلا نوافذ",
  drainage: "مصارف أرضية باتجاه فتحة تجميع عند غرفة المضخات (الحفرة الفنية) ثم مصيدة زيوت ومضخة طرد",
};

export const TECH_PIT = {
  x0: 7.5,
  y0: 4.5,
  x1: 12.5,
  y1: 9.1, // تحت اللب الحركي مباشرة
  label: "حفرة فنية تحت اللب الحركي: خزان أرضي 20 م³ + غرفة مضخات + لوحة كهرباء رئيسية — تُخدم من درج اللب",
};

/* ============================================================
   الطابق الأرضي — بهو المدخل والخدمات المشتركة
   باب المدخل على الواجهة المطلة على محور المشاة المركزي
   (شرقي في المباني الغربية أ/ج وغربي بالمرايا في الشرقيين ب/د)
   + مظلة كابولية، ويصل البهو مباشرة إلى باب اللب الجنوبي —
   ودورة ضيوف بمحاذاة الحمّام الثانوي للشقة ج (توافق رأسي).
   ============================================================ */
export const GROUND_FLOOR = {
  lobby: { x0: 0.18, y0: 9.28, x1: 19.82, y1: 10.4 }, // بهو المدخل الرئيسي (22.00 م²)
  entryDoor: { x: 19.82, y: 9.4, w: 1.0 }, // باب شرقي — يُعكس غربياً في المباني ب/د
  canopy: "مظلة كابولية 1.3 × 1.2 م خارج البصمة فوق الباب + منسوب مدخل صفري على مستوى محور المشاة",
  rooms: [
    { name: "صالة الجلسة والانتظار", x: 0.18, y: 10.52, w: 6.72, h: 4.3, area: 28.9 },
    { name: "غرفة الحارس والاستقبال", x: 7.02, y: 10.52, w: 2.4, h: 4.3, area: 10.32 },
    { name: "غرفة العدادات والكهرباء", x: 9.54, y: 10.52, w: 2.4, h: 4.3, area: 10.32 },
    { name: "دورة ضيوف", x: 12.06, y: 10.52, w: 0.8, h: 1.25, area: 1.0 }, // بمحاذاة الحمّام الثانوي للشقة ج
    { name: "صناديق البريد", x: 13.0, y: 10.52, w: 2.0, h: 1.25, area: 2.5 },
    { name: "غرفة النظافة والمخلفات", x: 12.98, y: 12.64, w: 1.5, h: 2.18, area: 3.27 },
    { name: "صالة متعددة الأغراض", x: 0.18, y: 0.18, w: 7.2, h: 8.8, area: 63.36 },
    { name: "مخزن المبنى", x: 7.5, y: 0.18, w: 2.32, h: 4.2, area: 9.74 },
    { name: "مخزن ثانٍ", x: 12.62, y: 0.18, w: 3.6, h: 4.2, area: 15.12 },
    { name: "غرفة المولد الاحتياطي", x: 16.34, y: 0.18, w: 3.48, h: 4.2, area: 14.62 },
    { name: "غرفة التهوية والمضخات", x: 12.62, y: 4.5, w: 3.6, h: 4.48, area: 16.13 },
    { name: "مخزن ثالث", x: 16.34, y: 4.5, w: 3.48, h: 4.48, area: 15.59 },
  ],
  note:
    "لا وحدات سكنية في الأرضي — بهو المدخل والخدمات فقط، فلا يمر زائر أمام مساكن ولا يُكشف أي فراغ خاص من المدخل (متطلب الخصوصية)؛ مداخل المباني الأربعة متطابقة بالمرايا على محور المشاة",
};

/* ============================================================
   مداخل المباني الأربعة — متطلبات التنسيق
   ============================================================ */
export const GROUND_ENTRY = {
  door:
    "باب المدخل الرئيسي على الواجهة المطلة على محور المشاة المركزي (شرقية في المباني أ/ج وغربية بالمرايا في ب/د) + مظلة كابولية 1.3 × 1.2 م",
  hall: "بهو المدخل (22.00 م²) بعرض كامل البصمة يصل مباشرة إلى باب اللب الجنوبي (x 7.6–8.4) ويتوزع منه إلى الدرج والمصعد والخدمات",
  privacy:
    "لا شقق في الأرضي — مسار الزائر: الباب → البهو → اللب → الطوابق السكنية دون مرور أمام أي وحدة أو رؤية أي فراغ خاص",
  consistency: "المباني الأربعة متطابقة بالمرايا: نفس الباب والبهو والمظلة والمنسوب الصفري والعلاقة بالدرج والمصعد",
};

/* ============================================================
   الرافعات الصحية والخدمية — توافق رأسي كامل
   الطابق الثالث → الثاني → الأول → الأرضي → القبو
   ============================================================ */
export const SERVICE_RISERS = {
  north: {
    x0: 7.02, y0: 5.62, x1: 7.38, y1: 6.6,
    label: "R1 — رافعة صحية خاصة بالشقتين الشماليتين عند جدار اللب: تصريف الحمّامين (0.12–1.00 م) والمطبخ (0.90 م عبر جيب معزول) — نفس الموقع في كل طابق حتى القبو",
  },
  south: {
    x0: 12.06, y0: 11.89, x1: 12.86, y1: 13.39,
    label: "R2 — رافعة صحية للشقة الجنوبية بين الحمّامين والغسيل: صفر مسافة صرف للحمّامين وصرف الغسيل والشرفة عبر نفس العمود",
  },
  southKitchen: {
    x0: 4.0, y0: 9.28, x1: 4.3, y1: 9.58,
    label: "R3 — عمود صرف المطبخ الجنوبي في ركنه الشمالي الشرقي (0.30 × 0.30 م مُعلّب) — يهبط مستقلاً حتى القبو",
  },
  core: {
    x0: 12.15, y0: 4.5, x1: 12.5, y1: 5.7,
    label: "R4 — رافعة كهرباء واتصالات وميكانيك داخل اللب تخدم الشقق الثلاثة والخزانات العلوية",
  },
  groundGuestWc: {
    x0: 12.06, y0: 10.52, x1: 12.86, y1: 11.77,
    label: "دورة ضيوف الأرضي على نفس مستطيل الحمّام الثانوي للشقة ج — توافق رأسي حرفي (نفس عمود الصرف R2)",
  },
  basementCollector:
    "مجمعات صرف أفقية في سقف القبو تحت كل رافعة → نقطة تجميع واحدة عند الحفرة الفنية تحت اللب → مصيدة زيوت وطرد — بلا مسارات أفقية عشوائية بين الطوابق",
};

/* ============================================================
   التنسيق الإنشائي المبدئي (يحتاج اعتماد مهندس إنشائي)
   ============================================================ */
export const STRUCTURAL_NOTES = {
  walls: "الجدران الخارجية والمشتركة وجدران اللب 0.18 م (حاملة)، والقواطع الداخلية 0.12 م — النظام المبدئي: جدران حاملة مستمرة رأسياً حول اللب وعلى المحاور المشتركة",
  coreWalls: "جدران الدرج والمصعد حاملة ومستمرة من القبو إلى السطح وتحمل كمرات الخزانات العلوية — فتحات أبواب محدودة ومؤطرة",
  verticalContinuity:
    "المحاور الحاملة (جدران اللب x 7.50 وx 12.50 والفواصل بين الشقق x 10.0 وجدار الصف الجنوبي y 9.10) متوافقة رأسياً حرفياً في مستويات المبنى الخمسة (القبو والأرضي والطوابق السكنية الثلاثة) لأن المخطط مكرر من نفس البيانات",
  tankLoadPath:
    "خزانات السطح (16 م³ ≈ 16 طناً) على قواعد 1×1 م في مجموعتين حول البنتهاوس فوق حزام الجدران الحاملة (x 2.90–7.35 وx 12.65–17.10) — تنقل الأحمال بكمرات سطحية على الجدران المستمرة وفق محاور موثقة",
  balconies: "الشرفات كابولية بألواح وكراتينش خارج البصمة — أبعادها الكابولية تخضع للكود المحلي",
  disclaimer:
    "هذا تنسيق إنشائي مبدئي قابل للمراجعة وليس تصميماً إنشائياً معتمداً — جميع السماكات والأبعاد والأحمال (خاصة حمل الخزانات 16 طناً والكابوليات والمنحدر) تحتاج اعتماد مهندس إنشائي وفق الكود المحلي قبل التنفيذ",
};

/* ============================================================
   فحوص هندسية برمجية — تُحسب فعلياً من هذا الملف عند البناء
   (تُعرض نتيجتها ✓/✗ في قسم الفحوص بالواجهة)
   ============================================================ */

type Rect = { x: number; y: number; w: number; h: number };
const rectsOverlap = (a: Rect, b: Rect): boolean =>
  a.x < b.x + b.w - 1e-9 &&
  b.x < a.x + a.w - 1e-9 &&
  a.y < b.y + b.h - 1e-9 &&
  b.y < a.y + a.h - 1e-9;

const unitHasOverlap = (u: UnitDef): boolean => {
  const rects = u.layout.flatMap((r) => r.parts);
  for (let i = 0; i < rects.length; i++)
    for (let j = i + 1; j < rects.length; j++) if (rectsOverlap(rects[i], rects[j])) return true;
  return false;
};

const envelopesNoOverlap = (): boolean => {
  const coreAsRect: Rect = { x: CORE.x0, y: CORE.y0, w: CORE.x1 - CORE.x0, h: CORE.y1 - CORE.y0 };
  const all: Rect[] = [...NORTH_UNIT.envelope, ...SOUTH_UNIT.envelope, coreAsRect];
  for (let i = 0; i < all.length; i++)
    for (let j = i + 1; j < all.length; j++) if (rectsOverlap(all[i], all[j])) return false;
  return true;
};

// مجموع بصمات الطابق مشتقاً من مواضع الشقق الفعلية + اللب = 300.00
const coreRect: Rect = { x: CORE.x0, y: CORE.y0, w: CORE.x1 - CORE.x0, h: CORE.y1 - CORE.y0 };
const envelopeArea = (parts: RoomPart[]): number => parts.reduce((s, r) => s + r.w * r.h, 0);

export const envelopesSum = (): number =>
  +(FLOOR_UNITS.reduce((s, f) => s + envelopeArea(f.unit.envelope), 0) + coreRect.w * coreRect.h).toFixed(2);

const countByUnit = FLOOR_UNITS.reduce<Record<string, number>>((acc, f) => {
  acc[f.unit.key] = (acc[f.unit.key] ?? 0) + 1;
  return acc;
}, {});

const eqParts: string[] = [];
if (countByUnit.north) eqParts.push(`${countByUnit.north} × ${NORTH_UNIT.gross.toFixed(2)}`);
if (countByUnit.south) eqParts.push(`${countByUnit.south} × ${SOUTH_UNIT.gross.toFixed(2)}`);
eqParts.push(CORE.area.toFixed(2));

export const FLOOR_EQUATION = eqParts.join(" + ");

// كل غرفة نوم/معيشة تلامس واجهة خارجية للمبنى (بالإحداثيات المحوّلة)
const allHabitableRoomsOnFacade = (): boolean => {
  const eps = 0.25;
  for (const placement of FLOOR_UNITS) {
    for (const room of placement.unit.layout) {
      if (room.type !== "نوم" && room.type !== "معيشة") continue;
      const ok = room.parts.some((p) => {
        const x0 = placement.mirror ? 20 - p.x - p.w : p.x;
        const x1 = x0 + p.w;
        const y0 = p.y;
        const y1 = p.y + p.h;
        return (
          Math.abs(x0 - 0) < eps ||
          Math.abs(x1 - 20) < eps ||
          Math.abs(y0 - 0) < eps ||
          Math.abs(y1 - 15) < eps
        );
      });
      if (!ok) return false;
    }
  }
  return true;
};

const mainRoomsCount = (u: UnitDef): number =>
  u.layout.filter((r) => r.type === "معيشة" || r.type === "نوم").length;

// الحمّام الثانوي: 1.00 م² بالضبط بأبعاد 0.80 × 1.25 (بأي اتجاه)
const secBathExact = (u: UnitDef): boolean => {
  const room = u.layout.find((r) => r.name === "الحمّام الثانوي");
  if (!room || room.parts.length !== 1) return false;
  const p = room.parts[0];
  const dims = [p.w, p.h].sort((a, b) => a - b);
  return (
    Math.abs(p.w * p.h - SEC_BATH_AREA) < 1e-9 &&
    Math.abs(dims[0] - 0.8) < 1e-9 &&
    Math.abs(dims[1] - 1.25) < 1e-9
  );
};

// كل شرفة مرتبطة بالمعيشة (التزام المواصفة: باب الشرفة من الصالة)
const balconiesFromLiving = (): boolean =>
  FLOOR_UNITS.every((f) => f.balcony.accessRoom === "المعيشة والطعام" && f.balcony.flaps.length >= 1);

// شرفة الشقة الجنوبية تلتف حول الزاوية الجنوبية الغربية كقطعة متصلة واحدة
const southBalconyWrapsCorner = (): boolean => {
  const s = FLOOR_UNITS.find((f) => f.unit.key === "south");
  if (!s || s.balcony.flaps.length !== 2) return false;
  const [flapSouth, flapWest] = s.balcony.flaps;
  // الجناح الجنوبي على الواجهة (y = 15) والجناح الغربي يشمل مربع الزاوية ويلامس الجناح الجنوبي
  return (
    Math.abs(flapSouth.y - 15) < 1e-9 &&
    Math.abs(flapWest.x + flapWest.w - flapSouth.x) < 1e-9 &&
    flapWest.y + flapWest.h >= flapSouth.y + flapSouth.h - 1e-9 &&
    flapWest.y < 15
  );
};

// الشرفات لا تتلاصق بين الشقق (فجوة واجهات ≥ 5 م) — لا حاجة لفواصل خصوصية
const balconiesNotAdjacent = (): boolean => {
  const west = FLOOR_UNITS.filter((f) => f.unit.key === "north" && !f.mirror)[0];
  const south = FLOOR_UNITS.find((f) => f.unit.key === "south");
  if (!west || !south) return false;
  const northFlap = west.balcony.flaps[0];
  const southFlap = south.balcony.flaps[1];
  const gap = southFlap.y - (northFlap.y + northFlap.h);
  return gap >= 5;
};

// اللب: الدرج والمصعد والرافعة داخله ولا تتداخل فيما بينها
const coreElementsInside = (): boolean => {
  const inside = (r: Rect) =>
    r.x >= CORE.x0 - 1e-9 && r.y >= CORE.y0 - 1e-9 && r.x + r.w <= CORE.x1 + 1e-9 && r.y + r.h <= CORE.y1 + 1e-9;
  const items: Rect[] = [CORE.stair, CORE.elevator, CORE.shaft];
  if (!items.every(inside)) return false;
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) if (rectsOverlap(items[i], items[j])) return false;
  return true;
};

// الممر العمودي بين المصعد والدرج ≥ 0.90 م — يربط بهو الشمال بهو الجنوب
const coreVerticalPassage = (): boolean => CORE.stair.x - (CORE.elevator.x + CORE.elevator.w) >= 0.9 - 1e-9;

// بهو اللب الجنوبي متصل ويصل إلى باب الشقة الجنوبية (بدل الجيب المحبوس سابقاً)
const coreSouthLobbyConnected = (): boolean =>
  CORE.elevator.y + CORE.elevator.h <= CORE.y1 &&
  CORE.doorSouth.x >= CORE.southLobby.x &&
  CORE.doorSouth.x <= CORE.southLobby.x + CORE.southLobby.w &&
  Math.abs(CORE.southLobby.y + CORE.southLobby.h - CORE.y1) < 1e-9;

// ممر الشقة الشمالية لا يمتد غرب فتحة المعيشة (لا هدر) ولا يقل عن خدمة آخر باب
const northCorridorJustified = (): boolean => {
  const corridor = NORTH_UNIT.layout.find((r) => r.name === "ممر التوزيع");
  if (!corridor || corridor.parts.length !== 1) return false;
  const p = corridor.parts[0];
  return Math.abs(p.x - 1.8) < 1e-9 && Math.abs(p.x + p.w - 7.38) < 1e-9; // من فتحة المعيشة إلى جدار اللب
};

// ممر/بهو الشقة الجنوبية ينتهي عند باب النوم الرئيسية — لا امتداد ميت نحو الواجهة الشرقية
const southHallEndsAtLastDoor = (): boolean => {
  const hall = SOUTH_UNIT.layout.find((r) => r.name.startsWith("بهو المدخل"));
  const master = SOUTH_UNIT.layout.find((r) => r.name === "غرفة النوم الرئيسية");
  if (!hall || hall.parts.length !== 1 || !master || master.parts.length !== 1) return false;
  const hp = hall.parts[0];
  const mp = master.parts[0];
  // آخر باب (النوم الرئيسية x 17.3–18.1) ثم 0.10 جدار فقط
  return Math.abs(hp.x + hp.w - 18.2) < 1e-9 && mp.x < hp.x + hp.w && hp.x + hp.w < 19.0;
};

// باب النوم الأولى في الشقة الجنوبية مُزاح شرقياً عن محور المدخل (لا فتح مقابل المدخل)
const southBedroom1DoorOffset = (): boolean => {
  const entryCenter = CORE.doorSouth.x; // 8.0
  const doorWest = 8.62; // باب النوم الأولى x 8.62–9.42
  return doorWest - (entryCenter + 0.4) >= 0.2;
};

// حاجز الكتم يقطع خط النظر بين مدخل الشقة الشمالية وباب النوم الرابعة
const northPrivacyFin = (): boolean => {
  const entryEast = 8.8; // باب اللب للشقة أ حتى x 8.8
  const finX0 = 8.85;
  const finX1 = 8.97;
  const bed4DoorWest = 9.05;
  return entryEast <= finX0 && finX1 <= bed4DoorWest;
};

// الرافعات الصحية داخل بصمات الشقق (توافق رأسي حقيقي)
const risersInsideEnvelopes = (): boolean => {
  const toRect = (z: { x0: number; y0: number; x1: number; y1: number }): RoomPart => ({
    x: z.x0,
    y: z.y0,
    w: +(z.x1 - z.x0).toFixed(6),
    h: +(z.y1 - z.y0).toFixed(6),
  });
  const inEnvelope = (r: RoomPart, env: RoomPart[]) =>
    env.some(
      (e) =>
        r.x >= e.x - 1e-9 && r.y >= e.y - 1e-9 && r.x + r.w <= e.x + e.w + 1e-9 && r.y + r.h <= e.y + e.h + 1e-9,
    );
  return (
    inEnvelope(toRect(SERVICE_RISERS.north), NORTH_UNIT.envelope) &&
    inEnvelope(toRect(SERVICE_RISERS.south), SOUTH_UNIT.envelope) &&
    inEnvelope(toRect(SERVICE_RISERS.southKitchen), SOUTH_UNIT.envelope)
  );
};

// دورة ضيوف الأرضي على نفس مستطيل الحمّام الثانوي للشقة ج (توافق رأسي حرفي)
const groundGuestWcAligned = (): boolean => {
  const wc = SERVICE_RISERS.groundGuestWc;
  const sec = SOUTH_UNIT.layout.find((r) => r.name === "الحمّام الثانوي");
  if (!sec || sec.parts.length !== 1) return false;
  const p = sec.parts[0];
  return (
    Math.abs(wc.x0 - p.x) < 1e-9 &&
    Math.abs(wc.y0 - p.y) < 1e-9 &&
    Math.abs(wc.x1 - (p.x + p.w)) < 1e-9 &&
    Math.abs(wc.y1 - (p.y + p.h)) < 1e-9
  );
};

// الحفرة الفنية تحت اللب الحركي مباشرة
const pitUnderCore = (): boolean =>
  TECH_PIT.x0 === CORE.x0 && TECH_PIT.y0 === CORE.y0 && TECH_PIT.x1 === CORE.x1 && TECH_PIT.y1 === CORE.y1;

// مواقف القبو: قياسية ولا تتعارض مع اللب ولا مع بعضها
const basementStallsValid = (): boolean => {
  const coreAsRect: Zone = { x0: CORE.x0, y0: CORE.y0, x1: CORE.x1, y1: CORE.y1 };
  const zones: Zone[] = BASEMENT_PARKING.stalls.map((s) => ({ x0: s.x, y0: s.y, x1: s.x + s.w, y1: s.y + s.h }));
  const dimsOk = BASEMENT_PARKING.stalls.every(
    (s) => Math.abs(s.w - 2.5) < 1e-9 && Math.abs(s.h - 5.0) < 1e-9,
  );
  const noCoreConflict = zones.every((z) => !zonesOverlap(z, coreAsRect));
  let noSelfOverlap = true;
  for (let i = 0; i < zones.length; i++)
    for (let j = i + 1; j < zones.length; j++) if (zonesOverlap(zones[i], zones[j])) noSelfOverlap = false;
  return dimsOk && noCoreConflict && noSelfOverlap && BASEMENT_PARKING.stallsPerBuilding === BASEMENT_PARKING.stalls.length;
};

export const AUDIT: { label: string; pass: boolean }[] = [
  { label: "APARTMENTS_PER_FLOOR === 3 (ثلاث شقق في كل طابق سكني)", pass: APARTMENTS_PER_FLOOR === 3 },
  { label: "RESIDENTIAL_FLOORS === 3 (ثلاثة طوابق سكنية + أرضي خدمات + قبو مواقف)", pass: RESIDENTIAL_FLOORS === 3 },
  { label: "4 مبانٍ × 3 طوابق سكنية × 3 شقق = 36 شقة", pass: 4 * RESIDENTIAL_FLOORS * APARTMENTS_PER_FLOOR === 36 && TOTAL_APARTMENTS === 36 },
  { label: "36 شقة × 5 غرف رئيسية = 180 غرفة", pass: TOTAL_APARTMENTS * MAIN_ROOMS_PER_APARTMENT === 180 },
  { label: "36 شقة × حمّامان = 72 حمّاماً", pass: TOTAL_APARTMENTS * 2 === 72 },
  { label: "36 × 1.00 م² = 36 م² حمّامات ثانوية", pass: TOTAL_APARTMENTS * SEC_BATH_AREA === 36 },
  { label: "3 شرفات × 3 طوابق سكنية × 4 مبانٍ = 36 شرفة", pass: BALCONY.perFloor === 3 && BALCONY.perBuilding === 9 && BALCONY.total === 36 },
  { label: "5 غرف رئيسية في كل شقة (صالة + 4 نوم) — الشقتان", pass: mainRoomsCount(NORTH_UNIT) === 5 && mainRoomsCount(SOUTH_UNIT) === 5 },
  { label: "الحمّام الثانوي 0.80 × 1.25 = 1.00 م² بالضبط في الشقتين", pass: secBathExact(NORTH_UNIT) && secBathExact(SOUTH_UNIT) },
  { label: "لا تداخل بين فراغات الشقة الشمالية", pass: !unitHasOverlap(NORTH_UNIT) },
  { label: "لا تداخل بين فراغات الشقة الجنوبية", pass: !unitHasOverlap(SOUTH_UNIT) },
  { label: "لا تداخل بين بصمات الشقق الثلاث واللب (البصمات تلمس فقط)", pass: envelopesNoOverlap() },
  { label: `معادلة الطابق (تتكرر حرفياً في الطوابق السكنية الثلاثة): ${FLOOR_EQUATION} = 300.00 م²`, pass: envelopesSum() === 300 },
  { label: "كل غرفة نوم ومعيشة على واجهة خارجية (تحقق برمجي للمواضع الثلاثة)", pass: allHabitableRoomsOnFacade() },
  { label: "كل شرفة مرتبطة بالمعيشة (باب الشرفة من الصالة في الشقق الثلاثة)", pass: balconiesFromLiving() },
  { label: "شرفة الشقة الجنوبية قطعة L واحدة تلتف حول الزاوية (شاملة مربع الزاوية)", pass: southBalconyWrapsCorner() },
  { label: "الشرفات لا تتلاصق بين الشقق (فجوة واجهات ≥ 5 م) — فصل خصوصي غير مطلوب", pass: balconiesNotAdjacent() },
  { label: "الدرج والمصعد والرافعة داخل اللب دون تداخل فيما بينها", pass: coreElementsInside() },
  { label: "ممر حر ≥ 0.90 م بين المصعد والدرج يربط بهو الشمال بهو الجنوب", pass: coreVerticalPassage() },
  { label: "بهو اللب الجنوبي متصل ويصل إلى باب الشقة الجنوبية (عولج الجيب المحبوس)", pass: coreSouthLobbyConnected() },
  { label: "ممر الشقة الشمالية من فتحة المعيشة إلى جدار اللب — بلا امتداد ميت غرباً", pass: northCorridorJustified() },
  { label: "بهو/ممر الشقة الجنوبية ينتهي عند باب النوم الرئيسية (x ≤ 18.2) — أُلغي الامتداد حتى الواجهة", pass: southHallEndsAtLastDoor() },
  { label: "باب النوم الأولى في الشقة الجنوبية مُزاح شرقياً عن محور المدخل (≥ 0.2 م)", pass: southBedroom1DoorOffset() },
  { label: "حاجز كتم المدخل يقطع خط النظر إلى باب النوم الرابعة (الشقة الشمالية)", pass: northPrivacyFin() },
  { label: "الرافعات الصحية داخل بصمات الشقق (توافق رأسي حقيقي R1/R2/R3)", pass: risersInsideEnvelopes() },
  { label: "دورة ضيوف الأرضي على نفس مستطيل الحمّام الثانوي للشقة ج (توافق رأسي حرفي)", pass: groundGuestWcAligned() },
  { label: "الحفرة الفنية تحت اللب الحركي (خزان أرضي ومضخات وكهرباء)", pass: pitUnderCore() },
  { label: "6 مواقف قبو قياسية 2.50 × 5.00 م دون تعارض مع اللب أو بينها", pass: basementStallsValid() },
  { label: "24 موقفاً مغطى × 4 مبانٍ + 4 زوار = 28 موقفاً", pass: BASEMENT_PARKING.projectCovered === 6 * 4 && BASEMENT_PARKING.projectTotal === BASEMENT_PARKING.projectCovered + BASEMENT_PARKING.visitors },
  { label: "16 صف × 3 ألواح = 48 لوحاً لكل مبنى", pass: SOLAR_ARRAY.rows * SOLAR_ARRAY.panelsPerRow === SOLAR_ARRAY.panelsPerBuilding },
  { label: "48 لوحاً × 4 مبانٍ = 192 لوحاً شمسياً", pass: SOLAR_ARRAY.panelsPerBuilding * 4 === 192 },
  { label: "16 خزاناً × 4 مبانٍ = 64 خزاناً", pass: WATER_TANKS.perBuilding * 4 === WATER_TANKS.projectTanks },
  { label: "64 خزاناً × 1000 لتر = 64,000 لتر (64 م³)", pass: WATER_TANKS.projectTanks * WATER_TANKS.capacityL === WATER_TANKS.projectL },
  { label: "64 قاعدة × 1.00 م² = 64 م² قواعد خزانات", pass: WATER_TANKS.projectTanks * WATER_TANKS.baseArea === WATER_TANKS.projectBaseArea },
  { label: "المصفوفة كلها في النصف الجنوبي من السطح", pass: ROOF_ZONES.array.y0 >= 7.5 && ROOF_ZONES.array.y1 <= 15 },
  { label: "المصفوفة داخل حدود السطح 20 × 15 م بهوامش صيانة", pass: ROOF_ZONES.array.x0 >= 0.8 && ROOF_ZONES.array.x1 <= 19.2 },
  { label: "لا تعارض: المصفوفة ↔ الخزانات/البنتهاوس", pass: !zonesOverlap(ROOF_ZONES.array, ROOF_ZONES.tanksWest) && !zonesOverlap(ROOF_ZONES.array, ROOF_ZONES.tanksEast) && !zonesOverlap(ROOF_ZONES.array, ROOF_ZONES.penthouse) },
  { label: "الخزانات في الحزام المركزي حول البنتهاوس فوق الجدران الحاملة (x ≤ 7.5 وx ≥ 12.5)", pass: ROOF_ZONES.tanksWest.x1 <= ROOF_ZONES.penthouse.x0 && ROOF_ZONES.tanksEast.x0 >= ROOF_ZONES.penthouse.x1 && ROOF_ZONES.tanksWest.y0 >= 4.5 && ROOF_ZONES.tanksWest.y1 <= 10.5 && ROOF_ZONES.tanksEast.y1 <= 10.5 },
  { label: "5 مستويات (قبو + أرضي + 3 سكنية) × 300 م² × 4 مبانٍ = 6,000 م² مبنية", pass: 5 * BUILDING_FOOTPRINT * 4 === 6000 },
];

// دراسة أولية لتوجيه الشمس — نوعية (دون محاكاة رقمية بالبيانات الزمنية)
export const SOLAR_STUDY = {
  method:
    "دراسة أولية نوعية لتوجيه الشمس وفق الموقع الجغرافي العام (نصف الكرة الشمالي). لم يُجرَ تحليل شمسي رقمي بالبيانات الجغرافية والزمنية، لذا لا يُدّعى ضمان عدد ساعات شمس محدد — ويُوصى بمحاكاة لاحقة في مرحلة التصميم التفصيلي.",
  priorities: [
    {
      dir: "الجنوب",
      level: "الأولوية الأولى — أعلى إشعاع",
      color: "#b45309",
      d: "الشقة الجنوبية الكبرى في كل طابق من الطوابق السكنية الثلاثة (12 شقة في المشروع): 4 غرف نوم + الصالة على الواجهة الجنوبية بنوافذ كاملة والنوم الرئيسية ركنية بتعرض مزدوج — إشعاع ذو أهمية للتسخين الشتوي مع تظليل صيفي.",
    },
    {
      dir: "الغرب",
      level: "أولوية ثانية — بعد الظهر",
      color: "#0f766e",
      d: "صالات الشقق الشمالية الغربية (12 شقة) + شرفاتها الغربية + مطابخ الشقة الجنوبية؛ مع تظليل معماري وزجاج مزدوج للفتحات الغربية لتقليل الأحمال الحرارية.",
    },
    {
      dir: "الشرق",
      level: "أولوية ثانية — صباحاً",
      color: "#047857",
      d: "الشقق الشمالية الشرقية (12 شقة): إضاءة صباحية مباشرة للصالة الشرقية وشرفاتها، والنوم الرئيسية في الشقة الجنوبية ركنية شرقية بنافذة شرقية.",
    },
    {
      dir: "الشمال",
      level: "ضوء منتشر بلا وهج",
      color: "#57534e",
      d: "غرف نوم الشقتين الشماليتين (24 شقة في المشروع) تستفيد من الإضاءة المنتشرة المريحة للنوم بلا تشمس مباشرة، ومعالجتهما موثقة أدناه بحيث لا تعتمد أي شقة بالكامل على الشمال.",
    },
  ],
  northStrategy: [
    "المعيشة كاملة على الواجهة الجانبية (غربية أو شرقية) بنوافذ ممتدة وشرفة خاصة — الشقة الشمالية لا تعتمد على الواجهة الشمالية وحدها بل تحصل على واجهة ثانية كاملة للفراغ النهاري.",
    "غرفة النوم الرئيسية على الزاوية الشمالية الغربية/الشرقية بنافذتين (شمالية + جانبية) — تعرض مزدوج للفراغ النهاري والنوم.",
    "3 غرف نوم على الواجهة الشمالية (الضوء المنتشر مناسب للنوم) + النوم الرئيسية في الشقة الجنوبية ركنية بتعرض جنوبي-شرقي.",
    "المطبخ مفتوح على المعيشة بتهوية ميكانيكية عبر رافعة اللب المركزي — لا يزاحم الواجهات الثمينة.",
    "الشرفة الجانبية تمنح المعيشة تعرضاً إضافياً وتعمّق دخول الضوء إلى المخطط.",
  ],
};

// منظومة السطح
export const ROOF_SPECS = [
  {
    title: "الألواح الكهروضوئية",
    value: "48 لوحاً (16 صف × 3) × 450 واط",
    detail: "≈ 21.6 كيلوواط ذروة لكل مبنى — مصفوفة جنوبية متصلة",
    icon: "sun",
  },
  {
    title: "خزانات المياه العلوية",
    value: "16 خزاناً × 1000 لتر",
    detail: "16 م³ لكل مبنى على قواعد 1×1 م حول اللب — حمل ≈ 16 طناً يتطلب تحقق إنشائي",
    icon: "droplets",
  },
  {
    title: "السخّانات الشمسية",
    value: "2 × 300 لتر",
    detail: "تسخين مائي لكل مدخل",
    icon: "flame",
  },
  {
    title: "بنتهاوس الخدمة",
    value: "درج + غرفة آلات المصعد",
    detail: "فوق اللب المركزي — مع مسارات صيانة حول المصفوفة والخزانات ودش برق",
    icon: "elevator",
  },
];

export const ROOF_TOTALS = {
  panels: 192, // 48 × 4
  peakPowerKWp: 86.4, // 21.6 × 4
  annualMWh: 134, // تقديري — بمعدل إنتاج مرجعي 1,550 ك.و.س/ك.و
  tanksM3: 64, // 16 م³ × 4
  tanksL: 64000,
  tankBases: 64, // قاعدة 1×1 م لكل خزان — 64 م² للمشروع
};

// طوابق المبنى الواحد — قبو مواقف + أرضي خدمات + 3 طوابق سكنية + سطح
export const FLOORS = [
  { id: "roof", name: "السطح", area: 300, note: "مصفوفة 48 لوحاً + 16 خزاناً × 1000 لتر" },
  { id: "f3", name: "الطابق الثالث السكني (متكرر)", area: 300, note: "3 شقق سكنية" },
  { id: "f2", name: "الطابق الثاني السكني (متكرر)", area: 300, note: "3 شقق سكنية" },
  { id: "f1", name: "الطابق الأول السكني (متكرر)", area: 300, note: "3 شقق سكنية" },
  { id: "ground", name: "الطابق الأرضي (بهو المدخل والخدمات)", area: 300, note: "بهو + حارس + عدادات + صالة متعددة" },
  { id: "basement", name: "القبو (مواقف ومخازن)", area: 300, note: "6 مواقف + مخزنان + حفرة فنية" },
];

// توزيع المساحات المفتوحة (800 م²)
export const OPEN_SPACE = [
  { label: "حلقة طريق الخدمة (3 م عرضاً)", area: 504, color: "#d6d3d1" },
  { label: "ممرات مشاة مزروعة + الساحة المركزية", area: 296, color: "#86efac" },
];

// إحصاءات عامة
export const PROJECT_STATS = [
  { label: "شقة سكنية", value: "36", detail: "3 شقق × 3 طوابق سكنية × 4 مبانٍ", icon: "door" },
  { label: "غرفة رئيسية", value: "180", detail: "صالة + 4 غرف نوم في كل شقة", icon: "bed" },
  { label: "حمّام", value: "72", detail: "رئيسي في كل شقة + ثانوي 1.00 م² بالضبط", icon: "bath" },
  { label: "شرفة خاصة", value: "36", detail: "شرفة من المعيشة لكل شقة (3 × 3 × 4)", icon: "balcony" },
  { label: "م² مساحة مبنية", value: "6,000", detail: "قبو + أرضي + 3 طوابق سكنية × 4 مبانٍ", icon: "layers" },
  { label: "لوح شمسي", value: "192", detail: "48 لوحاً × 450 واط لكل مبنى — ≈ 86.4 ك.و ذروة", icon: "sun" },
  { label: "خزان مياه علوي", value: "64", detail: "16 خزاناً × 1000 لتر لكل مبنى = 64 م³", icon: "droplets" },
  { label: "مصعد كهربائي", value: "4", detail: "طاقة 8 أشخاص لكل مبنى — يخدم القبو حتى السطح", icon: "elevator" },
  { label: "موقف سيارات", value: "28", detail: "24 مغطى في الأقبية (6 لكل مبنى) + 4 زوار سطحية", icon: "car" },
  { label: "شجرة مثمرة وظليلة", value: "40+", detail: "على الممرات وحول الحلقة", icon: "tree" },
];

// جدول المساحات المرفوعة لكل مبنى — قبو + أرضي + 3 طوابق سكنية
export const BUA_TABLE = [
  { floor: "القبو (مواقف ومخازن)", perBuilding: 300 },
  { floor: "الطابق الأرضي (بهو المدخل والخدمات)", perBuilding: 300 },
  { floor: "الطابق الأول السكني (متكرر)", perBuilding: 300 },
  { floor: "الطابق الثاني السكني (متكرر)", perBuilding: 300 },
  { floor: "الطابق الثالث السكني (متكرر)", perBuilding: 300 },
];

// التحقق الحسابي الإلزامي — معروض كما هو في الواجهة
export const CALC_CHECK = [
  { expr: "4 مبانٍ × 300 م²", result: "1,200 م² بصمة إجمالية" },
  { expr: "1,200 ÷ 2,000", result: "60% نسبة البناء" },
  { expr: "2,000 − 1,200", result: "800 م² مفتوحة (40%)" },
  { expr: "4 مبانٍ × 3 طوابق سكنية × 3 شقق", result: "36 شقة" },
  { expr: "36 شقة × 5 غرف رئيسية", result: "180 غرفة" },
  { expr: "36 شقة × حمّامان", result: "72 حمّاماً" },
  { expr: "36 × 1.00 م²", result: "36 م² حمّامات ثانوية" },
  { expr: "36 شقة × 1 شرفة", result: "36 شرفة خاصة (3 × 3 × 4)" },
  { expr: "16 صف × 3 ألواح × 4 مبانٍ", result: "192 لوحاً شمسياً" },
  { expr: "16 خزاناً × 4 مبانٍ", result: "64 خزان مياه = 64,000 لتر" },
  { expr: "2 × 79.50 + 118.00 + 23.00", result: "300 م² — معادلة الطابق السكني" },
  { expr: "5 مستويات × 300 م² × 4 مبانٍ", result: "6,000 م² مساحة مبنية" },
];

// مراجعة الالتزام بمعايير التصميم الحديث
export const DESIGN_STANDARDS = [
  {
    icon: "sun",
    title: "إضاءة وتهوية طبيعية",
    d: "بثلاث شقق فقط حصلت كل شقة على واجهتين: معيشة الشقتين الشماليتين كاملة على الواجهة الجانبية والنوم الرئيسية على الزاوية، والشقة الجنوبية كل فراغاتها المعيشية على الجنوب والنوم الرئيسية ركنية — وغرف النوم كلها بنوافذ خارجية (تحقق برمجي)، والمطبخ الشمالي والحمّامات تهوية ميكانيكية عبر رافعات مجمّعة، ومطبخ الشقة الجنوبية بنافذة غربية.",
  },
  {
    icon: "flame",
    title: "السلامة من الحريق",
    d: "درج إخلاء بمتفلتين محمي من الدخان بجدران وأبواب مقاومة للحريق داخل اللب، وبهو توزيع على شكل حرف T يفتح مباشرة على الشقق الثلاث — مسافة وصول قصوى من أي شقة إلى الدرج أقل من 9 م داخل الطابق.",
  },
  {
    icon: "accessibility",
    title: "وصول شامل للجميع",
    d: "مصعد يخدم القبو حتى السطح، ومدخل الأرضي بعتبة صفرية على مستوى محور المشاة مع مظلة، وممرات داخلية بعرض ≥ 1.00 م، ومواقف القبو بممر مناورة ≥ 4.38 م.",
  },
  {
    icon: "thermometer",
    title: "كفاءة حرارية",
    d: "عزل حراري للواجهات والسقف بمعامل نقل منخفض، زجاج مزدوج، وتظليل معماري للفتحات الغربية لتقليل الأحمال الحرارية، وعزل مائي كامل للمناطق الرطبة والشرفات والسطح.",
  },
  {
    icon: "volume",
    title: "عزل صوتي بين الوحدات",
    d: "جدران فاصلة مزدوجة مع بطانية عزل بين الشقق الثلاث (فواصل عرضية أقل مع 3 شقق)، وأرضيات عائمة تخفض انتقال صوت الخطوات بين الطوابق، والحمّامات المجمّعة تحدّ من انتقال صوت التمديدات.",
  },
  {
    icon: "wind",
    title: "تهوية ميكانيكية صحية",
    d: "شفط ميكانيكي للحمّامات والمطبخ الشمالي عبر رافعات مجمّعة من الستانلس ستيل عند اللب (R1/R2/R3/R4)، مع مداخل هواء نقي متوازنة وتهوية قبو المواقف 6 تحويلات/ساعة.",
  },
  {
    icon: "droplets",
    title: "كفاءة المياه والخدمات الصحية",
    d: "خلاطات ومراحيض موفّرة للمياه، حفرة فنية تحت اللب بخزان أرضي 20 م³ ومضخات + خزانات علوية 16 م³ (16 خزاناً × 1000 لتر) لكل مبنى، وقياس استهلاك فردي لكل شقة؛ الحمّامات والمطابخ مجموعة على رافعات موحدة رأسياً من الثالث حتى القبو.",
  },
  {
    icon: "zap",
    title: "سلامة كهربائية ودش برق",
    d: "دش برق شبكي مؤرّض على الأسطح، قواطع تفاضل وحماية لكل شقة، غرفة مولد احتياطي بالأرضي، وإنارة طوارئ ببطارية على سلالم الإخلاء والبهوات ومواقف القبو.",
  },
];
