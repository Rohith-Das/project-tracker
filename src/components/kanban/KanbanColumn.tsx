import type { Task } from '../../types/types'
import TaskCard from './TaskCard'
import type { PointerEvent as ReactPointerEvent } from "react"

interface Props {
  status: string
  tasks: Task[]
  draggedTask: Task | null
  hovered: boolean
  innerRef: (el: HTMLDivElement | null) => void
  onPointerDownTask: (task: Task, e: ReactPointerEvent) => void
  setHoverIndex: (index: number | null) => void
  hoverIndex: number | null
}

const KanbanColumn = ({
  status,
  tasks,
  draggedTask,
  hovered,
  innerRef,
  onPointerDownTask,
  setHoverIndex,
  hoverIndex,
}: Props) => {
  return (
    <div
      ref={innerRef}
      className={`w-1/4 p-3 rounded transition-all duration-200 ${
        hovered
          ? "bg-blue-100 border-2 border-blue-400"
          : "bg-gray-100"
      }`}
    >
      {/* COLUMN HEADER */}
      <h2 className="font-bold mb-2 capitalize">
        {status} ({tasks.length})
      </h2>

      {/* TASK LIST */}
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {tasks.map((task, index) => {
          const isDragging = draggedTask?.id === task.id

          return (
            <div
              key={task.id}
              onPointerMove={(e) => {
                if (!draggedTask) return

                const rect = e.currentTarget.getBoundingClientRect()
                const middleY = rect.top + rect.height / 2

                if (e.clientY < middleY) {
                  setHoverIndex(index)
                } else {
                  setHoverIndex(index + 1)
                }
              }}
            >
              {/* 🔥 PLACEHOLDER ABOVE */}
              {hoverIndex === index && hovered && (
                <div className="h-[100px] bg-blue-100 border-2 border-dashed border-blue-300 rounded flex items-center justify-center text-xs text-blue-500">
                  Drop here
                </div>
              )}

              {/* 🧱 CARD / DRAG PLACEHOLDER */}
              {isDragging ? (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded p-3 h-[100px] flex items-center justify-center text-xs text-gray-400">
                  Moving...
                </div>
              ) : (
                <TaskCard
                  task={task}
                  onPointerDown={(e) => onPointerDownTask(task, e)}
                />
              )}

              {/* 🔥 PLACEHOLDER AT END */}
              {hoverIndex === tasks.length &&
                index === tasks.length - 1 &&
                hovered && (
                  <div className="h-[100px] bg-blue-100 border-2 border-dashed border-blue-300 rounded flex items-center justify-center text-xs text-blue-500">
                    Drop here
                  </div>
                )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KanbanColumn