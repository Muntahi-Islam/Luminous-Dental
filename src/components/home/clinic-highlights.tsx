"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const highlights = [
  {
    title: "Same-Day Appointments",
    description:
      "We keep emergency slots open every day for patients who need immediate care.",
  },
  {
    title: "Advanced Technology",
    description:
      "From 3D scanning to laser treatments, we invest in tools that improve outcomes and comfort.",
  },
  {
    title: "Transparent Pricing",
    description:
      "No surprises. We discuss costs before treatment and help maximize your insurance benefits.",
  },
  {
    title: "Gentle Approach",
    description:
      "Dental anxiety is real. Our team is trained to make every visit as comfortable as possible.",
  },
]

export default function ClinicHighlights() {
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
            Why Luminous
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink mb-4">
            Details matter.
          </h2>
          <p className="text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-2xl mb-12">
            We focus on the details that make dental care safer, more comfortable, and more effective.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src={images.clinicInterior.src}
                  alt={images.clinicInterior.alt}
                  width={images.clinicInterior.width}
                  height={images.clinicInterior.height}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.2 + i * 0.1}>
                <div className="border-l-2 border-accent pl-6">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
