import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(100, "title should not exceed 100 characters"),
  description: z.string(),
  dueDate: z.date(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETE"]),
  assignedToId: z.uuid(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .max(100, "title should not exceed 100 characters")
    .optional(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETE"]).optional(),
});

export const taskParams = z.object({
  id: z.uuid(),
});

export const taskQueryParams = z.object({
  search: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETE"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.enum(["createdAt", "dueDate"]).optional(),
});
