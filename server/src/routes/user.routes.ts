import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/me", userController.me);
userRouter.patch("/", userController.update);
userRouter.patch("/password", userController.updatePassword);
