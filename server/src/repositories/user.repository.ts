import { pool } from "../lib/db.js";
import { mapDbUserToUser, mapDbUserToUserWithPassword } from "../lib/utils.js";
import {
  RegisterUserInput,
  DbUser,
  DbUserWithPassword,
  User,
  UserWithPassword,
  UpdateUserInput,
} from "../types/user.js";

export async function findByEmail(email: string): Promise<User | null> {
  const result = await pool.query<DbUser>(
    `
            SELECT id, name, email, created_at, updated_at
            FROM users
            WHERE email = $1
        `,
    [email],
  );

  return mapDbUserToUser(result.rows[0]) ?? null;
}

export async function findById(id: string): Promise<User | null> {
  const result = await pool.query<DbUser>(
    `
      SELECT id, name, email, created_at, updated_at
      FROM users
      WHERE id = $1
    `,
    [id],
  );
  return mapDbUserToUser(result.rows[0]) ?? null;
}

export async function findByIdWithPassword(
  id: string,
): Promise<UserWithPassword | null> {
  const result = await pool.query<DbUserWithPassword>(
    `
      SELECT id, name, email, password_hash, created_at, updated_at
      FROM users
      WHERE id = $1
    `,
    [id],
  );
  return mapDbUserToUserWithPassword(result.rows[0]) ?? null;
}

export async function findByEmailWithPassword(
  email: string,
): Promise<UserWithPassword | null> {
  const result = await pool.query<DbUserWithPassword>(
    `
            SELECT id, name, email, password_hash, created_at, updated_at
            FROM users
            WHERE email = $1
        `,
    [email],
  );

  return mapDbUserToUserWithPassword(result.rows[0]) ?? null;
}

export async function create(data: RegisterUserInput): Promise<User> {
  const result = await pool.query<DbUser>(
    `
            INSERT INTO users (name, email, password_hash)
            VALUES ($1,$2,$3)
            RETURNING id, name, email, created_at, updated_at
        `,
    [data.name, data.email, data.password],
  );

  return mapDbUserToUser(result.rows[0]);
}

export async function update(
  data: UpdateUserInput,
  userId: string,
): Promise<User> {
  const result = await pool.query<DbUser>(
    `
      UPDATE users
      SET name = $1
      WHERE id = $2
    `,
    [data.name, userId],
  );

  return mapDbUserToUser(result.rows[0]);
}

export async function updatePassword(
  password_hash: string,
  userId: string,
): Promise<void> {
  await pool.query(
    `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
    `,
    [password_hash, userId],
  );
}
