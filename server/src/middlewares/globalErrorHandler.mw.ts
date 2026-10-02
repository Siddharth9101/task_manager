import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { ApiResponse } from "../types/apiResponse.js";
import { logger } from "../lib/logger.js";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction,
) {
  logger.error({ err }, `unhandled error, requestId: ${req.requestId}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: `internal server error`,
  });
}
