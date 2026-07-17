"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Phone,
  Smile,
  Sparkles,
  Sun,
  AlignVerticalSpaceAround,
  Baby,
  ArrowRight,
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const services = [
  {
    title: "Emergency Dentistry",
    description: "Immediate care for urgent dental situations, available 24/7.",
    slug: "emergency-dentistry",
    icon: Phone,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Dental Implants",
    description: "Permanent tooth replacement with natural-looking results.",
    slug: "dental-implants",
    icon: Smile,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and contouring.",
    slug: "cosmetic-dentistry",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Teeth Whitening",
    description: "Professional-grade whitening for a brighter, confident smile.",
    slug: "teeth-whitening",
    icon: Sun,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Invisalign",
    description: "Clear aligner therapy for discreet, comfortable teeth straightening.",
    slug: "invisalign",
    icon: AlignVerticalSpaceAround,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Pediatric Dentistry",
    description: "Gentle, specialized care for children and adolescents.",
    slug: "pediatric-dentistry",
    icon: Baby,
    color: "bg-pink-50 text-pink-600",
  },
]

export default function FeaturedServices() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-3">
              Our Services
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-ink">
              Comprehensive dental care
            </h2>
            <p className="mt-3 text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-2xl mx-auto">
              From preventive cleanings to advanced surgical procedures, we offer
              everything your family needs under one roof.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-6 bg-surface-warm rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.color} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-ink mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent font-[family-name:var(--font-dm-sans)] group-hover:gap-2 transition-all duration-200">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors font-[family-name:var(--font-dm-sans)]"
            >
              View all 10 services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
