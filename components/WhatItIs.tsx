'use client'

import { motion } from 'framer-motion'

export default function WhatItIs() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 border-t border-ink/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="md:col-span-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
            01 — The deal
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-8"
        >
          <p className="text-2xl md:text-4xl font-display font-medium leading-[1.15] tracking-[-0.02em]">
            We back student projects at TU Wien with small, fast checks. No equity.
            No 40-page pitch decks. Just a video, a project, and a green light —
            so you can start building today instead of next semester.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
