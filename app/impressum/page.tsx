import type { Metadata } from 'next'
import LegalLayout, { LegalSection, legalLink } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Impressum — TU Microfund',
  description: 'Legal disclosure for Startup Factory – Innovationhub 1040 GmbH.',
}

export default function ImpressumPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Impressum">
      <LegalSection>
        <p className="text-ink">
          Startup Factory – Innovationhub 1040 GmbH
          <br />
          Karlsplatz 13, 1040 Wien
        </p>
      </LegalSection>

      <LegalSection heading="Contact information">
        <p>
          Email:{' '}
          <a href="mailto:hello@spinofffactory.at" className={legalLink}>
            hello@spinofffactory.at
          </a>
          <br />
          Website:{' '}
          <a href="https://www.spinoff-factory.at" target="_blank" rel="noreferrer" className={legalLink}>
            www.spinoff-factory.at
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Company information">
        <p>
          Managing Directors: Mag. Martin Kolassa, Mag. Christian Hoffmann
          <br />
          Eigentümer: 100% researchTUb GmbH
          <br />
          VAT: ATU81608137
        </p>
      </LegalSection>

      <LegalSection>
        <p className="text-ink-3 text-[13px]">
          Owner of site: © 2026 The Spinoff Factory
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
