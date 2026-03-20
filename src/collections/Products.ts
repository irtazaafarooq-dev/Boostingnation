import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'gameSlug', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      defaultValue: 'boosting',
      options: [
        { label: '🚀 Boosting Service', value: 'boosting' },
        { label: '👤 Account Sale', value: 'accounts' },
        { label: '💎 Currency Top-up', value: 'topups' },
      ],
      admin: { position: 'sidebar' }
    },
    {
      name: 'category',
      type: 'select',
      admin: { isClearable: true },
      options: [
        { label: 'Rank Boosting', value: 'rank-boosting' },
        { label: 'Weapon Leveling', value: 'weapon-leveling' },
        { label: 'Prestige Leveling', value: 'prestige-leveling' },
        { label: 'Camo Boosting', value: 'camos' },
        { label: 'Event Boosting', value: 'events' },
      ],
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      label: 'Starting Price (Displays "from $X" on the grid cards)',
    },

    // GLOBAL ADD-ONS (Back to simple checkboxes!)
    {
      name: 'globalAddons',
      type: 'group',
      label: 'Available Global Modifiers (Check to enable on frontend)',
      fields: [
        { name: 'allowExpressDelivery', type: 'checkbox', defaultValue: true, label: 'Allow Express Delivery Add-on' },
        { name: 'allowPriorityStart', type: 'checkbox', defaultValue: true, label: 'Allow Priority Start Add-on' },
        { name: 'allowSelfPlay', type: 'checkbox', defaultValue: true, label: 'Allow Selfplay Add-on' },
      ]
    },

    { name: 'description', type: 'textarea', required: true },
    {
      name: 'requirements',
      type: 'array',
      fields: [{ name: 'requirement', type: 'text', required: true }],
    },
    {
      name: 'howItWorks',
      type: 'array',
      fields: [
        { name: 'stepTitle', type: 'text', required: true },
        { name: 'stepDescription', type: 'textarea', required: true },
      ],
    },
  ],
};