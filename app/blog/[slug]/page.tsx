import { getPost, getPosts, calcularLeitura } from '@/lib/sanity'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import '../../styles/blog.css'

const ESCURO = '#0d0d1a'
const BEGE = '#f5f0e8'
const LARANJA = '#c94a1f'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post não encontrado' }
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `https://blog.rikodevstudio.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'Riko Dev Studio'],
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  const todoPosts = await getPosts()
  const relacionados = todoPosts.filter((p: any) => p.slug.current !== slug).slice(0, 2)

  if (!post) {
    return (
      <main style={{ backgroundColor: ESCURO, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>Post nao encontrado.</p>
      </main>
    )
  }

  const shareStyle = {
    fontSize: '0.85rem',
    padding: '0.4rem 1rem',
    borderRadius: '999px',
    border: '1.5px solid rgba(0,0,0,0.15)',
    color: '#444',
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s'
  }

  return (
    <main style={{ minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: ESCURO, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="https://rikodevstudio.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'Playfair Display, serif' }}>Riko.Dev</Link>
        <Link href="/blog" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>Voltar ao blog</Link>
      </header>

      {/* BREADCRUMB */}
      <div style={{ backgroundColor: ESCURO, padding: '1.5rem 2rem 0' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
          <Link href="https://rikodevstudio.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>{post.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ backgroundColor: ESCURO, padding: '3rem 2rem 4rem' }}>
        <div className="animate-fadeup" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <span style={{ backgroundColor: LARANJA, color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>{post.category || 'Geral'}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{calcularLeitura(post.body)}</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>{post.title}</h1>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <span>Por {post.author || 'Riko Dev Studio'}</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* CORPO */}
      <section style={{ backgroundColor: BEGE, padding: '3rem 2rem' }}>
        <div className="post-body" style={{ maxWidth: '780px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', fontSize: '1.05rem', lineHeight: 1.9 }}>
          {post.body && <PortableText value={post.body} />}
        </div>
      </section>

      {/* COMPARTILHAR */}
      <section style={{ backgroundColor: BEGE, padding: '0 2rem 2rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ color: '#666', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>Compartilhar:</p>
          <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://blog.rikodevstudio.com/blog/' + slug)}`} target="_blank" style={shareStyle}>WhatsApp</a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://blog.rikodevstudio.com/blog/' + slug)}`} target="_blank" style={shareStyle}>LinkedIn</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://blog.rikodevstudio.com/blog/' + slug)}`} target="_blank" style={shareStyle}>Twitter</a>
        </div>
      </section>

      {/* POSTS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section style={{ backgroundColor: BEGE, padding: '3rem 2rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#111', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Leia tambem</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {relacionados.map((p: any) => (
                <Link key={p._id} href={`/blog/${p.slug.current}`} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '1.5rem', textDecoration: 'none', display: 'block' }}>
                  <span style={{ backgroundColor: LARANJA, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.7rem', borderRadius: '999px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', display: 'inline-block', marginBottom: '0.8rem' }}>{p.category || 'Geral'}</span>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#111', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3 }}>{p.title}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ backgroundColor: ESCURO, padding: '5rem 2rem', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Gostou do conteudo?</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', fontFamily: 'Inter, sans-serif', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>Se voce precisa de um site profissional, a Riko Dev Studio pode te ajudar.</p>
        <a href="https://rikodevstudio.com" style={{ backgroundColor: LARANJA, color: '#fff', padding: '0.85rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontFamily: 'Inter, sans-serif', display: 'inline-block' }}>Quero meu site</a>
      </section>

    </main>
  )
}