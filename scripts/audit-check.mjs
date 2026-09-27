// سكربت تحقق هندسي — يُشغّل مرة واحدة للتحقق من المصدر الوحيد
import {
  NORTH_UNIT,
  SOUTH_UNIT,
  unitNet,
  unitWalls,
  AUDIT,
  CORE,
  FLOOR_EQUATION,
  envelopesSum,
} from "../src/lib/arch-data";

const rectsOverlap = (a, b) =>
  a.x < b.x + b.w - 1e-9 && b.x < a.x + a.w - 1e-9 && a.y < b.y + b.h - 1e-9 && b.y < a.y + a.h - 1e-9;

const roomRects = (u) => u.layout.flatMap((r) => r.parts.map((p) => ({ ...p, room: r.name })));

console.log("=== مساحات الشقق ===");
for (const u of [NORTH_UNIT, SOUTH_UNIT]) {
  console.log(`${u.name}: gross=${u.gross.toFixed(2)} net=${unitNet(u).toFixed(2)} walls=${unitWalls(u).toFixed(2)}`);
  for (const r of u.layout) {
    const a = r.parts.reduce((s, p) => s + p.w * p.h, 0);
    console.log(`   - ${r.name} [${r.type}] = ${a.toFixed(2)}`);
  }
}

console.log("\n=== البصمات ===");
console.log("شمالية:", NORTH_UNIT.envelope.reduce((s, r) => s + r.w * r.h, 0).toFixed(2));
console.log("جنوبية:", SOUTH_UNIT.envelope.reduce((s, r) => s + r.w * r.h, 0).toFixed(2));
console.log("لب:", ((CORE.x1 - CORE.x0) * (CORE.y1 - CORE.y0)).toFixed(2));
console.log("مجموع البصمات:", envelopesSum().toFixed(2), "(يجب 300.00)");
console.log("معادلة الطابق:", FLOOR_EQUATION);

console.log("\n=== فحص التداخل التفصيلي ===");
for (const u of [NORTH_UNIT, SOUTH_UNIT]) {
  const rects = roomRects(u);
  let found = false;
  for (let i = 0; i < rects.length; i++)
    for (let j = i + 1; j < rects.length; j++)
      if (rectsOverlap(rects[i], rects[j])) {
        console.log(`تداخل: ${rects[i].room} ↔ ${rects[j].room}`);
        found = true;
      }
  if (!found) console.log(`${u.name}: لا تداخل ✓`);
}

console.log("\n=== AUDIT ===");
let fails = 0;
for (const a of AUDIT) {
  if (!a.pass) fails++;
  console.log(`${a.pass ? "✓" : "✗"} ${a.label}`);
}
console.log(`\nالنتيجة: ${AUDIT.length - fails}/${AUDIT.length} PASS`);
if (fails > 0) process.exit(1);
