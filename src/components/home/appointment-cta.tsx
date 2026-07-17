"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function AppointmentCTA() {
  return (
    <section className="py-20 md:py-24 border-t border-border bg-surface-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink mb-4">
            Ready to begin?
          </h2>
          <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] mb-8 max-w-lg mx-auto">
            Schedule your consultation today. No referral necessary. New patients always welcome.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button asChild size="lg" className="px-8 h-12 text-sm font-semibold font-[family-name:var(--font-dm-sans)]">
              <Link href="/book">
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mt-6">
            Or call{" "}
            <a
              href="tel:5551234567"
              className="text-ink font-medium hover:text-accent transition-colors"
            >
              (555) 123-4567
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
