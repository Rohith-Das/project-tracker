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
export interface DragState {
  isDragging: boolean;
  draggedTask: Task | null;
  startColumn: Status | null;
  sourceIndex: number;
  placeholderHeight: number;
}

export type SortField = "title" | "priority" | "dueDate";
export type SortDirection = "asc" | "desc";