export default function Footer() {
  return (
    <footer>
      <div className="h-[3px] bg-brand" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
          The Spinoff Microfund · TU Wien
        </p>
        <a
          href="mailto:hello@example.at"
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          hello@example.at
        </a>
      </div>
    </footer>
  )
}
