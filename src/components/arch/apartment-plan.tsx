// مخططا الشقتين النموذجيتين — تُرسلان من NORTH_UNIT / SOUTH_UNIT في arch-data.ts (مصدر وحيد)
// الشقة الشمالية 79.50 م² (صافي 68.00) — 5 غرف رئيسية + مطبخ مفتوح + حمّامان + شرفة من المعيشة
// الشقة الجنوبية 118.00 م² (صافي 99.24) — كامل العرض بـ5 غرف رئيسية + مطبخ بنافذة + حمّامان مجمّعان
// الممرات تنتهي عند آخر باب تخدمه — حاجز كتم المدخل ورافعات صحية موحدة رأسياً
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

const roomOf = (u: UnitDef, name: string) => u.layout.find((r) => r.name === name)!;

/* ================== مخطط الشقة الشمالية (إحداثيات محلية 10 × 9.1 + شرفة) ================== */
export function NorthUnitPlan() {
  const net = unitNet(NORTH_UNIT).toFixed(2);
  const living = roomOf(NORTH_UNIT, "المعيشة والطعام");
  const kitchen = roomOf(NORTH_UNIT, "المطبخ");
  const b1 = roomOf(NORTH_UNIT, "غرفة النوم الرئيسية");
  const b2 = roomOf(NORTH_UNIT, "غرفة النوم الثانية");
  const b3 = roomOf(NORTH_UNIT, "غرفة النوم الثالثة (أطفال)");
  const b4 = roomOf(NORTH_UNIT, "غرفة النوم الرابعة (أطفال/مكتب)");
  const corridor = roomOf(NORTH_UNIT, "ممر التوزيع");
  return (
    <svg
      viewBox="-3.0 -2.7 15.6 13.5"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط الشقة الشمالية بمساحة 79.50 متر مربع و5 غرف رئيسية وحمّام ثانوي 1.00 م² وشرفة من المعيشة"
    >
      {/* الجدران كخلفية داكنة (بصمة L) */}
      <rect x={0} y={0} width={10} height={4.5} fill="#44403c" />
      <rect x={0} y={4.5} width={7.5} height={4.6} fill="#44403c" />

      {/* شرفة المعيشة الكابولية على الواجهة الغربية — قطعة واحدة خارج البصمة */}
      <rect x={-1.3} y={5.62} width={1.3} height={3.3} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <g stroke="#b45309" strokeWidth={0.07}>
        <line x1={-1.3} y1={5.62} x2={-1.3} y2={8.92} />
        <line x1={-1.3} y1={5.62} x2={0} y2={5.62} />
        <line x1={-1.3} y1={8.92} x2={0} y2={8.92} />
      </g>
      <circle cx={-0.65} cy={5.95} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <circle cx={-0.65} cy={8.55} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <PlanLabel x={-0.65} y={6.9} size={0.18} weight={700} fill="#b45309" rotate={-90}>
        شرفة المعيشة
      </PlanLabel>
      <PlanLabel x={-0.65} y={7.25} size={0.15} weight={600} fill="#d97706" rotate={-90}>
        4.29 م² — خارج البصمة
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

      {/* حاجز كتم المدخل */}
      <rect x={8.85} y={3.26} width={0.12} height={1.19} fill="#44403c" />

      {/* منطقة اللب المقتطعة (7.50–10.00 × 4.50–9.10) */}
      <rect x={7.5} y={4.5} width={2.5} height={4.6} fill="#d6d3d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={7.5 + i * 0.5}
          y1={9.1}
          x2={8.2 + i * 0.5}
          y2={4.5}
          stroke="#c7c2bd"
          strokeWidth={0.045}
        />
      ))}
      <PlanLabel x={8.75} y={6.4} size={0.2} weight={700} fill="#57534e">
        اللب الحركي
      </PlanLabel>
      <PlanLabel x={8.75} y={6.75} size={0.16} weight={600} fill="#78716c">
        بهو التوزيع
      </PlanLabel>

      {/* ===== أثاث وتجهيزات ===== */}
      {/* النوم الرئيسية: سرير مزدوج + خزانة + كومودينو — على الزاوية */}
      <BedIcon x={0.45} y={0.45} w={1.5} h={2.05} />
      <rect x={2.6} y={0.45} width={0.45} height={1.85} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={2.02} y={0.5} width={0.4} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + مكتب */}
      <BedIcon x={3.6} y={0.45} w={1.3} h={1.95} />
      <rect x={3.45} y={3.7} width={1.1} height={0.42} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير + رف */}
      <BedIcon x={5.85} y={0.45} w={1.2} h={1.85} />
      <rect x={7.25} y={0.45} width={0.35} height={1.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم رابعة: سرير مفرد + مكتب */}
      <BedIcon x={8.05} y={0.45} w={1.05} h={1.8} />
      <rect x={7.85} y={2.5} width={1.0} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* بهو المدخل: كونسول استقبال */}
      <rect x={5.75} y={4.02} width={1.15} height={0.28} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* ممر التوزيع: نيش أحذية بين بابي النوم */}
      <rect x={3.15} y={4.55} width={1.0} height={0.32} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المعيشة: أريكة غربية + طاولة قهوة + تلفاز + طاولة طعام */}
      <rect x={0.28} y={4.75} width={0.62} height={1.45} rx={0.1} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={1.0} y={6.85} width={0.7} height={0.7} rx={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={4.2} y={6.8} width={0.12} height={1.4} fill="#1c1917" />
      <rect x={2.3} y={7.85} width={1.5} height={0.78} rx={0.08} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.6} cy={7.77} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.45} cy={7.77} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.6} cy={8.7} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.45} cy={8.7} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      {/* المطبخ: كاونتر جنوبي + ثلاجة عند اللب */}
      <rect x={4.6} y={8.45} width={2.2} height={0.4} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={5.1} cy={8.65} r={0.12} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={5.5} cy={8.65} r={0.09} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={6.92} y={7.5} width={0.46} height={0.9} rx={0.06} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الرئيسي: دش + مرحاض + مغسلة */}
      <rect x={4.56} y={6.3} width={0.85} height={0.95} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <line x1={4.56} y1={6.3} x2={5.41} y2={7.25} stroke="#5eead4" strokeWidth={0.04} />
      <ellipse cx={5.65} cy={6.0} rx={0.13} ry={0.17} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={4.95} cy={6.05} r={0.1} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* الحمّام الثانوي (0.80 × 1.25 = 1.00 م²): مرحاض + مغسلة */}
      <ellipse cx={6.5} cy={5.95} rx={0.12} ry={0.16} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={6.5} cy={6.5} r={0.08} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* رافعة الخدمات */}
      <rect x={7.02} y={5.62} width={0.36} height={0.98} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.04} />
      <PlanLabel x={7.2} y={6.25} size={0.1} weight={700} fill="#a16207" rotate={-90}>رافعة</PlanLabel>

      {/* ===== الأبواب ===== */}
      <Door x={7.9} y={4.5} r={0.8} rot={-90} />
      <Door x={2.2} y={4.38} r={0.5} rot={-90} />
      <Door x={4.3} y={4.38} r={0.5} rot={-90} />
      <Door x={5.7} y={3.26} r={0.5} rot={-90} />
      <Door x={9.05} y={3.26} r={0.5} rot={-90} />
      <Door x={2.0} y={5.5} r={0.7} rot={90} />
      <Door x={3.6} y={5.5} r={0.7} rot={90} flip />
      <Door x={5.2} y={5.5} r={0.5} rot={90} />
      <Door x={6.15} y={5.5} r={0.4} rot={-90} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={0.7} y={0.02} w={2.2} h={0.14} />
      <WindowSeg x={3.7} y={0.02} w={1.3} h={0.14} />
      <WindowSeg x={5.9} y={0.02} w={1.4} h={0.14} />
      <WindowSeg x={8.15} y={0.02} w={1.3} h={0.14} />
      <WindowSeg x={0.02} y={0.6} w={0.14} h={3.3} />
      <WindowSeg x={0.02} y={4.7} w={0.14} h={0.8} />
      <WindowSeg x={0.02} y={7.9} w={0.14} h={0.8} />

      {/* ===== العناوين والمساحات (من المصدر الوحيد) ===== */}
      <PlanLabel x={1.675} y={2.95} size={0.22} weight={800} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={1.675} y={3.23} size={0.17} weight={600} fill="#a8a29e">{roomArea(b1).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={4.36} y={2.95} size={0.2} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={4.36} y={3.23} size={0.16} weight={600} fill="#a8a29e">{roomArea(b2).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.6} y={2.6} size={0.17} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={6.6} y={2.86} size={0.14} weight={600} fill="#a8a29e">{roomArea(b3).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={8.8} y={2.6} size={0.16} weight={700} fill="#57534e">نوم رابعة</PlanLabel>
      <PlanLabel x={8.8} y={2.86} size={0.14} weight={600} fill="#a8a29e">{roomArea(b4).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={7.0} y={3.95} size={0.14} weight={700} fill="#78716c">بهو المدخل</PlanLabel>
      <PlanLabel x={4.5} y={5.35} size={0.15} weight={700} fill="#78716c">ممر التوزيع {roomArea(corridor).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={2.35} y={5.9} size={0.2} weight={800} fill="#047857">المعيشة والطعام</PlanLabel>
      <PlanLabel x={2.35} y={6.18} size={0.16} weight={600} fill="#059669">{roomArea(living).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.94} y={8.25} size={0.16} weight={700} fill="#b45309">مطبخ مفتوح</PlanLabel>
      <PlanLabel x={5.94} y={8.5} size={0.14} weight={600} fill="#d97706">{roomArea(kitchen).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.24} y={6.45} size={0.12} weight={700} fill="#0f766e">حمّام رئيسي</PlanLabel>
      <PlanLabel x={6.5} y={6.05} size={0.12} weight={800} fill="#0d9488">1.00 م²</PlanLabel>
      <PlanLabel x={6.5} y={6.22} size={0.1} weight={600} fill="#14b8a6">0.80 × 1.25</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={10} y={-1.9} label="10.00 م" />
      <DimV y1={0} y2={9.1} x={-1.85} label="9.10 م" />
      <DimV y1={0} y2={4.5} x={10.7} label="4.50 م" />
      <Compass x={11.6} y={-1.1} r={0.7} />
      <PlanLabel x={5} y={10.15} size={0.38} weight={700} fill="#78716c">
        {`الشقة الشمالية 79.50 م² (${net} م² صافي) + شرفة معيشة كابولية 4.29 م²`}
      </PlanLabel>
      <PlanLabel x={5} y={10.62} size={0.25} weight={600} fill="#a8a29e">
        5 غرف رئيسية + مطبخ مفتوح + حمّامان + بهو وممر — الصالة على الغرب والنوم الرئيسية على الزاوية — حاجز كتم المدخل موثق
      </PlanLabel>
    </svg>
  );
}

/* ================== مخطط الشقة الجنوبية (إحداثيات الطابق 20 × 5.9 + شرفة) ================== */
export function SouthUnitPlan() {
  const net = unitNet(SOUTH_UNIT).toFixed(2);
  const living = roomOf(SOUTH_UNIT, "المعيشة والطعام");
  const kitchen = roomOf(SOUTH_UNIT, "المطبخ");
  const hall = roomOf(SOUTH_UNIT, "بهو المدخل وممر التوزيع");
  const b1 = roomOf(SOUTH_UNIT, "غرفة النوم الأولى");
  const b2 = roomOf(SOUTH_UNIT, "غرفة النوم الثانية");
  const b3 = roomOf(SOUTH_UNIT, "غرفة النوم الثالثة");
  const master = roomOf(SOUTH_UNIT, "غرفة النوم الرئيسية");
  const laundry = roomOf(SOUTH_UNIT, "الغسيل والمجفف");
  return (
    <svg
      viewBox="-3.0 7.7 25.9 10.7"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط الشقة الجنوبية بمساحة 118 متر مربع و5 غرف رئيسية وحمّام ثانوي 1.00 م² وشرفة L متصلة حول الزاوية"
    >
      {/* الجدران كخلفية داكنة */}
      <rect x={0} y={9.1} width={20} height={5.9} fill="#44403c" />

      {/* شرفة L متصلة تلتف حول الزاوية الجنوبية الغربية — خارج البصمة (شاملة مربع الزاوية) */}
      <rect x={0} y={15} width={3.2} height={1.3} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <rect x={-1.3} y={14.4} width={1.3} height={1.9} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <g stroke="#b45309" strokeWidth={0.07}>
        <line x1={0} y1={16.3} x2={3.2} y2={16.3} />
        <line x1={3.2} y1={16.3} x2={3.2} y2={15} />
        <line x1={-1.3} y1={14.4} x2={-1.3} y2={16.3} />
        <line x1={-1.3} y1={14.4} x2={0} y2={14.4} />
      </g>
      <circle cx={0.45} cy={15.65} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <circle cx={2.9} cy={15.8} r={0.15} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <PlanLabel x={1.7} y={15.88} size={0.18} weight={700} fill="#b45309">
        شرفة L متصلة حول الزاوية
      </PlanLabel>
      <PlanLabel x={1.7} y={16.16} size={0.15} weight={600} fill="#d97706">
        6.63 م² — خارج البصمة — قطعة واحدة بلا انقطاع
      </PlanLabel>

      {/* اللب شمال الشقة */}
      <rect x={7.5} y={7.95} width={5.0} height={1.15} fill="#d6d3d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={7.5 + i * 0.5}
          y2={9.1}
          x2={8.2 + i * 0.5}
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
      {/* المطبخ: كاونتر L غربي وجنوبي + ثلاجة + عمود الصرف */}
      <rect x={0.28} y={9.45} width={0.45} height={1.7} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <rect x={0.28} y={10.7} width={2.4} height={0.45} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={0.5} cy={10.35} r={0.13} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={0.5} cy={10.75} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={3.5} y={9.4} width={0.55} height={0.85} rx={0.06} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={4.0} y={9.28} width={0.3} height={0.3} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.035} />
      {/* مخزن المؤن: أرفف */}
      <rect x={4.5} y={9.35} width={1.3} height={0.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={4.5} y={9.85} width={1.3} height={0.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المعيشة: أريكة غربية + طاولة + تلفاز + طاولة طعام */}
      <rect x={0.28} y={12.0} width={0.62} height={2.2} rx={0.1} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={1.4} y={12.7} width={0.85} height={0.85} rx={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={6.78} y={12.6} width={0.12} height={1.5} fill="#1c1917" />
      <rect x={2.5} y={11.6} width={1.6} height={0.8} rx={0.08} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.85} cy={11.52} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.75} cy={11.52} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.85} cy={12.48} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={3.75} cy={12.48} r={0.11} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      {/* البهو: كونسولات بين الأبواب */}
      <rect x={6.1} y={10.05} width={1.2} height={0.28} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={11.5} y={10.05} width={1.4} height={0.28} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={16.0} y={10.05} width={1.2} height={0.28} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم أولى: سرير + خزانة */}
      <BedIcon x={7.35} y={12.6} w={1.5} h={2.0} />
      <rect x={9.0} y={10.7} width={0.4} height={2.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + خزانة */}
      <BedIcon x={9.9} y={12.6} w={1.5} h={2.0} />
      <rect x={11.5} y={10.7} width={0.4} height={2.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الثانوي (0.80 × 1.25 = 1.00 م²) */}
      <ellipse cx={12.46} cy={10.85} rx={0.12} ry={0.16} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={12.46} cy={11.5} r={0.08} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* الحمّام الرئيسي: دش + مرحاض + مغسلة */}
      <rect x={13.66} y={10.6} width={0.78} height={0.8} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <line x1={13.66} y1={10.6} x2={14.44} y2={11.4} stroke="#5eead4" strokeWidth={0.04} />
      <ellipse cx={13.2} cy={12.05} rx={0.13} ry={0.17} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={14.15} cy={11.35} r={0.1} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* رافعة الخدمات */}
      <rect x={12.06} y={11.89} width={0.8} height={1.5} fill="#fef9c3" stroke="#ca8a04" strokeWidth={0.04} />
      <PlanLabel x={12.46} y={12.75} size={0.11} weight={700} fill="#a16207" rotate={-90}>رافعة صحية</PlanLabel>
      {/* مخزن بطاطي */}
      <line x1={12.15} y1={13.75} x2={12.77} y2={13.75} stroke="#a8a29e" strokeWidth={0.04} />
      <line x1={12.15} y1={14.2} x2={12.77} y2={14.2} stroke="#a8a29e" strokeWidth={0.04} />
      {/* الغسيل: غسالتان + رف */}
      <rect x={13.05} y={12.75} width={0.55} height={0.55} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={13.32} cy={13.02} r={0.17} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.035} />
      <rect x={13.75} y={12.75} width={0.55} height={0.55} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={14.02} cy={13.02} r={0.17} fill="#e7e5e4" stroke="#a8a29e" strokeWidth={0.035} />
      <rect x={13.05} y={13.45} width={1.35} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير + خزانة */}
      <BedIcon x={15.0} y={12.6} w={1.4} h={2.0} />
      <rect x={16.55} y={10.7} width={0.4} height={2.0} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم رئيسية: سرير + خزانة */}
      <BedIcon x={17.6} y={12.4} w={1.6} h={2.1} />
      <rect x={17.17} y={11.3} width={0.5} height={1.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={19.25} y={12.55} width={0.4} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={8.4} y={9.1} r={0.8} rot={90} />
      <Door x={4.36} y={9.5} r={0.5} rot={180} />
      <Door x={5.9} y={9.5} r={0.5} rot={0} />
      <Door x={8.62} y={10.4} r={0.5} rot={90} />
      <Door x={10.3} y={10.4} r={0.5} rot={90} />
      <Door x={12.76} y={10.4} r={0.4} rot={-90} />
      <Door x={13.3} y={10.4} r={0.5} rot={90} />
      <Door x={15.4} y={10.4} r={0.5} rot={90} />
      <Door x={17.3} y={10.4} r={0.5} rot={90} />
      <Door x={13.3} y={12.64} r={0.45} rot={180} />
      <Door x={12.92} y={13.8} r={0.4} rot={180} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={0.02} y={9.55} w={0.14} h={1.5} />
      <WindowSeg x={0.02} y={11.7} w={0.14} h={2.6} />
      <WindowSeg x={2.7} y={14.93} w={2.0} h={0.14} />
      <WindowSeg x={5.2} y={14.93} w={1.4} h={0.14} />
      <WindowSeg x={7.5} y={14.93} w={1.4} h={0.14} />
      <WindowSeg x={10.0} y={14.93} w={1.4} h={0.14} />
      <WindowSeg x={15.1} y={14.93} w={1.4} h={0.14} />
      <WindowSeg x={17.6} y={14.93} w={1.4} h={0.14} />
      <WindowSeg x={19.84} y={11.2} w={0.14} h={2.6} />
      <WindowSeg x={13.3} y={14.93} w={0.8} h={0.14} />

      {/* ===== العناوين والمساحات (من المصدر الوحيد) ===== */}
      <PlanLabel x={2.2} y={10.35} size={0.17} weight={800} fill="#b45309">مطبخ</PlanLabel>
      <PlanLabel x={2.2} y={10.6} size={0.14} weight={600} fill="#d97706">{roomArea(kitchen).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.16} y={10.15} size={0.1} weight={700} fill="#a16207">مؤن</PlanLabel>
      <PlanLabel x={3.5} y={13.35} size={0.19} weight={800} fill="#047857">المعيشة والطعام</PlanLabel>
      <PlanLabel x={3.5} y={13.62} size={0.15} weight={600} fill="#059669">{roomArea(living).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={12.1} y={9.95} size={0.14} weight={700} fill="#78716c">بهو المدخل وممر التوزيع {roomArea(hall).toFixed(2)} م² — ينتهي عند آخر باب</PlanLabel>
      <PlanLabel x={6.46} y={11.02} size={0.1} weight={700} fill="#a8a29e">جيب المعيشة</PlanLabel>
      <PlanLabel x={8.22} y={13.1} size={0.17} weight={700} fill="#57534e">نوم أولى</PlanLabel>
      <PlanLabel x={8.22} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(b1).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={10.74} y={13.1} size={0.17} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={10.74} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(b2).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={15.8} y={13.1} size={0.17} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={15.8} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(b3).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={18.47} y={13.1} size={0.17} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={18.47} y={13.36} size={0.14} weight={600} fill="#a8a29e">{roomArea(master).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={13.73} y={14.05} size={0.11} weight={700} fill="#a16207">غسيل {roomArea(laundry).toFixed(2)} م²</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={20} y={7.1} label="20.00 م" />
      <DimV y1={9.1} y2={15} x={-1.85} label="5.90 م" />
      <Compass x={21.6} y={8.5} r={0.7} />
      <PlanLabel x={10} y={17.4} size={0.38} weight={700} fill="#78716c">
        {`الشقة الجنوبية الكبرى 118.00 م² (${net} م² صافي) + شرفة L متصلة 6.63 م²`}
      </PlanLabel>
      <PlanLabel x={10} y={17.87} size={0.25} weight={600} fill="#a8a29e">
        5 غرف رئيسية على الجنوب + مطبخ بنافذة + حمّامان مجمّعان على رافعة واحدة — الممر ينتهي عند باب النوم الرئيسية
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
            التحقق: شقتان شماليتان × 79.50 م² = <strong className="text-emerald-700">159.00 م²</strong> — ولكل شقة
            شمالية <strong className="text-amber-700">شرفة معيشة 4.29 م²</strong> على الواجهة الجانبية (غربية أو
            شرقية) من المعيشة مباشرة، كابولية خارج البصمة.
          </>
        ) : (
          <>
            التحقق: <strong className="text-emerald-700">2 × 79.50 + 118.00 + 23.00 (اللب) = 300.00 م²</strong> بالضبط
            لكل طابق سكني — ولكل شقة جنوبية <strong className="text-amber-700">شرفة L متصلة 6.63 م²</strong> تلتف حول
            الزاوية الجنوبية الغربية من المعيشة، كابولية خارج البصمة وقطعة واحدة بلا انقطاع.
          </>
        )}
      </p>
    </div>
  );
}
