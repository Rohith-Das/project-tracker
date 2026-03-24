import { useTaskStore } from "../../store/useTaskStore";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import type { Task, Status, SortField, SortDirection } from "../../types/types";

import TableHeader from "./TableHeader";
import TaskRow from "./TaskRow";

const ROW_HEIGHT = 52;   // Recommended height
const BUFFER = 5;

const ListView = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);

  // Sorting State
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Measure container height
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => setContainerHeight(container.clientHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Sort tasks
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let valA: any, valB: any;

      switch (sortField) {
        case "title":
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        case "priority":
          const order = { critical: 4, high: 3, medium: 2, low: 1 };
          valA = order[a.priority];
          valB = order[b.priority];
          break;
        case "dueDate":
          valA = new Date(a.dueDate);
          valB = new Date(b.dueDate);
          break;
        default:
          return 0;
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [tasks, sortField, sortDirection]);

  // Virtual Scrolling Calculation
  const { startIndex, endIndex, totalHeight } = useMemo(() => {
    const totalRows = sortedTasks.length;
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const visibleRows = Math.ceil(containerHeight / ROW_HEIGHT) + BUFFER * 2;
    const end = Math.min(totalRows, start + visibleRows);

    return { startIndex: start, endIndex: end, totalHeight: totalRows * ROW_HEIGHT };
  }, [scrollTop, containerHeight, sortedTasks.length]);

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);
  const topOffset = startIndex * ROW_HEIGHT;

 const handleSort = useCallback((field: SortField) => {
  if (sortField === field) {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortDirection("asc");
  }
}, [sortField]);

  return (
    <div
      ref={containerRef}
      className="overflow-auto border border-gray-200 rounded-lg bg-white shadow-sm"
      style={{ height: "80vh" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ height: topOffset }} />

        <table className="w-full border-collapse">
          <TableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <tbody>
            {visibleTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onStatusChange={updateTaskStatus}
              />
            ))}
          </tbody>
        </table>

        <div style={{ height: totalHeight - endIndex * ROW_HEIGHT }} />
      </div>
    </div>
  );
};

export default ListView;