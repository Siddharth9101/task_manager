import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";
import { Code } from "../constants/constants.js";

export function notFound(
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction,
) {
  res.status(404).json({
    success: false,
    error: {
      message: "route not found",
      code: Code.NOT_FOUND,
    },
  });
}
