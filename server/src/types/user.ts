import z from "zod";
import {
  loginUserSchema,
  registerUserSchema,
  updatePasswordSchema,
  updateUserParams,
  updateUserSchema,
} from "../schemas/user.js";

export type DbUser = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type DbUserWithPassword = DbUser & {
  password_hash: string;
};

export type UserName = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserWithPassword = User & {
  passwordHash: string;
};

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
