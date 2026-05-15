'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '€500–2,000', label: 'Ticket size', highlight: false },
  { value: 'No equity', label: "We don't take a cut", highlight: true },
  { value: 'Hours, not months', label: 'From pitch to funded', highlight: false },
]

export default function Stats() {
  return (
    <section className="px-6 md:px-12 pb-20 md:pb-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`p-8 md:p-10 border-2 border-ink ${s.highlight ? 'bg-brand' : 'bg-paper'}`}
          >
            <p className="font-display font-bold text-3xl md:text-5xl leading-[1] tracking-[-0.03em]">
              {s.value}
            </p>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mt-6 text-ink/70">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
