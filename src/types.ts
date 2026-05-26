import { z } from "zod";
import {
  idSchema,
  itemCreateBodySchema,
  itemSchema,
  itemUpdateBodySchema,
} from "./schemas";

export type TId = z.infer<typeof idSchema>;

export type TItem = z.infer<typeof itemSchema>;

export type TItemCreateBody = z.infer<typeof itemCreateBodySchema>;

export type TItemUpdateBody = z.infer<typeof itemUpdateBodySchema>;
