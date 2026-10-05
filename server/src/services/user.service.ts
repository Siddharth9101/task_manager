import { UpdatePasswordInput, UpdateUserInput, User } from "../types/user.js";
import * as userRepo from "../repositories/user.repository.js";
import { AppError } from "../errors/AppError.js";
import { Code, PASSWORD_HASH_SALT } from "../constants/constants.js";
import bcrypt from "bcryptjs";
import { logger } from "../lib/logger.js";

export async function update(
  data: UpdateUserInput,
  loggedInUserId: string,
  updateUserId: string,
): Promise<User> {
  const user = await userRepo.findById(updateUserId);
  if (!user || user.id !== loggedInUserId) {
    logger.debug(
      `user.service.update, either userId is inavalid or loggin user is not updating his info`,
    );
    throw new AppError(403, "unauthorized", Code.UNAUTHORIZED);
  }
  const updatedUser = await userRepo.update(data, updateUserId);
  return updatedUser;
}

export async function updatePassword(
  data: UpdatePasswordInput,
  loggedInUserId: string,
  updateUserId: string,
): Promise<void> {
  const user = await userRepo.findByIdWithPassword(updateUserId);
  if (!user || user.id !== loggedInUserId) {
    logger.debug(
      `user.service.updatePassword, either userId is inavalid or loggin user is not updating his info`,
    );
    throw new AppError(403, "unauthorized", Code.UNAUTHORIZED);
  }
  const passwordValid = await bcrypt.compare(
    data.currentPassword,
    user.passwordHash,
  );
  if (!passwordValid) {
    throw new AppError(403, "current password is invalid", Code.UNAUTHORIZED);
  }

  const passwordHash = await bcrypt.hash(data.newPassword, PASSWORD_HASH_SALT);

  await userRepo.updatePassword(passwordHash, updateUserId);
}
