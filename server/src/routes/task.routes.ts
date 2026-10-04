import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as taskController from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.post("/", taskController.create);
taskRouter.get("/created", taskController.findAllCreated);
taskRouter.get("/assigned", taskController.findAllAssigned);
taskRouter
  .route("/:id")
  .patch(taskController.update)
  .delete(taskController.deleteTask);
