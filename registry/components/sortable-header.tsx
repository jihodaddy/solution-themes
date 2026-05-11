import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDir = "asc" | "desc";

export type SortableHeaderProps<K extends string> = {
  label: React.ReactNode;
  sortKey: K;
  sortBy: K;
  sortDir: SortDir;
  onSort: (key: K) => void;
  align?: "left" | "right";
  className?: string;
};

/**
 * Renders a `<th>` cell with a sortable label + direction indicator.
 *
 * - When the column matches `sortBy`, shows an up/down chevron based on `sortDir`
 * - Otherwise shows a faint up/down chevron pair to hint sortability
 * - Click cycles via the consumer's `onSort` handler (typically toggles direction
 *   on repeat clicks, sets a new key on first click)
 */
export function SortableHeader<K extends string>({
  label,
  sortKey,
  sortBy,
  sortDir,
  onSort,
  align = "left",
  className,
}: SortableHeaderProps<K>) {
  const active = sortBy === sortKey;
  return (
    <th
      className={cn(
        "px-3 py-2.5 text-xs font-semibold text-muted-foreground",
        align === "right" ? "text-right" : "text-left",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "inline-flex items-center gap-1 hover:text-foreground transition-colors",
          active && "text-foreground",
        )}
      >
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ChevronUp className="size-3" />
          ) : (
            <ChevronDown className="size-3" />
          )
        ) : (
          <ChevronsUpDown className="size-3 opacity-40" />
        )}
      </button>
    </th>
  );
}
