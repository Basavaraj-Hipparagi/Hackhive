import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ListTodo, Timer, BarChart3, Target, Sparkles, GraduationCap,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: ListTodo },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/goals", label: "Goals", icon: Target },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col gap-2 border-r border-sidebar-border bg-sidebar/60 backdrop-blur-xl p-4">
      <Link to="/" className="mb-4 flex items-center gap-2 px-2 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">FocusFlow <span className="text-gradient">AI</span></span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = path === to || path.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl glass p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Insight
        </div>
        <p className="mt-2 text-sm leading-relaxed">
          You're 23% more productive between <span className="font-semibold text-foreground">9–11 AM</span>. Schedule deep work then.
        </p>
      </div>
    </aside>
  );
}
