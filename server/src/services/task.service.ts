import { Code } from "../constants/constants.js";
import { AppError } from "../errors/AppError.js";
import { logger } from "../lib/logger.js";
import * as taskRepo from "../repositories/task.repository.js";
import {
  CreateTaskInput,
  PaginatedTasks,
  QueryParams,
  Task,
  UpdateTaskInput,
} from "../types/task.js";

export async function create(
  data: CreateTaskInput,
  loggedInUserId: string,
): Promise<Task> {
  return await taskRepo.create(data, loggedInUserId);
}

export async function findAllCreated(
  loggedInUserId: string,
  queryParams: QueryParams,
): Promise<PaginatedTasks> {
  return taskRepo.findAll(loggedInUserId, "created", queryParams);
}

export async function findAllAssigned(
  loggedInUserId: string,
  queryParams: QueryParams,
): Promise<PaginatedTasks> {
  return taskRepo.findAll(loggedInUserId, "assigned", queryParams);
}

export async function findAllOverdue(loggedInUserId: string): Promise<Task[]> {
  return await taskRepo.findAllOverdue(loggedInUserId);
}

export async function update(
  data: UpdateTaskInput,
  updateTaskId: string,
  loggedInUserId: string,
): Promise<Task> {
  const taskExists = await taskRepo.findById(updateTaskId);
  if (!taskExists) {
    throw new AppError(404, "task not found", Code.NOT_FOUND);
  }

  if (taskExists.creatorId !== loggedInUserId) {
    logger.debug(`task.service.update, creatorId != loggin user`);
    throw new AppError(403, "unauthorized", Code.UNAUTHORIZED);
  }

  return await taskRepo.update(data, updateTaskId);
}

export async function deleteTask(
  taskId: string,
  loggedInUserId: string,
): Promise<void> {
  const taskExists = await taskRepo.findById(taskId);
  if (!taskExists) {
    throw new AppError(404, "task not found", Code.NOT_FOUND);
  }

  if (taskExists.creatorId !== loggedInUserId) {
    logger.debug(`task.service.deleteTask, creatorId != loggin user`);
    throw new AppError(403, "unauthorized", Code.UNAUTHORIZED);
  }

  await taskRepo.deleteTask(taskId);
}
