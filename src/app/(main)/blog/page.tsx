import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import BlogContent from "./blog-content"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert dental health insights, oral care tips, and practice news from our team of dental professionals.",
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: string
  featured?: boolean
  imageKey: keyof typeof import("@/lib/images").images
}

const posts: BlogPost[] = [
  {
    slug: "why-regular-dental-visits-matter-more-than-you-think",
    title: "Why Regular Dental Visits Matter More Than You Think",
    excerpt:
      "Skipping dental check-ups may seem harmless, but preventive visits catch problems early when they're smaller, less expensive, and less invasive to treat.",
    category: "General",
    author: "Dr. Sarah Mitchell",
    date: "January 8, 2025",
    readingTime: "5 min read",
    featured: true,
    imageKey: "blogDentalHealth",
  },
  {
    slug: "the-truth-about-teeth-whitening",
    title: "The Truth About Teeth Whitening: What Works and What Doesn\u2019t",
    excerpt:
      "Not all whitening products are created equal. We break down the science behind professional and over-the-counter options so you can make informed choices.",
    category: "Cosmetic",
    author: "Dr. Sarah Mitchell",
    date: "December 15, 2024",
    readingTime: "4 min read",
    imageKey: "blogWhitening",
  },
  {
    slug: "dental-implants-a-permanent-solution-for-missing-teeth",
    title: "Dental Implants: A Permanent Solution for Missing Teeth",
    excerpt:
      "When a tooth is lost, the jawbone begins to deteriorate. Dental implants address this by replacing the root itself, not just the visible crown.",
    category: "Restorative",
    author: "Dr. James Chen",
    date: "December 3, 2024",
    readingTime: "6 min read",
    imageKey: "blogCheckups",
  },
  {
    slug: "helping-children-feel-comfortable-at-the-dentist",
    title: "Helping Children Feel Comfortable at the Dentist",
    excerpt:
      "A child's early dental experiences shape their relationship with oral health for life. Practical strategies for parents preparing kids for dental visits.",
    category: "Pediatric",
    author: "Dr. Emily Rodriguez",
    date: "November 20, 2024",
    readingTime: "4 min read",
    imageKey: "blogChild",
  },
  {
    slug: "invisalign-vs-traditional-braces-which-is-right-for-you",
    title: "Invisalign vs. Traditional Braces: Which Is Right for You?",
    excerpt:
      "Both approaches effectively straighten teeth, but they differ significantly in comfort, appearance, and lifestyle impact. Here\u2019s an honest comparison.",
    category: "Orthodontics",
    author: "Dr. James Chen",
    date: "November 8, 2024",
    readingTime: "5 min read",
    imageKey: "invisalign",
  },
  {
    slug: "understanding-gum-disease-early-warning-signs",
    title: "Understanding Gum Disease: Early Warning Signs",
    excerpt:
      "Gum disease is the leading cause of tooth loss in adults, yet it often develops without noticeable symptoms. Recognizing early signs can prevent serious consequences.",
    category: "General",
    author: "Dr. Amanda Foster",
    date: "October 25, 2024",
    readingTime: "5 min read",
    imageKey: "blogCheckups",
  },
  {
    slug: "porcelain-veneers-what-to-expect",
    title: "Porcelain Veneers: What to Expect From Start to Finish",
    excerpt:
      "From initial consultation to final bonding, a complete guide to the porcelain veneer process including planning, preparation, and long-term maintenance.",
    category: "Cosmetic",
    author: "Dr. Sarah Mitchell",
    date: "October 12, 2024",
    readingTime: "6 min read",
    imageKey: "blogWhitening",
  },
  {
    slug: "how-diet-affects-your-dental-health",
    title: "How Your Diet Affects Your Dental Health",
    excerpt:
      "Beyond sugar, several dietary factors influence your risk of cavities, gum disease, and enamel erosion. What you eat matters as much as how you brush.",
    category: "Preventive",
    author: "Dr. Sarah Mitchell",
    date: "September 28, 2024",
    readingTime: "4 min read",
    imageKey: "blogDentalHealth",
  },
]

function BlogPage() {
  const featured = posts.find((p) => p.featured)
  const remaining = posts.filter((p) => !p.featured)

  return (
    <main>
      <PageHeader title="Blog" subtitle="Dental health insights." />

      <BlogContent featured={featured} remaining={remaining} />
    </main>
  )
}

export default BlogPage
