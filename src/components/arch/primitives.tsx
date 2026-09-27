// عناصر رسم معمارية مشتركة لجميع المخططات (SVG)
import type { ReactNode } from "react";

/** باب بمفصلة وقوس فتح — rot بالدرجات، flip لعكس جهة الفتح */
export function Door({
  x,
  y,
  r = 0.55,
  rot = 0,
  flip = false,
}: {
  x: number;
  y: number;
  r?: number;
  rot?: number;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${flip ? -1 : 1})`}
      stroke="#78716c"
      strokeWidth={0.05}
      fill="none"
    >
      <line x1={0} y1={0} x2={r} y2={0} strokeWidth={0.09} stroke="#44403c" />
      <path d={`M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}`} strokeDasharray="0.12 0.08" />
    </g>
  );
}

/** نافذة على جدار خارجي */
export function WindowSeg({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke="#57534e" strokeWidth={0.04} />
      {w >= h ? (
        <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#57534e" strokeWidth={0.035} />
      ) : (
        <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#57534e" strokeWidth={0.035} />
      )}
    </g>
  );
}

/** سلم — درجات أفقية وسهم صاعد */
export function Stairs({
  x,
  y,
  w,
  h,
  steps = 8,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  steps?: number;
  label?: string;
}) {
  const gap = h / (steps + 1);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#d6d3d1" stroke="#57534e" strokeWidth={0.06} />
      {Array.from({ length: steps }).map((_, i) => (
        <line
          key={i}
          x1={x + 0.08}
          y1={y + gap * (i + 1)}
          x2={x + w - 0.08}
          y2={y + gap * (i + 1)}
          stroke="#78716c"
          strokeWidth={0.045}
        />
      ))}
      <line
        x1={x + w / 2}
        y1={y + h - 0.35}
        x2={x + w / 2}
        y2={y + 0.35}
        stroke="#0f766e"
        strokeWidth={0.09}
      />
      <path
        d={`M ${x + w / 2 - 0.18} ${y + 0.75} L ${x + w / 2} ${y + 0.3} L ${x + w / 2 + 0.18} ${y + 0.75} Z`}
        fill="#0f766e"
      />
      {label && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 0.9}
          textAnchor="middle"
          fontSize={0.42}
          fontWeight={700}
          fill="#44403c"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** مصعد — صندوق بعلامة X */
export function ElevatorBox({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#a8a29e" stroke="#44403c" strokeWidth={0.07} />
      <line x1={x} y1={y} x2={x + w} y2={y + h} stroke="#57534e" strokeWidth={0.05} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} stroke="#57534e" strokeWidth={0.05} />
    </g>
  );
}

/** بوصلة شمال صغيرة */
export function Compass({ x, y, r = 1.15 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#ffffff" stroke="#44403c" strokeWidth={0.08} />
      <path d={`M 0 ${-r * 0.62} L ${r * 0.28} ${r * 0.35} L 0 ${r * 0.12} L ${-r * 0.28} ${r * 0.35} Z`} fill="#0f766e" />
      <text y={r - 0.12} textAnchor="middle" fontSize={r * 0.62} fontWeight={800} fill="#1c1917">
        ش
      </text>
    </g>
  );
}

/** خط أبعاد أفقي */
export function DimH({
  x1,
  x2,
  y,
  label,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
}) {
  return (
    <g stroke="#57534e" strokeWidth={0.06}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 0.25} x2={x1} y2={y + 0.25} />
      <line x1={x2} y1={y - 0.25} x2={x2} y2={y + 0.25} />
      <text
        x={(x1 + x2) / 2}
        y={y - 0.3}
        textAnchor="middle"
        fontSize={0.85}
        fontWeight={700}
        fill="#44403c"
        stroke="none"
      >
        {label}
      </text>
    </g>
  );
}

/** خط أبعاد رأسي */
export function DimV({
  y1,
  y2,
  x,
  label,
}: {
  y1: number;
  y2: number;
  x: number;
  label: string;
}) {
  return (
    <g stroke="#57534e" strokeWidth={0.06}>
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 0.25} y1={y1} x2={x + 0.25} y2={y1} />
      <line x1={x - 0.25} y1={y2} x2={x + 0.25} y2={y2} />
      <text
        transform={`translate(${x - 0.35} ${(y1 + y2) / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize={0.85}
        fontWeight={700}
        fill="#44403c"
        stroke="none"
      >
        {label}
      </text>
    </g>
  );
}

/** سيارة (مخطط قبو) */
export function Car({ x, y, w = 1.9, h = 3.3 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={0.5} fill="#ffffff" stroke="#78716c" strokeWidth={0.07} />
      <rect x={w * 0.14} y={h * 0.62} width={w * 0.72} height={h * 0.2} rx={0.12} fill="#d6d3d1" />
      <rect x={w * 0.14} y={h * 0.18} width={w * 0.72} height={h * 0.2} rx={0.12} fill="#d6d3d1" />
    </g>
  );
}

/** شجرة (مخطط الموقع) */
export function Tree({ x, y, r = 0.45 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#4ade80" stroke="#15803d" strokeWidth={0.05} />
      <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.45} fill="#86efac" stroke="none" />
    </g>
  );
}

/** عنوان داخل المخطط */
export function PlanLabel({
  x,
  y,
  size = 0.42,
  weight = 700,
  fill = "#44403c",
  children,
  rotate,
}: {
  x: number;
  y: number;
  size?: number;
  weight?: number;
  fill?: string;
  children: ReactNode;
  rotate?: number;
}) {
  if (rotate) {
    return (
      <text
        transform={`translate(${x} ${y}) rotate(${rotate})`}
        textAnchor="middle"
        fontSize={size}
        fontWeight={weight}
        fill={fill}
      >
        {children}
      </text>
    );
  }
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={fill}>
      {children}
    </text>
  );
}

/** سرير (أثاث الشقق) */
export function BedIcon({ x, y, w = 1.6, h = 2.0 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={0.12} fill="#ffffff" stroke="#a8a29e" strokeWidth={0.05} />
      <rect x={0.08} y={0.08} width={w - 0.16} height={h * 0.22} fill="#e7e5e4" stroke="none" rx={0.08} />
      <line x1={0} y1={h * 0.38} x2={w} y2={h * 0.38} stroke="#a8a29e" strokeWidth={0.045} />
    </g>
  );
}

/** ألواح شمسية (مخطط السطح) */
export function PvTile({ x, y, w = 1.7, h = 1.0 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} fill="#0f766e" stroke="#134e4a" strokeWidth={0.04} />
      <line x1={w / 3} y1={0} x2={w / 3} y2={h} stroke="#5eead4" strokeWidth={0.035} />
      <line x1={(w / 3) * 2} y1={0} x2={(w / 3) * 2} y2={h} stroke="#5eead4" strokeWidth={0.035} />
      <line x1={0} y1={h / 2} x2={w} y2={h / 2} stroke="#5eead4" strokeWidth={0.035} />
    </g>
  );
}
