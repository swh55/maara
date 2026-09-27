// مخططات طوابق المبنى الواحد — 20 × 15 م (SVG بوحدة المتر)
// الطابق السكني النموذجي: 4 شقق متطابقة (بمرايا) حول لب حركي مركزي
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

/* ================= اللب الحركي المشترك (يتكرر في كل الطوابق) ================= */
function CoreLayout({ lobbyLabel, servicesLabel }: { lobbyLabel: string; servicesLabel: string }) {
  return (
    <g>
      <rect x={7.9} y={6.7} width={4.2} height={2.2} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={7.55} size={0.32} weight={700} fill="#57534e">
        {lobbyLabel}
      </PlanLabel>
      <PlanLabel x={10} y={8.15} size={0.26} weight={600} fill="#78716c">
        مشترك
      </PlanLabel>
      <rect x={7.9} y={8.9} width={4.2} height={1.8} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.07} />
      <PlanLabel x={10} y={9.95} size={0.26} weight={700} fill="#a16207">
        {servicesLabel}
      </PlanLabel>
      <Stairs x={7.9} y={4.5} w={2.6} h={2.2} steps={5} />
      <PlanLabel x={9.2} y={5.72} size={0.26} weight={700} fill="#44403c">
        درج
      </PlanLabel>
      <ElevatorBox x={10.5} y={4.5} w={1.6} h={1.8} />
      <PlanLabel x={11.3} y={5.55} size={0.24} weight={700} fill="#1c1917">
        مصعد
      </PlanLabel>
      <Door x={9.3} y={6.7} r={0.6} rot={90} />
      <Door x={11.3} y={6.3} r={0.6} rot={90} />
      {/* الجدران الخارجية للب */}
      <rect
        x={7.9}
        y={4.5}
        width={4.2}
        height={6.2}
        fill="none"
        stroke="#292524"
        strokeWidth={0.12}
      />
    </g>
  );
}

/* ================= القبو ================= */
export function BasementPlan() {
  const westStores = [0.2, 2.75, 5.3];
  const eastStores = [12.45, 14.9, 17.35];
  const westCars = [0.25, 2.8, 5.35];
  const eastCars = [12.35, 14.9, 17.45];
  return (
    <PlanFrame note="مخطط القبو — مواقف ومخازن ومعدات">
      {/* مخازن سكنية */}
      {westStores.map((mx, i) => (
        <g key={`ws-${mx}`}>
          <rect x={mx} y={0.2} width={2.3} height={3.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
          <PlanLabel x={mx + 1.15} y={1.5} size={0.34} weight={700} fill="#57534e">
            مخزن {i + 1}
          </PlanLabel>
          <PlanLabel x={mx + 1.15} y={2.1} size={0.28} weight={500} fill="#a8a29e">
            2.2 × 3.0 م
          </PlanLabel>
        </g>
      ))}
      {eastStores.map((mx, i) => (
        <g key={`es-${mx}`}>
          <rect x={mx} y={0.2} width={2.3} height={3.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
          <PlanLabel x={mx + 1.15} y={1.5} size={0.34} weight={700} fill="#57534e">
            مخزن {i + 4}
          </PlanLabel>
          <PlanLabel x={mx + 1.15} y={2.1} size={0.28} weight={500} fill="#a8a29e">
            2.2 × 3.0 م
          </PlanLabel>
        </g>
      ))}

      {/* غرف الخدمات */}
      <rect x={0.2} y={3.6} width={3.5} height={1.9} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={1.95} y={4.7} size={0.32} weight={700} fill="#a16207">
        الكهرباء الرئيسية
      </PlanLabel>
      <rect x={4.1} y={3.6} width={3.4} height={1.9} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={5.8} y={4.7} size={0.32} weight={700} fill="#57534e">
        التهوية والمولّدة
      </PlanLabel>
      <rect x={12.45} y={3.6} width={3.6} height={1.9} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
      <PlanLabel x={14.25} y={4.7} size={0.32} weight={700} fill="#0f766e">
        مضخات مياه وضغط
      </PlanLabel>
      <rect x={16.45} y={3.6} width={3.3} height={1.9} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
      <PlanLabel x={18.1} y={4.5} size={0.3} weight={700} fill="#0f766e">
        خزان مياه أرضي
      </PlanLabel>
      <PlanLabel x={18.1} y={5.1} size={0.28} weight={600} fill="#14b8a6">
        20 م³
      </PlanLabel>

      {/* اللب الحركي */}
      <CoreLayout lobbyLabel="بهو المصعد" servicesLabel="قاطع فرعي وكهرباء" />

      {/* مواقف الصف الغربي */}
      {westCars.map((bx) => (
        <g key={`wc-${bx}`}>
          <rect
            x={bx}
            y={5.95}
            width={2.3}
            height={3.5}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.2} y={6.1} />
        </g>
      ))}

      {/* ممر الحركة */}
      <PlanLabel x={3.95} y={10.7} size={0.38} weight={700} fill="#78716c">
        ممر حركة السيارات
      </PlanLabel>
      <PlanLabel x={3.95} y={11.35} size={0.3} weight={600} fill="#a8a29e">
        يتصل بالمنحدر جنوباً
      </PlanLabel>

      {/* مواقف الصف الشرقي */}
      {eastCars.map((bx) => (
        <g key={`ec-${bx}`}>
          <rect
            x={bx}
            y={11.2}
            width={2.3}
            height={3.4}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.2} y={11.35} />
        </g>
      ))}

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
        القبو — ≈ 6 مواقف سيارات + مخازن ومعدات
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
      <rect x={7.9} y={10.7} width={4.2} height={4.1} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={12.9} size={0.32} weight={700} fill="#57534e">
        بهو انتظار شرقي
      </PlanLabel>
      <Door x={7.9} y={10.4} r={0.8} rot={0} />

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

/* ================= الطابق السكني النموذجي (4 شقق) ================= */
interface UZone {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  label?: string;
  lx?: number;
  ly?: number;
  ls?: number;
}

// تخطيط الشقة المرجعية (شمال-غرب) — يُرسم للوحدات الأخرى بالمرايا
const NW_ZONES: UZone[] = [
  { x: 0, y: 0, w: 3.7, h: 3.2, fill: "#fafaf9", label: "نوم رئيسية", lx: 1.3, ly: 2.9, ls: 0.3 },
  { x: 2.5, y: 0, w: 1.2, h: 2.0, fill: "#f0fdfa" }, // حمّام رئيسي ملحق
  { x: 3.7, y: 0, w: 2.4, h: 3.2, fill: "#fafaf9", label: "نوم ثانية", lx: 4.9, ly: 1.7, ls: 0.28 },
  { x: 6.1, y: 0, w: 1.8, h: 3.2, fill: "#fffbeb", label: "مطبخ", lx: 7.0, ly: 1.7, ls: 0.28 },
  { x: 7.9, y: 0, w: 2.1, h: 3.3, fill: "#fafaf9", label: "نوم ثالثة", lx: 8.95, ly: 1.7, ls: 0.26 },
  { x: 4.4, y: 3.2, w: 5.6, h: 1.3, fill: "#e7e5e4", label: "ممر", lx: 7.3, ly: 3.98, ls: 0.26 },
  { x: 0, y: 3.2, w: 4.4, h: 1.3, fill: "#ecfdf5" },
  { x: 0, y: 4.5, w: 5.8, h: 3.0, fill: "#ecfdf5", label: "معيشة", lx: 2.4, ly: 6.2, ls: 0.34 },
  { x: 5.8, y: 4.5, w: 2.1, h: 3.0, fill: "#f5f5f4", label: "بهو", lx: 6.85, ly: 5.55, ls: 0.28 },
  { x: 4.4, y: 6.0, w: 1.4, h: 1.5, fill: "#f0fdfa", label: "حمّام", lx: 5.1, ly: 6.88, ls: 0.22 },
];

function UnitZones({ fx, fy }: { fx: boolean; fy: boolean }) {
  return (
    <g>
      {NW_ZONES.map((z, i) => {
        const x = fx ? 20 - z.x - z.w : z.x;
        const y = fy ? 15 - z.y - z.h : z.y;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={z.w}
              height={z.h}
              fill={z.fill}
              stroke="#a8a29e"
              strokeWidth={0.05}
            />
            {z.label && (
              <PlanLabel
                x={fx ? 20 - (z.lx ?? 0) : z.lx ?? 0}
                y={fy ? 15 - (z.ly ?? 0) : z.ly ?? 0}
                size={z.ls ?? 0.28}
                weight={700}
                fill="#57534e"
              >
                {z.label}
              </PlanLabel>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function TypicalPlan() {
  return (
    <PlanFrame note="مخطط الطابق السكني النموذجي — أربع شقق متطابقة حول لب الدرج والمصعد">
      {/* الشقق الأربع (مرايا حول المحورين) */}
      <UnitZones fx={false} fy={false} />
      <UnitZones fx={true} fy={false} />
      <UnitZones fx={false} fy={true} />
      <UnitZones fx={true} fy={true} />

      {/* أسماء الشقق */}
      <PlanLabel x={2.9} y={7.32} size={0.44} weight={800} fill="#047857">
        الشقة أ ≈ 66 م²
      </PlanLabel>
      <PlanLabel x={17.1} y={7.32} size={0.44} weight={800} fill="#b45309">
        الشقة ب ≈ 66 م²
      </PlanLabel>
      <PlanLabel x={2.9} y={7.78} size={0.44} weight={800} fill="#0f766e">
        الشقة ج ≈ 66 م²
      </PlanLabel>
      <PlanLabel x={17.1} y={7.78} size={0.44} weight={800} fill="#be123c">
        الشقة د ≈ 66 م²
      </PlanLabel>

      {/* اللب الحركي المركزي */}
      <CoreLayout lobbyLabel="بهو التوزيع" servicesLabel="رافعة صحية وكهرباء" />

      {/* جدران الفصل بين الشقق */}
      <line x1={0} y1={7.5} x2={7.9} y2={7.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={12.1} y1={7.5} x2={20} y2={7.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={10} y1={0} x2={10} y2={4.5} stroke="#57534e" strokeWidth={0.1} />
      <line x1={10} y1={10.5} x2={10} y2={15} stroke="#57534e" strokeWidth={0.1} />
      <line x1={7.9} y1={0} x2={7.9} y2={4.5} stroke="#a8a29e" strokeWidth={0.06} />
      <line x1={7.9} y1={10.5} x2={7.9} y2={15} stroke="#a8a29e" strokeWidth={0.06} />
      <line x1={12.1} y1={0} x2={12.1} y2={4.5} stroke="#a8a29e" strokeWidth={0.06} />
      <line x1={12.1} y1={10.5} x2={12.1} y2={15} stroke="#a8a29e" strokeWidth={0.06} />

      {/* أبواب الشقق من البهو */}
      <Door x={7.9} y={7.4} r={0.7} rot={180} />
      <Door x={7.9} y={7.6} r={0.7} rot={180} />
      <Door x={12.1} y={7.4} r={0.7} rot={0} />
      <Door x={12.1} y={7.6} r={0.7} rot={0} />

      {/* نوافذ الواجهة الشمالية */}
      <WindowSeg x={0.8} y={-0.15} w={1.8} h={0.3} />
      <WindowSeg x={4.1} y={-0.15} w={1.6} h={0.3} />
      <WindowSeg x={6.3} y={-0.15} w={1.2} h={0.3} />
      <WindowSeg x={8.35} y={-0.15} w={1.3} h={0.3} />
      <WindowSeg x={10.35} y={-0.15} w={1.3} h={0.3} />
      <WindowSeg x={12.5} y={-0.15} w={1.2} h={0.3} />
      <WindowSeg x={14.3} y={-0.15} w={1.6} h={0.3} />
      <WindowSeg x={17.4} y={-0.15} w={1.8} h={0.3} />
      {/* الواجهة الجنوبية (مرآة) */}
      <WindowSeg x={0.8} y={14.85} w={1.8} h={0.3} />
      <WindowSeg x={4.1} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={6.3} y={14.85} w={1.2} h={0.3} />
      <WindowSeg x={8.35} y={14.85} w={1.3} h={0.3} />
      <WindowSeg x={10.35} y={14.85} w={1.3} h={0.3} />
      <WindowSeg x={12.5} y={14.85} w={1.2} h={0.3} />
      <WindowSeg x={14.3} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={17.4} y={14.85} w={1.8} h={0.3} />
      {/* الواجهتان الغربية والشرقية */}
      <WindowSeg x={-0.15} y={5.0} w={0.3} h={2.0} />
      <WindowSeg x={-0.15} y={8.0} w={0.3} h={2.0} />
      <WindowSeg x={19.85} y={5.0} w={0.3} h={2.0} />
      <WindowSeg x={19.85} y={8.0} w={0.3} h={2.0} />

      <PlanLabel x={10} y={-0.95} size={0.5} weight={800} fill="#0f766e">
        الطابق السكني النموذجي — 4 شقق × (5 غرف + حمّامان + بهو)
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
        pvRows.map((ry) => <PvTile key={`${cx}-${ry}`} x={cx} y={ry} />)
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

      {/* السخانات الشمسية */}
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
