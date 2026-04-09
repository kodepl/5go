// ============================================
// KONFIGURACJA CONTENT COLLECTIONS - 5Go Blog
// ============================================

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(120),
    description: z.string().min(10).max(300).optional(),
    seoTitle: z.string().min(5).max(70).optional(),
    seoDescription: z.string().min(10).max(160).optional(),
    keywords: z.array(z.string()).optional(),
    // Zewnętrzne URL-e obrazków (np. z picsum.photos)
    coverImage: z.string().url().optional(),
    coverAlt: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('5Go Editorial Team'),
    authorEmail: z.string().email().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    relatedPosts: z.array(z.string()).optional(),
    canonicalUrl: z.string().url().optional(),
    robots: z.enum(['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']).optional(),
    ogImage: z.string().url().optional(),
    twitterImage: z.string().url().optional(),
    readingTime: z.number().optional(),
    views: z.number().default(0),
  }),
});

export const collections = {
  'blog': blogCollection,
};

export type BlogPost = Awaited<ReturnType<typeof blogCollection['parser']>>;
export type BlogPostFrontmatter = BlogPost['data'];
