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
  assigned_to_id,
  creator_name,
  assigned_to_name,
  creator_id,
  updated_at,
}: DbTask): Task {
  return {
    id,
    title,
    description,
    dueDate: due_date,
    priority,
    status,
    creatorId: creator_id,
    assignedToId: assigned_to_id,
    creatorName: creator_name,
    assignedToName: assigned_to_name,
    createdAt: created_at,
    updatedAt: updated_at,
  };
}
