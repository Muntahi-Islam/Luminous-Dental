"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus,
  Mail,
  Phone,
  Calendar,
  Edit,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/toast"

interface Doctor {
  id: number
  name: string
  slug: string
  title: string
  bio: string
  portrait: string
  specializations: string
  qualifications: string
  experience: string
  languages: string
  email: string
  phone: string
  displayOrder: number
  featured: boolean
  workingHours: string | null
  _count?: { services: number; appointments: number }
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = React.useState<Doctor[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/admin/doctors?page=1&pageSize=50")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setDoctors(res.data.items)
        else toast.error("Failed to load doctors")
      })
      .catch(() => toast.error("Failed to load doctors"))
      .finally(() => setLoading(false))
  }, [])

  const initials = (name: string) =>
    name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Doctors
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage your clinic&apos;s dental professionals.
          </p>
        </div>
        <Link href="/admin/doctors/new">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-36" />
                </CardContent>
                <CardFooter className="border-t border-border-light pt-4">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))
          : doctors.map((doctor) => (
              <Card key={doctor.id} className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-base font-bold text-white font-[family-name:var(--font-dm-sans)]">
                        {initials(doctor.name)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">{doctor.title}</p>
                      </div>
                    </div>
                    {doctor.featured && (
                      <Badge variant="info">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm font-[family-name:var(--font-dm-sans)]">
                    {doctor.specializations && (
                      <p className="text-ink-secondary">{doctor.specializations}</p>
                    )}
                    <div className="flex items-center gap-2 text-ink-secondary">
                      <Mail className="h-3.5 w-3.5 text-ink-muted" />
                      {doctor.email}
                    </div>
                    {doctor.phone && (
                      <div className="flex items-center gap-2 text-ink-secondary">
                        <Phone className="h-3.5 w-3.5 text-ink-muted" />
                        {doctor.phone}
                      </div>
                    )}
                    {doctor._count && (
                      <div className="flex items-center gap-2 text-ink-secondary">
                        <Calendar className="h-3.5 w-3.5 text-ink-muted" />
                        {doctor._count.appointments} appointments
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border-light pt-4">
                  <Link href={`/admin/doctors/${doctor.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
