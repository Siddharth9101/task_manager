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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Dashboard;
