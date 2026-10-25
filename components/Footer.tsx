const MAIL = 'team@tumicrofund.at'
const label = 'font-display font-medium text-[11px] uppercase tracking-eyebrow text-ink-3'
const legal = [
  ['/impressum', 'Impressum'],
  ['/privacy', 'Privacy'],
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink">
      <div className="max-w-container mx-auto px-6 pt-6 pb-5 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-7">
          <p className={label}>In cooperation with</p>
          <img src="/logos/spinoff-factory-tuwien.svg" alt="The Spinoff Factory · TU Wien" className="h-9 w-auto" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-[1px] border-hairline pt-4">
          <nav className="flex flex-wrap items-center gap-5">
            <p className={label}>TU Microfund · TU Wien</p>
            {legal.map(([href, text]) => (
              <a
                key={href}
                href={href}
                className={`${label} hover:text-ink transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand`}
              >
                {text}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${MAIL}`}
            className="flex items-center gap-2 font-display font-medium text-[13px] text-ink hover:text-brand-ink transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.8 6.4 12 12.8l8.2-6.4" />
            </svg>
            {MAIL}
          </a>
        </div>
        <p className="font-display text-[11px] text-ink-4 border-t-[1px] border-hairline pt-4">
          Owner of site: © 2026 The Spinoff Factory
        </p>
      </div>
    </footer>
  )
}
