import type { Task } from '../../types/types'
import TaskCard from './TaskCard'

const KanbanColumn = ({
  status,
  tasks,
  draggedTask,
  hovered,
  innerRef,
  onPointerDownTask
}: {
  status: string
  tasks: Task[]
  draggedTask: Task | null
  hovered: boolean
  innerRef: (el: HTMLDivElement | null) => void
  onPointerDownTask: (task: Task) => void
}) => {
  return (
  <div
  ref={innerRef}
  className={`w-1/4 p-3 rounded transition-all duration-200 ${
    hovered
      ? "bg-blue-100 border-2 border-blue-400"
      : "bg-gray-100"
  }`}
>
      <h2 className="font-bold mb-2">
        {status} ({tasks.length})
      </h2>

     <div className="space-y-2 max-h-[70vh] overflow-y-auto">
  {tasks.map((task) => {
    // 👇 If this is the dragged task → show placeholder
    if (draggedTask?.id === task.id) {
      return (
        <div
          key={task.id}
          className="bg-white border-2 border-dashed border-gray-300 rounded p-3 h-[100px] flex items-center justify-center text-xs text-gray-400"
        >
          Moving...
        </div>
      )
    }

    return (
      <TaskCard
        key={task.id}
        task={task}
        onPointerDown={() => onPointerDownTask(task)}
      />
    )
  })}
</div>
    </div>
  )
}

export default KanbanColumn