import axios from "axios";
import type { ApiResponse } from "../../../types/apiResponse";
import type {
  CreateTaskInput,
  PaginatedTasks,
  Task,
  UpdateTaskInput,
  UserName,
} from "../types/task";

const api = axios.create({
  baseURL: `/api/v1`,
  withCredentials: true,
});

export async function createTask(
  data: CreateTaskInput,
): Promise<ApiResponse<Task>> {
  const result = await api.post<ApiResponse<Task>>("/tasks", data);
  return result.data;
}

export async function fetchAssignedTasks(
  sortBy: string,
  search: string | undefined,
): Promise<ApiResponse<PaginatedTasks>> {
  const result = await api.get<ApiResponse<PaginatedTasks>>(
    `/tasks/assigned?sortBy=${sortBy}&sort=${sortBy === "createdAt" ? "desc" : "asc"}&search=${search}`,
  );
  return result.data;
}

export async function fetchCreatedTasks(
  sortBy: string,
  search: string | undefined,
): Promise<ApiResponse<PaginatedTasks>> {
  const result = await api.get<ApiResponse<PaginatedTasks>>(
    `/tasks/created?sortBy=${sortBy}&sort=${sortBy === "createdAt" ? "desc" : "asc"}&search=${search}`,
  );
  return result.data;
}

export async function fetchOverdueTasks(): Promise<ApiResponse<Task[]>> {
  const result = await api.get<ApiResponse<Task[]>>("/tasks/created");
  return result.data;
}

export async function updateTaskById(
  data: UpdateTaskInput,
  id: string,
): Promise<ApiResponse<Task>> {
  const result = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, data);
  return result.data;
}

export async function deleteTaskById(id: string): Promise<ApiResponse<null>> {
  const result = await api.delete<ApiResponse<null>>(`/tasks/${id}`);
  return result.data;
}

export async function fetchUsers(): Promise<ApiResponse<UserName[]>> {
  const result = await api.get<ApiResponse<UserName[]>>("/user");
  return result.data;
}
export async function fetchById(id: string): Promise<ApiResponse<Task>> {
  const result = await api.get(`/tasks/${id}`);
  return result.data;
}
