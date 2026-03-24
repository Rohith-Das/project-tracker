import type { Task, Status } from "../../types/types";
import { memo } from "react";
import toast from "react-hot-toast";

type TaskRowProps = {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Status) => void;
};

const TaskRow = ({ task, onStatusChange }: TaskRowProps) => {
 
 const handleStatusChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const newStatus=e.target.value as Status;
    if(newStatus === task.status) return;
    const oldLabel=getStatusLabel(task.status);
    const newLabel=getStatusLabel(newStatus)

    onStatusChange(task.id,newStatus)
    toast.success(
      `Status changed from "${oldLabel}" → "${newLabel}"`,
      {
        duration: 2500,
        position: "top-center",
        icon: "✅",
        style: {
          background: "#10b981",
          color: "#fff",
          fontWeight: "500",
        },
      }
    );
 }

 // Helper function 
const getStatusLabel = (status: Status): string => {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "in-review":
      return "In Review";
    case "done":
      return "Done";
    default:
      return status;
  }
};
 
    return (
    <tr
      className="border-t hover:bg-gray-50 transition-colors"
      style={{ height: 52 }}      
    >
      <td className="p-3 text-sm font-medium">{task.title}</td>

      <td className="p-3 text-sm">
        <select
          value={task.status}
onChange={handleStatusChange}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-xs font-medium 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="in-review">In Review</option>
          <option value="done">Done</option>
        </select>
      </td>

      <td className="p-3 text-sm capitalize font-medium">{task.priority}</td>
      <td className="p-3 text-sm">{task.assignee}</td>
      <td className="p-3 text-sm text-gray-600">{task.dueDate}</td>
    </tr>
  );
};

export default memo(TaskRow);