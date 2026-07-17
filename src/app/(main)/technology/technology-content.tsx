"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ImageReveal } from "@/components/ui/image-reveal"
import { images } from "@/lib/images"

const technologies = [
  {
    number: "01",
    name: "3D Cone-Beam CT Imaging",
    description:
      "Traditional X-rays capture a flat, two-dimensional view of complex three-dimensional structures. Our cone-beam CT scanner rotates once around your head, capturing thousands of data points to construct a detailed three-dimensional model of your teeth, jawbone, sinuses, and nerve pathways. This technology is essential for implant planning, surgical guidance, and diagnosing conditions invisible on standard radiographs.",
    tag: "Carestream CS 9600",
    imageKey: "digitalXray" as keyof typeof images,
  },
  {
    number: "02",
    name: "Intraoral Cameras",
    description:
      "A small, high-resolution camera on a wand-shaped handpiece captures detailed images of your teeth, gums, and existing restorations in real time. These images appear on a chairside monitor, allowing you to see exactly what we see. Intraoral photography improves diagnostic accuracy, enhances patient communication, and creates a visual record that helps us track changes in your oral health over time.",
    tag: "Planmeca ProCam",
    imageKey: "intraoralCamera" as keyof typeof images,
  },
  {
    number: "03",
    name: "Digital Smile Design",
    description:
      "Before any cosmetic treatment begins, we capture photographs and digital scans of your teeth and facial proportions. Specialized software then models potential outcomes, allowing you to preview how different treatment approaches would look on your own teeth. This planning technology bridges the gap between clinical assessment and patient expectations, ensuring we agree on goals before any tooth preparation occurs.",
    tag: "DSD App",
    imageKey: "cosmeticDentistry" as keyof typeof images,
  },
  {
    number: "04",
    name: "Soft Tissue Laser",
    description:
      "Our diode laser precisely targets and treats soft tissue — gum contouring, lesion removal, and periodontal therapy — with significantly less bleeding, swelling, and discomfort than traditional surgical instruments. The laser cauterizes as it cuts, reducing post-operative healing time and eliminating the need for sutures in many soft tissue procedures.",
    tag: "Biolase Epic X",
    imageKey: "dentalLaser" as keyof typeof images,
  },
  {
    number: "05",
    name: "Digital Impressions",
    description:
      "We have eliminated the uncomfortable putty impressions that patients historically endured for crowns, bridges, aligners, and nightguards. Our intraoral scanner captures thousands of images per second to build a precise digital model of your teeth and bite in minutes. The resulting digital file is sent directly to our laboratory, improving accuracy and reducing the number of appointments required for restorative treatment.",
    tag: "iTero Element 5D",
    imageKey: "cadCam" as keyof typeof images,
  },
  {
    number: "06",
    name: "Guided Implant Surgery",
    description:
      "Using data from our cone-beam CT scan and digital models of your teeth, we plan implant placement in three-dimensional virtual space before surgery begins. A surgical guide is then fabricated that transfers this digital plan to the mouth with sub-millimeter accuracy. This approach minimizes surgical time, reduces tissue trauma, and allows us to place implants in optimal positions for long-term function and aesthetics.",
    tag: "Nobel Biocare X-Guide",
    imageKey: "dentalImplant" as keyof typeof images,
  },
]

function TechnologyContent() {
  return (
    <>
      {technologies.map((tech, i) => {
        const img = images[tech.imageKey]
        const isReversed = i % 2 === 1
        return (
          <ScrollReveal key={i} delay={0.05}>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={isReversed ? "lg:order-2" : ""}>
                <span className="font-[family-name:var(--font-plus-jakarta)] text-6xl text-accent-muted leading-none">
                  {tech.number}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl text-ink">
                  {tech.name}
                </h3>
                <p className="mt-4 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                  {tech.description}
                </p>
                <div className="mt-6 inline-block border border-border rounded-lg px-5 py-3">
                  <span className="text-xs uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">
                    {tech.tag}
                  </span>
                </div>
              </div>
              <div className={`${isReversed ? "lg:order-1" : ""} flex justify-center`}>
                <ScrollReveal delay={0.1} direction={isReversed ? "left" : "right"}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ImageReveal
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className="w-full max-w-md"
                    />
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </>
  )
}

export default TechnologyContent
