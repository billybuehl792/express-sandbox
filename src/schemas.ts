import { z } from "zod";

export const idSchema = z.coerce.number().positive();

export const itemSchema = z.object({
  id: idSchema,
  label: z.string(),
  description: z.string().optional(),
});

export const itemCreateBodySchema = z.object({
  label: z.string(),
  description: z.string().optional(),
});

export const itemUpdateBodySchema = z.object({
  label: z.string().optional(),
  description: z.string().optional(),
});
