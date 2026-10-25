import Asterisk from './Asterisk'

export default function Manifesto() {
  return (
    <section className="max-w-container mx-auto px-6 pt-12">
      <div className="relative overflow-hidden rounded-lg border border-ink bg-brand px-[clamp(20px,5vw,48px)] py-[clamp(28px,5vw,56px)]">
        <Asterisk className="pointer-events-none absolute right-4 top-[-60px] w-[320px] h-[320px] text-brand-deep" />
        <div className="relative max-w-[760px]">
          <h2 className="font-display font-medium text-[44px] leading-[1.05] tracking-tight [text-wrap:balance]">
            Have fun and break things.
          </h2>
          <p className="mt-4 max-w-[600px] text-lg leading-[1.45] [text-wrap:pretty]">
            Science is breaking things to build things. Prototypes don&rsquo;t wait for paperwork. Neither should you.
          </p>
        </div>
      </div>
    </section>
  )
}
