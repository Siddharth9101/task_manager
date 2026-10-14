import TaskCard from "../components/TaskCard";
import useTasks from "../hooks/useTasks";

const Dashboard = () => {
  const { tasks, loading } = useTasks();
  if (loading) {
    return (
      <div className="h-screen text-5xl flex justify-center items-center text-blue-500">
        Loading...
      </div>
    );
  }
  return (
    <div className="size-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div className="col-span-full flex min-h-60 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300 bg-base-200 p-8 text-center">
          <span className="text-4xl" aria-hidden="true">
            📋
          </span>
          <h2 className="text-xl font-semibold text-base-content">
            No tasks found
          </h2>
          <p className="text-sm text-base-content/60">
            There are no tasks to display right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
