import { z } from "zod";

export const giftSchema = z.object({
  websiteId: z.number(),

  bank: z.string().min(1, "Bank wajib diisi"),
  name: z.string().min(1, "Nama pemilik wajib diisi"),
  number: z.string().min(1, "Nomor rekening wajib diisi"),
});

export const updateGiftSchema = giftSchema.partial();