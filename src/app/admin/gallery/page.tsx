"use client"

import * as React from "react"
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Grid,
  List,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface GalleryImage {
  id: number
  title: string
  imageUrl: string
  beforeUrl: string | null
  afterUrl: string | null
  category: string
  description: string
  altText: string
  featured: boolean
  displayOrder: number
  createdAt: string
}

interface PaginatedResponse {
  success: boolean
  data: {
    items: GalleryImage[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

const galleryCategories = ["All", "Clinic", "Treatment", "Team", "Equipment"]

export default function GalleryPage() {
  const [images, setImages] = React.useState<GalleryImage[]>([])
  const [loading, setLoading] = React.useState(true)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [category, setCategory] = React.useState("All")
  const [showAdd, setShowAdd] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState<GalleryImage | null>(null)
  const [form, setForm] = React.useState({
    title: "",
    imageUrl: "",
    category: "Clinic",
    altText: "",
    description: "",
    featured: false,
  })
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)

  const fetchImages = React.useCallback(async () => {
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "200" })
      if (category !== "All") params.set("category", category)
      const res = await fetch(`/api/admin/gallery?${params}`)
      const data: PaginatedResponse = await res.json()
      if (data.success) setImages(data.data.items)
    } catch (err) {
      console.error("Failed to fetch gallery", err)
    } finally {
      setLoading(false)
    }
  }, [category])

  React.useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleAdd = async () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = "Required"
    if (!form.imageUrl.trim()) errs.imageUrl = "Required"
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    try {
      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      await fetchImages()
      setShowAdd(false)
      setForm({ title: "", imageUrl: "", category: "Clinic", altText: "", description: "", featured: false })
    } catch (err) {
      console.error("Failed to add image", err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      await fetch(`/api/admin/gallery/${showDelete.id}`, { method: "DELETE" })
      await fetchImages()
      setShowDelete(null)
    } catch (err) {
      console.error("Failed to delete image", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Gallery
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage your clinic&apos;s photo gallery.
          </p>
        </div>
        <Button onClick={() => {
          setForm({ title: "", imageUrl: "", category: "Clinic", altText: "", description: "", featured: false })
          setFormErrors({})
          setShowAdd(true)
        }}>
          <Plus className="h-4 w-4 mr-1" />
          Add Photo
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium font-[family-name:var(--font-dm-sans)] transition-colors duration-200",
                category === c
                  ? "bg-accent text-white"
                  : "bg-surface-warm text-ink-secondary hover:bg-surface-dim"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 border border-border rounded-md p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={cn("rounded p-1.5 transition-colors", viewMode === "grid" ? "bg-surface-warm text-ink" : "text-ink-muted hover:text-ink-secondary")}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn("rounded p-1.5 transition-colors", viewMode === "list" ? "bg-surface-warm text-ink" : "text-ink-muted hover:text-ink-secondary")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface overflow-hidden animate-pulse">
                <div className="aspect-square bg-surface-warm" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-surface-warm rounded w-3/4" />
                  <div className="h-3 bg-surface-warm rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-surface overflow-hidden animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border-b border-border-light last:border-0">
                <div className="h-10 w-10 rounded bg-surface-warm" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-warm rounded w-1/3" />
                  <div className="h-3 bg-surface-warm rounded w-1/6" />
                </div>
              </div>
            ))}
          </div>
        )
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative rounded-lg border border-border bg-surface overflow-hidden"
            >
              <div className="aspect-square bg-surface-warm relative overflow-hidden">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.altText || image.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-ink-faint" />
                  </div>
                )}
                {image.featured && (
                  <Badge variant="default" className="absolute top-2 right-2 text-[10px]">Featured</Badge>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)] truncate">
                  {image.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="outline" className="text-[10px]">
                    {image.category}
                  </Badge>
                  <button
                    onClick={() => setShowDelete(image)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-muted hover:text-danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-warm">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">Photo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">Added</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {images.map((image) => (
                <tr key={image.id} className="hover:bg-surface-warm/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded-md bg-surface-warm overflow-hidden">
                      {image.imageUrl ? (
                        <img src={image.imageUrl} alt={image.altText || image.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-ink-faint" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink font-[family-name:var(--font-dm-sans)]">{image.title}</td>
                  <td className="px-4 py-3"><Badge variant="outline">{image.category}</Badge></td>
                  <td className="px-4 py-3 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">{formatDate(image.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-danger hover:text-danger" onClick={() => setShowDelete(image)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <ImageIcon className="h-12 w-12 text-ink-faint mx-auto mb-3" />
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No photos in this category.</p>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Photo</DialogTitle>
            <DialogDescription>Add a new image to your gallery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
            <Input
              label="Title"
              placeholder="Photo title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              error={formErrors.title}
            />
            <Input
              label="Image URL"
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
              error={formErrors.imageUrl}
            />
            <Input
              label="Alt Text"
              placeholder="Describe the image for accessibility"
              value={form.altText}
              onChange={(e) => setForm((p) => ({ ...p, altText: e.target.value }))}
            />
            <Textarea
              label="Description"
              placeholder="Optional description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
            <div className="w-full">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {galleryCategories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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
            {form.imageUrl && (
              <div className="rounded-lg border border-border overflow-hidden">
                <img src={form.imageUrl} alt="Preview" className="w-full h-40 object-cover" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAdd} disabled={saving}>
              {saving ? "Adding..." : "Add Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDelete} onOpenChange={(open) => !open && setShowDelete(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Photo</DialogTitle>
            <DialogDescription>
              Remove &ldquo;{showDelete?.title}&rdquo; from the gallery?
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
