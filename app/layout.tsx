import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.rikodevstudio.com'),
  title: {
    default: 'Blog — Riko Dev Studio',
    template: '%s | Riko Dev Studio'
  },
  description: 'Dicas de presença digital, criação de sites e tecnologia para pequenos negócios no Brasil e na França.',
  keywords: ['criação de site', 'site profissional', 'presença digital', 'desenvolvedor web', 'site pequeno negócio', 'développeur web Valence'],
  authors: [{ name: 'Ricardo Borges', url: 'https://rikodevstudio.com' }],
  creator: 'Riko Dev Studio',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'fr_FR',
    url: 'https://blog.rikodevstudio.com',
    siteName: 'Blog — Riko Dev Studio',
    title: 'Blog — Riko Dev Studio',
    description: 'Dicas de presença digital e criação de sites para pequenos negócios.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Riko Dev Studio Blog'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Riko Dev Studio',
    description: 'Dicas de presença digital e criação de sites para pequenos negócios.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}