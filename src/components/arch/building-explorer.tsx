"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  BedDouble,
  Droplets,
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
  { id: "ground", label: "الطابق الأرضي السكني", sub: "3 شقق + بهو المدخل", color: "bg-teal-600", tab: "ground" as FloorTab, icon: DoorIcon },
  { id: "basement", label: "القبو السكني", sub: "3 شقق + مناور ضوء", color: "bg-cyan-700", tab: "basement" as FloorTab, icon: Fence },
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
          <TabsTrigger value="basement" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-cyan-800 data-[state=active]:font-bold">
            القبو السكني
          </TabsTrigger>
          <TabsTrigger value="ground" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-teal-800 data-[state=active]:font-bold">
            الأرضي السكني
          </TabsTrigger>
          <TabsTrigger value="typical" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:font-bold">
            طابق سكني متكرر
          </TabsTrigger>
          <TabsTrigger value="roof" className="py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:font-bold">
            السطح الشمسي
          </TabsTrigger>
        </TabsList>

        {/* ===== القبو السكني ===== */}
        <TabsContent value="basement" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-cyan-700" }}
            title="القبو السكني — ثلاث شقق مثل الطابق المتكرر تماماً"
            features={[
              { icon: BedDouble, text: "3 شقق مطابقة حرفياً للطابق المتكرر: شقتان شماليتان 81.34 م² + جنوبية كبرى 118.00 م² + لب 19.32 م² — 15 شقة في المبنى الواحد" },
              { icon: Sun, text: "حلقة مناور ضوء بعمق 1.40 م محفورة خارج البصمة على الجوانب الأربعة (≈ 105.8 م²) — إضاءة طبيعية لكل غرف النوم والمعيشة والفناءات" },
              { icon: Fence, text: "فناءات منخفضة بدرابزين داخل زوايا المناور بدل الشرفات الكابولية — فناء خاص لكل شقة يفتح من الغرفة نفسها" },
              { icon: Zap, text: "حفرة فنية تحت اللب (خزان أرضي 20 م³ + مضخات + كهرباء) + عزل مائي وتصريف محيطي وتهوية ميكانيكية عبر رافعات اللب — أُلغيت المواقف المغطاة بقرار المالك" },
            ]}
            plan={<BasementPlan />}
          />
        </TabsContent>

        {/* ===== الأرضي السكني ===== */}
        <TabsContent value="ground" className="mt-4">
          <FloorLayout
            badge={{ text: "300 م²", className: "bg-teal-600" }}
            title="الطابق الأرضي السكني — ثلاث شقق + بهو المدخل"
            features={[
              { icon: BedDouble, text: "3 شقق مطابقة حرفياً للطابق المتكرر — أُلغيت بهو الخدمات والحضانة والإدارة بقرار المالك لتوحيد الطوابق الخمسة سكنياً" },
              { icon: DoorIcon, text: "باب المدخل الرئيسي على الواجهة المطلة على محور المشاة المركزي + مظلة كابولية — يفتح مباشرة في بهو توزيع الشقة الجنوبية الذي يمتد حتى الواجهة الشرقية" },
              { icon: ArrowUpDown, text: "بهو المدخل يصل إلى باب اللب الجنوبي: درج + مصعد يخدم الطوابق الخمسة من القبو السكني حتى الثالث" },
              { icon: Layers, text: "معادلة الطابق نفسها في الطوابق الخمسة: 2 × 81.34 + 118.00 + 19.32 = 300 م² — الشقتان الشماليتان تدخلان من اللب كما في الطوابق العليا" },
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
              { icon: BedDouble, text: "شقتان شماليتان × 81.34 م² (بمرايا) + شقة جنوبية كبرى 118.00 م² — كل شقة 5 غرف رئيسية + مطبخ + حمّامان + بهو، وحمّام ثانوي 1.00 م² بالضبط" },
              { icon: Sun, text: "3 شرفات ركنية في كل طابق من الطوابق الخمسة عند زوايا المبنى — 15 شرفة في المبنى الواحد (60 شرفة في المشروع)" },
              { icon: Layers, text: "معادلة الطابق تتكرر حرفياً في الطوابق الخمسة: 2 × 81.34 + 118.00 + 19.32 = 300 م² — 3 × 5 × 4 = 60 شقة في المشروع" },
              { icon: ArrowUpDown, text: "لب حركي 19.32 م²: بهو توزيع يفتح مباشرة على الشقق الثلاث + درج بمتفلتين محمي + مصعد 8 أشخاص + رافعة صحية" },
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
              { icon: Droplets, text: "16 خزاناً × 1000 لتر = 16 م³ على قواعد 1×1 م في مجموعتين 4×2 حول البنتهاوس" },
              { icon: Flame, text: "الحمل المائي ≈ 16 طناً لكل مبنى — يتطلب تحقق إنشائي وتوزيع أحمال وقواعد وربطاً بالهيكل" },
              { icon: ArrowUpDown, text: "بنتهاوس فوق اللب مباشرة (محاذاة رأسية مع الدرج والمصعد): درج وصول + غرفة آلات + مسارات صيانة ودش برق" },
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
