export default {
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Short summary for preview cards',
    },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              description: 'Optional section heading',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 10,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'content',
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: title || 'Section',
                subtitle: subtitle
                  ? `${subtitle.substring(0, 100)}...`
                  : 'No content',
              };
            },
          },
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'AI & Machine Learning', value: 'ai-ml' },
          { title: 'Web Development', value: 'web-development' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Cybersecurity', value: 'cybersecurity' },
          { title: 'Cloud Computing', value: 'cloud-computing' },
          { title: 'Product Design', value: 'product-design' },
          { title: 'Business', value: 'business' },
          { title: 'Industry News', value: 'industry-news' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark as featured to highlight this post',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true to publish this post',
      initialValue: false,
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      const { title, author, date, media } = selection;
      return {
        title,
        subtitle: `By ${author} - ${new Date(date).toLocaleDateString()}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Publication Date, Old',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
};
