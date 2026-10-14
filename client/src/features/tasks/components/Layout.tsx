import { type ReactNode } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import useTasks from "../hooks/useTasks";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { tasksType, setTasksType, sortBy, setSortBy, search, setSearch } =
    useTasks();

  const headings: Record<string, string> = {
    created: "Created Tasks",
    assigned: "Assigned Tasks",
    overdue: "Overdue Tasks",
  };
  return (
    <div className="min-h-screen ">
      <nav className="border-b  ">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xl text-white font-bold tracking-tight ">
            TaskManager
          </span>

          <div className="space-x-2">
            <button
              type="button"
              onClick={() => navigate("/create")}
              className="rounded-lg border  px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border  px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Task toolbar */}
      <div className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            {headings[tasksType]}
          </h1>

          {/* Search */}
          <div className="w-full flex-1 md:mx-4">
            <input
              type="search"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            {/* Sort */}
            <select
              aria-label="Sort tasks by"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "createdAt" | "dueDate")
              }
              className="select select-bordered w-full sm:w-44"
            >
              <option value="createdAt">Sort: Newest first</option>
              <option value="dueDate">Sort: Expiring first</option>
            </select>

            {/* Task type */}
            <select
              aria-label="Select task type"
              value={tasksType}
              onChange={(e) =>
                setTasksType(
                  e.target.value as "created" | "assigned" | "overdue",
                )
              }
              className="select select-bordered w-full sm:w-48"
            >
              <option value="created">Created Tasks</option>
              <option value="assigned">Assigned Tasks</option>
              <option value="overdue">Overdue Tasks</option>
            </select>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
