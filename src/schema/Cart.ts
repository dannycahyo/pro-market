import { z } from "zod";

export const CreateCartItemSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().min(1),
});

export type CreateCartItemInput = z.infer<
  typeof CreateCartItemSchema
>;
export type UpdateCartItemInput = z.infer<
  typeof UpdateCartItemSchema
>;
