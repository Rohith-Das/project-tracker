import type { Task, Status, Priority } from "../types/types";

const STATUSES: Status[] = ["todo", "in-progress", "in-review", "done"];
const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];
const ASSIGNEES = ["Rohit", "Aman", "Priya", "Neha", "Arjun", "Sara"];
const TITLES = [
  "Build Login Page", "Fix API Bug", "Design Dashboard",
  "Optimize Performance", "Add Payment Gateway", "Refactor Codebase",
  "Implement Auth", "Setup Database", "Write Unit Tests", "Improve UI UX",
  "Create API Docs", "Deploy to Staging", "Fix Mobile Layout",
  "Add Dark Mode", "Setup CI/CD", "Review Pull Requests",
  "Update Dependencies", "Fix Memory Leak", "Add Search Feature",
  "Write E2E Tests",
];

// Pick a random item from an array
const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// Generate a random date between two dates
const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const generateTasks = (count: number = 500): Task[] => {
  const tasks: Task[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    // Due date: somewhere in the past 10 days to next 20 days
    const dueDate = randomDate(
      new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
      new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)
    );

    // 70% chance of having a start date (before due date)
    let startDate: string | null = null;
    if (Math.random() > 0.3) {
      const start = randomDate(
        new Date(dueDate.getTime() - 10 * 24 * 60 * 60 * 1000),
        dueDate
      );
      startDate = start.toISOString().split("T")[0];
    }

    tasks.push({
      id: `task-${i + 1}`,
      title: getRandom(TITLES),
      status: getRandom(STATUSES),
      priority: getRandom(PRIORITIES),
      assignee: getRandom(ASSIGNEES),
      startDate,
      dueDate: dueDate.toISOString().split("T")[0],
    });
  }

  return tasks;
};