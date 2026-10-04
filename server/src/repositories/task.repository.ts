import { pool } from "../lib/db.js";
import { mapDbTaskToTask } from "../lib/utils.js";
import {
  CreateTaskInput,
  DbTask,
  Task,
  UpdateTaskInput,
} from "../types/task.js";

const fieldMap = {
  title: "title",
  description: "description",
  dueDate: "due_date",
  priority: "priority",
  status: "status",
} as const;

export async function create(
  {
    title,
    description,
    dueDate,
    priority,
    status,
    assignedToId,
  }: CreateTaskInput,
  creatorId: string,
): Promise<Task> {
  const result = await pool.query<DbTask>(
    `
            INSERT INTO tasks (title, description, due_date, priority, status, creator_id, assigned_to_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `,
    [title, description, dueDate, priority, status, creatorId, assignedToId],
  );
  return mapDbTaskToTask(result.rows[0]);
}

export async function findAllCreated(userId: string): Promise<Task[]> {
  const result = await pool.query<DbTask>(
    `
            SELECT * FROM tasks WHERE creator_id = $1
        `,
    [userId],
  );

  return result.rows.map(mapDbTaskToTask);
}

export async function findAllAssigned(userId: string): Promise<Task[]> {
  const result = await pool.query<DbTask>(
    `
            SELECT * FROM tasks WHERE assigned_to_id = $1
        `,
    [userId],
  );

  return result.rows.map(mapDbTaskToTask);
}

export async function findById(id: string): Promise<Task | null> {
  const result = await pool.query<DbTask>(
    `
            SELECT * FROM tasks WHERE id = $1
        `,
    [id],
  );

  return mapDbTaskToTask(result.rows[0]) ?? null;
}

export async function update(data: UpdateTaskInput, id: string): Promise<Task> {
  const fields = Object.keys(data) as Array<keyof UpdateTaskInput>;
  const values: unknown[] = [];

  const setClause = fields
    .map((field, idx) => {
      values.push(data[field]);
      return `${fieldMap[field]} = $${idx + 1}`;
    })
    .join(", ");

  values.push(id);

  const query = `
    UPDATE tasks
    SET ${setClause}
    WHERE id = $${values.length}
    RETURNING *
  `;

  const result = await pool.query<DbTask>(query, values);

  return mapDbTaskToTask(result.rows[0]);
}

export async function deleteTask(id: string): Promise<void> {
  await pool.query(
    `
      DELETE FROM tasks WHERE id = $1
    `,
    [id],
  );
}
