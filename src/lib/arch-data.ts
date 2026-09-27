// ============================================================
// بيانات المشروع المعماري — مجمع سكني على أرض 50×40 م (2000 م²)
// جميع الحسابات مبنية على متطلبات المالك:
// - 4 مبانٍ سكنية (بصمة إجمالية 1200 م² = 60% من الأرض)
// - كل مبنى: قبو + أرضي + 3 طوابق سكنية + سطح
// - كل طابق سكني: 3 شقق × ~100 م²
// - كل شقة: 5 غرف + حمام رئيسي + حمام ثانوي + بهو مدخل
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

// توزيع المساحات المفتوحة (800 م²)
export const OPEN_SPACE = [
  { label: "حلقة طريق الخدمة (3 م عرضاً)", area: 504, color: "#d6d3d1" },
  { label: "ممرات مشاة مزروعة + الساحة المركزية", area: 296, color: "#86efac" },
];

// طوابق المبنى الواحد
export const FLOORS = [
  { id: "roof", name: "السطح", area: 300, note: "منظومة شمسية + خزانات مياه" },
  { id: "f3", name: "الطابق الثالث السكني", area: 300, note: "3 شقق سكنية" },
  { id: "f2", name: "الطابق الثاني السكني", area: 300, note: "3 شقق سكنية" },
  { id: "f1", name: "الطابق الأول السكني", area: 300, note: "3 شقق سكنية" },
  { id: "ground", name: "الطابق الأرضي", area: 300, note: "بهو المدخل + الخدمات" },
  { id: "basement", name: "القبو", area: 300, note: "مواقف + مخازن + معدات" },
];

// غرف الشقة النموذجية (5 غرف + حمامان + بهو) = 100 م²
export interface RoomSpec {
  name: string;
  type: string;
  area: number;
  color: string;
}

export const APARTMENT_ROOMS: RoomSpec[] = [
  { name: "المعيشة (وصالة الطعام)", type: "معيشة", area: 23.5, color: "#ecfdf5" },
  { name: "بهو المدخل", type: "توزيع", area: 5, color: "#f5f5f4" },
  { name: "المطبخ", type: "خدمي", area: 12, color: "#fffbeb" },
  { name: "ممر التوزيع (بخزائن مدمجة)", type: "توزيع", area: 11, color: "#e7e5e4" },
  { name: "غرفة النوم الرئيسية", type: "نوم", area: 14, color: "#fafaf9" },
  { name: "الحمام الرئيسي (ملحق بالنوم الرئيسية)", type: "صحي", area: 4.5, color: "#f0fdfa" },
  { name: "غرفة النوم الثانية", type: "نوم", area: 13, color: "#fafaf9" },
  { name: "غرفة النوم الثالثة", type: "نوم", area: 13, color: "#fafaf9" },
  { name: "الحمام الثانوي", type: "صحي", area: 4, color: "#f0fdfa" },
];

export const APARTMENT_TOTAL = APARTMENT_ROOMS.reduce((s, r) => s + r.area, 0); // 100

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
  { label: "شقة سكنية", value: "36", detail: "3 شقق × 3 طوابق × 4 مبانٍ", icon: "door" },
  { label: "غرفة سكنية", value: "180", detail: "5 غرف في كل شقة", icon: "bed" },
  { label: "حمّام", value: "72", detail: "رئيسي + ثانوي في كل شقة", icon: "bath" },
  { label: "م² مساحة مبنية", value: "6,000", detail: "5 طوابق مأهولة × 4 مبانٍ", icon: "layers" },
  { label: "مصعد كهربائي", value: "4", detail: "طاقة 8 أشخاص لكل مبنى", icon: "elevator" },
  { label: "موقف سيارات", value: "≈ 56", detail: "قبو كل مبنى + مواقف الزوار", icon: "car" },
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
