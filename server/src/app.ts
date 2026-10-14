import express from "express";
import { apiRouter } from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.mw.js";
import { notFound } from "./middlewares/notFound.mw.js";
import { requestId } from "./middlewares/requestId.mw.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger.js";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(requestId);

  app.use("/api/v1", apiRouter);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(notFound);
  app.use(globalErrorHandler);

  return app;
}
