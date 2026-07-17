"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Counter } from "@/components/ui/counter"

const stats = [
  { to: 20, suffix: "+", label: "Years" },
  { to: 15000, suffix: "+", label: "Patients" },
  { to: 98, suffix: "%", label: "Satisfaction" },
  { to: 24, suffix: "/7", label: "Emergency Line" },
]

export default function StatsSection() {
  return (
    <section className="py-20 md:py-24 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-[family-name:var(--font-plus-jakarta)] text-5xl md:text-6xl font-bold text-accent">
                  <Counter
                    to={stat.to}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-ink-muted font-semibold font-[family-name:var(--font-dm-sans)] mt-3">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
