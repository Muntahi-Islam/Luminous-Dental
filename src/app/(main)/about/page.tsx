import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import { ImageReveal } from "@/components/ui/image-reveal"
import { images } from "@/lib/images"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about our dental practice founded by Dr. Sarah Mitchell. Over 15 years of patient-centered, compassionate dental care with a team of five specialists.",
}

const values = [
  {
    name: "Excellence",
    description:
      "We hold ourselves to the highest clinical standards, pursuing continuing education and adopting proven techniques that deliver predictable, lasting results.",
  },
  {
    name: "Compassion",
    description:
      "Every patient arrives with a different story, a different level of comfort, and a different set of concerns. We listen first, then treat with genuine care.",
  },
  {
    name: "Innovation",
    description:
      "We invest in modern technology and evidence-based methods not because they are new, but because they allow us to treat you more gently and more precisely.",
  },
  {
    name: "Integrity",
    description:
      "We recommend only what you need, explain every option honestly, and provide transparent pricing before any treatment begins.",
  },
]

function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About"
        subtitle="The story behind our practice."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-semibold text-ink max-w-3xl leading-[1.2]">
                Dentistry practiced with intention.
              </TextReveal>

              <div className="mt-12 space-y-8 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed">
                <ScrollReveal delay={0.1}>
                  <p>
                    In 2005, Dr. Sarah Mitchell opened a small practice with a straightforward idea: that
                    dental care works best when it is built around the person in the chair, not the other
                    way around. She had spent years in corporate dental environments where time constraints
                    and production targets shaped every interaction. She wanted something different — a
                    place where patients were known by name, where treatment plans reflected individual
                    goals, and where the quality of care was never compromised by the pace of the schedule.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p>
                    What began as a solo practice has grown into a team of five specialists covering general
                    dentistry, orthodontics, oral surgery, periodontics, and pediatric care. Each addition
                    to the practice was deliberate — we brought on clinicians who share the same values and
                    who chose this work because they care deeply about doing it well. The result is a
                    practice where every patient has access to comprehensive care delivered by people who
                    know each other, collaborate on complex cases, and hold themselves collectively to a
                    high standard.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal delay={0.2} direction="right">
              <ImageReveal
                src={images.doctorFemale1.src}
                alt={images.doctorFemale1.alt}
                width={images.doctorFemale1.width}
                height={images.doctorFemale1.height}
                caption="Dr. Sarah Mitchell, Founder"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
            What we stand for.
          </TextReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {values.map((value, i) => (
              <ScrollReveal key={value.name} delay={i * 0.1}>
                <div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    {value.description}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
                  Our facility.
                </TextReveal>
                <div className="mt-8 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed space-y-4">
                  <p>
                    Our clinic was designed with the patient experience in mind from the first
                    consultation to the waiting room. Natural light fills the reception area. Treatment
                    rooms are equipped with the latest diagnostic and imaging technology. Every detail —
                    from the acoustics to the materials — was chosen to create an environment that feels
                    calm, modern, and unhurried.
                  </p>
                  <p>
                    We believe that the physical space where care happens matters. A well-designed clinic
                    supports better clinical outcomes, reduces patient anxiety, and reflects the standard
                    of care we aim to deliver in every interaction.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} direction="right">
              <ImageReveal
                src={images.clinicInterior.src}
                alt={images.clinicInterior.alt}
                width={images.clinicInterior.width}
                height={images.clinicInterior.height}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] text-xl text-accent hover:text-accent-hover transition-colors duration-200"
            >
              Meet our team →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
