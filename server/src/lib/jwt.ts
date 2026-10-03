import { config } from "../config/config.js";
import { ACCESS_TOKEN_EXPIRY } from "../constants/constants.js";
import { AccessTokenPayload } from "../types/jwt.js";
import jwt from "jsonwebtoken";

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, config.accessTokenSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}
