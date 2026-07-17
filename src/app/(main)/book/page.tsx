import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import BookingForm from "@/components/booking/booking-form"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your dental appointment in minutes. Choose your preferred date, time, dentist, and service.",
}

const hours = [
  { day: "Monday – Wednesday", time: "8:00 AM – 5:00 PM" },
  { day: "Thursday", time: "8:00 AM – 7:00 PM" },
  { day: "Friday", time: "8:00 AM – 3:00 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" },
  { day: "Sunday", time: "Closed" },
]

const whatToBring = [
  "Valid photo ID",
  "Insurance card (if applicable)",
  "Referral letter (if referred by another provider)",
  "List of current medications and dosages",
]

function BookPage() {
  return (
    <main>
      <PageHeader
        title="Book an Appointment"
        subtitle="Schedule your visit in minutes."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <BookingForm />
            </div>

            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal delay={0.05}>
                <div>
                  <TextReveal as="h3" className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    Prefer to call?
                  </TextReveal>
                  <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                    Reach us directly at{" "}
                    <a
                      href="tel:+12125551234"
                      className="text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      (212) 555-1234
                    </a>
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="border-t border-border pt-8">
                  <TextReveal as="h3" className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    Office hours
                  </TextReveal>
                  <div className="mt-4 space-y-1">
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

              <ScrollReveal delay={0.15}>
                <div className="border-t border-border pt-8">
                  <TextReveal as="h3" className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    What to bring
                  </TextReveal>
                  <ul className="mt-4 space-y-2">
                    {whatToBring.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]"
                      >
                        <span className="text-accent mt-0.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BookPage
