"use client"

import * as React from "react"
import {
  Plus,
  Pencil,
  Trash2,
  DollarSign,
  Star,
  Search as SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"


interface ServiceItem {
  id: number
  title: string
  slug: string
  shortDescription: string
  description: string
  heroImage: string
  icon: string | null
  benefits: string
  procedure: string
  recovery: string
  pricing: string | null
  featured: boolean
  displayOrder: number
  doctor?: { name: string }
  _count?: { faq: number; galleryImages: number; appointments: number }
}

interface ServicesResponse {
  success: boolean
  data: {
    items: ServiceItem[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  heroImage: "",
  benefits: "",
  procedure: "",
  recovery: "",
  pricing: "",
  featured: false,
}

export default function ServicesPage() {
  const [search, setSearch] = React.useState("")
  const [featuredFilter, setFeaturedFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [services, setServices] = React.useState<ServiceItem[]>([])
  const [total, setTotal] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const [showForm, setShowForm] = React.useState(false)
  const [editService, setEditService] = React.useState<ServiceItem | null>(null)
  const [showDelete, setShowDelete] = React.useState<ServiceItem | null>(null)
  const [form, setForm] = React.useState(emptyForm)
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [refreshKey, setRefreshKey] = React.useState(0)

  React.useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "20" })
    if (search) params.set("search", search)
    if (featuredFilter === "featured") params.set("featured", "true")
    if (featuredFilter === "not-featured") params.set("featured", "false")
    fetch(`/api/admin/services?${params}`)
      .then((r) => r.json())
      .then((json: ServicesResponse) => {
        if (json.success) {
          setServices(json.data.items)
          setTotal(json.data.total)
          setTotalPages(json.data.totalPages)
        }
      })
      .catch(() => toast.error("Failed to load services."))
      .finally(() => setLoading(false))
  }, [page, search, featuredFilter, refreshKey])

  const openNew = () => {
    setEditService(null)
    setForm(emptyForm)
    setFormErrors({})
    setShowForm(true)
  }

  const openEdit = (service: ServiceItem) => {
    setEditService(service)
    setForm({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      heroImage: service.heroImage,
      benefits: service.benefits,
      procedure: service.procedure,
      recovery: service.recovery,
      pricing: service.pricing ?? "",
      featured: service.featured,
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleSave = async () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = "Required"
    if (!form.shortDescription.trim()) errs.shortDescription = "Required"
    if (!form.description.trim()) errs.description = "Required"
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    try {
      const body = {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        heroImage: form.heroImage,
        benefits: form.benefits,
        procedure: form.procedure,
        recovery: form.recovery,
        pricing: form.pricing || undefined,
        featured: form.featured,
      }
      if (editService) {
        const res = await fetch(`/api/admin/services/${editService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error("Update failed")
        toast.success("Service updated")
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error("Create failed")
        toast.success("Service created")
      }
      setShowForm(false)
      setRefreshKey((k) => k + 1)
    } catch {
      toast.error("Failed to save service.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/services/${showDelete.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Service deleted")
      setShowDelete(null)
      setRefreshKey((k) => k + 1)
    } catch {
      toast.error("Failed to delete service.")
    } finally {
      setDeleting(false)
    }
  }

  const updateField = (key: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (formErrors[key]) {
      setFormErrors((p) => {
        const next = { ...p }
        delete next[key]
        return next
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Services
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage your clinic&apos;s dental services and pricing.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" />
          Add Service
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-[family-name:var(--font-dm-sans)]"
          />
        </div>
        <Select value={featuredFilter} onValueChange={(v) => { setFeaturedFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <div className="flex items-center gap-1 shrink-0">
                    {service.featured && (
                      <Badge variant="default">
                        <Star className="h-3 w-3 mr-0.5" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-sm font-[family-name:var(--font-dm-sans)]">
                  {service.pricing && (
                    <div className="flex items-center gap-1.5 text-ink-secondary">
                      <DollarSign className="h-3.5 w-3.5 text-accent" />
                      {service.pricing}
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="flex gap-2 p-6 pt-0 border-t border-border-light mt-auto">
                <Button variant="ghost" size="sm" onClick={() => openEdit(service)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger" onClick={() => setShowDelete(service)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && services.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No services match your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
            {total} services total
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <span className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editService ? "Edit Service" : "New Service"}</DialogTitle>
            <DialogDescription>
              {editService ? "Update the service details below." : "Add a new service to your clinic."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              error={formErrors.title}
            />
            <Textarea
              label="Short Description"
              value={form.shortDescription}
              onChange={(e) => updateField("shortDescription", e.target.value)}
              error={formErrors.shortDescription}
              className="min-h-[60px]"
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              error={formErrors.description}
              className="min-h-[100px]"
            />
            <Input
              label="Hero Image URL"
              value={form.heroImage}
              onChange={(e) => updateField("heroImage", e.target.value)}
              placeholder="https://..."
            />
            <Textarea
              label="Benefits"
              value={form.benefits}
              onChange={(e) => updateField("benefits", e.target.value)}
              placeholder="One benefit per line"
              className="min-h-[60px]"
            />
            <Textarea
              label="Procedure"
              value={form.procedure}
              onChange={(e) => updateField("procedure", e.target.value)}
              className="min-h-[60px]"
            />
            <Textarea
              label="Recovery"
              value={form.recovery}
              onChange={(e) => updateField("recovery", e.target.value)}
              className="min-h-[60px]"
            />
            <Input
              label="Pricing"
              value={form.pricing}
              onChange={(e) => updateField("pricing", e.target.value)}
              placeholder="$0"
            />
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink">Featured</label>
              <Switch checked={form.featured} onCheckedChange={(v) => updateField("featured", v)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)} disabled={saving}>Cancel</Button>
            <Button size="sm" onClick={handleSave} loading={saving}>{editService ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDelete} onOpenChange={(open) => !open && setShowDelete(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Remove &ldquo;{showDelete?.title}&rdquo; from your services list? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowDelete(null)} disabled={deleting}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} loading={deleting}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
