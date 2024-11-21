import { Hono } from "hono";
import { UserService } from "../services/userService";
import { sendError } from "../utils/errorHandler";

export const userController = (userService: UserService) => {
  const router = new Hono();

  router.get("/", async (c) => {
    try {
      const users = await userService.getAllUsers();
      return c.json(
        users.map((user) => ({
          name: user.name,
          email: user.email,
        })),
      );
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const user = await userService.getUserById(id);
      if (!user) return c.json({ error: "User not found" }, 404);
      return c.json({ name: user.name, email: user.email });
    } catch (error) {
      return sendError(c, error);
    }
  });

  return router;
};
