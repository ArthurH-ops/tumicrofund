import ApplyButton from './ApplyButton'
import Eyebrow from './Eyebrow'

export default function ApplyCTA() {
  return (
    <section className="max-w-container mx-auto px-6 pt-[72px] flex flex-col items-center gap-5 text-center">
      <h2 className="font-display font-medium text-[clamp(40px,6vw,72px)] leading-[1.04] tracking-tight">Pitch it.</h2>
      <ApplyButton size="lg">Start your application</ApplyButton>
      <Eyebrow size="sm" muted>
        Rolling basis. We read everything.
      </Eyebrow>
    </section>
  )
}
