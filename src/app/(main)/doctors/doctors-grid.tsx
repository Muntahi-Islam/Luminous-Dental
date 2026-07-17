"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"
import type { Doctor } from "@/data/doctors"

const doctorPhotos: Record<string, keyof typeof images> = {
  "dr-sarah-mitchell": "doctorFemale1",
  "dr-james-chen": "doctorMale1",
  "dr-emily-rodriguez": "doctorFemale2",
  "dr-michael-park": "doctorMale1",
  "dr-amanda-foster": "doctorFemale1",
}

interface DoctorsGridProps {
  doctors: Doctor[]
}

function DoctorsGrid({ doctors }: DoctorsGridProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {doctors.map((doctor, i) => {
            const photoKey = doctorPhotos[doctor.id]
            const photo = photoKey ? images[photoKey] : null
            return (
              <ScrollReveal key={doctor.id} delay={i * 0.1}>
                <div>
                  <Link href={`/doctors/${doctor.slug}`} className="group block">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border-light bg-surface-warm">
                      {photo ? (
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-[family-name:var(--font-plus-jakarta)] text-6xl text-accent-muted">
                            {doctor.initials}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="mt-6">
                    <Link href={`/doctors/${doctor.slug}`}>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl text-ink group-hover:text-accent transition-colors duration-200">
                        {doctor.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                      {doctor.title}
                    </p>
                    <p className="mt-3 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      {doctor.specializations.join(" · ")}
                    </p>
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      className="inline-block mt-4 text-sm text-accent hover:text-accent-hover font-[family-name:var(--font-dm-sans)] transition-colors duration-200"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DoctorsGrid
