"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with a thorough examination, digital imaging, and a conversation about your goals and concerns.",
  },
  {
    number: "02",
    title: "Treatment Plan",
    description:
      "Receive a clear, customized plan with transparent pricing, timeline, and options tailored to your needs.",
  },
  {
    number: "03",
    title: "Treatment",
    description:
      "Your procedure is performed with precision, comfort, and the highest clinical standards in modern dentistry.",
  },
  {
    number: "04",
    title: "Follow-Up",
    description:
      "We monitor your recovery, provide aftercare guidance, and ensure lasting results at every stage.",
  },
]

export default function ProcessTreatment() {
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              How It Works
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Four steps to your new smile.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={0.15 + i * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-[family-name:var(--font-plus-jakarta)] text-4xl text-accent font-bold mb-4"
                >
                  {step.number}
                </motion.p>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
