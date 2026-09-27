// مخططات طوابق المبنى الواحد — 20 × 15 م (SVG بوحدة المتر)
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

/* ================= القبو ================= */
export function BasementPlan() {
  const bayXs = [4.9, 7.45, 10.0, 12.55];
  return (
    <PlanFrame note="مخطط القبو — مواقف ومخازن ومعدات">
      {/* مخازن سكنية */}
      {[0.2, 2.65, 5.1, 7.55, 10.0, 12.45].map((mx, i) => (
        <g key={mx}>
          <rect x={mx} y={0.2} width={2.3} height={3.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
          <PlanLabel x={mx + 1.15} y={1.5} size={0.36} weight={700} fill="#57534e">
            مخزن {i + 1}
          </PlanLabel>
          <PlanLabel x={mx + 1.15} y={2.1} size={0.3} weight={500} fill="#a8a29e">
            2.4 × 3.0 م
          </PlanLabel>
        </g>
      ))}

      {/* غرف الخدمات */}
      <g>
        <rect x={15.15} y={0.2} width={4.65} height={3.0} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
        <PlanLabel x={17.45} y={1.55} size={0.36} weight={700} fill="#0f766e">
          غرفة مضخات المياه
        </PlanLabel>
        <PlanLabel x={17.45} y={2.15} size={0.3} weight={500} fill="#14b8a6">
          + لوحة التحكم
        </PlanLabel>

        <rect x={0.2} y={3.6} width={4.4} height={3.4} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
        <PlanLabel x={2.4} y={5.15} size={0.36} weight={700} fill="#a16207">
          الكهرباء الرئيسية
        </PlanLabel>

        <rect x={0.2} y={7.4} width={4.4} height={3.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
        <PlanLabel x={2.4} y={8.85} size={0.36} weight={700} fill="#57534e">
          التهوية والمولّدة
        </PlanLabel>

        <rect x={0.2} y={11.0} width={4.4} height={3.8} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.08} />
        <PlanLabel x={2.4} y={12.55} size={0.36} weight={700} fill="#0f766e">
          خزان مياه أرضي
        </PlanLabel>
        <PlanLabel x={2.4} y={13.15} size={0.34} weight={600} fill="#14b8a6">
          20 م³
        </PlanLabel>
      </g>

      {/* مواقف الصف الأول */}
      {bayXs.map((bx) => (
        <g key={`r1-${bx}`}>
          <rect
            x={bx}
            y={3.8}
            width={2.4}
            height={4.8}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.25} y={4.4} />
        </g>
      ))}

      {/* ممر الحركة */}
      <PlanLabel x={10} y={9.55} size={0.4} weight={700} fill="#78716c">
        ممر حركة السيارات — عرض 5 م
      </PlanLabel>

      {/* مواقف الصف الثاني */}
      {bayXs.map((bx) => (
        <g key={`r2-${bx}`}>
          <rect
            x={bx}
            y={10.0}
            width={2.4}
            height={4.8}
            fill="none"
            stroke="#d6d3d1"
            strokeWidth={0.07}
            strokeDasharray="0.35 0.25"
          />
          <Car x={bx + 0.25} y={10.9} />
        </g>
      ))}

      {/* المنحدر */}
      <g>
        <rect x={15.2} y={9.8} width={4.6} height={5.0} fill="#e7e5e4" stroke="#57534e" strokeWidth={0.1} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={15.2 + i * 0.75}
            y1={14.8}
            x2={15.9 + i * 0.75}
            y2={9.8}
            stroke="#d6d3d1"
            strokeWidth={0.06}
          />
        ))}
        <line x1={17.5} y1={10.6} x2={17.5} y2={13.9} stroke="#0f766e" strokeWidth={0.1} />
        <path d="M 17.15 13.4 L 17.5 14.05 L 17.85 13.4 Z" fill="#0f766e" />
        <PlanLabel x={17.5} y={10.25} size={0.36} weight={700} fill="#44403c">
          منحدر السيارات
        </PlanLabel>
      </g>

      <PlanLabel x={10} y={-0.75} size={0.5} weight={800} fill="#0f766e">
        القبو — مواقف ≈ 14 سيارة + مخازن + معدات
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= الطابق الأرضي ================= */
export function GroundPlan() {
  return (
    <PlanFrame note="مخطط الطابق الأرضي — بهو المدخل والخدمات المشتركة">
      {/* صالة متعددة الأغراض */}
      <rect x={0.2} y={0.2} width={8.8} height={6.6} fill="#ecfdf5" stroke="#10b981" strokeWidth={0.08} />
      <PlanLabel x={4.6} y={3.2} size={0.5} weight={800} fill="#047857">
        صالة متعددة الأغراض
      </PlanLabel>
      <PlanLabel x={4.6} y={3.95} size={0.4} weight={600} fill="#059669">
        60 م² — جلسات مشتركة
      </PlanLabel>

      {/* خدمات شمالية */}
      <rect x={9.4} y={0.2} width={4.4} height={3.1} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={11.6} y={1.55} size={0.38} weight={700} fill="#a16207">
        عدادات وكهرباء
      </PlanLabel>
      <PlanLabel x={11.6} y={2.15} size={0.3} weight={500} fill="#ca8a04">
        13 م²
      </PlanLabel>

      <rect x={9.4} y={3.7} width={4.4} height={3.1} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={11.6} y={5.05} size={0.38} weight={700} fill="#57534e">
        خدمة ونظافة
      </PlanLabel>
      <PlanLabel x={11.6} y={5.65} size={0.3} weight={500} fill="#a8a29e">
        13 م²
      </PlanLabel>

      <rect x={14.2} y={0.2} width={5.6} height={3.1} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={17} y={1.55} size={0.38} weight={700} fill="#57534e">
        إدارة واستقبال
      </PlanLabel>
      <PlanLabel x={17} y={2.15} size={0.3} weight={500} fill="#a8a29e">
        17 م²
      </PlanLabel>

      <rect x={14.2} y={3.7} width={5.6} height={3.1} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={17} y={5.05} size={0.38} weight={700} fill="#57534e">
        بريد ومخزن
      </PlanLabel>
      <PlanLabel x={17} y={5.65} size={0.3} weight={500} fill="#a8a29e">
        17 م²
      </PlanLabel>

      {/* ممر التوزيع */}
      <rect x={0.2} y={7.2} width={8.0} height={4.0} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={4.2} y={9.35} size={0.42} weight={700} fill="#78716c">
        ممر التوزيع
      </PlanLabel>

      {/* اللب: درج + مصعد */}
      <Stairs x={11.8} y={7.2} w={3.0} h={4.2} steps={7} />
      <PlanLabel x={13.3} y={9.7} size={0.36} weight={700} fill="#44403c">
        درج
      </PlanLabel>
      <ElevatorBox x={8.6} y={7.2} w={2.9} h={2.2} />
      <PlanLabel x={10.05} y={8.55} size={0.34} weight={700} fill="#1c1917">
        مصعد
      </PlanLabel>
      <rect x={8.6} y={9.6} width={2.9} height={1.8} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10.05} y={10.65} size={0.3} weight={600} fill="#78716c">
        بهو المصعد
      </PlanLabel>

      {/* قاطع رئيسي ومعدات */}
      <rect x={14.8} y={7.2} width={5.0} height={4.2} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.08} />
      <PlanLabel x={17.3} y={9.05} size={0.36} weight={700} fill="#a16207">
        القاطع الكهربائي
      </PlanLabel>
      <PlanLabel x={17.3} y={9.65} size={0.36} weight={700} fill="#a16207">
        الرئيسي والمعدات
      </PlanLabel>

      {/* حارس واستقبال */}
      <rect x={0.2} y={11.6} width={4.6} height={3.2} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={2.5} y={13.05} size={0.38} weight={700} fill="#57534e">
        حارس واستقبال
      </PlanLabel>
      <PlanLabel x={2.5} y={13.65} size={0.3} weight={500} fill="#a8a29e">
        14 م²
      </PlanLabel>

      {/* بهو المدخل الرئيسي */}
      <rect x={5.0} y={11.6} width={9.6} height={3.2} fill="#e7e5e4" stroke="#57534e" strokeWidth={0.08} />
      <PlanLabel x={9.8} y={13.15} size={0.5} weight={800} fill="#1c1917">
        بهو المدخل الرئيسي
      </PlanLabel>
      <PlanLabel x={9.8} y={13.85} size={0.34} weight={600} fill="#78716c">
        صناديق بريد + مقاعد انتظار
      </PlanLabel>

      {/* ممر خدمة */}
      <rect x={14.8} y={11.6} width={5.0} height={3.2} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={17.3} y={13.4} size={0.36} weight={700} fill="#78716c">
        ممر خدمة
      </PlanLabel>

      {/* أبواب */}
      <Door x={9.35} y={15} r={0.85} rot={-90} />
      <Door x={4.8} y={13.4} r={0.7} rot={180} flip />
      <Door x={5.0} y={12.4} r={0.7} rot={0} />
      <Door x={8.6} y={10.6} r={0.65} rot={-90} />

      {/* نوافذ جنوبية */}
      <WindowSeg x={1.2} y={14.85} w={1.6} h={0.3} />
      <WindowSeg x={6.4} y={14.85} w={1.5} h={0.3} />
      <WindowSeg x={11.6} y={14.85} w={1.5} h={0.3} />
      <WindowSeg x={16.4} y={14.85} w={1.8} h={0.3} />
      {/* نافذة شمالية للصالة */}
      <WindowSeg x={3.2} y={-0.15} w={2.8} h={0.3} />

      <PlanLabel x={10} y={-0.75} size={0.5} weight={800} fill="#0f766e">
        الطابق الأرضي — بهو المدخل + خدمات مشتركة + لب الدرج والمصعد
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= الطابق السكني النموذجي ================= */
function UnitCellsWest() {
  return (
    <g stroke="#a8a29e" strokeWidth={0.05}>
      <line x1={2.95} y1={0.4} x2={2.95} y2={9.6} />
      <line x1={5.7} y1={0.4} x2={5.7} y2={9.6} />
      <line x1={0.4} y1={5.6} x2={8.3} y2={5.6} />
    </g>
  );
}

export function TypicalPlan() {
  return (
    <PlanFrame note="مخطط الطابق السكني النموذجي — ثلاث شقق حول لب الدرج والمصعد">
      {/* مناطق الشقق */}
      <rect x={0.2} y={0.2} width={8.3} height={10.4} fill="#ecfdf5" />
      <rect x={11.5} y={0.2} width={8.3} height={10.4} fill="#fffbeb" />
      <rect x={0.2} y={11.0} width={19.6} height={3.8} fill="#f0fdfa" />

      {/* حدود الشقق */}
      <line x1={8.5} y1={0.2} x2={8.5} y2={10.0} stroke="#57534e" strokeWidth={0.12} />
      <line x1={11.5} y1={0.2} x2={11.5} y2={10.0} stroke="#57534e" strokeWidth={0.12} />
      <line x1={0.2} y1={10.8} x2={19.8} y2={10.8} stroke="#57534e" strokeWidth={0.1} strokeDasharray="0.5 0.3" />

      {/* ===== الشقة الغربية ===== */}
      <UnitCellsWest />
      <PlanLabel x={1.55} y={3.0} size={0.4} weight={700} fill="#047857">معيشة</PlanLabel>
      <PlanLabel x={4.3} y={3.0} size={0.4} weight={700} fill="#a16207">مطبخ</PlanLabel>
      <PlanLabel x={7.1} y={3.0} size={0.4} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={1.55} y={7.7} size={0.4} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={4.3} y={7.5} size={0.34} weight={700} fill="#0d9488">حمّام رئيسي</PlanLabel>
      <PlanLabel x={4.3} y={8.1} size={0.34} weight={700} fill="#0d9488">حمّام ثانوي</PlanLabel>
      <PlanLabel x={7.1} y={7.7} size={0.4} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <rect x={6.9} y={8.3} width={1.4} height={1.15} fill="none" stroke="#78716c" strokeWidth={0.06} strokeDasharray="0.25 0.18" />
      <PlanLabel x={7.6} y={9.0} size={0.3} weight={700} fill="#78716c">بهو</PlanLabel>
      <Door x={8.55} y={8.5} r={0.7} rot={-90} />
      <PlanLabel x={4.35} y={10.25} size={0.48} weight={800} fill="#047857">
        الشقة الغربية ≈ 100 م²
      </PlanLabel>

      {/* ===== الشقة الشرقية (مرآة) ===== */}
      <g stroke="#a8a29e" strokeWidth={0.05}>
        <line x1={17.05} y1={0.4} x2={17.05} y2={9.6} />
        <line x1={14.35} y1={0.4} x2={14.35} y2={9.6} />
        <line x1={11.7} y1={5.6} x2={19.6} y2={5.6} />
      </g>
      <PlanLabel x={18.45} y={3.0} size={0.4} weight={700} fill="#047857">معيشة</PlanLabel>
      <PlanLabel x={15.7} y={3.0} size={0.4} weight={700} fill="#a16207">مطبخ</PlanLabel>
      <PlanLabel x={12.9} y={3.0} size={0.4} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={18.45} y={7.7} size={0.4} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={15.7} y={7.5} size={0.34} weight={700} fill="#0d9488">حمّام رئيسي</PlanLabel>
      <PlanLabel x={15.7} y={8.1} size={0.34} weight={700} fill="#0d9488">حمّام ثانوي</PlanLabel>
      <PlanLabel x={12.9} y={7.7} size={0.4} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <rect x={11.7} y={8.3} width={1.4} height={1.15} fill="none" stroke="#78716c" strokeWidth={0.06} strokeDasharray="0.25 0.18" />
      <PlanLabel x={12.4} y={9.0} size={0.3} weight={700} fill="#78716c">بهو</PlanLabel>
      <Door x={11.45} y={8.5} r={0.7} rot={90} />
      <PlanLabel x={15.65} y={10.25} size={0.48} weight={800} fill="#b45309">
        الشقة الشرقية ≈ 100 م²
      </PlanLabel>

      {/* ===== لب الحركة ===== */}
      <Stairs x={8.7} y={0.4} w={2.6} h={3.6} steps={6} />
      <ElevatorBox x={8.7} y={4.2} w={2.6} h={2.2} />
      <PlanLabel x={10} y={5.55} size={0.34} weight={700} fill="#1c1917">مصعد</PlanLabel>
      <rect x={8.7} y={6.6} width={2.6} height={3.4} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.06} />
      <PlanLabel x={10} y={8.0} size={0.36} weight={700} fill="#57534e">بهو التوزيع</PlanLabel>
      <PlanLabel x={10} y={8.6} size={0.3} weight={500} fill="#78716c">مشترك</PlanLabel>
      {/* ممر الوصول إلى الشقة الجنوبية */}
      <rect x={8.7} y={10.0} width={2.6} height={0.8} fill="#e7e5e4" />
      <Door x={9.3} y={10.95} r={0.65} rot={0} />

      {/* ===== الشقة الجنوبية ===== */}
      <g stroke="#a8a29e" strokeWidth={0.05}>
        {[3.6, 7.2, 10.2, 13.4, 16.6].map((vx) => (
          <line key={vx} x1={vx} y1={11.2} x2={vx} y2={14.4} />
        ))}
      </g>
      <PlanLabel x={1.9} y={12.6} size={0.36} weight={700} fill="#047857">معيشة وبهو</PlanLabel>
      <PlanLabel x={5.4} y={12.6} size={0.36} weight={700} fill="#a16207">مطبخ</PlanLabel>
      <PlanLabel x={8.7} y={12.6} size={0.36} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={11.8} y={12.6} size={0.36} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={15} y={12.6} size={0.36} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={18.2} y={12.6} size={0.34} weight={700} fill="#0d9488">حمّامان</PlanLabel>
      {/* شرفات */}
      {[1.2, 16.7].map((bx) => (
        <g key={bx}>
          <rect x={bx} y={13.95} width={2.2} height={0.8} fill="none" stroke="#78716c" strokeWidth={0.06} strokeDasharray="0.3 0.2" />
          <PlanLabel x={bx + 1.1} y={14.5} size={0.26} weight={600} fill="#78716c">شرفة</PlanLabel>
        </g>
      ))}
      <PlanLabel x={10} y={14.72} size={0.4} weight={800} fill="#0f766e">
        الشقة الجنوبية ≈ 100 م²
      </PlanLabel>

      {/* نوافذ */}
      <WindowSeg x={1.0} y={-0.15} w={2.2} h={0.3} />
      <WindowSeg x={16.6} y={-0.15} w={2.2} h={0.3} />
      <WindowSeg x={9.2} y={-0.15} w={1.6} h={0.3} />
      <WindowSeg x={-0.15} y={2.0} w={0.3} h={2.4} />
      <WindowSeg x={-0.15} y={7.0} w={0.3} h={2.0} />
      <WindowSeg x={19.85} y={2.0} w={0.3} h={2.4} />
      <WindowSeg x={19.85} y={7.0} w={0.3} h={2.0} />
      <WindowSeg x={5.0} y={14.85} w={1.8} h={0.3} />
      <WindowSeg x={14.0} y={14.85} w={1.8} h={0.3} />

      <PlanLabel x={10} y={-0.95} size={0.5} weight={800} fill="#0f766e">
        الطابق السكني النموذجي — 3 شقق × (5 غرف + حمّامان + بهو)
      </PlanLabel>
    </PlanFrame>
  );
}

/* ================= السطح ================= */
export function RoofPlan() {
  const pvCols = [12.05, 13.9, 15.75, 17.6];
  const pvRows = [0.65, 2.4, 4.15, 5.9, 7.65, 9.4, 11.15, 12.9];
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

      {/* بنتهاوس الدرج وآلات المصعد */}
      <rect x={8.6} y={4.6} width={2.8} height={4.8} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.1} />
      <line x1={8.6} y1={7.2} x2={11.4} y2={7.2} stroke="#57534e" strokeWidth={0.07} />
      <PlanLabel x={10} y={5.7} size={0.32} weight={700} fill="#44403c">غرفة آلات</PlanLabel>
      <PlanLabel x={10} y={6.25} size={0.32} weight={700} fill="#44403c">المصعد</PlanLabel>
      <PlanLabel x={10} y={8.15} size={0.32} weight={700} fill="#44403c">درج الوصول</PlanLabel>
      <PlanLabel x={10} y={8.7} size={0.3} weight={500} fill="#78716c">إلى السطح</PlanLabel>
      <Door x={9.5} y={9.4} r={0.7} rot={0} />

      {/* المصفوفة الرئيسية */}
      <rect x={11.9} y={0.5} width={7.6} height={13.9} fill="#fef3c7" opacity={0.5} />
      <rect
        x={11.9}
        y={0.5}
        width={7.6}
        height={13.9}
        fill="none"
        stroke="#d97706"
        strokeWidth={0.09}
        strokeDasharray="0.4 0.25"
      />
      {pvCols.map((cx) =>
        pvRows.map((ry) => <PvTile key={`${cx}-${ry}`} x={cx} y={ry} />)
      )}
      <PlanLabel x={15.7} y={14.75} size={0.4} weight={800} fill="#b45309">
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
      <rect x={12.1} y={13.6} width={0.7} height={0.7} fill="#e7e5e4" stroke="#78716c" strokeWidth={0.06} />
      <PlanLabel x={12.45} y={13.35} size={0.28} weight={600} fill="#78716c">هوية تهوية</PlanLabel>
      <g stroke="#b45309" strokeWidth={0.09} fill="none">
        <path d="M 19.3 1.2 L 19.0 1.9 L 19.35 1.9 L 19.0 2.7" />
        <circle cx={19.3} cy={1.0} r={0.16} fill="#b45309" stroke="none" />
        <path d="M 19.3 2.7 L 19.3 4.3" strokeDasharray="0.22 0.16" />
      </g>
      <PlanLabel x={18.55} y={3.4} size={0.28} weight={600} fill="#b45309">دش برق</PlanLabel>

      <PlanLabel x={10} y={-0.85} size={0.5} weight={800} fill="#b45309">
        السطح — 40 لوحاً شمسياً + 4 خزانات مياه + ممشى صيانة
      </PlanLabel>
    </PlanFrame>
  );
}
