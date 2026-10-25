import ApplyButton from './ApplyButton'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink">
      <div className="max-w-container mx-auto px-6 py-[14px] flex items-center gap-6">
        <a href="/" aria-label="TU Microfund – home" className="shrink-0">
          <img src="/logos/microfund.svg" alt="TU Microfund" className="h-[30px] w-auto" />
        </a>
        <div className="ml-auto">
          <ApplyButton size="sm">Apply</ApplyButton>
        </div>
      </div>
    </header>
  )
}
