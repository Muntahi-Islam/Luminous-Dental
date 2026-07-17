"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
  { day: "Saturday", time: "9:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
]

export default function LocationSection() {
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              Visit Us
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Find us easily.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ScrollReveal>
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-border">
              <Image
                src={images.clinicInterior.src}
                alt={images.clinicInterior.alt}
                width={images.clinicInterior.width}
                height={images.clinicInterior.height}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3 border border-border">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <p className="text-sm text-ink font-medium font-[family-name:var(--font-dm-sans)]">
                  123 Wellness Ave, Suite 200
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col justify-center">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-ink mb-6">
                Hours
              </h3>
              <div className="mb-8">
                {hours.map((item, i) => (
                  <div
                    key={item.day}
                    className="flex justify-between py-3 border-b border-border text-sm font-[family-name:var(--font-dm-sans)]"
                  >
                    <span className="text-ink-secondary">{item.day}</span>
                    <span className="text-ink font-medium">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 mb-8">
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-ink mb-4">
                  Contact
                </h3>
                <div className="space-y-3">
                  <motion.a
                    href="tel:5551234567"
                    className="flex items-center gap-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] hover:text-ink transition-colors"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="h-4 w-4 text-ink-muted" />
                    (555) 123-4567
                  </motion.a>
                  <motion.a
                    href="mailto:hello@luminousdental.com"
                    className="flex items-center gap-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] hover:text-ink transition-colors"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="h-4 w-4 text-ink-muted" />
                    hello@luminousdental.com
                  </motion.a>
                  <motion.a
                    href="tel:5551239111"
                    className="flex items-center gap-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] hover:text-ink transition-colors"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="h-4 w-4 text-ink-muted" />
                    Emergency: (555) 123-9111
                  </motion.a>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-accent font-medium font-[family-name:var(--font-dm-sans)] hover:text-accent-hover transition-colors"
                >
                  Get directions
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1 text-sm text-accent font-medium font-[family-name:var(--font-dm-sans)] hover:text-accent-hover transition-colors"
                >
                  Book a visit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
