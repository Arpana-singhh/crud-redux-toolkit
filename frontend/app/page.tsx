"use client";

import { useState } from "react";

type Task = {
  taskId: string;
  taskName: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { taskId: "1", taskName: "Buy groceries", completed: false },
  { taskId: "2", taskName: "Finish redux toolkit setup", completed: true },
  { taskId: "3", taskName: "Design the to-do card UI", completed: false },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskName, setTaskName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleAdd = () => {
    if (!taskName.trim()) return;
    setTasks((prev) => [
      ...prev,
      { taskId: crypto.randomUUID(), taskName, completed: false },
    ]);
    setTaskName("");
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.taskId);
    setEditingName(task.taskName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = (taskId: string) => {
    if (!editingName.trim()) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === taskId ? { ...t, taskName: editingName } : t
      )
    );
    cancelEdit();
  };

  const toggleCompleted = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <main className="flex flex-1 items-start justify-center bg-pink-50 p-6 dark:bg-pink-950/20 sm:p-10">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-background shadow-lg shadow-black/5 dark:border-white/10">
        <div className="border-b border-black/10 px-6 py-5 dark:border-white/10">
          <h1 className="text-xl font-semibold">To-Do List</h1>
        </div>

        <div className="flex gap-2 px-6 py-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:border-white/15 dark:focus:border-white/40"
          />
          <button
            onClick={handleAdd}
            className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Add
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-3 pb-4">
          {tasks.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-foreground/50">
              No tasks yet. Add one above.
            </li>
          )}

          {tasks.map((task) => (
            <li
              key={task.taskId}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
            >
              {editingId === task.taskId ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(task.taskId);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                    className="flex-1 rounded-md border border-black/20 bg-transparent px-2 py-1 text-sm outline-none focus:border-black/40 dark:border-white/20 dark:focus:border-white/40"
                  />
                  <button
                    onClick={() => saveEdit(task.taskId)}
                    aria-label="Save task"
                    className="text-foreground/60 hover:text-green-600"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={cancelEdit}
                    aria-label="Cancel edit"
                    className="text-foreground/60 hover:text-red-600"
                  >
                    <CloseIcon />
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.taskId)}
                    className="h-4 w-4 shrink-0 accent-pink-600"
                  />
                  <span
                    className={`flex-1 truncate text-sm ${
                      task.completed
                        ? "text-foreground/40 line-through"
                        : "text-foreground"
                    }`}
                  >
                    {task.taskName}
                  </span>
                  <button
                    onClick={() => startEdit(task)}
                    aria-label="Edit task"
                    className="text-foreground/40 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(task.taskId)}
                    aria-label="Delete task"
                    className="text-foreground/40 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                  >
                    <TrashIcon />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
