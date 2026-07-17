import HeroSection from "@/components/home/hero-section"
import SocialProof from "@/components/home/social-proof"
import ClinicHighlights from "@/components/home/clinic-highlights"
import WhyChooseUs from "@/components/home/why-choose-us"
import FeaturedServices from "@/components/home/featured-services"
import MeetDoctorsPreview from "@/components/home/meet-doctors-preview"
import TechnologySection from "@/components/home/technology-section"
import StatsSection from "@/components/home/stats-section"
import GalleryPreview from "@/components/home/gallery-preview"
import TestimonialsSection from "@/components/home/testimonials-section"
import ProcessTreatment from "@/components/home/process-treatment"
import InsuranceSection from "@/components/home/insurance-section"
import EmergencyCTA from "@/components/home/emergency-cta"
import LocationSection from "@/components/home/location-section"
import AppointmentCTA from "@/components/home/appointment-cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <ClinicHighlights />
      <WhyChooseUs />
      <FeaturedServices />
      <MeetDoctorsPreview />
      <TechnologySection />
      <StatsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ProcessTreatment />
      <InsuranceSection />
      <EmergencyCTA />
      <LocationSection />
      <AppointmentCTA />
    </>
  )
}
