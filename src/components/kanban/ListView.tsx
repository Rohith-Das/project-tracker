import { useTaskStore } from "../../store/useTaskStore";

const ListView = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="overflow-auto max-h-[80vh]">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.assignee}</td>
              <td>{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;