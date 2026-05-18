'use client'

import { motion } from 'framer-motion'

// To replace the placeholder wordmarks with real logos:
//   1. Drop the files in /public/logos/ (SVG preferred, PNG fine)
//   2. Replace each <div className="...">...</div> below with
//      <img src="/logos/tuwien.svg" alt="TU Wien" className="h-12 md:h-16 w-auto" />
//      (adjust h-* to taste)

export default function Partners() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 mb-10 md:mb-12"
        >
          Backed by
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-end gap-10 sm:gap-20"
        >
          <div className="font-display font-bold text-3xl md:text-5xl tracking-[-0.02em] leading-none">
            TU Wien
          </div>
          <div className="font-display font-bold text-3xl md:text-5xl tracking-[-0.02em] leading-none">
            Spinoff Factory
          </div>
        </motion.div>
      </div>
    </section>
  )
}
