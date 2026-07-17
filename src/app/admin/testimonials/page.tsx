"use client"

import * as React from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Quote,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { cn, formatDate } from "@/lib/utils"

interface Testimonial {
  id: number
  patientName: string
  patientInitials: string
  rating: number
  content: string
  videoUrl: string | null
  treatmentType: string
  featured: boolean
  displayOrder: number
  createdAt: string
}

interface PaginatedResponse {
  success: boolean
  data: {
    items: Testimonial[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [showForm, setShowForm] = React.useState(false)
  const [editItem, setEditItem] = React.useState<Testimonial | null>(null)
  const [showDelete, setShowDelete] = React.useState<Testimonial | null>(null)
  const [form, setForm] = React.useState({
    patientName: "",
    content: "",
    rating: 5,
    treatmentType: "",
    featured: false,
  })
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)

  const fetchTestimonials = React.useCallback(async () => {
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "100" })
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/testimonials?${params}`)
      const data: PaginatedResponse = await res.json()
      if (data.success) setTestimonials(data.data.items)
    } catch (err) {
      console.error("Failed to fetch testimonials", err)
    } finally {
      setLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const openNew = () => {
    setEditItem(null)
    setForm({ patientName: "", content: "", rating: 5, treatmentType: "", featured: false })
    setFormErrors({})
    setShowForm(true)
  }

  const openEdit = (item: Testimonial) => {
    setEditItem(item)
    setForm({
      patientName: item.patientName,
      content: item.content,
      rating: item.rating,
      treatmentType: item.treatmentType,
      featured: item.featured,
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleSave = async () => {
    const errs: Record<string, string> = {}
    if (!form.patientName.trim()) errs.patientName = "Required"
    if (!form.content.trim()) errs.content = "Required"
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    try {
      if (editItem) {
        await fetch(`/api/admin/testimonials/${editItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }
      await fetchTestimonials()
      setShowForm(false)
    } catch (err) {
      console.error("Failed to save testimonial", err)
    } finally {
      setSaving(false)
    }
  }

  const toggleFeatured = async (item: Testimonial) => {
    try {
      await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      })
      await fetchTestimonials()
    } catch (err) {
      console.error("Failed to toggle featured", err)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      await fetch(`/api/admin/testimonials/${showDelete.id}`, { method: "DELETE" })
      await fetchTestimonials()
      setShowDelete(null)
    } catch (err) {
      console.error("Failed to delete testimonial", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Testimonials
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Showcase patient reviews and feedback.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" />
          Add Testimonial
        </Button>
      </div>

      <div className="max-w-sm">
        <Input
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-5 space-y-3">
                <div className="h-8 w-8 rounded bg-surface-warm" />
                <div className="h-4 bg-surface-warm rounded w-3/4" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-surface-warm rounded" />
                  <div className="h-3 bg-surface-warm rounded w-5/6" />
                </div>
                <div className="h-3 bg-surface-warm rounded w-1/3 pt-3 border-t border-border-light" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <Card key={item.id} className={cn("flex flex-col", item.featured && "border-accent/30")}>
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <Quote className="h-8 w-8 text-accent-muted/50" />
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < item.rating ? "text-warning fill-warning" : "text-ink-faint"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed flex-1">
                  &ldquo;{item.content}&rdquo;
                </p>
                {item.treatmentType && (
                  <Badge variant="outline" className="w-fit mt-2 text-[10px]">
                    {item.treatmentType}
                  </Badge>
                )}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
                  <div>
                    <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)]">{item.patientName}</p>
                    <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">{formatDate(item.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.featured && <Badge variant="default">Featured</Badge>}
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleFeatured(item)}>
                      {item.featured ? <ToggleRight className="h-4 w-4 text-accent" /> : <ToggleLeft className="h-4 w-4 text-ink-muted" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-danger hover:text-danger" onClick={() => setShowDelete(item)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && testimonials.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No testimonials yet. Add your first one!</p>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>
              {editItem ? "Update this testimonial." : "Add a new patient testimonial."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
            <Input
              label="Patient Name"
              placeholder="e.g. Jane Doe"
              value={form.patientName}
              onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
              error={formErrors.patientName}
            />
            <Textarea
              label="Testimonial"
              placeholder="What did the patient say?"
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              error={formErrors.content}
            />
            <Input
              label="Treatment Type"
              placeholder="e.g. Root Canal, Whitening"
              value={form.treatmentType}
              onChange={(e) => setForm((p) => ({ ...p, treatmentType: e.target.value }))}
            />
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, rating: r }))}
                    className="p-0.5"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6 transition-colors",
                        r <= form.rating ? "text-warning fill-warning" : "text-ink-faint hover:text-ink-muted"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={form.featured ? "default" : "outline"}
                size="sm"
                onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              >
                {form.featured ? "Featured" : "Mark as Featured"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editItem ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDelete} onOpenChange={(open) => !open && setShowDelete(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Remove this testimonial from your site?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowDelete(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
