"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

const categories = ["Oral Health", "Orthodontics", "Pediatric", "Implants", "Cosmetic", "Tips & Advice", "Practice News"]

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [form, setForm] = React.useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "",
    category: "",
    tags: "",
    featured: false,
    published: false,
  })

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.title.trim()) newErrors.title = "Title is required"
    if (!form.content.trim()) newErrors.content = "Content is required"
    if (!form.category) newErrors.category = "Category is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const savePost = async (publish: boolean) => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          featuredImage: form.featuredImage,
          author: form.author,
          category: form.category,
          tags: form.tags,
          featured: form.featured,
          published: publish,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || "Failed to save")
      }
      toast.success(publish ? "Post published" : "Draft saved")
      router.push("/admin/blog")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-[family-name:var(--font-plus-jakarta)] font-medium text-ink">
            New Blog Post
          </h1>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-1">
            Write and publish educational content for your patients.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => savePost(false)} disabled={loading}>
            Save Draft
          </Button>
          <Button size="sm" loading={loading} onClick={() => savePost(true)}>
            Publish
          </Button>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); savePost(form.published) }}>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Input
                label="Post Title"
                placeholder="Enter your blog post title..."
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                error={errors.title}
              />
              <Textarea
                label="Excerpt"
                placeholder="A brief summary of the post..."
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                className="min-h-[80px]"
              />
              <div className="w-full">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                  Featured Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={form.featuredImage}
                      onChange={(e) => update("featuredImage", e.target.value)}
                      className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-[family-name:var(--font-dm-sans)]"
                    />
                  </div>
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Input
                label="Author"
                placeholder="Author name"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
              />
              <Input
                label="Tags"
                placeholder="Comma-separated tags"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your blog post content here... (Markdown supported)"
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                error={errors.content}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                <span>{wordCount} words</span>
                <span>~{readTime} min read</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                  Category
                </label>
                <Select value={form.category} onValueChange={(v) => update("category", v)}>
                  <SelectTrigger className={errors.category ? "border-danger" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="mt-1.5 text-xs text-danger font-[family-name:var(--font-dm-sans)]">{errors.category}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink">Featured</label>
                <Switch checked={form.featured} onCheckedChange={(v) => update("featured", v)} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink">Published</label>
                <Switch checked={form.published} onCheckedChange={(v) => update("published", v)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
