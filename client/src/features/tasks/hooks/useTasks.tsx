import { useCallback, useContext, useEffect } from "react";
import { TaskContext } from "../task.context";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";
import {
  createTask,
  fetchAssignedTasks,
  fetchCreatedTasks,
  fetchOverdueTasks,
  updateTaskById,
  deleteTaskById,
  fetchUsers,
  fetchById,
} from "../services/task.api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useContext must be used within TaskContextProvider");
  }
  const {
    tasks,
    users,
    loading,
    tasksType,
    sortBy,
    search,
    setTasks,
    setUsers,
    setLoading,
    setTasksType,
    setSortBy,
    setSearch,
  } = context;
  useEffect(() => {
    if (tasksType === "created") {
      getAllCreated();
    } else if (tasksType === "assigned") {
      getAllAssigned();
    } else {
      getAllOverdue();
    }

    getAllUsers();
  }, [tasksType, sortBy, search]);
  const navigate = useNavigate();
  async function create(data: CreateTaskInput) {
    setLoading(true);
    try {
      const result = await createTask(data);
      if (!result.success) {
        throw new Error();
      }
      navigate("/");
      toast.success("Task created!");
    } catch (err) {
      console.error(`useTasks, line - 38, err: ${err}`);
      toast.error("Failed to create task!");
    } finally {
      setLoading(false);
    }
  }

  async function update(data: UpdateTaskInput, id: string) {
    setLoading(true);
    try {
      const result = await updateTaskById(data, id);
      if (!result.success) {
        throw new Error();
      }
      navigate("/");
      toast.success("Updated task!");
    } catch (err) {
      console.error(`useTasks, line - 55, err: ${err}`);
      toast.success("Failed to update task!");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: string) {
    setLoading(true);
    try {
      const result = await deleteTaskById(id);
      if (!result.success) {
        throw new Error();
      }
      navigate("/");
      toast.success("Task deleted!");
    } catch (err) {
      console.error(`useTasks, line - 72, err: ${err}`);
      toast.error("Failed to delete task!");
    } finally {
      setLoading(false);
    }
  }

  async function getAllAssigned() {
    setLoading(true);
    try {
      const result = await fetchAssignedTasks(sortBy, search);
      if (!result.success) {
        throw new Error();
      }
      setTasks(result.data?.tasks ?? []);
    } catch (err) {
      console.error(`useTasks, line - 88, err: ${err}`);
      toast.error("Failed to fetch assigned tasks!");
    } finally {
      setLoading(false);
    }
  }

  async function getAllCreated() {
    setLoading(true);
    try {
      const result = await fetchCreatedTasks(sortBy, search);
      if (!result.success) {
        throw new Error();
      }
      setTasks(result.data?.tasks ?? []);
    } catch (err) {
      console.error(`useTasks, line - 104, err: ${err}`);
      toast.error("Failed to fetch created tasks!");
    } finally {
      setLoading(false);
    }
  }

  async function getAllOverdue() {
    setLoading(true);
    try {
      const result = await fetchOverdueTasks();
      if (!result.success) {
        throw new Error();
      }
      setTasks(result.data ?? []);
    } catch (err) {
      console.error(`useTasks, line - 121, err: ${err}`);
      toast.error("Failed to fetch overdue tasks!");
    } finally {
      setLoading(false);
    }
  }

  async function getAllUsers() {
    setLoading(true);
    try {
      const result = await fetchUsers();
      if (!result.success) {
        throw new Error();
      }
      setUsers(result.data ?? []);
    } catch (err) {
      console.error(`useTasks, line - 136, err: ${err}`);
      toast.error("Failed to fetch all users!");
    } finally {
      setLoading(false);
    }
  }

  const getById = useCallback(async (id: string): Promise<Task | undefined> => {
    setLoading(true);
    try {
      const result = await fetchById(id);
      if (!result.success) {
        throw new Error();
      }
      return result.data as Task;
    } catch (err) {
      console.error(`useTasks, line - 152, err: ${err}`);
      toast.error("Failed to fetch user by Id!");
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    tasks,
    loading,
    create,
    update,
    deleteTask,
    getAllAssigned,
    getAllCreated,
    getAllOverdue,
    users,
    getById,
    tasksType,
    setTasksType,
    sortBy,
    setSortBy,
    search,
    setSearch,
  };
};

export default useTasks;
