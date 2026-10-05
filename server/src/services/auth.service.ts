import { LoginUserInput, RegisterUserInput, User } from "../types/user.js";
import * as userRepo from "../repositories/user.repository.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcryptjs";
import { Code, PASSWORD_HASH_SALT } from "../constants/constants.js";
import { signAccessToken } from "../lib/jwt.js";
import { logger } from "../lib/logger.js";

export async function register(data: RegisterUserInput): Promise<User> {
  const existingUser = await userRepo.findByEmail(data.email);

  if (existingUser) {
    throw new AppError(
      409,
      "email already in use, try logging in",
      Code.CONFLICT,
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, PASSWORD_HASH_SALT);

  const user = await userRepo.create({ ...data, password: hashedPassword });

  return user;
}

export async function login(
  data: LoginUserInput,
): Promise<{ accessToken: string }> {
  const existingUser = await userRepo.findByEmailWithPassword(data.email);

  if (!existingUser) {
    logger.debug(
      `auth.service.login, email ${data.email} does not exists in db`,
    );
    throw new AppError(401, "invalid creadentials", Code.UNAUTHENTICATED);
  }

  const validPassword = await bcrypt.compare(
    data.password,
    existingUser.passwordHash,
  );

  if (!validPassword) {
    logger.debug(`auth.service.login, invalid password for ${data.email}`);
    throw new AppError(401, "invalid creadentials", Code.UNAUTHENTICATED);
  }

  const accessToken = signAccessToken({
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  });

  return { accessToken };
}
