import { AccessTokenPayload } from "./jwt.ts";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user?: AccessTokenPayload;
    }
  }
}

export {};
