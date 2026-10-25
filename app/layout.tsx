import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { ModalProvider } from '@/components/ModalContext'
import ApplyModal from '@/components/ApplyModal'
import './globals.css'

// Same families as the design system: Space Grotesk (display, labels, numbers) + Inter (body).
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TU Microfund — Break things. Build things.',
  description:
    'A microfund for TU Wien students with prototypes to build and no time to waste. Small, fast, no-equity checks for student projects.',
  icons: { icon: '/logos/favicon.svg', apple: '/logos/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-body">
        <ModalProvider>
          {children}
          <ApplyModal />
        </ModalProvider>
      </body>
    </html>
  )
}
