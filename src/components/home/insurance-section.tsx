"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

const providers = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "BlueCross",
  "United Healthcare",
  "Humana",
  "Guardian",
]

export default function InsuranceSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="py-16 border-t border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted font-[family-name:var(--font-dm-sans)] shrink-0">
            Insurance
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {providers.map((provider, i) => (
              <span key={provider} className="flex items-center">
                {i > 0 && (
                  <span className="text-ink-faint mx-3">·</span>
                )}
                <span className="text-sm text-ink-faint font-[family-name:var(--font-dm-sans)] hover:text-ink-muted transition-colors cursor-default">
                  {provider}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)] mt-4 ml-0 sm:ml-[120px]"
        >
          We accept most major plans. Call us to verify yours.
        </motion.p>
      </div>
    </section>
  )
}
