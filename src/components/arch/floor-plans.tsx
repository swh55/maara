// مخططات طوابق المبنى الواحد — 20 × 15 م (SVG بوحدة المتر)
// الطابق السكني النموذجي: 3 شقق فقط — شقتان شماليتان (بمرايا) + شقة جنوبية كبرى حول لب حركي 19.32 م²
// هندسة الشقق تُرسم من NORTH_UNIT / SOUTH_UNIT في arch-data.ts (مصدر وحيد)
import type { ReactNode } from "react";
import {
  Car,
  Compass,
  DimH,
  DimV,
  Door,
  ElevatorBox,
  PlanLabel,
  Stairs,
  WindowSeg,
} from "./primitives";
import {
  CORE,
  FLOOR_UNITS,
  type FloorUnitPlacement,
  SOLAR_ARRAY,
} from "@/lib/arch-data";

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

/* ================= اللب الحركي المشترك (19.32 م² — يتكرر في كل الطوابق) ================= */
function CoreLayout({ lobbyLabel, northLabel }: { lobbyLabel: string; northLabel?: string }) {
  return (
    <g>
      {/* بهو التوزيع الشمالي — يفتح مباشرة على مدخلي الشقتين الشماليتين */}
      <rect x={7.9} y={4.5} width={4.2} height={2.0} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={9.95} y={5.65} size={0.28} weight={700} fill="#57534e">
        {lobbyLabel}
      </PlanLabel>
      {northLabel && (
        <PlanLabel x={9.15} y={5.15} size={0.2} weight={600} fill="#78716c">
          {northLabel}
        </PlanLabel>
      )}
      {/* رافعة صحية وكهرباء */}
      <rect x={11.5} y={4.5} width={0.6} height={1.2} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.07} />
      <PlanLabel x={11.8} y={5.35} size={0.13} weight={700} fill="#a16207" rotate={-90}>
        رافعة
      </PlanLabel>
      {/* درج الإخلاء بمتفلتين */}
      <Stairs x={CORE.stair.x} y={CORE.stair.y} w={CORE.stair.w} h={CORE.stair.h} steps={6} />
      <PlanLabel x={10.85} y={8.05} size={0.24} weight={700} fill="#44403c">
        درج
      </PlanLabel>
      {/* مصعد 8 أشخاص */}
      <ElevatorBox x={CORE.elevator.x} y={CORE.elevator.y} w={CORE.elevator.w} h={CORE.elevator.h} />
      <PlanLabel x={8.75} y={7.7} size={0.22} weight={700} fill="#1c1917">
        مصعد
      </PlanLabel>
      {/* جيب الوصول الجنوبي — يمهد لمدخل الشقة الجنوبية */}
      <rect x={7.9} y={8.4} width={1.7} height={0.7} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      {/* أبواب الدرج والمصعد على بهو التوزيع */}
      <Door x={8.55} y={6.5} r={0.5} rot={-90} />
      <Door x={10.8} y={6.5} r={0.5} rot={-90} flip />
      {/* الحدود الخارجية للب */}
      <rect x={7.9} y={4.5} width={4.2} height={4.6} fill="none" stroke="#292524" strokeWidth={0.12} />
    </g>
  );
}

/* ================= بيانات الرسم لكل نوع شقة (مواضع العناوين والنوافذ والأبواب) ================= */

const UNIT_LABELS: Record<string, Record<string, { lx: number; ly: number; ls: number; short: string }>> = {
  north: {
    "غرفة النوم الرئيسية": { lx: 1.675, ly: 2.25, ls: 0.22, short: "نوم رئيسية" },
    "غرفة النوم الثانية": { lx: 4.36, ly: 2.25, ls: 0.2, short: "نوم ثانية" },
    "غرفة النوم الثالثة (أطفال)": { lx: 6.6, ly: 1.6, ls: 0.17, short: "نوم ثالثة" },
    "غرفة النوم الرابعة (أطفال/مكتب)": { lx: 8.8, ly: 1.6, ls: 0.16, short: "نوم رابعة" },
    "المعيشة والطعام": { lx: 2.34, ly: 7.15, ls: 0.22, short: "معيشة وطعام" },
    المطبخ: { lx: 6.26, ly: 8.35, ls: 0.17, short: "مطبخ" },
    "الحمّام الرئيسي": { lx: 5.36, ly: 6.45, ls: 0.13, short: "حمّام رئيسي" },
    "الحمّام الثانوي": { lx: 6.62, ly: 6.1, ls: 0.13, short: "1.00 م²" },
    "خزائن المنزل": { lx: 7.45, ly: 6.5, ls: 0.11, short: "خزائن" },
    "بهو المدخل": { lx: 7.0, ly: 3.95, ls: 0.15, short: "بهو المدخل" },
    "ممر التوزيع (بخزائن مدمجة)": { lx: 5.4, ly: 5.2, ls: 0.16, short: "ممر توزيع" },
  },
  south: {
    "المعيشة والطعام": { lx: 2.64, ly: 12.95, ls: 0.2, short: "معيشة وطعام" },
    المطبخ: { lx: 2.24, ly: 10.2, ls: 0.18, short: "مطبخ" },
    "مخزن المؤن": { lx: 5.46, ly: 9.92, ls: 0.12, short: "مؤن" },
    "غرفة النوم الرئيسية": { lx: 6.92, ly: 12.5, ls: 0.19, short: "نوم رئيسية" },
    "غرفة النوم الثانية": { lx: 10.44, ly: 12.5, ls: 0.19, short: "نوم ثانية" },
    "غرفة النوم الثالثة": { lx: 16.1, ly: 12.5, ls: 0.18, short: "نوم ثالثة" },
    "غرفة النوم الرابعة (أطفال)": { lx: 18.67, ly: 12.5, ls: 0.16, short: "نوم رابعة" },
    "الحمّام الرئيسي": { lx: 13.01, ly: 11.3, ls: 0.13, short: "حمّام رئيسي" },
    "الحمّام الثانوي": { lx: 14.28, ly: 10.95, ls: 0.11, short: "1.00 م²" },
    "مخزن الغسيل والمنزل": { lx: 13.47, ly: 13.6, ls: 0.13, short: "غسيل ومخزن" },
    "بهو المدخل وممر التوزيع (بخزائن مدمجة)": { lx: 16.4, ly: 9.95, ls: 0.15, short: "بهو المدخل وممر التوزيع" },
  },
};

const UNIT_WINDOWS: Record<string, { x: number; y: number; w: number; h: number }[]> = {
  north: [
    { x: 2.25, y: -0.15, w: 0.7, h: 0.3 }, // نافذة النوم الرئيسية (شرق باب الشرفة)
    { x: 3.7, y: -0.15, w: 1.3, h: 0.3 }, // نوم ثانية
    { x: 5.9, y: -0.15, w: 1.3, h: 0.3 }, // نوم ثالثة
    { x: 8.15, y: -0.15, w: 1.25, h: 0.3 }, // نوم رابعة
    { x: -0.15, y: 6.0, w: 0.3, h: 2.4 }, // المعيشة — الواجهة الغربية
  ],
  south: [
    { x: -0.15, y: 9.55, w: 0.3, h: 1.35 }, // المطبخ — الواجهة الغربية
    { x: -0.15, y: 11.85, w: 0.3, h: 2.6 }, // المعيشة — الواجهة الغربية
    { x: 6.1, y: 14.85, w: 1.7, h: 0.3 }, // نوم رئيسية — الجنوب
    { x: 9.55, y: 14.85, w: 1.7, h: 0.3 }, // نوم ثانية — الجنوب
    { x: 15.35, y: 14.85, w: 1.5, h: 0.3 }, // نوم ثالثة — الجنوب
    { x: 17.9, y: 14.85, w: 1.5, h: 0.3 }, // نوم رابعة — الجنوب
    { x: 19.85, y: 11.0, w: 0.3, h: 2.5 }, // نوم رابعة — الشرق
  ],
};

const UNIT_DOORS: Record<string, { x: number; y: number; r: number; rot: number }[]> = {
  north: [
    { x: 1.3, y: 4.32, r: 0.55, rot: -90 }, // النوم الرئيسية
    { x: 4.3, y: 4.32, r: 0.5, rot: -90 }, // النوم الثانية
    { x: 6.1, y: 3.26, r: 0.5, rot: -90 }, // النوم الثالثة من بهو المدخل
    { x: 8.3, y: 3.26, r: 0.5, rot: -90 }, // النوم الرابعة من بهو المدخل
    { x: 3.6, y: 5.56, r: 0.55, rot: 90 }, // المعيشة من الممر
    { x: 5.1, y: 5.56, r: 0.45, rot: 90 }, // الحمّام الرئيسي
    { x: 6.5, y: 5.56, r: 0.4, rot: 90 }, // الحمّام الثانوي
    { x: 7.4, y: 5.56, r: 0.35, rot: 90 }, // الخزائن
  ],
  south: [
    { x: 6.7, y: 10.4, r: 0.55, rot: 90 }, // النوم الرئيسية
    { x: 9.0, y: 10.4, r: 0.55, rot: 90 }, // النوم الثانية
    { x: 15.2, y: 10.4, r: 0.5, rot: 90 }, // النوم الثالثة
    { x: 17.7, y: 10.4, r: 0.5, rot: 90 }, // النوم الرابعة
    { x: 12.5, y: 10.4, r: 0.45, rot: 90 }, // الحمّام الرئيسي
    { x: 14.0, y: 10.4, r: 0.4, rot: 90 }, // الحمّام الثانوي
    { x: 14.68, y: 13.3, r: 0.45, rot: 180 }, // مخزن الغسيل من النوم الثالثة
  ],
};

/** رسم شقة كاملة (فراغات + شرفة + نوافذ + أبواب + عناوين) من المصدر الوحيد */
function ApartmentUnit({ placement }: { placement: FloorUnitPlacement }) {
  const { unit, mirror } = placement;
  const tx = (x: number, w: number) => (mirror ? 20 - x - w : x);
  const px = (x: number) => (mirror ? 20 - x : x);
  const prot = (r: number) => (mirror ? 180 - r : r);
  const labels = UNIT_LABELS[unit.key];
  const windows = UNIT_WINDOWS[unit.key];
  const doors = UNIT_DOORS[unit.key];

  return (
    <g>
      {/* الشرفة الركنية الكابولية — خارج البصمة، درابزين كامل (إحداثيات جاهزة في floor-space) */}
      <g>
        {placement.balcony.flaps.map((f, i) => (
          <rect
            key={`bf-${i}`}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            fill="#fef3c7"
            opacity={0.9}
            stroke="#d97706"
            strokeWidth={0.05}
            strokeDasharray="0.18 0.12"
          />
        ))}
        <PlanLabel
          x={placement.mirror ? 18.4 : placement.unit.key === "south" ? 1.6 : 1.6}
          y={placement.unit.key === "south" ? 15.9 : -0.62}
          size={0.2}
          weight={700}
          fill="#b45309"
        >
          شرفة ركنية
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
      {/* باب الشرفة المنزلق الزجاجي (تعبير) */}
      <rect
        x={tx(unit.key === "south" ? 0.9 : 0.5, 1.4)}
        y={unit.key === "south" ? 14.88 : -0.13}
        width={1.4}
        height={0.24}
        fill="#bae6fd"
        stroke="#0284c7"
        strokeWidth={0.05}
      />
      {/* العناوين */}
      {unit.layout.map((room) => {
        const lb = labels[room.name];
        if (!lb) return null;
        return (
          <PlanLabel key={room.name} x={px(lb.lx)} y={lb.ly} size={lb.ls} weight={700} fill="#57534e">
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
        <Door key={`d-${i}`} x={px(d.x)} y={d.y} r={d.r} rot={prot(d.rot)} />
      ))}
    </g>
  );
}

/* ================= الطابق السكني النموذجي (3 شقق فقط) ================= */
export function TypicalPlan() {
  const eq = "2 × 81.34 + 118.00 + 19.32 = 300.00 م²";
  return (
    <PlanFrame note="مخطط الطابق السكني النموذجي — ثلاث شقق فقط حول اللب: شقتان شماليتان بمرايا وشقة جنوبية كبرى، ولكل شقة شرفة ركنية عند زاوية المبنى">
      {/* الشقق الثلاث من المصدر الوحيد */}
      <ApartmentUnit placement={FLOOR_UNITS[2]} />
      <ApartmentUnit placement={FLOOR_UNITS[0]} />
      <ApartmentUnit placement={FLOOR_UNITS[1]} />

      {/* اللب الحركي المركزي 19.32 م² */}
      <CoreLayout lobbyLabel="بهو التوزيع" />

      {/* أبواب الشقق من اللب */}
      <Door x={CORE.doorNorthWest.x} y={CORE.doorNorthWest.y} r={0.5} rot={-90} />
      <Door x={CORE.doorNorthEast.x} y={CORE.doorNorthEast.y} r={0.5} rot={-90} flip />
      <Door x={CORE.doorSouth.x} y={9.28} r={0.5} rot={90} />

      {/* جدران الفصل بين الشقق */}
      <line x1={10} y1={0} x2={10} y2={4.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={0} y1={9.1} x2={20} y2={9.1} stroke="#57534e" strokeWidth={0.1} />

      {/* أسماء الشقق ومساحاتها */}
      <PlanLabel x={2.3} y={4.95} size={0.3} weight={800} fill="#047857">
        الشقة أ — 81.34 م²
      </PlanLabel>
      <PlanLabel x={17.7} y={4.95} size={0.3} weight={800} fill="#b45309">
        الشقة ب — 81.34 م²
      </PlanLabel>
      <PlanLabel x={11.7} y={9.95} size={0.3} weight={800} fill="#9f1239">
        الشقة ج — 118.00 م²
      </PlanLabel>

      <PlanLabel x={10} y={-1.05} size={0.5} weight={800} fill="#0f766e">
        {`الطابق السكني النموذجي — 3 شقق فقط: ${eq}`}
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= القبو ================= */
export function BasementPlan() {
  const westStalls = [0.2, 2.7, 5.2];
  return (
    <PlanFrame note="مخطط القبو — سبعة مواقف قياسية ومخزنان ومعدات حول اللب المركزي">
      {/* مواقف الصف الشمالي (2.5 × 5.0 م) */}
      {westStalls.map((bx, i) => (
        <g key={`n-${bx}`}>
          <rect x={bx} y={0.2} width={2.5} height={5.0} fill="none" stroke="#d6d3d1" strokeWidth={0.07} strokeDasharray="0.35 0.25" />
          <Car x={bx + 0.3} y={1.05} />
          <PlanLabel x={bx + 1.25} y={4.85} size={0.3} weight={700} fill="#78716c">
            P{i + 1}
          </PlanLabel>
        </g>
      ))}
      {/* موقف الشمال الشرقي */}
      <g>
        <rect x={12.4} y={0.2} width={2.5} height={5.0} fill="none" stroke="#d6d3d1" strokeWidth={0.07} strokeDasharray="0.35 0.25" />
        <Car x={12.7} y={1.05} />
        <PlanLabel x={13.65} y={4.85} size={0.3} weight={700} fill="#78716c">
          P4
        </PlanLabel>
      </g>
      {/* مواقف الصف الجنوبي الغربي */}
      {westStalls.map((bx, i) => (
        <g key={`s-${bx}`}>
          <rect x={bx} y={9.3} width={2.5} height={5.0} fill="none" stroke="#d6d3d1" strokeWidth={0.07} strokeDasharray="0.35 0.25" />
          <Car x={bx + 0.3} y={10.15} />
          <PlanLabel x={bx + 1.25} y={13.95} size={0.3} weight={700} fill="#78716c">
            P{i + 5}
          </PlanLabel>
        </g>
      ))}

      {/* ممر المناورة الغربي المزدوج */}
      <PlanLabel x={4.0} y={6.9} size={0.36} weight={700} fill="#78716c">
        ممر مناورة مزدوج التحميل — 3.7 م
      </PlanLabel>
      <PlanLabel x={4.0} y={7.5} size={0.28} weight={600} fill="#a8a29e">
        يخدم P1–P3 شمالاً وP5–P7 جنوباً
      </PlanLabel>

      {/* ممر الحركة الشرقي */}
      <rect x={12.3} y={5.4} width={3.6} height={3.7} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={14.1} y={6.9} size={0.24} weight={600} fill="#78716c">
        ممر شرقي
      </PlanLabel>
      <PlanLabel x={14.1} y={7.4} size={0.2} weight={600} fill="#a8a29e">
        يصل المنحدر
      </PlanLabel>

      {/* حركة باتجاه واحد حول اللب */}
      <rect x={7.9} y={9.1} width={4.4} height={5.8} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10.1} y={11.6} size={0.24} weight={700} fill="#78716c">
        حركة باتجاه واحد
      </PlanLabel>
      <PlanLabel x={10.1} y={12.1} size={0.2} weight={600} fill="#a8a29e">
        حول اللب (مبدئية)
      </PlanLabel>
      <path
        d="M 15.3 8.4 L 13.0 8.4 C 12.2 8.4 12.4 9.65 11.4 9.65 L 8.6 9.65 C 7.9 9.65 7.8 9.1 7.2 8.7"
        fill="none"
        stroke="#0f766e"
        strokeWidth={0.09}
        strokeDasharray="0.4 0.28"
      />
      <path d="M 7.42 8.5 L 7.05 8.55 L 7.35 8.95 Z" fill="#0f766e" />

      {/* الخدمات جنوب الطابق */}
      <rect x={12.3} y={9.3} width={2.7} height={5.6} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
      <PlanLabel x={13.65} y={11.7} size={0.28} weight={700} fill="#0f766e">
        خزان مياه
      </PlanLabel>
      <PlanLabel x={13.65} y={12.2} size={0.24} weight={700} fill="#0f766e">
        أرضي 20 م³
      </PlanLabel>
      <PlanLabel x={13.65} y={12.7} size={0.22} weight={600} fill="#14b8a6">
        ومضخات
      </PlanLabel>
      <rect x={15.1} y={9.3} width={2.2} height={5.6} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={16.2} y={11.7} size={0.26} weight={700} fill="#a16207">
        الكهرباء
      </PlanLabel>
      <PlanLabel x={16.2} y={12.2} size={0.24} weight={600} fill="#ca8a04">
        والمولّد
      </PlanLabel>
      <rect x={17.4} y={9.3} width={1.2} height={5.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={18.0} y={11.9} size={0.22} weight={700} fill="#57534e" rotate={-90}>
        مخزن 1
      </PlanLabel>
      <rect x={18.7} y={9.3} width={1.1} height={5.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={19.25} y={11.9} size={0.22} weight={700} fill="#57534e" rotate={-90}>
        مخزن 2
      </PlanLabel>

      {/* اللب الحركي */}
      <CoreLayout lobbyLabel="بهو المصعد" northLabel="دخول القبو" />

      {/* المنحدر */}
      <g>
        <rect x={16.1} y={0.2} width={3.7} height={8.9} fill="#e7e5e4" stroke="#57534e" strokeWidth={0.1} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line
            key={i}
            x1={16.1}
            y1={0.2 + i * 0.94}
            x2={19.8}
            y2={0.9 + i * 0.94}
            stroke="#d6d3d1"
            strokeWidth={0.06}
          />
        ))}
        <line x1={17.95} y1={7.2} x2={17.95} y2={1.6} stroke="#0f766e" strokeWidth={0.1} />
        <path d="M 17.73 2.2 L 17.95 1.55 L 18.17 2.2 Z" fill="#0f766e" />
        <PlanLabel x={17.95} y={8.15} size={0.3} weight={700} fill="#44403c">
          منحدر السيارات
        </PlanLabel>
      </g>

      <PlanLabel x={10} y={-0.75} size={0.5} weight={800} fill="#0f766e">
        القبو — 7 مواقف سيارات (2.5 × 5.0 م) ناتجة عن التخطيط الفعلي + مخزنان وخدمات
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= الطابق الأرضي ================= */
export function GroundPlan() {
  return (
    <PlanFrame note="مخطط الطابق الأرضي — بهو المدخل والخدمات المشتركة حول اللب المركزي">
      {/* صالة متعددة الأغراض */}
      <rect x={0.2} y={0.2} width={7.5} height={4.1} fill="#ecfdf5" stroke="#10b981" strokeWidth={0.08} />
      <PlanLabel x={3.95} y={2.05} size={0.4} weight={800} fill="#047857">
        صالة متعددة الأغراض
      </PlanLabel>
      <PlanLabel x={3.95} y={2.65} size={0.3} weight={600} fill="#059669">
        31 م² — جلسات واجتماعات السكان
      </PlanLabel>

      {/* حضانة ونظافة */}
      <rect x={0.2} y={4.7} width={3.6} height={2.2} fill="#fff7ed" stroke="#ea580c" strokeWidth={0.07} />
      <PlanLabel x={2.0} y={5.65} size={0.3} weight={700} fill="#c2410c">
        حضانة أطفال
      </PlanLabel>
      <PlanLabel x={2.0} y={6.2} size={0.24} weight={600} fill="#ea580c">
        8 م²
      </PlanLabel>
      <rect x={4.2} y={4.7} width={3.5} height={2.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={5.95} y={5.9} size={0.28} weight={700} fill="#57534e">
        نظافة ومخزن
      </PlanLabel>

      {/* بهو المدخل الرئيسي */}
      <rect x={0.2} y={7.3} width={7.5} height={7.5} fill="#f5f5f4" stroke="#57534e" strokeWidth={0.08} />
      <PlanLabel x={3.95} y={11.0} size={0.46} weight={800} fill="#1c1917">
        بهو المدخل الرئيسي
      </PlanLabel>
      <PlanLabel x={3.95} y={11.65} size={0.32} weight={600} fill="#78716c">
        صناديق بريد + مقاعد انتظار
      </PlanLabel>

      {/* اللب الحركي + ممر الوصل */}
      <CoreLayout lobbyLabel="بهو المصعد" northLabel="ممر وصل شمالي" />
      <rect x={7.9} y={9.28} width={4.2} height={5.5} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={11.9} size={0.3} weight={700} fill="#57534e">
        بهو انتظار شرقي
      </PlanLabel>
      <Door x={8.3} y={9.28} r={0.6} rot={90} />

      {/* الخدمات الشرقية */}
      <rect x={12.5} y={0.2} width={7.3} height={3.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={16.15} y={1.65} size={0.34} weight={700} fill="#57534e">
        إدارة واستقبال
      </PlanLabel>
      <PlanLabel x={16.15} y={2.25} size={0.26} weight={500} fill="#a8a29e">
        23 م²
      </PlanLabel>
      <rect x={12.5} y={3.8} width={3.6} height={1.9} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={14.3} y={4.9} size={0.28} weight={700} fill="#57534e">
        بريد وصناديق
      </PlanLabel>
      <rect x={16.5} y={3.8} width={3.3} height={1.9} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={18.15} y={4.6} size={0.28} weight={700} fill="#a16207">
        غرفة نفايات
      </PlanLabel>
      <PlanLabel x={18.15} y={5.15} size={0.22} weight={600} fill="#ca8a04">
        (باب خدمة خارجي)
      </PlanLabel>
      <rect x={12.5} y={6.1} width={7.3} height={2.4} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={16.15} y={7.2} size={0.32} weight={700} fill="#a16207">
        عدادات وقاطع رئيسي
      </PlanLabel>
      <PlanLabel x={16.15} y={7.75} size={0.26} weight={600} fill="#ca8a04">
        17 م²
      </PlanLabel>
      <rect x={12.5} y={8.9} width={3.6} height={2.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={14.3} y={10.05} size={0.3} weight={700} fill="#57534e">
        أمن وحارس
      </PlanLabel>
      <PlanLabel x={14.3} y={10.6} size={0.24} weight={500} fill="#a8a29e">
        9 م²
      </PlanLabel>
      <rect x={16.5} y={8.9} width={3.3} height={2.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={18.15} y={10.05} size={0.3} weight={700} fill="#57534e">
        مخزن عام
      </PlanLabel>
      <rect x={12.5} y={11.9} width={7.3} height={2.9} fill="#ecfdf5" stroke="#10b981" strokeWidth={0.07} />
      <PlanLabel x={16.15} y={13.5} size={0.36} weight={700} fill="#047857">
        جلسات انتظار الضيوف
      </PlanLabel>

      {/* أبواب */}
      <Door x={3.4} y={14.8} r={0.9} rot={-90} />
      <Door x={4.6} y={14.8} r={0.9} rot={-90} flip />
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

/* ================= السطح ================= */
export function RoofPlan() {
  const { panelW, panelH, gap, arrayX0, arrayY0, rows, panelsPerRow, arrayWidthEW, arrayDepthSN } =
    SOLAR_ARRAY;
  // 16 صفاً تتتابع غرب ← شرق، وكل صف 3 ألواح تتتابع جنوب ← شمال
  const cols = Array.from({ length: rows }, (_, i) => +(arrayX0 + i * (panelW + gap)).toFixed(3));
  const rowsY = Array.from({ length: panelsPerRow }, (_, j) =>
    +(arrayY0 + j * (panelH + gap)).toFixed(3),
  );
  const tankCols = { west: [3.3, 4.45, 5.6, 6.75], east: [12.25, 13.4, 14.55, 15.7] };
  const tankRows = [4.7, 5.8];
  return (
    <PlanFrame note="مخطط السطح — المصفوفة الجنوبية 16 صفاً × 3 ألواح = 48 لوحاً و16 خزاناً حول البنتهاوس فوق اللب المركزي">
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
      <PlanLabel x={4.4} y={4.15} size={0.26} weight={600} fill="#a8a29e">
        ممشى صيانة محيطي
      </PlanLabel>

      {/* بنتهاوس: درج الوصول وغرفة آلات المصعد — فوق اللب المركزي الجديد (محاذاة رأسية) */}
      <rect x={7.9} y={6.5} width={2.5} height={2.3} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <PlanLabel x={9.15} y={7.5} size={0.26} weight={700} fill="#44403c">
        درج الوصول
      </PlanLabel>
      <PlanLabel x={9.15} y={8.0} size={0.22} weight={600} fill="#78716c">
        إلى السطح
      </PlanLabel>
      <rect x={10.4} y={6.5} width={1.7} height={2.3} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <PlanLabel x={11.25} y={7.4} size={0.22} weight={700} fill="#44403c">
        غرفة آلات
      </PlanLabel>
      <PlanLabel x={11.25} y={7.85} size={0.22} weight={700} fill="#44403c">
        المصعد
      </PlanLabel>
      <PlanLabel x={10} y={6.15} size={0.22} weight={700} fill="#0f766e">
        محاذاة رأسية فوق اللب
      </PlanLabel>

      {/* خزانات المياه — 16 قاعدة 1×1 م حول البنتهاوس */}
      {(["west", "east"] as const).map((side) => {
        const zx = side === "west" ? 3.2 : 12.15;
        return (
          <g key={side}>
            <rect
              x={zx}
              y={4.6}
              width={4.65}
              height={2.4}
              fill="#ccfbf1"
              opacity={0.5}
              stroke="#0d9488"
              strokeWidth={0.08}
              strokeDasharray="0.3 0.2"
            />
            {tankCols[side].map((cx) =>
              tankRows.map((cy) => (
                <g key={`${side}-${cx}-${cy}`}>
                  <rect x={cx} y={cy} width={1} height={1} fill="#99f6e4" stroke="#0f766e" strokeWidth={0.07} />
                  <circle cx={cx + 0.5} cy={cy + 0.5} r={0.28} fill="#5eead4" stroke="#0f766e" strokeWidth={0.04} />
                </g>
              )),
            )}
            <PlanLabel x={zx + 2.32} y={7.3} size={0.26} weight={700} fill="#0f766e">
              8 خزانات (4×2)
            </PlanLabel>
          </g>
        );
      })}
      <PlanLabel x={4.6} y={9.5} size={0.3} weight={800} fill="#0f766e">
        16 خزاناً × 1000 لتر = 16 م³ — قاعدة 1×1 م حول البنتهاوس
      </PlanLabel>
      <PlanLabel x={4.6} y={10.0} size={0.24} weight={600} fill="#b45309">
        الحمل المائي ≈ 16 طناً — تحقق إنشائي إلزامي
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
      <PlanLabel x={10} y={14.62} size={0.34} weight={800} fill="#b45309">
        المصفوفة الجنوبية — 16 صفاً (غرب ← شرق) × 3 ألواح (جنوب ← شمال) = 48 لوحاً × 450 واط
      </PlanLabel>
      <PlanLabel x={10} y={15.0} size={0.26} weight={600} fill="#b45309">
        {`العرض ${arrayWidthEW.toFixed(2)} م = 16 × 1.13 م + فواصل — العمق ${arrayDepthSN.toFixed(2)} م = 3 × 1.72 م`}
      </PlanLabel>

      {/* السخّانات الشمسية — الشريط الشمالي */}
      <rect x={0.9} y={0.9} width={3.2} height={1.7} fill="#ffedd5" stroke="#ea580c" strokeWidth={0.08} />
      <rect x={1.05} y={1.1} width={1.3} height={1.3} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <rect x={2.65} y={1.1} width={1.3} height={1.3} fill="#fdba74" stroke="#c2410c" strokeWidth={0.07} />
      <line x1={1.05} y1={2.35} x2={3.95} y2={2.35} stroke="#c2410c" strokeWidth={0.06} />
      <PlanLabel x={2.5} y={3.15} size={0.28} weight={700} fill="#c2410c">
        سخّانان شمسيان 2 × 300 لتر
      </PlanLabel>

      {/* مسار الكابلات من المصفوفة إلى غرفة الآلات */}
      <path
        d="M 12.6 8.9 L 12.6 8.8"
        fill="none"
        stroke="#b45309"
        strokeWidth={0.1}
        strokeDasharray="0.25 0.18"
      />
      <PlanLabel x={13.9} y={8.45} size={0.24} weight={600} fill="#b45309">
        مسار كابلات
      </PlanLabel>

      {/* هوية تهوية ودش برق */}
      <rect x={9.6} y={2.6} width={0.7} height={0.7} fill="#e7e5e4" stroke="#78716c" strokeWidth={0.06} />
      <PlanLabel x={9.95} y={2.35} size={0.26} weight={600} fill="#78716c">
        هوية تهوية
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
