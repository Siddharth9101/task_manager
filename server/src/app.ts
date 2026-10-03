import express from "express";
import { apiRouter } from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.mw.js";
import { notFound } from "./middlewares/notFound.mw.js";
import { requestId } from "./middlewares/requestId.mw.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestId);

  app.use("/api/v1", apiRouter);

  app.use(notFound);
  app.use(globalErrorHandler);

  return app;
}
