import type z from "zod";
import type { createTaskSchema, updateTaskSchema } from "../schemas/task";

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

export type PaginatedTasks = {
  tasks: Task[];
  page: number;
  totalTasks: number;
  totalPages: number;
};

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export type UserName = {
  id: string;
  name: string;
};
