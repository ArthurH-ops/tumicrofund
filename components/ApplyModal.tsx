'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from './ModalContext'
import Asterisk from './Asterisk'
import Eyebrow from './Eyebrow'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const MAX_FILE_SIZE_MB = 100
const MAX_DESC_CHARS = 140

// Design-system field: uppercase Space Grotesk label, 1.5px ink outline, 8px corners, 3px yellow focus ring.
const inputClass =
  'w-full rounded-md border border-ink bg-paper px-3 py-[10px] text-[15px] leading-[1.45] text-ink outline-none focus:ring-[3px] focus:ring-brand placeholder:text-ink-4'
const ringClass = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand'
const ghostButton = `rounded-md border border-transparent px-3 py-[7px] font-display font-medium text-[13px] hover:bg-stone transition-colors duration-[120ms] ${ringClass}`
const secondaryButton = `rounded-md border border-ink bg-paper px-[18px] py-[11px] font-display font-medium text-[15px] hover:bg-stone transition-colors duration-[120ms] active:translate-x-px active:translate-y-px ${ringClass}`

export default function ApplyModal() {
  const { isOpen, close } = useModal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [notes, setNotes] = useState('')
  const [video, setVideo] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const dialogRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && status !== 'success') {
      const t = setTimeout(() => firstInputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [isOpen, status])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const node = dialogRef.current
      if (!node) return
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const resetForm = () => {
    setName('')
    setEmail('')
    setProjectName('')
    setDescription('')
    setBudget('')
    setNotes('')
    setVideo(null)
    setConsent(false)
    setStatus('idle')
    setErrorMessage('')
  }

  const handleClose = () => {
    close()
    setTimeout(resetForm, 250)
  }

  const handleFile = (file: File | null) => {
    if (!file) {
      setVideo(null)
      return
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`Video must be under ${MAX_FILE_SIZE_MB} MB.`)
      setStatus('error')
      return
    }
    setVideo(file)
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!video) {
      setErrorMessage('Pick a video to upload.')
      setStatus('error')
      return
    }
    if (description.length > MAX_DESC_CHARS) {
      setErrorMessage(`Description must be ${MAX_DESC_CHARS} characters or less.`)
      setStatus('error')
      return
    }
    if (!consent) {
      setErrorMessage('Please confirm you agree to us processing your application.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    fd.append('projectName', projectName)
    fd.append('description', description)
    fd.append('budget', budget)
    fd.append('notes', notes)
    fd.append('video', video)
    fd.append('consent', 'true')

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Submission failed. Try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-ink/55 flex md:items-center md:justify-center"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div
            ref={dialogRef}
            className="bg-paper text-ink w-full md:w-[92%] md:max-w-[640px] md:max-h-[92vh] h-full md:h-auto overflow-y-auto border-y md:border border-ink md:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {status === 'success' ? (
              <SuccessPanel onClose={handleClose} />
            ) : (
              <form onSubmit={submit} className="px-6 py-7 md:px-8 md:pb-8 flex flex-col gap-[18px]" noValidate>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-[10px]">
                    <Eyebrow>Apply</Eyebrow>
                    <h2
                      id="apply-modal-title"
                      className="font-display font-medium text-[32px] md:text-[40px] leading-[1.05] tracking-tight"
                    >
                      Pitch your project.
                    </h2>
                  </div>
                  <button type="button" onClick={handleClose} aria-label="Close application form" className={ghostButton}>
                    Close
                  </button>
                </div>

                <div className="grid gap-[14px] sm:grid-cols-2">
                  <Field label="Name" htmlFor="name">
                    <input
                      ref={firstInputRef}
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@student.tuwien.ac.at"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Project name" htmlFor="projectName">
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="One-line description"
                  htmlFor="description"
                  hint={`${description.length} / ${MAX_DESC_CHARS}`}
                  hintError={description.length > MAX_DESC_CHARS}
                >
                  <input
                    id="description"
                    name="description"
                    type="text"
                    required
                    maxLength={MAX_DESC_CHARS}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="What's the money for?" htmlFor="budget" hint="Rough breakdown is fine">
                  <textarea
                    id="budget"
                    name="budget"
                    rows={3}
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. €800 components · €500 fab time · €200 shipping"
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <VideoField file={video} onChange={handleFile} />

                <Field label="Anything else we should know?" htmlFor="notes" optional>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <ConsentField checked={consent} onChange={setConsent} />

                {status === 'error' && errorMessage && (
                  <p
                    role="alert"
                    className="rounded-md border border-coral bg-coral-pale px-3 py-[10px] text-[13px] text-coral-text"
                  >
                    {errorMessage}
                  </p>
                )}

                <div className="mt-1 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`inline-flex items-center justify-center rounded-md border border-ink bg-ink text-paper font-display font-medium px-6 py-[15px] text-[17px] hover:bg-ink-2 active:translate-x-px active:translate-y-px transition-colors duration-[120ms] disabled:opacity-40 disabled:cursor-not-allowed ${ringClass}`}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send it'}
                  </button>
                  <Eyebrow asterisk={false} size="sm" muted>
                    We reply to every application.
                  </Eyebrow>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  hintError,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  hintError?: boolean
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={htmlFor} className="font-display font-medium text-[11px] uppercase tracking-label">
        {label}
        {optional && <span className="text-ink-3"> (optional)</span>}
      </label>
      {children}
      {hint && <span className={`text-xs ${hintError ? 'text-coral-text' : 'text-ink-3'}`}>{hint}</span>}
    </div>
  )
}

function VideoField({ file, onChange }: { file: File | null; onChange: (f: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor="video" className="font-display font-medium text-[11px] uppercase tracking-label">
        Video pitch
      </label>
      <div className="rounded-md border border-dashed border-ink p-3 flex flex-col sm:flex-row sm:items-center gap-[14px]">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`self-start rounded-md border border-ink bg-paper px-3 py-[7px] font-display font-medium text-[13px] hover:bg-stone transition-colors duration-[120ms] ${ringClass}`}
        >
          {file ? 'Replace video' : 'Pick a video'}
        </button>
        <input
          ref={inputRef}
          id="video"
          name="video"
          type="file"
          accept="video/*"
          required
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <p className={`text-[13px] break-all ${file ? 'text-ink' : 'text-ink-3'}`}>
          {file ? `${file.name} · ${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'MP4, MOV, WEBM · Max 100 MB'}
        </p>
      </div>
    </div>
  )
}

// GDPR consent gate. Submitting is blocked until this is ticked, and the route
// handler re-checks it server-side.
function ConsentField({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer select-none">
      <span className="relative mt-[2px] shrink-0">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby="consent-text"
          className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border border-ink bg-paper checked:bg-brand ${ringClass}`}
        />
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] text-brand-ink opacity-0 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <span id="consent-text" className="text-[13px] leading-[1.5] text-ink-2">
        I agree that Startup Factory – Innovationhub 1040 GmbH may store and process the details and video I submit
        here in order to review my application and reply to me. I can withdraw this at any time by emailing{' '}
        <a
          href="mailto:hello@spinofffactory.at"
          onClick={(e) => e.stopPropagation()}
          className="text-ink underline decoration-brand-deep decoration-2 underline-offset-[3px] hover:text-brand-ink"
        >
          hello@spinofffactory.at
        </a>
        . See the{' '}
        <a
          href="/privacy"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-ink underline decoration-brand-deep decoration-2 underline-offset-[3px] hover:text-brand-ink"
        >
          Privacy Policy
        </a>
        .
      </span>
    </label>
  )
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative overflow-hidden bg-brand px-6 py-10 md:px-8 md:py-12 min-h-[60vh] md:min-h-0 flex flex-col">
      <Asterisk className="pointer-events-none absolute right-4 top-[-44px] w-[288px] h-[288px] text-brand-deep" />
      <button type="button" onClick={onClose} aria-label="Close" className={`relative self-end rounded-md border border-transparent px-3 py-[7px] font-display font-medium text-[13px] hover:bg-brand-deep transition-colors duration-[120ms] ${ringClass}`}>
        Close
      </button>
      <div className="relative flex-1 flex flex-col items-start justify-center gap-[14px] py-6">
        <Eyebrow>Application received</Eyebrow>
        <p className="font-display font-medium text-[44px] leading-[1.05] tracking-tight">Got it.</p>
        <p className="text-base leading-[1.5]">We&rsquo;ll be in touch.</p>
        <button type="button" onClick={onClose} className={`mt-3 ${secondaryButton}`}>
          Close window
        </button>
      </div>
    </div>
  )
}
