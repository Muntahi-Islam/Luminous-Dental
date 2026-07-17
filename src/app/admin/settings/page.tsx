"use client"

import * as React from "react"
import {
  Save,
  Building2,
  Clock,
  Phone,
  Share2,
  Search,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Setting {
  id: number
  key: string
  value: string
  group: string
}

const groupMeta: Record<string, { label: string; icon: React.ElementType }> = {
  clinic: { label: "Clinic Info", icon: Building2 },
  hours: { label: "Hours", icon: Clock },
  contact: { label: "Contact", icon: Phone },
  social: { label: "Social", icon: Share2 },
  seo: { label: "SEO", icon: Search },
  branding: { label: "Branding", icon: Palette },
}

export default function SettingsPage() {
  const [settings, setSettings] = React.useState<Setting[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [edited, setEdited] = React.useState<Record<string, string>>({})
  const [toast, setToast] = React.useState<{ type: "success" | "error"; message: string } | null>(null)

  React.useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (Array.isArray(data.data)) {
            setSettings(data.data)
          } else {
            const flat: Setting[] = []
            for (const [group, items] of Object.entries(data.data)) {
              if (Array.isArray(items)) {
                for (const item of items) {
                  flat.push({ ...item, group })
                }
              }
            }
            setSettings(flat)
          }
        }
      })
      .catch((err) => console.error("Failed to fetch settings", err))
      .finally(() => setLoading(false))
  }, [])

  const getValue = (key: string) => {
    if (key in edited) return edited[key]
    const s = settings.find((s) => s.key === key)
    return s?.value ?? ""
  }

  const setValue = (key: string, value: string) => {
    setEdited((prev) => ({ ...prev, [key]: value }))
  }

  const getGroupSettings = (group: string) => {
    return settings.filter((s) => s.group === group)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = Object.entries(edited).map(([key, value]) => {
        const existing = settings.find((s) => s.key === key)
        return { key, value, group: existing?.group ?? "clinic" }
      })
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload }),
      })
      if (res.ok) {
        setSettings((prev) => {
          const next = [...prev]
          for (const { key, value, group } of payload) {
            const idx = next.findIndex((s) => s.key === key)
            if (idx !== -1) {
              next[idx] = { ...next[idx], value }
            } else {
              next.push({ id: Date.now(), key, value, group })
            }
          }
          return next
        })
        setEdited({})
        setToast({ type: "success", message: "Settings saved successfully!" })
      } else {
        setToast({ type: "error", message: "Failed to save settings." })
      }
    } catch {
      setToast({ type: "error", message: "Failed to save settings." })
    } finally {
      setSaving(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const groups = Object.keys(groupMeta).filter((g) =>
    settings.some((s) => s.group === g)
  )
  const defaultTab = groups[0] || "clinic"

  const renderGroup = (group: string) => {
    const items = getGroupSettings(group)
    if (items.length === 0) return null

    return (
      <div key={group} className="space-y-3">
        {items.map((s) => {
          const currentVal = getValue(s.key)
          const isTextarea = s.key.includes("description") || s.key.includes("notes") || s.key.includes("about") || s.key.includes("bio") || s.key.includes("content")

          if (s.key.includes("enabled") || s.key.includes("active") || s.key.includes("toggle")) {
            return (
              <div key={s.key} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)] capitalize">
                  {s.key.replace(/[_-]/g, " ")}
                </p>
                <Switch
                  checked={currentVal === "true" || currentVal === "1"}
                  onCheckedChange={(checked) => setValue(s.key, checked ? "true" : "false")}
                />
              </div>
            )
          }

          if (isTextarea) {
            return (
              <Textarea
                key={s.key}
                label={s.key.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                value={currentVal}
                onChange={(e) => setValue(s.key, e.target.value)}
                className="min-h-[80px]"
              />
            )
          }

          return (
            <Input
              key={s.key}
              label={s.key.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              value={currentVal}
              onChange={(e) => setValue(s.key, e.target.value)}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Settings
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Configure your clinic&apos;s website and admin preferences.
          </p>
        </div>
        {Object.keys(edited).length > 0 && (
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : `Save Changes (${Object.keys(edited).length})`}
          </Button>
        )}
      </div>

      {toast && (
        <div className={cn(
          "rounded-lg border px-4 py-3 text-sm font-[family-name:var(--font-dm-sans)]",
          toast.type === "success"
            ? "border-success/30 bg-success-light text-success"
            : "border-danger/30 bg-danger-light text-danger"
        )}>
          {toast.message}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent className="p-6 space-y-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-surface-warm rounded w-24" />
                <div className="h-10 bg-surface-warm rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : settings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No settings found.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList>
            {(groups.length > 0 ? groups : Object.keys(groupMeta)).map((g) => {
              const meta = groupMeta[g]
              const Icon = meta?.icon
              return (
                <TabsTrigger key={g} value={g} className="gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {meta?.label || g}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {(groups.length > 0 ? groups : Object.keys(groupMeta)).map((group) => (
            <TabsContent key={group} value={group}>
              <Card>
                <CardHeader>
                  <CardTitle>{groupMeta[group]?.label || group}</CardTitle>
                  <CardDescription>
                    Manage your {groupMeta[group]?.label?.toLowerCase() || group} settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderGroup(group)}
                  <div className="flex justify-end pt-2">
                    <Button loading={saving} onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save {groupMeta[group]?.label || group}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
