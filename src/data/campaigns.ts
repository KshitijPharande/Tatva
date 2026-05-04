import { sanityClient } from '@/lib/sanity'

export const getCampaigns = async () => {
  return await sanityClient.fetch(
    `*[_type == "campaign" && isActive == true] | order(_createdAt desc) {
      _id,
      title,
      tag,
      body,
      link,
      "imageUrl": image.asset->url
    }`
  )
}
