import { Hono } from "hono";
import {
  CreateCartItemSchema,
  UpdateCartItemSchema,
} from "../schema/Cart";

import { sendError } from "../utils/errorHandler";
import type { CartService } from "../services/cartService";
import type { JwtVariables } from "hono/jwt";
import type { JWTPayload } from "../schema/Auth";

export const cartController = (cartService: CartService) => {
  const router = new Hono<{ Variables: JwtVariables<JWTPayload> }>();

  router.get("/", async (c) => {
    try {
      const { sub: userId } = c.get("jwtPayload");
      const cart = await cartService.getUserCart(userId);
      return c.json(cart);
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.post("/items", async (c) => {
    try {
      const { sub: userId } = c.get("jwtPayload");
      const body = await c.req.json();
      const input = CreateCartItemSchema.parse(body);
      const cartItem = await cartService.addItem(userId, {
        productId: input.productId,
        quantity: input.quantity,
      });
      return c.json(cartItem, 201);
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.delete("/items/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const { sub: userId } = c.get("jwtPayload");
      await cartService.removeItem(id, userId);
      return c.json({ message: "Item removed" });
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.patch("/items/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const { sub: userId } = c.get("jwtPayload");
      const body = await c.req.json();
      const input = UpdateCartItemSchema.parse(body);
      const cartItem = await cartService.updateItemQuantity(
        id,
        input,
        userId,
      );
      return c.json(cartItem);
    } catch (error) {
      return sendError(c, error);
    }
  });

  return router;
};
