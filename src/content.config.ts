import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'gauge-calculations',
      'yarn',
      'needles',
      'techniques',
      'app-tools',
    ]),
    readTime: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categoryOrder: z.number().int().min(1).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'fi']).default('en'),
    translationKey: z.string().optional(),
  }),
});

export const collections = { articles };
