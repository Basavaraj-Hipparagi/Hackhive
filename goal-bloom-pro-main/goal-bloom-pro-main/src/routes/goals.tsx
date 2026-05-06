import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trophy, Target, Flame, Star } from "lucide-react";
import { goals } from "@/lib/mock-data";

export const Route = createFileRoute("/goals")({
  component: GoalsPage,
  head: () => ({ meta: [{ title: "Goals — FocusFlow AI" }] }),
});

const badges = [
  { icon: Flame, label: "14-day Streak", color: "from-orange-500/30 to-red-500/10" },
  { icon: Trophy, label: "Top 5%", color: "from-yellow-500/30 to-amber-500/10" },
  { icon: Star, label: "Goal Crusher", color: "from-violet-500/30 to-purple-500/10" },
  { icon: Target, label: "Sharpshooter", color: "from-cyan-500/30 to-blue-500/10" },
];

function GoalsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-sm text-muted-foreground">Aim high. Track everything.</p>
        </div>
        <button className="h-10 px-4 rounded-xl gradient-primary text-primary-foreground shadow-glow flex items-center gap-2 text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" /> New Goal</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map(b => (
          <div key={b.label} className={`glass hover-lift rounded-2xl p-5 flex flex-col items-center text-center bg-gradient-to-br ${b.color}`}>
            <b.icon className="h-8 w-8 mb-2" />
            <p className="text-xs font-semibold">{b.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(g => (
          <div key={g.id} className="glass hover-lift rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{g.type}</span>
                <h3 className="mt-2 font-semibold">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Due {g.due}</p>
              </div>
              <div className="text-2xl font-bold text-gradient">{g.progress}%</div>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gradient-neon transition-all duration-1000" style={{ width: `${g.progress}%` }} />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>{g.progress < 100 ? `${100 - g.progress}% to go` : "Completed!"}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" /> +{Math.round(g.progress / 5)} XP</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Trophy className="h-4 w-4 text-warning" /> Leaderboard</h3>
        <div className="space-y-2">
          {[
            { name: "Maya R.", xp: 4820, you: false },
            { name: "Ravi K.", xp: 4380, you: false },
            { name: "You", xp: 4120, you: true },
            { name: "Lin Z.", xp: 3990, you: false },
            { name: "Sam J.", xp: 3760, you: false },
          ].map((p, i) => (
            <div key={p.name} className={`flex items-center gap-3 rounded-xl p-3 ${p.you ? "gradient-primary text-primary-foreground shadow-glow" : "bg-card/50 border border-border/50"}`}>
              <span className="text-sm font-bold w-6">#{i + 1}</span>
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">{p.name[0]}</div>
              <span className="flex-1 text-sm font-medium">{p.name}</span>
              <span className="text-sm font-semibold">{p.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
