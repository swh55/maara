"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  BedDouble,
  Car,
  Droplets,
  Flame,
  Layers,
  Sun,
  Warehouse,
  Zap,
} from "lucide-react";
import { BasementPlan, GroundPlan, RoofPlan, TypicalPlan } from "./floor-plans";
import { BUILDING_FOOTPRINT, ROOF_SPECS, ROOF_TOTALS } from "@/lib/arch-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FloorTab = "roof" | "typical" | "ground" | "basement";

const STACK = [
  { id: "roof", label: "السطح", sub: "منظومة شمسية + خزانات", color: "bg-amber-500", tab: "roof" as FloorTab, icon: Sun },
  { id: "f3", label: "الطابق الثالث السكني", sub: "4 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "f2", label: "الطابق الثاني السكني", sub: "4 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "f1", label: "الطابق الأول السكني", sub: "4 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "ground", label: "الطابق الأرضي", sub: "بهو المدخل + خدمات", color: "bg-stone-500", tab: "ground" as FloorTab, icon: DoorIcon },
  { id: "basement", label: "القبو", sub: "مواقف + مخازن + معدات", color: "bg-zinc-600", tab: "basement" as FloorTab, icon: Car },
];

function DoorIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
      {...props}
    >
      <path d="M4 21h16" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M14 10h.01" />
    </svg>
  );
}

export function BuildingExplorer() {
  const [tab, setTab] = useState<FloorTab>("typical");

  return (
    <div className="space-y-6">
      {/* مقطع الطوابق */}
      <Card className="border-stone-200 bg-gradient-to-l from-stone-50 to-white">
        <CardContent className="py-5">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="size-5 text-emerald-700" />
            <h3 className="font-extrabold text-stone-800">مقطع المبنى الواحد — انقر على أي طابق لعرض مخططه</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {STACK.map((f) => {
              const Icon = f.icon;
              const isActive = f.tab === tab;
              return (
                <button
                  key={f.id}
                  onClick={() => setTab(f.tab)}
                  aria-pressed={isActive}
                  className={`group rounded-xl border p-3 text-right transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    isActive
                      ? "border-emerald-700 bg-emerald-50 shadow-sm"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`grid place-items-center size-7 rounded-lg text-white ${f.color}`}>
                      <Icon className="size-4" />
                    </span>
                    <span className="font-bold text-[13px] text-stone-800 leading-tight">{f.label}</span>
                  </div>
                  <p className="text-xs text-stone-500">{f.sub}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(v as FloorTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto bg-stone-100 p-1 rounded-xl">
          <TabsTrigger value="basement" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:font-bold">
            القبو
          </TabsTrigger>
          <TabsTrigger value="ground" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:font-bold">
            الأرضي
          </TabsTrigger>
          <TabsTrigger value="typical" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:font-bold">
            طابق سكني نموذجي
          </TabsTrigger>
          <TabsTrigger value="roof" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:font-bold">
            السطح الشمسي
          </TabsTrigger>
        </TabsList>

        {/* ===== القبو ===== */}
        <TabsContent value="basement" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-zinc-700" }}
            title="القبو — مواقف السيارات والمخازن"
            features={[
              { icon: Car, text: "5 مواقف قياسية (2.5 × 5.0 م) — 20 موقفاً مغطى للمشروع + 3 مواقف زوار" },
              { icon: ArrowUpDown, text: "ممر مناورة بعرض 5.3 م يلتف حول اللب ويتصل بالمنحدر مباشرة" },
              { icon: Warehouse, text: "مخزنان سكنيان (2.3 × 3.8 م) + خزان مياه أرضي 20 م³ وغرفة مضخات" },
              { icon: Zap, text: "غرفة كهرباء رئيسية وتهوية ومولّد احتياطي، مع وصول مباشر للدرج والمصعد" },
            ]}
            plan={<BasementPlan />}
          />
        </TabsContent>

        {/* ===== الأرضي ===== */}
        <TabsContent value="ground" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-stone-600" }}
            title="الطابق الأرضي — المدخل والخدمات المشتركة"
            features={[
              { icon: DoorIcon, text: "بهو مدخل رئيسي بصناديق بريد ومقاعد انتظار" },
              { icon: ArrowUpDown, text: "لب حركي: مصعد (8 أشخاص) + درج متفلتين" },
              { icon: BedDouble, text: "صالة متعددة الأغراض 33 م² + حضانة أطفال" },
              { icon: Zap, text: "إدارة واستقبال وأمن وعدادات وغرفة نفايات بباب خدمة خارجي" },
            ]}
            plan={<GroundPlan />}
          />
        </TabsContent>

        {/* ===== الطابق النموذجي ===== */}
        <TabsContent value="typical" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-emerald-700" }}
            title="الطابق السكني النموذجي — أربع شقق حول اللب الحركي"
            features={[
              { icon: BedDouble, text: "4 شقق متطابقة × 68.70 م² (5 غرف رئيسية + مطبخ منفصل + حمّامان + بهو)" },
              { icon: DoorIcon, text: "لب حركي 25.2 م²: درج بمتفلتين محمي + مصعد 8 أشخاص + بهو توزيع يفتح على الشقق الأربعة" },
              { icon: Sun, text: "كل غرف النوم والمعيشة على واجهة خارجية — والمطبخ والحمّامات تهوية ميكانيكية" },
              { icon: Layers, text: "رافعة صحية وكهربائية مركزية عند اللب تخدم الحمّامات والمطابخ — والتفاصيل في قسم «الشقة النموذجية»" },
            ]}
            plan={<TypicalPlan />}
          />
        </TabsContent>

        {/* ===== السطح ===== */}
        <TabsContent value="roof" className="mt-4 space-y-5">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-amber-500" }}
            title="السطح — منظومة الطاقة الشمسية وخزانات المياه"
            features={[
              { icon: Sun, text: "40 لوحاً كهروضوئياً (450 واط) بإنتاج ≈ 18 ك.و ذروة" },
              { icon: Droplets, text: "4 خزانات مياه × 2000 لتر على قاعدة خرسانية" },
              { icon: Flame, text: "سخّانان شمسيان 300 لتر لكل مدخل" },
              { icon: ArrowUpDown, text: "بنتهاوس: درج وصول + غرفة آلات المصعد" },
            ]}
            plan={<RoofPlan />}
          />

          {/* إجماليات المنظومة للمشروع */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: `${ROOF_TOTALS.panels} لوحاً`, l: "إجمالي الألواح (4 مبانٍ)", c: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
              { v: `${ROOF_TOTALS.peakPowerKWp} ك.و`, l: "قدرة ذروة تركيبية", c: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
              { v: `≈ ${ROOF_TOTALS.annualMWh} م.و.س`, l: "توليد سنوي متوقع", c: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
              { v: `${ROOF_TOTALS.tanksM3} م³`, l: "تخزين مياه علوي إجمالي", c: "text-teal-700", bg: "bg-teal-50 border-teal-200" },
            ].map((s) => (
              <div key={s.l} className={`rounded-xl border p-4 text-center ${s.bg}`}>
                <p className={`text-2xl font-extrabold ${s.c}`}>{s.v}</p>
                <p className="text-[13px] font-semibold text-stone-600 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500 leading-7 bg-white border border-stone-200 rounded-xl p-4">
            تغطي المنظومة الشمسية ما يقارب <strong className="text-stone-700">40% من استهلاك الخدمات المشتركة</strong>
            (الإنارة العامة، المصاعد، المضخات) مع شبكة قياس مزدوجة، وفق اتجاه جنوبي مائل بزاوية ≈ 30° ومسافات
            أمان وممشى صيانة بعرض 60 سم حول المصفوفات ونظام دش برق ممتد على الأسطح الأربعة.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FloorLayout({
  title,
  badge,
  features,
  plan,
}: {
  title: string;
  badge: { text: string; className: string };
  features: { icon: React.ComponentType<{ className?: string }>; text: string }[];
  plan: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_290px] items-start">
      <div className="rounded-2xl border border-stone-200 bg-white p-3 sm:p-4 plan-shadow">
        {plan}
      </div>
      <Card className="border-stone-200">
        <CardContent className="py-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold text-stone-800 leading-snug">{title}</h4>
            <Badge className={`${badge.className} hover:${badge.className} shrink-0`}>{badge.text}</Badge>
          </div>
          <ul className="space-y-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 leading-6">
                  <span className="grid place-items-center size-7 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Icon className="size-4" />
                  </span>
                  {f.text}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-stone-400 border-t border-stone-100 pt-3">
            البصمة المعيارية لكل مبنى: {BUILDING_FOOTPRINT} م² (20 × 15 م) — تتكرر المواصفات في المباني الأربعة.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
