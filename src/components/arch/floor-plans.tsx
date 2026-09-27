// مخططات طوابق المبنى الواحد — 20 × 15 م (SVG بوحدة المتر)
// القبو: 6 مواقف + مخزنان + ممر حلقي حول اللب + منحدر خارج البصمة
// الأرضي: بهو المدخل + خدمات مشتركة (لا شقق — متطلب الخصوصية)
// الطابق السكني المتكرر: 3 شقق — شقتان شماليتان (بمرايا) + شقة جنوبية كبرى حول لب حركي 23.00 م²
// السطح: مصفوفة 16×3 + 16 خزاناً حول البنتهاوس
// هندسة الشقق تُرسم من NORTH_UNIT / SOUTH_UNIT في arch-data.ts (مصدر وحيد)
import type { ReactNode } from "react";
import {
  Compass,
  DimH,
  DimV,
  Door,
  ElevatorBox,
  PlanLabel,
  Stairs,
  WindowSeg,
  Car,
} from "./primitives";
import {
  BASEMENT_PARKING,
  CORE,
  FLOOR_EQUATION,
  FLOOR_UNITS,
  GROUND_FLOOR,
  type FloorUnitPlacement,
  SOLAR_ARRAY,
  TECH_PIT,
} from "@/lib/arch-data";

/** إطار موحد لمخططات الطوابق */
function PlanFrame({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <svg
      viewBox="-3.2 -3.4 26.6 21.9"
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
      <PlanLabel x={10} y={17.3} size={0.6} weight={600} fill="#78716c">
        {note ?? "مخطط تخطيطي — الأبعاد بالمتر"}
      </PlanLabel>
    </svg>
  );
}

/* ================= اللب الحركي المشترك (23.00 م² — يتكرر في كل الطوابق) ================= */
function CoreLayout({ lobbyLabel }: { lobbyLabel: string }) {
  return (
    <g>
      {/* بهو التوزيع الشمالي — يفتح مباشرة على مدخلي الشقتين الشماليتين */}
      <rect x={7.5} y={4.5} width={5.0} height={1.8} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10.35} y={5.35} size={0.26} weight={700} fill="#57534e">
        {lobbyLabel}
      </PlanLabel>
      {/* الممر العمودي الحر بين المصعد والدرج (1.00 م) — يربط بهو الشمال بهو الجنوب */}
      <rect x={9.2} y={4.5} width={1.0} height={4.6} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={9.7} y={7.6} size={0.16} weight={700} fill="#78716c" rotate={-90}>
        ممر التوزيع 1.00 م
      </PlanLabel>
      {/* بهو الوصول الجنوبي — يخدم باب الشقة الجنوبية (عولج الجيب المحبوس) */}
      <rect x={7.5} y={8.2} width={2.7} height={0.9} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      {/* رافعة كهرباء واتصالات */}
      <rect x={CORE.shaft.x} y={CORE.shaft.y} width={CORE.shaft.w} height={CORE.shaft.h} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.07} />
      <PlanLabel x={12.32} y={5.35} size={0.14} weight={700} fill="#a16207" rotate={-90}>
        رافعة
      </PlanLabel>
      {/* درج الإخلاء بمتفلتين */}
      <Stairs x={CORE.stair.x} y={CORE.stair.y} w={CORE.stair.w} h={CORE.stair.h} steps={6} />
      <PlanLabel x={11.35} y={8.0} size={0.22} weight={700} fill="#44403c">
        درج
      </PlanLabel>
      {/* مصعد 8 أشخاص — بابه شمالي على بهو الشمال */}
      <ElevatorBox x={CORE.elevator.x} y={CORE.elevator.y} w={CORE.elevator.w} h={CORE.elevator.h} />
      <PlanLabel x={8.35} y={7.35} size={0.2} weight={700} fill="#1c1917">
        مصعد
      </PlanLabel>
      {/* أبواب الدرج والمصعد */}
      <Door x={10.2} y={7.8} r={0.6} rot={180} />
      <Door x={8.7} y={6.3} r={0.5} rot={-90} flip />
      {/* الحدود الخارجية للب */}
      <rect x={CORE.x0} y={CORE.y0} width={CORE.x1 - CORE.x0} height={CORE.y1 - CORE.y0} fill="none" stroke="#292524" strokeWidth={0.12} />
    </g>
  );
}

/* ================= بيانات الرسم لكل نوع شقة (مواضع العناوين والنوافذ والأبواب) ================= */

const UNIT_LABELS: Record<string, Record<string, { lx: number; ly: number; ls: number; short: string; rotate?: number }>> = {
  north: {
    "غرفة النوم الرئيسية": { lx: 1.675, ly: 2.2, ls: 0.22, short: "نوم رئيسية" },
    "غرفة النوم الثانية": { lx: 4.36, ly: 2.2, ls: 0.2, short: "نوم ثانية" },
    "غرفة النوم الثالثة (أطفال)": { lx: 6.6, ly: 1.55, ls: 0.17, short: "نوم ثالثة" },
    "غرفة النوم الرابعة (أطفال/مكتب)": { lx: 8.8, ly: 1.55, ls: 0.16, short: "نوم رابعة" },
    "المعيشة والطعام": { lx: 2.3, ly: 7.3, ls: 0.22, short: "معيشة وطعام" },
    المطبخ: { lx: 5.94, ly: 8.25, ls: 0.17, short: "مطبخ مفتوح" },
    "الحمّام الرئيسي": { lx: 5.24, ly: 6.45, ls: 0.13, short: "حمّام رئيسي" },
    "الحمّام الثانوي": { lx: 6.5, ly: 6.05, ls: 0.13, short: "1.00 م²" },
    "رافعة الخدمات": { lx: 7.2, ly: 6.25, ls: 0.11, short: "رافعة", rotate: -90 },
    "بهو المدخل": { lx: 7.55, ly: 3.92, ls: 0.15, short: "بهو المدخل" },
    "ممر التوزيع": { lx: 4.4, ly: 5.08, ls: 0.16, short: "ممر توزيع" },
  },
  south: {
    المطبخ: { lx: 2.2, ly: 10.35, ls: 0.18, short: "مطبخ" },
    "مخزن المؤن": { lx: 5.16, ly: 9.88, ls: 0.11, short: "مؤن" },
    "بهو المدخل وممر التوزيع": { lx: 11.6, ly: 9.95, ls: 0.15, short: "بهو المدخل وممر التوزيع — ينتهي عند آخر باب" },
    "جيب الصالة": { lx: 6.46, ly: 11.02, ls: 0.1, short: "جيب" },
    "المعيشة والطعام": { lx: 3.5, ly: 13.05, ls: 0.2, short: "معيشة وطعام" },
    "غرفة النوم الأولى": { lx: 8.22, ly: 12.6, ls: 0.19, short: "نوم أولى" },
    "غرفة النوم الثانية": { lx: 10.74, ly: 12.6, ls: 0.19, short: "نوم ثانية" },
    "الحمّام الثانوي": { lx: 12.46, ly: 11.15, ls: 0.11, short: "1.00 م²", rotate: -90 },
    "الحمّام الرئيسي": { lx: 13.35, ly: 11.55, ls: 0.11, short: "حمّام رئيسي", rotate: -90 },
    "غرفة النوم الثالثة": { lx: 15.8, ly: 12.6, ls: 0.19, short: "نوم ثالثة" },
    "غرفة النوم الرئيسية": { lx: 18.47, ly: 12.6, ls: 0.19, short: "نوم رئيسية" },
    "رافعة الخدمات": { lx: 12.46, ly: 12.6, ls: 0.1, short: "رافعة", rotate: -90 },
    "مخزن بطاطي": { lx: 12.46, ly: 14.25, ls: 0.1, short: "بطاطي", rotate: -90 },
    "الغسيل والمجفف": { lx: 13.73, ly: 13.85, ls: 0.12, short: "غسيل" },
  },
};

const UNIT_WINDOWS: Record<string, { x: number; y: number; w: number; h: number }[]> = {
  north: [
    { x: 0.7, y: -0.15, w: 2.2, h: 0.3 }, // نافذة النوم الرئيسية — الشمال
    { x: 3.7, y: -0.15, w: 1.3, h: 0.3 }, // نوم ثانية
    { x: 5.9, y: -0.15, w: 1.4, h: 0.3 }, // نوم ثالثة
    { x: 8.15, y: -0.15, w: 1.3, h: 0.3 }, // نوم رابعة
    { x: -0.15, y: 0.6, w: 0.3, h: 3.3 }, // النوم الرئيسية — الغرب
    { x: -0.15, y: 4.7, w: 0.3, h: 0.8 }, // المعيشة — الغرب (فوق الشرفة)
    { x: -0.15, y: 7.9, w: 0.3, h: 0.8 }, // المعيشة — الغرب (تحت باب الشرفة)
  ],
  south: [
    { x: -0.15, y: 9.55, w: 0.3, h: 1.5 }, // المطبخ — الواجهة الغربية
    { x: -0.15, y: 11.7, w: 0.3, h: 2.6 }, // المعيشة — الواجهة الغربية
    { x: 2.7, y: 14.85, w: 2.0, h: 0.3 }, // المعيشة — الجنوب
    { x: 5.2, y: 14.85, w: 1.4, h: 0.3 }, // المعيشة — الجنوب
    { x: 7.5, y: 14.85, w: 1.4, h: 0.3 }, // نوم أولى — الجنوب
    { x: 10.0, y: 14.85, w: 1.4, h: 0.3 }, // نوم ثانية — الجنوب
    { x: 15.1, y: 14.85, w: 1.4, h: 0.3 }, // نوم ثالثة — الجنوب
    { x: 17.6, y: 14.85, w: 1.4, h: 0.3 }, // نوم رئيسية — الجنوب
    { x: 19.85, y: 11.2, w: 0.3, h: 2.6 }, // نوم رئيسية — الشرق
    { x: 13.3, y: 14.85, w: 0.8, h: 0.3 }, // الغسيل — الجنوب
  ],
};

const UNIT_DOORS: Record<string, { x: number; y: number; r: number; rot: number; flip?: boolean }[]> = {
  north: [
    { x: 2.2, y: 4.38, r: 0.5, rot: -90 }, // النوم الرئيسية من الممر
    { x: 4.3, y: 4.38, r: 0.5, rot: -90 }, // النوم الثانية من الممر
    { x: 5.7, y: 3.26, r: 0.5, rot: -90 }, // النوم الثالثة من بهو المدخل (إزاحة غربية عميقة)
    { x: 9.05, y: 3.26, r: 0.5, rot: -90 }, // النوم الرابعة — خلف حاجز الكتم
    { x: 2.0, y: 5.5, r: 0.7, rot: 90 }, // المعيشة — فتحة مزدوجة من الممر
    { x: 3.6, y: 5.5, r: 0.7, rot: 90, flip: true },
    { x: 5.2, y: 5.5, r: 0.5, rot: 90 }, // الحمّام الرئيسي (يفتح للداخل)
    { x: 6.15, y: 5.5, r: 0.4, rot: -90 }, // الحمّام الثانوي (يفتح للخارج بمفصلة شرقية)
  ],
  south: [
    { x: 4.36, y: 9.5, r: 0.5, rot: 180 }, // المؤن من المطبخ
    { x: 5.9, y: 9.5, r: 0.5, rot: 0 }, // المؤن من البهو
    { x: 8.62, y: 10.4, r: 0.5, rot: 90 }, // نوم أولى — مُزاحة شرقياً عن محور المدخل
    { x: 10.3, y: 10.4, r: 0.5, rot: 90 }, // نوم ثانية
    { x: 12.76, y: 10.4, r: 0.4, rot: -90 }, // الحمّام الثانوي (يفتح للخارج بمفصلة شرقية)
    { x: 13.3, y: 10.4, r: 0.5, rot: 90 }, // الحمّام الرئيسي (يفتح للداخل)
    { x: 15.4, y: 10.4, r: 0.5, rot: 90 }, // نوم ثالثة
    { x: 17.3, y: 10.4, r: 0.5, rot: 90 }, // النوم الرئيسية — آخر أبواب الممر
    { x: 13.3, y: 12.64, r: 0.45, rot: 180 }, // الغسيل من الحمّام الرئيسي
    { x: 12.92, y: 13.8, r: 0.4, rot: 180 }, // المخزن البطاطي من الغسيل
  ],
};

/** رسم شقة كاملة (فراغات + شرفة + نوافذ + أبواب + عناوين) من المصدر الوحيد */
function ApartmentUnit({
  placement,
  balconyLabel = "شرفة خاصة",
  balconyFill = "#fef3c7",
  balconyStroke = "#d97706",
  balconyLabelFill = "#b45309",
}: {
  placement: FloorUnitPlacement;
  balconyLabel?: string;
  balconyFill?: string;
  balconyStroke?: string;
  balconyLabelFill?: string;
}) {
  const { unit, mirror } = placement;
  const tx = (x: number, w: number) => (mirror ? 20 - x - w : x);
  const px = (x: number) => (mirror ? 20 - x : x);
  const prot = (r: number) => (mirror ? 180 - r : r);
  const labels = UNIT_LABELS[unit.key];
  const windows = UNIT_WINDOWS[unit.key];
  const doors = UNIT_DOORS[unit.key];
  const isSouth = unit.key === "south";

  return (
    <g>
      {/* الشرفة الكابولية — قطعة واحدة متصلة (عند الزاوية تلتف حولها) — خارج البصمة */}
      <g>
        {placement.balcony.flaps.map((f, i) => (
          <rect
            key={`bf-${i}`}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            fill={balconyFill}
            opacity={0.9}
            stroke={balconyStroke}
            strokeWidth={0.05}
            strokeDasharray="0.18 0.12"
          />
        ))}
        {/* درابزين الشرفة المحيط */}
        <g stroke={balconyStroke} strokeWidth={0.07}>
          {isSouth
            ? (() => {
                const [fs, fw] = placement.balcony.flaps;
                return (
                  <>
                    <line x1={fs.x} y1={fs.y + fs.h} x2={fs.x + fs.w} y2={fs.y + fs.h} />
                    <line x1={fs.x + fs.w} y1={fs.y + fs.h} x2={fs.x + fs.w} y2={fs.y} />
                    <line x1={fw.x} y1={fw.y} x2={fw.x} y2={fw.y + fw.h} />
                    <line x1={fw.x} y1={fw.y} x2={fw.x + fw.w} y2={fw.y} />
                  </>
                );
              })()
            : (() => {
                const f = placement.balcony.flaps[0];
                return (
                  <>
                    <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + f.h} />
                    <line x1={f.x} y1={f.y} x2={f.x + f.w} y2={f.y} />
                    <line x1={f.x + f.w} y1={f.y + f.h} x2={f.x} y2={f.y + f.h} />
                  </>
                );
              })()}
        </g>
        <PlanLabel
          x={mirror ? 20.65 : isSouth ? -0.65 : -0.65}
          y={isSouth ? 15.55 : 7.25}
          size={0.19}
          weight={700}
          fill={balconyLabelFill}
          rotate={isSouth ? undefined : -90}
        >
          {balconyLabel}
        </PlanLabel>
      </g>
      {/* بصمة الشقة (خلفية خفيفة) */}
      {unit.envelope.map((e, i) => (
        <rect key={`env-${i}`} x={e.x} y={e.y} width={e.w} height={e.h} fill="#ffffff" opacity={0.55} />
      ))}
      {/* الفراغات */}
      {unit.layout.map((room) =>
        room.parts.map((p, i) => (
          <rect
            key={`${room.name}-${i}`}
            x={tx(p.x, p.w)}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={room.color}
            stroke="#a8a29e"
            strokeWidth={0.045}
          />
        )),
      )}
      {/* حاجز كتم المدخل — يقطع خط النظر إلى باب النوم الرابعة */}
      {!isSouth && (
        <rect x={tx(8.85, 0.12)} y={3.26} width={0.12} height={1.19} fill="#44403c" />
      )}
      {/* باب الشرفة المنزلق الزجاجي — من المعيشة (إحداثيات جاهزة في floor-space) */}
      <rect
        x={placement.balcony.slidingDoor.x}
        y={placement.balcony.slidingDoor.y}
        width={placement.balcony.slidingDoor.w}
        height={placement.balcony.slidingDoor.h}
        fill="#bae6fd"
        stroke="#0284c7"
        strokeWidth={0.05}
      />
      {/* العناوين */}
      {unit.layout.map((room) => {
        const lb = labels[room.name];
        if (!lb) return null;
        return (
          <PlanLabel
            key={room.name}
            x={px(lb.lx)}
            y={lb.ly}
            size={lb.ls}
            weight={700}
            fill="#57534e"
            rotate={lb.rotate}
          >
            {lb.short}
          </PlanLabel>
        );
      })}
      {/* النوافذ */}
      {windows.map((wn, i) => (
        <WindowSeg key={`w-${i}`} x={tx(wn.x, wn.w)} y={wn.y} w={wn.w} h={wn.h} />
      ))}
      {/* الأبواب الداخلية */}
      {doors.map((d, i) => (
        <Door key={`d-${i}`} x={px(d.x)} y={d.y} r={d.r} rot={prot(d.rot)} flip={d.flip} />
      ))}
    </g>
  );
}

/* ============ جسم الطابق السكني المشترك — الشقق الثلاث + اللب (يُستخدم في الطوابق السكنية) ============ */
function ThreeApartments({ lobbyLabel }: { lobbyLabel: string }) {
  return (
    <g>
      {/* الشقق الثلاث من المصدر الوحيد */}
      <ApartmentUnit placement={FLOOR_UNITS[2]} balconyLabel="شرفة L متصلة" />
      <ApartmentUnit placement={FLOOR_UNITS[0]} balconyLabel="شرفة المعيشة" />
      <ApartmentUnit placement={FLOOR_UNITS[1]} balconyLabel="شرفة المعيشة" />

      {/* اللب الحركي المركزي 23.00 م² */}
      <CoreLayout lobbyLabel={lobbyLabel} />

      {/* أبواب الشقق من اللب */}
      <Door x={7.9} y={4.5} r={0.8} rot={-90} />
      <Door x={12.1} y={4.5} r={0.8} rot={-90} flip />
      <Door x={8.4} y={9.1} r={0.8} rot={90} />

      {/* جدران الفصل بين الشقق */}
      <line x1={10} y1={0} x2={10} y2={4.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={0} y1={9.1} x2={20} y2={9.1} stroke="#57534e" strokeWidth={0.1} />

      {/* أسماء الشقق ومساحاتها */}
      <PlanLabel x={2.6} y={4.95} size={0.28} weight={800} fill="#047857">
        الشقة أ — 79.50 م²
      </PlanLabel>
      <PlanLabel x={17.4} y={4.95} size={0.28} weight={800} fill="#b45309">
        الشقة ب — 79.50 م²
      </PlanLabel>
      <PlanLabel x={11.7} y={11.15} size={0.28} weight={800} fill="#9f1239">
        الشقة ج — 118.00 م²
      </PlanLabel>
    </g>
  );
}

/* ================= الطابق السكني المتكرر (3 شقق فقط) ================= */
export function TypicalPlan() {
  return (
    <PlanFrame note="مخطط الطابق السكني المتكرر — ثلاث شقق فقط حول اللب: شقتان شماليتان بمرايا وشقة جنوبية كبرى، ولكل شقة شرفة من المعيشة — نفس المخطط يتكرر حرفياً في الطوابق السكنية الثلاثة">
      <ThreeApartments lobbyLabel="بهو التوزيع" />
      <PlanLabel x={10} y={-1.05} size={0.46} weight={800} fill="#0f766e">
        {`الطابق السكني المتكرر — 3 شقق فقط: ${FLOOR_EQUATION} = 300.00 م²`}
      </PlanLabel>
      <PlanLabel x={10} y={-0.55} size={0.26} weight={600} fill="#78716c">
        بهو اللب متصل (شمالي + ممر 1.00 م + جنوبي) — الممرات تنتهي عند آخر باب تخدمه — لا امتدادات ميتة
      </PlanLabel>
    </PlanFrame>
  );
}

/* ============ القبو — مواقف ومخازن وممر حلقي حول اللب ============ */
export function BasementPlan() {
  const { stalls, stores, aisles, ramp } = BASEMENT_PARKING;
  return (
    <PlanFrame note="مخطط القبو — 6 مواقف قياسية 2.50 × 5.00 م على ممر حلقي متصل حول اللب، ومخزنان، ومنحدر نزول خارج البصمة جنوباً، وحفرة فنية تحت اللب">
      {/* الممر الحلقي حول اللب */}
      <g>
        <rect x={aisles.west.x0} y={aisles.west.y0} width={aisles.west.x1 - aisles.west.x0} height={aisles.west.y1 - aisles.west.y0} fill="#f5f5f4" stroke="#d6d3d1" strokeWidth={0.05} />
        <rect x={aisles.east.x0} y={aisles.east.y0} width={aisles.east.x1 - aisles.east.x0} height={aisles.east.y1 - aisles.east.y0} fill="#f5f5f4" stroke="#d6d3d1" strokeWidth={0.05} />
        <rect x={aisles.north.x0} y={aisles.north.y0} width={aisles.north.x1 - aisles.north.x0} height={aisles.north.y1 - aisles.north.y0} fill="#f5f5f4" stroke="#d6d3d1" strokeWidth={0.05} />
        <rect x={aisles.south.x0} y={aisles.south.y0} width={aisles.south.x1 - aisles.south.x0} height={aisles.south.y1 - aisles.south.y0} fill="#f5f5f4" stroke="#d6d3d1" strokeWidth={0.05} />
        <PlanLabel x={3.79} y={7.65} size={0.22} weight={700} fill="#78716c" rotate={-90}>
          ممر غربي 4.38 م
        </PlanLabel>
        <PlanLabel x={16.22} y={7.65} size={0.22} weight={700} fill="#78716c" rotate={90}>
          ممر شرقي 4.38 م
        </PlanLabel>
        <PlanLabel x={8.97} y={2.3} size={0.2} weight={700} fill="#78716c">
          وصلة شمالية
        </PlanLabel>
        <PlanLabel x={8.97} y={12.5} size={0.2} weight={700} fill="#78716c">
          وصلة جنوبية
        </PlanLabel>
      </g>

      {/* المواقف الستة */}
      {stalls.map((s) => (
        <g key={s.id}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="#ffffff" stroke="#78716c" strokeWidth={0.06} strokeDasharray="0.2 0.14" />
          <Car x={s.x + 0.3} y={s.y + 0.85} w={1.9} h={3.3} />
          <PlanLabel x={s.x + s.w / 2} y={s.y + 0.45} size={0.26} weight={800} fill="#44403c">
            {s.id}
          </PlanLabel>
        </g>
      ))}
      <PlanLabel x={2.76} y={15.45} size={0.24} weight={700} fill="#57534e">
        3 مواقف غربية (2.50 × 5.00)
      </PlanLabel>
      <PlanLabel x={16.29} y={15.45} size={0.24} weight={700} fill="#57534e">
        3 مواقف شرقية
      </PlanLabel>

      {/* المخزنان */}
      {stores.map((s) => (
        <g key={s.id}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="#fef3c7" opacity={0.7} stroke="#d97706" strokeWidth={0.06} />
          <PlanLabel x={s.x + s.w / 2} y={s.y + 2.7} size={0.17} weight={700} fill="#b45309" rotate={-90}>
            {s.id}
          </PlanLabel>
        </g>
      ))}

      {/* منحدر النزول — خارج البصمة جنوباً */}
      <g>
        <rect x={ramp.landing.x0} y={15} width={ramp.landing.x1 - ramp.landing.x0} height={1.55} fill="#ffedd5" stroke="#ea580c" strokeWidth={0.07} strokeDasharray="0.3 0.2" />
        <path d={`M ${ramp.landing.x0 + 0.4} 16.25 L ${ramp.landing.x0 + 0.4} 15.4`} stroke="#ea580c" strokeWidth={0.1} />
        <path d={`M ${ramp.landing.x0 + 0.22} 15.62 L ${ramp.landing.x0 + 0.4} 15.32 L ${ramp.landing.x0 + 0.58} 15.62 Z`} fill="#ea580c" />
        <PlanLabel x={17.15} y={16.95} size={0.24} weight={700} fill="#c2410c">
          منحدر نزول خارج البصمة — ميل ≈14%
        </PlanLabel>
      </g>

      {/* الحفرة الفنية تحت اللب + اللب */}
      <rect
        x={TECH_PIT.x0}
        y={TECH_PIT.y0}
        width={TECH_PIT.x1 - TECH_PIT.x0}
        height={TECH_PIT.y1 - TECH_PIT.y0}
        fill="none"
        stroke="#0f766e"
        strokeWidth={0.09}
        strokeDasharray="0.3 0.2"
      />
      <CoreLayout lobbyLabel="بهو المصعد" />
      <PlanLabel x={10.35} y={8.85} size={0.16} weight={700} fill="#0f766e">
        تحت اللب: حفرة فنية — خزان أرضي 20 م³ + مضخات + كهرباء
      </PlanLabel>

      <PlanLabel x={10} y={-0.75} size={0.44} weight={800} fill="#0369a1">
        القبو — 6 مواقف 2.50 × 5.00 + مخزنان + ممر حلقي حول اللب (24 موقفاً مغطى للمشروع)
      </PlanLabel>
    </PlanFrame>
  );
}

/* ============ الأرضي — بهو المدخل والخدمات (لا شقق — متطلب الخصوصية) ============ */
export function GroundPlan() {
  return (
    <PlanFrame note="مخطط الطابق الأرضي — بهو المدخل الرئيسي على محور المشاة يصل مباشرة إلى باب اللب الجنوبي، وخدمات مشتركة بلا أي شقق فلا يُكشف سكن من المدخل">
      {/* فراغات الأرضي من المصدر الوحيد */}
      {GROUND_FLOOR.rooms.map((r) => (
        <g key={r.name}>
          <rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={r.name.includes("متعددة") ? "#ecfdf5" : r.name.includes("مخزن") || r.name.includes("بطاطي") ? "#fef3c7" : r.name.includes("عداد") || r.name.includes("مولد") || r.name.includes("تهوية") ? "#fef9c3" : "#f5f5f4"}
            stroke="#a8a29e"
            strokeWidth={0.05}
          />
          <PlanLabel
            x={r.x + r.w / 2}
            y={r.y + r.h / 2}
            size={r.w > 5 ? 0.3 : r.w > 2 ? 0.19 : 0.15}
            weight={700}
            fill="#57534e"
            rotate={r.w < 1.2 ? -90 : undefined}
          >
            {r.name}
          </PlanLabel>
          {r.area >= 9 && (
            <PlanLabel x={r.x + r.w / 2} y={r.y + r.h / 2 + (r.w < 1.2 ? 0.9 : 0.45)} size={0.15} weight={600} fill="#a8a29e" rotate={r.w < 1.2 ? -90 : undefined}>
              {r.area.toFixed(2)} م²
            </PlanLabel>
          )}
        </g>
      ))}

      {/* بهو المدخل الرئيسي — امتداد كامل العرض حتى باب اللب الجنوبي */}
      <rect x={GROUND_FLOOR.lobby.x0} y={GROUND_FLOOR.lobby.y0} width={GROUND_FLOOR.lobby.x1 - GROUND_FLOOR.lobby.x0} height={GROUND_FLOOR.lobby.y1 - GROUND_FLOOR.lobby.y0} fill="#fde68a" opacity={0.55} stroke="#d97706" strokeWidth={0.06} />
      <PlanLabel x={11.5} y={9.95} size={0.28} weight={800} fill="#b45309">
        بهو المدخل الرئيسي — 22.00 م²
      </PlanLabel>

      {/* اللب الحركي */}
      <CoreLayout lobbyLabel="بهو المصعد والدرج" />

      {/* باب المدخل الشرقي + المظلة الكابولية (يُعكس غربياً في المباني ب/د) */}
      <Door x={19.82} y={10.4} r={1.0} rot={90} />
      <rect x={20} y={9.28} width={1.3} height={1.12} fill="#fef3c7" stroke="#d97706" strokeWidth={0.06} strokeDasharray="0.2 0.14" />
      <PlanLabel x={21.15} y={11.7} size={0.24} weight={700} fill="#b45309" rotate={-90}>
        مدخل المبنى الرئيسي + مظلة
      </PlanLabel>

      <PlanLabel x={10} y={-0.75} size={0.44} weight={800} fill="#0f766e">
        الأرضي — بهو المدخل والخدمات المشتركة (لا شقق — لا كشف للسكن من المدخل)
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= السطح ================= */
export function RoofPlan() {
  const { panelW, panelH, gap, arrayX0, arrayY0, rows, panelsPerRow, arrayWidthEW, arrayDepthSN } =
    SOLAR_ARRAY;
  // 16 صفاً تتتابع غرب ← شرق، وكل صف 3 ألواح تتتابع جنوب ← شمال
  const cols = Array.from({ length: rows }, (_, i) => +(arrayX0 + i * (panelW + gap)).toFixed(3));
  const rowsY = Array.from({ length: panelsPerRow }, (_, j) =>
    +(arrayY0 + j * (panelH + gap)).toFixed(3),
  );
  const tankCols = { west: [2.9, 4.05, 5.2, 6.35], east: [12.65, 13.8, 14.95, 16.1] };
  const tankRows = [4.65, 5.8];
  return (
    <PlanFrame note="مخطط السطح — المصفوفة الجنوبية 16 صفاً × 3 ألواح = 48 لوحاً و16 خزاناً حول البنتهاوس فوق حزام الجدران الحاملة">
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
      <PlanLabel x={4.4} y={3.55} size={0.26} weight={600} fill="#a8a29e">
        ممشى صيانة محيطي
      </PlanLabel>

      {/* بنتهاوس: درج الوصول وغرفة آلات المصعد — فوق اللب المركزي (محاذاة رأسية) */}
      <rect x={7.5} y={6.3} width={5.0} height={2.7} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <line x1={10.2} y1={6.3} x2={10.2} y2={9.0} stroke="#57534e" strokeWidth={0.08} />
      <PlanLabel x={8.85} y={7.5} size={0.24} weight={700} fill="#44403c">
        درج الوصول
      </PlanLabel>
      <PlanLabel x={8.85} y={7.95} size={0.2} weight={600} fill="#78716c">
        إلى السطح
      </PlanLabel>
      <PlanLabel x={11.35} y={7.5} size={0.2} weight={700} fill="#44403c">
        غرفة آلات
      </PlanLabel>
      <PlanLabel x={11.35} y={7.92} size={0.2} weight={700} fill="#44403c">
        المصعد
      </PlanLabel>
      <PlanLabel x={10} y={5.95} size={0.22} weight={700} fill="#0f766e">
        محاذاة رأسية فوق اللب (x 7.50–12.50)
      </PlanLabel>

      {/* خزانات المياه — 16 قاعدة 1×1 م حول البنتهاوس فوق الجدران الحاملة */}
      {(["west", "east"] as const).map((side) => {
        const cols_ = tankCols[side];
        const zx = side === "west" ? 2.9 : 12.65;
        return (
          <g key={side}>
            <rect
              x={zx}
              y={4.65}
              width={4.45}
              height={2.15}
              fill="#ccfbf1"
              opacity={0.5}
              stroke="#0d9488"
              strokeWidth={0.08}
              strokeDasharray="0.3 0.2"
            />
            {cols_.map((cx) =>
              tankRows.map((cy) => (
                <g key={`${side}-${cx}-${cy}`}>
                  <rect x={cx} y={cy} width={1} height={1} fill="#99f6e4" stroke="#0f766e" strokeWidth={0.07} />
                  <circle cx={cx + 0.5} cy={cy + 0.5} r={0.28} fill="#5eead4" stroke="#0f766e" strokeWidth={0.04} />
                </g>
              )),
            )}
            <PlanLabel x={zx + 2.22} y={7.25} size={0.24} weight={700} fill="#0f766e">
              8 خزانات (4×2)
            </PlanLabel>
          </g>
        );
      })}
      <PlanLabel x={4.6} y={8.55} size={0.28} weight={800} fill="#0f766e">
        16 خزاناً × 1000 لتر = 16 م³ — قواعد 1×1 م حول البنتهاوس
      </PlanLabel>
      <PlanLabel x={4.6} y={9.0} size={0.23} weight={600} fill="#b45309">
        الحمل المائي ≈ 16 طناً — كمرات سطحية على الجدران الحاملة + تحقق إنشائي إلزامي
      </PlanLabel>

      {/* المصفوفة الشمسية الجنوبية — مصفوفة واحدة متصلة في الجزء الجنوبي */}
      <rect
        x={arrayX0 - 0.15}
        y={arrayY0 - 0.15}
        width={arrayWidthEW + 0.3}
        height={arrayDepthSN + 0.3}
        fill="#fef3c7"
        opacity={0.45}
      />
      <rect
        x={arrayX0 - 0.15}
        y={arrayY0 - 0.15}
        width={arrayWidthEW + 0.3}
        height={arrayDepthSN + 0.3}
        fill="none"
        stroke="#d97706"
        strokeWidth={0.09}
        strokeDasharray="0.4 0.25"
      />
      {cols.map((cx) =>
        rowsY.map((cy) => (
          <g key={`${cx}-${cy}`}>
            <rect x={cx} y={cy} width={panelW} height={panelH} fill="#0f766e" stroke="#5eead4" strokeWidth={0.05} />
            <line
              x1={cx + 0.12}
              y1={cy + panelH - 0.12}
              x2={cx + panelW - 0.12}
              y2={cy + 0.12}
              stroke="#5eead4"
              strokeWidth={0.035}
              opacity={0.7}
            />
          </g>
        )),
      )}
      <PlanLabel x={10} y={14.85} size={0.3} weight={800} fill="#b45309">
        المصفوفة الجنوبية — 16 صفاً (غرب ← شرق) × 3 ألواح (جنوب ← شمال) = 48 لوحاً × 450 واط
      </PlanLabel>
      <PlanLabel x={10} y={15.25} size={0.24} weight={600} fill="#b45309">
        {`العرض ${arrayWidthEW.toFixed(2)} م = 16 × 1.13 م + فواصل — العمق ${arrayDepthSN.toFixed(2)} م = 3 × 1.72 م`}
      </PlanLabel>

      {/* السخّانات الشمسية — الشريط الشمالي */}
      <rect x={0.9} y={0.9} width={3.2} height={1.7} fill="#ffedd5" stroke="#ea580c" strokeWidth={0.08} />
      <rect x={1.05} y={1.1} width={1.3} height={1.3} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <rect x={2.65} y={1.1} width={1.3} height={1.3} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <line x1={1.05} y1={2.35} x2={3.95} y2={2.35} stroke="#c2410c" strokeWidth={0.06} />
      <PlanLabel x={2.5} y={3.1} size={0.26} weight={700} fill="#c2410c">
        سخّانان شمسيان 2 × 300 لتر
      </PlanLabel>

      {/* مسار الكابلات من المصفوفة إلى غرفة الآلات */}
      <path
        d="M 11.35 9.15 L 11.35 9.0"
        fill="none"
        stroke="#b45309"
        strokeWidth={0.1}
        strokeDasharray="0.25 0.18"
      />
      <PlanLabel x={13.6} y={8.35} size={0.22} weight={600} fill="#b45309">
        مسار كابلات
      </PlanLabel>

      {/* هوية تهوية ودش برق */}
      <rect x={9.6} y={2.0} width={0.7} height={0.7} fill="#e7e5e4" stroke="#78716c" strokeWidth={0.06} />
      <PlanLabel x={9.95} y={1.75} size={0.24} weight={600} fill="#78716c">
        هوية تهوية الرافعات
      </PlanLabel>
      <g stroke="#b45309" strokeWidth={0.09} fill="none">
        <path d="M 19.3 1.2 L 19.0 1.9 L 19.35 1.9 L 19.0 2.7" />
        <circle cx={19.3} cy={1.0} r={0.16} fill="#b45309" stroke="none" />
        <path d="M 19.3 2.7 L 19.3 4.3" strokeDasharray="0.22 0.16" />
      </g>
      <PlanLabel x={18.55} y={3.4} size={0.26} weight={600} fill="#b45309">
        دش برق
      </PlanLabel>

      <PlanLabel x={10} y={-0.85} size={0.5} weight={800} fill="#b45309">
        السطح — 48 لوحاً شمسياً (16 صف × 3) + 16 خزاناً × 1000 لتر + بنتهاوس فوق اللب
      </PlanLabel>
    </PlanFrame>
  );
}
