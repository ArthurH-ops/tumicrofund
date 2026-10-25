import SiteHeader from './SiteHeader'
import Footer from './Footer'
import Eyebrow from './Eyebrow'

// Shell for the legal pages (Impressum, Privacy). Same header/footer as the
// landing page, with a narrower measure for long-form reading.
export default function LegalLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="max-w-container mx-auto px-6 pt-12 md:pt-16 pb-10 md:pb-12">
          <div className="max-w-[720px] flex flex-col gap-[14px]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.03] tracking-tight">
              {title}
            </h1>
          </div>
        </div>
        <div className="max-w-container mx-auto px-6 pb-16">
          <div className="max-w-[720px] flex flex-col gap-10">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export function LegalSection({ heading, children }: { heading?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      {heading && (
        <h2 className="font-display font-medium text-[11px] uppercase tracking-label text-ink-3">{heading}</h2>
      )}
      <div className="flex flex-col gap-4 text-[16px] leading-[1.6] text-ink-2">{children}</div>
    </section>
  )
}

export const legalLink =
  'text-ink underline decoration-brand-deep decoration-2 underline-offset-[3px] hover:text-brand-ink transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand rounded-[2px]'
