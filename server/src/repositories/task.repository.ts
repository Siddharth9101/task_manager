import { pool } from "../lib/db.js";
import { mapDbTaskToTask } from "../lib/utils.js";
import {
  CreateTaskInput,
  DbTask,
  PaginatedTasks,
  QueryParams,
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

export async function findAll(
  userId: string,
  type: "created" | "assigned",
  { search, priority, status, page, limit, sort, sortBy }: QueryParams,
): Promise<PaginatedTasks> {
  let whereClause: string[] = [];
  const values: unknown[] = [];

  if (type === "created") {
    // creator_id
    values.push(userId);
    whereClause.push(`creator_id = $${values.length}`);
  } else {
    // assigned_to_id
    values.push(userId);
    whereClause.push(`assigned_to_id = $${values.length}`);
  }

  // search
  values.push(`%${search}%`);
  whereClause.push(`title ILIKE $${values.length}`);

  // priority
  values.push(priority);
  whereClause.push(`priority = $${values.length}`);

  // status
  values.push(status);
  whereClause.push(`status = $${values.length}`);

  const where = whereClause.join(" AND ");

  const dbPage = Math.max(Number(page ?? 1), 1);
  const dbLimit = Math.min(Math.max(Number(limit ?? 10), 1), 100);

  const offset = dbLimit * (dbPage - 1);

  const dbSort = sort === "asc" ? "ASC" : "DESC";

  const sortColumnMap = {
    createdAt: "created_at",
    dueDate: "due_date",
  };

  const dbSortBy = sortColumnMap[sortBy ?? "createdAt"];

  const baseQuery = `
    FROM tasks
    WHERE ${where}
  `;

  const [result, countResult] = await Promise.all([
    pool.query<DbTask>(
      `
        SELECT *
        ${baseQuery}
        ORDER BY ${dbSortBy} ${dbSort}
        OFFSET $${values.length + 1}
        LIMIT $${values.length + 2}
      `,
      [...values, offset, dbLimit],
    ),
    pool.query<{ total_tasks: string }>(
      `
      SELECT COUNT(*) AS total_tasks
      ${baseQuery}    
    `,
      [values],
    ),
  ]);

  const totalTasks = Number(countResult.rows[0].total_tasks);

  return {
    tasks: result.rows.map(mapDbTaskToTask),
    page: dbPage,
    totalTasks,
    totalPages: Math.ceil(totalTasks / dbLimit),
  };
}

export async function findAllOverdue(userId: string): Promise<Task[]> {
  const result = await pool.query<DbTask>(
    `
            SELECT * FROM tasks WHERE assigned_to_id = $1 AND due_date < NOW() AND status != 'COMPLETED' ORDER BY created_at DESC
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

  let setClause = fields
    .map((field, idx) => {
      values.push(data[field]);
      return `${fieldMap[field]} = $${idx + 1}`;
    })
    .join(", ");

  setClause += ", updated_at = NOW()";

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
