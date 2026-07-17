"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ImageRevealProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  caption?: string
  delay?: number
  priority?: boolean
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  caption,
  delay = 0,
  priority = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [loaded, setLoaded] = useState(false)

  return (
    <figure ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative overflow-hidden rounded-lg"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-auto object-cover transition-all duration-700",
            loaded ? "blur-0" : "blur-sm"
          )}
          onLoad={() => setLoaded(true)}
          priority={priority}
        />
        {!loaded && (
          <div className="absolute inset-0 bg-surface-warm animate-pulse" />
        )}
      </motion.div>
      {caption && (
        <figcaption className="mt-3 text-sm text-ink-muted font-[family-name:var(--font-dm-sans)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
