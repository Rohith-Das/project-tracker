import React from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import KanbanColumn from './KanbanColumn'


const KanbanBoard = () => {
    const tasks=useTaskStore((state)=>state.tasks)
  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    "in-review": tasks.filter((t) => t.status === "in-review"),
    done: tasks.filter((t) => t.status === "done"),
  };

    
  return (
     <div className="flex gap-4">
      {Object.entries(grouped).map(([status, tasks]) => (
        <KanbanColumn key={status} status={status} tasks={tasks} />
      ))}
    </div>
  )
}

export default KanbanBoard
