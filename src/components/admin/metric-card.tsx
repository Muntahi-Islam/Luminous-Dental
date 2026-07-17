"use client"

import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  trend?: "up" | "down"
}

export function MetricCard({ title, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <p className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-medium text-ink">{value}</p>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">{title}</p>
          {change !== undefined && trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium font-[family-name:var(--font-dm-sans)]",
                  trend === "up" ? "text-success" : "text-danger"
                )}
              >
                {trend === "up" ? "↑" : "↓"} {Math.abs(change)}%
              </span>
              <span className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">vs last week</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
