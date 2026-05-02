import { z } from "zod";

export const gallerySchema = z.object({
  websiteId: z.number(),
  imageUrl: z.string().url("URL gambar tidak valid"),
});