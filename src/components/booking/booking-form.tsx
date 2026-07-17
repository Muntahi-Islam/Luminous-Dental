"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"
import { doctors } from "@/data/doctors"
import ConfirmationView from "./confirmation-view"

const personalSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),
})

const appointmentSchema = z.object({
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  dentist: z.string().min(1, "Please select a dentist preference"),
  service: z.string().min(1, "Please select a service"),
})

const additionalSchema = z.object({
  insurance: z.string().optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
})

type PersonalData = z.infer<typeof personalSchema>
type AppointmentData = z.infer<typeof appointmentSchema>
type AdditionalData = z.infer<typeof additionalSchema>
type FormData = PersonalData & AppointmentData & AdditionalData

const timeSlots = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

const stepMeta = [
  {
    title: "Personal",
    icon: User,
  },
  {
    title: "Appointment",
    icon: Calendar,
  },
  {
    title: "Details",
    icon: FileText,
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

function getMinDate() {
  const now = new Date()
  now.setDate(now.getDate() + 1)
  return now.toISOString().split("T")[0]
}

function BookingForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)

  const personalForm = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "" },
  })

  const appointmentForm = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
    mode: "onTouched",
    defaultValues: {
      preferredDate: "",
      preferredTime: "",
      dentist: "",
      service: "",
    },
  })

  const additionalForm = useForm<AdditionalData>({
    resolver: zodResolver(additionalSchema),
    mode: "onTouched",
    defaultValues: { insurance: "", reason: "", notes: "" },
  })

  const forms = [personalForm, appointmentForm, additionalForm]

  const handleNext = async () => {
    const valid = await forms[step].trigger()
    if (!valid) return

    if (step < 2) {
      setDirection(1)
      setStep((s) => s + 1)
    } else {
      const allData: FormData = {
        ...personalForm.getValues(),
        ...appointmentForm.getValues(),
        ...additionalForm.getValues(),
      }
      startTransition(() => {
        setTimeout(() => {
          setFormData(allData)
          setSubmitted(true)
        }, 1500)
      })
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const handleBookAnother = () => {
    personalForm.reset()
    appointmentForm.reset()
    additionalForm.reset()
    setFormData(null)
    setSubmitted(false)
    setStep(0)
    setDirection(1)
  }

  if (submitted && formData) {
    return <ConfirmationView data={formData} onBookAnother={handleBookAnother} />
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {stepMeta.map((meta, i) => {
            const Icon = meta.icon
            const isActive = i === step
            const isCompleted = i < step
            return (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <motion.div
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-medium font-[family-name:var(--font-dm-sans)] ${
                    isCompleted
                      ? "bg-accent text-white"
                      : isActive
                        ? "bg-accent text-white"
                        : "bg-surface-dim text-ink-muted"
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </motion.div>
                <span
                  className={`hidden sm:block text-xs font-medium font-[family-name:var(--font-dm-sans)] uppercase tracking-wide ${
                    isActive ? "text-ink" : isCompleted ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {meta.title}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Progress line */}
        <div className="relative h-px bg-border-light mt-6">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Step 1: Personal Information */}
            {step === 0 && (
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Input
                    label="Full name"
                    placeholder="Your full name"
                    error={personalForm.formState.errors.fullName?.message}
                    {...personalForm.register("fullName")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    error={personalForm.formState.errors.email?.message}
                    {...personalForm.register("email")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="(212) 555-0100"
                    error={personalForm.formState.errors.phone?.message}
                    {...personalForm.register("phone")}
                  />
                </motion.div>
              </div>
            )}

            {/* Step 2: Appointment Details */}
            {step === 1 && (
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Input
                    label="Preferred date"
                    type="date"
                    min={getMinDate()}
                    error={appointmentForm.formState.errors.preferredDate?.message}
                    {...appointmentForm.register("preferredDate")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <div className="w-full">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      Preferred time
                    </label>
                    <select
                      value={appointmentForm.watch("preferredTime")}
                      onChange={(e) =>
                        appointmentForm.setValue("preferredTime", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      className={`flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-ink font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 ${
                        appointmentForm.formState.errors.preferredTime
                          ? "border-danger"
                          : "border-border"
                      }`}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {appointmentForm.formState.errors.preferredTime?.message && (
                      <p className="mt-1.5 text-xs text-danger font-[family-name:var(--font-dm-sans)]">
                        {appointmentForm.formState.errors.preferredTime.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="w-full">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      Preferred dentist
                    </label>
                    <select
                      value={appointmentForm.watch("dentist")}
                      onChange={(e) =>
                        appointmentForm.setValue("dentist", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      className={`flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-ink font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 ${
                        appointmentForm.formState.errors.dentist
                          ? "border-danger"
                          : "border-border"
                      }`}
                    >
                      <option value="">No preference</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                    {appointmentForm.formState.errors.dentist?.message && (
                      <p className="mt-1.5 text-xs text-danger font-[family-name:var(--font-dm-sans)]">
                        {appointmentForm.formState.errors.dentist.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <div className="w-full">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted font-[family-name:var(--font-dm-sans)]">
                      Service
                    </label>
                    <select
                      value={appointmentForm.watch("service")}
                      onChange={(e) =>
                        appointmentForm.setValue("service", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      className={`flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-ink font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 ${
                        appointmentForm.formState.errors.service
                          ? "border-danger"
                          : "border-border"
                      }`}
                    >
                      <option value="">What do you need?</option>
                      {services.map((svc) => (
                        <option key={svc.slug} value={svc.slug}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                    {appointmentForm.formState.errors.service?.message && (
                      <p className="mt-1.5 text-xs text-danger font-[family-name:var(--font-dm-sans)]">
                        {appointmentForm.formState.errors.service.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {step === 2 && (
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Input
                    label="Insurance provider"
                    placeholder="e.g., Delta Dental, Cigna"
                    helperText="Optional — we can verify your coverage before your visit"
                    {...additionalForm.register("insurance")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <Textarea
                    label="Reason for visit"
                    placeholder="Brief description of your dental concern..."
                    helperText="Optional — helps us prepare for your appointment"
                    rows={4}
                    {...additionalForm.register("reason")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Textarea
                    label="Additional notes"
                    placeholder="Any special requirements or other information..."
                    helperText="Optional"
                    rows={3}
                    {...additionalForm.register("notes")}
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div>
          {step > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={isPending}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>

        <Button
          type="button"
          onClick={handleNext}
          loading={isPending}
          size="lg"
          className="min-w-[160px] gap-2"
        >
          {step === 2 ? (
            isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Confirm
              </>
            )
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default BookingForm
