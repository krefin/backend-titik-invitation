import { z } from "zod";

export const storySchema = z.object({
  websiteId: z.number(),

  title: z.string().min(1, "Title wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

export const updateStorySchema = storySchema.partial();