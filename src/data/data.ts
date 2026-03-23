import type  { Task, Status, Priority } from "../types/types";

// 🔹 Data pools
const STATUSES: Status[] = ["todo", "in-progress", "in-review", "done"];

const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];

const ASSIGNEES = ["Rohit", "Aman", "Priya", "Neha", "Arjun", "Sara"];

const TITLES = [
  "Build Login Page",
  "Fix API Bug",
  "Design Dashboard",
  "Optimize Performance",
  "Add Payment Gateway",
  "Refactor Codebase",
  "Implement Auth",
  "Setup Database",
  "Write Unit Tests",
  "Improve UI UX",
];

// 🔹 Helpers
const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// 🔹 Generator
export const generateTasks = (count: number = 500): Task[] => {
  const tasks: Task[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const dueDateObj = randomDate(
      new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
      new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)
    );

    let startDateObj: Date | null = null;
    if (Math.random() > 0.3) {
      startDateObj = randomDate(
        new Date(dueDateObj.getTime() - 10 * 24 * 60 * 60 * 1000),
        dueDateObj
      );
    }

    const task: Task = {
      id: `${i + 1}`,
      title: getRandom(TITLES),
      status: getRandom(STATUSES),
      priority: getRandom(PRIORITIES),
      assignee: getRandom(ASSIGNEES),
      startDate: startDateObj
        ? startDateObj.toISOString().split("T")[0]
        : null,
      dueDate: dueDateObj.toISOString().split("T")[0],
    };

    tasks.push(task);
  }

  return tasks;
};