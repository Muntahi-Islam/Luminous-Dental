import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import PageHeader from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services"
import { images } from "@/lib/images"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import { ImageReveal } from "@/components/ui/image-reveal"

interface Props {
  params: Promise<{ slug: string }>
}

const serviceImages: Record<string, keyof typeof images> = {
  "emergency-dentistry": "emergencyDentistry",
  "dental-implants": "dentalImplant",
  "cosmetic-dentistry": "cosmeticDentistry",
  "teeth-whitening": "teethWhitening",
  "invisalign": "invisalign",
  "pediatric-dentistry": "pediatricDentistry",
  "root-canal": "rootCanal",
  "crowns": "dentalCrown",
  "veneers": "veneers",
  "general-dentistry": "dentalExam",
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: "Service Not Found" }
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <main className="py-24 text-center">
        <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">
          Service not found.
        </p>
      </main>
    )
  }

  const related = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean)
    .slice(0, 3)

  const imgKey = serviceImages[slug]
  const heroImg = imgKey ? images[imgKey] : null

  return (
    <main>
      <PageHeader title={service.title} subtitle={service.shortDescription} />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
                About this service.
              </TextReveal>
              <div className="mt-8 space-y-6 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed">
                {service.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            {heroImg && (
              <ScrollReveal delay={0.15} direction="right">
                <ImageReveal
                  src={heroImg.src}
                  alt={heroImg.alt}
                  width={heroImg.width}
                  height={heroImg.height}
                />
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
            Benefits
          </TextReveal>
          <div className="mt-8 max-w-3xl">
            {service.benefits.map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 py-4 border-t border-border">
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                    {benefit}
                  </span>
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
            What to expect
          </TextReveal>
          <div className="mt-12 max-w-3xl space-y-10">
            {service.procedure.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-8">
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-3xl text-accent-muted leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                    {step}
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
            Recovery
          </TextReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed">
              {service.recovery}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
            Common questions
          </TextReveal>
          <div className="mt-8 max-w-3xl">
            <Accordion type="single" collapsible>
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-semibold text-ink">
            Ready to get started?
          </TextReveal>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/book">Book a consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-border" />
          </div>
          <section className="py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">
                You may also be interested in
              </p>
              <div className="mt-8 space-y-4">
                {related.map((rel, i) => rel && (
                  <ScrollReveal key={rel.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${rel.slug}`}
                      className="group flex items-center justify-between py-4 border-t border-border transition-colors duration-200"
                    >
                      <span className="font-[family-name:var(--font-plus-jakarta)] text-xl text-ink group-hover:text-accent transition-colors duration-200">
                        {rel.title}
                      </span>
                      <span className="text-ink-muted group-hover:text-accent transition-colors duration-200">
                        →
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
