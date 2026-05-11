import * as React from "react";
import { cn } from "@/lib/utils";

export type SparklineTone = "primary" | "success" | "warning" | "destructive" | "muted";

export type SparklineProps = {
  /** Data points (any length ≥ 2). Min/max are derived from the data. */
  data: number[];
  /** Pixel height of the SVG. Width is set to 100% of parent. */
  height?: number;
  /** Color tone — maps to a CSS variable for the active theme. */
  tone?: SparklineTone;
  /** Fill the area under the line with a 15% tinted gradient. */
  showArea?: boolean;
  /** Render a small dot at the last data point. */
  showEnd?: boolean;
  className?: string;
  /** Accessible label for the chart. */
  "aria-label"?: string;
};

const TONE_VAR: Record<SparklineTone, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
  muted: "var(--muted-foreground)",
};

/**
 * Tiny SVG line chart (no axes, no labels) — designed to live inline with stats,
 * inside table rows, or alongside a KPI label.
 *
 * Renders responsive width (100%) with a fixed pixel height. Uses theme tokens for color
 * so it adapts to the active theme without per-instance configuration.
 */
export function Sparkline({
  data,
  height = 32,
  tone = "primary",
  showArea = true,
  showEnd = true,
  className,
  "aria-label": ariaLabel = "Trend",
}: SparklineProps) {
  if (data.length < 2) {
    return <div style={{ height }} className={cn("w-full", className)} aria-label={ariaLabel} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Normalize to a 100×100 viewBox (preserveAspectRatio stretches horizontally).
  const stepX = 100 / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = 100 - ((v - min) / range) * 100;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L 100 100 L 0 100 Z`;
  const color = TONE_VAR[tone];
  const last = points[points.length - 1];
  const gradientId = React.useId();

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ height, width: "100%" }}
      className={cn("block overflow-visible", className)}
    >
      {showArea && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
        </>
      )}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {showEnd && (
        <circle
          cx={last.x}
          cy={last.y}
          r="2.5"
          fill={color}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
