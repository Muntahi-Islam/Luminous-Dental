"use client"

import * as React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Calendar,
  Users,
  Mail,
  Stethoscope,
  ArrowRight,
  Plus,
  FileText,
  Image,
  Inbox,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MetricCard } from "@/components/admin/metric-card"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils"

interface DashboardData {
  totalAppointments: number
  pendingAppointments: number
  confirmedAppointments: number
  completedAppointments: number
  totalDoctors: number
  totalServices: number
  totalBlogPosts: number
  totalPatients: number
  totalInquiries: number
  newInquiries: number
  totalTestimonials: number
  totalNewsletters: number
  recentAppointments: Array<{
    id: number
    patientName: string
    patientEmail: string
    preferredDate: string
    preferredTime: string
    status: string
    doctor?: { name: string }
    service?: { title: string }
  }>
  recentInquiries: Array<{
    id: number
    name: string
    email: string
    subject: string
    status: string
    createdAt: string
  }>
}

interface AppointmentItem {
  id: number
  preferredDate: string
  status: string
  service?: { title: string }
}

interface ServiceItem {
  id: number
  title: string
  _count?: { appointments: number }
}

interface ServiceChartData {
  name: string
  count: number
}

interface DailyChartData {
  date: string
  count: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#0d9488",
  completed: "#3b82f6",
  cancelled: "#dc2626",
}

const statusColor: Record<string, "success" | "warning" | "destructive" | "info" | "default"> = {
  confirmed: "success",
  pending: "warning",
  cancelled: "destructive",
  completed: "info",
  new: "default",
  replied: "info",
}

const quickActions = [
  { label: "New Appointment", href: "/admin/appointments", icon: Calendar },
  { label: "Add Doctor", href: "/admin/doctors/new", icon: Plus },
  { label: "Write Post", href: "/admin/blog/new", icon: FileText },
  { label: "Upload Photo", href: "/admin/gallery", icon: Image },
]

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [data, setData] = React.useState<DashboardData | null>(null)
  const [loading, setLoading] = React.useState(true)

  const [appointmentsList, setAppointmentsList] = React.useState<AppointmentItem[]>([])
  const [servicesList, setServicesList] = React.useState<ServiceItem[]>([])

  React.useEffect(() => {
    Promise.all([
      fetch("/api/admin").then((r) => r.json()),
      fetch("/api/admin/appointments?pageSize=100").then((r) => r.json()),
      fetch("/api/admin/services?pageSize=100").then((r) => r.json()),
    ])
      .then(([dashboardJson, appointmentsJson, servicesJson]) => {
        if (dashboardJson.success) setData(dashboardJson.data)
        if (appointmentsJson.success) setAppointmentsList(appointmentsJson.data.items ?? [])
        if (servicesJson.success) setServicesList(servicesJson.data.items ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const userName = session?.user?.name?.split(" ")[0] ?? "Admin"

  // --- Pie chart data (status distribution) ---
  const pieData = React.useMemo(() => {
    if (!data) return []
    const entries: Array<{ name: string; value: number }> = []
    if (data.pendingAppointments > 0) entries.push({ name: "Pending", value: data.pendingAppointments })
    if (data.confirmedAppointments > 0) entries.push({ name: "Confirmed", value: data.confirmedAppointments })
    if (data.completedAppointments > 0) entries.push({ name: "Completed", value: data.completedAppointments })
    const cancelledCount = appointmentsList.filter((a) => a.status === "cancelled").length
    if (cancelledCount > 0) entries.push({ name: "Cancelled", value: cancelledCount })
    return entries
  }, [data, appointmentsList])

  const pieColors = ["#f59e0b", "#0d9488", "#3b82f6", "#dc2626"]

  // --- Bar chart data (appointments per day, last 7 days) ---
  const barData = React.useMemo(() => {
    const today = new Date()
    const days: DailyChartData[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const label = formatShortDate(key)
      const count = appointmentsList.filter((a) => a.preferredDate?.slice(0, 10) === key).length
      days.push({ date: label, count: String(count) })
    }
    return days
  }, [appointmentsList])

  // --- Horizontal bar chart data (top services) ---
  const serviceData = React.useMemo<ServiceChartData[]>(() => {
    const map = new Map<string, number>()
    for (const svc of servicesList) {
      map.set(svc.title, svc._count?.appointments ?? 0)
    }
    for (const apt of appointmentsList) {
      const title = apt.service?.title
      if (title && !map.has(title)) {
        map.set(title, 0)
      }
    }
    const arr = Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .filter((s) => s.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
    return arr
  }, [servicesList, appointmentsList])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Here&apos;s what&apos;s happening at your practice today.
          </p>
        </div>
        <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
          {formatDate(new Date())}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-6 space-y-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Appointments"
            value={data?.totalAppointments ?? 0}
            icon={Calendar}
          />
          <MetricCard
            title="Total Patients"
            value={data?.totalPatients ?? 0}
            icon={Users}
          />
          <MetricCard
            title="Pending Inquiries"
            value={data?.newInquiries ?? 0}
            icon={Mail}
          />
          <MetricCard
            title="Active Doctors"
            value={data?.totalDoctors ?? 0}
            icon={Stethoscope}
          />
          <MetricCard
            title="Blog Posts"
            value={data?.totalBlogPosts ?? 0}
            icon={FileText}
          />
          <MetricCard
            title="Services"
            value={data?.totalServices ?? 0}
            icon={Inbox}
          />
        </div>
      )}

      {!loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, idx) => (
                          <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontFamily: "var(--font-dm-sans)",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value: string) => (
                          <span className="text-xs text-ink-secondary font-[family-name:var(--font-dm-sans)]">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-ink-muted text-center py-12 font-[family-name:var(--font-dm-sans)]">
                    No appointment data available.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointments This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "var(--font-dm-sans)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "var(--font-dm-sans)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    />
                    <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Services by Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {serviceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={serviceData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "var(--font-dm-sans)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={140}
                      tick={{ fontSize: 11, fill: "#374151", fontFamily: "var(--font-dm-sans)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    />
                    <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-ink-muted text-center py-12 font-[family-name:var(--font-dm-sans)]">
                  No service booking data available yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Appointments</CardTitle>
              <Link href="/admin/appointments">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : data?.recentAppointments && data.recentAppointments.length > 0 ? (
                <div className="space-y-0">
                  {data.recentAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-warm">
                          <Calendar className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)]">
                            {apt.patientName}
                          </p>
                          <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                            {apt.service?.title ?? "General"} &middot; {apt.doctor?.name ?? "Unassigned"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                            {formatDate(apt.preferredDate)}
                          </p>
                          <p className="text-xs text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                            {apt.preferredTime}
                          </p>
                        </div>
                        <Badge variant={statusColor[apt.status] ?? "default"}>
                          {apt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-muted text-center py-8 font-[family-name:var(--font-dm-sans)]">
                  No recent appointments.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center transition-colors duration-200 hover:border-accent hover:bg-accent-light"
                  >
                    <action.icon className="h-5 w-5 text-accent" />
                    <span className="text-xs font-medium text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Link href="/admin/patients">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="py-3 space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  ))}
                </div>
              ) : data?.recentInquiries && data.recentInquiries.length > 0 ? (
                <div className="space-y-0">
                  {data.recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="py-3 border-b border-border-light last:border-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)]">
                          {inquiry.name}
                        </p>
                        <Badge variant={statusColor[inquiry.status] ?? "default"}>
                          {inquiry.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                        {inquiry.subject}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-muted text-center py-8 font-[family-name:var(--font-dm-sans)]">
                  No recent inquiries.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
