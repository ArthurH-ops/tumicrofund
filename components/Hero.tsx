import ApplyButton from './ApplyButton'
import Asterisk from './Asterisk'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,64px)]">
      <Asterisk className="pointer-events-none absolute right-[-2%] top-[-18%] w-[clamp(260px,38vw,520px)] h-[clamp(260px,38vw,520px)] text-brand-deep" />
      <div className="relative max-w-[820px]">
        <p className="mb-4 font-display font-medium text-xs uppercase tracking-eyebrow">
          TU Microfund
        </p>
        <h1 className="font-display font-medium text-[clamp(40px,6vw,72px)] leading-[1.04] tracking-tight [text-wrap:balance]">
          Break things.
          <br />
          Build things.
        </h1>
        <p className="mt-5 max-w-[640px] text-lg leading-[1.45] [text-wrap:pretty]">
          A microfund for TU Wien students with prototypes to build and no time to waste.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ApplyButton size="lg">Apply now</ApplyButton>
          <p className="font-display font-medium text-xs uppercase tracking-label">
            60 seconds. One video. That&rsquo;s it.
          </p>
        </div>
      </div>
    </section>
  )
}
