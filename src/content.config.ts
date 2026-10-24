// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { z } from 'astro/zod';

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

const game = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/posts/game' }),
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

export const collections = { blog, writeup, game };
