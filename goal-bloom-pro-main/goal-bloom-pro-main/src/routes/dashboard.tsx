import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gradient-mesh">
        <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  const initials = (user.user_metadata?.full_name || user.email || "U")
    .split(" ").map((s: string) => s[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="relative min-h-screen w-full gradient-mesh">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/50 bg-background/60 px-4 backdrop-blur-xl md:px-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search tasks, notes, subjects…"
                className="h-10 w-full rounded-xl border border-border/60 bg-card/50 pl-9 pr-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="glass hover-lift flex h-10 w-10 items-center justify-center rounded-full">
              <Bell className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => signOut().then(() => navigate({ to: "/login" }))}
              className="glass hover-lift flex h-10 w-10 items-center justify-center rounded-full"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <div className="h-10 w-10 rounded-full gradient-primary shadow-glow flex items-center justify-center text-sm font-semibold text-primary-foreground" title={user.email ?? ""}>
              {initials}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 animate-[fade-in_0.4s_ease-out]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
