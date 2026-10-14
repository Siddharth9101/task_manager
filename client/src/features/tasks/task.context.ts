import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Task, UserName } from "./types/task";

type TaskContextType = {
  tasks: Task[];
  users: UserName[];
  sortBy: "createdAt" | "dueDate";
  tasksType: "created" | "assigned" | "overdue";
  search: string;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setUsers: Dispatch<SetStateAction<UserName[]>>;
  setSortBy: Dispatch<SetStateAction<"createdAt" | "dueDate">>;
  setTasksType: Dispatch<SetStateAction<"created" | "assigned" | "overdue">>;
  setSearch: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);
