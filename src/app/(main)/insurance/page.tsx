import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "We accept most major dental insurance plans. Learn about payment options, insurance providers we work with, and how to verify your coverage.",
}

const providers = [
  {
    name: "Delta Dental",
    notes: "PPO and Premier plans accepted. In-network provider for most plans.",
  },
  {
    name: "Cigna",
    notes: "PPO plans accepted. We verify benefits before your first visit.",
  },
  {
    name: "Aetna",
    notes: "PPO and DPPO plans accepted. Direct billing available.",
  },
  {
    name: "MetLife",
    notes: "PPO plans accepted. Pre-authorization assistance provided.",
  },
  {
    name: "United Healthcare",
    notes: "PPO and dental HMO plans accepted where available.",
  },
  {
    name: "Guardian",
    notes: "PPO plans accepted. We handle claims submission on your behalf.",
  },
  {
    name: "Blue Cross Blue Shield",
    notes: "PPO plans accepted in most regions. We confirm coverage before treatment.",
  },
  {
    name: "Humana",
    notes: "PPO and dental savings plans accepted.",
  },
]

const steps = [
  {
    number: "01",
    title: "Bring your insurance information",
    description:
      "When you arrive for your appointment, bring your insurance card and photo ID. Our front desk team will collect the details they need to verify your benefits.",
  },
  {
    number: "02",
    title: "We verify your coverage",
    description:
      "Before any treatment begins, we contact your insurance provider to confirm your specific coverage, co-pays, deductibles, and any annual maximums. We present this information to you clearly.",
  },
  {
    number: "03",
    title: "We handle the paperwork",
    description:
      "Our billing team submits all claims electronically and follows up on any outstanding items. You receive a clear statement of what insurance covers and what remains your responsibility.",
  },
]

const paymentOptions = [
  "Cash and personal checks",
  "All major credit and debit cards",
  "CareCredit financing with promotional 0% APR",
  "Flexible Spending Account (FSA) and Health Savings Account (HSA)",
  "Extended payment plans for larger treatment programs",
]

function InsurancePage() {
  return (
    <main>
      <PageHeader title="Insurance" subtitle="We work with your plan." />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-semibold text-ink">
            Most major plans accepted.
          </TextReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.map((provider, i) => (
              <ScrollReveal key={provider.name} delay={i * 0.05}>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    {provider.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    {provider.notes}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
            How it works
          </TextReveal>

          <div className="mt-12 max-w-3xl space-y-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex items-start gap-8">
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-3xl text-accent-muted leading-none mt-1">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-semibold text-ink">
            Don&apos;t see your plan?
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm max-w-2xl leading-relaxed">
              We work with many insurance providers and are adding new ones regularly. If you
              don&apos;t see your plan listed, please call us at{" "}
              <a
                href="tel:+12125551234"
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                (212) 555-1234
              </a>{" "}
              and our team will verify your coverage before your appointment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-semibold text-ink">
            Payment options
          </TextReveal>
          <div className="mt-8 max-w-2xl">
            <ul className="space-y-3">
              {paymentOptions.map((option, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <li className="flex items-start gap-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                    <span className="text-accent mt-0.5">·</span>
                    {option}
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default InsurancePage
