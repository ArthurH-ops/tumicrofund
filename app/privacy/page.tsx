import type { Metadata } from 'next'
import LegalLayout, { LegalSection, legalLink } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — TU Microfund',
  description: 'How this website handles data, including the embedded Notion application form.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy">
      <LegalSection>
        <p>
          This website sets no cookies of its own and uses no analytics or tracking technologies. We do not collect,
          store, or process personal data on our own servers. The one exception is the application form, which is
          embedded from Notion and described below.
        </p>
        <p>
          Apart from the application form, the only contact option provided is an email address. If you contact us by
          email, any personal data you provide (such as your name or email address) will be used solely to respond to
          your inquiry and will not be shared with third parties without your explicit consent.
        </p>
      </LegalSection>

      <LegalSection heading="The application form">
        <p>
          The application form on this site is provided by Notion Labs, Inc. and displayed inside an embedded frame.
          It is loaded from Notion only, and nothing you type into it passes through our servers — it goes directly
          to Notion, where we then read it.
        </p>
        <p>
          When the form loads, Notion sets its own cookies and shows its own cookie notice inside the frame. Those
          cookies are set by Notion, not by us, and we have no control over them.
        </p>
        <p>
          We process the information you enter — such as your name, TU Wien email address, student ID, and the
          details of your project — for the sole purpose of assessing your application and replying to you. The legal
          basis is your consent under Art. 6(1)(a) GDPR, which you give when you submit the form. You may withdraw it
          at any time by emailing{' '}
          <a href="mailto:hello@spinofffactory.at" className={legalLink}>
            hello@spinofffactory.at
          </a>
          , which we will then act on without affecting the lawfulness of processing carried out beforehand.
        </p>
        <p>
          Notion Labs, Inc. acts as a processor on our behalf, and this may involve transferring data outside the
          European Economic Area on the basis of the European Commission&rsquo;s Standard Contractual Clauses.
          Application data is retained for up to 12 months after a decision is made, and is not shared with any
          further third parties without your explicit consent.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You have the right to access your data, and to its rectification, erasure, restriction of processing, and
          portability. To exercise any of these, email{' '}
          <a href="mailto:hello@spinofffactory.at" className={legalLink}>
            hello@spinofffactory.at
          </a>
          . You also have the right to lodge a complaint with the Austrian Data Protection Authority
          (Datenschutzbehörde,{' '}
          <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer" className={legalLink}>
            dsb.gv.at
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection heading="External links">
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
        <p className="text-ink-3 text-[13px]">© 2026 The Spinoff Factory</p>
      </LegalSection>
    </LegalLayout>
  )
}
