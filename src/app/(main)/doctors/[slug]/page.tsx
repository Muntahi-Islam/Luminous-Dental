import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import PageHeader from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  getDoctorBySlug,
  getAllDoctorSlugs,
} from "@/data/doctors"
import { images } from "@/lib/images"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import { ImageReveal } from "@/components/ui/image-reveal"

interface Props {
  params: Promise<{ slug: string }>
}

const doctorPhotos: Record<string, keyof typeof images> = {
  "dr-sarah-mitchell": "doctorFemale1",
  "dr-james-chen": "doctorMale1",
  "dr-emily-rodriguez": "doctorFemale2",
  "dr-michael-park": "doctorMale1",
  "dr-amanda-foster": "doctorFemale1",
}

export async function generateStaticParams() {
  return getAllDoctorSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)
  if (!doctor) return { title: "Doctor Not Found" }
  return {
    title: doctor.name,
    description: doctor.bio[0],
  }
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)

  if (!doctor) {
    return (
      <main className="py-24 text-center">
        <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">
          Doctor not found.
        </p>
      </main>
    )
  }

  const photoKey = doctorPhotos[slug]
  const photo = photoKey ? images[photoKey] : null

  return (
    <main>
      <PageHeader title={doctor.name} subtitle={doctor.title} />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <ScrollReveal className="lg:col-span-2">
              {photo ? (
                <ImageReveal
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                />
              ) : (
                <div className="aspect-[3/4] rounded-lg bg-surface-warm border border-border-light flex items-center justify-center">
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-7xl text-accent-muted">
                    {doctor.initials}
                  </span>
                </div>
              )}

              {doctor.workingHours.length > 0 && (
                <ScrollReveal delay={0.15}>
                  <div className="mt-8">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink">
                      Working hours
                    </h3>
                    <div className="mt-4 space-y-2">
                      {doctor.workingHours.map((wh, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm font-[family-name:var(--font-dm-sans)]"
                        >
                          <span className="text-ink-secondary">{wh.days}</span>
                          <span className="text-ink-muted">{wh.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </ScrollReveal>

            <div className="lg:col-span-3">
              <ScrollReveal>
                <TextReveal as="h2" className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl text-ink">
                  {doctor.name}
                </TextReveal>
                <p className="mt-2 text-lg text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                  {doctor.title}
                </p>
                <div className="mt-4 w-12 h-px bg-accent" />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-8 space-y-4 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed">
                  {doctor.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </ScrollReveal>

              <div className="mt-12 border-t border-border" />

              <ScrollReveal delay={0.15}>
                <div className="mt-12">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink">
                    Qualifications
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {doctor.qualifications.map((q, i) => (
                      <li
                        key={i}
                        className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-8">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink">
                    Languages
                  </h3>
                  <p className="mt-4 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]">
                    {doctor.languages.join(", ")}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="mt-8">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink">
                    Memberships
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {doctor.memberships.map((m, i) => (
                      <li
                        key={i}
                        className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)]"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <div className="mt-12 border-t border-border" />

              <ScrollReveal delay={0.3}>
                <div className="mt-12">
                  <Button asChild size="lg">
                    <Link href="/book">Book with {doctor.name.split(" ").pop()}</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
