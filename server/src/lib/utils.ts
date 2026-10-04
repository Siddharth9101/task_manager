import { DbTask, Task } from "../types/task.js";
import {
  DbUser,
  DbUserWithPassword,
  User,
  UserWithPassword,
} from "../types/user.js";

export function mapDbUserToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    createdAt: dbUser.created_at.toLocaleDateString(),
    updatedAt: dbUser.updated_at.toLocaleDateString(),
  };
}

export function mapDbUserToUserWithPassword(
  dbUser: DbUserWithPassword,
): UserWithPassword {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    passwordHash: dbUser.password_hash,
    createdAt: dbUser.created_at.toLocaleDateString(),
    updatedAt: dbUser.updated_at.toLocaleDateString(),
  };
}

export function mapDbTaskToTask({
  id,
  title,
  description,
  due_date,
  priority,
  status,
  created_at,
  assigned_to_it,
  creator_id,
  updated_at,
}: DbTask): Task {
  return {
    id,
    title,
    description,
    dueDate: due_date.toLocaleDateString(),
    priority,
    status,
    creatorId: creator_id,
    assignedToIt: assigned_to_it,
    createdAt: created_at.toLocaleDateString(),
    updatedAt: updated_at.toLocaleDateString(),
  };
}
