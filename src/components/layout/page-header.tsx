"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="py-16 md:py-20 bg-surface-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav aria-label="Breadcrumb" className="mb-4" variants={item}>
              <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-dm-sans)]">
                <li>
                  <Link
                    href="/"
                    className="text-ink-muted hover:text-accent transition-colors"
                  >
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-ink-muted">/</span>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-ink-muted hover:text-accent transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ink font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          <motion.h1
            variants={item}
            className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={item}
              className="mt-3 text-base text-ink-secondary font-[family-name:var(--font-dm-sans)] max-w-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
