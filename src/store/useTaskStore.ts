import { create } from "zustand";
import { generateTasks } from "../data/data";
import type { Task, Status } from "../types/types";

interface TaskState {
  tasks: Task[];
  // Move a task to a new status column
  moveTask: (taskId: string, newStatus: Status) => void;
  reorderTask: (taskId: string, newStatus: Status, newIndex: number) => void;

  // Update just the status of a task (used in list view dropdown)
  updateTaskStatus: (taskId: string, newStatus: Status) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: generateTasks(500),

  moveTask: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  },

  updateTaskStatus: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  },
  reorderTask: (taskId, newStatus, newIndex) => {
  set((state) => {
    const tasks = [...state.tasks];

    const oldIndex = tasks.findIndex((t) => t.id === taskId);
    if (oldIndex === -1) return state;

    const task = tasks[oldIndex];
    const oldStatus = task.status;

    // 👉 Remove task first
    tasks.splice(oldIndex, 1);

    // 👉 Update status
    task.status = newStatus;

    // 👉 Get updated column tasks AFTER removal
    const columnTasks = tasks.filter((t) => t.status === newStatus);

    // 🔥 FIX: adjust index if same column & moving down
    if (oldStatus === newStatus) {
      const oldColumnIndex = columnTasks.findIndex((t) => t.id === taskId);

      if (oldColumnIndex < newIndex) {
        newIndex -= 1;
      }
    }

    // 👉 Find insert position in global array
    let insertAt = tasks.length;

    if (columnTasks.length > 0) {
      if (newIndex >= columnTasks.length) {
        const last = columnTasks[columnTasks.length - 1];
        insertAt = tasks.findIndex((t) => t.id === last.id) + 1;
      } else {
        const target = columnTasks[newIndex];
        insertAt = tasks.findIndex((t) => t.id === target.id);
      }
    }

    // 👉 Insert task
    tasks.splice(insertAt, 0, task);

    return { tasks };
  });
}
}));