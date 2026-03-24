import { useTaskStore } from '../../store/useTaskStore'
import KanbanColumn from './KanbanColumn'
import { useMemo, useState, useEffect,useRef } from 'react'
import type { Status, Task } from '../../types/types'
import TaskCard from './TaskCard'
import toast from "react-hot-toast";

const formatStatus = (status: string) =>
  status
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const KanbanBoard = () => {
  const tasks = useTaskStore((state) => state.tasks)

  // 🔥 DRAG STATE
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null)

const columnRefs = useRef<Record<string, HTMLDivElement | null>>({})
const moveTask = useTaskStore((state) => state.moveTask)
  // 🧠 Track pointer movement globally
  useEffect(() => {
  if (!draggedTask) return;

  const handleMove = (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });

    let found: string | null = null;

    for (const status in columnRefs.current) {
      const el = columnRefs.current[status];
      if (!el) continue;

      const rect = el.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        found = status;
        break;
      }
    }

    setHoveredStatus(found);
  };

  const handleUp = () => {
    if (
      draggedTask &&
      hoveredStatus &&
      draggedTask.status !== hoveredStatus
    ) {
      moveTask(draggedTask.id, hoveredStatus as Status);
  toast.success(
  `Task updated: "${draggedTask.title}" → ${formatStatus(hoveredStatus)}`,
  {
    duration: 4000,
    icon: "✅",
  }
)
    }

    setDraggedTask(null);
    setHoveredStatus(null);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);

  return () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  };
}, [draggedTask, hoveredStatus, moveTask]);



  const grouped = useMemo(() => {
    return {
      todo: tasks.filter((t) => t.status === "todo"),
      "in-progress": tasks.filter((t) => t.status === "in-progress"),
      "in-review": tasks.filter((t) => t.status === "in-review"),
      done: tasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  return (
    <>
      <div className="flex gap-4">
        {Object.entries(grouped).map(([status, tasks]) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks}
            draggedTask={draggedTask} 
             hovered={hoveredStatus === status}
               innerRef={(el) => (columnRefs.current[status] = el)}
            onPointerDownTask={(task) => setDraggedTask(task)} // 👈 pass handler
          />
        ))}
      </div>

      {/*  FLOATING DRAG PREVIEW */}
      {draggedTask && (
        <div
          className="fixed pointer-events-none z-50 w-64"
          style={{
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
          }}
        >
          <div className="bg-white p-3 rounded shadow-xl scale-95">
      <TaskCard task={draggedTask} onPointerDown={() => {}} />
          </div>
        </div>
      )}
    </>
  )
}

export default KanbanBoard