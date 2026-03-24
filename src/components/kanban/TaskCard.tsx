
import { memo } from 'react'
import type { Task } from "../../types/types";
import type { PointerEvent as ReactPointerEvent } from "react"

interface Props {
  task: Task
  onPointerDown: (e: ReactPointerEvent) => void
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


const TaskCard = memo(({task,onPointerDown}:Props) => {

  return (
<div
  onPointerDown={(e) => {
    e.preventDefault(); 
    onPointerDown(e);
  }}
  className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing transition-all duration-200"
>
      <p className="text-sm font-medium">{task.title}</p>

      <div className="flex justify-between mt-2 text-xs">
  <span>{task.assignee}</span>

  <div className="flex gap-1">
    <span className="bg-gray-200 px-2 py-0.5 rounded text-[10px] uppercase">
      {task.status}
    </span>

    <span
      className={`text-white px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}
    >
      {task.priority}
    </span>
  </div>
</div>

      <p className="text-xs text-gray-500 mt-1">
        Due: {task.dueDate}
      </p>
    </div>
  )
})

export default TaskCard
