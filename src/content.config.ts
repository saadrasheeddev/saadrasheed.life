import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    hook: z.string(),
    tags: z.array(z.string()),
    gradient: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
