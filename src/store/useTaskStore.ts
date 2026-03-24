import { create } from "zustand";
import { generateTasks } from "../data/data";
import type { Task, Status } from "../types/types";

interface TaskState {
  tasks: Task[];
  // Move a task to a new status column
  moveTask: (taskId: string, newStatus: Status) => void;
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
}));