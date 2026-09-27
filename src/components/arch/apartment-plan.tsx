// مخطط الشقة النموذجية — 10.0 × 7.5 م (بصمة 68.70 م² = 59.54 صافي + 9.16 جدران)
// 5 غرف رئيسية (صالة + 4 نوم) + مطبخ منفصل + حمّام رئيسي + حمّام ثانوي 1.00 م² + بهو + ممر
// الغرف تُرسم من APARTMENT_LAYOUT في arch-data.ts — الرسم والجدول من مصدر واحد
import { BedIcon, Compass, DimH, DimV, Door, PlanLabel, WindowSeg } from "./primitives";
import {
  APARTMENT_GROSS,
  APARTMENT_LAYOUT,
  APARTMENT_NET,
  APARTMENT_ROOMS,
  APARTMENT_WALLS,
  roomArea,
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

export function ApartmentPlanSVG() {
  const net = APARTMENT_NET.toFixed(2);
  return (
    <svg
      viewBox="-2.7 -3.0 15.1 13.15"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط شقة نموذجية بمساحة إجمالية 68.70 متر مربع و5 غرف رئيسية وشرفة ركنية كابولية"
    >
      {/* الجدران كخلفية داكنة */}
      <rect x={0} y={0} width={10} height={7.5} fill="#44403c" />

      {/* الشرفة الركنية الكابولية — خارج البصمة 68.70 م² غير محتسبة في نسبة البناء */}
      <rect x={0} y={-1.3} width={3.2} height={1.3} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <rect x={-1.3} y={0} width={1.3} height={1.9} fill="#fef3c7" stroke="#d97706" strokeWidth={0.04} strokeDasharray="0.16 0.1" />
      <g stroke="#b45309" strokeWidth={0.07}>
        <line x1={0} y1={-1.3} x2={3.2} y2={-1.3} />
        <line x1={3.2} y1={-1.3} x2={3.2} y2={0} />
        <line x1={-1.3} y1={0} x2={-1.3} y2={1.9} />
        <line x1={-1.3} y1={1.9} x2={0} y2={1.9} />
      </g>
      <circle cx={0.45} cy={-0.78} r={0.16} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <circle cx={2.9} cy={-0.9} r={0.16} fill="#bbf7d0" stroke="#16a34a" strokeWidth={0.03} />
      <PlanLabel x={2.5} y={-0.38} size={0.19} weight={700} fill="#b45309">
        شرفة ركنية كابولية
      </PlanLabel>
      <PlanLabel x={2.5} y={-0.66} size={0.17} weight={600} fill="#d97706">
        6.63 م² — خارج البصمة
      </PlanLabel>

      {/* الغرف — من المصدر الوحيد APARTMENT_LAYOUT */}
      {APARTMENT_LAYOUT.map((room) =>
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

      {/* منطقة اللب المقتطعة (7.90–10.00 × 4.50–7.50) */}
      <rect x={7.9} y={4.5} width={2.1} height={3.0} fill="#d6d3d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={7.9 + i * 0.5}
          y1={7.5}
          x2={8.6 + i * 0.5}
          y2={4.5}
          stroke="#c7c2bd"
          strokeWidth={0.045}
        />
      ))}
      <PlanLabel x={8.95} y={5.75} size={0.24} weight={700} fill="#57534e">
        اللب الحركي
      </PlanLabel>
      <PlanLabel x={8.95} y={6.15} size={0.2} weight={600} fill="#78716c">
        بهو التوزيع
      </PlanLabel>

      {/* ===== أثاث وتجهيزات ===== */}
      {/* المعيشة (ركن الواجهتين): أريكة غربية + طاولة قهوة + تلفاز */}
      <rect x={0.3} y={0.55} width={0.65} height={2.2} rx={0.1} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={1.25} y={1.15} width={0.85} height={0.85} rx={0.1} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={3.03} y={0.9} width={0.12} height={1.4} fill="#1c1917" />
      {/* جناح الطعام: طاولة طعام + 4 كراسٍ */}
      <rect x={1.35} y={3.55} width={1.5} height={0.78} rx={0.08} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={1.7} cy={3.47} r={0.13} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.5} cy={3.47} r={0.13} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={1.7} cy={4.42} r={0.13} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      <circle cx={2.5} cy={4.42} r={0.13} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.035} />
      {/* النوم الرئيسية (الواجهة الجانبية): سرير مزدوج + خزانة + تسريحة */}
      <BedIcon x={0.45} y={4.72} w={1.55} h={1.95} />
      <rect x={3.25} y={4.7} width={0.6} height={2.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={2.25} y={6.85} width={0.85} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + مكتب */}
      <BedIcon x={3.5} y={0.45} w={1.35} h={1.85} />
      <rect x={3.42} y={2.5} width={1.1} height={0.42} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير */}
      <BedIcon x={5.8} y={0.45} w={1.3} h={1.85} />
      <rect x={7.0} y={0.45} width={0.5} height={1.6} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم رابعة: سرير مفرد + رف */}
      <BedIcon x={8.05} y={0.45} w={1.1} h={1.8} />
      <rect x={9.3} y={0.45} width={0.42} height={1.5} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المطبخ: كاونتر L + مغسلة + بوتاجاز + ثلاجة */}
      <rect x={4.2} y={4.62} width={0.44} height={2.55} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <rect x={4.2} y={4.62} width={1.62} height={0.44} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={4.42} cy={5.4} r={0.13} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={4.42} cy={5.9} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={4.42} cy={6.2} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={5.35} y={6.55} width={0.58} height={0.62} rx={0.08} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الرئيسي: دش + مرحاض */}
      <rect x={7.98} y={3.4} width={0.85} height={0.85} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <line x1={7.98} y1={3.4} x2={8.83} y2={4.25} stroke="#5eead4" strokeWidth={0.04} />
      <ellipse cx={9.35} cy={3.75} rx={0.14} ry={0.19} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* الحمّام الثانوي (0.80 × 1.25 م = 1.00 م²): مرحاض + مغسلة زاوية */}
      <ellipse cx={7.32} cy={5.16} rx={0.13} ry={0.18} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={7.32} cy={5.5} r={0.09} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* بهو المدخل: كونسول وأحذية */}
      <rect x={6.24} y={5.0} width={0.34} height={1.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* ممر التوزيع: خزائن مدمجة */}
      <rect x={4.3} y={3.42} width={2.0} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={6.45} y={3.42} width={1.35} height={0.38} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={7.9} y={7.2} r={0.55} rot={180} />
      <Door x={1.9} y={0.18} r={0.6} rot={-90} />
      <Door x={3.3} y={4.52} r={0.6} rot={90} />
      <Door x={4.3} y={3.32} r={0.6} rot={-90} />
      <Door x={6.3} y={3.32} r={0.6} rot={-90} />
      <Door x={8.6} y={3.32} r={0.6} rot={-90} />
      <Door x={4.8} y={4.52} r={0.6} rot={90} />
      <Door x={7.9} y={4.35} r={0.5} rot={180} />
      <Door x={6.92} y={4.68} r={0.5} rot={180} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={0.9} y={0.02} w={1.2} h={0.14} />
      <WindowSeg x={2.35} y={0.02} w={0.75} h={0.14} />
      <WindowSeg x={3.7} y={0.02} w={1.4} h={0.14} />
      <WindowSeg x={5.9} y={0.02} w={1.2} h={0.14} />
      <WindowSeg x={8.2} y={0.02} w={1.2} h={0.14} />
      <WindowSeg x={0.02} y={0.8} w={0.14} h={1.6} />
      <WindowSeg x={0.02} y={5.0} w={0.14} h={1.9} />

      {/* ===== العناوين والمساحات (من المصدر الوحيد) ===== */}
      <PlanLabel x={1.675} y={1.7} size={0.26} weight={800} fill="#047857">المعيشة والطعام</PlanLabel>
      <PlanLabel x={1.675} y={2.02} size={0.19} weight={600} fill="#059669">{roomArea(APARTMENT_LAYOUT[0]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={2.08} y={6.0} size={0.24} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={2.08} y={6.3} size={0.19} weight={600} fill="#a8a29e">{roomArea(APARTMENT_LAYOUT[1]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={4.36} y={2.75} size={0.22} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={4.36} y={3.05} size={0.18} weight={600} fill="#a8a29e">{roomArea(APARTMENT_LAYOUT[2]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.6} y={2.75} size={0.22} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={6.6} y={3.05} size={0.18} weight={600} fill="#a8a29e">{roomArea(APARTMENT_LAYOUT[3]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={8.8} y={2.7} size={0.2} weight={700} fill="#57534e">نوم رابعة</PlanLabel>
      <PlanLabel x={8.8} y={2.98} size={0.17} weight={600} fill="#a8a29e">{roomArea(APARTMENT_LAYOUT[4]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={5.03} y={5.7} size={0.22} weight={700} fill="#b45309">مطبخ</PlanLabel>
      <PlanLabel x={5.03} y={6.05} size={0.18} weight={600} fill="#d97706">{roomArea(APARTMENT_LAYOUT[5]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.05} y={3.95} size={0.19} weight={700} fill="#78716c">ممر التوزيع {roomArea(APARTMENT_LAYOUT[9]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={6.53} y={6.6} size={0.2} weight={700} fill="#57534e">بهو</PlanLabel>
      <PlanLabel x={6.53} y={6.92} size={0.17} weight={600} fill="#a8a29e">{roomArea(APARTMENT_LAYOUT[8]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={8.86} y={4.0} size={0.17} weight={700} fill="#0f766e">حمّام رئيسي</PlanLabel>
      <PlanLabel x={8.86} y={4.28} size={0.16} weight={600} fill="#14b8a6">{roomArea(APARTMENT_LAYOUT[6]).toFixed(2)} م²</PlanLabel>
      <PlanLabel x={7.32} y={4.72} size={0.13} weight={700} fill="#0f766e">حمّام ثانوي</PlanLabel>
      <PlanLabel x={7.32} y={4.92} size={0.14} weight={800} fill="#0d9488">1.00 م²</PlanLabel>
      <PlanLabel x={7.32} y={5.72} size={0.11} weight={600} fill="#14b8a6">0.80 × 1.25 م</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={10} y={-1.8} label="10.00 م" />
      <DimV y1={0} y2={7.5} x={-1.75} label="7.50 م" />
      <DimV y1={0} y2={4.5} x={10.6} label="4.50 م" />
      <Compass x={11.6} y={-0.75} r={0.75} />
      <PlanLabel x={5.2} y={8.75} size={0.4} weight={700} fill="#78716c">
        {`شقة نموذجية 68.70 م² (${net} م² صافي) + شرفة ركنية كابولية`}
      </PlanLabel>
      <PlanLabel x={5.2} y={9.25} size={0.3} weight={600} fill="#a8a29e">
        5 غرف رئيسية + مطبخ منفصل + حمّامان + بهو مدخل — المعيشة ركنية والنوم الرئيسية على الواجهة الجانبية
      </PlanLabel>
    </svg>
  );
}

const TYPE_COLORS: Record<string, string> = {
  معيشة: "bg-emerald-100 text-emerald-800",
  توزيع: "bg-stone-200 text-stone-700",
  خدمي: "bg-amber-100 text-amber-800",
  نوم: "bg-stone-100 text-stone-700 border border-stone-200",
  صحي: "bg-teal-100 text-teal-800",
};

export function ApartmentRoomsTable() {
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
          {APARTMENT_ROOMS.map((r) => (
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
              {APARTMENT_NET.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="bg-stone-100 hover:bg-stone-100">
            <TableCell className="font-bold text-stone-700" colSpan={2}>
              الجدران والحصص الإنشائية
            </TableCell>
            <TableCell className="text-left font-extrabold text-stone-800 tabular-nums">
              {APARTMENT_WALLS.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="bg-emerald-800 hover:bg-emerald-800">
            <TableCell className="font-extrabold text-white" colSpan={2}>
              إجمالي حصة الشقة من البلاطة
            </TableCell>
            <TableCell className="text-left font-extrabold text-white tabular-nums text-base">
              {APARTMENT_GROSS.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="text-xs leading-6 text-stone-500 bg-stone-50 border-t border-stone-200 px-4 py-3">
        التحقق: 4 شقق × 68.70 م² + اللب الحركي 25.20 م² = <strong className="text-emerald-700">300.00 م²</strong> بالضبط لكل طابق سكني.
        <br />
        ولكل شقة <strong className="text-amber-700">شرفة ركنية خاصة 6.63 م²</strong> (3.20 × 1.30 + 1.30 × 1.90 م) كابولية خارج البصمة — 48 شرفة في المشروع غير محتسبة في نسبة البناء.
      </p>
    </div>
  );
}
