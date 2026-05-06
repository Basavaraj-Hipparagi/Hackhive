import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Clock, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";
import { weeklyProgress } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
  head: () => ({ meta: [{ title: "Dashboard — FocusFlow AI" }] }),
});

type Stat = {
  label: string;
  value: string;
  sub: string;
  icon: typeof TrendingUp;
  tone: "cyan" | "green" | "blue" | "neon";
};

const stats: Stat[] = [
  { label: "PRODUCTIVITY", value: "87%", sub: "+12% vs last week", icon: TrendingUp, tone: "cyan" },
  { label: "STUDY HOURS", value: "5.4h", sub: "On track", icon: Clock, tone: "green" },
  { label: "TASKS DONE", value: "1/6", sub: "5 left", icon: CheckCircle2, tone: "blue" },
  { label: "STREAK", value: "14 days", sub: "Personal best!", icon: Flame, tone: "neon" },
];

const toneStyles: Record<Stat["tone"], { glow: string; icon: string; sub: string; ring: string }> = {
  cyan: {
    glow: "from-[oklch(0.7_0.2_210/0.35)] to-transparent",
    icon: "bg-[oklch(0.7_0.2_210/0.18)] text-[oklch(0.85_0.15_210)]",
    sub: "text-[oklch(0.82_0.16_210)]",
    ring: "ring-[oklch(0.7_0.2_210/0.25)]",
  },
  green: {
    glow: "from-[oklch(0.75_0.2_150/0.3)] to-transparent",
    icon: "bg-[oklch(0.75_0.2_150/0.18)] text-[oklch(0.85_0.2_150)]",
    sub: "text-[oklch(0.85_0.2_150)]",
    ring: "ring-[oklch(0.75_0.2_150/0.25)]",
  },
  blue: {
    glow: "from-[oklch(0.65_0.2_240/0.35)] to-transparent",
    icon: "bg-[oklch(0.65_0.2_240/0.2)] text-[oklch(0.85_0.15_230)]",
    sub: "text-[oklch(0.78_0.12_230)]",
    ring: "ring-[oklch(0.65_0.2_240/0.25)]",
  },
  neon: {
    glow: "from-[oklch(0.8_0.22_140/0.35)] to-transparent",
    icon: "bg-[oklch(0.8_0.22_140/0.18)] text-[oklch(0.88_0.22_140)]",
    sub: "text-[oklch(0.88_0.22_140)] [text-shadow:0_0_18px_oklch(0.8_0.22_140/0.6)]",
    ring: "ring-[oklch(0.8_0.22_140/0.3)]",
  },
};

function DashboardHome() {
  return (
    <div className="gradient-dashboard-dark -m-4 md:-m-8 min-h-[calc(100vh-4rem)] p-4 md:p-10 relative overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[oklch(0.55_0.22_220/0.35)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.65_0.22_200/0.25)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[oklch(0.5_0.22_260/0.35)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        {/* Greeting */}
        <div className="space-y-2 animate-[fade-in_0.5s_ease-out]">
          <p className="text-sm md:text-base font-medium text-[oklch(0.82_0.1_220)]">
            Good morning, Alex 👋
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Let's make <span className="text-cyan-glow">today count.</span>
          </h1>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => {
            const t = toneStyles[s.tone];
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`glass-dark glass-dark-glow group relative overflow-hidden rounded-2xl p-5 ring-1 ${t.ring} transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] animate-[slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${t.glow} blur-2xl`} />
                <div className="relative flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[oklch(0.78_0.08_220)]">
                      {s.label}
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {s.value}
                    </p>
                    <p className={`text-xs font-medium ${t.sub} flex items-center gap-1`}>
                      {s.tone === "cyan" && <ArrowUpRight className="h-3 w-3" />}
                      {s.sub}
                    </p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.icon} ring-1 ${t.ring}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Progress Chart */}
        <div className="glass-dark glass-dark-glow relative overflow-hidden rounded-3xl p-6 md:p-8 animate-[slide-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: "320ms" }}>
          <div className="absolute -top-24 right-1/3 h-64 w-64 rounded-full bg-[oklch(0.7_0.22_210/0.25)] blur-3xl" />
          <div className="relative mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Weekly Progress</h3>
              <p className="text-xs text-[oklch(0.78_0.08_220)] mt-1">Study hours & focus score</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[oklch(0.7_0.22_210/0.15)] text-[oklch(0.85_0.15_210)] ring-1 ring-[oklch(0.7_0.22_210/0.3)]">
              This week
            </span>
          </div>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.2 210)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.78 0.2 210)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.8 0.18 200)" />
                    <stop offset="100%" stopColor="oklch(0.75 0.22 230)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.78 0.08 220)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.78 0.08 220)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.05 250 / 0.9)",
                    border: "1px solid oklch(0.7 0.22 210 / 0.4)",
                    borderRadius: 12,
                    fontSize: 12,
                    color: "white",
                    backdropFilter: "blur(12px)",
                  }}
                  cursor={{ stroke: "oklch(0.7 0.22 210 / 0.4)", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="url(#cyanLine)"
                  strokeWidth={3}
                  fill="url(#cyanFill)"
                  filter="url(#glow)"
                  dot={{ r: 4, fill: "oklch(0.85 0.18 210)", stroke: "white", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "oklch(0.9 0.18 210)", stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
