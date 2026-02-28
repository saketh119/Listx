import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-jade focus-visible:shadow-brand-glow disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-jade text-brand-dark shadow-sm hover:bg-brand-cedar hover:text-white hover:-translate-y-[1px] hover:shadow-md",
        destructive:
          "bg-brand-saffron text-white shadow-sm hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-md",
        outline:
          "border border-border bg-background shadow-sm hover:bg-brand-tea hover:text-brand-dark hover:border-brand-jade",
        secondary:
          "bg-brand-tea text-brand-deep shadow-sm hover:bg-[#c9f5c8]",
        ghost: "hover:bg-brand-tea hover:text-brand-dark",
        link: "text-brand-jade underline-offset-4 hover:underline hover:text-brand-cedar",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
