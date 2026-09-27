"use client";

import { useState } from "react";
import { BUILDINGS, OPEN_SPACE } from "@/lib/arch-data";
import { Compass, DimH, DimV, Door, Tree, PlanLabel } from "./primitives";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Id = string | null;

export function SitePlan() {
  const [selected, setSelected] = useState<string>("a");
  const [hovered, setHovered] = useState<Id>(null);
  const active = hovered ?? selected;
  const activeBuilding = BUILDINGS.find((b) => b.id === active) ?? BUILDINGS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(300px,380px)_1fr] items-start">
      {/* لوحة معلومات المبنى المحدد */}
      <Card className="border-stone-200 shadow-sm lg:sticky lg:top-24">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
              <span
                className="inline-block size-3.5 rounded-full"
                style={{ backgroundColor: activeBuilding.color }}
              />
              {activeBuilding.name}
            </CardTitle>
            <Badge className="bg-emerald-700 hover:bg-emerald-700">300 م² بصمة</Badge>
          </div>
          <CardDescription>الموقع داخل الأرض: {activeBuilding.position}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <InfoRow label="الأبعاد" value="20.00 م × 15.00 م" />
          <InfoRow label="التوجيه الشمسي" value="الواجهات الطويلة شمال – جنوب" />
          <InfoRow label="عدد الطوابق" value="قبو مواقف + أرضي خدمات + 3 طوابق سكنية + سطح" />
          <InfoRow label="الشقق في المبنى" value="9 شقق (3 شقق × 3 طوابق سكنية)" />
          <InfoRow label="الشرفات" value="9 شرفات من المعيشة (3 × 3 طوابق)" />
          <InfoRow label="الغرف إجمالاً" value="45 غرفة رئيسية + 18 حمّاماً" />
          <InfoRow label="الرافعة (مصعد)" value="مصعد واحد — 8 أشخاص — يخدم القبو حتى السطح" />
          <InfoRow label="المدخل" value={activeBuilding.mirrored ? "غربي — على محور المشاة (بالمرايا)" : "شرقي — على محور المشاة"} />
          <InfoRow label="القبو" value="6 مواقف 2.50 × 5.00 + مخزنان + حفرة فنية تحت اللب" />
          <InfoRow label="مواقف المشروع" value="28 موقفاً (24 مغطى + 4 زوار سطحية)" />
          <Separator />
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="font-bold text-amber-800 text-[13px] mb-1">السطح المجهّز</p>
            <p className="text-[13px] leading-6 text-amber-900/80">
              48 لوحاً شمسياً (16 صف × 3 — ≈ 21.6 ك.و) في مصفوفة جنوبية متصلة + 16 خزاناً × 1000 لتر
              (16 م³) على قواعد 1×1 م حول البنتهاوس فوق اللب + سخّانان شمسيان + ممشى صيانة ودش برق.
            </p>
          </div>
          <p className="text-xs text-stone-400">مرّر المؤشر فوق المباني في المخطط أو انقر عليها لاستعراض التفاصيل.</p>
        </CardContent>
      </Card>

      {/* المخطط */}
      <div>
        <div className="rounded-2xl border border-stone-200 bg-white p-3 sm:p-5 plan-shadow">
          <svg
            viewBox="-4.5 -5 59 51"
            className="w-full h-auto"
            role="img"
            aria-label="مخطط الموقع العام: أربعة مبانٍ على أرض 50 × 40 متر بمداخل موحدة على محور المشاة"
          >
            {/* الأرض */}
            <rect x={0} y={0} width={50} height={40} fill="#d6d3d1" />

            {/* خط وسط طريق الحلقة */}
            <rect
              x={1.5}
              y={1.5}
              width={47}
              height={37}
              fill="none"
              stroke="#ffffff"
              strokeWidth={0.12}
              strokeDasharray="1.1 0.7"
            />

            {/* المنطقة الداخلية الخضراء */}
            <rect x={3} y={3} width={44} height={34} fill="#dcfce7" />

            {/* ممرات الصليب المرصوفة */}
            <rect x={24} y={3} width={2} height={34} fill="#e7e5e4" />
            <rect x={3} y={19} width={44} height={2} fill="#e7e5e4" />

            {/* النافورة المركزية */}
            <circle cx={25} cy={20} r={1.05} fill="#99f6e4" stroke="#0d9488" strokeWidth={0.09} />
            <circle cx={25} cy={20} r={0.45} fill="#5eead4" stroke="#0d9488" strokeWidth={0.06} />

            {/* المباني */}
            {BUILDINGS.map((b) => {
              const isActive = active === b.id;
              const entranceEast = !b.mirrored; // المباني الغربية بمدخل شرقي، والشرقية بالمرايا
              return (
                <g
                  key={b.id}
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(b.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.d}
                    fill={isActive ? "#a7f3d0" : "#e7e5e4"}
                    stroke={isActive ? "#047857" : "#57534e"}
                    strokeWidth={isActive ? 0.3 : 0.2}
                  />
                  {/* خطوط سقف */}
                  <line
                    x1={b.x}
                    y1={b.y + 5}
                    x2={b.x + b.w}
                    y2={b.y + 5}
                    stroke={isActive ? "#059669" : "#a8a29e"}
                    strokeWidth={0.08}
                  />
                  <line
                    x1={b.x}
                    y1={b.y + 10}
                    x2={b.x + b.w}
                    y2={b.y + 10}
                    stroke={isActive ? "#059669" : "#a8a29e"}
                    strokeWidth={0.08}
                  />
                  {/* مدخل المبنى على الواجهة المطلة على محور المشاة + مظلة */}
                  {entranceEast ? (
                    <>
                      <rect x={b.x + b.w - 0.22} y={b.y + 9.28} width={0.44} height={1.12} fill={isActive ? "#a7f3d0" : "#e7e5e4"} />
                      <Door x={b.x + b.w} y={b.y + 10.4} r={0.9} rot={180} />
                      <rect x={b.x + b.w} y={b.y + 9.15} width={1.0} height={1.4} fill="#fef3c7" stroke="#d97706" strokeWidth={0.06} strokeDasharray="0.25 0.16" />
                    </>
                  ) : (
                    <>
                      <rect x={b.x - 0.22} y={b.y + 9.28} width={0.44} height={1.12} fill={isActive ? "#a7f3d0" : "#e7e5e4"} />
                      <Door x={b.x} y={b.y + 9.4} r={0.9} rot={0} />
                      <rect x={b.x - 1.0} y={b.y + 9.15} width={1.0} height={1.4} fill="#fef3c7" stroke="#d97706" strokeWidth={0.06} strokeDasharray="0.25 0.16" />
                    </>
                  )}
                  <PlanLabel x={b.x + b.w / 2} y={b.y + b.d / 2 - 0.4} size={1.15} weight={800} fill="#1c1917">
                    {b.name}
                  </PlanLabel>
                  <PlanLabel x={b.x + b.w / 2} y={b.y + b.d / 2 + 0.75} size={0.62} weight={600} fill="#57534e">
                    20 × 15 م — 300 م²
                  </PlanLabel>
                  <PlanLabel x={b.x + b.w / 2} y={b.y + b.d / 2 + 1.75} size={0.58} weight={600} fill={b.color}>
                    9 شقق + مصعد
                  </PlanLabel>
                </g>
              );
            })}

            {/* أشجار على أحواض الممرات */}
            {[
              [23.5, 6], [23.5, 11], [23.5, 26], [23.5, 31],
              [26.5, 8.5], [26.5, 14], [26.5, 28.5], [26.5, 34],
              [8, 18.5], [14, 21.5], [33, 18.5], [40, 21.5],
              [4, 19 - 0.5], [46, 21.5],
            ].map(([tx, ty], i) => (
              <Tree key={i} x={tx} y={ty} r={0.42} />
            ))}

            {/* مواقف زوار سطحية على طريق الحلقة الجنوبي */}
            {[5.4, 10.4, 15.4, 20.4].map((px) => (
              <g key={px}>
                <rect
                  x={px}
                  y={37.35}
                  width={4.6}
                  height={2.3}
                  fill="#ffffff"
                  stroke="#78716c"
                  strokeWidth={0.09}
                  strokeDasharray="0.5 0.3"
                />
                <PlanLabel x={px + 2.3} y={38.85} size={0.85} weight={800} fill="#78716c">
                  P
                </PlanLabel>
              </g>
            ))}
            <PlanLabel x={12.7} y={36.7} size={0.62} weight={700} fill="#57534e">
              مواقف زوار سطحية (4 مواقف — سكان المشروع في مواقف الأقبية المغطاة)
            </PlanLabel>

            {/* حدود الأرض */}
            <rect x={0} y={0} width={50} height={40} fill="none" stroke="#1c1917" strokeWidth={0.28} />

            {/* البوابة الرئيسية (جنوب) */}
            <rect x={24.1} y={-0.2} width={1.8} height={0.6} fill="#d6d3d1" stroke="none" />
            <line x1={24.1} y1={0} x2={24.1} y2={0.2} stroke="#1c1917" strokeWidth={0.28} />
            <line x1={25.9} y1={0} x2={25.9} y2={0.2} stroke="#1c1917" strokeWidth={0.28} />
            <line x1={25} y1={43.4} x2={25} y2={40.6} stroke="#0f766e" strokeWidth={0.22} />
            <path d="M 24.55 41.1 L 25 40.4 L 25.45 41.1 Z" fill="#0f766e" />
            <PlanLabel x={25} y={44.8} size={0.95} weight={800} fill="#0f766e">
              المدخل الرئيسي
            </PlanLabel>

            {/* مدخل مشاة غربي */}
            <rect x={-0.25} y={18.6} width={0.7} height={2.8} fill="#ffffff" stroke="none" />
            <PlanLabel x={-3.6} y={20} size={0.7} weight={700} fill="#57534e" rotate={-90}>
              مدخل مشاة
            </PlanLabel>
            {/* مدخل مشاة شرقي */}
            <rect x={49.55} y={18.6} width={0.7} height={2.8} fill="#ffffff" stroke="none" />
            <PlanLabel x={53.6} y={20} size={0.7} weight={700} fill="#57534e" rotate={90}>
              مدخل مشاة
            </PlanLabel>

            {/* الأبعاد */}
            <DimH x1={0} x2={50} y={-2.6} label="50.00 م" />
            <DimV y1={0} y2={40} x={-2.6} label="40.00 م" />

            {/* بوصلة */}
            <Compass x={52.2} y={3.4} r={1.35} />

            {/* مقياس رسم */}
            <g stroke="#1c1917" strokeWidth={0.12}>
              <line x1={0} y1={42.2} x2={10} y2={42.2} />
              <line x1={0} y1={41.8} x2={0} y2={42.6} />
              <line x1={5} y1={41.9} x2={5} y2={42.5} />
              <line x1={10} y1={41.8} x2={10} y2={42.6} />
            </g>
            <PlanLabel x={12.6} y={42.55} size={0.72} weight={600} fill="#44403c">
              مقياس 0 — 10 م
            </PlanLabel>
          </svg>
        </div>

        {/* مفتاح المخطط */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-stone-600">
          <LegendChip color="#e7e5e4" border>
            مبنى سكني (بصمة 300 م² — قبو + أرضي + 3 طوابق سكنية × 3 شقق)
          </LegendChip>
          <LegendChip color="#fef3c7" border>
            مدخل ومظلة (على محور المشاة — متطابق بالمرايا)
          </LegendChip>
          <LegendChip color="#d6d3d1">حلقة طريق الخدمة — 504 م²</LegendChip>
          <LegendChip color="#dcfce7">ممرات وحدائق — 296 م²</LegendChip>
          <LegendChip color="#99f6e4">نافورة الساحة المركزية</LegendChip>
          <LegendChip color="#ffffff" border>
            مواقف زوار سطحية
          </LegendChip>
          <LegendChip color="#4ade80">أشجار</LegendChip>
        </div>

        {/* توزيع المساحات المفتوحة */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {OPEN_SPACE.map((o) => (
            <div
              key={o.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block size-4 rounded" style={{ backgroundColor: o.color }} />
                <span className="text-sm font-semibold text-stone-700">{o.label}</span>
              </div>
              <Badge variant="outline" className="border-stone-300 text-stone-700 shrink-0">
                {o.area} م²
              </Badge>
            </div>
          ))}
          <div className="sm:col-span-2 flex items-center justify-between rounded-xl bg-emerald-800 px-4 py-3 text-white">
            <span className="text-sm font-bold">إجمالي المساحات المفتوحة (طريق + حدائق + مداخل) = 40% من الأرض</span>
            <span className="font-extrabold">800 م²</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-stone-500 shrink-0">{label}</span>
      <span className="font-bold text-stone-800 text-left">{value}</span>
    </div>
  );
}

function LegendChip({
  color,
  border,
  children,
}: {
  color: string;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block size-4 rounded"
        style={{ backgroundColor: color, border: border ? "1px solid #a8a29e" : undefined }}
      />
      {children}
    </span>
  );
}
