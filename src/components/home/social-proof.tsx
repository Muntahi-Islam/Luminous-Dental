"use client"

import { motion } from "framer-motion"
import { Shield, Award, Star, Users, Clock } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const badges = [
  { icon: Shield, text: "ADA Accredited" },
  { icon: Award, text: "Top Dentist NYC 2024" },
  { icon: Star, text: "4.9★ Google Rating" },
  { icon: Users, text: "15,000+ Patients" },
  { icon: Clock, text: "24/7 Emergency Line" },
]

export default function SocialProof() {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {badges.map((badge, i) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-ink-muted"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium font-[family-name:var(--font-dm-sans)] whitespace-nowrap">
                    {badge.text}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
