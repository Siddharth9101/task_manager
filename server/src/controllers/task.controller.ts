import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse.js";
import { PaginatedTasks, Task } from "../types/task.js";
import {
  createTaskSchema,
  taskParams,
  taskQueryParams,
  updateTaskSchema,
} from "../schemas/task.js";
import * as taskService from "../services/task.service.js";
import { AppError } from "../errors/AppError.js";
import { Code } from "../constants/constants.js";

export async function create(
  req: Request,
  res: Response<ApiResponse<Task>>,
  next: NextFunction,
) {
  try {
    const parsedBody = createTaskSchema.parse(req.body);
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    const task = await taskService.create(parsedBody, userId);

    res.status(201).json({
      success: true,
      message: "task created successfully",
      data: task,
    });
  } catch (err) {
    next(err);
  }
}

export async function findAllCreated(
  req: Request,
  res: Response<ApiResponse<PaginatedTasks>>,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    const parsedQueryParams = taskQueryParams.parse(req.query);

    const tasks = await taskService.findAllCreated(userId, parsedQueryParams);

    res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}

export async function findAllAssigned(
  req: Request,
  res: Response<ApiResponse<PaginatedTasks>>,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }

    const parsedQueryParams = taskQueryParams.parse(req.query);

    const tasks = await taskService.findAllAssigned(userId, parsedQueryParams);

    res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}

export async function findAllOverdue(
  req: Request,
  res: Response<ApiResponse<Task[]>>,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }

    const tasks = await taskService.findAllOverdue(userId);

    res.status(200).json({
      success: true,
      message: "overdue tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response<ApiResponse<Task>>,
  next: NextFunction,
) {
  try {
    const parsedBody = updateTaskSchema.parse(req.body);
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    const parsedParams = taskParams.parse(req.params);
    const task = await taskService.update(parsedBody, parsedParams.id, userId);

    res.status(200).json({
      success: true,
      message: "task updated successfully",
      data: task,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, "unauthenticated", Code.UNAUTHENTICATED);
    }
    const parsedParams = taskParams.parse(req.params);
    await taskService.deleteTask(parsedParams.id, userId);
    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function findById(
  req: Request,
  res: Response<ApiResponse<Task>>,
  next: NextFunction,
) {
  try {
    const parsedParams = taskParams.parse(req.params);
    const task = await taskService.findById(parsedParams.id);
    res.status(200).json({
      success: true,
      message: "task fetched successfully",
      data: task,
    });
  } catch (err) {
    next(err);
  }
}
