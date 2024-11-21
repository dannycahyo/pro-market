import { Hono } from "hono";
import { sendError } from "../utils/errorHandler";
import type { ProductService } from "../services/productService";
import type { JwtVariables } from "hono/jwt";
import type { JWTPayload } from "../schema/Auth";

export const productController = (productService: ProductService) => {
  const router = new Hono<{ Variables: JwtVariables<JWTPayload> }>();

  router.get("/", async (c) => {
    try {
      const products = await productService.getAllProducts();
      return c.json(products);
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const product = await productService.getProductById(id);
      if (!product) return c.notFound();
      return c.json(product);
    } catch (error) {
      return sendError(c, error);
    }
  });

  return router;
};
