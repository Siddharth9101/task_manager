import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";

export function notFound(
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction,
) {
  res.status(404).json({
    success: false,
    error: "route not found",
  });
}
