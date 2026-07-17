import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import TechnologyContent from "./technology-content"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Advanced dental technology including 3D cone-beam CT imaging, intraoral cameras, digital smile design, and laser dentistry for precise, comfortable care.",
}

function TechnologyPage() {
  return (
    <main>
      <PageHeader title="Technology" subtitle="Tools that elevate your care." />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-semibold text-ink max-w-3xl">
            Precision instruments, exceptional outcomes.
          </TextReveal>

          <div className="mt-20 space-y-20">
            <TechnologyContent />
          </div>
        </div>
      </section>
    </main>
  )
}

export default TechnologyPage
