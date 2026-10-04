import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().max(100, "name must not exceed 100 characters"),
  email: z.email(),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().max(100, "name must not exceed 100 characters"),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6, "password must be atleast 6 characters"),
});

export const updateUserParams = z.object({
  id: z.uuid(),
});
