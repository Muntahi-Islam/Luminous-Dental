import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service governing your use of our dental practice services, appointments, payments, and policies.",
}

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing our services, scheduling appointments, or using our website, you agree to these terms of service. If you do not agree with any part of these terms, please discontinue use of our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of any changes.",
  },
  {
    title: "Services Provided",
    content:
      "We provide dental care services including preventive, restorative, cosmetic, orthodontic, and emergency dentistry. All treatment recommendations are based on clinical assessment and professional judgment. We do not guarantee specific outcomes, as individual results depend on numerous biological and behavioral factors. Treatment plans and cost estimates are provided in good faith and may be adjusted based on clinical findings during treatment.",
  },
  {
    title: "Appointments",
    content:
      "Appointments may be scheduled online, by phone, or by email. We ask for at least 24 hours' notice for cancellations or rescheduling. Late cancellations or missed appointments may incur a fee to compensate for the reserved clinical time. We reserve the right to discharge patients who repeatedly miss appointments without notice.",
  },
  {
    title: "Payment",
    content:
      "Payment is due at the time of service unless other arrangements have been made in advance. We accept cash, checks, major credit and debit cards, CareCredit, FSA, and HSA payments. For treatment plans exceeding a certain amount, we may offer extended payment plans subject to credit approval. Returned checks incur a processing fee.",
  },
  {
    title: "Cancellation Policy",
    content:
      "We require 24 hours' notice for appointment cancellations or rescheduling. Cancellations with less than 24 hours' notice or failure to attend a scheduled appointment may result in a cancellation fee. This policy ensures that appointment times are available for other patients who need care.",
  },
  {
    title: "Insurance",
    content:
      "We work with most major dental insurance plans and will verify your benefits before treatment when possible. However, insurance coverage verification is an estimate, not a guarantee of payment. You are ultimately responsible for any charges not covered by your insurance plan. We assist with claims processing but cannot guarantee specific coverage decisions.",
  },
  {
    title: "Disclaimer",
    content:
      "The information provided on our website and in our educational materials is for general informational purposes only. It does not constitute medical advice and should not be relied upon as a substitute for professional dental consultation. Always seek the advice of a qualified dental provider with any questions about your oral health.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Our liability is limited to the professional services rendered in our clinic. We are not responsible for outcomes resulting from patient non-compliance with treatment recommendations, failure to follow aftercare instructions, or untreated conditions that develop after discharge from our care. Our malpractice insurance provides coverage consistent with industry standards.",
  },
  {
    title: "Contact",
    content:
      "For questions about these terms of service, please contact our office at (212) 555-1234 or email legal@smiledentalcare.com.",
  },
]

function TermsPage() {
  return (
    <main>
      <PageHeader title="Terms of Service" />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-ink-muted font-[family-name:var(--font-dm-sans)] mb-12">
            Last updated: January 2025
          </p>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.05}>
                <div>
                  <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    {section.title}
                  </TextReveal>
                  <p className="mt-3 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
