import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Our privacy policy explains how we collect, use, and protect your personal and health information.",
}

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect personal information you provide directly, including your name, email address, phone number, date of birth, insurance details, and medical history relevant to your dental care. We also collect information automatically through our website, such as IP address, browser type, and pages visited, to improve our services and user experience.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to provide dental care, schedule and manage appointments, process insurance claims, communicate about your treatment, and send appointment reminders. We may also use aggregated, non-identifying data to improve our website and services. We do not sell your personal information to third parties.",
  },
  {
    title: "Information Sharing",
    content:
      "We share your health information only as necessary to provide your care — with insurance processors for claims, with laboratories and specialists involved in your treatment, and as required by law. We do not share your information for marketing purposes without your explicit consent. All staff with access to patient records are bound by confidentiality agreements.",
  },
  {
    title: "Data Security",
    content:
      "We implement administrative, technical, and physical safeguards to protect your information against unauthorized access, disclosure, or misuse. Electronic health records are encrypted, access is limited to authorized personnel, and our systems undergo regular security audits. While we take every reasonable precaution, no system is completely immune to security threats.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access your personal health records, request corrections to inaccurate information, and request restrictions on how your information is used or shared. You may also request a copy of your records at any time. To exercise these rights, contact our office in writing with your request.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "Our website uses essential cookies to ensure proper functionality and optional analytics cookies to understand how visitors use our site. You may control cookie preferences through your browser settings. We do not use advertising cookies or share tracking data with third-party advertisers.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this privacy policy periodically to reflect changes in our practices or applicable regulations. The current version will always be available on our website with the effective date noted. Continued use of our services after changes are posted constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    content:
      "For questions about this privacy policy or to exercise your rights regarding your personal information, please contact our office at (212) 555-1234 or email privacy@smiledentalcare.com.",
  },
]

function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader title="Privacy Policy" />

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

export default PrivacyPolicyPage
