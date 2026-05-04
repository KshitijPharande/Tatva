import { createClient } from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'replace-me'
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-05-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
