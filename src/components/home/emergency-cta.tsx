"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function EmergencyCTA() {
  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <motion.div
            className="border-l-2 border-accent bg-surface-warm rounded-xl p-8 md:p-12"
            initial={{ borderLeftWidth: 0 }}
            whileInView={{ borderLeftWidth: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-ink mb-2">
                  Dental emergency?
                </h2>
                <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                  Our emergency line is staffed around the clock. We&apos;re here when you need us most.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4">
                <motion.a
                  href="tel:5551239111"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-ink flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  (555) 123-9111
                </motion.a>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild variant="default">
                    <a href="tel:5551239111">Call Now</a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
