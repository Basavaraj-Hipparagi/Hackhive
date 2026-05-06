import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — FocusFlow AI" },
      { name: "description", content: "Sign in to FocusFlow AI to continue your study streak and unlock your AI productivity dashboard." },
      { property: "og:title", content: "Sign in — FocusFlow AI" },
      { property: "og:description", content: "Sign in to FocusFlow AI to continue your study streak." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/dashboard" });
        } else {
          setInfo("Check your email to confirm your account, then sign in.");
          setMode("signin");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setError(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : String(result.error));
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen w-full gradient-dashboard-dark relative overflow-hidden flex items-center justify-center p-4">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[oklch(0.55_0.22_240/0.35)] blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.65_0.22_200/0.3)] blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-[oklch(0.6_0.22_280/0.25)] blur-3xl" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
        {/* Left — branding panel */}
        <div className="hidden lg:block animate-[fade-in_0.6s_ease-out]">
          <Link to="/" className="inline-flex items-center gap-2 mb-10 group">
            <div className="h-11 w-11 rounded-2xl gradient-primary shadow-glow flex items-center justify-center group-hover:scale-105 transition">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              FocusFlow <span className="text-cyan-glow">AI</span>
            </span>
          </Link>

          <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.05]">
            Your AI study<br />
            <span className="text-cyan-glow">copilot awaits.</span>
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-md leading-relaxed">
            Plan smarter, focus deeper, and turn your study streak into real results.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "Personalized study plans powered by AI",
              "Pomodoro focus mode with deep analytics",
              "Track streaks, goals, and class performance",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-white/75">
                <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 glass-dark glass-dark-glow rounded-2xl p-5 max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["from-pink-400 to-purple-500", "from-cyan-400 to-blue-500", "from-emerald-400 to-teal-500"].map((g, i) => (
                  <div key={i} className={`h-9 w-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-[oklch(0.18_0.05_260)]`} />
                ))}
              </div>
              <div className="text-sm">
                <div className="text-white font-medium">12,400+ students</div>
                <div className="text-white/50">already focusing better</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — auth card */}
        <div className="animate-[slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl gradient-primary shadow-glow flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              FocusFlow <span className="text-cyan-glow">AI</span>
            </span>
          </Link>

          <div className="glass-dark glass-dark-glow rounded-3xl p-7 sm:p-9">
            {/* Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-7">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`h-9 rounded-lg text-sm font-medium transition-all ${
                    mode === m
                      ? "bg-white/10 text-white shadow-[0_0_0_1px_oklch(1_0_0/0.1)_inset,0_8px_24px_-8px_oklch(0.7_0.22_220/0.5)]"
                      : "text-white/55 hover:text-white/80"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {mode === "signin" ? "Welcome back 👋" : "Join FocusFlow AI"}
            </h2>
            <p className="text-sm text-white/55 mt-1">
              {mode === "signin"
                ? "Sign in to continue your streak 🔥"
                : "Start studying smarter in under 30 seconds."}
            </p>

            {/* Social */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onGoogle}
                disabled={loading}
                className="w-full h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm font-medium text-white disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-white/40">
              <div className="flex-1 h-px bg-white/10" /> OR CONTINUE WITH EMAIL
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {error && (
              <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
              </div>
            )}
            {info && (
              <div className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" /> {info}
              </div>
            )}

            <form className="space-y-3" onSubmit={onSubmit}>
              {mode === "signup" && (
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full h-11 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[oklch(0.7_0.22_220/0.6)] focus:ring-2 focus:ring-[oklch(0.7_0.22_220/0.2)] transition"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[oklch(0.7_0.22_220/0.6)] focus:ring-2 focus:ring-[oklch(0.7_0.22_220/0.2)] transition"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 characters)"
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-9 pr-10 text-sm text-white placeholder:text-white/40 outline-none focus:border-[oklch(0.7_0.22_220/0.6)] focus:ring-2 focus:ring-[oklch(0.7_0.22_220/0.2)] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {mode === "signin" && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded accent-[oklch(0.7_0.22_220)]" />
                    Remember me
                  </label>
                  <a href="#" className="text-cyan-glow font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Sign in" : "Create account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-white/50">
              {mode === "signin" ? "New to FocusFlow? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-cyan-glow font-medium hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in instead"}
              </button>
            </p>
          </div>

          <p className="mt-5 text-center text-[11px] text-white/35 px-4">
            By continuing you agree to our{" "}
            <a href="#" className="underline hover:text-white/60">Terms</a> and{" "}
            <a href="#" className="underline hover:text-white/60">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
