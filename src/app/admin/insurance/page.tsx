"use client"

import * as React from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Shield,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"

interface InsurancePlan {
  id: number
  name: string
  logo: string | null
  coverageNotes: string | null
  displayOrder: number
  createdAt: string
}

interface PaginatedResponse {
  success: boolean
  data: {
    items: InsurancePlan[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export default function InsurancePage() {
  const [plans, setPlans] = React.useState<InsurancePlan[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [showForm, setShowForm] = React.useState(false)
  const [editItem, setEditItem] = React.useState<InsurancePlan | null>(null)
  const [showDelete, setShowDelete] = React.useState<InsurancePlan | null>(null)
  const [form, setForm] = React.useState({ name: "", logo: "", coverageNotes: "" })
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)

  const fetchPlans = React.useCallback(async () => {
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "100" })
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/insurance?${params}`)
      const data: PaginatedResponse = await res.json()
      if (data.success) setPlans(data.data.items)
    } catch (err) {
      console.error("Failed to fetch insurance plans", err)
    } finally {
      setLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  const openNew = () => {
    setEditItem(null)
    setForm({ name: "", logo: "", coverageNotes: "" })
    setFormErrors({})
    setShowForm(true)
  }

  const openEdit = (item: InsurancePlan) => {
    setEditItem(item)
    setForm({
      name: item.name,
      logo: item.logo || "",
      coverageNotes: item.coverageNotes || "",
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleSave = async () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Required"
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    try {
      const body = {
        name: form.name,
        logo: form.logo || null,
        coverageNotes: form.coverageNotes || null,
      }
      if (editItem) {
        await fetch(`/api/admin/insurance/${editItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } else {
        await fetch("/api/admin/insurance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      await fetchPlans()
      setShowForm(false)
    } catch (err) {
      console.error("Failed to save insurance plan", err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    try {
      await fetch(`/api/admin/insurance/${showDelete.id}`, { method: "DELETE" })
      await fetchPlans()
      setShowDelete(null)
    } catch (err) {
      console.error("Failed to delete insurance plan", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Insurance
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage accepted insurance plans and coverage details.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" />
          Add Plan
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <Input
          placeholder="Search insurance plans..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-surface-warm" />
                  <div className="space-y-1.5">
                    <div className="h-4 bg-surface-warm rounded w-32" />
                    <div className="h-3 bg-surface-warm rounded w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-3 bg-surface-warm rounded w-full" />
                <div className="h-3 bg-surface-warm rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {plan.logo ? (
                      <img src={plan.logo} alt={plan.name} className="h-10 w-10 rounded-lg object-contain bg-surface-warm p-1" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light">
                        <Shield className="h-5 w-5 text-accent" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                {plan.coverageNotes ? (
                  <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
                    {plan.coverageNotes}
                  </p>
                ) : (
                  <p className="text-sm text-ink-faint font-[family-name:var(--font-dm-sans)] italic">
                    No coverage notes.
                  </p>
                )}
              </CardContent>
              <div className="flex gap-2 p-6 pt-0">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(plan)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger" onClick={() => setShowDelete(plan)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && plans.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <Shield className="h-12 w-12 text-ink-faint mx-auto mb-3" />
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No insurance plans yet. Add your first one!</p>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Plan" : "Add Insurance Plan"}</DialogTitle>
            <DialogDescription>
              {editItem ? "Update insurance plan details." : "Add a new accepted insurance plan."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
            <Input
              label="Plan Name"
              placeholder="e.g. BlueCross PPO"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              error={formErrors.name}
            />
            <Input
              label="Logo URL"
              placeholder="https://..."
              value={form.logo}
              onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
            />
            {form.logo && (
              <div className="rounded-lg border border-border overflow-hidden">
                <img src={form.logo} alt="Logo preview" className="h-16 object-contain p-2 bg-surface-warm w-full" />
              </div>
            )}
            <Textarea
              label="Coverage Notes"
              placeholder="Describe coverage details, deductibles, etc..."
              value={form.coverageNotes}
              onChange={(e) => setForm((p) => ({ ...p, coverageNotes: e.target.value }))}
              className="min-h-[100px]"
            />
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
            <DialogTitle>Delete Plan</DialogTitle>
            <DialogDescription>
              Remove &ldquo;{showDelete?.name}&rdquo; from accepted plans?
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
