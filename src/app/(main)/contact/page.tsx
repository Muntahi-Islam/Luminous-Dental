"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Car, Train, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"

const hours = [
  { day: "Monday – Wednesday", time: "8:00 AM – 5:00 PM" },
  { day: "Thursday", time: "8:00 AM – 7:00 PM" },
  { day: "Friday", time: "8:00 AM – 3:00 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" },
  { day: "Sunday", time: "Closed" },
]

const subjects = [
  "General Inquiry",
  "Schedule an Appointment",
  "Insurance Question",
  "Request Records",
  "Feedback",
  "Other",
]

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email"
    if (!form.subject) errs.subject = "Please select a subject"
    if (!form.message.trim()) errs.message = "Message is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  if (submitted) {
    return (
      <main>
        <PageHeader title="Contact" subtitle="We'd love to hear from you." />
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl text-ink">
                Message sent.
              </h2>
              <p className="mt-4 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                Thank you for reaching out. We&apos;ll respond within one business day.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <PageHeader title="Contact" subtitle="We'd love to hear from you." />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <ScrollReveal>
                  <Input
                    label="Name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    error={errors.name}
                  />
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    error={errors.email}
                  />
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="(212) 555-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      className={`flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-ink font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 ${
                        errors.subject ? "border-danger" : "border-border"
                      }`}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-danger font-[family-name:var(--font-dm-sans)]">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <Textarea
                    label="Message"
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    error={errors.message}
                    rows={5}
                  />
                </ScrollReveal>
                <ScrollReveal delay={0.25}>
                  <Button type="submit" size="lg" loading={loading}>
                    Send message
                  </Button>
                </ScrollReveal>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-ink font-[family-name:var(--font-dm-sans)]">
                      742 Park Avenue, Suite 400
                    </p>
                    <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                      New York, NY 10021
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <a
                      href="tel:+12125551234"
                      className="text-sm text-ink font-[family-name:var(--font-dm-sans)] hover:text-accent transition-colors duration-200"
                    >
                      (212) 555-1234
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <a
                    href="mailto:hello@smiledentalcare.com"
                    className="text-sm text-ink font-[family-name:var(--font-dm-sans)] hover:text-accent transition-colors duration-200"
                  >
                    hello@smiledentalcare.com
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-ink font-[family-name:var(--font-dm-sans)]">
                      Office hours
                    </span>
                  </div>
                  <div className="ml-8 space-y-1">
                    {hours.map((h, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm font-[family-name:var(--font-dm-sans)] max-w-xs"
                      >
                        <span className="text-ink-secondary">{h.day}</span>
                        <span className="text-ink-muted ml-6">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                    Complimentary parking available in the building garage. Enter from East 66th Street.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                    Two blocks from the 68th Street–Hunter College subway station (6 train).
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <a
                    href="https://wa.me/12125551234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-accent-hover font-[family-name:var(--font-dm-sans)] transition-colors duration-200"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="border-l-2 border-accent pl-6 max-w-xl">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                Emergency?
              </h3>
              <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                For urgent dental situations, call us directly.
              </p>
              <a
                href="tel:+12125551234"
                className="inline-block mt-3 text-accent hover:text-accent-hover font-[family-name:var(--font-dm-sans)] text-sm transition-colors duration-200"
              >
                Call now → (212) 555-1234
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
