'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from './ModalContext'
import Eyebrow from './Eyebrow'

// The questionnaire itself is a Notion form, embedded so applicants never
// leave the site. Responses land directly in the Notion database behind it.
const FORM_URL = 'https://sprinkle-celery-f30.notion.site/ebd/7ec2ced04fa9828eaa9f015d71127c36'

const ringClass = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand'
const ghostButton = `rounded-md border border-transparent px-3 py-[7px] font-display font-medium text-[13px] hover:bg-stone transition-colors duration-[120ms] ${ringClass}`

export default function ApplyModal() {
  const { isOpen, close } = useModal()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-ink/55 flex md:items-center md:justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div
            ref={dialogRef}
            className="bg-paper text-ink w-full md:w-[92%] md:max-w-[720px] h-full md:h-auto flex flex-col border-y md:border border-ink md:rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-7 pb-5 md:px-8">
              <div className="flex flex-col gap-[10px]">
                <Eyebrow>Apply</Eyebrow>
                <h2
                  id="apply-modal-title"
                  className="font-display font-medium text-[32px] md:text-[40px] leading-[1.05] tracking-tight"
                >
                  Pitch your project.
                </h2>
              </div>
              <button type="button" onClick={close} aria-label="Close application form" className={ghostButton}>
                Close
              </button>
            </div>

            <div className="flex-1 md:flex-none border-t border-hairline">
              <iframe
                src={FORM_URL}
                title="TU Microfund application form"
                className="block w-full h-full md:h-[600px] border-0"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
