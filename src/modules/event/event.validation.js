import { z } from "zod";

export const eventSchema = z.object({
  websiteId: z.number(),

  name: z.string().min(1, "Nama event wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),

  location: z.string().min(1, "Lokasi wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),

  mapsUrl: z.string().url().nullable().optional()
});

export const updateEventSchema = eventSchema.partial();