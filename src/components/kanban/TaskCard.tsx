
import { memo } from 'react'
import type { Task } from "../../types/types";

interface Props {
  task: Task;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};


const TaskCard = memo(({task}:Props) => {

  return (
     <div className="bg-white p-3 rounded shadow">
      <p className="text-sm font-medium">{task.title}</p>

      <div className="flex justify-between mt-2 text-xs">
        <span>{task.assignee}</span>
           <span
          className={`text-white px-2 py-0.5 rounded ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Due: {task.dueDate}
      </p>
    </div>
  )
})

export default TaskCard
