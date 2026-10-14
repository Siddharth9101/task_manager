import { useNavigate } from "react-router";
import type { Task } from "../types/task";

type TaskCardProps = {
  task: Task;
};

const priorityStyles: Record<Task["priority"], string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

const statusStyles: Record<Task["status"], string> = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  REVIEW: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
};

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

export default function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/update/${task.id}`)}
      className="cursor-pointer flex h-full flex-col gap-4 rounded-xl border  p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 wrap-break-words text-lg font-semibold ">
          {task.title}
        </h2>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="wrap-break-words text-sm leading-6 ">
        {task.description || "No description provided."}
      </p>

      <div className="mt-auto space-y-4 border-t  pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm ">Status</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[task.status]}`}
          >
            {formatLabel(task.status)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm ">Due date</span>
          <span className="text-right text-sm font-medium ">
            {new Date(task.dueDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm ">Assigned to</span>
          <span className="wrap-break-words text-right text-sm font-medium ">
            {task.assignedToName}
          </span>
        </div>
      </div>
    </article>
  );
}
