"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  Calendar,
  ChevronRight,
  FileText,
  LogOut,
  Mail,
  Menu,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { cn } from "@/lib/utils"
import { getInitials } from "@/lib/utils"

interface Notification {
  id: string
  type: "appointment" | "inquiry" | "newsletter"
  title: string
  description: string
  link: string
  createdAt: string
  read: boolean
}

interface SearchResult {
  type: string
  id: string
  title: string
  subtitle: string
  link: string
}

interface GroupedSearchResults {
  type: string
  label: string
  results: SearchResult[]
}

const notificationIcons: Record<Notification["type"], React.ReactNode> = {
  appointment: <Calendar className="h-4 w-4" />,
  inquiry: <Mail className="h-4 w-4" />,
  newsletter: <FileText className="h-4 w-4" />,
}

const searchResultIcons: Record<string, React.ReactNode> = {
  appointment: <Calendar className="h-4 w-4" />,
  inquiry: <Mail className="h-4 w-4" />,
  blog: <FileText className="h-4 w-4" />,
  doctor: <Stethoscope className="h-4 w-4" />,
  service: <Users className="h-4 w-4" />,
}

function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

const breadcrumbMap: Record<string, string> = {
  admin: "Dashboard",
  appointments: "Appointments",
  patients: "Inquiries",
  doctors: "Doctors",
  services: "Services",
  blog: "Blog",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  insurance: "Insurance",
  settings: "Settings",
  new: "New",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<GroupedSearchResults[]>([])
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchLoading, setSearchLoading] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const searchDropdownRef = React.useRef<HTMLDivElement>(null)

  // Notification state
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const notificationsDropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (status === "unauthenticated" && !pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [status, pathname, router])

  // Fetch notifications on mount
  React.useEffect(() => {
    if (status !== "authenticated") return
    fetch("/api/admin/notifications")
      .then((res) => res.json())
      .then((json: { data: { notifications: Notification[] } }) => setNotifications(json.data?.notifications ?? []))
      .catch(() => setNotifications([]))
  }, [status])

  // Debounced search
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSearchOpen(false)
      return
    }

    const timer = setTimeout(() => {
      setSearchLoading(true)
      fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then((res) => res.json())
        .then((data: SearchResult[]) => {
          const grouped = data.reduce<GroupedSearchResults[]>((acc, item) => {
            const existing = acc.find((g) => g.type === item.type)
            if (existing) {
              existing.results.push(item)
            } else {
              const labelMap: Record<string, string> = {
                appointment: "Appointments",
                inquiry: "Inquiries",
                blog: "Blog",
                doctor: "Doctors",
                service: "Services",
              }
              acc.push({
                type: item.type,
                label: labelMap[item.type] || item.type,
                results: [item],
              })
            }
            return acc
          }, [])

          // Cap at 5 groups, 3 results each
          const capped = grouped
            .slice(0, 5)
            .map((g) => ({ ...g, results: g.results.slice(0, 3) }))

          setSearchResults(capped)
          setSearchOpen(true)
        })
        .catch(() => {
          setSearchResults([])
          setSearchOpen(false)
        })
        .finally(() => setSearchLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Click outside handlers
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false)
      }
      if (
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setSearchOpen(false)
      searchInputRef.current?.blur()
    }
  }

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    fetch(`/api/admin/notifications/${id}/read`, { method: "POST" }).catch(() =>
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      )
    )
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    fetch("/api/admin/notifications/read-all", { method: "POST" }).catch(
      () => {}
    )
  }

  if (pathname.includes("/admin/login")) {
    return <>{children}</>
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    )
  }

  const user = session?.user
  const userName = user?.name || "Admin"
  const userRole = user?.role || "admin"

  const pathParts = pathname.split("/").filter(Boolean)
  const breadcrumbs = pathParts.map((part, i) => ({
    label: breadcrumbMap[part] || part,
    href: "/" + pathParts.slice(0, i + 1).join("/"),
    isLast: i === pathParts.length - 1,
  }))

  const unreadCount = notifications.filter((n) => !n.read).length

  const todayNotifications = notifications.filter((n) => isToday(n.createdAt))
  const earlierNotifications = notifications.filter((n) => !isToday(n.createdAt))

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName={userName}
        userRole={userRole}
      />

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "transition-all duration-300 ease-out",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <nav className="flex items-center gap-1 text-sm font-[family-name:var(--font-dm-sans)]">
              {breadcrumbs.map((bc, i) => (
                <React.Fragment key={bc.href}>
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-muted" />}
                  {bc.isLast ? (
                    <span className="font-medium text-ink">{bc.label}</span>
                  ) : (
                    <Link href={bc.href} className="text-ink-muted hover:text-ink transition-colors">
                      {bc.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block" ref={searchDropdownRef}>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-ink-muted" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) setSearchOpen(true)
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="h-9 w-56 rounded-md border border-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
                />
              </div>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-80 rounded-lg border border-border bg-surface shadow-lg overflow-hidden"
                  >
                    <div className="max-h-80 overflow-y-auto">
                      {searchLoading ? (
                        <div className="flex items-center justify-center py-6">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent" />
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="py-6 text-center text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
                          No results found
                        </div>
                      ) : (
                        <div className="py-1">
                          {searchResults.map((group) => (
                            <div key={group.type}>
                              <div className="px-3 py-1.5 text-xs font-medium text-ink-muted uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                                {group.label}
                              </div>
                              {group.results.map((result) => (
                                <Link
                                  key={`${result.type}-${result.id}`}
                                  href={result.link}
                                  onClick={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                  className="flex items-center gap-3 px-3 py-2 hover:bg-surface-warm transition-colors"
                                >
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-ink-muted">
                                    {searchResultIcons[result.type] || <Search className="h-4 w-4" />}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-ink truncate font-[family-name:var(--font-dm-sans)]">
                                      {result.title}
                                    </p>
                                    <p className="text-xs text-ink-muted truncate font-[family-name:var(--font-dm-sans)]">
                                      {result.subtitle}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationsDropdownRef}>
              <button
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="relative rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-warm hover:text-ink"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-80 rounded-lg border border-border bg-surface shadow-lg overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <h3 className="text-sm font-semibold text-ink font-[family-name:var(--font-dm-sans)]">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-accent hover:text-accent/80 transition-colors font-[family-name:var(--font-dm-sans)]"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
                          No notifications
                        </div>
                      ) : (
                        <>
                          {todayNotifications.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-xs font-medium text-ink-muted uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                                Today
                              </div>
                              {todayNotifications.map((notification) => (
                                <NotificationItem
                                  key={notification.id}
                                  notification={notification}
                                  onMarkAsRead={markAsRead}
                                />
                              ))}
                            </div>
                          )}

                          {earlierNotifications.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-xs font-medium text-ink-muted uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                                Earlier
                              </div>
                              {earlierNotifications.map((notification) => (
                                <NotificationItem
                                  key={notification.id}
                                  notification={notification}
                                  onMarkAsRead={markAsRead}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">
                {getInitials(userName)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-ink leading-tight font-[family-name:var(--font-dm-sans)]">{userName}</p>
                <p className="text-xs text-ink-muted leading-tight font-[family-name:var(--font-dm-sans)] capitalize">{userRole.replace("_", " ")}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-warm hover:text-ink"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
}) {
  return (
    <Link
      href={notification.link}
      onClick={() => {
        if (!notification.read) onMarkAsRead(notification.id)
      }}
      className={cn(
        "flex gap-3 px-4 py-3 hover:bg-surface-warm transition-colors",
        !notification.read && "bg-accent/5"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          notification.type === "appointment"
            ? "bg-blue-100 text-blue-600"
            : notification.type === "inquiry"
              ? "bg-amber-100 text-amber-600"
              : "bg-purple-100 text-purple-600"
        )}
      >
        {notificationIcons[notification.type]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            "text-sm font-medium text-ink truncate font-[family-name:var(--font-dm-sans)]",
            !notification.read && "font-semibold"
          )}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
          )}
        </div>
        <p className="text-xs text-ink-muted truncate font-[family-name:var(--font-dm-sans)]">
          {notification.description}
        </p>
        <p className="text-xs text-ink-faint mt-0.5 font-[family-name:var(--font-dm-sans)]">
          {timeAgo(notification.createdAt)}
        </p>
      </div>
    </Link>
  )
}
