import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'mudkd6qn',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: false, // Set to false for mutations
})

// Helper function for image URLs
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}
