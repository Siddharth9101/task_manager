import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";
import { loginUserSchema, registerUserSchema } from "../schemas/user.js";
import * as authService from "../services/auth.service.js";
import { User } from "../types/user.js";
import { cookieOptions } from "../config/config.js";

export async function register(
  req: Request,
  res: Response<ApiResponse<User>>,
  next: NextFunction,
) {
  try {
    const parsedBody = registerUserSchema.parse(req.body);

    const user = await authService.register(parsedBody);

    res.status(201).json({
      success: true,
      message: "registered successfully, you can now login",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    const parsedBody = loginUserSchema.parse(req.body);

    const { accessToken } = await authService.login(parsedBody);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.status(200).json({
      success: true,
      message: "login successful",
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(
  _req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
}
