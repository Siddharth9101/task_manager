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
