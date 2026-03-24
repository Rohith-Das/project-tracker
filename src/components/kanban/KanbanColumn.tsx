
import type { Task } from '../../types/types'
import TaskCard from './TaskCard'


const KanbanColumn = ({status,tasks}:{status:string,tasks:Task[]}) => {
  return (
      <div className="w-1/4 bg-gray-100 p-3 rounded">
      <h2 className="font-bold mb-2">
        {status} ({tasks.length})
      </h2>

      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
