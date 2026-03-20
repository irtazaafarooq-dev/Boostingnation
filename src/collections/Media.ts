import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Allows the frontend to see the images
  },
  // ✅ For Cloudinary, we just set upload to true. 
  // The adapter in payload.config.ts handles the rest!
  upload: true, 
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text (For SEO)',
      required: true, // Good practice for accessibility
    },
  ],
}