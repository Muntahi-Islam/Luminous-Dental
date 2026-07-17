"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

function StickyHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[55] bg-background/80 backdrop-blur-md border-b border-border lg:hidden"
        >
          <div className="flex items-center justify-between px-4 h-14">
            <Link
              href="/"
              className="font-[family-name:var(--font-plus-jakarta)] text-lg text-ink"
            >
              Smile
            </Link>

            <Link href="/book">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                <Button variant="default" size="sm" className="h-8 px-4 text-xs">
                  Book Now
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

export default StickyHeader
