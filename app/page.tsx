import Hero from '@/components/Hero'
import WhatItIs from '@/components/WhatItIs'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Manifesto from '@/components/Manifesto'
import Partners from '@/components/Partners'
import ApplyCTA from '@/components/ApplyCTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <WhatItIs />
      <Stats />
      <HowItWorks />
      <Manifesto />
      <Partners />
      <ApplyCTA />
      <Footer />
    </main>
  )
}
