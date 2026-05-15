'use client'

import { motion } from 'framer-motion'
import ApplyButton from './ApplyButton'

export default function ApplyCTA() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-40 border-t border-ink/10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,11rem)]"
        >
          Pitch it.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 md:mt-12 flex flex-col items-center gap-5"
        >
          <ApplyButton size="lg">Start your application →</ApplyButton>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-ink/60">
            Rolling basis. We read everything.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
