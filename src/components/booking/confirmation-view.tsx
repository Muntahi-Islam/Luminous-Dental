"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"
import { doctors } from "@/data/doctors"

interface ConfirmationViewProps {
  data: {
    fullName: string
    email: string
    phone: string
    preferredDate: string
    preferredTime: string
    dentist: string
    service: string
    insurance?: string
    reason?: string
    notes?: string
  }
  onBookAnother: () => void
}

function ConfirmationView({ data, onBookAnother }: ConfirmationViewProps) {
  const serviceName =
    services.find((s) => s.slug === data.service)?.title || data.service
  const dentistName =
    data.dentist === "no-preference"
      ? "No Preference"
      : doctors.find((d) => d.id === data.dentist)?.name || data.dentist

  const formattedDate = new Date(
    data.preferredDate + "T00:00:00"
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto mb-8"
      >
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl text-ink">
          Request received.
        </h2>
        <p className="mt-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
          We&apos;ll confirm your appointment within 2 hours.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 bg-surface border border-border rounded-lg p-6 text-left"
      >
        <h3 className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)] mb-5">
          Booking summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          {[
            { label: "Patient", value: data.fullName },
            { label: "Email", value: data.email },
            { label: "Date & Time", value: `${formattedDate} at ${data.preferredTime}` },
            { label: "Dentist", value: dentistName },
            { label: "Service", value: serviceName },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.3 }}
            >
              <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">{item.label}</p>
              <p className="text-sm text-ink font-[family-name:var(--font-dm-sans)] mt-0.5">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button variant="default" onClick={onBookAnother} className="gap-2">
          Book another
        </Button>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            Return home
          </Button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="mt-8 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]"
      >
        Need immediate help? Call{" "}
        <a
          href="tel:+12125551234"
          className="text-accent hover:text-accent-hover transition-colors duration-200"
        >
          (212) 555-1234
        </a>
      </motion.p>
    </div>
  )
}

export default ConfirmationView
