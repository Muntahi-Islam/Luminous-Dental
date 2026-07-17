"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Users,
  Settings2,
  FileText,
  Image,
  Star,
  HelpCircle,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getInitials } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Inquiries", href: "/admin/patients", icon: Mail },
  { label: "Doctors", href: "/admin/doctors", icon: Users },
  { label: "Services", href: "/admin/services", icon: Settings2 },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Insurance", href: "/admin/insurance", icon: Shield },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
  userName?: string
  userRole?: string
}

export function AdminSidebar({ collapsed, onToggle, userName = "Admin", userRole = "admin" }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0f172a] transition-all duration-300 ease-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        {!collapsed ? (
          <div>
            <span className="text-lg font-[family-name:var(--font-plus-jakarta)] text-white font-bold tracking-tight">
              Luminous
            </span>
            <span className="ml-2 text-xs text-accent font-[family-name:var(--font-dm-sans)] font-medium">Admin</span>
          </div>
        ) : (
          <span className="mx-auto text-lg font-[family-name:var(--font-plus-jakarta)] text-accent font-bold">L</span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-[family-name:var(--font-dm-sans)] transition-colors duration-150",
                active
                  ? "text-white bg-accent/10 border-l-2 border-accent pl-3"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
                collapsed && "justify-center px-2 border-l-0 pl-0 bg-transparent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", active && "text-accent")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">
            {getInitials(userName)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate font-[family-name:var(--font-dm-sans)]">{userName}</p>
              <p className="text-xs text-gray-400 font-[family-name:var(--font-dm-sans)] capitalize">{userRole.replace("_", " ")}</p>
            </div>
          )}
          {!collapsed && (
            <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:text-white">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0f172a] text-gray-400 transition-colors hover:text-white"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  )
}
