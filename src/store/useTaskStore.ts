import { create } from "zustand";
import { generateTasks } from "../data/data";
import type { Task } from "../types/types";

interface TaskState{
    tasks:Task[]
}

export const useTaskStore=create<TaskState>(()=>({
    tasks:generateTasks(500)
}))