'use client'

import { motion } from 'framer-motion'

export default function Manifesto() {
  return (
    <section className="px-6 md:px-12 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-brand border-2 border-ink p-10 md:p-20"
        >
          <p className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.03em]">
            Have fun and break things.
          </p>
          <p className="mt-8 md:mt-10 max-w-3xl text-lg md:text-2xl leading-snug text-ink/85">
            Science is breaking things to build things. Prototypes don&rsquo;t wait for paperwork.
            Neither should you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
