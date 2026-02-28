import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-body tracking-[0.05em] uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-jade text-brand-dark shadow hover:bg-brand-primary-hover",
        secondary:
          "border-transparent bg-brand-tea text-brand-deep hover:bg-[#c9f5c8]",
        destructive:
          "border-transparent bg-brand-saffron text-white shadow hover:bg-red-600",
        outline: "text-foreground border-border",
        success: "border-transparent bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]",
        warning: "border-transparent bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]",
        error: "border-transparent bg-[var(--color-status-error-bg)] text-[var(--color-status-error-text)]",
        info: "border-transparent bg-[var(--color-status-info-bg)] text-[var(--color-status-info-text)]",
        neutral: "border-transparent bg-[var(--color-status-neutral-bg)] text-[var(--color-status-neutral-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
