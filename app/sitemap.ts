import { client } from '@/lib/sanity'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug,
      publishedAt
    }
  `)

  const postUrls = posts.map((post: any) => ({
    url: `https://blog.rikodevstudio.com/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    {
      url: 'https://blog.rikodevstudio.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://blog.rikodevstudio.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    ...postUrls
  ]
}