import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import { PrismaClient } from "@prisma/client";

import { authController } from "./controllers/authController";
import { userController } from "./controllers/userController";
import { cartController } from "./controllers/cartController";

import { UserService } from "./services/userService";
import { AuthService } from "./services/authService";
import { CartService } from "./services/cartService";

import { UserRepository } from "./repositories/userRepository";
import { CartRepository } from "./repositories/cartRepository";

import type { JwtVariables } from "hono/jwt";
import type { JWTPayload } from "./schema/Auth";

const app = new Hono<{ Variables: JwtVariables<JWTPayload> }>();
const prisma = new PrismaClient();

app.use("*", logger()).use("*", cors());

const TOKEN_SECRET = process.env.TOKEN_SECRET || "supersecret";

const userRepository = new UserRepository(prisma);
const cartRepository = new CartRepository(prisma);

const cartService = new CartService(cartRepository);
const userService = new UserService(userRepository);
const authService = new AuthService(userService, TOKEN_SECRET);

// Protected routes
app.use("/auth/me", jwt({ secret: TOKEN_SECRET }));
app.use("/auth/logout", jwt({ secret: TOKEN_SECRET }));
app.use("/cart/*", jwt({ secret: TOKEN_SECRET }));

app.get("/", (c) => {
  return c.text("Hello from Pro Market API");
});

app.route("/auth", authController(authService));
app.route("/users", userController(userService));
app.route("/cart", cartController(cartService));

export default app;
