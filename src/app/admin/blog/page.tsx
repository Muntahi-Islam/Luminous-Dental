"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus,
  Trash2,
  Star,
  Search as SearchIcon,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
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
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string
  readingTime: number
  featured: boolean
  published: boolean
  publishedAt: string | null
  createdAt: string
  _count?: { comments: number }
}

interface BlogResponse {
  success: boolean
  data: {
    items: BlogPost[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export default function BlogPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [total, setTotal] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const [showDelete, setShowDelete] = React.useState<BlogPost | null>(null)
  const [deleting, setDeleting] = React.useState(false)
  const [togglingId, setTogglingId] = React.useState<number | null>(null)
  const [refreshKey, setRefreshKey] = React.useState(0)

  React.useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" })
    if (search) params.set("search", search)
    if (statusFilter === "published") params.set("published", "true")
    if (statusFilter === "draft") params.set("published", "false")
    fetch(`/api/admin/blog?${params}`)
      .then((r) => r.json())
      .then((json: BlogResponse) => {
        if (json.success) {
          setPosts(json.data.items)
          setTotal(json.data.total)
          setTotalPages(json.data.totalPages)
        }
      })
      .catch(() => toast.error("Failed to load blog posts."))
      .finally(() => setLoading(false))
  }, [page, search, statusFilter, refreshKey])

  const togglePublished = async (post: BlogPost) => {
    setTogglingId(post.id)
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      })
      if (!res.ok) throw new Error("Toggle failed")
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, published: !p.published } : p))
      toast.success(post.published ? "Post unpublished" : "Post published")
    } catch {
      toast.error("Failed to update post status.")
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async () => {
    if (!showDelete) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/blog/${showDelete.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Post deleted")
      setShowDelete(null)
      setRefreshKey((k) => k + 1)
    } catch {
      toast.error("Failed to delete post.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            Blog Posts
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Create and manage educational content for your patients.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-[family-name:var(--font-dm-sans)]"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={post.published ? "success" : "warning"}>
                        {post.published ? "published" : "draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default">
                          <Star className="h-3 w-3 mr-0.5" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <h3 className="text-lg font-[family-name:var(--font-plus-jakarta)] font-medium text-ink mt-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      <span>{post.author}</span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                      {post._count && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post._count.comments}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-sm font-[family-name:var(--font-dm-sans)]">
                      <Switch
                        checked={post.published}
                        onCheckedChange={() => togglePublished(post)}
                        disabled={togglingId === post.id}
                      />
                      <span className="text-xs text-ink-muted">
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-danger hover:text-danger"
                      onClick={() => setShowDelete(post)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">No blog posts found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
            {total} posts total
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

      <Dialog open={!!showDelete} onOpenChange={(open) => !open && setShowDelete(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Permanently delete &ldquo;{showDelete?.title}&rdquo;? This action cannot be undone.
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
