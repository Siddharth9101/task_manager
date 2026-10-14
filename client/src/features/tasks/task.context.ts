import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Task, UserName } from "./types/task";

type TaskContextType = {
  tasks: Task[];
  users: UserName[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setUsers: Dispatch<SetStateAction<UserName[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);
