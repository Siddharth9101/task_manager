import z from "zod";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.js";

export type DbTask = {
  id: string;
  title: string;
  description: string;
  due_date: Date;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETE";
  creator_id: string;
  assigned_to_it: string;
  created_at: Date;
  updated_at: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETE";
  creatorId: string;
  assignedToIt: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
