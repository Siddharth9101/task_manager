import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.use(authenticate);

/**
 * @openapi
 * /api/v1/user/me:
 *   get:
 *     summary: Get the logged-in user's info
 *     tags:
 *       - Profile
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User's info fetched successfully
 *       401:
 *         description: Unauthenticated
 */
userRouter.get("/me", userController.me);

/**
 * @openapi
 * /api/v1/user:
 *   patch:
 *     summary: Update logged-in user's info
 *     tags:
 *       - Profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: User's info updated successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthenticated
 */
userRouter.patch("/", userController.update);

/**
 * @openapi
 * /api/v1/user/password:
 *   patch:
 *     summary: Update logged-in user's password
 *     tags:
 *       - Profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: StringPassword@123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: StringPassword@123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthenticated
 */
userRouter.patch("/password", userController.updatePassword);

userRouter.get("/", userController.getAllUsers);
