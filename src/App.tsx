import { useState } from "react";
import KanbanBoard  from "./components/kanban/KanbanBoard";
import ListView     from "./components/kanban/ListView";
import TimelineView from "./components/kanban/TimelineView";

type View = "kanban" | "list" | "timeline";

const VIEWS: { key: View; label: string; icon: string }[] = [
  { key: "kanban",   label: "Kanban",   icon: "⊞" },
  { key: "list",     label: "List",     icon: "☰" },
  { key: "timeline", label: "Timeline", icon: "📅" },
];

function App() {
  const [view, setView] = useState<View>("kanban");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-sm text-gray-500">500 tasks · drag cards to reorder</p>
        </div>

        {/* View switcher tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
          {VIEWS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                rounded-md transition-all duration-150
                ${view === key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Active view — all three are kept mounted to preserve state instantly */}
      {/* We use display:none to hide inactive views without unmounting */}
      <div className={view === "kanban" ? "" : "hidden"}>
        <KanbanBoard />
      </div>
      <div className={view === "list" ? "h-full" : "hidden"}>
        <ListView />
      </div>
      <div className={view === "timeline" ? "" : "hidden"}>
        <TimelineView />
      </div>
    </div>
  );
}

export default App;