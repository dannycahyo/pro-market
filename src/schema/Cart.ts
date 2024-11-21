import { z } from "zod";

export const CreateCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const CreateCartSchema = z.object({
  userId: z.string(),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().min(1),
});

export type CreateCartItemInput = z.infer<
  typeof CreateCartItemSchema
>;
export type CreateCartInput = z.infer<typeof CreateCartSchema>;
export type UpdateCartItemInput = z.infer<
  typeof UpdateCartItemSchema
>;

export type CartItemData = {
  productId: string;
  quantity: number;
};
