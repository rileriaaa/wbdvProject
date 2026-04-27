import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from './(comps)/navbarr'
import Footer from './(comps)/footerr'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "Scholar's Den",
  description: 'Buy and sell textbooks, school supplies, and educational materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var t = localStorage.getItem('sd_theme') || 'light';
            document.documentElement.setAttribute('data-theme', t);
          } catch(e) {}
        `}</Script>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 60px - 320px)' }}>
          {children}
          <Toaster position="top-center" />
        </main>
        <Footer />
      </body>
    </html>
  )
}