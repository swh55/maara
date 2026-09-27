// مخططات طوابق المبنى الواحد — 20 × 15 م (SVG بوحدة المتر)
// الطابق السكني النموذجي: 4 شقق متطابقة (بمرايا) حول لب حركي 25.2 م²
// هندسة الشقة تُرسم من APARTMENT_LAYOUT في arch-data.ts (مصدر وحيد)
import type { ReactNode } from "react";
import {
  Car,
  Compass,
  DimH,
  DimV,
  Door,
  ElevatorBox,
  PlanLabel,
  PvTile,
  Stairs,
  WindowSeg,
} from "./primitives";
import { APARTMENT_LAYOUT, APARTMENT_GROSS } from "@/lib/arch-data";

/** إطار موحد لمخططات الطوابق */
function PlanFrame({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <svg
      viewBox="-3.2 -3.4 26.6 21.4"
      className="w-full h-auto"
      role="img"
      aria-label={note ?? "مخطط طابق بمقياس 20 × 15 متر"}
    >
      {/* الأرضية */}
      <rect x={0} y={0} width={20} height={15} fill="#fafaf9" stroke="#292524" strokeWidth={0.3} />
      {children}
      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={20} y={-1.7} label="20.00 م" />
      <DimV y1={0} y2={15} x={21.6} label="15.00 م" />
      <Compass x={22.6} y={-1.8} r={1.1} />
      <PlanLabel x={10} y={16.9} size={0.6} weight={600} fill="#78716c">
        {note ?? "مخطط تخطيطي — الأبعاد بالمتر"}
      </PlanLabel>
    </svg>
  );
}

/* ================= اللب الحركي المشترك (25.2 م² — يتكرر في كل الطوابق) ================= */
function CoreLayout({ lobbyLabel, servicesLabel }: { lobbyLabel: string; servicesLabel: string }) {
  return (
    <g>
      {/* بهو التوزيع — يفتح مباشرة على الشقق الأربعة */}
      <rect x={7.9} y={6.7} width={4.2} height={2.2} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={7.55} size={0.32} weight={700} fill="#57534e">
        {lobbyLabel}
      </PlanLabel>
      <PlanLabel x={10} y={8.15} size={0.26} weight={600} fill="#78716c">
        مشترك
      </PlanLabel>
      {/* رافعة صحية وكهرباء تخدم الشقق الأربعة */}
      <rect x={7.9} y={8.9} width={4.2} height={1.6} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.07} />
      <PlanLabel x={10} y={9.85} size={0.26} weight={700} fill="#a16207">
        {servicesLabel}
      </PlanLabel>
      {/* درج الإخلاء بمتفلتين */}
      <Stairs x={7.9} y={4.5} w={2.6} h={2.2} steps={5} />
      <PlanLabel x={9.2} y={5.72} size={0.26} weight={700} fill="#44403c">
        درج
      </PlanLabel>
      {/* مصعد 8 أشخاص */}
      <ElevatorBox x={10.5} y={4.5} w={1.6} h={2.2} />
      <PlanLabel x={11.3} y={5.55} size={0.24} weight={700} fill="#1c1917">
        مصعد
      </PlanLabel>
      <Door x={9.3} y={6.7} r={0.6} rot={90} />
      <Door x={11.3} y={6.7} r={0.6} rot={90} />
      {/* الحدود الخارجية للب */}
      <rect x={7.9} y={4.5} width={4.2} height={6.0} fill="none" stroke="#292524" strokeWidth={0.12} />
    </g>
  );
}

/* ================= القبو ================= */
export function BasementPlan() {
  const westStalls = [0.2, 2.8, 5.4];
  const eastStalls = [12.45, 15.05];
  return (
    <PlanFrame note="مخطط القبو — مواقف ومخازن ومعدات">
      {/* مواقف الصف الغربي (2.5 × 5.0 م) */}
      {westStalls.map((bx, i) => (
        <g key={`wg-${bx}`}>
          <rect
            x={bx}
            y={0.2}
            width={2.5}
            height={5.0}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.3} y={1.05} />
          <PlanLabel x={bx + 1.25} y={4.85} size={0.3} weight={700} fill="#78716c">
            P{i + 1}
          </PlanLabel>
        </g>
      ))}
      {/* مواقف الصف الشرقي */}
      {eastStalls.map((bx, i) => (
        <g key={`eg-${bx}`}>
          <rect
            x={bx}
            y={0.2}
            width={2.5}
            height={5.0}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.3} y={1.05} />
          <PlanLabel x={bx + 1.25} y={4.85} size={0.3} weight={700} fill="#78716c">
            P{i + 4}
          </PlanLabel>
        </g>
      ))}

      {/* ممر المناورة */}
      <PlanLabel x={3.95} y={7.6} size={0.38} weight={700} fill="#78716c">
        ممر مناورة بعرض 5.3 م
      </PlanLabel>
      <PlanLabel x={3.95} y={8.25} size={0.3} weight={600} fill="#a8a29e">
        حلقة وصول حول اللب — تتصل بالمنحدر شرقاً
      </PlanLabel>

      {/* الخدمات جنوب الممر */}
      <rect x={0.2} y={10.9} width={3.3} height={3.8} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
      <PlanLabel x={1.85} y={12.6} size={0.3} weight={700} fill="#0f766e">
        خزان مياه
      </PlanLabel>
      <PlanLabel x={1.85} y={13.15} size={0.28} weight={700} fill="#0f766e">
        أرضي 20 م³
      </PlanLabel>
      <rect x={3.7} y={10.9} width={3.2} height={3.8} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
      <PlanLabel x={5.3} y={12.6} size={0.3} weight={700} fill="#0f766e">
        مضخات مياه
      </PlanLabel>
      <PlanLabel x={5.3} y={13.15} size={0.28} weight={600} fill="#14b8a6">
        وضغط
      </PlanLabel>
      <rect x={7.1} y={10.9} width={2.3} height={3.8} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={8.25} y={12.6} size={0.3} weight={700} fill="#57534e">
        مخزن 1
      </PlanLabel>
      <PlanLabel x={8.25} y={13.15} size={0.24} weight={500} fill="#a8a29e">
        2.3 × 3.8 م
      </PlanLabel>
      <rect x={9.6} y={10.9} width={2.3} height={3.8} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10.75} y={12.6} size={0.3} weight={700} fill="#57534e">
        مخزن 2
      </PlanLabel>
      <PlanLabel x={10.75} y={13.15} size={0.24} weight={500} fill="#a8a29e">
        2.3 × 3.8 م
      </PlanLabel>
      <rect x={12.1} y={10.9} width={3.6} height={3.8} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={13.9} y={12.6} size={0.3} weight={700} fill="#a16207">
        الكهرباء الرئيسية
      </PlanLabel>
      <PlanLabel x={13.9} y={13.15} size={0.26} weight={600} fill="#ca8a04">
        ولوحات التوزيع
      </PlanLabel>
      <rect x={15.9} y={10.9} width={3.9} height={3.8} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={17.85} y={12.6} size={0.3} weight={700} fill="#a16207">
        التهوية والمولّدة
      </PlanLabel>
      <PlanLabel x={17.85} y={13.15} size={0.26} weight={600} fill="#ca8a04">
        الاحتياطي
      </PlanLabel>

      {/* اللب الحركي */}
      <CoreLayout lobbyLabel="بهو المصعد" servicesLabel="قاطع فرعي وكهرباء" />

      {/* المنحدر */}
      <g>
        <rect x={15.3} y={5.9} width={4.5} height={4.9} fill="#e7e5e4" stroke="#57534e" strokeWidth={0.1} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={15.3 + i * 0.72}
            y1={10.8}
            x2={15.95 + i * 0.72}
            y2={5.9}
            stroke="#d6d3d1"
            strokeWidth={0.06}
          />
        ))}
        <line x1={17.55} y1={6.7} x2={17.55} y2={9.9} stroke="#0f766e" strokeWidth={0.1} />
        <path d="M 17.2 9.3 L 17.55 9.95 L 17.9 9.3 Z" fill="#0f766e" />
        <PlanLabel x={17.55} y={6.35} size={0.34} weight={700} fill="#44403c">
          منحدر السيارات
        </PlanLabel>
      </g>

      <PlanLabel x={10} y={-0.75} size={0.5} weight={800} fill="#0f766e">
        القبو — 5 مواقف سيارات (2.5 × 5.0 م) + مخزنان ومعدات وخدمات
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= الطابق الأرضي ================= */
export function GroundPlan() {
  return (
    <PlanFrame note="مخطط الطابق الأرضي — بهو المدخل والخدمات المشتركة">
      {/* صالة متعددة الأغراض */}
      <rect x={0.2} y={0.2} width={7.7} height={4.3} fill="#ecfdf5" stroke="#10b981" strokeWidth={0.08} />
      <PlanLabel x={4.05} y={2.15} size={0.44} weight={800} fill="#047857">
        صالة متعددة الأغراض
      </PlanLabel>
      <PlanLabel x={4.05} y={2.8} size={0.34} weight={600} fill="#059669">
        33 م² — جلسات واجتماعات السكان
      </PlanLabel>

      {/* حضانة ونظافة */}
      <rect x={0.2} y={4.9} width={3.8} height={2.2} fill="#fff7ed" stroke="#ea580c" strokeWidth={0.07} />
      <PlanLabel x={2.1} y={5.85} size={0.32} weight={700} fill="#c2410c">
        حضانة أطفال
      </PlanLabel>
      <PlanLabel x={2.1} y={6.4} size={0.26} weight={600} fill="#ea580c">
        8 م²
      </PlanLabel>
      <rect x={4.4} y={4.9} width={3.5} height={2.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={6.15} y={6.1} size={0.3} weight={700} fill="#57534e">
        نظافة ومخزن
      </PlanLabel>

      {/* بهو المدخل الرئيسي */}
      <rect x={0.2} y={7.5} width={7.7} height={7.3} fill="#f5f5f4" stroke="#57534e" strokeWidth={0.08} />
      <PlanLabel x={4.05} y={11.3} size={0.5} weight={800} fill="#1c1917">
        بهو المدخل الرئيسي
      </PlanLabel>
      <PlanLabel x={4.05} y={12.0} size={0.34} weight={600} fill="#78716c">
        صناديق بريد + مقاعد انتظار
      </PlanLabel>

      {/* اللب الحركي + ممر الوصل */}
      <CoreLayout lobbyLabel="بهو المصعد" servicesLabel="ممر وصل داخلي" />
      <rect x={7.9} y={10.5} width={4.2} height={4.3} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={12.9} size={0.32} weight={700} fill="#57534e">
        بهو انتظار شرقي
      </PlanLabel>
      <Door x={7.9} y={10.45} r={0.8} rot={0} />

      {/* الخدمات الشرقية */}
      <rect x={12.5} y={0.2} width={7.3} height={3.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={16.15} y={1.65} size={0.36} weight={700} fill="#57534e">
        إدارة واستقبال
      </PlanLabel>
      <PlanLabel x={16.15} y={2.25} size={0.28} weight={500} fill="#a8a29e">
        24 م²
      </PlanLabel>
      <rect x={12.5} y={3.8} width={3.6} height={1.9} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={14.3} y={4.9} size={0.3} weight={700} fill="#57534e">
        بريد وصناديق
      </PlanLabel>
      <rect x={16.5} y={3.8} width={3.3} height={1.9} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={18.15} y={4.6} size={0.3} weight={700} fill="#a16207">
        غرفة نفايات
      </PlanLabel>
      <PlanLabel x={18.15} y={5.15} size={0.24} weight={600} fill="#ca8a04">
        (باب خدمة خارجي)
      </PlanLabel>
      <rect x={12.5} y={6.1} width={7.3} height={2.4} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={16.15} y={7.2} size={0.34} weight={700} fill="#a16207">
        عدادات وقاطع رئيسي
      </PlanLabel>
      <PlanLabel x={16.15} y={7.8} size={0.28} weight={600} fill="#ca8a04">
        17 م²
      </PlanLabel>
      <rect x={12.5} y={8.9} width={3.6} height={2.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={14.3} y={10.05} size={0.32} weight={700} fill="#57534e">
        أمن وحارس
      </PlanLabel>
      <PlanLabel x={14.3} y={10.6} size={0.26} weight={500} fill="#a8a29e">
        9 م²
      </PlanLabel>
      <rect x={16.5} y={8.9} width={3.3} height={2.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={18.15} y={10.05} size={0.32} weight={700} fill="#57534e">
        مخزن عام
      </PlanLabel>
      <rect x={12.5} y={11.9} width={7.3} height={2.9} fill="#ecfdf5" stroke="#10b981" strokeWidth={0.07} />
      <PlanLabel x={16.15} y={13.5} size={0.38} weight={700} fill="#047857">
        جلسات انتظار الضيوف
      </PlanLabel>

      {/* أبواب */}
      <Door x={3.5} y={14.8} r={0.9} rot={-90} />
      <Door x={4.7} y={14.8} r={0.9} rot={-90} flip />
      <Door x={19.8} y={5.1} r={0.65} rot={180} />

      {/* نوافذ */}
      <WindowSeg x={1.0} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={6.0} y={14.85} w={1.5} h={0.3} />
      <WindowSeg x={12.8} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={16.8} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={2.0} y={-0.15} w={2.6} h={0.3} />
      <WindowSeg x={5.2} y={-0.15} w={2.0} h={0.3} />
      <WindowSeg x={13.4} y={-0.15} w={2.2} h={0.3} />
      <WindowSeg x={16.6} y={-0.15} w={2.2} h={0.3} />
      <WindowSeg x={-0.15} y={1.2} w={0.3} h={2.2} />
      <WindowSeg x={-0.15} y={9.5} w={0.3} h={1.8} />
      <WindowSeg x={-0.15} y={12.2} w={0.3} h={1.8} />
      <WindowSeg x={19.85} y={9.6} w={0.3} h={1.4} />
      <WindowSeg x={19.85} y={12.4} w={0.3} h={1.8} />

      <PlanLabel x={10} y={-0.75} size={0.5} weight={800} fill="#0f766e">
        الطابق الأرضي — بهو المدخل + خدمات مشتركة + لب الدرج والمصعد
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= الطابق السكني النموذجي (4 شقق × 68.7 م²) ================= */

// مواضع العناوين داخل الشقة المرجعية (إحداثيات محلية — تُعكس بالمرايا)
const UNIT_LABELS: Record<string, { lx: number; ly: number; ls: number; short: string }> = {
  "غرفة النوم الرئيسية": { lx: 1.675, ly: 2.05, ls: 0.26, short: "نوم رئيسية" },
  "غرفة النوم الثانية": { lx: 4.36, ly: 2.05, ls: 0.24, short: "نوم ثانية" },
  "غرفة النوم الثالثة": { lx: 6.6, ly: 2.05, ls: 0.24, short: "نوم ثالثة" },
  "غرفة النوم الرابعة (أطفال/مكتب)": { lx: 8.8, ly: 2.05, ls: 0.21, short: "نوم رابعة" },
  "المعيشة والطعام": { lx: 2.0, ly: 6.3, ls: 0.28, short: "معيشة وطعام" },
  المطبخ: { lx: 5.03, ly: 6.05, ls: 0.24, short: "مطبخ" },
  "الحمّام الرئيسي": { lx: 8.86, ly: 3.98, ls: 0.19, short: "حمّام رئيسي" },
  "الحمّام الثانوي": { lx: 7.32, ly: 5.35, ls: 0.16, short: "1.00 م²" },
  "بهو المدخل": { lx: 6.5, ly: 6.6, ls: 0.22, short: "بهو" },
  "ممر التوزيع (بخزائن مدمجة)": { lx: 5.6, ly: 4.0, ls: 0.22, short: "ممر توزيع" },
};

// نوافذ الشقة المرجعية (إحداثيات محلية)
const UNIT_WINDOWS = [
  { x: 0.7, y: -0.15, w: 1.8, h: 0.3 },
  { x: 3.7, y: -0.15, w: 1.4, h: 0.3 },
  { x: 5.9, y: -0.15, w: 1.2, h: 0.3 },
  { x: 8.2, y: -0.15, w: 1.2, h: 0.3 },
  { x: -0.15, y: 0.7, w: 0.3, h: 1.6 },
  { x: -0.15, y: 4.9, w: 0.3, h: 2.0 },
];

// أبواب الشقة المرجعية (إحداثيات محلية)
const UNIT_DOORS = [
  { x: 2.2, y: 3.32, r: 0.6, rot: -90 },
  { x: 4.3, y: 3.32, r: 0.55, rot: -90 },
  { x: 6.3, y: 3.32, r: 0.55, rot: -90 },
  { x: 8.6, y: 3.32, r: 0.55, rot: -90 },
  { x: 4.8, y: 4.52, r: 0.55, rot: 90 },
  { x: 7.9, y: 4.35, r: 0.45, rot: 180 },
  { x: 6.92, y: 4.68, r: 0.45, rot: 180 },
];

/** رسم وحدة سكنية كاملة بالمرايا الأفقية/الرأسية */
function ApartmentUnit({ fx, fy }: { fx: boolean; fy: boolean }) {
  const tx = (x: number, w: number) => (fx ? 20 - x - w : x);
  const ty = (y: number, h: number) => (fy ? 15 - y - h : y);
  const px = (x: number) => (fx ? 20 - x : x);
  const py = (y: number) => (fy ? 15 - y : y);
  const rot = (r: number) => (fx && fy ? 180 + r : fx ? 180 - r : fy ? -r : r);

  return (
    <g>
      {/* الفراغات */}
      {APARTMENT_LAYOUT.map((room) =>
        room.parts.map((p, i) => (
          <rect
            key={`${room.name}-${i}`}
            x={tx(p.x, p.w)}
            y={ty(p.y, p.h)}
            width={p.w}
            height={p.h}
            fill={room.color}
            stroke="#a8a29e"
            strokeWidth={0.045}
          />
        )),
      )}
      {/* العناوين */}
      {APARTMENT_LAYOUT.map((room) => {
        const lb = UNIT_LABELS[room.name];
        if (!lb) return null;
        return (
          <PlanLabel key={room.name} x={px(lb.lx)} y={py(lb.ly)} size={lb.ls} weight={700} fill="#57534e">
            {lb.short}
          </PlanLabel>
        );
      })}
      {/* النوافذ */}
      {UNIT_WINDOWS.map((wn, i) => (
        <WindowSeg key={`w-${i}`} x={tx(wn.x, wn.w)} y={ty(wn.y, wn.h)} w={wn.w} h={wn.h} />
      ))}
      {/* الأبواب الداخلية */}
      {UNIT_DOORS.map((d, i) => (
        <Door key={`d-${i}`} x={px(d.x)} y={py(d.y)} r={d.r} rot={rot(d.rot)} />
      ))}
    </g>
  );
}

export function TypicalPlan() {
  return (
    <PlanFrame note="مخطط الطابق السكني النموذجي — أربع شقق متطابقة حول لب الدرج والمصعد">
      {/* الشقق الأربع (مرايا حول المحورين) */}
      <ApartmentUnit fx={false} fy={false} />
      <ApartmentUnit fx={true} fy={false} />
      <ApartmentUnit fx={false} fy={true} />
      <ApartmentUnit fx={true} fy={true} />

      {/* أسماء الشقق */}
      <PlanLabel x={2.9} y={7.32} size={0.42} weight={800} fill="#047857">
        الشقة أ — {APARTMENT_GROSS.toFixed(2)} م²
      </PlanLabel>
      <PlanLabel x={17.1} y={7.32} size={0.42} weight={800} fill="#b45309">
        الشقة ب — {APARTMENT_GROSS.toFixed(2)} م²
      </PlanLabel>
      <PlanLabel x={2.9} y={7.78} size={0.42} weight={800} fill="#0f766e">
        الشقة ج — {APARTMENT_GROSS.toFixed(2)} م²
      </PlanLabel>
      <PlanLabel x={17.1} y={7.78} size={0.42} weight={800} fill="#be123c">
        الشقة د — {APARTMENT_GROSS.toFixed(2)} م²
      </PlanLabel>

      {/* اللب الحركي المركزي 25.2 م² */}
      <CoreLayout lobbyLabel="بهو التوزيع" servicesLabel="رافعة صحية وكهرباء" />

      {/* جدران الفصل بين الشقق */}
      <line x1={0} y1={7.5} x2={7.9} y2={7.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={12.1} y1={7.5} x2={20} y2={7.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={10} y1={0} x2={10} y2={4.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={10} y1={10.5} x2={10} y2={15} stroke="#57534e" strokeWidth={0.1} />

      {/* أبواب الشقق من بهو التوزيع */}
      <Door x={7.9} y={7.2} r={0.55} rot={180} />
      <Door x={7.9} y={7.95} r={0.55} rot={180} />
      <Door x={12.1} y={7.2} r={0.55} rot={0} />
      <Door x={12.1} y={7.95} r={0.55} rot={0} />

      <PlanLabel x={10} y={-0.95} size={0.5} weight={800} fill="#0f766e">
        الطابق السكني النموذجي — 4 شقق × 68.70 م² + لب 25.20 م² = 300 م²
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= السطح ================= */
export function RoofPlan() {
  const pvCols = [12.7, 14.4, 16.1, 17.8];
  const pvRows = [0.6, 2.3, 4.0, 5.7, 7.4, 9.1, 10.8, 12.5];
  const pv2Cols = [0.65, 2.5];
  const pv2Rows = [0.6, 1.38, 2.16, 2.94];
  return (
    <PlanFrame note="مخطط السطح — منظومة الطاقة الشمسية وخزانات المياه">
      {/* ممشى صيانة محيطي */}
      <rect
        x={0.4}
        y={0.4}
        width={19.2}
        height={14.2}
        fill="none"
        stroke="#a8a29e"
        strokeWidth={0.07}
        strokeDasharray="0.4 0.28"
      />

      {/* بنتهاوس: درج الوصول وغرفة آلات المصعد */}
      <rect x={7.9} y={4.5} width={2.6} height={2.2} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <PlanLabel x={9.2} y={5.5} size={0.28} weight={700} fill="#44403c">
        درج الوصول
      </PlanLabel>
      <PlanLabel x={9.2} y={6.0} size={0.24} weight={600} fill="#78716c">
        إلى السطح
      </PlanLabel>
      <rect x={10.4} y={4.3} width={1.9} height={2.2} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <PlanLabel x={11.35} y={5.2} size={0.26} weight={700} fill="#44403c">
        غرفة آلات
      </PlanLabel>
      <PlanLabel x={11.35} y={5.68} size={0.26} weight={700} fill="#44403c">
        المصعد
      </PlanLabel>
      <Door x={9.2} y={6.7} r={0.6} rot={90} />

      {/* المصفوفة الرئيسية */}
      <rect x={12.7} y={0.5} width={6.8} height={13.5} fill="#fef3c7" opacity={0.5} />
      <rect
        x={12.7}
        y={0.5}
        width={6.8}
        height={13.5}
        fill="none"
        stroke="#d97706"
        strokeWidth={0.09}
        strokeDasharray="0.4 0.25"
      />
      {pvCols.map((cx) =>
        pvRows.map((ry) => <PvTile key={`${cx}-${ry}`} x={cx} y={ry} />),
      )}
      <PlanLabel x={16.1} y={14.35} size={0.4} weight={800} fill="#b45309">
        المصفوفة الرئيسية — 32 لوحاً كهروضوئياً
      </PlanLabel>

      {/* الألواح المساندة */}
      <rect x={0.5} y={0.5} width={7.0} height={3.8} fill="#fef3c7" opacity={0.5} />
      <rect
        x={0.5}
        y={0.5}
        width={7.0}
        height={3.8}
        fill="none"
        stroke="#d97706"
        strokeWidth={0.09}
        strokeDasharray="0.4 0.25"
      />
      {pv2Cols.map((cx) => pv2Rows.map((ry) => <PvTile key={`s-${cx}-${ry}`} x={cx} y={ry} w={1.7} h={0.7} />))}
      <PlanLabel x={4.0} y={4.62} size={0.34} weight={700} fill="#b45309">
        ألواح مساندة — 8 لوحات
      </PlanLabel>

      {/* السخّانات الشمسية */}
      <rect x={0.5} y={5.1} width={3.8} height={3.2} fill="#ffedd5" stroke="#ea580c" strokeWidth={0.08} />
      <rect x={0.85} y={5.55} width={1.35} height={1.35} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <rect x={2.5} y={5.55} width={1.35} height={1.35} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <line x1={1.0} y1={6.9} x2={2.05} y2={6.9} stroke="#c2410c" strokeWidth={0.06} />
      <line x1={2.65} y1={6.9} x2={3.7} y2={6.9} stroke="#c2410c" strokeWidth={0.06} />
      <PlanLabel x={2.4} y={7.95} size={0.32} weight={700} fill="#c2410c">
        سخّانان شمسيان 2 × 300 لتر
      </PlanLabel>

      {/* منصة الخزانات */}
      <rect x={0.5} y={8.7} width={7.0} height={5.6} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.12} />
      {[
        [2.1, 10.5],
        [2.1, 12.7],
        [5.5, 10.5],
        [5.5, 12.7],
      ].map(([tx, ty]) => (
        <g key={`${tx}-${ty}`}>
          <circle cx={tx} cy={ty} r={0.95} fill="#99f6e4" stroke="#0f766e" strokeWidth={0.1} />
          <circle cx={tx} cy={ty} r={0.4} fill="#5eead4" stroke="#0f766e" strokeWidth={0.05} />
        </g>
      ))}
      <PlanLabel x={4.0} y={9.4} size={0.36} weight={800} fill="#0f766e">
        خزانات المياه العلوية
      </PlanLabel>
      <PlanLabel x={4.0} y={14.05} size={0.34} weight={700} fill="#0d9488">
        4 × 2000 لتر على قاعدة خرسانية
      </PlanLabel>

      {/* مسار الكابلات */}
      <path
        d="M 12.7 8.2 L 11.6 8.2 L 11.6 6.5"
        fill="none"
        stroke="#b45309"
        strokeWidth={0.08}
        strokeDasharray="0.3 0.2"
      />
      <PlanLabel x={12.15} y={9.0} size={0.26} weight={600} fill="#b45309">
        مسار كابلات
      </PlanLabel>

      {/* هويات تهوية ودش برق */}
      <rect x={9.6} y={11.9} width={0.7} height={0.7} fill="#e7e5e4" stroke="#78716c" strokeWidth={0.06} />
      <PlanLabel x={9.95} y={11.65} size={0.28} weight={600} fill="#78716c">هوية تهوية</PlanLabel>
      <g stroke="#b45309" strokeWidth={0.09} fill="none">
        <path d="M 19.3 1.2 L 19.0 1.9 L 19.35 1.9 L 19.0 2.7" />
        <circle cx={19.3} cy={1.0} r={0.16} fill="#b45309" stroke="none" />
        <path d="M 19.3 2.7 L 19.3 4.3" strokeDasharray="0.22 0.16" />
      </g>
      <PlanLabel x={18.55} y={3.4} size={0.28} weight={600} fill="#b45309">دش برق</PlanLabel>

      <PlanLabel x={10} y={-0.85} size={0.5} weight={800} fill="#b45309">
        السطح — 40 لوحاً شمسياً + 4 خزانات مياه + بنتهاوس خدمة
      </PlanLabel>
    </PlanFrame>
  );
}
