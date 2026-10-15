import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { rateLimit } from "../middlewares/rateLimit.middleware.js";

export const authRouter = Router();

authRouter.use(rateLimit);

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Invalid Request Body
 *       409:
 *         description: Email already registered
 */
authRouter.post("/register", authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Registration successful
 *         headers:
 *           Set-Cookie:
 *             description: Authentication cookie
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid Request Body
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", authController.login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout the user
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthenticated
 */
authRouter.post("/logout", authenticate, authController.logout);
