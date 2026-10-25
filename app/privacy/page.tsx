import type { Metadata } from 'next'
import LegalLayout, { LegalSection, legalLink } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — TU Microfund',
  description: 'How this website handles data. No cookies, no tracking technologies.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy">
      <LegalSection>
        <p>
          This website does not use cookies or any tracking technologies. We do not collect, store, or process
          personal data via this website.
        </p>
        <p>
          The only contact option provided is an email address. If you contact us by email, any personal data you
          provide (such as your name or email address) will be used solely to respond to your inquiry and will not be
          shared with third parties without your explicit consent.
        </p>
        <p>
          This website may contain links to external websites operated by third parties. We have no control over the
          content or privacy practices of such external sites and assume no liability for them. Visiting these
          external sites is at your own risk.
        </p>
        <p>This website is operated in accordance with Austrian and EU data protection regulations.</p>
      </LegalSection>

      <LegalSection heading="Responsible entity">
        <p>
          Startup Factory – Innovationhub 1040 GmbH, Karlsplatz 13, 1040 Wien ·{' '}
          <a href="mailto:hello@spinofffactory.at" className={legalLink}>
            hello@spinofffactory.at
          </a>
          <br />
          Full details in the{' '}
          <a href="/impressum" className={legalLink}>
            Impressum
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection>
        <p className="text-ink-3 text-[13px]">Owner of site: © 2026 The Spinoff Factory</p>
      </LegalSection>
    </LegalLayout>
  )
}
