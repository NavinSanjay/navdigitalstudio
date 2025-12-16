'use client'
// import './globals.css'
import '@/src/styles/globals.css'
import { ReactNode, useEffect } from 'react'
import { initAnalytics } from '@/lib/analytics'
import '@/lib/sentry.client'

// export const metadata = {
//   title: 'Nav Digital Studio',
//   description: 'Black-and-white, x-ray-aesthetic portfolio that converts.',
//   openGraph: { title: 'Nav Digital Studio', description: 'Elevated taste + sharp execution -> book.', images: ['/og/og.jpg'] },
//   metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
// }

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => { initAnalytics() }, [])
  return (
    <html lang="en" className="bg-black text-white">
      <body className="min-h-dvh antialiased selection:bg-white selection:text-black">
        <div id="xray-cursor" className="xray-cursor" />
        {children}
        <script dangerouslySetInnerHTML={{__html: `
          (function () {
            const el = document.getElementById('xray-cursor')
            if (!el) return
            document.addEventListener('pointermove', (e) => {
              el.style.setProperty('--mx', e.clientX + 'px')
              el.style.setProperty('--my', e.clientY + 'px')
            }, { passive: true })
          })();
        `}} />
      </body>
    </html>
  )
}
