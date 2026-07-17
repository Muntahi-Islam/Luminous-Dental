import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { getFeaturedDoctors } from "@/data/doctors"
import DoctorsGrid from "./doctors-grid"

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the experienced dental specialists at our practice. Board-certified professionals in general, cosmetic, orthodontic, and pediatric dentistry.",
}

function DoctorsPage() {
  const featured = getFeaturedDoctors()

  return (
    <main>
      <PageHeader
        title="Our Doctors"
        subtitle="Meet the people behind your care."
      />

      <DoctorsGrid doctors={featured} />
    </main>
  )
}

export default DoctorsPage
