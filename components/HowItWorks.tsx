import { Fragment } from 'react'
import Eyebrow from './Eyebrow'

const steps = [
  { n: '01', title: 'Pitch.', body: 'Record a 60-second video. Tell us what you’re building and why.' },
  { n: '02', title: 'Submit.', body: 'Drop it through the form below. Takes a minute.' },
  { n: '03', title: 'Get funded.', body: 'We review fast. If it’s a yes, money hits in days.' },
]

// Design-system StepFlow: outlined steps joined by →, the last step filled with the brand yellow.
export default function HowItWorks() {
  return (
    <section id="how" className="max-w-container mx-auto px-6 pt-12 flex flex-col gap-[14px] scroll-mt-[72px]">
      <Eyebrow>02 · How it works</Eyebrow>
      <div className="flex flex-wrap items-stretch gap-2">
        {steps.map((step, i) => (
          <Fragment key={step.n}>
            {i > 0 && (
              <span aria-hidden="true" className="self-center font-display font-medium text-xl">
                →
              </span>
            )}
            <div
              className={`flex-[1_1_180px] rounded-md border border-ink p-4 ${
                i === steps.length - 1 ? 'bg-brand' : 'bg-paper'
              }`}
            >
              <p className="mb-[6px] font-display font-medium text-[10px] uppercase tracking-label">{step.n}</p>
              <h3 className="mb-[6px] font-display font-medium text-base leading-[1.2]">{step.title}</h3>
              <p className="text-[13px] leading-[1.45]">{step.body}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
