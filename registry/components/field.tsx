import * as React from "react";
import { cn } from "@/lib/utils";

export type FieldProps = {
  label: React.ReactNode;
  /** Render as inline (label on the left) instead of stacked (label on top). */
  layout?: "stacked" | "inline";
  required?: boolean;
  /** Hint text rendered below the input. */
  description?: React.ReactNode;
  /** Error message — when set, replaces description and adds aria-invalid styling. */
  error?: React.ReactNode;
  /** htmlFor target — pass when wrapping a single input. */
  htmlFor?: string;
  className?: string;
  /** The input element(s). */
  children: React.ReactNode;
};

/**
 * Form field wrapper that pairs a label with an input, plus optional description / error.
 *
 * - `stacked` (default): label above input — use in spacious onboarding / settings forms.
 * - `inline`: label left of input (fixed width column) — use in dense filter bars or
 *   table-like forms (e.g. ERP screens).
 *
 * The component does NOT render the input itself; pass any input/select/textarea as a
 * child. This keeps Field framework-agnostic and composable with any input library.
 */
export function Field({
  label,
  layout = "stacked",
  required,
  description,
  error,
  htmlFor,
  className,
  children,
}: FieldProps) {
  const hint = error ?? description;
  const isError = !!error;

  if (layout === "inline") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <label
          htmlFor={htmlFor}
          className="text-xs text-muted-foreground w-28 shrink-0 text-left"
        >
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
        <div className="flex-1 min-w-0 space-y-1">
          {children}
          {hint && (
            <p className={cn("text-xs", isError ? "text-destructive" : "text-muted-foreground")}>
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none inline-flex items-center"
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className={cn("text-xs", isError ? "text-destructive" : "text-muted-foreground")}>
          {hint}
        </p>
      )}
    </div>
  );
}
