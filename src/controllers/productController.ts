import { Hono } from "hono";
import { sendError } from "../utils/errorHandler";
import { sendResponse } from "../utils/responseHandler";

import type { ProductService } from "../services/productService";
import type { JwtVariables } from "hono/jwt";
import type { JWTPayload } from "../schema/Auth";

export const productController = (productService: ProductService) => {
  const router = new Hono<{ Variables: JwtVariables<JWTPayload> }>();

  router.get("/", async (c) => {
    try {
      const products = await productService.getAllProducts();

      return sendResponse(
        c,
        products,
        "Products retrieved successfully",
      );
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const product = await productService.getProductById(id);

      if (!product)
        return sendResponse(c, null, "Product not found", 404);

      return sendResponse(
        c,
        product,
        "Product retrieved successfully",
      );
    } catch (error) {
      return sendError(c, error);
    }
  });

  return router;
};
