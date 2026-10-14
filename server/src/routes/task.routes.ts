import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as taskController from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.use(authenticate);

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - priority
 *               - status
 *               - assignedToId
 *             properties:
 *               title:
 *                 type: string
 *                 example: New task title
 *               description:
 *                 type: string
 *                 example: New task description
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-10T10:00:00Z"
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - MEDIUM
 *                   - HIGH
 *                   - URGENT
 *                 example: MEDIUM
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - REVIEW
 *                   - COMPLETED
 *                 example: TODO
 *               assignedToId:
 *                 type: string
 *                 format: uuid
 *                 example: "7a2e8c5d-1234-4567-89ab-123456789abc"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthenticated
 */
taskRouter.post("/", taskController.create);

/**
 * @openapi
 * /api/v1/tasks/created:
 *   get:
 *     summary: Get tasks created by the logged-in user
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tasks by title
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - URGENT
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - COMPLETED
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - createdAt
 *             - dueDate
 *           default: createdAt
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthenticated
 */
taskRouter.get("/created", taskController.findAllCreated);

/**
 * @openapi
 * /api/v1/tasks/assigned:
 *   get:
 *     summary: Get tasks assigned to the logged-in user
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tasks by title
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - URGENT
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - COMPLETED
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - createdAt
 *             - dueDate
 *           default: createdAt
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthenticated
 */
taskRouter.get("/assigned", taskController.findAllAssigned);

/**
 * @openapi
 * /api/v1/tasks/due:
 *   get:
 *     summary: Get overdue tasks assigned to the logged-in user
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Overdue tasks fetched successfully
 *       401:
 *         description: Unauthenticated
 */
taskRouter.get("/due", taskController.findAllOverdue);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4c34c5f1-3eef-44b5-bb6a-78cf7abcd123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New task title
 *               description:
 *                 type: string
 *                 example: New task description
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-10T10:00:00Z"
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - MEDIUM
 *                   - HIGH
 *                   - URGENT
 *                 example: HIGH
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - REVIEW
 *                   - COMPLETED
 *                 example: TODO
 *               assignedToId:
 *                 type: string
 *                 format: uuid
 *                 example: "7a2e8c5d-1234-4567-89ab-123456789abc"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 */
taskRouter.patch("/:id", taskController.update);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4c34c5f1-3eef-44b5-bb6a-78cf7abcd123"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 */
taskRouter.delete("/:id", taskController.deleteTask);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by Id
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4c34c5f1-3eef-44b5-bb6a-78cf7abcd123"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthenticated
 *       404:
 *         description: Task Not Found
 */
taskRouter.get("/:id", taskController.findById);
