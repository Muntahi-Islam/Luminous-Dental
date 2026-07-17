"use client"

import Link from "next/link"
import {
  Phone,
  Smile,
  Sparkles,
  Sun,
  AlignVerticalSpaceAround,
  Baby,
  ShieldCheck,
  Crown,
  Layers,
  Stethoscope,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Service } from "@/data/services"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Smile,
  Sparkles,
  Sun,
  AlignVerticalSpaceAround,
  Baby,
  ShieldCheck,
  Crown,
  Layers,
  Stethoscope,
}

const categoryColors: Record<Service["category"], { bg: string; text: string; ring: string }> = {
  preventive: { bg: "bg-green-50", text: "text-green-600", ring: "ring-green-100" },
  cosmetic: { bg: "bg-purple-50", text: "text-purple-600", ring: "ring-purple-100" },
  restorative: { bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
  emergency: { bg: "bg-red-50", text: "text-red-600", ring: "ring-red-100" },
}

interface ServiceCardProps {
  service: Service
  className?: string
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon]
  const colors = categoryColors[service.category]

  return (
    <Link href={`/services/${service.slug}`} className={cn("group block", className)}>
      <Card className="h-full border-slate-100 hover:border-teal-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-100/30">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-110",
                  colors.bg,
                  colors.ring
                )}
              >
                <Icon className={cn("h-6 w-6", colors.text)} />
              </div>
            )}
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
                colors.bg,
                colors.text,
                colors.ring
              )}
            >
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-teal-600 transition-colors duration-200">
            {service.title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-slate-500 line-clamp-3">
            {service.shortDescription}
          </p>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors group-hover:text-teal-700">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
