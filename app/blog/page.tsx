import { getPosts, getCategories, calcularLeitura } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import '../styles/blog.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas de presenca digital, criacao de sites e tecnologia para pequenos negocios no Brasil e na Franca.',
  openGraph: {
    title: 'Blog — Riko Dev Studio',
    description: 'Dicas de presenca digital e criacao de sites para pequenos negocios.',
    url: 'https://blog.rikodevstudio.com/blog',
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const categorias = await getCategories()

  return (
    <main>

      {/* HEADER */}
      <header className="blog-header">
        <Link href="https://rikodevstudio.com" className="blog-logo">Riko.Dev</Link>
        <span className="blog-nav-link">Blog</span>
      </header>

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <h1>Presenca digital<br />para <em>pequenos negocios</em></h1>
          <p>Dicas de sites, SEO e tecnologia para atrair mais clientes todos os dias.</p>
          <div className="hero-linha" />
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="blog-categorias">
        <button className="categoria-btn ativo">Todos</button>
        {categorias.map((cat: any) => (
          <button key={cat._id} className="categoria-btn">{cat.title}</button>
        ))}
      </section>

      {/* POSTS */}
      <section className="blog-posts">
        <div className="blog-posts-inner">
          {posts.length === 0 ? (
            <p className="blog-empty">Nenhum post ainda. Em breve!</p>
          ) : (
            posts.map((post: any, index: number) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className={`post-card ${index === 0 ? 'post-card-destaque' : ''}`}
              >
                {/* Imagem de capa */}
                {post.mainImage ? (
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="post-card-image"
                  />
                ) : (
                  <div className="post-card-image-placeholder">✦</div>
                )}

                {/* Tag categoria */}
                <span className="post-tag">{post.category || 'Geral'}</span>

                {/* Título e excerpt */}
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                {/* Meta */}
                <div className="post-read-time">
                  <span>📅</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <span>·</span>
                  <span>⏱</span>
                  <span>{calcularLeitura(post.body)}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta">
        <h3>Quer um site profissional?</h3>
        <p>A Riko Dev Studio cria sites modernos e rapidos para pequenos negocios no Brasil e na Franca.</p>
        <a href="https://rikodevstudio.com" className="btn-laranja">Falar com Riko Dev Studio</a>
      </section>

    </main>
  )
}