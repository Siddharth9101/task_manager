import z from "zod";
import {
  createTaskSchema,
  taskParams,
  taskQueryParams,
  updateTaskSchema,
} from "../schemas/task.js";

export type DbTask = {
  id: string;
  title: string;
  description: string;
  due_date: Date;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  creator_id: string;
  assigned_to_id: string;
  creator_name: string;
  assigned_to_name: string;
  created_at: Date;
  updated_at: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  creatorId: string;
  assignedToId: string;
  creatorName: string;
  assignedToName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type QueryParams = z.infer<typeof taskQueryParams>;
export type TaskParams = z.infer<typeof taskParams>;

export type PaginatedTasks = {
  tasks: Task[];
  page: number;
  totalTasks: number;
  totalPages: number;
};
