import React, { useState } from "react";
import type { Task, UserName } from "./types/task";
import { TaskContext } from "./task.context";

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserName[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate">("createdAt");
  const [tasksType, setTasksType] = useState<
    "created" | "assigned" | "overdue"
  >("created");
  const [search, setSearch] = useState<string>("");

  return (
    <TaskContext.Provider
      value={{
        tasks,
        users,
        setUsers,
        setTasks,
        loading,
        search,
        setLoading,
        sortBy,
        setSortBy,
        tasksType,
        setTasksType,
        setSearch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
