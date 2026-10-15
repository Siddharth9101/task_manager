import { Request, Response, NextFunction } from "express";
import {
  Code,
  RATE_LIMIT_MAX_REQUEST,
  RATE_LIMIT_WINDOW_SECONDS,
} from "../constants/constants.js";
import { ApiResponse } from "../types/apiResponse.js";
import { redisClient } from "../lib/redis.js";

export async function rateLimit(
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    const ip = req.ip;

    const rateLimitKey = `rate_limit:auth:${ip}`;

    const reqCount = await redisClient.incr(rateLimitKey);

    if (reqCount === 1) {
      await redisClient.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
    }

    res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUEST);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(0, RATE_LIMIT_MAX_REQUEST - reqCount),
    );

    if (reqCount > RATE_LIMIT_MAX_REQUEST) {
      res.status(429).json({
        success: false,
        error: {
          message: "rate limitted",
          code: Code.RATE_LIMIT,
        },
      });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
}
