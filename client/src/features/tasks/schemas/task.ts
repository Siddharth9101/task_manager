import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(100, "title should not exceed 100 characters"),
  description: z.string(),
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),
  assignedToId: z.uuid(),
});

export const updateTaskSchema = z.object({
  title: z.string().max(100, "title should not exceed 100 characters"),
  description: z.string(),
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),
});
