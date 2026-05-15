'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from './ModalContext'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const MAX_FILE_SIZE_MB = 100
const MAX_DESC_CHARS = 140

export default function ApplyModal() {
  const { isOpen, close } = useModal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [notes, setNotes] = useState('')
  const [video, setVideo] = useState<File | null>(null)
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex md:items-center md:justify-center"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-paper text-ink w-full md:w-[92%] md:max-w-2xl md:max-h-[92vh] h-full md:h-auto overflow-y-auto border-y-2 md:border-2 border-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {status === 'success' ? (
              <SuccessPanel onClose={handleClose} />
            ) : (
              <form onSubmit={submit} className="p-6 md:p-10" noValidate>
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
                      Apply
                    </p>
                    <h2
                      id="apply-modal-title"
                      className="mt-2 font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] leading-[0.95]"
                    >
                      Pitch your project.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close application form"
                    className="shrink-0 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-3 py-2 hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="space-y-6">
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
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-lg"
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-lg"
                    />
                  </Field>

                  <Field label="Project name" htmlFor="projectName">
                    <input
                      id="projectName"
                      name="projectName"
                      type="text"
                      required
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-lg"
                    />
                  </Field>

                  <Field
                    label="One-line description"
                    htmlFor="description"
                    hint={`${description.length}/${MAX_DESC_CHARS}`}
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
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-lg"
                    />
                  </Field>

                  <Field
                    label="What's the money for?"
                    htmlFor="budget"
                    hint="Rough breakdown is fine"
                  >
                    <textarea
                      id="budget"
                      name="budget"
                      rows={4}
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. €800 components · €500 fab time · €200 shipping"
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-base resize-none placeholder:text-ink/30"
                    />
                  </Field>

                  <VideoField file={video} onChange={handleFile} />

                  <Field label="Anything else we should know?" htmlFor="notes" optional>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-ink/30 focus:border-ink py-2 outline-none text-base resize-none"
                    />
                  </Field>
                </div>

                {status === 'error' && errorMessage && (
                  <p
                    role="alert"
                    className="mt-6 font-mono text-xs md:text-sm text-red-700 border border-red-700 px-3 py-2 bg-red-50"
                  >
                    {errorMessage}
                  </p>
                )}

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-brand text-ink font-semibold px-8 py-4 text-lg hover:bg-ink hover:text-brand transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send it →'}
                  </button>
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/60">
                    We reply to every application.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
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
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label
          htmlFor={htmlFor}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/70"
        >
          {label}
          {optional && <span className="text-ink/40"> (optional)</span>}
        </label>
        {hint && (
          <span
            className={`font-mono text-[10px] md:text-xs ${
              hintError ? 'text-red-700' : 'text-ink/50'
            }`}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function VideoField({
  file,
  onChange,
}: {
  file: File | null
  onChange: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <label
        htmlFor="video"
        className="block font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/70 mb-2"
      >
        Video pitch
      </label>
      <div className="border-2 border-dashed border-ink/30 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="bg-ink text-paper font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-3 hover:bg-brand hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
        <p className="font-mono text-[11px] md:text-xs text-ink/70 break-all">
          {file
            ? `${file.name} · ${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : 'MP4, MOV, WEBM · Max 100 MB'}
        </p>
      </div>
    </div>
  )
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 md:p-12 min-h-[60vh] md:min-h-0 flex flex-col">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="self-end font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-3 py-2 hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Close ✕
      </button>
      <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-brand border-2 border-ink flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" aria-hidden="true">
            <polyline
              points="6,21 16,30 34,12"
              stroke="#0A0A0A"
              strokeWidth="5"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
        <p className="mt-10 font-display font-bold text-4xl md:text-6xl tracking-[-0.03em]">
          Got it.
        </p>
        <p className="mt-4 text-lg md:text-xl text-ink/70 max-w-md">
          We&rsquo;ll be in touch.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:text-ink/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Close window
        </button>
      </div>
    </div>
  )
}
