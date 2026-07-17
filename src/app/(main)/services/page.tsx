"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import { services } from "@/data/services"
import { images } from "@/lib/images"

const categories = [
  { label: "All", value: "all" },
  { label: "Preventive", value: "preventive" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Restorative", value: "restorative" },
  { label: "Orthodontics", value: "orthodontics" },
  { label: "Emergency", value: "emergency" },
] as const

type CategoryFilter = (typeof categories)[number]["value"]

const serviceImages: Record<string, keyof typeof images> = {
  "emergency-dentistry": "emergencyDentistry",
  "dental-implants": "dentalImplant",
  "cosmetic-dentistry": "cosmeticDentistry",
  "teeth-whitening": "teethWhitening",
  "invisalign": "invisalign",
  "pediatric-dentistry": "pediatricDentistry",
  "root-canal": "rootCanal",
  "crowns": "dentalCrown",
  "veneers": "veneers",
  "general-dentistry": "dentalExam",
}

function ServicesPage() {
  const [active, setActive] = useState<CategoryFilter>("all")

  const filtered = services.filter((s) => {
    if (active === "all") return true
    if (active === "orthodontics") return s.slug === "invisalign"
    return s.category === active
  })

  return (
    <main>
      <PageHeader
        title="Services"
        subtitle="Complete dental care under one roof."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-5 py-3 text-sm font-[family-name:var(--font-dm-sans)] uppercase tracking-wide transition-colors duration-200 -mb-px ${
                  active === cat.value
                    ? "text-ink border-b-2 border-accent"
                    : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.map((service, i) => {
            const imgKey = serviceImages[service.slug]
            const img = imgKey ? images[imgKey] : null
            return (
              <ScrollReveal key={service.slug} delay={i * 0.05}>
                <div>
                  {i === 0 && <div className="border-t border-border" />}
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between py-8 border-t border-border transition-colors duration-200"
                  >
                    <div className="flex items-center gap-6">
                      {img && (
                        <motion.div
                          className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border-light"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                      <div className="max-w-2xl">
                        <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl text-ink group-hover:text-accent transition-colors duration-200">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      className="ml-6 text-ink-muted group-hover:text-accent transition-colors duration-200 text-lg"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
