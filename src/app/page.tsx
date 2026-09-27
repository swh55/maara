import {
  Accessibility,
  ArrowUpDown,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  Compass,
  DoorOpen,
  Droplets,
  Fence,
  Flame,
  Layers,
  Map,
  Ruler,
  ShieldCheck,
  Sun,
  Table2,
  Thermometer,
  Trees,
  Volume2,
  Wind,
  XCircle,
  Zap,
} from "lucide-react";
import { SitePlan } from "@/components/arch/site-plan";
import { BuildingExplorer } from "@/components/arch/building-explorer";
import {
  NorthUnitPlan,
  SouthUnitPlan,
  UnitRoomsTable,
} from "@/components/arch/apartment-plan";
import {
  AVERAGE_NET,
  APARTMENT_NOTES,
  AUDIT,
  BUA_TABLE,
  BALCONY,
  BUILDING_FOOTPRINT,
  CALC_CHECK,
  DESIGN_STANDARDS,
  FLOOR_EQUATION,
  NORTH_UNIT,
  PROJECT_STATS,
  ROOF_TOTALS,
  SITE,
  SOLAR_STUDY,
  SOUTH_UNIT,
  WATER_TANKS,
} from "@/lib/arch-data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  door: DoorOpen,
  bed: BedDouble,
  bath: Bath,
  layers: Layers,
  elevator: ArrowUpDown,
  car: Car,
  sun: Sun,
  tree: Trees,
  balcony: Fence,
  droplets: Droplets,
};

const STANDARD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  flame: Flame,
  accessibility: Accessibility,
  thermometer: Thermometer,
  volume: Volume2,
  wind: Wind,
  droplets: Droplets,
  zap: Zap,
};

const NAV = [
  { href: "#site", label: "مخطط الموقع" },
  { href: "#building", label: "المبنى طابقاً بطابق" },
  { href: "#solar", label: "دراسة الشمس" },
  { href: "#apartment", label: "الشقق النموذجية" },
  { href: "#standards", label: "معايير التصميم" },
  { href: "#numbers", label: "ميزان المساحات" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 arch-font">
      {/* ===== الترويسة ===== */}
      <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid place-items-center size-10 rounded-xl bg-emerald-700 text-white shrink-0">
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-extrabold text-white leading-tight truncate">
                المجمع السكني الأخضر
              </p>
              <p className="text-xs text-stone-400">قطعة 50 × 40 م — 2000 م²</p>
            </div>
          </div>
          <nav aria-label="أقسام المخطط" className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Badge className="bg-emerald-700 hover:bg-emerald-700 shrink-0 hidden sm:inline-flex">
            عرض تصميمي
          </Badge>
        </div>
      </header>

      <main className="flex-1">
        {/* ===== الواجهة ===== */}
        <section className="relative overflow-hidden bg-gradient-to-bl from-emerald-950 via-stone-900 to-stone-900 text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(to_left,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="bg-emerald-600 hover:bg-emerald-600">مخطط معماري أولي</Badge>
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">
                4 مبانٍ — 5 طوابق — 3 شقق في كل طابق سكني
              </Badge>
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">
                تصميم مبدئي Conceptual / Preliminary
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-[1.25] max-w-3xl">
              تصميم متكامل لمجمع سكني على قطعة أرض{" "}
              <span className="text-emerald-400">50 × 40 متراً</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-300 leading-8 max-w-3xl">
              أربعة مبانٍ سكنية تشغل 60% من مساحة الأرض (1200 م²)، ويخصص الباقي لطريق خدمة
              دائري وحدائق ومداخل. كل مبنى يتكون من قبو وأرضي وثلاثة طوابق سكنية وسطح مجهّز
              بمصفوفة شمسية جنوبية (48 لوحاً) و16 خزان مياه، مع مصعد في كل مبنى
              و<strong className="text-white">36 شقة (3 شقق فقط في كل طابق)</strong> بمتوسط صافي{" "}
              <strong className="text-white">{AVERAGE_NET.toFixed(2)} م²</strong> — كل شقة تحتوي خمس غرف
              رئيسية (صالة + 4 غرف نوم) ومطبخاً وحمّامين (الثانوي 1.00 م² بالضبط) وبهو مدخل
              وشرفة ركنية خاصة — مع معالجة معمارية لإضاءة الشقق الشمالية بواجهتين.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#site"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-bold transition-colors"
              >
                <Map className="size-4" />
                استعراض مخطط الموقع
              </a>
              <a
                href="#apartment"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-sm font-bold transition-colors"
              >
                <Ruler className="size-4" />
                مخططا الشقتين النموذجيتين
              </a>
            </div>

            {/* أرقام سريعة */}
            <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
              {[
                { k: "بصمة البناء", v: "60% — 1200 م²" },
                { k: "الشقق + الشرفات", v: "36 شقة + 36 شرفة" },
                { k: "الطاقة الشمسية", v: "192 لوحاً — 86.4 ك.و" },
                { k: "خزانات المياه", v: "64 خزاناً — 64 م³" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-white/5 border border-white/10 px-4 py-4 backdrop-blur-sm">
                  <dt className="text-xs text-stone-400 font-semibold">{s.k}</dt>
                  <dd className="text-lg sm:text-xl font-extrabold text-emerald-300 mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== الإحصاءات ===== */}
        <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 scroll-mt-20">
          <SectionHeader
            icon={<Layers className="size-5" />}
            title="أرقام المشروع"
            subtitle="حصيلة إعادة التصميم بثلاث شقق في الطابق: 4 مبانٍ × 3 طوابق × 3 شقق = 36 شقة أوسع وأكثر راحة"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {PROJECT_STATS.map((s) => {
              const Icon = STAT_ICONS[s.icon] ?? Layers;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span className="grid place-items-center size-10 rounded-xl bg-emerald-100 text-emerald-700 mb-3">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-2xl font-black text-stone-900 tabular-nums">{s.value}</p>
                  <p className="text-sm font-bold text-stone-700 mt-0.5">{s.label}</p>
                  <p className="text-xs text-stone-500 mt-1 leading-5">{s.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== مخطط الموقع ===== */}
        <section id="site" className="bg-white border-y border-stone-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <SectionHeader
              icon={<Compass className="size-5" />}
              title="المخطط العام للموقع"
              subtitle="أربعة مبانٍ 20×15 م حول محور مشاة مزروع ونافورة مركزية، مع حلقة خدمة داخلية وبوابة جنوبية — بصمة المباني دون تغيير"
            />
            <SitePlan />
          </div>
        </section>

        {/* ===== المبنى ===== */}
        <section id="building" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 scroll-mt-16">
          <SectionHeader
            icon={<Building2 className="size-5" />}
            title="المبنى السكني طابقاً بطابق"
            subtitle="قبو بسبعة مواقف، أرضي للمدخل، ثلاثة طوابق سكنية بثلاث شقق فقط وثلاث شرفات ركنية، وسطح بمصفوفة جنوبية 16×3 وخزانات مركزية فوق اللب"
          />
          <BuildingExplorer />
        </section>

        {/* ===== دراسة الشمس ===== */}
        <section id="solar" className="bg-white border-y border-stone-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <SectionHeader
              icon={<Sun className="size-5" />}
              title="دراسة أولية لتوجيه الشمس"
              subtitle="الواجهة الجنوبية ذات الأولوية للإشعاع، ثم الشرق والغرب، مع معالجة معمارية حقيقية للشقتين الشماليتين — دراسة نوعية دون ادعاء محاكاة رقمية"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SOLAR_STUDY.priorities.map((p) => (
                <div key={p.dir} className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="inline-block size-4 rounded-full" style={{ backgroundColor: p.color }} />
                    <h4 className="font-extrabold text-stone-900">{p.dir}</h4>
                  </div>
                  <p className="text-xs font-bold mb-2" style={{ color: p.color }}>{p.level}</p>
                  <p className="text-[13px] leading-6 text-stone-600">{p.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <h4 className="font-extrabold text-emerald-900 mb-3">كيف عولجت الشقتان الشماليتان معماريًا؟</h4>
                <ul className="space-y-2.5">
                  {SOLAR_STUDY.northStrategy.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 leading-7">
                      <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-1.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-stone-200 bg-white p-5">
                  <p className="font-extrabold text-stone-800 text-sm mb-2">حصيلة التوزيع في كل طابق</p>
                  <ul className="text-[13px] leading-6 text-stone-600 space-y-1.5">
                    <li>• شقة جنوبية واحدة كاملة العرض: 5 غرف رئيسية على الجنوب + نوم رابعة ركنية شرقية</li>
                    <li>• شقتان شماليتان: صالة على الواجهة الجانبية + نوم رئيسية على الزاوية + 3 نوم شمالية</li>
                    <li>• 3 شرفات زاوية — لكل شقة شرفتها الخاصة</li>
                    <li>• 24 شقة شمالية في المشروع تحصل على واجهة ثانية كاملة (غربية/شرقية) للفراغ النهاري</li>
                  </ul>
                </div>
                <p className="text-[13px] leading-6 text-stone-500 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <strong className="text-amber-800">حدود الدراسة:</strong> {SOLAR_STUDY.method}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== الشقتان النموذجيتان ===== */}
        <section id="apartment" className="bg-white border-y border-stone-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <SectionHeader
              icon={<BedDouble className="size-5" />}
              title="الشقتان النموذجيتان — 81.34 م² و118.00 م²"
              subtitle={`كل شقة: خمس غرف رئيسية (صالة + 4 غرف نوم) مع مطبخ وحمّام رئيسي وحمّام ثانوي 1.00 م² بالضبط وبهو مدخل وممر توزيع وشرفة ركنية كابولية 6.63 م² — المتوسط الصافي ${AVERAGE_NET.toFixed(2)} م² للشقة`}
            />

            {/* الشقة الشمالية */}
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-start">
              <div className="min-w-0 rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-5 plan-shadow">
                <NorthUnitPlan />
              </div>
              <div className="min-w-0 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["الشقة أ + ب (بمرايا)", "81.34 م² إجمالية", "5 غرف رئيسية", "مطبخ مفتوح", "حمّام ثانوي 1.00 م²", "شرفة زاوية من النوم الرئيسية"].map((c) => (
                    <Badge key={c} variant="outline" className="border-emerald-300 text-emerald-800 bg-emerald-50">
                      {c}
                    </Badge>
                  ))}
                </div>
                <UnitRoomsTable unit={NORTH_UNIT} />
              </div>
            </div>

            {/* الشقة الجنوبية */}
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-start mt-12">
              <div className="min-w-0 rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-5 plan-shadow order-2 lg:order-1">
                <SouthUnitPlan />
              </div>
              <div className="min-w-0 space-y-4 order-1 lg:order-2">
                <div className="flex flex-wrap gap-2">
                  {["الشقة ج (كاملة العرض)", "118.00 م² إجمالية", "5 غرف رئيسية على الجنوب", "مطبخ بنافذة", "حمّام ثانوي 1.00 م²", "شرفة زاوية من المعيشة"].map((c) => (
                    <Badge key={c} variant="outline" className="border-rose-300 text-rose-800 bg-rose-50">
                      {c}
                    </Badge>
                  ))}
                </div>
                <UnitRoomsTable unit={SOUTH_UNIT} />
                <div className="text-[13px] leading-6 text-stone-600 bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <p className="font-bold text-amber-800">توثيق المراجعة الهندسية للشقتين:</p>
                  <ul className="list-disc pr-4 space-y-1.5">
                    {APARTMENT_NOTES.map((n) => (
                      <li key={n.slice(0, 24)}>{n}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[13px] leading-6 text-stone-500 bg-stone-50 border border-stone-200 rounded-xl p-3.5">
                  يتكرر هذا التوزيع <strong className="text-stone-700">3 مرات في كل طابق</strong> (شقتان شماليتان
                  بالمرايا + شقة جنوبية) × 3 طوابق سكنية × 4 مبانٍ ={" "}
                  <strong className="text-emerald-700">36 شقة</strong> بإجمالي 180 غرفة رئيسية و72 حمّاماً
                  (منها 36 حمّاماً ثانوياً بمساحة 1.00 م² لكل منها) و36 شرفة ركنية (3 × 3 × 4) في المشروع كاملاً.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== معايير التصميم الحديثة ===== */}
        <section id="standards" className="bg-stone-100/60 border-b border-stone-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <SectionHeader
              icon={<ShieldCheck className="size-5" />}
              title="الالتزام بمعايير التصميم الحديث"
              subtitle="مراجعة شاملة للمخطط وفق متطلبات المباني السكنية الحديثة: السلامة، الوصول الشامل، الكفاءة الحرارية والصوتية، وجودة البيئة الداخلية"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DESIGN_STANDARDS.map((s) => {
                const Icon = STANDARD_ICONS[s.icon] ?? ShieldCheck;
                return (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-stone-200 bg-white p-4 hover:shadow-md transition-shadow"
                  >
                    <span className="grid place-items-center size-9 rounded-xl bg-emerald-100 text-emerald-700 mb-3">
                      <Icon className="size-4" />
                    </span>
                    <h4 className="font-extrabold text-stone-900 text-[15px]">{s.title}</h4>
                    <p className="text-[13px] leading-6 text-stone-600 mt-1.5">{s.d}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-[13px] leading-6 text-stone-500 bg-white border border-stone-200 rounded-xl p-4">
              ملاحظة: هذا المشروع بمرحلة التصميم المعماري المبدئي (Conceptual / Preliminary Architectural
              Design — Schematic Design) وليس تصميماً تنفيذياً معتمداً؛ وتخضع جميع التفاصيل
              الإنشائية والحريقية والميكانيكية للاعتماد النهائي من الجهات المختصة ووفق الكود المحلي
              المعتمد في منطقة المشروع قبل التنفيذ.
            </p>
          </div>
        </section>

        {/* ===== ميزان المساحات ===== */}
        <section id="numbers" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 scroll-mt-16">
          <SectionHeader
            icon={<Table2 className="size-5" />}
            title="ميزان المساحات والحسابات"
            subtitle="التحقق الرقمي من التزام التصميم بنسبة البناء 60% والمساحات المفتوحة 40% ومن مواصفات الشقق الثلاث والألواح والخزانات والشرفات"
          />

          {/* التحقق الحسابي الإلزامي */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="size-5 text-emerald-700" />
              <h3 className="font-extrabold text-stone-800">التحقق الحسابي الإلزامي — معادلات المواصفة النهائية</h3>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {CALC_CHECK.map((c) => (
                <div key={c.expr} className="rounded-xl bg-white border border-emerald-200 px-4 py-3">
                  <p className="font-extrabold text-emerald-800 tabular-nums text-[15px]">{c.expr}</p>
                  <p className="text-[13px] font-semibold text-stone-600 mt-1">= {c.result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* الفحوص البرمجية — تُحسب فعلياً من البيانات المركزية عند البناء */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="size-5 text-emerald-700" />
              <h3 className="font-extrabold text-stone-800">فحوص AUDIT برمجية — تُحسب فعلياً من مصدر البيانات الوحيد</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIT.map((a) => (
                <div
                  key={a.label}
                  className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[13px] font-semibold ${
                    a.pass ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-300 bg-red-50 text-red-800"
                  }`}
                >
                  {a.pass ? (
                    <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-700" />
                  ) : (
                    <XCircle className="size-4 shrink-0 mt-0.5 text-red-600" />
                  )}
                  {a.label}
                </div>
              ))}
            </div>
          </div>

          {/* شريط التوازن البصري */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 mb-6">
            <div className="flex h-9 w-full overflow-hidden rounded-lg text-xs font-bold text-white">
              <div className="bg-emerald-700 flex items-center justify-center" style={{ width: "60%" }}>
                مبانٍ 60%
              </div>
              <div className="bg-stone-400 flex items-center justify-center" style={{ width: "25.2%" }}>
                طريق خدمة
              </div>
              <div className="bg-emerald-400 flex items-center justify-center text-emerald-900" style={{ width: "14.8%" }}>
                حدائق ومداخل
              </div>
            </div>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-[13px] text-stone-600 font-semibold">
              <span>بصمة المباني: 1200 م²</span>
              <span>حلقة الطريق: 504 م²</span>
              <span>ممرات وحدائق ومداخل: 296 م²</span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 items-start">
            {/* جدول الأرض */}
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50 hover:bg-stone-50">
                    <TableHead className="text-right font-bold text-stone-600">بيان</TableHead>
                    <TableHead className="text-left font-bold text-stone-600">المساحة (م²)</TableHead>
                    <TableHead className="text-left font-bold text-stone-600">النسبة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-stone-800">إجمالي الأرض (50 × 40 م)</TableCell>
                    <TableCell className="text-left font-bold tabular-nums">2,000</TableCell>
                    <TableCell className="text-left tabular-nums">100%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-emerald-800">بصمة المباني الأربعة (4 × 300 م²)</TableCell>
                    <TableCell className="text-left font-bold tabular-nums">1,200</TableCell>
                    <TableCell className="text-left tabular-nums">60%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pr-8 text-stone-600">— حلقة طريق الخدمة (3 م)</TableCell>
                    <TableCell className="text-left tabular-nums">504</TableCell>
                    <TableCell className="text-left tabular-nums">25.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pr-8 text-stone-600">— ممرات مشاة وحدائق وساحة مركزية</TableCell>
                    <TableCell className="text-left tabular-nums">296</TableCell>
                    <TableCell className="text-left tabular-nums">14.8%</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-stone-100 hover:bg-stone-100">
                    <TableCell className="font-extrabold text-stone-800">المساحات المفتوحة المخصصة</TableCell>
                    <TableCell className="text-left font-extrabold tabular-nums">800</TableCell>
                    <TableCell className="text-left font-extrabold tabular-nums">40%</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* جدول المساحات المرفوعة */}
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50 hover:bg-stone-50">
                    <TableHead className="text-right font-bold text-stone-600">الطابق (لكل مبنى)</TableHead>
                    <TableHead className="text-left font-bold text-stone-600">المساحة (م²)</TableHead>
                    <TableHead className="text-left font-bold text-stone-600">× 4 مبانٍ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BUA_TABLE.map((r) => (
                    <TableRow key={r.floor}>
                      <TableCell className="font-semibold text-stone-800">{r.floor}</TableCell>
                      <TableCell className="text-left font-bold tabular-nums">{r.perBuilding}</TableCell>
                      <TableCell className="text-left tabular-nums">{r.perBuilding * 4}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-semibold text-amber-700">السطح (منظومة شمسية وخزانات)</TableCell>
                    <TableCell className="text-left tabular-nums text-stone-400">—</TableCell>
                    <TableCell className="text-left tabular-nums text-stone-400">—</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-emerald-800 hover:bg-emerald-800">
                    <TableCell className="font-extrabold text-white">إجمالي المساحة المبنية المرفوعة</TableCell>
                    <TableCell className="text-left font-extrabold text-white tabular-nums">1,500</TableCell>
                    <TableCell className="text-left font-extrabold text-white tabular-nums">6,000</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          {/* ملخص تنفيذي */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "التزام بالنسب",
                d: `نسبة البناء ${SITE.builtRatio}% كما هي مطلوبة تماماً، مع بصمة موحدة ${BUILDING_FOOTPRINT} م² لكل مبنى لم تتغير، والشرفات الركنية كابولية خارج حساب البصمة وخاضعة للكود المحلي.`,
                c: "border-emerald-300 bg-emerald-50",
              },
              {
                t: "جودة إعادة التوزيع",
                d: `ثلاث شقق فقط في الطابق: ${FLOOR_EQUATION} = 300 م² — صالتان جانبيتان كاملتان للشقتين الشماليتين وشقة جنوبية كاملة العرض، بمتوسط صافي ${AVERAGE_NET.toFixed(2)} م² للشقة (مقابل 59.54 م² في تصميم الشقق الأربع) وشرفة ركنية ${BALCONY.areaEach} م² لكل شقة.`,
                c: "border-amber-300 bg-amber-50",
              },
              {
                t: "استدامة وتحمّل السطح",
                d: `الأسطح الأربعة تحمل ${ROOF_TOTALS.panels} لوحاً شمسياً (≈ ${ROOF_TOTALS.peakPowerKWp} ك.و ذروة — ${ROOF_TOTALS.annualMWh} م.و.س سنوياً تقديرياً) وتخزّن ${WATER_TANKS.projectL.toLocaleString("en-US")} لتر (${ROOF_TOTALS.tanksM3} م³) على ${ROOF_TOTALS.tankBases} قاعدة 1×1 م حول البنتهاوس — بحمل مائي ≈ 16 طناً لكل مبنى يتطلب تحقق إنشائي قبل التنفيذ.`,
                c: "border-teal-300 bg-teal-50",
              },
            ].map((s) => (
              <div key={s.t} className={`rounded-2xl border p-5 ${s.c}`}>
                <h4 className="font-extrabold text-stone-900 mb-2">{s.t}</h4>
                <p className="text-sm leading-7 text-stone-700">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== التذييل الثابت ===== */}
      <footer className="mt-auto bg-stone-900 text-stone-400 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center size-9 rounded-lg bg-emerald-700 text-white">
              <Building2 className="size-4" />
            </span>
            <div>
              <p className="font-bold text-white text-sm">المجمع السكني الأخضر — مخطط معماري أولي</p>
              <p className="text-xs mt-0.5">قطعة 50 × 40 م | 4 مبانٍ | 36 شقة (3 في كل طابق) + 36 شرفة ركنية | مستوى تصميم تخطيطي قابل للتطوير التنفيذي</p>
            </div>
          </div>
          <p className="text-xs text-stone-500 text-center sm:text-left">
            جميع المساحات تقديرية وفق المرحلة التخطيطية — تخضع للتحقق الهندسي التنفيذي
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <span className="grid place-items-center size-12 rounded-2xl bg-emerald-700 text-white shrink-0 shadow-sm">
        {icon}
      </span>
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900">{title}</h2>
        <p className="text-sm sm:text-base text-stone-500 mt-1.5 leading-7 max-w-3xl">{subtitle}</p>
      </div>
    </div>
  );
}
