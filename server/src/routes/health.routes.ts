import { Router } from "express";
import * as healthController from "../controllers/health.controller.js";

export const healthRouter = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Check the health of server
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 */
healthRouter.get("/", healthController.health);
