import ApplyButton from './ApplyButton'

const links = [
  ['#deal', 'The deal'],
  ['#how', 'How it works'],
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink">
      <div className="max-w-container mx-auto px-6 py-[14px] flex items-center gap-6">
        <a href="#top" aria-label="TU Microfund – home" className="shrink-0">
          <img src="/logos/microfund.svg" alt="TU Microfund" className="h-[30px] w-auto" />
        </a>
        <nav className="ml-auto flex flex-wrap gap-5">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-display font-medium text-sm text-ink hover:text-brand-ink transition-colors duration-[120ms]"
            >
              {label}
            </a>
          ))}
        </nav>
        <ApplyButton size="sm">Apply</ApplyButton>
      </div>
    </header>
  )
}
