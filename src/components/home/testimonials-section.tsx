"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const featured = {
  quote:
    "After years of hiding my smile, Luminous Dental gave me the confidence to stop covering my mouth when I laugh. The entire team made me feel like family.",
  name: "Rebecca T.",
}

const testimonials = [
  {
    quote: "Dr. Mitchell explained every step of my implant procedure. No surprises, no pain, just perfect results.",
    name: "David K.",
    treatment: "Dental Implant",
  },
  {
    quote: "My kids actually look forward to their dental visits now. That says everything about this practice.",
    name: "Michelle P.",
    treatment: "Pediatric Care",
  },
  {
    quote: "Professional, efficient, and genuinely kind. I drive 40 minutes to come here — it's worth every mile.",
    name: "Andrew L.",
    treatment: "General Dentistry",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-24 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Star className="h-4 w-4 fill-accent text-accent" />
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-ink-secondary font-semibold font-[family-name:var(--font-dm-sans)]">
              Rated 4.9 out of 5 by 2,400+ patients
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="text-center mb-16">
            <p className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-semibold text-ink leading-relaxed max-w-3xl mx-auto mb-4">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] font-medium">
              — {featured.name}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((item, i) => (
            <ScrollReveal key={item.name} delay={0.3 + i * 0.1}>
              <motion.div
                className="pt-8 border-t border-border"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm text-ink font-semibold font-[family-name:var(--font-dm-sans)]">
                    {item.name}
                  </p>
                  <p className="text-xs text-accent font-[family-name:var(--font-dm-sans)] font-medium mt-1">
                    {item.treatment}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
