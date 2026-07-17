import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (url?.startsWith("postgresql://") || url?.startsWith("postgres://")) {
    const { PrismaNeon } = require("@prisma/adapter-neon");
    const { neonConfig } = require("@neondatabase/serverless");
    const { Pool } = require("@neondatabase/serverless");
    neonConfig.fetchConnectionCache = true;
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter });
  }

  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  const adapter = new PrismaBetterSqlite3({
    url: url || "file:./dev.db",
  });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  console.log("Seeding database...");

  // ─── Users ──────────────────────────────────────────────────
  const adminPassword = await hashPassword("admin123");
  const dentistPassword = await hashPassword("dentist123");
  const receptionistPassword = await hashPassword("reception123");

  const admin = await prisma.user.upsert({
    where: { email: "admin@luminousdental.com" },
    update: {},
    create: {
      email: "admin@luminousdental.com",
      name: "Admin User",
      password: adminPassword,
      role: "super_admin",
    },
  });

  const dentistUser = await prisma.user.upsert({
    where: { email: "dr.mitchell@luminousdental.com" },
    update: {},
    create: {
      email: "dr.mitchell@luminousdental.com",
      name: "Dr. Sarah Mitchell",
      password: dentistPassword,
      role: "dentist",
    },
  });

  const receptionist = await prisma.user.upsert({
    where: { email: "reception@luminousdental.com" },
    update: {},
    create: {
      email: "reception@luminousdental.com",
      name: "Front Desk",
      password: receptionistPassword,
      role: "receptionist",
    },
  });

  console.log("Users seeded:", admin.email, dentistUser.email, receptionist.email);

  // ─── Doctors ────────────────────────────────────────────────
  const doctorsData = [
    {
      name: "Dr. Sarah Mitchell",
      slug: "dr-sarah-mitchell",
      title: "DDS, FAGD — General & Cosmetic Dentistry",
      bio: "Dr. Sarah Mitchell brings over fifteen years of clinical experience to her role as the practice's lead general and cosmetic dentist. A graduate of the University of Michigan School of Dentistry, she completed her Fellowship in the Academy of General Dentistry — a distinction held by fewer than six percent of dentists nationwide — reflecting her commitment to continuing education and comprehensive patient care.",
      portrait: "/images/doctors/dr-sarah-mitchell.jpg",
      specializations: "Cosmetic Dentistry, Smile Makeovers, Porcelain Veneers, General Dentistry, Full-Mouth Rehabilitation",
      qualifications: "DDS — University of Michigan School of Dentistry, Fellowship — Academy of General Dentistry, Advanced training in cosmetic dentistry — Spear Education",
      experience: "15+ years of clinical practice",
      languages: "English, Spanish",
      memberships: "Academy of General Dentistry, American Dental Association, Michigan Dental Association, American Academy of Cosmetic Dentistry",
      email: "dr.mitchell@luminousdental.com",
      displayOrder: 1,
      featured: true,
      workingHours: "Mon-Wed: 8AM-5PM, Thu: 8AM-7PM, Fri: 8AM-3PM",
    },
    {
      name: "Dr. James Chen",
      slug: "dr-james-chen",
      title: "DMD, MS — Orthodontics & Implant Dentistry",
      bio: "Dr. James Chen is a dual-specialist in orthodontics and implant dentistry, combining two decades of focused training to address complex cases that involve both tooth alignment and structural restoration. He earned his Doctor of Dental Medicine degree from the University of Pennsylvania and completed a Master of Science in Oral Biology with a research focus on osseointegration mechanics in dental implants.",
      portrait: "/images/doctors/dr-james-chen.jpg",
      specializations: "Orthodontics, Dental Implants, Invisalign, Oral Surgery, Full-Arch Restoration",
      qualifications: "DMD — University of Pennsylvania, MS in Oral Biology — University of Pennsylvania, Certificate in Orthodontics — University of Pennsylvania",
      experience: "12+ years of specialized practice",
      languages: "English, Mandarin",
      memberships: "American Association of Orthodontists, American Academy of Oral and Maxillofacial Surgeons, International Congress of Oral Implantologists",
      email: "dr.chen@luminousdental.com",
      displayOrder: 2,
      featured: true,
      workingHours: "Mon-Thu: 8:30AM-5PM, Fri: 8:30AM-2PM",
    },
    {
      name: "Dr. Emily Rodriguez",
      slug: "dr-emily-rodriguez",
      title: "DDS — Pediatric Dentistry",
      bio: "Dr. Emily Rodriguez chose pediatric dentistry because she believes the dental experiences children have today shape their relationship with oral health for life. She earned her Doctor of Dental Surgery degree from Columbia University and completed a two-year pediatric dentistry residency at Children's Hospital of New York.",
      portrait: "/images/doctors/dr-emily-rodriguez.jpg",
      specializations: "Pediatric Dentistry, Children's Dental Care, Sedation Dentistry, Early Orthodontic Assessment, Special Needs Dentistry",
      qualifications: "DDS — Columbia University College of Dental Medicine, Certificate in Pediatric Dentistry — Children's Hospital of New York, Board Certified — American Board of Pediatric Dentistry",
      experience: "10+ years of pediatric dental practice",
      languages: "English, Spanish, Portuguese",
      memberships: "American Academy of Pediatric Dentistry, American Dental Association, American Board of Pediatric Dentistry",
      email: "dr.rodriguez@luminousdental.com",
      displayOrder: 3,
      featured: false,
      workingHours: "Mon-Thu: 8AM-4:30PM, Fri: 8AM-12PM",
    },
    {
      name: "Dr. Michael Park",
      slug: "dr-michael-park",
      title: "DDS, FACD — Oral Surgery & Implant Dentistry",
      bio: "Dr. Michael Park is the practice's most experienced clinician, with over eighteen years devoted exclusively to oral and maxillofacial surgery and implant placement. He earned his dental degree from UCLA and completed a four-year oral and maxillofacial surgery residency at the University of San Francisco Medical Center.",
      portrait: "/images/doctors/dr-michael-park.jpg",
      specializations: "Oral and Maxillofacial Surgery, Dental Implant Placement, Wisdom Tooth Extraction, Bone Grafting, Orthognathic Surgery",
      qualifications: "DDS — UCLA School of Dentistry, Certificate in Oral and Maxillofacial Surgery — UCSF Medical Center, Fellow — American College of Dentists",
      experience: "18+ years of surgical practice",
      languages: "English, Korean",
      memberships: "American Association of Oral and Maxillofacial Surgeons, American College of Dentists, American Dental Association",
      email: "dr.park@luminousdental.com",
      displayOrder: 4,
      featured: true,
      workingHours: "Mon-Wed: 7:30AM-4PM, Thu-Fri: 7:30AM-2PM",
    },
    {
      name: "Dr. Amanda Foster",
      slug: "dr-amanda-foster",
      title: "DMD — Periodontics",
      bio: "Dr. Amanda Foster specializes in the diagnosis, treatment, and management of periodontal disease — the leading cause of tooth loss in adults — and the placement of dental implants in compromised periodontal environments. She earned her Doctor of Dental Medicine degree from the University of Connecticut.",
      portrait: "/images/doctors/dr-amanda-foster.jpg",
      specializations: "Periodontics, Gum Disease Treatment, Dental Implants, Soft Tissue Grafting, Regenerative Periodontal Surgery",
      qualifications: "DMD — University of Connecticut, Certificate in Periodontics — University of Connecticut, Board Certified — American Board of Periodontology",
      experience: "14+ years of periodontal practice",
      languages: "English",
      memberships: "American Academy of Periodontology, American Dental Association, American Board of Periodontology, International Team for Implantology",
      email: "dr.foster@luminousdental.com",
      displayOrder: 5,
      featured: false,
      workingHours: "Mon-Thu: 8AM-5PM, Fri: By appointment only",
    },
  ];

  const createdDoctors: Record<string, string> = {};

  for (const doc of doctorsData) {
    const doctor = await prisma.doctor.upsert({
      where: { slug: doc.slug },
      update: {},
      create: doc,
    });
    createdDoctors[doc.slug] = doctor.id;
  }

  console.log("Doctors seeded:", Object.keys(createdDoctors).length);

  // ─── Services ───────────────────────────────────────────────
  const servicesData = [
    {
      title: "Emergency Dentistry",
      slug: "emergency-dentistry",
      shortDescription: "Immediate, same-day dental care for urgent situations when you need relief now.",
      description: "Dental emergencies don't follow a schedule. A cracked tooth at dinner, sudden swelling on a Saturday morning, or pain that wakes you at 3 AM — these situations demand immediate attention, not a voicemail and a next-month appointment. Our emergency dentistry service is designed around one principle: when you need help, you get help. We reserve dedicated appointment slots each day specifically for emergency cases, and our team is trained to diagnose and treat the most common dental crises in a single visit when possible.",
      heroImage: "/images/services/emergency-dentistry.jpg",
      icon: "Phone",
      benefits: "Same-day appointments reserved for emergency cases, On-site digital X-rays for immediate diagnosis, Pain management and stabilization in the first visit, Extended availability during evenings and weekends, Clear cost estimates before treatment begins",
      procedure: "Call our emergency line and describe your symptoms to our triage team, Arrive at the clinic where we prioritize your assessment immediately, Receive a rapid diagnostic evaluation with digital imaging if needed, Get pain relief and stabilization treatment on the same visit, Receive a detailed treatment plan and cost estimate before any further procedures",
      recovery: "Recovery depends entirely on the nature of the emergency. Simple repairs like filling a fractured tooth typically involve minimal downtime. More complex situations may require a few days of modified eating and over-the-counter pain management.",
      pricing: "Emergency consultation from $150",
      featured: true,
      displayOrder: 1,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "Dental Implants",
      slug: "dental-implants",
      shortDescription: "Permanent tooth replacement that integrates with your jawbone and functions like natural teeth.",
      description: "When a tooth is lost, the consequences go beyond appearance. The underlying jawbone begins to deteriorate, surrounding teeth shift out of position, and the simple act of chewing becomes increasingly difficult on the affected side. Dental implants address all of these problems by replacing the tooth root itself, not just the visible crown. A dental implant is a biocompatible titanium post surgically placed into the jawbone, where it undergoes osseointegration — a natural process where bone tissue grows around and bonds with the implant surface.",
      heroImage: "/images/services/dental-implants.jpg",
      icon: "Smile",
      benefits: "Prevents jawbone loss after tooth extraction, Preserves the position of adjacent teeth, Restores full chewing strength and bite function, Permanent solution with proper care lasting decades, Natural appearance — custom-matched to surrounding teeth",
      procedure: "Comprehensive examination including 3D cone-beam CT scan of the jaw, Treatment planning with digital simulation of final restoration, Surgical placement of the titanium implant post under local anesthesia, Healing period of 3 to 6 months for osseointegration to complete, Abutment placement and impressions for the custom crown or bridge",
      recovery: "Most patients return to normal activities within two to three days of implant surgery. Some swelling and mild discomfort are expected for the first week, manageable with prescribed medication.",
      pricing: "Starting from $3,000 per implant",
      featured: true,
      displayOrder: 2,
      doctorId: createdDoctors["dr-michael-park"],
    },
    {
      title: "Cosmetic Dentistry",
      slug: "cosmetic-dentistry",
      shortDescription: "Comprehensive smile enhancement combining artistry with clinical precision.",
      description: "Your smile is one of the first things people notice, and how you feel about it affects how you move through the world. Cosmetic dentistry isn't about vanity — it's about aligning the way your teeth look with the way you want to present yourself. Whether you're dealing with discoloration, gaps, chips, or a combination of concerns, a well-planned cosmetic approach can deliver results that look completely natural.",
      heroImage: "/images/services/cosmetic-dentistry.jpg",
      icon: "Sparkles",
      benefits: "Digital preview of expected results before treatment begins, Conservative approach preserving as much natural tooth structure as possible, Custom shade matching for seamless integration with natural teeth, Comprehensive treatment planning addressing aesthetics and function together, Long-lasting results with proper maintenance",
      procedure: "Initial consultation to discuss goals, review options, and examine dental health, Digital smile design and photography to plan aesthetic outcomes, Preparatory treatments such as cleaning, minor orthodontics, or gum contouring, Fabrication of restorations with custom shade matching, Bonding, placement, or application of the chosen cosmetic treatments",
      recovery: "Recovery varies by procedure. Teeth whitening may involve 24 to 48 hours of sensitivity management. Veneer placement typically involves a few days of sensitivity to temperature.",
      pricing: "Consultation from $100",
      featured: true,
      displayOrder: 3,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "Teeth Whitening",
      slug: "teeth-whitening",
      shortDescription: "Professional-grade whitening for noticeably brighter teeth in a single visit or with take-home kits.",
      description: "Over time, teeth naturally accumulate surface stains from coffee, tea, wine, and everyday eating. Even with diligent brushing, the enamel develops a dullness that no amount of manual scrubbing can reverse. Professional whitening works at a deeper level, using controlled concentrations of hydrogen peroxide to break apart stain molecules within the tooth structure itself.",
      heroImage: "/images/services/teeth-whitening.jpg",
      icon: "Sun",
      benefits: "Noticeably whiter teeth in a single in-office session, Custom-fitted trays for even, consistent results at home, Safe, enamel-friendly formulas supervised by dental professionals, Dramatic improvement compared to over-the-counter products, Results lasting 1 to 3 years with proper maintenance",
      procedure: "Dental examination and professional cleaning to prepare teeth for whitening, Shade assessment to document current tooth color and establish a target shade, Gum protection applied to shield soft tissues during in-office whitening, Professional-strength whitening gel applied to teeth for 15 to 20 minutes, Final shade comparison and aftercare instructions",
      recovery: "Most patients experience temporary tooth sensitivity for 24 to 48 hours following in-office whitening. This is a normal response and resolves on its own.",
      pricing: "In-office whitening from $400, Take-home kits from $250",
      featured: false,
      displayOrder: 4,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "Invisalign",
      slug: "invisalign",
      shortDescription: "Clear aligner therapy for discreet, comfortable teeth straightening without metal braces.",
      description: "Traditional metal braces are effective, but they come with dietary restrictions, visible hardware, and the self-consciousness that comes with wearing them — especially for adults in professional environments. Invisalign offers a different path to straighter teeth using a series of clear, removable aligners that are virtually invisible when worn.",
      heroImage: "/images/services/invisalign.jpg",
      icon: "AlignVerticalSpaceAround",
      benefits: "Nearly invisible — most people won't notice you're wearing aligners, Removable for eating, brushing, and flossing, No dietary restrictions during treatment, Smooth plastic — no wire irritation to cheeks and lips, Digital preview of your treatment outcome before starting",
      procedure: "Comprehensive evaluation including digital scanning of your teeth, ClinCheck treatment plan showing the projected movement of each tooth, Custom aligners fabricated and delivered in sets with detailed wear instructions, Regular check-ups every six to eight weeks to monitor progress, Completion with retainers to maintain your new tooth positions long-term",
      recovery: "There is no recovery period with Invisalign. Each new aligner set may cause mild pressure or soreness for two to three days as your teeth begin moving.",
      pricing: "Starting from $3,500",
      featured: true,
      displayOrder: 5,
      doctorId: createdDoctors["dr-james-chen"],
    },
    {
      title: "Pediatric Dentistry",
      slug: "pediatric-dentistry",
      shortDescription: "Gentle, specialized dental care designed to keep children comfortable and build positive oral health habits.",
      description: "A child's relationship with the dentist begins early, and those early experiences shape how they feel about dental care for the rest of their lives. Our pediatric dentistry practice is built around the understanding that children aren't small adults — they have unique dental development patterns, different communication needs, and a genuine need to feel safe in the dental chair.",
      heroImage: "/images/services/pediatric-dentistry.jpg",
      icon: "Baby",
      benefits: "Age-appropriate communication and behavior guidance techniques, Preventive programs including sealants and fluoride treatments, Early orthodontic screening to identify developmental concerns, Specialized management of dental anxiety, Parent education on nutrition and home care routines",
      procedure: "Welcoming first visit designed as a fun introduction to the dental office, Gentle examination of teeth, gums, jaw, and bite development, Professional cleaning with techniques chosen for comfort, Fluoride application and dental sealants as appropriate, Developmental assessment including orthodontic screening",
      recovery: "Pediatric dental procedures are generally very low-impact. Cleanings, sealants, and fluoride treatments require no recovery time at all.",
      pricing: "Exam from $80",
      featured: false,
      displayOrder: 6,
      doctorId: createdDoctors["dr-emily-rodriguez"],
    },
    {
      title: "Root Canal Therapy",
      slug: "root-canal",
      shortDescription: "Targeted treatment to save an infected or damaged tooth by removing diseased pulp tissue.",
      description: "When the soft tissue inside your tooth — the pulp — becomes infected or severely inflamed, the result is often intense, persistent pain that doesn't respond to over-the-counter medication. Without treatment, the infection can spread to surrounding bone, create abscesses, and ultimately lead to tooth loss. Root canal therapy eliminates the infection, relieves the pain, and preserves your natural tooth.",
      heroImage: "/images/services/root-canal.jpg",
      icon: "ShieldCheck",
      benefits: "Eliminates infection and prevents its spread to surrounding tissues, Relieves the severe pain associated with pulp inflammation, Preserves your natural tooth rather than extracting it, Maintains proper chewing function and jawbone stimulation, Proven procedure with high long-term success rates",
      procedure: "Diagnostic evaluation including X-rays to confirm the extent of infection, Local anesthesia administered to completely numb the tooth, Small access opening created in the tooth to reach the pulp chamber, Infected pulp tissue carefully removed and canal system cleaned and shaped, Canals filled with biocompatible gutta-percha material and sealed, Tooth restored with a crown or filling to restore full strength and function",
      recovery: "Most patients experience significant pain relief within a day or two of root canal treatment. Mild tenderness around the treated tooth is normal for a few days.",
      pricing: "Starting from $800",
      featured: false,
      displayOrder: 7,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "Dental Crowns",
      slug: "crowns",
      shortDescription: "Custom restorations that cover and protect damaged teeth while restoring their shape, strength, and appearance.",
      description: "When a tooth is significantly weakened — whether from decay, fracture, a large filling, or root canal treatment — it loses its structural integrity and becomes vulnerable to further damage. A dental crown encases the entire visible portion of the tooth, distributing biting forces evenly and protecting what remains of the natural tooth structure underneath.",
      heroImage: "/images/services/crowns.jpg",
      icon: "Crown",
      benefits: "Restores full strength and function to weakened or damaged teeth, Protects vulnerable teeth from further fracture or decay, Custom color-matched to blend seamlessly with natural teeth, Digital impressions for accurate fit and comfort, Long-lasting protection with proper oral care",
      procedure: "Tooth preparation — removal of a thin layer of enamel to accommodate the crown, Digital impressions of the prepared tooth and surrounding teeth, Shade selection to match the crown precisely to your natural tooth color, Temporary crown placed to protect the tooth while the permanent crown is made, Permanent crown trial fitting, bite adjustment, and cementation at the second visit",
      recovery: "You may experience some sensitivity in the prepared tooth for a few days after each appointment. The temporary crown may feel slightly different from your natural tooth — this is expected.",
      pricing: "Starting from $900",
      featured: false,
      displayOrder: 8,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "Dental Veneers",
      slug: "veneers",
      shortDescription: "Thin porcelain shells bonded to tooth fronts for a natural, durable smile transformation.",
      description: "Dental veneers are among the most effective tools in cosmetic dentistry for a straightforward reason: they address multiple aesthetic concerns simultaneously with a single, conservative treatment. A veneer is a thin shell of porcelain, typically less than a millimeter thick, custom-fabricated and bonded directly to the front surface of a tooth.",
      heroImage: "/images/services/veneers.jpg",
      icon: "Layers",
      benefits: "Addresses multiple cosmetic concerns with a single treatment, Minimal tooth preparation — preserves most natural enamel, Porcelain color stability resists staining, Natural light-handling properties mimic real enamel, Durable material lasting 10 to 20 years",
      procedure: "Comprehensive smile analysis including photographs and digital impressions, Diagnostic wax-up to design the shape and proportions of each veneer, Minimal tooth preparation — removal of a thin enamel layer, Digital impressions sent to the dental laboratory for fabrication, Try-in appointment to evaluate color, shape, and fit, Permanent bonding with adhesive protocols designed for long-term retention",
      recovery: "Veneer placement involves minimal recovery. You may experience mild sensitivity to hot and cold for a few days after preparation.",
      pricing: "Starting from $1,000 per veneer",
      featured: false,
      displayOrder: 9,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
    {
      title: "General Dentistry",
      slug: "general-dentistry",
      shortDescription: "Comprehensive preventive and restorative care that forms the foundation of lifelong oral health.",
      description: "General dentistry is where your oral health journey begins — and where it's maintained throughout your life. It encompasses the routine examinations, professional cleanings, early cavity detection, gum disease screening, and preventive treatments that keep small problems from becoming big ones. Think of it as the primary care of dentistry.",
      heroImage: "/images/services/general-dentistry.jpg",
      icon: "Stethoscope",
      benefits: "Thorough examinations with digital X-rays and intraoral imaging, Professional cleanings tailored to your specific gum health needs, Early detection of cavities, gum disease, and oral cancer, Preventive treatments including sealants and fluoride applications, Personalized prevention plans based on individual risk assessment",
      procedure: "Comprehensive dental examination including visual inspection, digital X-rays, and intraoral photography, Periodontal assessment measuring gum health, Professional cleaning — scaling to remove tartar, polishing to smooth surfaces, Fluoride treatment and preventive recommendations, Treatment planning for any identified issues with clear cost estimates",
      recovery: "General dentistry procedures range from no recovery time at all — cleanings, examinations, and fluoride treatments — to brief adjustment periods for restorative work.",
      pricing: "Exam and cleaning from $150",
      featured: true,
      displayOrder: 10,
      doctorId: createdDoctors["dr-sarah-mitchell"],
    },
  ];

  const createdServices: Record<string, string> = {};

  for (const svc of servicesData) {
    const service = await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    });
    createdServices[svc.slug] = service.id;
  }

  console.log("Services seeded:", Object.keys(createdServices).length);

  // ─── Testimonials ───────────────────────────────────────────
  const testimonialsData = [
    {
      patientName: "Jennifer Walsh",
      patientInitials: "JW",
      rating: 5,
      content: "Dr. Mitchell and her team completely transformed my smile. I was nervous about veneers, but the digital preview gave me confidence before committing. The results exceeded every expectation — natural, beautiful, and completely pain-free throughout the process.",
      treatmentType: "Cosmetic Dentistry",
      featured: true,
      displayOrder: 1,
    },
    {
      patientName: "Robert Kim",
      patientInitials: "RK",
      rating: 5,
      content: "After losing a tooth to an accident, Dr. Park performed an implant surgery that was remarkably smooth. The 3D planning meant the procedure was quick and the recovery was minimal. Three months later, I can't tell the difference between the implant and my natural teeth.",
      treatmentType: "Dental Implants",
      featured: true,
      displayOrder: 2,
    },
    {
      patientName: "Sarah Anderson",
      patientInitials: "SA",
      rating: 5,
      content: "My son used to scream at the mention of the dentist. Dr. Rodriguez changed everything. Her patience and gentleness turned our appointment from a nightmare into a positive experience. He actually asks when we're going back. That says it all.",
      treatmentType: "Pediatric Dentistry",
      featured: true,
      displayOrder: 3,
    },
    {
      patientName: "Michael Torres",
      patientInitials: "MT",
      rating: 5,
      content: "I put off dealing with a cracked tooth for months because of fear. The emergency team got me in the same day, explained everything clearly, and had me fixed up and pain-free within two hours. Outstanding service when I needed it most.",
      treatmentType: "Emergency Dentistry",
      featured: false,
      displayOrder: 4,
    },
    {
      patientName: "Lisa Chang",
      patientInitials: "LC",
      rating: 5,
      content: "I'm halfway through my Invisalign treatment with Dr. Chen and the results so far are incredible. The digital preview showed me exactly what to expect, and my teeth are moving exactly as planned. The aligners are barely noticeable — most colleagues have no idea.",
      treatmentType: "Invisalign",
      featured: false,
      displayOrder: 5,
    },
    {
      patientName: "David Mitchell",
      patientInitials: "DM",
      rating: 5,
      content: "The professional whitening treatment gave me results I never achieved with drugstore products. One session, an hour, and my teeth are several shades lighter. The team was honest about what to expect, and the results matched their assessment perfectly.",
      treatmentType: "Teeth Whitening",
      featured: true,
      displayOrder: 6,
    },
    {
      patientName: "Amanda Rodriguez",
      patientInitials: "AR",
      rating: 4,
      content: "Dr. Foster identified a gum issue that my previous dentist missed for years. The treatment plan was thorough, the procedure was much less uncomfortable than I expected, and my gums are healthier now than they've been in a decade.",
      treatmentType: "Periodontics",
      featured: false,
      displayOrder: 7,
    },
    {
      patientName: "Thomas Wright",
      patientInitials: "TW",
      rating: 5,
      content: "After a root canal, I expected weeks of discomfort. Instead, the pain was gone within a day. The crown was placed perfectly and feels completely natural. The entire process from diagnosis to final restoration was handled with professionalism and genuine care.",
      treatmentType: "Root Canal Therapy",
      featured: false,
      displayOrder: 8,
    },
  ];

  for (const testimonial of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({
      where: { patientName: testimonial.patientName },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }

  console.log("Testimonials seeded:", testimonialsData.length);

  // ─── FAQ ────────────────────────────────────────────────────
  const faqsData = [
    {
      question: "What should I do in a dental emergency?",
      answer: "Call our emergency line immediately. We reserve appointment slots each day specifically for emergency patients. In most cases, we can see you within a few hours. For true after-hours emergencies, our answering service can connect you with a clinician.",
      category: "Emergency",
      displayOrder: 1,
      serviceId: createdServices["emergency-dentistry"],
    },
    {
      question: "How quickly can I be seen for an emergency?",
      answer: "We reserve appointment slots each day specifically for emergency patients. In most cases, we can see you within a few hours of your call. During peak periods, we'll provide pain management guidance over the phone until your appointment.",
      category: "Emergency",
      displayOrder: 2,
      serviceId: createdServices["emergency-dentistry"],
    },
    {
      question: "Am I a candidate for dental implants?",
      answer: "Most adults with adequate jawbone density and good overall health are candidates for implants. We conduct a thorough assessment including bone density imaging to determine if implants are appropriate for your specific situation.",
      category: "Implants",
      displayOrder: 3,
      serviceId: createdServices["dental-implants"],
    },
    {
      question: "How long does the implant process take?",
      answer: "From initial consultation to final restoration, the process typically takes four to eight months. This includes surgical placement, healing period for osseointegration, and fabrication of your permanent restoration.",
      category: "Implants",
      displayOrder: 4,
      serviceId: createdServices["dental-implants"],
    },
    {
      question: "What is the success rate of dental implants?",
      answer: "Dental implants have a documented success rate of 95% or higher over ten years when placed by experienced clinicians in patients with adequate bone quality.",
      category: "Implants",
      displayOrder: 5,
      serviceId: createdServices["dental-implants"],
    },
    {
      question: "How much whiter will my teeth get with professional whitening?",
      answer: "Results vary based on the original shade and type of staining. Most patients achieve a noticeable improvement of several shades. Yellow and brown stains typically respond very well to whitening.",
      category: "Whitening",
      displayOrder: 6,
      serviceId: createdServices["teeth-whitening"],
    },
    {
      question: "How long do whitening results last?",
      answer: "With proper care — avoiding heavy staining foods and maintaining good oral hygiene — professional whitening results typically last one to three years.",
      category: "Whitening",
      displayOrder: 7,
      serviceId: createdServices["teeth-whitening"],
    },
    {
      question: "Is Invisalign as effective as traditional braces?",
      answer: "For mild to moderate alignment issues — crowding, spacing, overbite, underbite — Invisalign is highly effective and produces results comparable to traditional braces. More complex cases may require traditional braces.",
      category: "Orthodontics",
      displayOrder: 8,
      serviceId: createdServices["invisalign"],
    },
    {
      question: "How many hours per day do I need to wear Invisalign aligners?",
      answer: "For optimal results, aligners should be worn 20 to 22 hours per day, removing them only for eating, drinking anything other than water, brushing, and flossing.",
      category: "Orthodontics",
      displayOrder: 9,
      serviceId: createdServices["invisalign"],
    },
    {
      question: "When should my child first visit the dentist?",
      answer: "The American Academy of Pediatric Dentistry recommends a first dental visit by the child's first birthday or within six months of the first tooth erupting.",
      category: "Pediatric",
      displayOrder: 10,
      serviceId: createdServices["pediatric-dentistry"],
    },
    {
      question: "Are dental X-rays safe for children?",
      answer: "We use digital X-rays, which emit approximately 80% less radiation than traditional film X-rays. We follow the ALARA principle and only take X-rays when clinically necessary.",
      category: "Pediatric",
      displayOrder: 11,
      serviceId: createdServices["pediatric-dentistry"],
    },
    {
      question: "Does a root canal hurt?",
      answer: "With modern anesthesia and techniques, root canal treatment is typically no more painful than receiving a filling. The discomfort patients associate with root canals usually comes from the infection itself, not the procedure.",
      category: "Root Canal",
      displayOrder: 12,
      serviceId: createdServices["root-canal"],
    },
    {
      question: "Why do I need a crown after a root canal?",
      answer: "A tooth that has undergone root canal treatment becomes more brittle over time. A crown provides structural reinforcement that protects the tooth from fracture under normal chewing forces.",
      category: "Root Canal",
      displayOrder: 13,
      serviceId: createdServices["root-canal"],
    },
    {
      question: "How long does a dental crown last?",
      answer: "With proper oral hygiene and regular dental visits, well-made crowns typically last 10 to 15 years or longer. Porcelain and zirconia crowns are highly resistant to wear and staining.",
      category: "Crowns",
      displayOrder: 14,
      serviceId: createdServices["crowns"],
    },
    {
      question: "Will a crown look natural?",
      answer: "Absolutely. Modern dental crowns are fabricated to match the exact shade, shape, and translucency of your natural teeth. We use digital photography and detailed shade notes to communicate with our ceramist.",
      category: "Crowns",
      displayOrder: 15,
      serviceId: createdServices["crowns"],
    },
    {
      question: "Are veneers permanent?",
      answer: "Veneers are considered a permanent treatment because the enamel removal during preparation means your teeth will always need some form of covering. However, the veneers themselves typically last 10 to 20 years or longer with proper care.",
      category: "Veneers",
      displayOrder: 16,
      serviceId: createdServices["veneers"],
    },
    {
      question: "Will veneers look bulky or unnatural?",
      answer: "When properly planned and fabricated, veneers should be indistinguishable from natural teeth. The diagnostic wax-up process allows us to design veneers that complement your facial features and smile proportions.",
      category: "Veneers",
      displayOrder: 17,
      serviceId: createdServices["veneers"],
    },
    {
      question: "How often should I visit the dentist?",
      answer: "For most patients, we recommend a check-up and professional cleaning every six months. However, some patients benefit from more frequent visits based on individual risk factors.",
      category: "General",
      displayOrder: 18,
      serviceId: createdServices["general-dentistry"],
    },
    {
      question: "What's the difference between a cleaning and deep cleaning?",
      answer: "A standard cleaning removes plaque and tartar from above the gumline on teeth with healthy gum attachment. A deep cleaning addresses tartar and bacteria below the gumline in pockets formed by gum disease.",
      category: "General",
      displayOrder: 19,
      serviceId: createdServices["general-dentistry"],
    },
    {
      question: "Do digital X-rays really expose me to less radiation?",
      answer: "Yes, digital X-rays expose you to approximately 80% less radiation than traditional film X-rays. The sensor requires significantly less exposure to produce a clear image.",
      category: "General",
      displayOrder: 20,
      serviceId: createdServices["general-dentistry"],
    },
  ];

  for (const faq of faqsData) {
    await prisma.fAQ.create({ data: faq });
  }

  console.log("FAQs seeded:", faqsData.length);

  // ─── Blog Posts ─────────────────────────────────────────────
  const blogPostsData = [
    {
      title: "The Complete Guide to Dental Implants: What to Expect",
      slug: "complete-guide-dental-implants",
      excerpt: "Everything you need to know about the dental implant process, from initial consultation to final restoration.",
      content: "Dental implants have revolutionized the way we replace missing teeth. Unlike traditional bridges or dentures, implants replace the tooth root itself, providing a permanent foundation that prevents bone loss and maintains facial structure. In this comprehensive guide, we walk you through every stage of the implant process — from the initial 3D scan and treatment planning through surgical placement, the healing period, and the delivery of your custom restoration. You'll learn about candidacy factors, the science of osseointegration, and how modern guided surgery techniques have made the procedure safer and more predictable than ever.",
      featuredImage: "/images/blog/dental-implants-guide.jpg",
      author: "Dr. Sarah Mitchell",
      category: "Implants",
      tags: "dental implants,tooth replacement,osseointegration,surgery",
      readingTime: 12,
      featured: true,
      published: true,
      publishedAt: new Date("2025-01-15"),
      serviceId: createdServices["dental-implants"],
    },
    {
      title: "5 Signs You Might Need a Root Canal (And Why It's Not as Scary as You Think)",
      slug: "signs-you-need-root-canal",
      excerpt: "Recognizing the symptoms of an infected tooth and understanding why modern root canal treatment is virtually painless.",
      content: "Many patients fear the words 'root canal,' but modern techniques have transformed this routine procedure into a comfortable experience that's often no more involved than getting a filling. The real discomfort comes from the infection itself, not the treatment. In this article, we cover five key signs that indicate you may need root canal therapy — persistent toothache, sensitivity to heat that lingers, gum swelling, tooth discoloration, and a recurring pimple on the gums. We also explain what happens during the procedure, how long it takes, and what recovery looks like.",
      featuredImage: "/images/blog/root-canal-signs.jpg",
      author: "Dr. Sarah Mitchell",
      category: "Restorative",
      tags: "root canal,toothache,infection,pain management",
      readingTime: 8,
      featured: true,
      published: true,
      publishedAt: new Date("2025-02-10"),
      serviceId: createdServices["root-canal"],
    },
    {
      title: "Invisalign vs. Traditional Braces: A Complete Comparison for 2025",
      slug: "invisalign-vs-traditional-braces",
      excerpt: "An honest, detailed comparison of clear aligners and metal braces to help you choose the right orthodontic treatment.",
      content: "Choosing between Invisalign and traditional braces isn't just about aesthetics — it's about your specific alignment needs, lifestyle, and commitment to treatment. Both options have evolved significantly. Today's metal braces are smaller and more comfortable than their predecessors, while Invisalign can now address cases that previously required brackets and wires. In this article, we compare treatment duration, cost, maintenance, dietary restrictions, comfort, and ideal candidacy for each approach. We also address common misconceptions and help you understand which factors matter most when making your decision.",
      featuredImage: "/images/blog/invisalign-vs-braces.jpg",
      author: "Dr. James Chen",
      category: "Orthodontics",
      tags: "invisalign,braces,orthodontics,teeth straightening",
      readingTime: 10,
      featured: false,
      published: true,
      publishedAt: new Date("2025-03-05"),
      serviceId: createdServices["invisalign"],
    },
    {
      title: "Pediatric Dental Care: Building Healthy Habits from the Start",
      slug: "pediatric-dental-care-habits",
      excerpt: "How to establish a lifelong foundation of oral health for your child from their very first tooth.",
      content: "A child's oral health journey begins before their first tooth even erupts. Parents play a critical role in establishing cleaning routines, managing diet, and creating positive associations with dental care. This guide covers everything from infant oral hygiene and first dental visit timing to managing thumb-sucking habits, understanding fluoride needs, and preparing your child for their first dental appointment. We also discuss common childhood dental issues like baby bottle tooth decay, early childhood cavities, and the importance of dental sealants as permanent teeth come in.",
      featuredImage: "/images/blog/pediatric-dental-care.jpg",
      author: "Dr. Emily Rodriguez",
      category: "Pediatric",
      tags: "pediatric dentistry,children oral health,first dental visit,fluoride",
      readingTime: 9,
      featured: true,
      published: true,
      publishedAt: new Date("2025-03-20"),
      serviceId: createdServices["pediatric-dentistry"],
    },
    {
      title: "Professional Teeth Whitening: What Actually Works",
      slug: "professional-teeth-whitening-guide",
      excerpt: "Separating fact from fiction in the world of teeth whitening — what professional treatment offers that over-the-counter products cannot.",
      content: "The teeth whitening market is saturated with products promising dramatic results, but professional whitening remains the gold standard for safety, effectiveness, and longevity. In this article, we explain the science behind peroxide-based whitening, why concentration and application time matter, and how professional supervision prevents the enamel damage that can occur with unregulated products. We compare in-office treatments, dentist-supervised take-home trays, and popular over-the-counter options, explaining why the investment in professional whitening consistently delivers superior and more predictable results.",
      featuredImage: "/images/blog/teeth-whitening-guide.jpg",
      author: "Dr. Sarah Mitchell",
      category: "Cosmetic",
      tags: "teeth whitening,cosmetic dentistry,bright smile,enamel safety",
      readingTime: 7,
      featured: false,
      published: true,
      publishedAt: new Date("2025-04-12"),
      serviceId: createdServices["teeth-whitening"],
    },
    {
      title: "Understanding Gum Disease: The Silent Threat to Your Oral Health",
      slug: "understanding-gum-disease",
      excerpt: "Why gum disease is the leading cause of tooth loss in adults and how early detection changes the outcome.",
      content: "Periodontal disease affects nearly half of adults over 30, yet most people don't recognize the early signs until significant damage has occurred. Gingivitis — the earliest stage — is fully reversible with professional cleaning and improved home care. But without intervention, it progresses to periodontitis, where the infection destroys the bone and tissue that hold teeth in place. This article explains the stages of gum disease, risk factors including smoking and diabetes, the connection between oral and systemic health, and the treatment options available at every stage. We also discuss how regular periodontal monitoring can catch problems before they become serious.",
      featuredImage: "/images/blog/gum-disease-guide.jpg",
      author: "Dr. Amanda Foster",
      category: "Periodontics",
      tags: "gum disease,periodontics,oral health,prevention",
      readingTime: 11,
      featured: false,
      published: true,
      publishedAt: new Date("2025-05-08"),
    },
  ];

  for (const post of blogPostsData) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });
    if (!existing) {
      await prisma.blogPost.create({ data: post });
    }
  }

  console.log("Blog posts seeded:", blogPostsData.length);

  // ─── Insurance Providers ────────────────────────────────────
  const insuranceData = [
    {
      name: "Delta Dental",
      logo: "/images/insurance/delta-dental.svg",
      coverageNotes: "We are an in-network provider for Delta Dental PPO and Premier plans. Preventive care is typically covered at 100%.",
      displayOrder: 1,
    },
    {
      name: "Cigna Dental",
      logo: "/images/insurance/cigna.svg",
      coverageNotes: "In-network for Cigna DHMO and PPO plans. Covers preventive, basic, and major services with varying copays.",
      displayOrder: 2,
    },
    {
      name: "Aetna Dental",
      logo: "/images/insurance/aetna.svg",
      coverageNotes: "We accept Aetna PPO plans. Preventive services covered at 100%, basic services at 80%, major services at 50%.",
      displayOrder: 3,
    },
    {
      name: "MetLife Dental",
      logo: "/images/insurance/metlife.svg",
      coverageNotes: "In-network provider for MetLife PDP and PDP Plus plans. Coverage varies by plan level.",
      displayOrder: 4,
    },
    {
      name: "United Healthcare Dental",
      logo: "/images/insurance/uhc.svg",
      coverageNotes: "We accept United Healthcare dental plans. Contact our office to verify your specific plan benefits.",
      displayOrder: 5,
    },
    {
      name: "Guardian Dental",
      logo: "/images/insurance/guardian.svg",
      coverageNotes: "In-network for Guardian Direct and employer-sponsored plans. Preventive services typically fully covered.",
      displayOrder: 6,
    },
    {
      name: "Humana Dental",
      logo: "/images/insurance/humana.svg",
      coverageNotes: "We accept Humana dental PPO plans. Coverage levels vary — we verify benefits before treatment.",
      displayOrder: 7,
    },
    {
      name: "Blue Cross Blue Shield Dental",
      logo: "/images/insurance/bcbs.svg",
      coverageNotes: "In-network for BCBS dental PPO plans across multiple states. Coverage includes preventive, basic, and major services.",
      displayOrder: 8,
    },
  ];

  for (const insurance of insuranceData) {
    const existing = await prisma.insurance.findFirst({
      where: { name: insurance.name },
    });
    if (!existing) {
      await prisma.insurance.create({ data: insurance });
    }
  }

  console.log("Insurance providers seeded:", insuranceData.length);

  // ─── Gallery Images ─────────────────────────────────────────
  const galleryData = [
    {
      title: "Smile Transformation - Before & After",
      imageUrl: "/images/gallery/smile-transformation-1.jpg",
      beforeUrl: "/images/gallery/before-1.jpg",
      afterUrl: "/images/gallery/after-1.jpg",
      category: "Cosmetic",
      description: "Complete smile makeover using porcelain veneers, achieving a natural and bright result.",
      altText: "Before and after dental veneer treatment showing natural smile transformation",
      featured: true,
      displayOrder: 1,
      serviceId: createdServices["veneers"],
    },
    {
      title: "Dental Implant Restoration",
      imageUrl: "/images/gallery/implant-restoration-1.jpg",
      beforeUrl: "/images/gallery/implant-before-1.jpg",
      afterUrl: "/images/gallery/implant-after-1.jpg",
      category: "Implants",
      description: "Single tooth implant replacing a missing molar, blending seamlessly with natural teeth.",
      altText: "Before and after dental implant treatment replacing a missing tooth",
      featured: true,
      displayOrder: 2,
      serviceId: createdServices["dental-implants"],
    },
    {
      title: "Professional Whitening Results",
      imageUrl: "/images/gallery/whitening-result-1.jpg",
      category: "Whitening",
      description: "Professional in-office whitening achieving several shades of improvement in a single visit.",
      altText: "Teeth whitening results showing noticeably brighter teeth after professional treatment",
      featured: false,
      displayOrder: 3,
      serviceId: createdServices["teeth-whitening"],
    },
    {
      title: "Invisalign Progress",
      imageUrl: "/images/gallery/invisalign-progress-1.jpg",
      beforeUrl: "/images/gallery/invisalign-before-1.jpg",
      afterUrl: "/images/gallery/invisalign-after-1.jpg",
      category: "Orthodontics",
      description: "Invisalign treatment results for crowding correction over 14 months of treatment.",
      altText: "Before and after Invisalign treatment showing improved teeth alignment",
      featured: true,
      displayOrder: 4,
      serviceId: createdServices["invisalign"],
    },
  ];

  for (const image of galleryData) {
    await prisma.galleryImage.create({ data: image });
  }

  console.log("Gallery images seeded:", galleryData.length);

  // ─── Site Settings ──────────────────────────────────────────
  const settingsData = [
    { key: "clinic_name", value: "Luminous Dental", group: "general" },
    { key: "clinic_tagline", value: "Exceptional Dental Care, Beautiful Smiles", group: "general" },
    { key: "clinic_email", value: "info@luminousdental.com", group: "general" },
    { key: "clinic_phone", value: "(555) 123-4567", group: "contact" },
    { key: "clinic_phone_secondary", value: "(555) 123-4568", group: "contact" },
    { key: "clinic_address_line1", value: "123 Dental Avenue", group: "contact" },
    { key: "clinic_address_line2", value: "Suite 200", group: "contact" },
    { key: "clinic_city", value: "New York", group: "contact" },
    { key: "clinic_state", value: "NY", group: "contact" },
    { key: "clinic_zip", value: "10001", group: "contact" },
    { key: "clinic_country", value: "United States", group: "contact" },
    { key: "hours_monday", value: "8:00 AM - 6:00 PM", group: "hours" },
    { key: "hours_tuesday", value: "8:00 AM - 6:00 PM", group: "hours" },
    { key: "hours_wednesday", value: "8:00 AM - 6:00 PM", group: "hours" },
    { key: "hours_thursday", value: "8:00 AM - 7:00 PM", group: "hours" },
    { key: "hours_friday", value: "8:00 AM - 5:00 PM", group: "hours" },
    { key: "hours_saturday", value: "9:00 AM - 2:00 PM", group: "hours" },
    { key: "hours_sunday", value: "Closed", group: "hours" },
    { key: "emergency_phone", value: "(555) 911-DENTAL", group: "emergency" },
    { key: "social_facebook", value: "https://facebook.com/luminousdental", group: "social" },
    { key: "social_instagram", value: "https://instagram.com/luminousdental", group: "social" },
    { key: "social_twitter", value: "https://twitter.com/luminousdental", group: "social" },
    { key: "social_youtube", value: "https://youtube.com/luminousdental", group: "social" },
    { key: "social_linkedin", value: "https://linkedin.com/company/luminousdental", group: "social" },
    { key: "meta_title", value: "Luminous Dental — Premium Dental Care in New York", group: "seo" },
    { key: "meta_description", value: "Luminous Dental provides exceptional preventive, cosmetic, and restorative dentistry in New York. Experienced dentists, modern technology, beautiful results.", group: "seo" },
    { key: "logo_url", value: "/images/logo.svg", group: "branding" },
    { key: "favicon_url", value: "/favicon.ico", group: "branding" },
    { key: "primary_color", value: "#0891b2", group: "branding" },
    { key: "footer_text", value: "© 2025 Luminous Dental. All rights reserved.", group: "general" },
  ];

  for (const setting of settingsData) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Site settings seeded:", settingsData.length);

  // ─── Sample Appointments (optional) ─────────────────────────
  const appointmentsData = [
    {
      patientName: "Alice Johnson",
      patientEmail: "alice.johnson@email.com",
      patientPhone: "(555) 234-5678",
      preferredDate: "2025-06-15",
      preferredTime: "10:00 AM",
      reason: "Regular dental checkup and cleaning",
      notes: "Patient has mild anxiety about dental visits",
      insurance: "Delta Dental",
      status: "confirmed",
      dentistId: createdDoctors["dr-sarah-mitchell"],
      serviceId: createdServices["general-dentistry"],
    },
    {
      patientName: "Bob Martinez",
      patientEmail: "bob.martinez@email.com",
      patientPhone: "(555) 345-6789",
      preferredDate: "2025-06-16",
      preferredTime: "2:00 PM",
      reason: "Interested in teeth whitening consultation",
      status: "pending",
      dentistId: createdDoctors["dr-sarah-mitchell"],
      serviceId: createdServices["teeth-whitening"],
    },
    {
      patientName: "Carol Williams",
      patientEmail: "carol.williams@email.com",
      patientPhone: "(555) 456-7890",
      preferredDate: "2025-06-17",
      preferredTime: "9:30 AM",
      reason: "Follow-up for dental implant placement",
      notes: "Second stage — abutment placement",
      insurance: "Cigna Dental",
      status: "confirmed",
      dentistId: createdDoctors["dr-michael-park"],
      serviceId: createdServices["dental-implants"],
    },
    {
      patientName: "David Lee",
      patientEmail: "david.lee@email.com",
      patientPhone: "(555) 567-8901",
      preferredDate: "2025-06-18",
      preferredTime: "11:00 AM",
      reason: "Child's first dental visit",
      status: "completed",
      dentistId: createdDoctors["dr-emily-rodriguez"],
      serviceId: createdServices["pediatric-dentistry"],
    },
    {
      patientName: "Emma Davis",
      patientEmail: "emma.davis@email.com",
      patientPhone: "(555) 678-9012",
      preferredDate: "2025-06-20",
      preferredTime: "3:00 PM",
      reason: "Invisalign consultation",
      insurance: "Aetna Dental",
      status: "pending",
      dentistId: createdDoctors["dr-james-chen"],
      serviceId: createdServices["invisalign"],
    },
  ];

  for (const appointment of appointmentsData) {
    await prisma.appointment.create({ data: appointment });
  }

  console.log("Sample appointments seeded:", appointmentsData.length);

  // ─── Sample Contact Inquiries ───────────────────────────────
  const inquiriesData = [
    {
      name: "Jessica Thompson",
      email: "jessica.t@email.com",
      phone: "(555) 111-2222",
      subject: "Question about insurance coverage",
      message: "I have Aetna dental insurance and want to know if veneers are covered under my plan. Can you help me understand my benefits?",
      status: "new",
    },
    {
      name: "Mark Anderson",
      email: "mark.anderson@email.com",
      subject: "Requesting appointment for emergency",
      message: "I have a severely broken tooth that's causing me a lot of pain. I need to be seen as soon as possible. Do you have any emergency slots available this week?",
      status: "in_progress",
    },
  ];

  for (const inquiry of inquiriesData) {
    await prisma.contactInquiry.create({ data: inquiry });
  }

  console.log("Contact inquiries seeded:", inquiriesData.length);

  // ─── Sample Newsletter Subscribers ──────────────────────────
  const subscribersData = [
    { email: "subscriber1@email.com", name: "John Smith" },
    { email: "subscriber2@email.com", name: "Emily Brown" },
    { email: "subscriber3@email.com", name: "Chris Wilson" },
  ];

  for (const subscriber of subscribersData) {
    const existing = await prisma.newsletter.findUnique({
      where: { email: subscriber.email },
    });
    if (!existing) {
      await prisma.newsletter.create({ data: subscriber });
    }
  }

  console.log("Newsletter subscribers seeded:", subscribersData.length);

  console.log("\nDatabase seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
