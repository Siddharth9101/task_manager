import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { ApiResponse } from "../types/apiResponse.js";
import { logger } from "../lib/logger.js";
import { Code } from "../constants/constants.js";
import { ZodError } from "zod";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction,
) {
  logger.error({ err }, `unhandled error, requestId: ${req.requestId}`);

  if (err instanceof ZodError) {
    const fields: Record<string, string> = {};
    for (const issue of err.issues) {
      const field = issue.path.join(".");

      if (!fields[field]) {
        fields[field] = issue.message;
      }
    }

    return res.status(400).json({
      success: false,
      error: {
        code: Code.BAD_REQUEST,
        message: "request validation failed",
        fields,
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      code: Code.INTERNAL_SERVER_ERROR,
      message: "internal server error",
    },
  });
}
