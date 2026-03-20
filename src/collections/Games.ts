import { CollectionConfig } from 'payload';

export const Games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Game Title (e.g., Call of Duty: Black Ops 7)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Game URL Slug (e.g., bo7)',
    },
    // ==========================================
    // NEW: THE DRAG-AND-DROP IMAGE UPLOADER
    // ==========================================
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // This links it directly to your Media collection!
      required: true,
      label: 'Game Cover Image',
    },
  ],
};