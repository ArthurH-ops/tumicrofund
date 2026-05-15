'use client'

import { motion } from 'framer-motion'
import ApplyButton from './ApplyButton'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-ink/60 mb-10"
        >
          The 1040 Voucher · TU Wien
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(3.5rem,13vw,14rem)]"
        >
          Break things.
          <br />
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute -inset-x-[0.04em] -inset-y-[0.02em] bg-brand"
            />
            <span className="relative">Build</span>
          </span>{' '}
          things.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 md:mt-14 max-w-2xl text-lg md:text-2xl text-ink/80 leading-snug"
        >
          A microfund for TU Wien students with prototypes to build and no time to waste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5"
        >
          <ApplyButton size="lg">Apply now →</ApplyButton>
          <p className="font-mono text-xs md:text-sm text-ink/60 tracking-wide">
            60 seconds. One video. That&rsquo;s it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
