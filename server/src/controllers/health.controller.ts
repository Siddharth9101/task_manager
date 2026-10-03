import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";

export async function health(
  _req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    res.status(200).json({
      success: true,
      message: "server is healthy",
    });
  } catch (err) {
    next(err);
  }
}
