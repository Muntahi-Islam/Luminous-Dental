"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const transformations = [
  {
    treatment: "Teeth Whitening",
    quote: "I couldn't believe the difference after just one session.",
    image: images.beforeAfter1,
  },
  {
    treatment: "Porcelain Veneers",
    quote: "My smile finally matches how I feel inside.",
    image: images.beforeAfter2,
  },
  {
    treatment: "Invisalign",
    quote: "Straight teeth without anyone knowing I was in treatment.",
    image: images.beforeAfter3,
  },
]

export default function GalleryPreview() {
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              Transformations
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Results that speak.
            </h2>
            <p className="mt-3 text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-2xl">
              Real outcomes from real patients — see the difference expert dental care makes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {transformations.map((item, i) => (
            <ScrollReveal key={item.treatment} delay={0.15 + i * 0.1}>
              <div className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-5">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-white font-semibold font-[family-name:var(--font-dm-sans)] bg-ink/60 px-2 py-1 rounded">
                      Before
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white font-semibold font-[family-name:var(--font-dm-sans)] bg-accent/80 px-2 py-1 rounded">
                      After
                    </span>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-2">
                  {item.treatment}
                </p>
                <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1 text-sm text-accent font-medium font-[family-name:var(--font-dm-sans)] hover:text-accent-hover transition-colors"
            >
              View gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
