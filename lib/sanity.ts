import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

// Buscar todos os posts
export async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      "author": author->name,
      "category": category->title
    }
  `)
}

// Buscar post por slug
export async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      "author": author->name,
      "category": category->title
    }
  `, { slug })
}

// Buscar todas as categorias
export async function getCategories() {
  return await client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title
    }
  `)
}

// Calcular tempo de leitura
export function calcularLeitura(body: any[]): string {
  if (!body) return '1 min'
  const texto = body
    .filter((b: any) => b._type === 'block')
    .map((b: any) => b.children?.map((c: any) => c.text).join(''))
    .join(' ')
  const palavras = texto.split(' ').length
  const minutos = Math.ceil(palavras / 200)
  return `${minutos} min de leitura`
}