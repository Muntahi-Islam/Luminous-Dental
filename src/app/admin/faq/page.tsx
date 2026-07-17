"use client"

import * as React from "react"
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  displayOrder: number
  createdAt: string
  service?: { title: string }
}

interface PaginatedResponse {
  success: boolean
  data: {
    items: FAQ[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

const faqCategories = ["General", "Insurance", "Treatment", "Pediatric", "Orthodontics"]

const categoryVariant: Record<string, "default" | "secondary" | "outline" | "warning" | "info"> = {
  General: "default",
  Insurance: "secondary",
  Treatment: "outline",
  Pediatric: "info",
  Orthodontics: "warning",
}

export default function FAQPage() {
  const [faqs, setFAQs] = React.useState<FAQ[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("")
  const [showForm, setShowForm] = React.useState(false)
  const [editItem, setEditItem] = React.useState<FAQ | null>(null)
  const [showDelete, setShowDelete] = React.useState<FAQ | null>(null)
  const [form, setForm] = React.useState({ question: "", answer: "", category: "General" })
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [expanded, setExpanded] = React.useState<number | null>(null)
  const [saving, setSaving] = React.useState(false)

  const fetchFAQs = React.useCallback(async () => {
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "200" })
      if (search) params.set("search", search)
      if (categoryFilter) params.set("category", categoryFilter)
      const res = await fetch(`/api/admin/faq?${params}`)
      const data: PaginatedResponse = await res.json()
      if (data.success) {
        setFAQs(data.data.items.sort((a, b) => a.displayOrder - b.displayOrder))
      }
    } catch (err) {
      console.error("Failed to fetch FAQs", err)
    } finally {
      setLoading(false)
    }
  }, [search, categoryFilter])

  React.useEffect(() => {
    fetchFAQs()
  }, [fetchFAQs])

  const openNew = () => {
    setEditItem(null)
    setForm({ question: "", answer: "", category: "General" })
    setFormErrors({})
    setShowForm(true)
  }

  const openEdit = (item: FAQ) => {
    setEditItem(item)
    setForm({ question: item.question, answer: item.answer, category: item.category })
    setFormErrors({})
    setShowForm(true)
  }

  const handleSave = async () => {
    const errs: Record<string, string> = {}
    if (!form.question.trim()) errs.question = "Required"
    if (!form.answer.trim()) errs.answer = "Required"
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    try {
      if (editItem) {
        await fetch(`/api/admin/faq/${editItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        await fetch("/api/admin/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, displayOrder: faqs.length + 1 }),
        })
      }
      await fetchFAQs()
      setShowForm(false)
    } catch (err) {
      console.error("Failed to save FAQ", err)
    } finally {
      setSaving(false)
    }
  }

  const moveUp = async (item: FAQ) => {
    const idx = faqs.findIndex((f) => f.id === item.id)
    if (idx <= 0) return
    const prev = faqs[idx - 1]
    try {
      await fetch(`/api/admin/faq/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: prev.displayOrder }),
      })
      await fetch(`/api/admin/faq/${prev.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: item.displayOrder }),
      })
      await fetchFAQs()
    } catch (err) {
      console.error("Failed to reorder", err)
    }
  }

  const moveDown = async (item: FAQ) => {
    const idx = faqs.findIndex((f) => f.id === item.id)
    if (idx === -1 || idx >= faqs.length - 1) return
    const next = faqs[idx + 1]
    try {
      await fetch(`/api/admin/faq/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: next.displayOrder }),
      })
      await fetch(`/api/admin/faq/${next.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: item.displayOrder }),
      })
      await fetchFAQs()
    } catch (err) {
      console.error("Failed to reorder", err)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      await fetch(`/api/admin/faq/${showDelete.id}`, { method: "DELETE" })
      await fetchFAQs()
      setShowDelete(null)
    } catch (err) {
      console.error("Failed to delete FAQ", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            FAQ
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage frequently asked questions for your patients.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" />
          Add FAQ
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <Input
            placeholder="Search questions..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCategoryFilter("")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium font-[family-name:var(--font-dm-sans)] transition-colors duration-200",
              !categoryFilter
                ? "bg-accent text-white"
                : "bg-surface-warm text-ink-secondary hover:bg-surface-dim"
            )}
          >
            All
          </button>
          {faqCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium font-[family-name:var(--font-dm-sans)] transition-colors duration-200",
                categoryFilter === c
                  ? "bg-accent text-white"
                  : "bg-surface-warm text-ink-secondary hover:bg-surface-dim"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-surface-warm" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-surface-warm rounded w-1/4" />
                    <div className="h-4 bg-surface-warm rounded w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <Card key={faq.id}>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveUp(faq)}
                      disabled={index === 0}
                      className="text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => moveDown(faq)}
                      disabled={index === faqs.length - 1}
                      className="text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    className="flex-1 text-left"
                    onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={categoryVariant[faq.category] || "secondary"}>
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)]">
                      {faq.question}
                    </p>
                    {expanded === faq.id && (
                      <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(faq)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-danger hover:text-danger" onClick={() => setShowDelete(faq)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && faqs.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No FAQs yet. Add your first one!</p>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            <DialogDescription>
              {editItem ? "Update this FAQ entry." : "Create a new frequently asked question."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
            <Input
              label="Question"
              placeholder="e.g. How do I schedule an appointment?"
              value={form.question}
              onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
              error={formErrors.question}
            />
            <Textarea
              label="Answer"
              placeholder="Provide a clear, helpful answer..."
              value={form.answer}
              onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
              error={formErrors.answer}
              className="min-h-[120px]"
            />
            <div className="w-full">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted">Category</label>
              <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {faqCategories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <DialogTitle>Delete FAQ</DialogTitle>
            <DialogDescription>
              Remove this frequently asked question?
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
