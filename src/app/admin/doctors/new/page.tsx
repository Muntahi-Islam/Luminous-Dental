"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

interface DoctorFormData {
  name: string
  title: string
  bio: string
  portrait: string
  specializations: string
  qualifications: string
  experience: string
  languages: string
  email: string
  phone: string
  featured: boolean
  workingHours: string
}

const initialForm: DoctorFormData = {
  name: "",
  title: "",
  bio: "",
  portrait: "",
  specializations: "",
  qualifications: "",
  experience: "",
  languages: "",
  email: "",
  phone: "",
  featured: false,
  workingHours: "",
}

export default function NewDoctorPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [form, setForm] = React.useState<DoctorFormData>(initialForm)

  const update = <K extends keyof DoctorFormData>(key: K, value: DoctorFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.title.trim()) newErrors.title = "Title is required"
    if (!form.specializations.trim()) newErrors.specializations = "Specializations are required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Doctor created successfully")
        router.push("/admin/doctors")
      } else {
        toast.error(data.error || "Failed to create doctor")
      }
    } catch {
      toast.error("Failed to create doctor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/doctors">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Add New Doctor
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Fill in the details to add a new doctor to your practice.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Dr. Jane Smith"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
            <Input
              label="Title"
              placeholder="e.g. General Dentist"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              error={errors.title}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="jane@clinic.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <Input
              label="Portrait URL"
              placeholder="https://example.com/portrait.jpg"
              value={form.portrait}
              onChange={(e) => update("portrait", e.target.value)}
            />
            <Textarea
              label="Bio"
              placeholder="Brief professional biography..."
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Specializations"
              placeholder="e.g. General Dentistry, Cosmetic Dentistry"
              value={form.specializations}
              onChange={(e) => update("specializations", e.target.value)}
              error={errors.specializations}
            />
            <Input
              label="Qualifications"
              placeholder="e.g. DDS, University of Michigan"
              value={form.qualifications}
              onChange={(e) => update("qualifications", e.target.value)}
            />
            <Input
              label="Experience"
              placeholder="e.g. 15 years"
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
            />
            <Input
              label="Languages"
              placeholder="e.g. English, Spanish"
              value={form.languages}
              onChange={(e) => update("languages", e.target.value)}
            />
            <Input
              label="Working Hours"
              placeholder="e.g. Mon-Fri 9:00-17:00"
              value={form.workingHours}
              onChange={(e) => update("workingHours", e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              <label htmlFor="featured" className="text-sm text-ink font-[family-name:var(--font-dm-sans)]">
                Featured doctor
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 mt-6">
          <Link href="/admin/doctors">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" loading={loading}>
            <Save className="h-4 w-4 mr-1" />
            Save Doctor
          </Button>
        </div>
      </form>
    </div>
  )
}
