import { sanityClient } from '@/lib/sanity'

export const getArticles = async () => {
  return await sanityClient.fetch(
    `*[_type == "article"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      date,
      readTime,
      content
    }`
  )
}

export const getArticleBySlug = async (slug: string) => {
  return await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      date,
      readTime,
      content
    }`,
    { slug }
  )
}
