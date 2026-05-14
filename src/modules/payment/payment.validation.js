import { z } from "zod";

export const consultPaySchema = z.object({
  amount: z.number().positive(),
  userId: z.string().optional(),
});