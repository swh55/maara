// ============================================================
// بيانات المشروع المعماري — مجمع سكني على أرض 50×40 م (2000 م²)
// جميع الحسابات مبنية على متطلبات المالك المحدَّثة:
// - 4 مبانٍ سكنية (بصمة إجمالية 1200 م² = 60% من الأرض)
// - كل مبنى: قبو + أرضي + 3 طوابق سكنية + سطح
// - كل طابق سكني: 4 شقق × ≈ 66 م² (تخطيط مكرر ومتطابق)
// - كل شقة: 5 غرف (معيشة + مطبخ + 3 نوم) + حمام رئيسي + حمام ثانوي + بهو مدخل
// - مصعد لكل مبنى + سطح مجهز بطاقة شمسية وخزانات
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
}

export const BUILDINGS: BuildingInfo[] = [
  { id: "a", name: "مبنى أ", position: "الشمال الغربي", x: 3, y: 3, w: 20, d: 15, color: "#0f766e" },
  { id: "b", name: "مبنى ب", position: "الشمال الشرقي", x: 27, y: 3, w: 20, d: 15, color: "#b45309" },
  { id: "c", name: "مبنى ج", position: "الجنوب الغربي", x: 3, y: 22, w: 20, d: 15, color: "#4d7c0f" },
  { id: "d", name: "مبنى د", position: "الجنوب الشرقي", x: 27, y: 22, w: 20, d: 15, color: "#9f1239" },
];

export const BUILDING_FOOTPRINT = 300; // 20 × 15 م
export const APARTMENTS_PER_FLOOR = 4;
export const RESIDENTIAL_FLOORS = 3;
export const APARTMENTS_PER_BUILDING = APARTMENTS_PER_FLOOR * RESIDENTIAL_FLOORS; // 12
export const TOTAL_APARTMENTS = APARTMENTS_PER_BUILDING * 4; // 48

// توزيع المساحات المفتوحة (800 م²)
export const OPEN_SPACE = [
  { label: "حلقة طريق الخدمة (3 م عرضاً)", area: 504, color: "#d6d3d1" },
  { label: "ممرات مشاة مزروعة + الساحة المركزية", area: 296, color: "#86efac" },
];

// طوابق المبنى الواحد
export const FLOORS = [
  { id: "roof", name: "السطح", area: 300, note: "منظومة شمسية + خزانات مياه" },
  { id: "f3", name: "الطابق الثالث السكني", area: 300, note: "4 شقق سكنية" },
  { id: "f2", name: "الطابق الثاني السكني", area: 300, note: "4 شقق سكنية" },
  { id: "f1", name: "الطابق الأول السكني", area: 300, note: "4 شقق سكنية" },
  { id: "ground", name: "الطابق الأرضي", area: 300, note: "بهو المدخل + الخدمات" },
  { id: "basement", name: "القبو", area: 300, note: "مواقف + مخازن + معدات" },
];

// غرف الشقة النموذجية (5 غرف + حمامان + بهو + ممر) ≈ 66 م²
export interface RoomSpec {
  name: string;
  type: string;
  area: number;
  color: string;
}

export const APARTMENT_ROOMS: RoomSpec[] = [
  { name: "المعيشة (وصالة الطعام)", type: "معيشة", area: 17.5, color: "#ecfdf5" },
  { name: "غرفة النوم الرئيسية", type: "نوم", area: 9.5, color: "#fafaf9" },
  { name: "الحمّام الرئيسي (ملحق بالنوم الرئيسية)", type: "صحي", area: 2.5, color: "#f0fdfa" },
  { name: "غرفة النوم الثانية", type: "نوم", area: 7.8, color: "#fafaf9" },
  { name: "غرفة النوم الثالثة", type: "نوم", area: 7.0, color: "#fafaf9" },
  { name: "المطبخ", type: "خدمي", area: 5.9, color: "#fffbeb" },
  { name: "بهو المدخل", type: "توزيع", area: 6.4, color: "#f5f5f4" },
  { name: "ممر التوزيع (بخزائن مدمجة)", type: "توزيع", area: 7.2, color: "#e7e5e4" },
  { name: "الحمّام الثانوي", type: "صحي", area: 2.2, color: "#f0fdfa" },
];

export const APARTMENT_TOTAL = APARTMENT_ROOMS.reduce((s, r) => s + r.area, 0); // 66.0

// منظومة السطح
export const ROOF_SPECS = [
  {
    title: "الألواح الكهروضوئية",
    value: "40 لوحاً × 450 واط",
    detail: "≈ 18 كيلوواط ذروة لكل مبنى",
    icon: "sun",
  },
  {
    title: "خزانات المياه العلوية",
    value: "4 × 2000 لتر",
    detail: "8 م³ لكل مبنى على قواعد خرسانية",
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
    detail: "مع ممشى صيانة 60 سم ودش برق",
    icon: "elevator",
  },
];

export const ROOF_TOTALS = {
  panels: 160, // 40 × 4
  peakPowerKWp: 72, // 18 × 4
  annualMWh: 116,
  tanksM3: 32, // 8 × 4
};

// إحصاءات عامة
export const PROJECT_STATS = [
  { label: "شقة سكنية", value: "48", detail: "4 شقق × 3 طوابق × 4 مبانٍ", icon: "door" },
  { label: "غرفة سكنية", value: "240", detail: "5 غرف في كل شقة", icon: "bed" },
  { label: "حمّام", value: "96", detail: "رئيسي + ثانوي في كل شقة", icon: "bath" },
  { label: "م² مساحة مبنية", value: "6,000", detail: "5 طوابق مأهولة × 4 مبانٍ", icon: "layers" },
  { label: "مصعد كهربائي", value: "4", detail: "طاقة 8 أشخاص لكل مبنى", icon: "elevator" },
  { label: "موقف سيارات", value: "≈ 40", detail: "≈ 6 في قبو كل مبنى + مواقف الزوار", icon: "car" },
  { label: "كيلوواط شمسي", value: "72", detail: "≈ 116 ميجاواط ساعة سنوياً", icon: "sun" },
  { label: "شجرة مثمرة وظليلة", value: "40+", detail: "على الممرات وحول الحلقة", icon: "tree" },
];

// جدول المساحات المرفوعة لكل مبنى
export const BUA_TABLE = [
  { floor: "القبو (مواقف ومخازن)", perBuilding: 300 },
  { floor: "الطابق الأرضي (بهو وخدمات)", perBuilding: 300 },
  { floor: "الطابق الأول السكني", perBuilding: 300 },
  { floor: "الطابق الثاني السكني", perBuilding: 300 },
  { floor: "الطابق الثالث السكني", perBuilding: 300 },
];

// مراجعة الالتزام بمعايير التصميم الحديث
export const DESIGN_STANDARDS = [
  {
    icon: "sun",
    title: "إضاءة وتهوية طبيعية",
    d: "كل غرف النوم والمعيشة والمطبخ على واجهة خارجية بنوافذ لا تقل عن 1/8 من مساحة الغرفة، وفق المتطلبات الصحية للإسكان.",
  },
  {
    icon: "flame",
    title: "السلامة من الحريق",
    d: "درج إخلاء محمي من الدخان بجدران وأبواب مقاومة للحريق 60 دقيقة، ومسافات وصول من أي شقة إلى الدرج ≤ 12 متراً.",
  },
  {
    icon: "accessibility",
    title: "وصول شامل للجميع",
    d: "مصعد يخدم القبو وحتى السطح، منحدر مدخل بميل 8%، وعتبات صفرية في الطابق الأرضي ومرافق مشتركة مناسبة لذوي الإعاقة.",
  },
  {
    icon: "thermometer",
    title: "كفاءة حرارية",
    d: "عزل حراري للواجهات والسقف بمعامل نقل منخفض، زجاج مزدوج، وتظليل معماري للفتحات الغربية لتقليل الأحمال الحرارية.",
  },
  {
    icon: "volume",
    title: "عزل صوتي بين الوحدات",
    d: "جدران فاصلة مزدوجة مع بطانية عزل بين الشقق، وأرضيات عائمة تخفض انتقال صوت الخطوات بين الطوابق.",
  },
  {
    icon: "wind",
    title: "تهوية ميكانيكية صحية",
    d: "شفط ميكانيكي للحمّامات الداخلية والمطبخ عبر رافعات مجمّعة من الستانلس ستيل، مع مداخل هواء نقي متوازنة.",
  },
  {
    icon: "droplets",
    title: "كفاءة المياه",
    d: "خلاطات ومراحيض موفّرة للمياه، خزان أرضي 20 م³ وعلوي 8 م³ لكل مبنى، وشبكة قياس استهلاك فردية لكل شقة.",
  },
  {
    icon: "zap",
    title: "سلامة كهربائية ودش برق",
    d: "دش برق شبكي مؤرّض على الأسطح، قواطع تفاضل وحماية لكل شقة، وإنارة طوارئ ببطارية على سلالم الإخلاء والبهوات.",
  },
];
