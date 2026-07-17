"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: string
  featured?: boolean
  imageKey: keyof typeof images
}

interface BlogContentProps {
  featured?: BlogPost
  remaining: BlogPost[]
}

function BlogContent({ featured, remaining }: BlogContentProps) {
  return (
    <>
      {featured && (
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <ScrollReveal>
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border-light">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={images[featured.imageKey].src}
                        alt={images[featured.imageKey].alt}
                        width={images[featured.imageKey].width}
                        height={images[featured.imageKey].height}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)]">
                      {featured.category}
                    </p>
                    <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.readingTime}</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {remaining.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border-light bg-surface-warm">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={images[post.imageKey].src}
                        alt={images[post.imageKey].alt}
                        width={images[post.imageKey].width}
                        height={images[post.imageKey].height}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)]">
                      {post.category}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-plus-jakarta)] text-xl text-ink group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogContent
