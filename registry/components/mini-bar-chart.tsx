import * as React from "react";
import { cn } from "@/lib/utils";

export type MiniBarChartTone = "primary" | "success" | "warning" | "destructive" | "muted";

export type MiniBarChartProps = {
  /** Either a flat list of numbers, or labeled rows. */
  data: number[] | { label?: string; value: number }[];
  /** Pixel height of the chart area. */
  height?: number;
  /** Color tone — maps to a CSS variable for the active theme. */
  tone?: MiniBarChartTone;
  /** Render x-axis labels below the bars (only when data has label fields). */
  showLabels?: boolean;
  /** Highlight the maximum-value bar at full opacity (others at 60%). */
  highlightMax?: boolean;
  className?: string;
  /** Accessible label for the chart. */
  "aria-label"?: string;
};

const TONE_VAR: Record<MiniBarChartTone, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
  muted: "var(--muted-foreground)",
};

/**
 * Tiny SVG bar chart — fixed bar count, responsive width, theme-aware color.
 *
 * Use for distributions (channel share, time-of-day buckets) or short trend strips
 * where line interpolation would be misleading. Bars use rounded tops and a small gap.
 */
export function MiniBarChart({
  data,
  height = 60,
  tone = "primary",
  showLabels = false,
  highlightMax = false,
  className,
  "aria-label": ariaLabel = "Distribution",
}: MiniBarChartProps) {
  const rows =
    typeof data[0] === "number"
      ? (data as number[]).map((value, i) => ({ label: String(i + 1), value }))
      : (data as { label?: string; value: number }[]).map((r, i) => ({
          label: r.label ?? String(i + 1),
          value: r.value,
        }));

  if (rows.length === 0) {
    return <div style={{ height }} className={cn("w-full", className)} aria-label={ariaLabel} />;
  }

  const max = Math.max(...rows.map((r) => r.value));
  const safeMax = max === 0 ? 1 : max;
  const color = TONE_VAR[tone];
  const barAreaHeight = showLabels ? height - 16 : height;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <div className="flex items-end gap-[2px] w-full" style={{ height: barAreaHeight }}>
        {rows.map((r, i) => {
          const pct = (r.value / safeMax) * 100;
          const isMax = highlightMax && r.value === max;
          return (
            <div
              key={`${r.label}-${i}`}
              className="flex-1 rounded-t-sm transition-opacity"
              style={{
                height: `${pct}%`,
                background: color,
                opacity: highlightMax ? (isMax ? 1 : 0.5) : 0.75,
                minHeight: 2,
              }}
              title={`${r.label}: ${r.value}`}
            />
          );
        })}
      </div>
      {showLabels && (
        <div className="flex gap-[2px] w-full mt-1">
          {rows.map((r, i) => (
            <div
              key={`label-${i}`}
              className="flex-1 text-[9px] text-muted-foreground text-center truncate tabular-nums"
              style={{ fontFamily: "var(--font-numeric)" }}
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
