# Task Manager

A modern, responsive Task Management application built with React, TypeScript, Vite, and Zustand.

## Features

- **Three Views**: Kanban Board, List View, Timeline View
- **Drag & Drop** reordering in Kanban
- **Virtual Scrolling** in List View (handles 500+ tasks smoothly)
- **500 sample tasks** with realistic data
- **Status updates**, priority, assignee, due dates


## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Zustand (state management)
- Tailwind CSS
- React Hot Toast
- Custom Virtual Scrolling (no external libraries)

## Getting Started

```bash
# Clone the repo
git clone <https://github.com/Rohith-Das/project-tracker.git>
cd task-manager

# Install dependencies
npm install

# Start development server
npm run dev



Virtual Scrolling in List View


Rendering 500+ table rows at once causes performance issues:

High memory usage
Slow rendering and scrolling
Laggy UI, especially on lower-end devices


How It Works
The implementation follows these core principles:

Fixed Row Height
Every row has a fixed height of 50px (ROW_HEIGHT = 50).
This allows accurate mathematical calculation of positions without measuring DOM elements.

Scroll Position Tracking
We listen to the onScroll event on the scrollable container.
scrollTop value is stored in React state.

Visible Range Calculation
Based on current scrollTop, container height, and row height, we calculate:TypeScriptstartIndex = Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
endIndex   = startIndex + visibleRows + (BUFFER * 2)
BUFFER = 5 rows (rendered above and below the viewport for smooth scrolling).

Dynamic Rendering
Only a small slice of tasks is rendered:TypeScriptconst visibleTasks = tasks.slice(startIndex, endIndex);

Spacer Technique (Padding)
A top spacer (<div>) pushes the visible rows down to the correct position.
A bottom spacer fills the remaining space so the scrollbar reflects the total height (totalRows * ROW_HEIGHT).
This creates the illusion that all 500 rows exist.

Sticky Header
The table header stays fixed at the top using position: sticky.


Key Benefits

Excellent Performance: Only ~15–30 rows exist in the DOM at any time, even with 500+ tasks.

Lightweight: No external dependencies.

Implementation Highlights

const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
const endIndex = Math.min(tasks.length, startIndex + visibleRowCount + BUFFER * 2);

// Total scrollable height
const totalHeight = tasks.length * ROW_HEIGHT;

// Only render visible portion
{visibleTasks.map(task => <tr key={task.id}>...</tr>)}
The top spacer height = startIndex * ROW_HEIGHT
The bottom spacer height = totalHeight - (endIndex * ROW_HEIGHT)


How to Verify It's Working

Open List View
Right-click → Inspect Element → Look at <tbody>
You should see only 15–30 <tr> rows instead of 500
Scroll while watching the Elements panel — rows appear/disappear dynamically
The scrollbar remains long and behaves naturally

This approach ensures the List View stays fast and responsive even as the number of tasks grows to thousands.



