// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/posts/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.date(),
        author: z.string().optional(),
        image: z.object({
            url: z.string(),
            alt: z.string()
        }).optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const writeup = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/posts/writeup' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.date(),
        author: z.string().optional(),
        image: z.object({
            url: z.string(),
            alt: z.string()
        }).optional(),
        tags: z.array(z.string()).optional(),
    })
})

export const collections = { blog, writeup };