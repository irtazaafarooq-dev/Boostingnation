export const Posts = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    // Allows anyone on the internet to read your blogs
    read: () => true, 
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'text',
      // Notice we removed the editor override here!
      required: true,
      admin: {
        description: 'Write your actual blog post here.',
      }
    },
    // --- SIDEBAR FIELDS (SEO & URL) ---
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'The URL for the post (e.g., how-to-unlock-camos)',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      required: true,
      maxLength: 160,
      admin: {
        position: 'sidebar',
        description: 'CRITICAL FOR GOOGLE: A short summary of the post (150-160 characters max).',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', 
      admin: {
        position: 'sidebar',
      },
    },
  ],
};