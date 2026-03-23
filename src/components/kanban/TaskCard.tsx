
import React from 'react'
import type { Task } from "../../types/types";


const TaskCard = ({task}:{task:Task}) => {

  return (
     <div className="bg-white p-3 rounded shadow">
      <p className="text-sm font-medium">{task.title}</p>

      <div className="flex justify-between mt-2 text-xs">
        <span>{task.assignee}</span>
        <span>{task.priority}</span>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Due: {task.dueDate}
      </p>
    </div>
  )
}

export default TaskCard
