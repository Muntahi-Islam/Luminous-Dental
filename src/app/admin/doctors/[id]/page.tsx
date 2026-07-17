"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
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

export default function EditDoctorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [form, setForm] = React.useState<DoctorFormData>({
    name: "", title: "", bio: "", portrait: "", specializations: "",
    qualifications: "", experience: "", languages: "", email: "",
    phone: "", featured: false, workingHours: "",
  })

  React.useEffect(() => {
    fetch(`/api/admin/doctors/${id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          const d = res.data
          setForm({
            name: d.name || "",
            title: d.title || "",
            bio: d.bio || "",
            portrait: d.portrait || "",
            specializations: d.specializations || "",
            qualifications: d.qualifications || "",
            experience: d.experience || "",
            languages: d.languages || "",
            email: d.email || "",
            phone: d.phone || "",
            featured: d.featured ?? false,
            workingHours: d.workingHours || "",
          })
        } else {
          toast.error("Failed to load doctor")
          router.push("/admin/doctors")
        }
      })
      .catch(() => {
        toast.error("Failed to load doctor")
        router.push("/admin/doctors")
      })
      .finally(() => setLoading(false))
  }, [id, router])

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
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Doctor updated successfully")
        router.push("/admin/doctors")
      } else {
        toast.error(data.error || "Failed to update doctor")
      }
    } catch {
      toast.error("Failed to update doctor")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        toast.success("Doctor deleted")
        router.push("/admin/doctors")
      } else {
        toast.error(data.error || "Failed to delete doctor")
      }
    } catch {
      toast.error("Failed to delete doctor")
    } finally {
      setDeleting(false)
      setShowDelete(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/doctors">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Edit Doctor
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Update doctor profile and availability.
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Delete
        </Button>
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
          <Button type="submit" loading={saving}>
            <Save className="h-4 w-4 mr-1" />
            Update Doctor
          </Button>
        </div>
      </form>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this doctor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" loading={deleting} onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
