"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Founder & Lead Prosthodontist",
    specializations: ["Prosthodontics", "Cosmetic Dentistry", "Implants"],
    image: images.doctorFemale1,
    slug: "sarah-mitchell",
  },
  {
    name: "Dr. James Chen",
    title: "Orthodontics & Implants",
    specializations: ["Orthodontics", "Implant Surgery", "Invisalign"],
    image: images.doctorMale1,
    slug: "james-chen",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Pediatric Dentistry",
    specializations: ["Pediatric Care", "Preventive Dentistry", "Sedation"],
    image: images.doctorFemale2,
    slug: "emily-rodriguez",
  },
]

export default function MeetDoctorsPreview() {
  return (
    <section className="py-20 md:py-24 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              Our Team
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Faces you can trust.
            </h2>
            <p className="mt-3 text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-2xl">
              Board-certified specialists with decades of combined experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {doctors.map((doctor, i) => (
            <ScrollReveal key={doctor.slug} delay={0.15 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-accent/30 transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={doctor.image.src}
                      alt={doctor.image.alt}
                      width={doctor.image.width}
                      height={doctor.image.height}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-ink mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] mb-3">
                    {doctor.title}
                  </p>
                  <p className="text-xs text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-4">
                    {doctor.specializations.join(" · ")}
                  </p>
                  <Link
                    href={`/team/${doctor.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-accent font-[family-name:var(--font-dm-sans)] hover:text-accent-hover transition-colors font-medium"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
