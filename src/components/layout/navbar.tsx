"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link
              href="/"
              className="shrink-0 group"
              aria-label="Luminous Dental - Home"
            >
              <span className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-ink tracking-tight">
                Luminous
              </span>
              <span className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-accent tracking-tight">
                Dental
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200",
                    isActive(link.href)
                      ? "text-accent bg-accent-light/50"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-warm"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-ink-muted">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-[family-name:var(--font-dm-sans)]">Mon-Fri 8am-6pm</span>
              </div>
              <a
                href="tel:+12125551234"
                className="flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-accent transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-[family-name:var(--font-dm-sans)]">(212) 555-1234</span>
              </a>
              <Link href="/book">
                <Button
                  variant="default"
                  className="h-10 px-5 text-sm font-semibold rounded-lg font-[family-name:var(--font-dm-sans)] group/btn"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Button>
              </Link>
            </div>

            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-ink transition-transform duration-200 active:scale-90"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm z-50 bg-white shadow-xl"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <span className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-ink">
                  Luminous<span className="text-accent">Dental</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 text-ink"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex-1 flex flex-col px-6 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block py-3 text-base font-medium transition-colors duration-200 border-b border-border-light",
                          isActive(link.href) ? "text-accent" : "text-ink-secondary hover:text-ink"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-8 space-y-4"
                >
                  <Link href="/book" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full h-12 text-sm font-semibold rounded-lg font-[family-name:var(--font-dm-sans)]"
                    >
                      Book Appointment
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a
                    href="tel:+12125551234"
                    className="flex items-center justify-center gap-2 text-sm text-ink-secondary hover:text-accent transition-colors font-[family-name:var(--font-dm-sans)]"
                  >
                    <Phone className="w-4 h-4" />
                    (212) 555-1234
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
