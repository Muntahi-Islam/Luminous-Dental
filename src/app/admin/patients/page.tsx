"use client"

import * as React from "react"
import {
  Mail,
  Phone,
  Search,
  Reply,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { DataTable, type Column } from "@/components/admin/data-table"
import { formatDate } from "@/lib/utils"
import { toast } from "@/components/ui/toast"

interface Inquiry extends Record<string, unknown> {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "new" | "in_progress" | "replied" | "archived"
  assignedTo: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

const statusVariant: Record<string, "default" | "warning" | "info" | "secondary"> = {
  new: "default",
  in_progress: "warning",
  replied: "info",
  archived: "secondary",
}

const columns: Column<Inquiry>[] = [
  {
    key: "name",
    label: "Patient",
    sortable: true,
    render: (_, row) => (
      <div>
        <p className="font-medium text-ink">{row.name}</p>
        <p className="text-xs text-ink-muted">{row.email}</p>
      </div>
    ),
  },
  { key: "subject", label: "Subject", sortable: true },
  {
    key: "createdAt",
    label: "Date",
    sortable: true,
    render: (value) => formatDate(value as string),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={statusVariant[value as string]}>
        {(value as string).replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </Badge>
    ),
  },
]

export default function PatientsPage() {
  const [search, setSearch] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null)
  const [replyText, setReplyText] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [items, setItems] = React.useState<Inquiry[]>([])
  const [total, setTotal] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  React.useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" })
    if (debouncedSearch) params.set("search", debouncedSearch)
    if (statusFilter !== "all") params.set("status", statusFilter)

    setLoading(true)
    fetch(`/api/admin/contact?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setItems(res.data.items)
          setTotal(res.data.total)
          setTotalPages(res.data.totalPages)
        }
      })
      .catch(() => toast.error("Failed to load inquiries"))
      .finally(() => setLoading(false))
  }, [page, debouncedSearch, statusFilter])

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedInquiry) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/contact/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes: replyText || undefined }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Inquiry updated")
        setSelectedInquiry({ ...selectedInquiry, status: newStatus as Inquiry["status"] })
        setItems((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? { ...i, status: newStatus as Inquiry["status"] } : i))
        )
        setReplyText("")
      } else {
        toast.error(data.error || "Failed to update")
      }
    } catch {
      toast.error("Failed to update inquiry")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
          Patient Inquiries
        </h1>
        <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
          Review and respond to patient messages and requests.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-[family-name:var(--font-dm-sans)]"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={items}
        pagination={{
          page,
          pageSize: 10,
          total,
          totalPages,
        }}
        onPageChange={setPage}
        onRowClick={(row) => setSelectedInquiry(row as Inquiry)}
        rowKey={(row) => (row as Inquiry).id}
        loading={loading}
        emptyState={{
          title: "No inquiries found",
          description: "All caught up! No matching inquiries.",
        }}
      />

      <Dialog open={!!selectedInquiry} onOpenChange={(open) => {
        if (!open) {
          setSelectedInquiry(null)
          setReplyText("")
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedInquiry?.name} &middot; {selectedInquiry && formatDate(selectedInquiry.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
              <div className="flex items-center gap-4 text-sm text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-ink-muted" />
                  {selectedInquiry.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-ink-muted" />
                  {selectedInquiry.phone}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface-warm p-4">
                <p className="text-sm text-ink leading-relaxed">{selectedInquiry.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant={statusVariant[selectedInquiry.status]} className="capitalize">
                  {selectedInquiry.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-2">
                <Textarea
                  label="Reply / Notes"
                  placeholder="Type your response..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setSelectedInquiry(null); setReplyText("") }}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  disabled={updating}
                  onClick={() => handleStatusUpdate("replied")}
                >
                  <Reply className="h-3.5 w-3.5 mr-1" />
                  Mark as Replied
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={updating}
                  onClick={() => handleStatusUpdate("archived")}
                >
                  Archive
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
