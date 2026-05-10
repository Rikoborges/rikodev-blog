import Link from 'next/link'
import './styles/blog.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas de presença digital, criação de sites e tecnologia para pequenos negócios no Brasil e na França.',
  openGraph: {
    title: 'Blog — Riko Dev Studio',
    description: 'Dicas de presença digital e criação de sites para pequenos negócios.',
    url: 'https://blog.rikodevstudio.com/blog',
  }
}

export default function Home() {
  return (
    <main className="blog-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 className="blog-hero" style={{ fontFamily: 'var(--fonte-titulo)', fontSize: '2rem' }}>
          Riko Dev Studio
        </h1>
        <p style={{ color: 'var(--texto-muted)', marginBottom: '2rem' }}>
          Blog sobre presenca digital e desenvolvimento web
        </p>
        <Link href="/blog" className="btn-laranja">
          Ver o blog
        </Link>
      </div>
    </main>
  )
}