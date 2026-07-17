"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Shield, Clock, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { images } from "@/lib/images"

const trustBadges = [
  { icon: Shield, label: "Board-Certified Team" },
  { icon: Clock, label: "Same-Day Appointments" },
  { icon: Star, label: "4.9★ Patient Rating" },
  { icon: Award, label: "20+ Years of Care" },
]

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-b from-surface-warm to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="inline-flex items-center gap-2 bg-accent-light/60 text-accent px-3 py-1.5 rounded-full text-xs font-semibold font-[family-name:var(--font-dm-sans)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now accepting new patients
            </div>

            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-ink mb-6">
              Your smile deserves{" "}
              <span className="text-accent">exceptional care.</span>
            </h1>

            <p className="text-lg text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed max-w-lg mb-8">
              Expert dental care for the whole family. From routine cleanings to
              advanced implant surgery, our board-certified team delivers
              personalized treatment with proven results.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/book">
                  <Button size="lg" className="h-12 px-8 text-sm font-semibold rounded-lg font-[family-name:var(--font-dm-sans)]">
                    Book Appointment
                  </Button>
                </Link>
              </motion.div>
              <motion.a
                href="tel:+12125551234"
                whileHover={{ x: 2 }}
                className="inline-flex items-center gap-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] font-medium hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                (212) 555-1234
              </motion.a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-light/50">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)] font-medium leading-tight">
                      {badge.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                width={images.hero.width}
                height={images.hero.height}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl shadow-lg border border-border p-4 max-w-[280px]"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-ink font-[family-name:var(--font-dm-sans)] font-medium mb-1">
                &ldquo;Best dental experience ever!&rdquo;
              </p>
              <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                Sarah M. · Patient since 2019
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 lg:-right-8 bg-accent text-white rounded-xl shadow-lg px-4 py-3"
            >
              <p className="text-2xl font-bold font-[family-name:var(--font-plus-jakarta)]">15K+</p>
              <p className="text-xs font-[family-name:var(--font-dm-sans)] opacity-90">Happy Patients</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
