import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium font-[family-name:var(--font-dm-sans)] uppercase tracking-wide transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-accent-light text-accent",
        secondary:
          "bg-surface-warm text-ink-secondary",
        outline:
          "border border-border text-ink-secondary",
        destructive:
          "bg-danger-light text-danger",
        success:
          "bg-success-light text-success",
        warning:
          "bg-warning-light text-warning",
        info:
          "bg-surface-warm text-ink-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
