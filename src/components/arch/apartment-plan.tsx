// مخطط الشقة النموذجية — 10.0 × 7.5 م (≈ 66 م² صافي)
// 5 غرف (معيشة + مطبخ + 3 نوم) + حمام رئيسي ملحق بالنوم الرئيسية + حمام ثانوي + بهو مدخل + ممر
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
      viewBox="-2.0 -1.9 14.2 11.5"
      className="w-full h-auto"
      role="img"
      aria-label="مخطط شقة نموذجية بمساحة 66 متر مربع تقريباً"
    >
      {/* الجدران كخلفية داكنة */}
      <rect x={0} y={0} width={10} height={7.5} fill="#44403c" />

      {/* الغرف */}
      {/* نوم رئيسية (مع حمّام ملحق داخلها) */}
      <rect x={0.18} y={0.18} width={3.34} height={3.02} fill="#fafaf9" />
      <rect x={2.68} y={0.36} width={0.84} height={1.64} fill="#f0fdfa" />
      {/* نوم ثانية */}
      <rect x={3.88} y={0.18} width={2.04} height={3.02} fill="#fafaf9" />
      {/* مطبخ */}
      <rect x={6.28} y={0.18} width={1.44} height={3.02} fill="#fffbeb" />
      {/* نوم ثالثة (الامتداد الشرقي) */}
      <rect x={8.08} y={0.18} width={1.74} height={2.94} fill="#fafaf9" />
      {/* ممر التوزيع */}
      <rect x={4.58} y={3.38} width={5.24} height={0.94} fill="#e7e5e4" />
      {/* معيشة — شريط علوي */}
      <rect x={0.18} y={3.38} width={4.04} height={0.94} fill="#ecfdf5" />
      {/* معيشة — الصالة الرئيسية */}
      <rect x={0.18} y={4.68} width={5.44} height={2.64} fill="#ecfdf5" />
      {/* بهو المدخل */}
      <rect x={5.98} y={4.68} width={1.74} height={2.64} fill="#f5f5f4" />
      {/* حمّام ثانوي */}
      <rect x={4.58} y={6.18} width={1.04} height={1.14} fill="#f0fdfa" />

      {/* ===== أثاث وتجهيزات ===== */}
      {/* نوم رئيسية: سرير + خزانة */}
      <BedIcon x={0.45} y={0.45} w={1.55} h={1.95} />
      <rect x={0.45} y={2.62} width={1.9} height={0.45} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* تجهيزات الحمّام الرئيسي */}
      <rect x={2.75} y={0.42} width={0.72} height={0.6} fill="#ccfbf1" stroke="#0d9488" strokeWidth={0.04} />
      <ellipse cx={3.15} cy={1.6} rx={0.15} ry={0.22} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      {/* نوم ثانية: سرير + خزانة */}
      <BedIcon x={4.15} y={0.45} w={1.4} h={1.8} />
      <rect x={5.62} y={0.45} width={0.42} height={1.5} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* المطبخ: كاونتر L + مغسلة + بوتاجاز + ثلاجة */}
      <rect x={7.28} y={0.35} width={0.42} height={2.5} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <rect x={6.35} y={0.35} width={0.93} height={0.4} fill="#fde68a" stroke="#d97706" strokeWidth={0.04} />
      <circle cx={7.49} cy={0.78} r={0.12} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={7.49} cy={1.35} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={7.49} cy={1.68} r={0.1} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={6.4} y={2.5} width={0.62} height={0.58} rx={0.08} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* نوم ثالثة: سرير مفرد */}
      <BedIcon x={8.4} y={0.5} w={1.15} h={1.75} />
      {/* المعيشة: أريكة L + طاولة + تلفاز + طاولة طعام */}
      <rect x={0.35} y={4.95} width={0.7} height={2.0} rx={0.12} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <rect x={0.35} y={6.25} width={2.0} height={0.7} rx={0.12} fill="#d6d3d1" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={2.3} cy={5.6} r={0.42} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.05} />
      <rect x={5.6} y={5.35} width={0.14} height={1.3} fill="#1c1917" />
      <rect x={3.55} y={4.85} width={1.5} height={0.85} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={3.75} cy={5.95} r={0.18} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      <circle cx={4.85} cy={5.95} r={0.18} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* بهو المدخل: كونسول */}
      <rect x={6.15} y={4.85} width={1.35} height={0.4} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* ممر: خزائن مدمجة */}
      <rect x={4.7} y={3.45} width={0.5} height={0.8} fill="#f5f5f4" stroke="#a8a29e" strokeWidth={0.04} />
      {/* الحمّام الثانوي: مرحاض ومغسلة */}
      <ellipse cx={4.9} cy={6.65} rx={0.14} ry={0.2} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />
      <circle cx={5.4} cy={6.5} r={0.11} fill="#ffffff" stroke="#5eead4" strokeWidth={0.04} />

      {/* ===== الأبواب ===== */}
      <Door x={7.9} y={7.4} r={0.75} rot={180} />
      <Door x={1.3} y={3.2} r={0.65} rot={-90} />
      <Door x={4.9} y={3.2} r={0.65} rot={-90} />
      <Door x={6.9} y={3.2} r={0.6} rot={-90} />
      <Door x={8.6} y={3.3} r={0.6} rot={-90} />
      <Door x={2.75} y={2.0} r={0.5} rot={90} />
      <Door x={5.8} y={7.3} r={0.55} rot={180} />

      {/* ===== النوافذ ===== */}
      <WindowSeg x={0.9} y={0.02} w={1.7} h={0.14} />
      <WindowSeg x={4.2} y={0.02} w={1.5} h={0.14} />
      <WindowSeg x={6.4} y={0.02} w={1.2} h={0.14} />
      <WindowSeg x={8.35} y={0.02} w={1.3} h={0.14} />
      <WindowSeg x={0.02} y={5.2} w={0.14} h={1.8} />

      {/* ===== العناوين ===== */}
      <PlanLabel x={1.3} y={2.9} size={0.3} weight={700} fill="#57534e">نوم رئيسية</PlanLabel>
      <PlanLabel x={1.3} y={3.35} size={0.22} weight={600} fill="#a8a29e" rotate={0}>9.5 م²</PlanLabel>
      <PlanLabel x={3.1} y={1.32} size={0.17} weight={700} fill="#0f766e">حمّام</PlanLabel>
      <PlanLabel x={3.1} y={1.55} size={0.15} weight={600} fill="#14b8a6">2.5 م²</PlanLabel>
      <PlanLabel x={4.9} y={2.85} size={0.28} weight={700} fill="#57534e">نوم ثانية</PlanLabel>
      <PlanLabel x={4.9} y={3.3} size={0.2} weight={600} fill="#a8a29e">7.8 م²</PlanLabel>
      <PlanLabel x={7.0} y={2.75} size={0.26} weight={700} fill="#b45309">مطبخ</PlanLabel>
      <PlanLabel x={7.0} y={3.2} size={0.19} weight={600} fill="#d97706">5.9 م²</PlanLabel>
      <PlanLabel x={8.95} y={2.8} size={0.24} weight={700} fill="#57534e">نوم ثالثة</PlanLabel>
      <PlanLabel x={8.95} y={3.22} size={0.18} weight={600} fill="#a8a29e">7.0 م²</PlanLabel>
      <PlanLabel x={2.4} y={5.75} size={0.34} weight={800} fill="#047857">المعيشة</PlanLabel>
      <PlanLabel x={2.4} y={6.25} size={0.24} weight={600} fill="#059669">17.5 م²</PlanLabel>
      <PlanLabel x={6.85} y={5.55} size={0.26} weight={700} fill="#57534e">بهو</PlanLabel>
      <PlanLabel x={6.85} y={5.95} size={0.2} weight={600} fill="#a8a29e">6.4 م²</PlanLabel>
      <PlanLabel x={7.25} y={3.9} size={0.2} weight={700} fill="#78716c">ممر التوزيع 7.2 م²</PlanLabel>
      <PlanLabel x={5.1} y={7.0} size={0.17} weight={700} fill="#0f766e">حمّام ثانوي</PlanLabel>
      <PlanLabel x={5.1} y={7.2} size={0.15} weight={600} fill="#14b8a6">2.2 م²</PlanLabel>

      {/* الأبعاد والبوصلة */}
      <DimH x1={0} x2={10} y={-0.85} label="10.00 م" />
      <DimH x1={7.9} x2={10} y={-0.3} label="2.10 م" />
      <DimV y1={0} y2={7.5} x={-0.75} label="7.50 م" />
      <DimV y1={0} y2={4.5} x={10.6} label="4.50 م" />
      <Compass x={11.5} y={-0.7} r={0.75} />
      <PlanLabel x={5.2} y={8.9} size={0.5} weight={700} fill="#78716c">
        شقة نموذجية ≈ 66 م² (5 غرف + حمّامان + بهو) — الأبعاد بالمتر
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
