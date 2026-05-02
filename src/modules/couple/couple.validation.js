import { z } from "zod";

export const coupleSchema = z.object({
  groomName: z.string().min(1, "Nama pengantin pria wajib diisi"),
  groomParent: z.string().min(1),

  brideName: z.string().min(1, "Nama pengantin wanita wajib diisi"),
  brideParent: z.string().min(1),

  groomPhoto: z.string().url().optional(),
  bridePhoto: z.string().url().optional(),
});

export const updateCoupleSchema = coupleSchema.partial();