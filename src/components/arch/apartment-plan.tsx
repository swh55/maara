// مخططا الشقتين النموذجيتين — تُرسلان من NORTH_UNIT / SOUTH_UNIT في arch-data.ts (مصدر وحيد)
// الشقة الشمالية 81.34 م² (صافي 70.56) — 5 غرف رئيسية + مطبخ مفتوح + حمّامان + شرفة زاوية
// الشقة الجنوبية 118.00 م² (صافي 101.72) — كامل العرض بـ5 غرف رئيسية + مطبخ بنافذة + حمّامين
import { BedIcon, Compass, DimH, DimV, Door, PlanLabel, WindowSeg } from "./primitives";
import {
  CORE,
  NORTH_UNIT,
  SOUTH_UNIT,
  UnitDef,
  roomArea,
  unitNet,
  unitRooms,
  unitWalls,
} from "@/lib/arch-data";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ================== مخطط الشقة الشمالية (إحداثيات محلية 10 × 9.1 + شرفة) ================== */
export function NorthUnitPlan() {
  const net = unitNet(NORTH_UNIT).toFixed(2);
  return (
    <svg
      viewBox="-3.0 -2.7 15.6 13.5"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط الشقة الشمالية بمساحة 81.34 متر مربع و5 غرف رئيسية وحمّام ثانوي 1.00 م² وشرفة ركنية"
    >
      {/* الجدران كخلفية داكنة (بصمة L) */}
      <rect x={0} y={0} width={10} height={4.5} fill="#44403c" />
      <rect x={0} y={4.5} width={7.9} height={4.6} fill="#44403c" />

      {/* الشرفة الركنية الكابولية على الزاوية الشمالية الغربية — خارج البصمة */}
      <rect x={0} y={-1.3} width={3.2} height={1.3} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <rect x={-1.3} y={0} width={1.3} height={1.9} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <g stroke="#b45309" strokeWidth={0.07}>
        <line x1={0} y1={-1.3} x2={3.2} y2={-1.3} />
        <line x1={3.2} y1={-1.3} x2={3.2} y2={0} />
        <line x1={-1.3} y1={0} x2={-1.3} y2={1.9} />
        <line x1={-1.3} y1={1.9} x2={0} y2={1.9} />
      </g>
      <circle cx={0.45} cy={-0.75} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <circle cx={2.9} cy={-0.85} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <PlanLabel x={2.55} y={-0.4} size={0.18} weight={700} fill="#b45309">
        شرفة ركنية كابولية
      </PlanLabel>
      <PlanLabel x={2.55} y={-0.68} size={0.15} weight={600} fill="#d97706">
        6.63 م² — خارج البصمة
      </PlanLabel>

      {/* الفراغات — من المصدر الوحيد */}
      {NORTH_UNIT.layout.map((room) =>
        room.parts.map((p, i) => (
          <rect
            key={`${room.name}-${i}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={room.color}
            stroke="#a8a29e"
            strokeWidth={0.03}
          />
        )),
      )}

      {/* منطقة اللب المقتطعة (7.90–10.00 × 4.50–9.10) */}
      <rect x={7.9} y={4.5} width={2.1} height={4.6} fill="#d6d3d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={7.9 + i * 0.5}
          y1={9.1}
          x2={8.6 + i * 0.5}
          y2={4.5}
          stroke="#c7c2bd"
          strokeWidth={0.045}
        />
      ))}
      <PlanLabel x={8.95} y={6.4} size={0.2} weight={700} fill="#57534e">
        اللب الحركي
      </PlanLabel>
      <PlanLabel x={8.95} y={6.75} size={0.16} weight={600} fill="#78716c">
        بهو التوزيع
      </PlanLabel>

      {/* ===== أثاث وتجهيزات ===== */}
      {/* النوم الرئيسية: سرير مزدوج + خزانة + كومودينو — على الزاوية */}
      <BedIcon x={0.5} y={0.45} w={1.5} h={2.1} />
      <rect x={2.15} y={0.5} width={0.4} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={2.55} y={0.45} width={0.5} height={1.9} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + مكتب */}
      <BedIcon x={3.6} y={0.45} w={1.3} h={1.95} />
      <rect x={3.95} y={3.55} width={1.2} height={0.42} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير + رف */}
      <BedIcon x={5.85} y={0.45} w={1.3} h={1.9} />
      <rect x={7.2} y={0.45} width={0.38} height={1.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم رابعة: سرير مفرد + مكتب */}
      <BedIcon x={8.05} y={0.45} w={1.1} h={1.8} />
      <rect x={8.1} y={2.45} width={1.0} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* بهو المدخل: كونسول + أحذية */}
      <rect x={5.8} y={3.42} width={1.3} height={0.32} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={9.0} y={3.42} width={0.6} height={0.28} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* ممر التوزيع: خزائن مدمجة */}
      <rect x={0.35} y={4.95} width={1.8} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={2.4} y={4.95} width={1.8} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المعيشة: أريكة غربية + طاولة قهوة + تلفاز + طاولة طعام */}
      <rect x={0.4} y={6.2} width={0.62} height={2.2} rx={0.1} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={1.35} y={6.95} width={0.85} height={0.85} rx={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={4.28} y={6.9} width={0.12} height={1.4} fill="#1c1917" />
      <rect x={2.3} y={5.95} width={1.5} height={0.78} rx={0.08} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.6} cy={5.87} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.45} cy={5.87} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.6} cy={6.8} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.45} cy={6.8} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      {/* المطبخ: كاونتر شمالي + ثلاجة عند اللب */}
      <rect x={4.72} y={7.7} width={2.5} height={0.44} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={5.15} cy={7.92} r={0.12} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={5.55} cy={7.92} r={0.09} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={7.32} y={7.7} width={0.5} height={0.9} rx={0.06} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الرئيسي: دش + مرحاض + مغسلة */}
      <rect x={4.7} y={5.64} width={0.85} height={0.85} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <line x1={4.7} y1={5.64} x2={5.55} y2={6.49} stroke="#5eead4" strokeWidth={0.04} />
      <ellipse cx={5.75} cy={7.05} rx={0.13} ry={0.17} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={4.95} cy={7.15} r={0.1} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* الحمّام الثانوي (0.80 × 1.25 = 1.00 م²): مرحاض + مغسلة زاوية */}
      <ellipse cx={6.62} cy={5.88} rx={0.12} ry={0.16} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={6.62} cy={6.5} r={0.08} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* خزائن المنزل: أرفف */}
      <line x1={7.2} y1={5.9} x2={7.7} y2={5.9} stroke="#a8a29e" strokeWidth={0.04} />
      <line x1={7.2} y1={6.5} x2={7.7} y2={6.5} stroke="#a8a29e" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={8.3} y={4.5} r={0.55} rot={-90} />
      <Door x={1.3} y={4.32} r={0.55} rot={-90} />
      <Door x={4.3} y={4.32} r={0.5} rot={-90} />
      <Door x={6.1} y={3.26} r={0.5} rot={-90} />
      <Door x={8.3} y={3.26} r={0.5} rot={-90} />
      <Door x={3.6} y={5.56} r={0.55} rot={90} />
      <Door x={5.1} y={5.56} r={0.45} rot={90} />
      <Door x={6.5} y={5.56} r={0.4} rot={90} />
      <Door x={7.4} y={5.56} r={0.35} rot={90} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={2.25} y={0.02} w={0.7} h={0.14} />
      <WindowSeg x={3.7} y={0.02} w={1.3} h={0.14} />
      <WindowSeg x={5.9} y={0.02} w={1.3} h={0.14} />
      <WindowSeg x={8.15} y={0.02} w={1.25} h={0.14} />
      <WindowSeg x={0.02} y={6.0} w={0.14} h={2.4} />

      {/* ===== العناوين والمساحات (من المصدر الوحيد) ===== */}
      <PlanLabel x={1.675} y={2.95} size={0.22} weight={800} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={1.675} y={3.25} size={0.17} weight={600} fill="#a8a29e">{roomArea(NORTH_UNIT.layout[0]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={4.36} y={2.95} size={0.2} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={4.36} y={3.23} size={0.16} weight={600} fill="#a8a29e">{roomArea(NORTH_UNIT.layout[1]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.6} y={2.6} size={0.17} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={6.6} y={2.86} size={0.14} weight={600} fill="#a8a29e">{roomArea(NORTH_UNIT.layout[2]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={8.8} y={2.6} size={0.16} weight={700} fill="#57534e">نوم رابعة</PlanLabel>
      <PlanLabel x={8.8} y={2.86} size={0.14} weight={600} fill="#a8a29e">{roomArea(NORTH_UNIT.layout[3]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={7.05} y={3.95} size={0.14} weight={700} fill="#78716c">بهو المدخل</PlanLabel>
      <PlanLabel x={2.9} y={5.22} size={0.15} weight={700} fill="#78716c">ممر التوزيع {roomArea(NORTH_UNIT.layout[10]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={2.34} y={7.5} size={0.2} weight={800} fill="#047857">المعيشة والطعام</PlanLabel>
      <PlanLabel x={2.34} y={7.78} size={0.16} weight={600} fill="#059669">{roomArea(NORTH_UNIT.layout[4]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.1} y={8.35} size={0.16} weight={700} fill="#b45309">مطبخ مفتوح</PlanLabel>
      <PlanLabel x={6.1} y={8.6} size={0.14} weight={600} fill="#d97706">{roomArea(NORTH_UNIT.layout[5]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.36} y={6.55} size={0.12} weight={700} fill="#0f766e">حمّام رئيسي</PlanLabel>
      <PlanLabel x={6.62} y={6.05} size={0.12} weight={800} fill="#0d9488">1.00 م²</PlanLabel>
      <PlanLabel x={6.62} y={6.22} size={0.1} weight={600} fill="#14b8a6">0.80 × 1.25</PlanLabel>
      <PlanLabel x={7.45} y={6.85} size={0.1} weight={700} fill="#78716c" rotate={-90}>خزائن</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={10} y={-1.9} label="10.00 م" />
      <DimV y1={0} y2={9.1} x={-1.85} label="9.10 م" />
      <DimV y1={0} y2={4.5} x={10.7} label="4.50 م" />
      <Compass x={11.6} y={-1.1} r={0.7} />
      <PlanLabel x={5} y={10.15} size={0.38} weight={700} fill="#78716c">
        {`الشقة الشمالية 81.34 م² (${net} م² صافي) + شرفة ركنية كابولية`}
      </PlanLabel>
      <PlanLabel x={5} y={10.62} size={0.26} weight={600} fill="#a8a29e">
        5 غرف رئيسية + مطبخ مفتوح + حمّامان + بهو وممر — الصالة على الغرب والنوم الرئيسية على الزاوية
      </PlanLabel>
    </svg>
  );
}

/* ================== مخطط الشقة الجنوبية (إحداثيات الطابق 20 × 5.9 + شرفة) ================== */
export function SouthUnitPlan() {
  const net = unitNet(SOUTH_UNIT).toFixed(2);
  return (
    <svg
      viewBox="-3.0 7.7 25.9 10.7"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط الشقة الجنوبية بمساحة 118 متر مربع و5 غرف رئيسية وحمّام ثانوي 1.00 م² وشرفة ركنية"
    >
      {/* الجدران كخلفية داكنة */}
      <rect x={0} y={9.1} width={20} height={5.9} fill="#44403c" />

      {/* الشرفة الركنية الكابولية على الزاوية الجنوبية الغربية — خارج البصمة */}
      <rect x={0} y={15} width={3.2} height={1.3} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <rect x={-1.3} y={13.1} width={1.3} height={1.9} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <g stroke="#b45309" strokeWidth={0.07}>
        <line x1={0} y1={16.3} x2={3.2} y2={16.3} />
        <line x1={3.2} y1={16.3} x2={3.2} y2={15} />
        <line x1={-1.3} y1={13.1} x2={-1.3} y2={15} />
        <line x1={-1.3} y1={15} x2={0} y2={15} />
      </g>
      <circle cx={0.45} cy={15.65} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <circle cx={2.9} cy={15.8} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <PlanLabel x={2.5} y={15.85} size={0.18} weight={700} fill="#b45309">
        شرفة ركنية كابولية
      </PlanLabel>
      <PlanLabel x={2.5} y={16.13} size={0.15} weight={600} fill="#d97706">
        6.63 م² — خارج البصمة
      </PlanLabel>

      {/* اللب شمال الشقة */}
      <rect x={7.9} y={7.95} width={4.2} height={1.15} fill="#d6d3d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={7.9 + i * 0.5}
          y2={9.1}
          x2={8.6 + i * 0.5}
          y1={7.95}
          stroke="#c7c2bd"
          strokeWidth={0.04}
        />
      ))}
      <PlanLabel x={10} y={8.7} size={0.18} weight={700} fill="#57534e">
        اللب الحركي — بهو التوزيع والدرج والمصعد
      </PlanLabel>

      {/* الفراغات — من المصدر الوحيد */}
      {SOUTH_UNIT.layout.map((room) =>
        room.parts.map((p, i) => (
          <rect
            key={`${room.name}-${i}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={room.color}
            stroke="#a8a29e"
            strokeWidth={0.03}
          />
        )),
      )}

      {/* ===== أثاث وتجهيزات ===== */}
      {/* المطبخ: كاونتر L غربي وشمالي + ثلاجة */}
      <rect x={0.28} y={9.4} width={0.45} height={1.65} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <rect x={0.28} y={9.4} width={2.2} height={0.45} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={0.5} cy={10.35} r={0.13} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={0.5} cy={10.75} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={3.6} y={9.4} width={0.55} height={0.62} rx={0.06} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* مخزن المؤن: أرفف */}
      <rect x={4.55} y={9.38} width={0.75} height={0.32} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={5.5} y={9.38} width={0.75} height={0.32} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المعيشة: أريكة غربية + طاولة + تلفاز + طاولة طعام */}
      <rect x={0.4} y={11.95} width={0.62} height={2.2} rx={0.1} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={1.4} y={12.7} width={0.85} height={0.85} rx={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={4.86} y={12.4} width={0.12} height={1.5} fill="#1c1917" />
      <rect x={2.5} y={11.55} width={1.6} height={0.8} rx={0.08} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.85} cy={11.47} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.75} cy={11.47} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.85} cy={12.43} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.75} cy={12.43} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      {/* بهو المدخل وممر التوزيع: خزائن مدمجة */}
      <rect x={9.5} y={9.76} width={2.4} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={12.1} y={9.76} width={2.2} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={15.6} y={9.76} width={2.4} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* النوم الرئيسية: سرير + خزانة */}
      <BedIcon x={5.6} y={10.7} w={1.5} h={2.1} />
      <rect x={7.95} y={10.65} width={0.5} height={2.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + خزانة */}
      <BedIcon x={9.1} y={10.7} w={1.5} h={2.1} />
      <rect x={11.45} y={10.65} width={0.5} height={2.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الرئيسي: دش + مرحاض */}
      <rect x={12.35} y={10.5} width={0.8} height={0.8} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <line x1={12.35} y1={10.5} x2={13.15} y2={11.3} stroke="#5eead4" strokeWidth={0.04} />
      <ellipse cx={13.4} cy={12.0} rx={0.13} ry={0.17} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* الحمّام الثانوي (0.80 × 1.25 = 1.00 م²) */}
      <ellipse cx={14.28} cy={10.72} rx={0.12} ry={0.16} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={14.28} cy={11.35} r={0.08} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* مخزن الغسيل: غسالتان + أرفف */}
      <rect x={12.45} y={12.72} width={0.55} height={0.55} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={12.72} cy={13.0} r={0.17} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.035} />
      <rect x={13.15} y={12.72} width={0.55} height={0.55} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={13.42} cy={13.0} r={0.17} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.035} />
      <rect x={12.45} y={13.7} width={1.9} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير + خزانة */}
      <BedIcon x={15.1} y={10.7} w={1.4} h={2.0} />
      <rect x={16.75} y={10.65} width={0.45} height={1.8} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم رابعة: سرير + مكتب */}
      <BedIcon x={17.8} y={10.7} w={1.15} h={1.9} />
      <rect x={17.8} y={13.95} width={1.3} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={8.3} y={9.28} r={0.55} rot={90} />
      <Door x={6.7} y={10.4} r={0.55} rot={90} />
      <Door x={9.0} y={10.4} r={0.55} rot={90} />
      <Door x={15.2} y={10.4} r={0.5} rot={90} />
      <Door x={17.7} y={10.4} r={0.5} rot={90} />
      <Door x={12.5} y={10.4} r={0.45} rot={90} />
      <Door x={14.0} y={10.4} r={0.4} rot={90} />
      <Door x={14.68} y={13.3} r={0.45} rot={180} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={0.02} y={9.55} w={0.14} h={1.35} />
      <WindowSeg x={0.02} y={11.85} w={0.14} h={2.6} />
      <WindowSeg x={6.1} y={14.93} w={1.7} h={0.14} />
      <WindowSeg x={9.55} y={14.93} w={1.7} h={0.14} />
      <WindowSeg x={15.35} y={14.93} w={1.5} h={0.14} />
      <WindowSeg x={17.9} y={14.93} w={1.5} h={0.14} />
      <WindowSeg x={19.84} y={11.0} w={0.14} h={2.5} />

      {/* ===== العناوين والمساحات (من المصدر الوحيد) ===== */}
      <PlanLabel x={2.24} y={10.2} size={0.17} weight={800} fill="#b45309">مطبخ</PlanLabel>
      <PlanLabel x={2.24} y={10.45} size={0.14} weight={600} fill="#d97706">{roomArea(SOUTH_UNIT.layout[1]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.46} y={9.95} size={0.11} weight={700} fill="#a16207">مخزن مؤن</PlanLabel>
      <PlanLabel x={2.64} y={13.35} size={0.19} weight={800} fill="#047857">المعيشة والطعام</PlanLabel>
      <PlanLabel x={2.64} y={13.62} size={0.15} weight={600} fill="#059669">{roomArea(SOUTH_UNIT.layout[0]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={16.55} y={9.98} size={0.13} weight={700} fill="#78716c">بهو المدخل وممر التوزيع {roomArea(SOUTH_UNIT.layout[10]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.92} y={13.1} size={0.17} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={6.92} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(SOUTH_UNIT.layout[3]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={10.44} y={13.1} size={0.17} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={10.44} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(SOUTH_UNIT.layout[4]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={13.01} y={11.5} size={0.11} weight={700} fill="#0f766e">حمّام رئيسي</PlanLabel>
      <PlanLabel x={14.28} y={10.95} size={0.1} weight={800} fill="#0d9488">1.00 م²</PlanLabel>
      <PlanLabel x={13.47} y={14.45} size={0.12} weight={700} fill="#a16207">غسيل ومخزن {roomArea(SOUTH_UNIT.layout[9]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={16.1} y={13.1} size={0.16} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={16.1} y={13.36} size={0.13} weight={600} fill="#a8a29e">{roomArea(SOUTH_UNIT.layout[5]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={18.67} y={13.1} size={0.15} weight={700} fill="#57534e">نوم رابعة</PlanLabel>
      <PlanLabel x={18.67} y={13.36} size={0.12} weight={600} fill="#a8a29e">{roomArea(SOUTH_UNIT.layout[6]).toFixed(2)} م²</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={20} y={7.1} label="20.00 م" />
      <DimV y1={9.1} y2={15} x={-1.85} label="5.90 م" />
      <Compass x={21.6} y={8.5} r={0.7} />
      <PlanLabel x={10} y={17.4} size={0.38} weight={700} fill="#78716c">
        {`الشقة الجنوبية الكبرى 118.00 م² (${net} م² صافي) + شرفة ركنية كابولية`}
      </PlanLabel>
      <PlanLabel x={10} y={17.87} size={0.26} weight={600} fill="#a8a29e">
        5 غرف رئيسية على الجنوب + مطبخ بنافذة مفتوح على المعيشة + حمّامان + بهو وممر بخزائن مدمجة
      </PlanLabel>
    </svg>
  );
}

/* ================== جدول فراغات الشقة — مشتق من المستطيلات نفسها ================== */
const TYPE_COLORS: Record<string, string> = {
  معيشة: "bg-emerald-100 text-emerald-800",
  توزيع: "bg-stone-200 text-stone-700",
  خدمي: "bg-amber-100 text-amber-800",
  نوم: "bg-stone-100 text-stone-700 border border-stone-200",
  صحي: "bg-teal-100 text-teal-800",
};

export function UnitRoomsTable({ unit }: { unit: UnitDef }) {
  const rooms = unitRooms(unit);
  const net = unitNet(unit);
  const walls = unitWalls(unit);
  const isNorth = unit.key === "north";
  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-stone-50 hover:bg-stone-50">
            <TableHead className="text-right font-bold text-stone-600">الفضاء</TableHead>
            <TableHead className="text-right font-bold text-stone-600">النوع</TableHead>
            <TableHead className="text-left font-bold text-stone-600">المساحة (م²)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((r) => (
            <TableRow key={r.name} className={r.area === 1 ? "bg-teal-50/60" : undefined}>
              <TableCell className="font-semibold text-stone-800 py-2.5">{r.name}</TableCell>
              <TableCell>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${TYPE_COLORS[r.type] ?? "bg-stone-100 text-stone-600"}`}>
                  {r.type}
                </span>
              </TableCell>
              <TableCell className="text-left font-bold text-stone-800 tabular-nums">
                {r.area.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-stone-100 hover:bg-stone-100">
            <TableCell className="font-bold text-stone-700" colSpan={2}>
              صافي الفراغات
            </TableCell>
            <TableCell className="text-left font-extrabold text-stone-800 tabular-nums">
              {net.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="bg-stone-100 hover:bg-stone-100">
            <TableCell className="font-bold text-stone-700" colSpan={2}>
              الجدران والحصص الإنشائية
            </TableCell>
            <TableCell className="text-left font-extrabold text-stone-800 tabular-nums">
              {walls.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="bg-emerald-800 hover:bg-emerald-800">
            <TableCell className="font-extrabold text-white" colSpan={2}>
              إجمالي حصة الشقة من البلاطة
            </TableCell>
            <TableCell className="text-left font-extrabold text-white tabular-nums text-base">
              {unit.gross.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="text-xs leading-6 text-stone-500 bg-stone-50 border-t border-stone-200 px-4 py-3">
        {isNorth ? (
          <>
            التحقق: شقتان شماليتان × 81.34 م² = <strong className="text-emerald-700">162.68 م²</strong> — ولكل شقة
            شقة شمالية <strong className="text-amber-700">شرفة ركنية 6.63 م²</strong> على الزاوية الشمالية (من النوم
            الرئيسية) كابولية خارج البصمة.
          </>
        ) : (
          <>
            التحقق: <strong className="text-emerald-700">2 × 81.34 + 118.00 + 19.32 (اللب) = 300.00 م²</strong> بالضبط
            لكل طابق سكني — ولكل شقة جنوبية <strong className="text-amber-700">شرفة ركنية 6.63 م²</strong> على الزاوية
            الجنوبية الغربية (من المعيشة) كابولية خارج البصمة.
          </>
        )}
      </p>
    </div>
  );
}
