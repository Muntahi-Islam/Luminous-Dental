export interface Doctor {
  id: string
  name: string
  slug: string
  title: string
  bio: string[]
  specializations: string[]
  qualifications: string[]
  experience: string
  languages: string[]
  memberships: string[]
  email: string
  featured: boolean
  initials: string
  gradient: string
  workingHours: {
    days: string
    hours: string
  }[]
}

export const doctors: Doctor[] = [
  {
    id: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    slug: "dr-sarah-mitchell",
    title: "DDS, FAGD — General & Cosmetic Dentistry",
    bio: [
      "Dr. Sarah Mitchell brings over fifteen years of clinical experience to her role as the practice's lead general and cosmetic dentist. A graduate of the University of Michigan School of Dentistry, she completed her Fellowship in the Academy of General Dentistry — a distinction held by fewer than six percent of dentists nationwide — reflecting her commitment to continuing education and comprehensive patient care.",
      "Her approach to dentistry centers on understanding each patient's individual goals and concerns before recommending treatment. Whether performing a routine restoration or designing a complex smile makeover, Dr. Mitchell emphasizes conservative techniques that preserve natural tooth structure while achieving durable, aesthetically sound results. She has extensive experience with porcelain veneers, dental bonding, and full-mouth rehabilitation.",
      "Outside the clinic, Dr. Mitchell mentors dental students at the university clinic and volunteers with remote access dental programs providing care to underserved communities. She is a frequent speaker at regional dental conferences on topics ranging from minimally invasive restorative techniques to patient communication in cosmetic treatment planning.",
    ],
    specializations: [
      "Cosmetic Dentistry",
      "Smile Makeovers",
      "Porcelain Veneers",
      "General Dentistry",
      "Full-Mouth Rehabilitation",
    ],
    qualifications: [
      "Doctor of Dental Surgery (DDS) — University of Michigan School of Dentistry",
      "Fellow, Academy of General Dentistry (FAGD)",
      "Advanced training in cosmetic dentistry — Spear Education",
      "Certified provider for composite bonding and porcelain restorations",
      "Continuing education exceeding 200 hours annually",
    ],
    experience: "15+ years of clinical practice",
    languages: ["English", "Spanish"],
    memberships: [
      "Academy of General Dentistry",
      "American Dental Association",
      "Michigan Dental Association",
      "American Academy of Cosmetic Dentistry",
    ],
    email: "dr.mitchell@smiledentalcare.com",
    featured: true,
    initials: "SM",
    gradient: "from-teal-400 to-teal-600",
    workingHours: [
      { days: "Monday – Wednesday", hours: "8:00 AM – 5:00 PM" },
      { days: "Thursday", hours: "8:00 AM – 7:00 PM" },
      { days: "Friday", hours: "8:00 AM – 3:00 PM" },
    ],
  },
  {
    id: "dr-james-chen",
    name: "Dr. James Chen",
    slug: "dr-james-chen",
    title: "DMD, MS — Orthodontics & Implant Dentistry",
    bio: [
      "Dr. James Chen is a dual-specialist in orthodontics and implant dentistry, combining two decades of focused training to address complex cases that involve both tooth alignment and structural restoration. He earned his Doctor of Dental Medicine degree from the University of Pennsylvania and completed a Master of Science in Oral Biology with a research focus on osseointegration mechanics in dental implants.",
      "His orthodontic practice encompasses traditional bracket systems, clear aligner therapy including Invisalign, and surgical orthodontics for patients with significant skeletal discrepancies. In his implant work, Dr. Chen utilizes cone-beam CT imaging and computer-guided surgical protocols to plan and place implants with exceptional precision, whether restoring a single missing tooth or providing full-arch implant-supported prosthetics.",
      "Dr. Chen is known for his ability to explain complex treatment concepts in straightforward terms. He invests significant time in patient education, ensuring that every treatment decision is made collaboratively with fully informed consent. His research on implant surface modifications has been published in peer-reviewed journals, and he lectures nationally on digital workflows in implant dentistry.",
    ],
    specializations: [
      "Orthodontics",
      "Dental Implants",
      "Invisalign",
      "Oral Surgery",
      "Full-Arch Restoration",
    ],
    qualifications: [
      "Doctor of Dental Medicine (DMD) — University of Pennsylvania",
      "Master of Science in Oral Biology — University of Pennsylvania",
      "Certificate in Orthodontics — University of Pennsylvania",
      "Fellow, International Congress of Oral Implantologists",
      "Published researcher in osseointegration and implant surface technology",
    ],
    experience: "12+ years of specialized practice",
    languages: ["English", "Mandarin"],
    memberships: [
      "American Association of Orthodontists",
      "American Academy of Oral and Maxillofacial Surgeons",
      "International Congress of Oral Implantologists",
      "American Dental Association",
    ],
    email: "dr.chen@smiledentalcare.com",
    featured: true,
    initials: "JC",
    gradient: "from-blue-400 to-blue-600",
    workingHours: [
      { days: "Monday – Thursday", hours: "8:30 AM – 5:00 PM" },
      { days: "Friday", hours: "8:30 AM – 2:00 PM" },
    ],
  },
  {
    id: "dr-emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    slug: "dr-emily-rodriguez",
    title: "DDS — Pediatric Dentistry",
    bio: [
      "Dr. Emily Rodriguez chose pediatric dentistry because she believes the dental experiences children have today shape their relationship with oral health for life. She earned her Doctor of Dental Surgery degree from Columbia University and completed a two-year pediatric dentistry residency at Children's Hospital of New York, where she gained extensive experience treating patients with complex medical histories, dental anxiety, and special healthcare needs.",
      "Her clinical focus spans preventive care, behavior management, sedation dentistry for pediatric patients, and early orthodontic intervention. Dr. Rodriguez is particularly skilled at communicating with young patients in ways that reduce anxiety and build trust — using visual aids, tell-show-do techniques, and age-appropriate language that helps children understand and participate in their own care.",
      "Dr. Rodriguez is active in community outreach, organizing school-based dental education programs and participating in the give kids a smile program providing free care to underserved children. She serves on the pediatric dentistry committee for the state dental association and regularly presents at continuing education courses on behavior guidance techniques and pediatric pain management.",
    ],
    specializations: [
      "Pediatric Dentistry",
      "Children's Dental Care",
      "Sedation Dentistry for Children",
      "Early Orthodontic Assessment",
      "Special Needs Dentistry",
    ],
    qualifications: [
      "Doctor of Dental Surgery (DDS) — Columbia University College of Dental Medicine",
      "Certificate in Pediatric Dentistry — Children's Hospital of New York",
      "Board Certified, American Board of Pediatric Dentistry",
      "Advanced training in pediatric sedation and behavior management",
      "BLS and PALS certified for pediatric emergency response",
    ],
    experience: "10+ years of pediatric dental practice",
    languages: ["English", "Spanish", "Portuguese"],
    memberships: [
      "American Academy of Pediatric Dentistry",
      "American Dental Association",
      "American Board of Pediatric Dentistry",
      "State Dental Association — Pediatric Dentistry Committee",
    ],
    email: "dr.rodriguez@smiledentalcare.com",
    featured: false,
    initials: "ER",
    gradient: "from-purple-400 to-purple-600",
    workingHours: [
      { days: "Monday – Thursday", hours: "8:00 AM – 4:30 PM" },
      { days: "Friday", hours: "8:00 AM – 12:00 PM" },
    ],
  },
  {
    id: "dr-michael-park",
    name: "Dr. Michael Park",
    slug: "dr-michael-park",
    title: "DDS, FACD — Oral Surgery & Implant Dentistry",
    bio: [
      "Dr. Michael Park is the practice's most experienced clinician, with over eighteen years devoted exclusively to oral and maxillofacial surgery and implant placement. He earned his dental degree from UCLA and completed a four-year oral and maxillofacial surgery residency at the University of San Francisco Medical Center, where he trained alongside surgeons managing trauma, pathology, and complex reconstructive cases.",
      "His surgical scope includes wisdom tooth extraction, bone grafting and ridge augmentation for implant site preparation, sinus lift procedures, implant placement using computer-guided protocols, and correction of jaw discrepancies through orthognathic surgery. Dr. Park's approach prioritizes minimally invasive techniques whenever possible, using flapless implant surgery and piezoelectric instrumentation to reduce surgical trauma and accelerate healing.",
      "Dr. Park serves as the oral surgery consultant for two regional hospitals and maintains active surgical privileges. He is a Fellow of the American College of Dentists, recognizing his contributions to the profession through leadership, ethics, and service. His surgical outcomes and patient care philosophy have earned him consistent recognition in regional dental professional circles.",
    ],
    specializations: [
      "Oral and Maxillofacial Surgery",
      "Dental Implant Placement",
      "Wisdom Tooth Extraction",
      "Bone Grafting",
      "Orthognathic Surgery",
    ],
    qualifications: [
      "Doctor of Dental Surgery (DDS) — UCLA School of Dentistry",
      "Certificate in Oral and Maxillofacial Surgery — UCSF Medical Center",
      "Fellow, American College of Dentists (FACD)",
      "Board Certified, American Board of Oral and Maxillofacial Surgery",
      "Hospital surgical privileges at two regional medical centers",
    ],
    experience: "18+ years of surgical practice",
    languages: ["English", "Korean"],
    memberships: [
      "American Association of Oral and Maxillofacial Surgeons",
      "American College of Dentists",
      "American Dental Association",
      "International Association of Oral and Maxillofacial Surgeons",
    ],
    email: "dr.park@smiledentalcare.com",
    featured: true,
    initials: "MP",
    gradient: "from-rose-400 to-rose-600",
    workingHours: [
      { days: "Monday – Wednesday", hours: "7:30 AM – 4:00 PM" },
      { days: "Thursday – Friday", hours: "7:30 AM – 2:00 PM" },
    ],
  },
  {
    id: "dr-amanda-foster",
    name: "Dr. Amanda Foster",
    slug: "dr-amanda-foster",
    title: "DMD — Periodontics",
    bio: [
      "Dr. Amanda Foster specializes in the diagnosis, treatment, and management of periodontal disease — the leading cause of tooth loss in adults — and the placement of dental implants in compromised periodontal environments. She earned her Doctor of Dental Medicine degree from the University of Connecticut and completed a three-year periodontics residency with a focus on regenerative surgical techniques and implant therapy in patients with a history of gum disease.",
      "Her clinical expertise encompasses both surgical and non-surgical periodontal therapy, including scaling and root planing, laser-assisted periodontal treatment, osseous surgery, guided tissue regeneration, connective tissue grafting for recession coverage, and implant placement and maintenance. Dr. Foster is known for her meticulous technique and her ability to manage complex periodontal cases where other approaches have failed.",
      "Dr. Foster's research on the relationship between systemic inflammation and periodontal disease progression has been published in the Journal of Periodontology and the Journal of Clinical Periodontology. She collaborates closely with the practice's general dentists and oral surgeon to ensure seamless coordination of care for patients requiring both periodontal treatment and restorative dentistry. She is passionate about educating patients that gum health is inseparable from overall health.",
    ],
    specializations: [
      "Periodontics",
      "Gum Disease Treatment",
      "Dental Implants",
      "Soft Tissue Grafting",
      "Regenerative Periodontal Surgery",
    ],
    qualifications: [
      "Doctor of Dental Medicine (DMD) — University of Connecticut",
      "Certificate in Periodontics — University of Connecticut",
      "Board Certified, American Board of Periodontology",
      "Published researcher in periodontal medicine and implant therapy",
      "Advanced training in laser-assisted periodontal procedures",
    ],
    experience: "14+ years of periodontal practice",
    languages: ["English"],
    memberships: [
      "American Academy of Periodontology",
      "American Dental Association",
      "American Board of Periodontology",
      "International Team for Implantology",
    ],
    email: "dr.foster@smiledentalcare.com",
    featured: false,
    initials: "AF",
    gradient: "from-emerald-400 to-emerald-600",
    workingHours: [
      { days: "Monday – Thursday", hours: "8:00 AM – 5:00 PM" },
      { days: "Friday", hours: "By appointment only" },
    ],
  },
]

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug)
}

export function getFeaturedDoctors(): Doctor[] {
  return doctors.filter((d) => d.featured)
}

export function getAllDoctorSlugs(): string[] {
  return doctors.map((d) => d.slug)
}
