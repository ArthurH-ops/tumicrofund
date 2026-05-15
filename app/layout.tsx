import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { ModalProvider } from '@/components/ModalContext'
import ApplyModal from '@/components/ApplyModal'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The 1040 Voucher — Break things. Build things.',
  description:
    'A microfund for TU Wien students with prototypes to build and no time to waste. Small, fast, no-equity checks for student projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-paper text-ink">
        <ModalProvider>
          {children}
          <ApplyModal />
        </ModalProvider>
      </body>
    </html>
  )
}
