import Eyebrow from './Eyebrow'

export default function WhatItIs() {
  return (
    <section id="deal" className="max-w-container mx-auto px-6 pt-12 flex flex-wrap gap-x-8 gap-y-[14px] scroll-mt-[72px]">
      <div className="flex-[1_1_220px]">
        <Eyebrow>01 · The deal</Eyebrow>
      </div>
      <p className="flex-[2_1_480px] font-display font-medium text-[30px] leading-[1.2] tracking-tight [text-wrap:pretty]">
        We back student projects at TU Wien with small, fast checks. No equity. No 40-page pitch decks.
        Just a video, a project, and a green light – so you can start building today instead of next semester.
      </p>
    </section>
  )
}
