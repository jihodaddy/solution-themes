import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type StepIndicatorProps = {
  steps: Step[];
  current: number;
  completed: Set<number>;
  onJump?: (index: number) => void;
  className?: string;
};

/**
 * Horizontal stepper for multi-step flows.
 *
 * - `current` is the active step (always wins visually, even if also in `completed`)
 * - `completed` is the set of indices the user has confirmed; controls the green
 *   check state and the connecting-line color
 * - `onJump` makes prior + current steps clickable. Omit to disable navigation.
 *
 * The component renders a bare flex row — wrap with your own chrome.
 */
export function StepIndicator({
  steps,
  current,
  completed,
  onJump,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      {steps.map((step, i) => {
        const wasCompleted = completed.has(i);
        const isCurrent = i === current;
        const isComplete = wasCompleted && !isCurrent;
        const Icon = step.icon;
        const reachable = wasCompleted || isCurrent || i <= current;
        const clickable = reachable && !!onJump;
        return (
          <div key={i} className="flex-1 flex items-start gap-2 min-w-0">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJump?.(i)}
              className={cn(
                "flex-1 text-left group",
                clickable ? "cursor-pointer" : "cursor-not-allowed",
                !reachable && "opacity-50",
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "relative size-9 rounded-full grid place-items-center shrink-0 transition-all",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                    isComplete && "bg-success text-success-foreground",
                    !isCurrent && !isComplete && "bg-muted text-muted-foreground border border-border",
                  )}
                >
                  {isComplete ? (
                    <Check className="size-4" />
                  ) : Icon ? (
                    <Icon className="size-4" />
                  ) : (
                    <span className="text-xs font-semibold tabular-nums">{i + 1}</span>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px transition-colors",
                      wasCompleted ? "bg-success" : "bg-border",
                    )}
                  />
                )}
              </div>
              <div className="mt-2.5 pr-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </div>
                <div
                  className={cn(
                    "text-sm font-medium leading-tight mt-0.5",
                    isCurrent ? "text-primary" : "text-foreground/80",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-muted-foreground leading-snug mt-0.5 hidden lg:block">
                    {step.description}
                  </div>
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
