import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";
import { AccessTokenPayload } from "../types/jwt.js";
import { User, UserName } from "../types/user.js";
import {
  updatePasswordSchema,
  updateUserParams,
  updateUserSchema,
} from "../schemas/user.js";
import * as userService from "../services/user.service.js";
import { AppError } from "../errors/AppError.js";
import { Code } from "../constants/constants.js";

export async function me(
  req: Request,
  res: Response<ApiResponse<AccessTokenPayload>>,
  next: NextFunction,
) {
  try {
    res.status(200).json({
      success: true,
      message: "user info fetched successfully",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response<ApiResponse<User>>,
  next: NextFunction,
) {
  try {
    const parsedBody = updateUserSchema.parse(req.body);
    const userId = req.user?.id;
    const parsedParams = updateUserParams.parse(req.params);
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    const user = await userService.update(parsedBody, userId, parsedParams.id);

    res.status(200).json({
      success: true,
      message: "user details updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePassword(
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    const parsedBody = updatePasswordSchema.parse(req.body);
    const userId = req.user?.id;
    const parsedParams = updateUserParams.parse(req.params);
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    await userService.updatePassword(parsedBody, userId, parsedParams.id);

    res.status(200).json({
      success: true,
      message: "user details updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(
  _req: Request,
  res: Response<ApiResponse<UserName[]>>,
  next: NextFunction,
) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}
