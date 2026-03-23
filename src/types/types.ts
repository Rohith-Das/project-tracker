export type Status = "todo" | "in-progress" | "in-review" | "done";
export type Priority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  startDate: string | null;
  dueDate: string;
}

export interface OnlineUser {
  name: string;
  color: string;
  editing?: string;
}