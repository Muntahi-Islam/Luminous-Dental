"use client"

import * as React from "react"
import {
  Calendar,
  User,
  Stethoscope,
  FileText,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { DataTable, type Column } from "@/components/admin/data-table"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils"

interface AppointmentItem extends Record<string, unknown> {
  id: number
  patientName: string
  patientEmail: string
  patientPhone: string
  preferredDate: string
  preferredTime: string
  reason: string
  notes: string
  insurance: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  doctor?: { name: string }
  service?: { title: string }
}

interface AppointmentsResponse {
  success: boolean
  data: {
    items: AppointmentItem[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "info"> = {
  confirmed: "success",
  pending: "warning",
  cancelled: "destructive",
  completed: "info",
}

export default function AppointmentsPage() {
  const [search, setSearch] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedAppointment, setSelectedAppointment] = React.useState<AppointmentItem | null>(null)
  const [page, setPage] = React.useState(1)
  const [data, setData] = React.useState<AppointmentItem[]>([])
  const [total, setTotal] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  React.useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "10",
    })
    if (debouncedSearch) params.set("search", debouncedSearch)
    if (statusFilter !== "all") params.set("status", statusFilter)

    fetch(`/api/admin/appointments?${params}`)
      .then((res) => res.json())
      .then((json: AppointmentsResponse) => {
        if (json.success) {
          setData(json.data.items)
          setTotal(json.data.total)
          setTotalPages(json.data.totalPages)
        }
      })
      .catch(() => {
        toast.error("Failed to load appointments")
      })
      .finally(() => setLoading(false))
  }, [page, debouncedSearch, statusFilter])

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      const json = await res.json()
      if (json.success) {
        toast.success(`Appointment ${newStatus}`)
        setData((prev) =>
          prev.map((apt) =>
            apt.id === id ? { ...apt, status: newStatus as AppointmentItem["status"] } : apt
          )
        )
        if (selectedAppointment?.id === id) {
          setSelectedAppointment((prev) =>
            prev ? { ...prev, status: newStatus as AppointmentItem["status"] } : prev
          )
        }
      } else {
        toast.error(json.message ?? "Failed to update status")
      }
    } catch {
      toast.error("Failed to update status")
    } finally {
      setUpdating(false)
    }
  }

  const columns: Column<AppointmentItem>[] = [
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-ink">{row.patientName}</p>
          <p className="text-xs text-ink-muted">{row.patientEmail}</p>
        </div>
      ),
    },
    {
      key: "doctor",
      label: "Doctor",
      sortable: true,
      render: (_, row) => row.doctor?.name ?? "Unassigned",
    },
    {
      key: "service",
      label: "Service",
      sortable: true,
      render: (_, row) => row.service?.title ?? "General",
    },
    {
      key: "preferredDate",
      label: "Date & Time",
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="text-ink-secondary">{formatDate(row.preferredDate)}</p>
          <p className="text-xs text-ink-muted">{row.preferredTime}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={statusVariant[value as string]}>
          {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Appointments
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Manage and review all patient appointments.
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-1" />
          New Appointment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-[family-name:var(--font-dm-sans)]"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          page,
          pageSize: 10,
          total,
          totalPages,
        }}
        onPageChange={setPage}
        onRowClick={(row) => setSelectedAppointment(row as AppointmentItem)}
        rowKey={(row) => (row as AppointmentItem).id}
        emptyState={{
          title: "No appointments found",
          description: "Try adjusting your search or filter criteria.",
        }}
      />

      <Dialog
        open={!!selectedAppointment}
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment &&
                `${formatDate(selectedAppointment.preferredDate)} at ${selectedAppointment.preferredTime}`}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 font-[family-name:var(--font-dm-sans)]">
              <div className="flex items-center justify-between">
                <Badge
                  variant={statusVariant[selectedAppointment.status]}
                  className="capitalize"
                >
                  {selectedAppointment.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {selectedAppointment.patientName}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {selectedAppointment.patientEmail}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {selectedAppointment.patientPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-ink-secondary">
                      {selectedAppointment.doctor?.name ?? "Unassigned"}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {selectedAppointment.service?.title ?? "General"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  <p className="text-sm text-ink-secondary">
                    {formatDate(selectedAppointment.preferredDate)} at{" "}
                    {selectedAppointment.preferredTime}
                  </p>
                </div>
                {selectedAppointment.notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-accent mt-0.5" />
                    <p className="text-sm text-ink-muted">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                {selectedAppointment.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={updating}
                    onClick={() => updateStatus(selectedAppointment.id, "confirmed")}
                  >
                    Confirm
                  </Button>
                )}
                {(selectedAppointment.status === "confirmed" ||
                  selectedAppointment.status === "pending") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={updating}
                    onClick={() => updateStatus(selectedAppointment.id, "completed")}
                  >
                    Complete
                  </Button>
                )}
                {selectedAppointment.status !== "cancelled" &&
                  selectedAppointment.status !== "completed" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={updating}
                      onClick={() => updateStatus(selectedAppointment.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
