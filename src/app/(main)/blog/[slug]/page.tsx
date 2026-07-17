import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import PageHeader from "@/components/layout/page-header"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TextReveal } from "@/components/ui/text-reveal"
import { ImageReveal } from "@/components/ui/image-reveal"
import { images } from "@/lib/images"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorBio: string
  date: string
  readingTime: string
  content: string[]
  relatedSlugs: string[]
  imageKey: keyof typeof images
  authorAvatarKey: keyof typeof images
}

const posts: Record<string, BlogPost> = {
  "why-regular-dental-visits-matter-more-than-you-think": {
    slug: "why-regular-dental-visits-matter-more-than-you-think",
    title: "Why Regular Dental Visits Matter More Than You Think",
    excerpt:
      "Skipping dental check-ups may seem harmless, but preventive visits catch problems early.",
    category: "General",
    author: "Dr. Sarah Mitchell",
    authorBio:
      "Dr. Sarah Mitchell is the lead general and cosmetic dentist at our practice with over 15 years of clinical experience and a Fellowship in the Academy of General Dentistry.",
    date: "January 8, 2025",
    readingTime: "5 min read",
    imageKey: "blogDentalHealth",
    authorAvatarKey: "doctorFemale1",
    content: [
      "Many people only visit the dentist when something hurts. By the time a cavity produces pain, it has typically progressed through the enamel into the deeper layers of the tooth — where treatment becomes more complex, more expensive, and more time-consuming. A small cavity caught at a routine check-up can often be treated in a single, brief appointment. The same cavity discovered months later may require a crown, a root canal, or in severe cases, extraction.",
      "Professional dental cleanings remove plaque and tartar buildup in areas that home brushing and flossing cannot reach. Even patients with excellent oral hygiene habits accumulate calculus along the gumline and between teeth. This buildup harbors bacteria that contribute to gum inflammation, which left unchecked can progress to periodontal disease — a condition that affects the bone supporting your teeth and is the leading cause of tooth loss in adults.",
      "Routine dental examinations also include screening for oral cancer, which is most treatable when detected early. Our intraoral cameras and visual examination allow us to identify suspicious lesions, chronic irritation, or tissue changes that warrant further investigation. This screening takes minutes but can be lifesaving.",
      "Preventive dental care is an investment in your long-term health. The cost of two check-ups and cleanings per year is substantially less than the cost of treating the conditions that develop when preventive care is deferred. More importantly, maintaining your natural teeth — healthy, functional, and comfortable — is always preferable to replacing them.",
    ],
    relatedSlugs: [
      "the-truth-about-teeth-whitening",
      "understanding-gum-disease-early-warning-signs",
    ],
  },
  "the-truth-about-teeth-whitening": {
    slug: "the-truth-about-teeth-whitening",
    title: "The Truth About Teeth Whitening: What Works and What Doesn\u2019t",
    excerpt:
      "Not all whitening products are created equal.",
    category: "Cosmetic",
    author: "Dr. Sarah Mitchell",
    authorBio:
      "Dr. Sarah Mitchell is the lead general and cosmetic dentist at our practice with over 15 years of clinical experience.",
    date: "December 15, 2024",
    readingTime: "4 min read",
    imageKey: "blogWhitening",
    authorAvatarKey: "doctorFemale1",
    content: [
      "The teeth whitening market is saturated with products claiming dramatic results: strips, gels, LED kits, charcoal powders, and oil pulling rituals. Some of these products contain active ingredients that can lighten tooth color; others do nothing beyond temporarily masking surface stains. Understanding the science helps separate effective options from marketing noise.",
      "Professional whitening uses controlled concentrations of hydrogen peroxide — typically 25 to 40 percent for in-office treatment — to break apart stain molecules within the tooth structure. This is a fundamentally different process from the surface-level cleaning that whitening toothpastes provide. Over-the-counter products generally use lower concentrations (around 10 percent), which is why they require weeks of daily use to achieve modest results.",
      "Before any whitening treatment, we perform a thorough examination to ensure your teeth and gums are healthy. Whitening agents applied to teeth with untreated cavities or gum disease can cause significant sensitivity and irritation. We also discuss realistic expectations: professional whitening brightens natural tooth enamel, but the degree of improvement depends on the type and depth of existing stains.",
      "Results from professional whitening typically last one to three years with proper maintenance. We provide custom take-home trays for periodic touch-up treatments, which help preserve brightness between professional sessions. The single most effective thing you can do to maintain whitening results is avoid tobacco use, which causes rapid re-staining.",
    ],
    relatedSlugs: [
      "porcelain-veneers-what-to-expect",
      "how-diet-affects-your-dental-health",
    ],
  },
  "dental-implants-a-permanent-solution-for-missing-teeth": {
    slug: "dental-implants-a-permanent-solution-for-missing-teeth",
    title: "Dental Implants: A Permanent Solution for Missing Teeth",
    excerpt:
      "When a tooth is lost, the jawbone begins to deteriorate.",
    category: "Restorative",
    author: "Dr. James Chen",
    authorBio:
      "Dr. James Chen is a dual-specialist in orthodontics and implant dentistry with two decades of focused training.",
    date: "December 3, 2024",
    readingTime: "6 min read",
    imageKey: "blogCheckups",
    authorAvatarKey: "doctorMale1",
    content: [
      "A missing tooth creates consequences that extend far beyond appearance. The jawbone beneath the missing tooth begins to resorb — a natural process where bone tissue shrinks without the stimulation that chewing provides. This bone loss can alter your facial structure over time and make future restorative treatment more complex. Adjacent teeth drift into the gap, disrupting your bite and creating areas that are difficult to clean, increasing the risk of decay and gum disease in neighboring teeth.",
      "Dental implants address all of these problems by replacing the tooth root itself. A biocompatible titanium post is surgically placed into the jawbone, where it undergoes osseointegration — bone tissue grows around and bonds with the implant surface over three to six months. Once integrated, the implant serves as a stable foundation for a custom-made crown that matches your natural teeth in color, shape, and function.",
      "Modern implant planning uses cone-beam CT imaging and computer-guided surgical protocols. We plan the exact placement of each implant in three-dimensional virtual space before surgery begins, mapping nerve pathways, sinus boundaries, and available bone volume. This precision approach minimizes surgical time, reduces post-operative discomfort, and ensures optimal positioning for long-term success.",
      "With proper care — regular brushing, flossing, and professional maintenance visits — dental implants can last decades or even a lifetime. They do not develop cavities, but the surrounding gum tissue and bone still need attention. We schedule follow-up appointments to monitor implant health and ensure your restoration continues to function comfortably.",
    ],
    relatedSlugs: [
      "understanding-gum-disease-early-warning-signs",
      "invisalign-vs-traditional-braces-which-is-right-for-you",
    ],
  },
  "helping-children-feel-comfortable-at-the-dentist": {
    slug: "helping-children-feel-comfortable-at-the-dentist",
    title: "Helping Children Feel Comfortable at the Dentist",
    excerpt:
      "A child's early dental experiences shape their relationship with oral health for life.",
    category: "Pediatric",
    author: "Dr. Emily Rodriguez",
    authorBio:
      "Dr. Emily Rodriguez specializes in pediatric dentistry with extensive experience treating patients with dental anxiety and special healthcare needs.",
    date: "November 20, 2024",
    readingTime: "4 min read",
    imageKey: "blogChild",
    authorAvatarKey: "doctorFemale2",
    content: [
      "A child's first encounters with dental care set the tone for how they feel about oral health for years to come. When those early experiences are positive, children develop a sense of routine and trust that makes ongoing dental care straightforward. When they are frightening, the resulting anxiety can persist well into adulthood and lead to avoidance of necessary treatment.",
      "Preparation begins at home. Speak about dental visits in neutral, positive terms. Avoid sharing your own negative dental experiences, even casually. Read children's books about going to the dentist. Let your child know the dentist is a friendly person who helps keep teeth healthy. Avoid words like shot, hurt, or pain — our team uses age-appropriate language and visual aids to explain what we're doing in terms children can understand.",
      "During the visit, we use tell-show-do techniques: we explain each step, demonstrate it on a model or on a finger, then perform it in the child's mouth. We offer choices whenever possible — which flavor of polish, which hand holds the mirror — to give children a sense of control. Positive reinforcement throughout the visit helps build confidence and makes future appointments easier.",
      "For children with more significant anxiety or special healthcare needs, we develop individualized approaches that meet them where they are. This might mean shorter initial visits focused on building trust, sedation options for more involved procedures, or modified communication strategies. Our goal is always the same: ensuring every child leaves with a positive association with dental care.",
    ],
    relatedSlugs: [
      "why-regular-dental-visits-matter-more-than-you-think",
      "how-diet-affects-your-dental-health",
    ],
  },
  "invisalign-vs-traditional-braces-which-is-right-for-you": {
    slug: "invisalign-vs-traditional-braces-which-is-right-for-you",
    title: "Invisalign vs. Traditional Braces: Which Is Right for You?",
    excerpt:
      "Both approaches effectively straighten teeth, but they differ significantly.",
    category: "Orthodontics",
    author: "Dr. James Chen",
    authorBio:
      "Dr. James Chen is a dual-specialist in orthodontics and implant dentistry with two decades of focused training.",
    date: "November 8, 2024",
    readingTime: "5 min read",
    imageKey: "invisalign",
    authorAvatarKey: "doctorMale1",
    content: [
      "Both traditional braces and Invisalign clear aligners are effective tools for straightening teeth, but they work differently and suit different lifestyles. Understanding the practical differences helps you choose the approach that aligns with your needs, your schedule, and your tolerance for the commitments each treatment requires.",
      "Traditional braces use brackets bonded to teeth connected by archwires that apply constant, controlled force to move teeth into alignment. They work exceptionally well for complex cases involving significant tooth movement, severe crowding, or bite correction. They are always working — you cannot remove them — which means treatment progresses regardless of patient compliance. The trade-off is visibility, dietary restrictions, and the need for periodic wire-tightening appointments.",
      "Invisalign uses a series of clear, removable custom aligners, each designed to move teeth incrementally toward their ideal positions. You wear each set for one to two weeks before progressing to the next. Because the aligners are removable, you can eat normally, brush and floss without obstruction, and remove them for special occasions. The key requirement is discipline: aligners must be worn 20 to 22 hours per day for treatment to progress on schedule.",
      "During your consultation, we evaluate your specific alignment needs, discuss your lifestyle preferences, and recommend the approach that gives you the best outcome. Some patients are excellent candidates for Invisalign; others benefit more from traditional braces. The honest assessment is always more valuable than the popular choice.",
    ],
    relatedSlugs: [
      "porcelain-veneers-what-to-expect",
      "the-truth-about-teeth-whitening",
    ],
  },
  "understanding-gum-disease-early-warning-signs": {
    slug: "understanding-gum-disease-early-warning-signs",
    title: "Understanding Gum Disease: Early Warning Signs",
    excerpt:
      "Gum disease is the leading cause of tooth loss in adults.",
    category: "General",
    author: "Dr. Amanda Foster",
    authorBio:
      "Dr. Amanda Foster specializes in periodontics and the placement of dental implants in compromised periodontal environments.",
    date: "October 25, 2024",
    readingTime: "5 min read",
    imageKey: "blogCheckups",
    authorAvatarKey: "doctorFemale1",
    content: [
      "Periodontal disease — commonly known as gum disease — affects nearly half of adults over thirty, and it is the leading cause of tooth loss in adults. What makes it particularly concerning is that it often develops silently. Early-stage gum disease (gingivitis) may produce only mild symptoms that are easy to dismiss: gums that bleed slightly when you brush, occasional bad breath, or gums that appear slightly red and puffy.",
      "Left untreated, gingivitis progresses to periodontitis, where the infection extends below the gumline and begins destroying the bone and connective tissue that hold teeth in place. At this stage, the damage is largely irreversible. Teeth may become loose, the gumline may recede, and the risk of tooth loss increases significantly.",
      "Risk factors include smoking, diabetes, hormonal changes, certain medications, and genetic predisposition. Patients with one or more of these risk factors should be particularly attentive to gum health. We measure periodontal pocket depths during examinations — healthy pockets are one to three millimeters deep; pockets deeper than four millimeters indicate disease that requires treatment.",
      "The good news is that gum disease is highly treatable when caught early. Non-surgical treatments like scaling and root planing can reverse gingivitis and halt the progression of early periodontitis. More advanced cases may benefit from laser-assisted therapy or surgical intervention. The earlier we detect it, the simpler and more predictable the treatment.",
    ],
    relatedSlugs: [
      "why-regular-dental-visits-matter-more-than-you-think",
      "how-diet-affects-your-dental-health",
    ],
  },
  "porcelain-veneers-what-to-expect": {
    slug: "porcelain-veneers-what-to-expect",
    title: "Porcelain Veneers: What to Expect From Start to Finish",
    excerpt:
      "From initial consultation to final bonding, a complete guide.",
    category: "Cosmetic",
    author: "Dr. Sarah Mitchell",
    authorBio:
      "Dr. Sarah Mitchell is the lead general and cosmetic dentist at our practice with over 15 years of clinical experience.",
    date: "October 12, 2024",
    readingTime: "6 min read",
    imageKey: "blogWhitening",
    authorAvatarKey: "doctorFemale1",
    content: [
      "Porcelain veneers are thin shells of ceramic material, typically less than a millimeter thick, custom-fabricated and bonded to the front surface of teeth to improve their appearance. They address multiple cosmetic concerns — chips, gaps, discoloration, minor misalignment — with a single, conservative treatment. The process from consultation to completion typically takes two to three weeks.",
      "The planning stage begins with a detailed analysis of your facial features, smile dynamics, and existing tooth conditions. We take photographs, digital impressions, and may create diagnostic wax-ups — physical models that show exactly how your new veneers will look before any tooth preparation begins. This stage lets you see and approve the proposed design, ensuring the final result matches your expectations.",
      "During the preparation appointment, we remove a thin layer of enamel — typically less than a millimeter — to create space for the veneer. This is performed under local anesthesia and is generally comfortable. We then take final impressions that are sent to a dental laboratory where master ceramists fabricate each veneer to match your specifications for color, translucency, and surface texture.",
      "At the final appointment, we try in each veneer to evaluate color, shape, and fit before permanently bonding them. Minor adjustments to shade or contour can be made at this stage. Once you approve the appearance, each veneer is bonded using adhesive protocols designed for long-term retention. The result is a smile that looks enhanced but never artificial.",
    ],
    relatedSlugs: [
      "the-truth-about-teeth-whitening",
      "invisalign-vs-traditional-braces-which-is-right-for-you",
    ],
  },
  "how-diet-affects-your-dental-health": {
    slug: "how-diet-affects-your-dental-health",
    title: "How Your Diet Affects Your Dental Health",
    excerpt:
      "Beyond sugar, several dietary factors influence your risk.",
    category: "Preventive",
    author: "Dr. Sarah Mitchell",
    authorBio:
      "Dr. Sarah Mitchell is the lead general and cosmetic dentist at our practice with over 15 years of clinical experience.",
    date: "September 28, 2024",
    readingTime: "4 min read",
    imageKey: "blogDentalHealth",
    authorAvatarKey: "doctorFemale1",
    content: [
      "When people think about foods that harm teeth, they think of sugar. And while sugar is indeed a primary driver of cavity formation — bacteria in plaque feed on sugars and produce acid that erodes enamel — it is far from the only dietary factor that affects oral health. Understanding the full picture helps you make smarter choices without overhauling your entire diet.",
      "Acidic foods and beverages — citrus fruits, tomatoes, wine, coffee, and carbonated drinks — directly erode tooth enamel through a process called erosion. This is different from decay: erosion dissolves the hard surface of the tooth itself. Sipping acidic drinks throughout the day prolongs acid exposure and compounds the damage. Drinking water between acidic beverages and waiting 30 minutes before brushing helps minimize erosion.",
      "Foods that stick to your teeth — dried fruit, crackers, chips, and sticky candy — remain in contact with tooth surfaces longer, giving bacteria more time to produce acid. Crunchy fruits and vegetables like apples, carrots, and celery actually help clean teeth surfaces as you chew, stimulating saliva production that neutralizes acids naturally.",
      "Calcium, phosphorus, and vitamin D are essential for maintaining strong enamel and healthy bone around your teeth. Dairy products, leafy greens, nuts, and fatty fish provide these nutrients in forms your body can readily use. A balanced diet supports your oral health in ways that no amount of brushing alone cannot replicate.",
    ],
    relatedSlugs: [
      "why-regular-dental-visits-matter-more-than-you-think",
      "the-truth-about-teeth-whitening",
    ],
  },
}

const allPosts = Object.values(posts)

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: "Post Not Found" }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    return (
      <main className="py-24 text-center">
        <p className="text-ink-muted font-[family-name:var(--font-dm-sans)]">
          Post not found.
        </p>
      </main>
    )
  }

  const related = post.relatedSlugs
    .map((s) => posts[s])
    .filter(Boolean)
    .slice(0, 3)

  const heroImg = images[post.imageKey]
  const authorAvatar = images[post.authorAvatarKey]

  return (
    <main>
      <PageHeader title="" />

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)]">
              {post.category}
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.15]">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-10 aspect-[16/9] rounded-lg overflow-hidden border border-border-light">
              <Image
                src={heroImg.src}
                alt={heroImg.alt}
                width={heroImg.width}
                height={heroImg.height}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="mt-12 space-y-6 text-ink-secondary font-[family-name:var(--font-dm-sans)] text-base leading-relaxed">
            {post.content.map((paragraph, i) => (
              <ScrollReveal key={i} delay={0.05 * (i + 1)}>
                <p>{paragraph}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 border-t border-border" />

          <ScrollReveal delay={0.1}>
            <div className="mt-12 flex items-start gap-4">
              {authorAvatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-border-light shrink-0">
                  <Image
                    src={authorAvatar.src}
                    alt={authorAvatar.alt}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-surface-warm border border-border-light flex items-center justify-center shrink-0">
                  <span className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-ink font-[family-name:var(--font-dm-sans)]">
                  {post.author}
                </p>
                <p className="mt-1 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
                  {post.authorBio}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12 border-t border-border" />

          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex items-center gap-4 text-sm font-[family-name:var(--font-dm-sans)]">
              <span className="text-ink-muted">Share</span>
              <a href="#" className="text-accent hover:text-accent-hover transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="text-accent hover:text-accent-hover transition-colors duration-200">
                LinkedIn
              </a>
              <a href="#" className="text-accent hover:text-accent-hover transition-colors duration-200">
                Email
              </a>
            </div>
          </ScrollReveal>

          {related.length > 0 && (
            <>
              <div className="mt-16 border-t border-border" />
              <div className="mt-12">
                <p className="text-xs uppercase tracking-widest text-ink-muted font-[family-name:var(--font-dm-sans)]">
                  Related articles
                </p>
                <div className="mt-6 space-y-4">
                  {related.map((rel) => (
                    <ScrollReveal key={rel.slug}>
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="group block py-3 border-t border-border-light"
                      >
                        <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink group-hover:text-accent transition-colors duration-200">
                          {rel.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
                          {rel.readingTime}
                        </p>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    </main>
  )
}
