import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        primary: "bg-primary/15 text-primary",
        success: "bg-success/15 text-success",
        warning: "bg-warning/20 text-warning-foreground",
        destructive: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export type BadgePillProps =
  React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof pillVariants>;

export const BadgePill = React.forwardRef<HTMLSpanElement, BadgePillProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(pillVariants({ tone }), className)} {...props} />
  )
);
BadgePill.displayName = "BadgePill";
