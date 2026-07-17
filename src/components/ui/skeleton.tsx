import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-surface-warm animate-shimmer",
        "bg-[length:200%_100%] bg-gradient-to-r from-surface-warm via-border-light to-surface-warm",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
