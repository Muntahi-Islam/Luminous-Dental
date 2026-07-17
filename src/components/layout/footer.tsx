"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Globe, Link2, Mail, Share2, ArrowRight } from "lucide-react"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "Instagram", icon: Globe, href: "#" },
  { label: "Facebook", icon: Globe, href: "#" },
  { label: "Twitter", icon: Link2, href: "#" },
  { label: "LinkedIn", icon: Share2, href: "#" },
]

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:max-w-md"
          >
            <Link href="/" className="inline-block group">
              <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-accent">
                Luminous<span className="text-accent">Dental</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] leading-relaxed">
              Modern dentistry, thoughtfully delivered. Serving families across
              Manhattan since 2005.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors font-[family-name:var(--font-dm-sans)]"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="flex gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h4 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-secondary hover:text-ink transition-all duration-200 font-[family-name:var(--font-dm-sans)] hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h4 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold font-[family-name:var(--font-dm-sans)] mb-5">
                Contact
              </h4>
              <ul className="space-y-3 font-[family-name:var(--font-dm-sans)]">
                <li className="text-sm text-ink-secondary">
                  123 Wellness Ave, Suite 200
                  <br />
                  New York, NY 10001
                </li>
                <li>
                  <a
                    href="tel:+12125551234"
                    className="text-sm text-ink-secondary hover:text-ink transition-colors duration-200"
                  >
                    (212) 555-1234
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@luminousdental.com"
                    className="text-sm text-ink-secondary hover:text-ink transition-colors duration-200"
                  >
                    hello@luminousdental.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
            &copy; {new Date().getFullYear()} Luminous Dental. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-ink-muted hover:text-accent transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
