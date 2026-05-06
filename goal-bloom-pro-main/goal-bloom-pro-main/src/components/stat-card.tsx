import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  accent?: "primary" | "accent" | "success" | "warning";
}

const accents: Record<string, string> = {
  primary: "from-primary/20 to-primary/0 text-primary",
  accent: "from-accent/20 to-accent/0 text-accent",
  success: "from-success/20 to-success/0 text-success",
  warning: "from-warning/20 to-warning/0 text-warning",
};

export function StatCard({ label, value, delta, icon: Icon, accent = "primary" }: Props) {
  return (
    <div className="glass hover-lift relative overflow-hidden rounded-2xl p-5">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accents[accent]} blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accents[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
