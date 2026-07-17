"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ServiceCard from "@/components/services/service-card"
import { services, type Service } from "@/data/services"
import { cn } from "@/lib/utils"

const categories: { label: string; value: Service["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Preventive", value: "preventive" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Restorative", value: "restorative" },
  { label: "Emergency", value: "emergency" },
]

export default function ServicesListing() {
  const [activeCategory, setActiveCategory] = useState<Service["category"] | "all">("all")

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:ring-offset-2",
              activeCategory === cat.value
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        layout
      >
        {filteredServices.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            layout
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>

      {filteredServices.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-slate-500">
            No services found in this category.
          </p>
        </div>
      )}
    </>
  )
}
