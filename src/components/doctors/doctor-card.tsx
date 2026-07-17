"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Doctor } from "@/data/doctors"

interface DoctorCardProps {
  doctor: Doctor
  className?: string
}

export default function DoctorCard({ doctor, className }: DoctorCardProps) {
  return (
    <Link href={`/doctors/${doctor.slug}`} className={cn("group block", className)}>
      <Card className="h-full border-slate-100 hover:border-teal-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-100/30">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br shadow-lg shadow-slate-200/50 transition-transform duration-300 group-hover:scale-105",
                doctor.gradient
              )}
            >
              <span className="text-3xl font-bold text-white">{doctor.initials}</span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-teal-600 transition-colors duration-200">
              {doctor.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-teal-600">
              {doctor.title}
            </p>

            {doctor.featured && (
              <Badge variant="default" className="mt-3 bg-teal-50 text-teal-700 ring-1 ring-teal-200">
                Featured
              </Badge>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {doctor.specializations.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-100"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors group-hover:text-teal-700">
                View Profile
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
