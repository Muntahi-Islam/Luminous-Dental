"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PageHeader from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

type FAQCategory = "General" | "Appointments" | "Insurance" | "Treatment" | "Emergency"

interface FAQ {
  question: string
  answer: string
  category: FAQCategory
}

const faqs: FAQ[] = [
  {
    question: "How often should I visit the dentist?",
    answer:
      "For most patients, we recommend a check-up and professional cleaning every six months. Some patients benefit from more frequent visits depending on their oral health needs. We assess your individual risk factors and recommend an appropriate schedule.",
    category: "General",
  },
  {
    question: "What happens during a routine check-up?",
    answer:
      "A routine check-up includes a visual examination of your teeth and gums, digital X-rays as needed, professional cleaning to remove plaque and tartar, and a discussion of any concerns or treatment recommendations. The appointment typically lasts 45 to 60 minutes.",
    category: "General",
  },
  {
    question: "Do you accept new patients who haven't seen a dentist in years?",
    answer:
      "Absolutely. We provide a judgment-free entry point with treatment plans that respect both your dental needs and your comfort level. Many patients find the reality of returning to the dentist is much less intimidating than they expected.",
    category: "General",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring your photo ID, insurance card if applicable, a list of any medications you're currently taking, and any previous dental records or X-rays if available. Arriving 10 to 15 minutes early helps us get you settled without rushing.",
    category: "General",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online through our appointment page, call our office at (212) 555-1234, or send us an email. Our front desk team is available during office hours to help you find a convenient time.",
    category: "Appointments",
  },
  {
    question: "How far in advance should I schedule?",
    answer:
      "We recommend booking routine appointments two to three weeks in advance. For specific time preferences, earlier booking is better. Emergency appointments are available same-day whenever possible.",
    category: "Appointments",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours' notice if you need to cancel or reschedule an appointment. This allows us to offer the time to another patient. Late cancellations or missed appointments may incur a fee.",
    category: "Appointments",
  },
  {
    question: "Do you offer same-day appointments?",
    answer:
      "We reserve appointment slots each day for emergency cases and patients with urgent needs. Call our office and we'll do our best to accommodate you the same day.",
    category: "Appointments",
  },
  {
    question: "What happens if I arrive late to my appointment?",
    answer:
      "We do our best to accommodate late arrivals, but your appointment time may be shortened to avoid impacting other patients. If you arrive more than 15 minutes late, we may need to reschedule.",
    category: "Appointments",
  },
  {
    question: "Do you accept my insurance?",
    answer:
      "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, and others. Contact our office with your insurance details and we'll verify your specific coverage before your visit.",
    category: "Insurance",
  },
  {
    question: "How do I verify my insurance coverage?",
    answer:
      "Call our office with your insurance card information and we'll contact your provider to verify your benefits, co-pays, and annual maximums. We provide this information clearly before any treatment begins.",
    category: "Insurance",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we accept CareCredit financing with promotional 0% APR options, as well as extended payment plans for larger treatment programs. We also accept FSA and HSA accounts.",
    category: "Insurance",
  },
  {
    question: "Will my insurance cover cosmetic procedures?",
    answer:
      "Purely cosmetic procedures like whitening are typically not covered. However, many treatments that improve appearance — such as crowns, bridges, or implant-supported restorations — are partially covered when they also serve a functional purpose.",
    category: "Insurance",
  },
  {
    question: "Does a dental procedure hurt?",
    answer:
      "We use effective local anesthesia to ensure your comfort during every procedure. For anxious patients, we offer sedation options. Modern techniques have made dental treatment significantly more comfortable than many patients expect.",
    category: "Treatment",
  },
  {
    question: "How long does a crown take?",
    answer:
      "A dental crown typically requires two appointments over two to three weeks. The first appointment involves tooth preparation and impressions, and the second involves fitting and cementing the permanent crown. Same-day crowns are available in some cases.",
    category: "Treatment",
  },
  {
    question: "Am I a candidate for dental implants?",
    answer:
      "Most adults with adequate jawbone density and good overall health are candidates for implants. We conduct a thorough assessment including bone density imaging to determine if implants are appropriate for your situation.",
    category: "Treatment",
  },
  {
    question: "How long do whitening results last?",
    answer:
      "Professional whitening results typically last one to three years with proper care. We provide custom take-home trays for periodic touch-up treatments to help maintain brightness between professional sessions.",
    category: "Treatment",
  },
  {
    question: "What counts as a dental emergency?",
    answer:
      "A dental emergency includes severe or persistent toothache, swelling of the face or jaw, bleeding that won't stop, a knocked-out or fractured tooth, broken restorations, and suspected infections such as an abscess.",
    category: "Emergency",
  },
  {
    question: "What should I do if a tooth gets knocked out?",
    answer:
      "Keep the tooth moist in milk or saliva and handle it by the crown only. Try to place it back in the socket if possible, but don't force it. Call our emergency line immediately and try to see us within 30 minutes.",
    category: "Emergency",
  },
  {
    question: "Do you have after-hours emergency care?",
    answer:
      "Our answering service can connect you with a clinician for after-hours emergencies. For true emergencies requiring immediate intervention, we recommend visiting the nearest emergency room.",
    category: "Emergency",
  },
]

const categoryTabs: (FAQCategory | "All")[] = [
  "All",
  "General",
  "Appointments",
  "Insurance",
  "Treatment",
  "Emergency",
]

function FAQPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "All">("All")

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory
      const matchesSearch =
        search === "" ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main>
      <PageHeader title="FAQ" subtitle="Answers to common questions." />

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <motion.div
              className="max-w-md relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <Input
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0 border-b border-border">
            {categoryTabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 text-sm font-[family-name:var(--font-dm-sans)] uppercase tracking-wide transition-colors duration-200 -mb-px ${
                  activeCategory === cat
                    ? "text-ink border-b-2 border-accent"
                    : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-ink-muted font-[family-name:var(--font-dm-sans)] text-sm">
                No questions match your search.
              </p>
            ) : (
              <Accordion type="single" collapsible>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${search}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filtered.map((faq, i) => (
                      <AccordionItem key={`${faq.question}-${i}`} value={`faq-${i}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </Accordion>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-semibold text-ink">
            Still have questions?
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm">
              We&apos;re happy to help.{" "}
              <Link
                href="/contact"
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                Contact us →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  )
}

export default FAQPage
