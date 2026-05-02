import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid")
    .min(5, "Email wajib diisi"),

  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(100),
});