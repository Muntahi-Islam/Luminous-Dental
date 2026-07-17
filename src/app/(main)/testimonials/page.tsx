"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Counter } from "@/components/ui/counter"
import { images } from "@/lib/images"

const filterTabs = [
  "All",
  "General",
  "Whitening",
  "Veneers",
  "Implants",
  "Invisalign",
  "Root Canal",
  "Pediatric",
]

const testimonials = [
  {
    id: 1,
    quote:
      "I had avoided the dentist for over a decade due to severe anxiety. Dr. Mitchell and her team made me feel genuinely safe for the first time in a dental chair. No judgment, no pressure — just patient, thoughtful care.",
    stars: 5,
    name: "Margaret L.",
    treatment: "General Dentistry",
    avatarKey: "happySmile3" as keyof typeof images,
  },
  {
    id: 2,
    quote:
      "The teeth whitening results were beyond what I expected. One hour in the chair and my teeth are noticeably brighter. The team was professional and thorough from start to finish.",
    stars: 5,
    name: "David R.",
    treatment: "Whitening",
    avatarKey: "happySmile2" as keyof typeof images,
  },
  {
    id: 3,
    quote:
      "My veneers look completely natural — several friends have commented on how nice my smile looks but nobody has asked if I had dental work done. That was exactly what I wanted.",
    stars: 5,
    name: "Sarah K.",
    treatment: "Veneers",
    avatarKey: "happySmile1" as keyof typeof images,
  },
  {
    id: 4,
    quote:
      "Dr. Chen explained every step of the implant process in terms I could understand. The digital planning gave me confidence before surgery, and the result is indistinguishable from my natural teeth.",
    stars: 5,
    name: "James T.",
    treatment: "Implants",
    avatarKey: "happySmile2" as keyof typeof images,
  },
  {
    id: 5,
    quote:
      "My son was terrified of the dentist. Dr. Rodriguez turned his visit into something he actually looks forward to now. Her ability to connect with children is remarkable.",
    stars: 5,
    name: "Linda M.",
    treatment: "Pediatric",
    avatarKey: "happySmile3" as keyof typeof images,
  },
  {
    id: 6,
    quote:
      "After two root canals with Dr. Mitchell, I can honestly say neither was anywhere near as bad as I feared. The pain relief was almost immediate, and the follow-up care was excellent.",
    stars: 5,
    name: "Robert H.",
    treatment: "Root Canal",
    avatarKey: "happySmile2" as keyof typeof images,
  },
  {
    id: 7,
    quote:
      "I completed Invisalign treatment in seven months. The digital preview sold me on it from the start — seeing exactly how my teeth would move gave me the confidence to begin.",
    stars: 5,
    name: "Emily C.",
    treatment: "Invisalign",
    avatarKey: "happySmile1" as keyof typeof images,
  },
  {
    id: 8,
    quote:
      "After a sports injury knocked out two teeth, the emergency team saw me within the hour. They saved both teeth with implants. I cannot thank them enough for acting so quickly.",
    stars: 5,
    name: "Michael B.",
    treatment: "Implants",
    avatarKey: "happySmile2" as keyof typeof images,
  },
  {
    id: 9,
    quote:
      "The full-mouth rehabilitation I received was transformative. It took several months of careful planning and treatment, but the result is a smile I am proud to show.",
    stars: 5,
    name: "Patricia W.",
    treatment: "Veneers",
    avatarKey: "happySmile3" as keyof typeof images,
  },
  {
    id: 10,
    quote:
      "I was nervous about gum surgery, but Dr. Foster explained the laser-assisted procedure so clearly that I felt prepared. The recovery was faster than I anticipated, and the results speak for themselves.",
    stars: 5,
    name: "Thomas G.",
    treatment: "General",
    avatarKey: "happySmile2" as keyof typeof images,
  },
]

function AnimatedStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.08,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <Star className="w-3 h-3 fill-accent text-accent" />
        </motion.div>
      ))}
    </div>
  )
}

function TestimonialsPage() {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All"
      ? testimonials
      : testimonials.filter((t) => t.treatment === active)

  return (
    <main>
      <PageHeader title="Testimonials" subtitle="What our patients say." />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                <Counter to={49} duration={2} suffix=".9" /> out of 5 from{" "}
                <Counter to={2400} duration={2.5} prefix="" suffix="+" /> patients
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0 border-b border-border">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-3 text-sm font-[family-name:var(--font-dm-sans)] uppercase tracking-wide transition-colors duration-200 -mb-px ${
                  active === tab
                    ? "text-ink border-b-2 border-accent"
                    : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.map((testimonial, i) => {
            const avatar = images[testimonial.avatarKey]
            return (
              <ScrollReveal key={testimonial.id} delay={i * 0.05}>
                <div className="py-8 border-t border-border">
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl text-ink font-semibold leading-relaxed max-w-3xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <AnimatedStars count={testimonial.stars} />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm font-[family-name:var(--font-dm-sans)]">
                    {avatar && (
                      <motion.div
                        className="w-8 h-8 rounded-full overflow-hidden border border-border-light shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                    <span className="text-ink">{testimonial.name}</span>
                    <span className="text-ink-muted">·</span>
                    <span className="text-ink-muted">{testimonial.treatment}</span>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default TestimonialsPage
