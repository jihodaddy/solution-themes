import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dotVariants = cva("inline-block rounded-full", {
  variants: {
    tone: {
      neutral: "bg-muted-foreground",
      primary: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: { tone: "neutral", size: "md" },
});

export type StatusDotProps =
  React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof dotVariants>;

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, tone, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(dotVariants({ tone, size }), className)}
      role="status"
      {...props}
    />
  )
);
StatusDot.displayName = "StatusDot";
