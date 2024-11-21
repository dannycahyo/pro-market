import { hash, verify } from "argon2";
import { sign } from "jsonwebtoken";
import { createUserSchema } from "../schema/User";

import type { UserService } from "./userService";

import type { CreateUserInput, LoginUserInput } from "../schema/User";
import type { User } from "@prisma/client";

export class AuthService {
  constructor(
    public userService: UserService,
    private secret: string,
  ) {}

  async register({
    email,
    password,
    name,
  }: CreateUserInput): Promise<string> {
    const parsedData = createUserSchema.parse({
      email,
      password,
      name,
    });
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hash(password);
    const user = await this.userService.createUser({
      ...parsedData,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login({ email, password }: LoginUserInput): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await verify(user.password, password))) {
      throw new Error("Invalid credentials");
    }
    return this.generateToken(user);
  }

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    };
    return sign(payload, this.secret);
  }
}
