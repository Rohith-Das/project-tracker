import { useTaskStore } from "../../store/useTaskStore";

const TimelineView = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {tasks.slice(0, 20).map((task) => (
          <div key={task.id} className="border-b p-2">
            <p className="text-sm">{task.title}</p>
            <div className="bg-blue-400 h-2 mt-1 w-40"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;