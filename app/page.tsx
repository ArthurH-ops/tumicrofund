import SiteHeader from '@/components/SiteHeader'
import Hero from '@/components/Hero'
import WhatItIs from '@/components/WhatItIs'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Manifesto from '@/components/Manifesto'
import ApplyCTA from '@/components/ApplyCTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <WhatItIs />
        <Stats />
        <HowItWorks />
        <Manifesto />
        <ApplyCTA />
        <Footer />
      </main>
    </>
  )
}
