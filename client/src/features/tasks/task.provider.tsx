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

  return (
    <TaskContext.Provider
      value={{ tasks, users, setUsers, setTasks, loading, setLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
}
