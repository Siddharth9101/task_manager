import TaskCard from "../../../components/TaskCard";

const Dashboard = () => {
  const tasks = Array.from({ length: 10 });
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tasks.map((_, idx) => (
          <TaskCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
