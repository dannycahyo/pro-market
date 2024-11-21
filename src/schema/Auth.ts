import { z } from "zod";

export const JWTPayloadSchema = z.object({
  sub: z.string(),
  email: z.string(),
  name: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
