'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Pitch.',
    body: 'Record a 60-second video. Tell us what you’re building and why.',
  },
  {
    n: '02',
    title: 'Submit.',
    body: 'Drop it through the form below. Takes a minute.',
  },
  {
    n: '03',
    title: 'Get funded.',
    body: 'We review fast. If it’s a yes, money hits in hours.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 mb-12">
          02 — How it works
        </p>
        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p
                className="font-display font-bold text-7xl md:text-8xl leading-none tracking-[-0.04em] text-brand"
                style={{ WebkitTextStroke: '1.5px #0A0A0A' }}
              >
                {step.n}
              </p>
              <h3 className="mt-6 font-display font-bold text-2xl md:text-3xl tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-ink/70 text-base md:text-lg leading-snug max-w-sm">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
