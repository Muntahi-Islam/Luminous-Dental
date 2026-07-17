"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const technologies = [
  {
    name: "3D Digital Scanning",
    description:
      "Eliminate messy impressions with precise digital models of your teeth, created in under two minutes.",
    brand: "iTero Element 5D",
    image: images.intraoralCamera,
  },
  {
    name: "Digital X-Rays",
    description:
      "High-resolution imaging with up to 90% less radiation than traditional film X-rays.",
    brand: "Dexis Platinum",
    image: images.digitalXray,
  },
  {
    name: "Laser Dentistry",
    description:
      "Minimally invasive soft tissue procedures with faster healing and reduced discomfort.",
    brand: "Waterlase iPlus",
    image: images.dentalLaser,
  },
  {
    name: "CAD/CAM Restorations",
    description:
      "Custom crowns, veneers, and bridges designed and milled in a single visit.",
    brand: "CEREC Primescan",
    image: images.cadCam,
  },
]

export default function TechnologySection() {
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
                Technology
              </p>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink leading-[1.1] mb-6">
                Precision at every step.
              </h2>
              <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed max-w-md">
                We invest in advanced technology not because it&apos;s trendy,
                but because it produces better outcomes, faster recovery, and
                a more comfortable experience for every patient.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            {technologies.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={0.15 + i * 0.1}>
                <motion.div
                  className="py-6 border-b border-border last:border-b-0"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
                      <Image
                        src={tech.image.src}
                        alt={tech.image.alt}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-ink mb-1">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed max-w-lg mb-2">
                        {tech.description}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)] font-medium">
                        {tech.brand}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
