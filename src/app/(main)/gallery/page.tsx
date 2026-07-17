"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PageHeader from "@/components/layout/page-header"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { images } from "@/lib/images"

const filterTabs = ["All", "Whitening", "Veneers", "Implants", "Invisalign", "Makeover"]

const galleryItems = [
  {
    id: 1,
    category: "Whitening",
    quote: "I never thought my teeth could look this bright.",
    imageKey: "beforeAfter1" as keyof typeof images,
    height: "h-64",
  },
  {
    id: 2,
    category: "Veneers",
    quote: "Six porcelain veneers changed everything about how I smile.",
    imageKey: "beforeAfter2" as keyof typeof images,
    height: "h-80",
  },
  {
    id: 3,
    category: "Implants",
    quote: "Replacing two missing teeth with implants was the best decision I made.",
    imageKey: "beforeAfter3" as keyof typeof images,
    height: "h-64",
  },
  {
    id: 4,
    category: "Invisalign",
    quote: "Nobody even knew I was wearing aligners.",
    imageKey: "invisalign" as keyof typeof images,
    height: "h-72",
  },
  {
    id: 5,
    category: "Makeover",
    quote: "A complete smile transformation — veneers, whitening, and alignment.",
    imageKey: "cosmeticDentistry" as keyof typeof images,
    height: "h-80",
  },
  {
    id: 6,
    category: "Whitening",
    quote: "Professional whitening made a visible difference in one appointment.",
    imageKey: "teethWhitening" as keyof typeof images,
    height: "h-64",
  },
  {
    id: 7,
    category: "Veneers",
    quote: "Chipped and worn teeth restored to look completely natural.",
    imageKey: "happySmile1" as keyof typeof images,
    height: "h-72",
  },
  {
    id: 8,
    category: "Implants",
    quote: "An implant-supported bridge gave me back my confidence.",
    imageKey: "dentalImplant" as keyof typeof images,
    height: "h-64",
  },
]

function GalleryPage() {
  const [active, setActive] = useState("All")
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active)

  const selectedItem = galleryItems.find((item) => item.id === openId)

  return (
    <main>
      <PageHeader title="Gallery" subtitle="Smile transformations." />

      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0 border-b border-border">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-3 text-sm font-[family-name:var(--font-dm-sans)] uppercase tracking-wide transition-colors duration-200 -mb-px ${
                  active === tab
                    ? "text-ink border-b-2 border-accent"
                    : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const img = images[item.imageKey]
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => setOpenId(item.id)}
                      className="group block w-full break-inside-avoid rounded-lg overflow-hidden border border-border-light hover:border-border transition-colors duration-200 text-left"
                    >
                      <div className={`${item.height} relative overflow-hidden`}>
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs uppercase tracking-widest text-white/90 font-[family-name:var(--font-dm-sans)]">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)]">
                          {item.category}
                        </p>
                        <p className="mt-2 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] italic">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Dialog open={openId !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-border">
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const img = images[selectedItem.imageKey]
                return (
                  <>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-widest text-accent font-[family-name:var(--font-dm-sans)]">
                        {selectedItem.category}
                      </p>
                      <p className="mt-3 text-ink-secondary font-[family-name:var(--font-dm-sans)] italic">
                        &ldquo;{selectedItem.quote}&rdquo;
                      </p>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default GalleryPage
