import { Hono } from "hono";
import { UserService } from "../services/userService";
import { sendError } from "../utils/errorHandler";
import { sendResponse } from "../utils/responseHandler";

export const userController = (userService: UserService) => {
  const router = new Hono();

  router.get("/", async (c) => {
    try {
      const users = await userService.getAllUsers();

      return sendResponse(
        c,
        users.map((user) => ({
          name: user.name,
          email: user.email,
        })),
        "Users retrieved successfully",
      );
    } catch (error) {
      return sendError(c, error);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const user = await userService.getUserById(id);
      if (!user) return sendResponse(c, null, "User not found", 404);

      return sendResponse(
        c,
        { name: user.name, email: user.email },
        "User retrieved successfully",
      );
    } catch (error) {
      return sendError(c, error);
    }
  });

  return router;
};
