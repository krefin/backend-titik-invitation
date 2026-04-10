import { z } from "zod";

export const createSchema = z.object({
  slug: z.string().min(3),
  title: z.string(),
  template: z.string(),

  couple: z.object({
    groomName: z.string(),
    groomParent: z.string(),
    brideName: z.string(),
    brideParent: z.string(),
  }),

  events: z.array(z.object({
    name: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    address: z.string(),
  })),

  galleries: z.array(z.object({
    imageUrl: z.string(),
  })),

  stories: z.array(z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  })),

  gifts: z.array(z.object({
    bank: z.string(),
    name: z.string(),
    number: z.string(),
  })),
});

export const updateSchema = createSchema.partial();