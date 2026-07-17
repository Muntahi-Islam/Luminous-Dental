export interface ServiceFAQ {
  question: string
  answer: string
}

export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string[]
  icon: string
  benefits: string[]
  procedure: string[]
  recovery: string
  faqs: ServiceFAQ[]
  relatedServices: string[]
  category: "preventive" | "cosmetic" | "restorative" | "emergency"
}

export const services: Service[] = [
  {
    slug: "emergency-dentistry",
    title: "Emergency Dentistry",
    shortDescription:
      "Immediate, same-day dental care for urgent situations when you need relief now.",
    description: [
      "Dental emergencies don't follow a schedule. A cracked tooth at dinner, sudden swelling on a Saturday morning, or pain that wakes you at 3 AM — these situations demand immediate attention, not a voicemail and a next-month appointment.",
      "Our emergency dentistry service is designed around one principle: when you need help, you get help. We reserve dedicated appointment slots each day specifically for emergency cases, and our team is trained to diagnose and treat the most common dental crises in a single visit when possible.",
      "From severe toothaches and knocked-out teeth to abscesses, broken restorations, and jaw injuries, we handle the full spectrum of dental emergencies. Our clinic is equipped with on-site digital radiography and advanced diagnostic tools so we can identify the problem quickly and begin treatment without delay.",
    ],
    icon: "Phone",
    benefits: [
      "Same-day appointments reserved for emergency cases",
      "On-site digital X-rays for immediate diagnosis",
      "Pain management and stabilization in the first visit",
      "Extended availability during evenings and weekends",
      "Clear cost estimates before treatment begins",
      "Direct coordination with your primary dentist for follow-up care",
    ],
    procedure: [
      "Call our emergency line and describe your symptoms to our triage team",
      "Arrive at the clinic where we prioritize your assessment immediately",
      "Receive a rapid diagnostic evaluation with digital imaging if needed",
      "Get pain relief and stabilization treatment on the same visit",
      "Receive a detailed treatment plan and cost estimate before any further procedures",
      "Schedule follow-up care with our team or your regular dentist",
    ],
    recovery:
      "Recovery depends entirely on the nature of the emergency. Simple repairs like filling a fractured tooth typically involve minimal downtime. More complex situations such as abscess drainage or tooth extractions may require a few days of modified eating and over-the-counter pain management. We provide specific aftercare instructions tailored to your treatment and remain available by phone if you have concerns after hours.",
    faqs: [
      {
        question: "What qualifies as a dental emergency?",
        answer:
          "A dental emergency includes severe or persistent toothache, swelling of the face or jaw, bleeding that won't stop, a knocked-out or fractured tooth, broken or lost fillings or crowns, and suspected infections such as an abscess. If you're unsure whether your situation is urgent, call us — our team will help you assess the severity and advise you on the best next step.",
      },
      {
        question: "How quickly can I be seen?",
        answer:
          "We reserve appointment slots each day specifically for emergency patients. In most cases, we can see you within a few hours of your call. During peak periods, we'll provide pain management guidance over the phone until your appointment. For true after-hours emergencies, our answering service can connect you with a clinician.",
      },
      {
        question: "Will my insurance cover emergency treatment?",
        answer:
          "Most dental insurance plans cover emergency treatment, though coverage levels vary. We verify your benefits before treatment whenever possible and provide a clear cost estimate upfront. If you don't have insurance, we offer flexible payment options and can discuss the total cost before proceeding with any treatment.",
      },
      {
        question: "What should I do while waiting for my emergency appointment?",
        answer:
          "For a knocked-out tooth, keep it moist in milk or saliva and handle it by the crown only. For swelling, apply a cold compress to the outside of your cheek. For bleeding, apply gentle pressure with clean gauze. For toothache, rinse with warm salt water and take over-the-counter pain relief. Avoid placing aspirin directly on the affected area. Call us for specific guidance based on your situation.",
      },
    ],
    relatedServices: [
      "root-canal",
      "crowns",
      "general-dentistry",
    ],
    category: "emergency",
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    shortDescription:
      "Permanent tooth replacement that integrates with your jawbone and functions like natural teeth.",
    description: [
      "When a tooth is lost, the consequences go beyond appearance. The underlying jawbone begins to deteriorate, surrounding teeth shift out of position, and the simple act of chewing becomes increasingly difficult on the affected side. Dental implants address all of these problems by replacing the tooth root itself, not just the visible crown.",
      "A dental implant is a biocompatible titanium post surgically placed into the jawbone, where it undergoes osseointegration — a natural process where bone tissue grows around and bonds with the implant surface. Once integrated, the implant serves as a stable foundation for a custom-made crown, bridge, or denture that matches your natural teeth in color, shape, and function.",
      "We use cone-beam CT imaging and computer-guided implant planning to map the exact placement of each implant before surgery. This precision approach minimizes surgical time, reduces post-operative discomfort, and ensures optimal positioning for long-term success. Whether you need a single tooth replaced or a full-arch restoration, our implant team develops a treatment plan tailored to your anatomy and goals.",
    ],
    icon: "Smile",
    benefits: [
      "Prevents jawbone loss after tooth extraction",
      "Preserves the position of adjacent teeth",
      "Restores full chewing strength and bite function",
      "Permanent solution with proper care lasting decades",
      "Natural appearance — custom-matched to surrounding teeth",
      "No adhesives or removal required unlike traditional dentures",
    ],
    procedure: [
      "Comprehensive examination including 3D cone-beam CT scan of the jaw",
      "Treatment planning with digital simulation of final restoration",
      "Surgical placement of the titanium implant post under local anesthesia",
      "Healing period of 3 to 6 months for osseointegration to complete",
      "Abutment placement and impressions for the custom crown or bridge",
      "Final restoration delivery and bite adjustment for comfortable function",
    ],
    recovery:
      "Most patients return to normal activities within two to three days of implant surgery. Some swelling and mild discomfort are expected for the first week, manageable with prescribed medication. We recommend a soft food diet for the initial healing period and avoid placing pressure directly on the implant site. Full osseointegration typically takes three to six months, during which we monitor progress with periodic imaging.",
    faqs: [
      {
        question: "Am I a candidate for dental implants?",
        answer:
          "Most adults with adequate jawbone density and good overall health are candidates for implants. Conditions like uncontrolled diabetes, active smoking, or certain medications affecting bone metabolism may require additional evaluation. We conduct a thorough assessment including bone density imaging to determine if implants are appropriate for your specific situation. Bone grafting procedures are available if jawbone volume is insufficient.",
      },
      {
        question: "How long does the entire implant process take?",
        answer:
          "From initial consultation to final restoration, the process typically takes four to eight months. This includes the surgical placement, a three to six-month healing period for osseointegration, and the fabrication and delivery of your permanent crown. Some patients may qualify for immediate loading protocols that can reduce the overall timeline.",
      },
      {
        question: "Do dental implants require special care?",
        answer:
          "Implants require the same care as natural teeth — regular brushing, flossing, and professional cleanings. Unlike natural teeth, implants cannot develop cavities, but the surrounding gum tissue and bone still need attention to prevent peri-implantitis, an inflammatory condition that can compromise implant stability. We recommend maintenance visits every six months.",
      },
      {
        question: "What is the success rate of dental implants?",
        answer:
          "Dental implants have a documented success rate of 95% or higher over ten years when placed by experienced clinicians in patients with adequate bone quality. Our use of digital planning and guided surgery further improves accuracy and outcomes. Long-term success depends on good oral hygiene, regular maintenance visits, and managing systemic health factors.",
      },
    ],
    relatedServices: [
      "crowns",
      "cosmetic-dentistry",
      "general-dentistry",
    ],
    category: "restorative",
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    shortDescription:
      "Comprehensive smile enhancement combining artistry with clinical precision.",
    description: [
      "Your smile is one of the first things people notice, and how you feel about it affects how you move through the world. Cosmetic dentistry isn't about vanity — it's about aligning the way your teeth look with the way you want to present yourself. Whether you're dealing with discoloration, gaps, chips, or a combination of concerns, a well-planned cosmetic approach can deliver results that look completely natural.",
      "We take a conservative, whole-mouth approach to cosmetic treatment. Rather than jumping straight to the most dramatic option, we evaluate your dental health, bite alignment, facial proportions, and personal goals to develop a plan that makes sense clinically and aesthetically. Sometimes that means veneers; sometimes it means whitening combined with minor bonding and orthodontic alignment. The right answer depends on your teeth.",
      "Our clinic uses digital smile design technology, which allows you to preview potential outcomes before committing to treatment. We fabricate all restorations in partnership with master ceramists who understand the nuances of natural tooth color, translucency, and surface texture. The result is work that doesn't look like dental work.",
    ],
    icon: "Sparkles",
    benefits: [
      "Digital preview of expected results before treatment begins",
      "Conservative approach preserving as much natural tooth structure as possible",
      "Custom shade matching for seamless integration with natural teeth",
      "Comprehensive treatment planning addressing aesthetics and function together",
      "Long-lasting results with proper maintenance",
      "Improved confidence in personal and professional settings",
    ],
    procedure: [
      "Initial consultation to discuss goals, review options, and examine dental health",
      "Digital smile design and photography to plan aesthetic outcomes",
      "Preparatory treatments such as cleaning, minor orthodontics, or gum contouring",
      "Fabrication of restorations with custom shade matching",
      "Bonding, placement, or application of the chosen cosmetic treatments",
      "Final adjustments, polishing, and maintenance guidance",
    ],
    recovery:
      "Recovery varies by procedure. Teeth whitening may involve 24 to 48 hours of sensitivity management. Veneer placement typically involves a few days of sensitivity to temperature. Bonding procedures generally have no downtime. More complex full-mouth rehabilitation may require a week or more of modified habits. We provide detailed aftercare instructions specific to your treatment plan.",
    faqs: [
      {
        question: "What's the difference between cosmetic and general dentistry?",
        answer:
          "General dentistry focuses on the health, function, and prevention of oral disease. Cosmetic dentistry specifically addresses the appearance of your teeth, gums, and smile. In practice, these overlap considerably — a crown placement is both restorative and cosmetic. Our approach integrates both dimensions to ensure treatments look good and function well long-term.",
      },
      {
        question: "How do I know which cosmetic treatment is right for me?",
        answer:
          "During your consultation, we evaluate your dental health, discuss your concerns and goals, and present options ranging from conservative to comprehensive. Digital imaging lets us show you projected outcomes for different approaches. The best treatment plan balances what you want with what your teeth need, and we'll explain the reasoning behind our recommendations.",
      },
      {
        question: "Are cosmetic dental procedures covered by insurance?",
        answer:
          "Purely cosmetic procedures like whitening are typically not covered. However, many treatments that improve appearance — such as crowns, bridges, or implant-supported restorations — are partially covered when they also serve a functional purpose. We review your insurance benefits and discuss all costs upfront so there are no surprises.",
      },
    ],
    relatedServices: [
      "veneers",
      "teeth-whitening",
      "crowns",
      "invisalign",
    ],
    category: "cosmetic",
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    shortDescription:
      "Professional-grade whitening for noticeably brighter teeth in a single visit or with take-home kits.",
    description: [
      "Over time, teeth naturally accumulate surface stains from coffee, tea, wine, and everyday eating. Even with diligent brushing, the enamel develops a dullness that no amount of manual scrubbing can reverse. Professional whitening works at a deeper level, using controlled concentrations of hydrogen peroxide to break apart stain molecules within the tooth structure itself.",
      "We offer two professional whitening approaches: in-office treatment for immediate results and custom take-home trays for gradual, controlled whitening on your schedule. In-office whitening uses a higher concentration gel activated by a specialized light, delivering visible results in a single one-hour appointment. Take-home trays use a lower concentration gel worn for a few hours daily over two weeks, allowing precise control over the final shade.",
      "Before any whitening treatment, we perform a thorough cleaning and examination to ensure your teeth and gums are healthy enough for the procedure. We also discuss realistic expectations — professional whitening can brighten teeth significantly, but the degree of improvement depends on the type and depth of existing stains. Some discoloration from medications or trauma may respond better to alternative treatments like veneers or bonding.",
    ],
    icon: "Sun",
    benefits: [
      "Noticeably whiter teeth in a single in-office session",
      "Custom-fitted trays for even, consistent results at home",
      "Safe, enamel-friendly formulas supervised by dental professionals",
      "Dramatic improvement compared to over-the-counter products",
      "Results lasting 1 to 3 years with proper maintenance",
      "Comprehensive evaluation ensuring candidacy before treatment",
    ],
    procedure: [
      "Dental examination and professional cleaning to prepare teeth for whitening",
      "Shade assessment to document current tooth color and establish a target shade",
      "Gum protection applied to shield soft tissues during in-office whitening",
      "Professional-strength whitening gel applied to teeth for 15 to 20 minutes",
      "Gel reapplied for additional cycles depending on desired brightness level",
      "Final shade comparison, aftercare instructions, and custom tray fabrication for touch-ups",
    ],
    recovery:
      "Most patients experience temporary tooth sensitivity for 24 to 48 hours following in-office whitening. This is a normal response and resolves on its own. We recommend avoiding extremely hot or cold foods during this period and using a sensitivity toothpaste if needed. Take-home tray patients may experience mild sensitivity that typically diminishes after the first few days of use. Results continue to develop for a day or two after your final session.",
    faqs: [
      {
        question: "How much whiter will my teeth get?",
        answer:
          "Results vary based on the original shade and type of staining. Most patients achieve a noticeable improvement of several shades, which is clearly visible in the mirror and in photographs. Yellow and brown stains typically respond very well to whitening, while gray or blue-toned discoloration may require alternative treatments. We set realistic expectations during your consultation.",
      },
      {
        question: "Is professional whitening safe for my enamel?",
        answer:
          "Yes, when supervised by a dental professional. The whitening agents we use are carefully formulated to target stain molecules without damaging enamel structure. Pre-treatment examination ensures there are no cavities, cracks, or gum disease that could be aggravated by the whitening process. We follow evidence-based protocols that have been extensively studied for safety.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "With proper care — avoiding heavy staining foods and maintaining good oral hygiene — professional whitening results typically last one to three years. We provide custom take-home trays for periodic touch-up treatments, which help maintain brightness between professional sessions. Avoiding tobacco use is the single most effective thing you can do to preserve whitening results.",
      },
      {
        question: "Can I whiten teeth with crowns, veneers, or fillings?",
        answer:
          "Whitening agents do not change the color of existing restorations. If you have visible crowns, veneers, or composite fillings on your front teeth, whitening alone may create a shade mismatch. In these cases, we may recommend whitening first followed by replacement of the restorations to match your new shade, or suggest alternative treatments like veneers for a uniform result.",
      },
    ],
    relatedServices: [
      "cosmetic-dentistry",
      "veneers",
      "general-dentistry",
    ],
    category: "cosmetic",
  },
  {
    slug: "invisalign",
    title: "Invisalign",
    shortDescription:
      "Clear aligner therapy for discreet, comfortable teeth straightening without metal braces.",
    description: [
      "Traditional metal braces are effective, but they come with dietary restrictions, visible hardware, and the self-consciousness that comes with wearing them — especially for adults in professional environments. Invisalign offers a different path to straighter teeth using a series of clear, removable aligners that are virtually invisible when worn.",
      "Each set of aligners is custom-fabricated using 3D digital models of your teeth, designed to move your teeth incrementally toward their ideal positions. You wear each set for one to two weeks before progressing to the next in the series. Because the aligners are removable, you can eat normally, brush and floss without obstruction, and remove them for special occasions.",
      "We use the ClinCheck digital system to plan and visualize your entire treatment from start to finish before the first aligner is even fabricated. This means you can see a simulation of how your teeth will move and what the final result will look like. Treatment duration varies from six months for minor adjustments to eighteen months or more for comprehensive alignment, and we monitor progress through regular check-ups every six to eight weeks.",
    ],
    icon: "AlignVerticalSpaceAround",
    benefits: [
      "Nearly invisible — most people won't notice you're wearing aligners",
      "Removable for eating, brushing, and flossing",
      "No dietary restrictions during treatment",
      "Smooth plastic — no wire irritation to cheeks and lips",
      "Digital preview of your treatment outcome before starting",
      "Fewer emergency visits compared to traditional braces",
    ],
    procedure: [
      "Comprehensive evaluation including digital scanning of your teeth (no impression material)",
      "ClinCheck treatment plan showing the projected movement of each tooth from start to finish",
      "Custom aligners fabricated and delivered in sets with detailed wear instructions",
      "Regular check-ups every six to eight weeks to monitor progress and provide new aligner sets",
      "Progressive tooth movement through successive aligner sets over the treatment duration",
      "Completion with retainers to maintain your new tooth positions long-term",
    ],
    recovery:
      "There is no recovery period with Invisalign. Each new aligner set may cause mild pressure or soreness for two to three days as your teeth begin moving, which is a sign the aligners are working. This discomfort is manageable and significantly less than the soreness associated with wire-tightening appointments in traditional orthodontics. Most patients adjust quickly and find the aligners comfortable within the first few days.",
    faqs: [
      {
        question: "Is Invisalign as effective as traditional braces?",
        answer:
          "For mild to moderate alignment issues — crowding, spacing, overbite, underbite — Invisalign is highly effective and produces results comparable to traditional braces. More complex cases involving significant tooth movement or bite correction may require traditional braces or a combined approach. During your consultation, we honestly assess whether Invisalign is the best option for your specific needs.",
      },
      {
        question: "How many hours per day do I need to wear the aligners?",
        answer:
          "For optimal results, aligners should be worn 20 to 22 hours per day, removing them only for eating, drinking anything other than water, brushing, and flossing. Inconsistent wear is the most common reason treatment takes longer than planned. The convenience of removability is a benefit, but it also means treatment success depends on your commitment.",
      },
      {
        question: "Will I need to wear a retainer after treatment?",
        answer:
          "Yes, retainers are essential after any orthodontic treatment, including Invisalign. Teeth have a natural tendency to shift back toward their original positions, and retainers prevent this relapse. We typically recommend wearing a retainer nightly for the first year after treatment, then transitioning to a few nights per week for long-term maintenance.",
      },
      {
        question: "Can I eat and drink normally with Invisalign?",
        answer:
          "Yes — this is one of the key advantages over traditional braces. You remove your aligners before eating and drinking, so there are no food restrictions. However, you should only drink water while wearing aligners, as other beverages can stain the plastic and increase cavity risk. Brush your teeth before reinserting aligners after meals.",
      },
    ],
    relatedServices: [
      "cosmetic-dentistry",
      "veneers",
      "general-dentistry",
    ],
    category: "cosmetic",
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    shortDescription:
      "Gentle, specialized dental care designed to keep children comfortable and build positive oral health habits.",
    description: [
      "A child's relationship with the dentist begins early, and those early experiences shape how they feel about dental care for the rest of their lives. Our pediatric dentistry practice is built around the understanding that children aren't small adults — they have unique dental development patterns, different communication needs, and a genuine need to feel safe in the dental chair.",
      "We see patients starting from their first tooth eruption through adolescence, providing preventive care, monitoring dental development, and addressing issues specific to growing mouths. This includes sealants to protect newly erupted permanent teeth, fluoride treatments to strengthen enamel, space maintenance when primary teeth are lost prematurely, and early orthodontic evaluation to identify alignment issues before they become more complex.",
      "Our treatment environment is designed to reduce anxiety without being condescending. We explain procedures in age-appropriate language, offer choices when possible to give children a sense of control, and use behavior guidance techniques that focus on positive reinforcement. For children with special healthcare needs or dental anxiety, we develop individualized approaches that meet them where they are.",
    ],
    icon: "Baby",
    benefits: [
      "Age-appropriate communication and behavior guidance techniques",
      "Preventive programs including sealants, fluoride treatments, and oral hygiene education",
      "Early orthodontic screening to identify developmental concerns",
      "Specialized management of dental anxiety and special healthcare needs",
      "Parent education on nutrition, habits, and home care routines",
      "Child-friendly environment designed to reduce fear and build confidence",
    ],
    procedure: [
      "Welcoming first visit designed as a fun introduction to the dental office",
      "Gentle examination of teeth, gums, jaw, and bite development using kid-friendly language",
      "Professional cleaning with flavors and techniques chosen for comfort",
      "Fluoride application and dental sealants as appropriate for the child's age and risk level",
      "Developmental assessment including orthodontic screening and habit evaluation",
      "Parent consultation with personalized recommendations for home care and nutrition",
    ],
    recovery:
      "Pediatric dental procedures are generally very low-impact. Cleanings, sealants, and fluoride treatments require no recovery time at all. Fillings and other restorative treatments may cause brief sensitivity, and we provide age-appropriate aftercare guidance for parents. We schedule follow-up calls after more involved procedures to check on your child's comfort and answer any questions.",
    faqs: [
      {
        question: "When should my child first visit the dentist?",
        answer:
          "The American Academy of Pediatric Dentistry recommends a first dental visit by the child's first birthday or within six months of the first tooth erupting. Early visits establish a dental home, allow us to monitor development, and give you guidance on infant oral care. Starting early also means your child becomes familiar with the dental environment before any treatment is needed.",
      },
      {
        question: "How can I prepare my child for a dental visit?",
        answer:
          "Keep your language positive and avoid sharing any negative dental experiences you may have had. Read children's books about going to the dentist, and let your child know that the dentist is a friendly person who helps keep teeth healthy. Avoid using words like shot, hurt, or pain. Our team is experienced in helping anxious children feel at ease, and we'll guide you on what to expect before the appointment.",
      },
      {
        question: "Are dental X-rays safe for children?",
        answer:
          "We use digital X-rays, which emit significantly less radiation than traditional film X-rays — often 80% less. We follow the ALARA principle (As Low As Reasonably Achievable) and only take X-rays when clinically necessary. Protective lead aprons and thyroid collars are used for additional safety. X-rays are essential for detecting cavities between teeth, monitoring developing permanent teeth, and assessing bone health.",
      },
      {
        question: "What are dental sealants and should my child get them?",
        answer:
          "Sealants are thin, protective coatings applied to the chewing surfaces of back teeth (molars) where cavities most commonly develop. The grooves and pits on these teeth are too narrow for toothbrush bristles to clean effectively. Sealants create a smooth barrier that prevents food and bacteria from settling in these vulnerable areas. They are painless to apply and can reduce cavity risk by up to 80% on treated teeth.",
      },
    ],
    relatedServices: [
      "general-dentistry",
      "teeth-whitening",
      "crowns",
    ],
    category: "preventive",
  },
  {
    slug: "root-canal",
    title: "Root Canal Therapy",
    shortDescription:
      "Targeted treatment to save an infected or damaged tooth by removing diseased pulp tissue.",
    description: [
      "When the soft tissue inside your tooth — the pulp — becomes infected or severely inflamed, the result is often intense, persistent pain that doesn't respond to over-the-counter medication. Without treatment, the infection can spread to surrounding bone, create abscesses, and ultimately lead to tooth loss. Root canal therapy eliminates the infection, relieves the pain, and preserves your natural tooth.",
      "Modern root canal treatment bears little resemblance to the procedures patients feared decades ago. We use advanced rotary instruments, electronic apex locators, and surgical microscopes to navigate the root canal system with precision. Combined with effective local anesthesia and sedation options for anxious patients, the procedure is typically no more uncomfortable than having a filling placed.",
      "During the treatment, we carefully remove the infected pulp tissue from the root canals, clean and shape the canal system to eliminate bacteria, and seal the space with a biocompatible filling material. The tooth is then restored with a crown or filling to protect it from future fracture. With proper care, a root canal-treated tooth can last a lifetime.",
    ],
    icon: "ShieldCheck",
    benefits: [
      "Eliminates infection and prevents its spread to surrounding tissues",
      "Relieves the severe pain associated with pulp inflammation or infection",
      "Preserves your natural tooth rather than extracting it",
      "Maintains proper chewing function and jawbone stimulation",
      "Protects surrounding teeth from excessive wear and shifting",
      "Proven, well-documented procedure with high long-term success rates",
    ],
    procedure: [
      "Diagnostic evaluation including X-rays to confirm the extent of infection or damage",
      "Local anesthesia administered to completely numb the tooth and surrounding area",
      "Small access opening created in the tooth to reach the pulp chamber",
      "Infected pulp tissue carefully removed and canal system cleaned and shaped",
      "Canals filled with biocompatible gutta-percha material and sealed to prevent reinfection",
      "Tooth restored with a crown or filling to restore full strength and function",
    ],
    recovery:
      "Most patients experience significant pain relief within a day or two of root canal treatment. Mild tenderness around the treated tooth is normal for a few days and responds well to over-the-counter pain relief. We recommend avoiding chewing on the treated side until the final crown or restoration is placed. A follow-up appointment confirms healing and ensures the restoration is functioning properly.",
    faqs: [
      {
        question: "Does a root canal hurt?",
        answer:
          "With modern anesthesia and techniques, root canal treatment is typically no more painful than receiving a filling. The discomfort patients associate with root canals usually comes from the infection itself, not the procedure. Once the infected tissue is removed and the canal is sealed, pain relief is often immediate. For particularly anxious patients, sedation options are available to ensure complete comfort.",
      },
      {
        question: "How long does root canal treatment take?",
        answer:
          "Most root canal treatments are completed in one to two appointments, each lasting 45 to 90 minutes. Front teeth with a single root canal are typically treated in one visit. Back teeth with multiple canals may require two visits to ensure thorough cleaning and sealing. We provide a time estimate specific to your situation before treatment begins.",
      },
      {
        question: "Why do I need a crown after a root canal?",
        answer:
          "A tooth that has undergone root canal treatment becomes more brittle over time because it no longer receives internal moisture and nutrition from the pulp. A crown provides structural reinforcement that protects the tooth from fracture under normal chewing forces. Without a crown, a root canal-treated tooth is significantly more likely to crack, which could lead to extraction. The crown also seals the tooth against bacterial recontamination.",
      },
      {
        question: "What happens if I delay or avoid a needed root canal?",
        answer:
          "An infected tooth will not heal on its own. The infection will continue to spread, potentially causing a painful abscess, bone loss around the tooth, and swelling that can become a serious medical emergency. The longer you wait, the more complex treatment becomes, and the lower the chances of saving the tooth. Prompt treatment gives you the best outcome and the fastest pain relief.",
      },
    ],
    relatedServices: [
      "crowns",
      "emergency-dentistry",
      "general-dentistry",
    ],
    category: "restorative",
  },
  {
    slug: "crowns",
    title: "Dental Crowns",
    shortDescription:
      "Custom restorations that cover and protect damaged teeth while restoring their shape, strength, and appearance.",
    description: [
      "When a tooth is significantly weakened — whether from decay, fracture, a large filling, or root canal treatment — it loses its structural integrity and becomes vulnerable to further damage. A dental crown encases the entire visible portion of the tooth, distributing biting forces evenly and protecting what remains of the natural tooth structure underneath.",
      "We fabricate crowns using materials selected for each specific situation. All-porcelain crowns offer the most natural appearance for front teeth where aesthetics matter most. Zirconia crowns provide exceptional strength for back teeth that bear heavy chewing loads. Porcelain-fused-to-metal crowns offer a balance of durability and appearance for various applications. During your consultation, we discuss which material best suits the tooth's location, your bite, and your aesthetic goals.",
      "Crown preparation involves removing a thin layer of the existing tooth to create space for the restoration. We take digital impressions — no messy impression material — and work with a dental laboratory that matches the crown's color, translucency, and surface texture to your adjacent teeth. A temporary crown protects the prepared tooth while your permanent crown is being fabricated, typically over two to three weeks.",
    ],
    icon: "Crown",
    benefits: [
      "Restores full strength and function to weakened or damaged teeth",
      "Protects vulnerable teeth from further fracture or decay",
      "Custom color-matched to blend seamlessly with natural teeth",
      "Digital impressions for accurate fit and comfort",
      "Long-lasting protection with proper oral care",
      "Versatile applications from cosmetic enhancement to post-root canal protection",
    ],
    procedure: [
      "Tooth preparation — removal of a thin layer of enamel to accommodate the crown",
      "Digital impressions of the prepared tooth and surrounding teeth for accurate fabrication",
      "Shade selection to match the crown precisely to your natural tooth color",
      "Temporary crown placed to protect the tooth while the permanent crown is made",
      "Permanent crown trial fitting, bite adjustment, and cementation at the second visit",
      "Final polish and occlusal verification for comfortable, natural biting function",
    ],
    recovery:
      "You may experience some sensitivity in the prepared tooth for a few days after each appointment, which is normal and resolves on its own. The temporary crown may feel slightly different from your natural tooth — this is expected and temporary. Once the permanent crown is cemented, most patients report that it feels completely natural. Avoid chewing very hard foods on the crowned tooth for the first day to allow the cement to fully set.",
    faqs: [
      {
        question: "How long does a dental crown last?",
        answer:
          "With proper oral hygiene and regular dental visits, well-made crowns typically last 10 to 15 years or longer. Porcelain and zirconia crowns are highly resistant to wear and staining. The longevity depends on the material chosen, your oral habits (such as grinding or nail-biting), and how well you maintain the crown and surrounding gum tissue. We monitor crown integrity at regular check-ups.",
      },
      {
        question: "Will a crown look natural?",
        answer:
          "Absolutely. Modern dental crowns are fabricated to match the exact shade, shape, and translucency of your natural teeth. We use digital photography and detailed shade notes to communicate with our ceramist, ensuring the crown blends seamlessly. Most people — including close acquaintances — cannot distinguish a well-made crown from a natural tooth.",
      },
      {
        question: "What's the difference between a crown and a veneer?",
        answer:
          "A crown covers the entire tooth and is used when significant structural damage has occurred. A veneer covers only the front surface of a tooth and is primarily used for cosmetic improvement when the tooth structure is largely intact. If your tooth has lost significant structure due to decay, fracture, or root canal treatment, a crown provides the necessary protection. Veneers are more appropriate for cosmetic enhancements of otherwise healthy teeth.",
      },
      {
        question: "Can a crowned tooth still get a cavity?",
        answer:
          "The crown itself cannot decay, but the natural tooth structure underneath and around the crown's margin is still vulnerable. This is why maintaining good oral hygiene around a crown is important. We pay particular attention to sealing the crown margins during placement to minimize the risk of recurrent decay, and we monitor these areas at each check-up.",
      },
    ],
    relatedServices: [
      "root-canal",
      "dental-implants",
      "cosmetic-dentistry",
      "general-dentistry",
    ],
    category: "restorative",
  },
  {
    slug: "veneers",
    title: "Dental Veneers",
    shortDescription:
      "Thin porcelain shells bonded to tooth fronts for a natural, durable smile transformation.",
    description: [
      "Dental veneers are among the most effective tools in cosmetic dentistry for a straightforward reason: they address multiple aesthetic concerns simultaneously with a single, conservative treatment. A veneer is a thin shell of porcelain, typically less than a millimeter thick, custom-fabricated and bonded directly to the front surface of a tooth. Once placed, it becomes the new visible surface — concealing chips, closing gaps, masking discoloration, and correcting minor alignment irregularities.",
      "We use lithium disilicate and feldspathic porcelain, materials chosen for their ability to mimic the light-handling characteristics of natural enamel. This means veneers don't just look white — they look like teeth, with the subtle translucency, surface texture, and color variation that natural teeth possess. The result is a smile that looks enhanced but never artificial.",
      "The process begins with a detailed analysis of your facial features, smile dynamics, and existing tooth conditions. We take digital photographs and impressions, then use diagnostic wax-ups to plan the shape and proportions of each veneer. This planning stage lets you see and approve the proposed design before any tooth preparation begins. Preparation itself is minimal — we remove only enough enamel to accommodate the thin porcelain shell, preserving the majority of your natural tooth structure.",
    ],
    icon: "Layers",
    benefits: [
      "Addresses multiple cosmetic concerns with a single treatment",
      "Minimal tooth preparation — preserves most natural enamel",
      "Porcelain color stability resists staining from coffee, tea, and wine",
      "Natural light-handling properties mimic real enamel",
      "Durable material with a proven track record lasting 10 to 20 years",
      "Digital preview of your results before committing to treatment",
    ],
    procedure: [
      "Comprehensive smile analysis including photographs, digital impressions, and bite assessment",
      "Diagnostic wax-up to design the shape, size, and proportions of each veneer",
      "Minimal tooth preparation — removal of a thin enamel layer to accommodate the veneer",
      "Digital or conventional impressions sent to the dental laboratory for fabrication",
      "Try-in appointment to evaluate color, shape, and fit before final bonding",
      "Permanent bonding with adhesive protocols designed for long-term retention",
    ],
    recovery:
      "Veneer placement involves minimal recovery. You may experience mild sensitivity to hot and cold for a few days after preparation, which resolves on its own. Once the permanent veneers are bonded, most patients adapt immediately and report that the veneers feel completely natural. We recommend avoiding very hard foods and habits like nail-biting that could chip or dislodge a veneer, and we provide guidance on oral hygiene specific to maintaining your new restorations.",
    faqs: [
      {
        question: "Are veneers permanent?",
        answer:
          "Veneers are considered a permanent treatment because the enamel removal during preparation means your teeth will always need some form of covering. However, the veneers themselves are not lifetime restorations. Most porcelain veneers last 10 to 20 years or longer with proper care, after which they may need to be replaced. The bonding process and porcelain quality have improved significantly, and modern veneers often last well beyond their expected lifespan.",
      },
      {
        question: "Will veneers look bulky or unnatural?",
        answer:
          "When properly planned and fabricated, veneers should be indistinguishable from natural teeth. The diagnostic wax-up process allows us to design veneers that complement your facial features and smile proportions. We work with skilled ceramists who replicate the subtle characteristics of natural teeth — surface texture, translucency, and color gradients. The goal is always a natural, enhanced appearance rather than an obviously cosmetic one.",
      },
      {
        question: "Can I choose the color of my veneers?",
        answer:
          "Yes, and we encourage you to be involved in shade selection. We typically show you a range of shades and discuss what looks natural for your age, skin tone, and preferences. Many patients want a whiter smile but still want the result to look natural. We can create veneers that are lighter than your natural teeth while maintaining the subtle color variations that make them look real. Keep in mind that veneers cannot be whitened after fabrication.",
      },
      {
        question: "What can veneers fix that whitening cannot?",
        answer:
          "Whitening addresses only discoloration. Veneers can correct chips, cracks, gaps between teeth, uneven tooth lengths, minor rotation or misalignment, and intrinsic stains that don't respond to bleaching. If your concerns are purely related to color and your teeth are otherwise well-shaped and aligned, whitening may be sufficient. If multiple aesthetic issues are present, veneers offer a more comprehensive solution.",
      },
    ],
    relatedServices: [
      "cosmetic-dentistry",
      "teeth-whitening",
      "crowns",
      "invisalign",
    ],
    category: "cosmetic",
  },
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    shortDescription:
      "Comprehensive preventive and restorative care that forms the foundation of lifelong oral health.",
    description: [
      "General dentistry is where your oral health journey begins — and where it's maintained throughout your life. It encompasses the routine examinations, professional cleanings, early cavity detection, gum disease screening, and preventive treatments that keep small problems from becoming big ones. Think of it as the primary care of dentistry: the ongoing relationship that catches issues early, manages risk factors, and keeps your teeth and gums functioning at their best.",
      "Our general dentistry program is built on a prevention-first philosophy. We invest time in thorough examinations using digital radiography and intraoral cameras that let you see exactly what we see. We measure gum health systematically, assess your risk for decay and periodontal disease, and develop personalized care plans based on your specific needs rather than applying a one-size-fits-all approach.",
      "When treatment is needed — a cavity, a cracked filling, a tooth that needs a crown — we handle it within the same practice, coordinating care seamlessly. This continuity means your entire dental history informs every decision, and you have one team that knows your teeth intimately. For patients who have avoided the dentist for years, we provide a judgment-free entry point with treatment plans that respect both your dental needs and your comfort level.",
    ],
    icon: "Stethoscope",
    benefits: [
      "Thorough examinations with digital X-rays and intraoral imaging",
      "Professional cleanings tailored to your specific gum health needs",
      "Early detection of cavities, gum disease, and oral cancer",
      "Preventive treatments including sealants and fluoride applications",
      "One practice managing all aspects of your dental care",
      "Personalized prevention plans based on individual risk assessment",
    ],
    procedure: [
      "Comprehensive dental examination including visual inspection, digital X-rays, and intraoral photography",
      "Periodontal assessment measuring gum health and identifying areas of concern",
      "Professional cleaning — scaling to remove tartar, polishing to smooth surfaces",
      "Fluoride treatment and preventive recommendations personalized to your needs",
      "Treatment planning for any identified issues with clear cost estimates and timeline",
      "Follow-up scheduling based on your individual maintenance interval",
    ],
    recovery:
      "General dentistry procedures range from no recovery time at all — cleanings, examinations, and fluoride treatments — to brief adjustment periods for restorative work. Fillings may cause sensitivity for a few days. More involved procedures like crowns or extractions may require modified eating for a few days to a week. We provide specific aftercare instructions for every procedure and are available by phone if you have questions after your visit.",
    faqs: [
      {
        question: "How often should I visit the dentist?",
        answer:
          "For most patients, we recommend a check-up and professional cleaning every six months. However, some patients benefit from more frequent visits — three to four month intervals — including those with a history of gum disease, high cavity risk, diabetes, or smoking. We assess your individual risk factors and recommend a schedule that's appropriate for you, not just a generic guideline.",
      },
      {
        question: "What's the difference between a cleaning and deep cleaning?",
        answer:
          "A standard cleaning (prophylaxis) removes plaque and tartar from above the gumline on teeth with healthy gum attachment. A deep cleaning (scaling and root planing) addresses tartar and bacteria that have accumulated below the gumline in pockets formed by gum disease. Deep cleaning is a therapeutic treatment for periodontal disease, while standard cleaning is preventive maintenance. We determine which is appropriate based on your gum measurements.",
      },
      {
        question: "Do digital X-rays really expose me to less radiation?",
        answer:
          "Yes, digital X-rays expose you to approximately 80% less radiation than traditional film X-rays. The sensor requires significantly less exposure to produce a clear image. Additionally, we follow the ALARA principle and only take X-rays when clinically necessary. For most patients, the annual radiation exposure from dental X-rays is less than what you receive from a cross-country flight.",
      },
      {
        question: "I haven't been to the dentist in years. Where do I start?",
        answer:
          "Start with a comprehensive examination — no judgment, no lectures. We'll assess where things stand, discuss any concerns you have, and develop a prioritized treatment plan that addresses the most important issues first. Many patients find that the reality of returning to the dentist is much less intimidating than they expected. We meet you where you are and work together from there.",
      },
    ],
    relatedServices: [
      "emergency-dentistry",
      "crowns",
      "teeth-whitening",
      "pediatric-dentistry",
    ],
    category: "preventive",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category)
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}
