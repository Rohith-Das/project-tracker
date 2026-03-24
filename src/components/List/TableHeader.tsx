import type { SortField, SortDirection } from "../../types/types";

type TableHeaderProps = {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
};

const TableHeader = ({ sortField, sortDirection, onSort }: TableHeaderProps) => {
  const handleSort = (field: SortField) => {
    onSort(field);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const isSorted = (field: SortField) => sortField === field;

  return (
    <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-white z-20 shadow-md border-b border-gray-200">
      <tr className="divide-x divide-gray-100">
        {/* Title */}
        <th
          className="p-4 text-left font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 transition-all select-none group"
          onClick={() => handleSort("title")}
        >
          <div className="flex items-center gap-2">
            Title
            <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
              {getSortIcon("title")}
            </span>
          </div>
        </th>

        {/* Status */}
        <th className="p-4 text-left font-semibold text-gray-700 w-32 bg-gray-50">
          Status
        </th>

        {/* Priority - Beautiful Colored Header */}
        <th
          className="p-4 text-left font-semibold cursor-pointer hover:bg-orange-50 transition-all select-none group"
          onClick={() => handleSort("priority")}
          style={{ color: "#f97316" }} // Orange text
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            Priority
            <span
              className={`ml-auto text-lg transition-all ${
                isSorted("priority")
                  ? "text-orange-600 font-bold scale-110"
                  : "text-orange-400 group-hover:text-orange-500"
              }`}
            >
              {getSortIcon("priority")}
            </span>
          </div>
        </th>

        {/* Assignee */}
        <th className="p-4 text-left font-semibold text-gray-700 w-40">
          Assignee
        </th>

        {/* Due Date - Beautiful Colored Header */}
        <th
          className="p-4 text-left font-semibold cursor-pointer hover:bg-red-50 transition-all select-none group"
          onClick={() => handleSort("dueDate")}
          style={{ color: "#ef4444" }} // Red text
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">⏰</span>
            Due Date
            <span
              className={`ml-auto text-lg transition-all ${
                isSorted("dueDate")
                  ? "text-red-600 font-bold scale-110"
                  : "text-red-400 group-hover:text-red-500"
              }`}
            >
              {getSortIcon("dueDate")}
            </span>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;