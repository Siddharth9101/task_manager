import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";
import { AppError } from "../errors/AppError.js";
import { Code } from "../constants/constants.js";
import { verifyAccessToken } from "../lib/jwt.js";

export async function authenticate(
  req: Request,
  _res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
  }
  const tokenBody = verifyAccessToken(token);

  if (!tokenBody.id || !tokenBody.name || !tokenBody.email) {
    throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
  }
  req.user = tokenBody;
  next();
}
