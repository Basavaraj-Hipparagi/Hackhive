import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";

export const Route = createFileRoute("/focus")({
  component: FocusPage,
  head: () => ({ meta: [{ title: "Focus Mode — FocusFlow AI" }] }),
});

const MODES = {
  focus: { label: "Focus", duration: 25 * 60, icon: Brain },
  short: { label: "Short Break", duration: 5 * 60, icon: Coffee },
  long: { label: "Long Break", duration: 15 * 60, icon: Coffee },
} as const;

type Mode = keyof typeof MODES;

function format(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function FocusPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [time, setTime] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(3);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setTime(t => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  useEffect(() => {
    if (time === 0 && running) {
      setRunning(false);
      if (mode === "focus") setSessions(s => s + 1);
    }
  }, [time, running, mode]);

  const switchMode = (m: Mode) => { setMode(m); setTime(MODES[m].duration); setRunning(false); };
  const reset = () => { setTime(MODES[mode].duration); setRunning(false); };

  const total = MODES[mode].duration;
  const progress = ((total - time) / total) * 100;
  const circumference = 2 * Math.PI * 140;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Focus Mode</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep work. Zero distractions.</p>
      </div>

      <div className="flex justify-center gap-2">
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              mode === m ? "gradient-primary text-primary-foreground shadow-glow" : "glass hover-lift"
            }`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl p-10 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative">
          <svg width="320" height="320" viewBox="0 0 320 320" className="-rotate-90">
            <circle cx="160" cy="160" r="140" stroke="var(--muted)" strokeWidth="14" fill="none" />
            <circle
              cx="160" cy="160" r="140"
              stroke="url(#focusGrad)" strokeWidth="14" fill="none" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
            <defs>
              <linearGradient id="focusGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.7 0.22 280)" />
                <stop offset="100%" stopColor="oklch(0.78 0.22 200)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl md:text-7xl font-bold tabular-nums tracking-tight text-gradient">{format(time)}</span>
            <span className="text-sm text-muted-foreground mt-2">{MODES[mode].label} session</span>
          </div>
        </div>

        <div className="relative mt-8 flex items-center gap-3">
          <button onClick={reset} className="glass hover-lift h-12 w-12 rounded-full flex items-center justify-center">
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={() => setRunning(r => !r)}
            className="h-16 w-16 rounded-full gradient-primary shadow-glow flex items-center justify-center text-primary-foreground hover:scale-105 transition"
          >
            {running ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
          </button>
          <div className="glass h-12 px-4 rounded-full flex items-center gap-2 text-sm">
            <Brain className="h-4 w-4 text-primary" />
            <span className="font-semibold">{sessions}</span>
            <span className="text-muted-foreground">sessions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { l: "Today", v: `${sessions * 25}m` },
          { l: "This week", v: "12h 30m" },
          { l: "Avg / day", v: "2h 15m" },
        ].map(s => (
          <div key={s.l} className="glass rounded-2xl p-4 text-center">
            <p className="text-xs text-muted-foreground">{s.l}</p>
            <p className="text-xl font-bold mt-1">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
