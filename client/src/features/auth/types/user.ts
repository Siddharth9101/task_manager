import type z from "zod";
import type { loginUserSchema, registerUserSchema } from "../schemas/user";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type AccessTokenPayload = {
  id: string;
  name: string;
  email: string;
};
