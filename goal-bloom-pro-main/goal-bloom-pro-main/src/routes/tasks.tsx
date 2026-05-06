import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { tasks as initial, type Task, type Status } from "@/lib/mock-data";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({ meta: [{ title: "Tasks — FocusFlow AI" }] }),
});

const columns: { key: Status; label: string; accent: string }[] = [
  { key: "pending", label: "Pending", accent: "bg-muted-foreground" },
  { key: "in_progress", label: "In Progress", accent: "bg-accent" },
  { key: "completed", label: "Completed", accent: "bg-success" },
];

function TasksPage() {
  const [items, setItems] = useState<Task[]>(initial);
  const [q, setQ] = useState("");

  const move = (id: string, status: Status) =>
    setItems(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));

  const filtered = items.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">Organize, prioritize, and conquer.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="h-10 rounded-xl border border-border bg-card/50 pl-9 pr-3 text-sm outline-none focus:border-primary/60" />
          </div>
          <button className="glass hover-lift h-10 px-3 rounded-xl flex items-center gap-2 text-sm"><Filter className="h-4 w-4" /> Filter</button>
          <button className="h-10 px-4 rounded-xl gradient-primary text-primary-foreground shadow-glow flex items-center gap-2 text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" /> New Task</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => {
          const colTasks = filtered.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.accent}`} />
                  <h3 className="font-semibold text-sm">{col.label}</h3>
                  <span className="text-xs text-muted-foreground">({colTasks.length})</span>
                </div>
              </div>
              <div className="space-y-2">
                {colTasks.map(t => (
                  <div key={t.id} className="group rounded-xl border border-border/50 bg-card/60 p-3 hover-lift cursor-grab">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{t.title}</p>
                      <span className={`shrink-0 text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${
                        t.priority === "high" ? "bg-destructive/15 text-destructive" :
                        t.priority === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
                      }`}>{t.priority}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{t.subject}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] text-muted-foreground">{t.deadline}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        {columns.filter(c => c.key !== col.key).map(c => (
                          <button key={c.key} onClick={() => move(t.id, c.key)} className="text-[10px] px-2 py-0.5 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition">
                            {c.label.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
