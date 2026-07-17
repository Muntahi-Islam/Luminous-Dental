"use client"

import { motion } from "framer-motion"
import { Shield, Cpu, ClipboardList, CreditCard, PhoneCall } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const commitments = [
  {
    icon: Shield,
    title: "Board-Certified Specialists",
    description:
      "Every member of our clinical team holds board certification in their specialty.",
  },
  {
    icon: Cpu,
    title: "State-of-the-Art Technology",
    description:
      "Advanced 3D imaging, laser dentistry, and digital treatment planning.",
  },
  {
    icon: ClipboardList,
    title: "Personalized Treatment Plans",
    description:
      "Individualized care based on your unique needs, goals, and timeline.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    description:
      "Interest-free financing, most insurance accepted, transparent pricing.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Emergency Care",
    description:
      "Dental emergencies don't wait — our on-call team is available around the clock.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-surface-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              Why Choose Us
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Built on trust, driven by precision
            </h2>
            <p className="mt-3 text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-2xl mx-auto">
              We combine advanced technology with compassionate care to deliver
              results that last.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {commitments.map((item, i) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="text-center p-6 bg-white rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-light/50 mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-semibold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
