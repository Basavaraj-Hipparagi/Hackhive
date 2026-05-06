import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from "recharts";
import { weeklyProgress, focusDistribution, productiveHours } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics — FocusFlow AI" }] }),
});

const PIE_COLORS = ["oklch(0.7 0.22 280)", "oklch(0.72 0.2 230)", "oklch(0.78 0.22 200)", "oklch(0.75 0.18 155)"];

function AnalyticsPage() {
  // 7x24 heatmap data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const heatmap = days.map(() => Array.from({ length: 24 }, () => Math.round(Math.random() * 100)));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights to level up your study game.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Study Hours This Week</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyProgress}>
              <defs>
                <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.22 280)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.22 200)" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="hours" fill="url(#bar)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Focus Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={focusDistribution} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={4}>
                {focusDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {focusDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />{d.name}</div>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Productivity Heatmap</h3>
            <p className="text-xs text-muted-foreground">Most active hours across the week</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            {[0.15, 0.35, 0.55, 0.8, 1].map(o => (
              <span key={o} className="h-3 w-3 rounded" style={{ background: `oklch(0.6 0.25 280 / ${o})` }} />
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[40px_repeat(24,_1fr)] gap-1 text-[10px] text-muted-foreground mb-1">
              <div />
              {Array.from({ length: 24 }).map((_, i) => <div key={i} className="text-center">{i % 3 === 0 ? i : ""}</div>)}
            </div>
            {days.map((d, di) => (
              <div key={d} className="grid grid-cols-[40px_repeat(24,_1fr)] gap-1 mb-1 items-center">
                <div className="text-[11px] text-muted-foreground">{d}</div>
                {heatmap[di].map((v, hi) => (
                  <div key={hi} className="aspect-square rounded transition hover:scale-125" style={{ background: `oklch(0.6 0.25 280 / ${v / 100})` }} title={`${v}%`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Most Productive Hours</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={productiveHours}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="level" stroke="oklch(0.7 0.22 280)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6 gradient-primary text-primary-foreground shadow-glow relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <Sparkles className="h-6 w-6 mb-3" />
          <h3 className="font-semibold text-lg mb-2">AI Insights</h3>
          <ul className="space-y-2.5 text-sm relative">
            <li className="flex gap-2"><span>•</span><span>Your focus drops 38% after 9 PM. Try ending deep work earlier.</span></li>
            <li className="flex gap-2"><span>•</span><span>Chemistry has the lowest completion rate — schedule 2 sessions next week.</span></li>
            <li className="flex gap-2"><span>•</span><span>You're consistent on weekdays. A weekend Pomodoro routine could push you over 90%.</span></li>
            <li className="flex gap-2"><span>•</span><span>Best Pomodoro hour: <strong>10 AM</strong>. Block it daily.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
