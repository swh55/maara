// مخطط الشقة النموذجية — 10 × 10 م (100 م²)
// 5 غرف (معيشة + مطبخ + 3 نوم) + حمام رئيسي + حمام ثانوي + بهو مدخل
import { BedIcon, Compass, DimH, DimV, Door, PlanLabel, WindowSeg } from "./primitives";
import { APARTMENT_ROOMS, APARTMENT_TOTAL } from "@/lib/arch-data";
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
  return (
    <svg
      viewBox="-1.2 -1.5 12.6 13.6"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط شقة نموذجية بمساحة 100 متر مربع"
    >
      {/* الجدران كخلفية داكنة */}
      <rect x={0} y={0} width={10} height={10} fill="#44403c" />

      {/* الغرف */}
      {/* المعيشة */}
      <rect x={0.18} y={0.18} width={3.84} height={5.24} fill="#ecfdf5" />
      {/* بهو المدخل */}
      <rect x={4.38} y={0.18} width={1.64} height={2.14} fill="#f5f5f4" />
      {/* المطبخ */}
      <rect x={6.38} y={0.18} width={3.44} height={2.84} fill="#fffbeb" />
      {/* ممر التوزيع */}
      <rect x={4.38} y={2.5} width={1.64} height={5.32} fill="#e7e5e4" />
      {/* نوم رئيسية (شكل L) */}
      <rect x={0.18} y={5.78} width={3.84} height={2.04} fill="#fafaf9" />
      <rect x={2.38} y={7.82} width={1.64} height={1.84} fill="#fafaf9" />
      {/* حمام رئيسي */}
      <rect x={0.18} y={8.18} width={1.84} height={1.64} fill="#f0fdfa" />
      {/* نوم ثانية */}
      <rect x={6.38} y={3.38} width={3.44} height={3.14} fill="#fafaf9" />
      {/* نوم ثالثة */}
      <rect x={6.38} y={6.88} width={3.44} height={2.94} fill="#fafaf9" />
      {/* حمام ثانوي */}
      <rect x={4.38} y={8.18} width={1.64} height={1.64} fill="#f0fdfa" />

      {/* فتحة الممر بين البهو والممر */}
      <rect x={4.7} y={2.32} width={1.0} height={0.2} fill="#e7e5e4" />

      {/* ===== أثاث وتجهيزات ===== */}
      {/* أريكة L + طاولة + تلفاز */}
      <rect x={0.35} y={1.7} width={0.75} height={2.4} rx={0.12} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={0.35} y={3.35} width={1.7} height={0.75} rx={0.12} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.35} cy={2.55} r={0.42} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.05} />
      <rect x={3.85} y={2.05} width={0.17} height={1.3} fill="#1c1917" />

      {/* مطبخ: كاونتر + مغسلة + بوتاجاز + ثلاجة */}
      <rect x={6.38} y={0.18} width={3.44} height={0.48} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <rect x={9.34} y={0.18} width={0.48} height={2.2} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={8.0} cy={0.42} r={0.18} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={9.58} cy={0.85} r={0.13} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={9.58} cy={1.3} r={0.13} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={6.55} y={1.95} width={0.62} height={0.75} rx={0.08} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />

      {/* أسرة وخزائن */}
      <BedIcon x={0.7} y={5.95} w={1.7} h={2.0} />
      <rect x={3.35} y={5.95} width={0.5} height={1.7} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <BedIcon x={6.9} y={3.65} w={1.5} h={1.9} />
      <rect x={9.25} y={3.55} width={0.45} height={1.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <BedIcon x={6.9} y={7.15} w={1.5} h={1.8} />
      <rect x={9.25} y={7.05} width={0.45} height={1.3} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />

      {/* تجهيزات الحمامات */}
      <ellipse cx={1.35} cy={8.55} rx={0.2} ry={0.28} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={0.55} cy={8.55} r={0.16} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <rect x={0.3} y={9.05} width={0.7} height={0.68} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <ellipse cx={5.55} cy={8.55} rx={0.18} ry={0.25} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={4.72} cy={8.55} r={0.14} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <rect x={4.55} y={9.05} width={0.62} height={0.65} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={5.0} y={0.18} r={0.9} rot={90} />
      <Door x={4.38} y={1.95} r={0.65} rot={180} />
      <Door x={6.02} y={1.7} r={0.65} rot={0} />
      <Door x={4.38} y={6.8} r={0.6} rot={180} />
      <Door x={6.02} y={4.0} r={0.6} rot={0} />
      <Door x={6.02} y={7.4} r={0.6} rot={0} />
      <Door x={4.8} y={8.18} r={0.55} rot={90} />
      <Door x={0.6} y={8.18} r={0.5} rot={90} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={7.0} y={0.02} w={1.8} h={0.14} />
      <WindowSeg x={0.02} y={1.6} w={0.14} h={2.2} />
      <WindowSeg x={0.02} y={6.2} w={0.14} h={1.4} />
      <WindowSeg x={9.84} y={3.8} w={0.14} h={1.6} />
      <WindowSeg x={9.84} y={7.4} w={0.14} h={1.4} />
      <WindowSeg x={0.7} y={9.84} w={0.8} h={0.14} />
      <WindowSeg x={4.7} y={9.84} w={0.8} h={0.14} />

      {/* ===== العناوين ===== */}
      <PlanLabel x={2.1} y={2.6} size={0.42} weight={800} fill="#047857">المعيشة</PlanLabel>
      <PlanLabel x={2.1} y={3.25} size={0.36} weight={600} fill="#059669">23.5 م²</PlanLabel>
      <PlanLabel x={5.2} y={1.05} size={0.27} weight={700} fill="#57534e">بهو المدخل</PlanLabel>
      <PlanLabel x={5.2} y={1.45} size={0.25} weight={600} fill="#a8a29e">5 م²</PlanLabel>
      <PlanLabel x={7.95} y={1.6} size={0.4} weight={800} fill="#b45309">المطبخ</PlanLabel>
      <PlanLabel x={7.95} y={2.2} size={0.34} weight={600} fill="#d97706">12 م²</PlanLabel>
      <PlanLabel x={5.2} y={4.6} size={0.3} weight={700} fill="#57534e" rotate={-90}>ممر التوزيع 11 م²</PlanLabel>
      <PlanLabel x={2.1} y={6.55} size={0.36} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={2.1} y={7.15} size={0.32} weight={600} fill="#a8a29e">14 م²</PlanLabel>
      <PlanLabel x={1.1} y={8.95} size={0.2} weight={700} fill="#0f766e">حمّام رئيسي</PlanLabel>
      <PlanLabel x={1.1} y={9.25} size={0.2} weight={600} fill="#14b8a6">4.5 م²</PlanLabel>
      <PlanLabel x={8.1} y={5.75} size={0.38} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={8.1} y={6.3} size={0.32} weight={600} fill="#a8a29e">13 م²</PlanLabel>
      <PlanLabel x={8.1} y={8.85} size={0.38} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={8.1} y={9.4} size={0.32} weight={600} fill="#a8a29e">13 م²</PlanLabel>
      <PlanLabel x={5.2} y={8.9} size={0.2} weight={700} fill="#0f766e">حمّام ثانوي</PlanLabel>
      <PlanLabel x={5.2} y={9.2} size={0.2} weight={600} fill="#14b8a6">4 م²</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={10} y={-0.85} label="10.00 م" />
      <DimV y1={0} y2={10} x={-0.75} label="10.00 م" />
      <Compass x={11.1} y={-0.75} r={0.85} />
      <PlanLabel x={5.5} y={11.55} size={0.55} weight={700} fill="#78716c">
        شقة نموذجية — 100 م² (5 غرف + حمّامان + بهو) — الأبعاد بالمتر
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
            <TableRow key={r.name}>
              <TableCell className="font-semibold text-stone-800 py-3">{r.name}</TableCell>
              <TableCell>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${TYPE_COLORS[r.type] ?? "bg-stone-100 text-stone-600"}`}>
                  {r.type}
                </span>
              </TableCell>
              <TableCell className="text-left font-bold text-stone-800 tabular-nums">
                {r.area.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-emerald-800 hover:bg-emerald-800">
            <TableCell className="font-extrabold text-white" colSpan={2}>
              إجمالي مساحة الشقة
            </TableCell>
            <TableCell className="text-left font-extrabold text-white tabular-nums text-base">
              {APARTMENT_TOTAL.toFixed(1)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
