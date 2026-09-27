"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  BedDouble,
  Car,
  Droplets,
  DoorOpen,
  Fence,
  Flame,
  Layers,
  Sun,
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
  { id: "f3", label: "الطابق الثالث السكني — متكرر", sub: "3 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "f2", label: "الطابق الثاني السكني — متكرر", sub: "3 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "f1", label: "الطابق الأول السكني — متكرر", sub: "3 شقق — 300 م²", color: "bg-emerald-600", tab: "typical" as FloorTab, icon: BedDouble },
  { id: "ground", label: "الطابق الأرضي — بهو المدخل", sub: "خدمات مشتركة — 300 م²", color: "bg-teal-600", tab: "ground" as FloorTab, icon: DoorOpen },
  { id: "basement", label: "القبو — مواقف ومخازن", sub: "6 مواقف + مخزنان", color: "bg-cyan-700", tab: "basement" as FloorTab, icon: Car },
];

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
          <TabsTrigger value="basement" className="py-2 px-1 text-[11px] sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-cyan-800 data-[state=active]:font-bold">
            قبو المواقف
          </TabsTrigger>
          <TabsTrigger value="ground" className="py-2 px-1 text-[11px] sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-teal-800 data-[state=active]:font-bold">
            الأرضي
          </TabsTrigger>
          <TabsTrigger value="typical" className="py-2 px-1 text-[11px] sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:font-bold">
            طابق سكني متكرر
          </TabsTrigger>
          <TabsTrigger value="roof" className="py-2 px-1 text-[11px] sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:font-bold">
            السطح الشمسي
          </TabsTrigger>
        </TabsList>

        {/* ===== القبو ===== */}
        <TabsContent value="basement" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-cyan-700" }}
            title="القبو — مواقف السيارات والمخازن"
            features={[
              { icon: Car, text: "6 مواقف قياسية 2.50 × 5.00 م لكل مبنى (24 مغطى للمشروع) ناتجة عن التخطيط الفعلي بعد توسيع اللب — لا أرقام موروثة من تصميم قديم" },
              { icon: ArrowUpDown, text: "ممر حلقي متصل حول اللب (4.38–5.00 م) يخدم كل المواقف ومخزنين — ومنحدر نزول خارج البصمة جنوباً بميل ≈14%" },
              { icon: Zap, text: "حفرة فنية تحت اللب: خزان أرضي 20 م³ + غرفة مضخات + لوحة كهرباء رئيسية — نقطة تجميع واحدة لمجمعات الصرف القادمة من الرافعات R1/R2/R3" },
              { icon: Droplets, text: "تهوية ميكانيكية 6 تحويلات/ساعة + مصارف أرضية بمصيدة زيوت + عزل مائي وتصريف محيطي — مواقف الزوار الأربعة سطحية على حلقة الخدمة" },
            ]}
            plan={<BasementPlan />}
          />
        </TabsContent>

        {/* ===== الأرضي ===== */}
        <TabsContent value="ground" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-teal-600" }}
            title="الطابق الأرضي — بهو المدخل والخدمات المشتركة"
            features={[
              { icon: DoorOpen, text: "باب المدخل على الواجهة المطلة على محور المشاة المركزي (شرقي في المباني أ/ج وغربي بالمرايا في ب/د) + مظلة كابولية ومنسوب صفري" },
              { icon: Fence, text: "لا شقق في الأرضي — مسار الزائر: الباب → بهو المدخل (22 م²) → اللب → الطوابق، دون مرور أمام أي وحدة أو كشف أي فراغ خاص (متطلب الخصوصية)" },
              { icon: ArrowUpDown, text: "البهو يصل مباشرة إلى باب اللب الجنوبي (x 7.60–8.40): درج + مصعد يخدم القبو حتى السطح، وحارس وعدادات وبريد ونظافة ودورة ضيوف" },
              { icon: Layers, text: "دورة الضيوف على نفس مستطيل الحمّام الثانوي للشقة ج — توافق رأسي حرفي على عمود الصرف نفسه (R2) من الثالث حتى القبو" },
            ]}
            plan={<GroundPlan />}
          />
        </TabsContent>

        {/* ===== الطابق المتكرر ===== */}
        <TabsContent value="typical" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-emerald-700" }}
            title="الطابق السكني المتكرر — ثلاث شقق فقط حول اللب الحركي"
            features={[
              { icon: BedDouble, text: "شقتان شماليتان × 79.50 م² (بمرايا) + شقة جنوبية كبرى 118.00 م² — كل شقة 5 غرف رئيسية + مطبخ + حمّامان + بهو، وحمّام ثانوي 1.00 م² بالضبط" },
              { icon: Sun, text: "3 شرفات في كل طابق سكني تفتح كلها من المعيشة — 9 شرفات في المبنى (36 في المشروع)، وشرفة الشقة الجنوبية قطعة L واحدة تلتف حول الزاوية" },
              { icon: Layers, text: "معادلة الطابق: 2 × 79.50 + 118.00 + 23.00 = 300 م² — الممرات تنتهي عند آخر باب تخدمه ولا امتدادات ميتة (فحص برمجي)" },
              { icon: ArrowUpDown, text: "لب حركي 23.00 م²: بهو على شكل T متصل (شمالي + ممر 1.00 م + جنوبي) يخدم الأبواب الثلاثة + درج بمتفلتين + مصعد 8 أشخاص + رافعة كهرباء" },
            ]}
            plan={<TypicalPlan />}
          />
        </TabsContent>

        {/* ===== السطح ===== */}
        <TabsContent value="roof" className="mt-4 space-y-5">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-amber-500" }}
            title="السطح — المصفوفة الجنوبية والخزانات المركزية"
            features={[
              { icon: Sun, text: "مصفوفة جنوبية متصلة: 16 صفاً (غرب ← شرق) × 3 ألواح (جنوب ← شمال) = 48 لوحاً × 450 واط ≈ 21.6 ك.و ذروة" },
              { icon: Droplets, text: "16 خزاناً × 1000 لتر = 16 م³ على قواعد 1×1 م في مجموعتين 4×2 حول البنتهاوس فوق حزام الجدران الحاملة" },
              { icon: Flame, text: "الحمل المائي ≈ 16 طناً لكل مبنى — ينقل بكمرات سطحية على الجدران المستمرة ويتطلب تحقق إنشائي" },
              { icon: ArrowUpDown, text: "بنتهاوس فوق اللب مباشرة (x 7.50–12.50 — محاذاة رأسية مع الدرج والمصعد): درج وصول + غرفة آلات + مسارات صيانة ودش برق" },
            ]}
            plan={<RoofPlan />}
          />

          {/* إجماليات المنظومة للمشروع */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: `${ROOF_TOTALS.panels} لوحاً`, l: "إجمالي الألواح (4 مبانٍ × 48)", c: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
              { v: `${ROOF_TOTALS.peakPowerKWp} ك.و`, l: "قدرة ذروة تركيبية", c: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
              { v: `${ROOF_TOTALS.tanksL.toLocaleString("en-US")} لتر`, l: "تخزين مياه علوي (64 خزاناً × 1000 لتر)", c: "text-teal-700", bg: "bg-teal-50 border-teal-200" },
              { v: `${ROOF_TOTALS.tankBases} م²`, l: "إجمالي قواعد الخزانات (1×1 م)", c: "text-teal-700", bg: "bg-teal-50 border-teal-200" },
            ].map((s) => (
              <div key={s.l} className={`rounded-xl border p-4 text-center ${s.bg}`}>
                <p className={`text-2xl font-extrabold ${s.c}`}>{s.v}</p>
                <p className="text-[13px] font-semibold text-stone-600 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500 leading-7 bg-white border border-stone-200 rounded-xl p-4">
            المصفوفة مصفوفة واحدة متصلة في <strong className="text-stone-700">الجزء الجنوبي من السطح</strong>: الصفوف
            الستة عشر متتابعة غرب ← شرق وكل صف 3 ألواح متتابعة جنوب ← شمال، بعرض لوح 1.13 م على الحافة الجنوبية
            وطول 1.72 م جنوباً-شمالاً (لا تدوير 90°) وفاصل تثبيت 2 سم موثق. تخزين المياه 64,000 لتر (64 م³)
            للمشروع بحمل مائي ≈ 16 طناً لكل مبنى قبل وزن الخزانات والقواعد — <strong className="text-stone-700">لا يُعد السطح جاهزاً إنشائياً</strong>{" "}
            ويتطلب تحقق إنشائي وتوزيع أحمال وربطاً بالهيكل. البنتهاوس والخزانات فوق اللب المركزي مباشرة لمواءمة
            الأحمال والتمديدات الرأسية. تغطي المنظومة الشمسية جزءاً من استهلاك الخدمات المشتركة
            (≈ 134 ميجاواط ساعة سنوياً — تقديري) مع شبكة قياس مزدوجة ونظام دش برق ممتد على الأسطح الأربعة.
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
