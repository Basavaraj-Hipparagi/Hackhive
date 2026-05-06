import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Target, Timer, BarChart3, Sparkles, Zap, CheckCircle2, Star, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "FocusFlow AI — Your AI-Powered Study Companion" },
      { name: "description", content: "Master your study habits with AI insights, smart task management, focus timers, and beautiful productivity analytics built for students." },
      { property: "og:title", content: "FocusFlow AI — Your AI-Powered Study Companion" },
      { property: "og:description", content: "Master your study habits with AI insights, smart task management, focus timers, and beautiful analytics." },
    ],
  }),
});

const features = [
  { icon: Brain, title: "AI Study Planner", desc: "Personalized schedules based on your goals, deadlines, and peak focus hours." },
  { icon: Timer, title: "Pomodoro Focus", desc: "Distraction-free sessions with ambient sounds and auto productivity scoring." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Heatmaps, trends, and actionable insights to help you study smarter, not harder." },
  { icon: Target, title: "Goal Tracking", desc: "Daily, weekly, long-term — with XP, streaks, and achievement badges." },
  { icon: Sparkles, title: "AI Assistant", desc: "Ask anything. Get summaries, study plans, and weak-subject detection." },
  { icon: Zap, title: "Real-time Sync", desc: "Tasks, notes, and timetables sync seamlessly across all your devices." },
];

const testimonials = [
  { name: "Maya R.", role: "CS Major, Stanford", quote: "My GPA jumped from 3.4 to 3.8 in one semester. The AI insights are unreal." },
  { name: "Ravi K.", role: "Pre-med, NYU", quote: "Finally a productivity app that actually understands students. The focus mode is addictive." },
  { name: "Lin Z.", role: "Law Student, Oxford", quote: "Heatmaps showed me I was wasting my best hours. Now I dominate mornings." },
];

const pricing = [
  { name: "Free", price: "$0", desc: "For getting started", features: ["Unlimited tasks", "5 focus sessions/day", "Basic analytics", "1 active goal"], cta: "Get started" },
  { name: "Pro", price: "$6", desc: "Most popular", features: ["Everything in Free", "Unlimited focus", "AI study planner", "Advanced analytics", "Priority support"], cta: "Start free trial", featured: true },
  { name: "Campus", price: "$3", desc: "For student groups", features: ["Pro for everyone", "Group leaderboards", "Shared timetables", "Bulk discount"], cta: "Contact sales" },
];

const faqs = [
  { q: "Is FocusFlow AI free for students?", a: "Yes — our Free plan is fully featured and lasts forever. Pro adds AI planning and unlimited sessions." },
  { q: "Does it work offline?", a: "Yes. FocusFlow is a PWA — install it and study without internet. Everything syncs when you're back online." },
  { q: "Which AI models power the assistant?", a: "We use top-tier reasoning models with privacy-first prompts. Your study data never trains the models." },
  { q: "Can I import my existing timetable?", a: "Absolutely. We support Google Calendar, Apple Calendar, and CSV imports." },
];

function Landing() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-primary shadow-glow flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">FocusFlow <span className="text-gradient">AI</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition">Students</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="hidden sm:inline-flex h-9 px-4 items-center rounded-xl text-sm font-medium hover:bg-muted transition">Sign in</Link>
            <Link to="/dashboard" className="h-9 px-4 inline-flex items-center rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:opacity-90 transition">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative gradient-mesh">
        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-[slide-up_0.6s_ease-out]">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium mb-6">
              <Sparkles className="h-3 w-3 text-primary" /> AI-powered for students
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Study smarter.<br />Track everything.<br /><span className="text-gradient">Achieve more.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Your AI-powered productivity companion built for college students. Master deadlines, stay focused, and crush your academic goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard" className="h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition">
                Try the dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="h-12 px-6 inline-flex items-center justify-center rounded-xl glass hover-lift font-medium">See features</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free forever plan</div>
              <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No credit card</div>
            </div>
          </div>

          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            <div className="absolute -inset-10 gradient-neon opacity-30 blur-3xl rounded-full" />
            <img src={heroImg} alt="AI productivity dashboard illustration" width={1536} height={1024} className="relative rounded-3xl shadow-elevated border border-border/50" />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 pb-16">
          <div className="glass rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {[
              { v: "120K+", l: "Active students" },
              { v: "8.4M", l: "Focus minutes" },
              { v: "92%", l: "Hit their goals" },
              { v: "4.9★", l: "Average rating" },
            ].map(s => (
              <div key={s.l} className="p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-primary font-semibold uppercase tracking-wider">Features</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">Everything you need to thrive</h2>
            <p className="mt-4 text-muted-foreground">A complete academic OS — designed beautifully and powered by AI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(f => (
              <div key={f.title} className="glass hover-lift rounded-2xl p-6">
                <div className="h-11 w-11 rounded-xl gradient-primary shadow-glow flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 gradient-mesh">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-primary font-semibold uppercase tracking-wider">Loved by students</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">From late-nights to top grades</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(t => (
              <div key={t.name} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}</div>
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-primary font-semibold uppercase tracking-wider">Pricing</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">Simple, student-friendly</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {pricing.map(p => (
              <div key={p.name} className={`rounded-2xl p-6 hover-lift ${p.featured ? "gradient-primary text-primary-foreground shadow-glow" : "glass"}`}>
                <p className={`text-xs font-semibold uppercase ${p.featured ? "opacity-80" : "text-primary"}`}>{p.name}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className={`text-sm ${p.featured ? "opacity-80" : "text-muted-foreground"}`}>/month</span>
                </div>
                <p className={`text-sm mt-1 ${p.featured ? "opacity-90" : "text-muted-foreground"}`}>{p.desc}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2"><CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "text-primary-foreground" : "text-success"}`} />{f}</li>
                  ))}
                </ul>
                <button className={`mt-6 w-full h-11 rounded-xl font-medium transition ${p.featured ? "bg-white/20 hover:bg-white/30 backdrop-blur" : "gradient-primary text-primary-foreground hover:opacity-90"}`}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 gradient-mesh">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Questions, answered</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="glass rounded-2xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="rounded-3xl p-10 md:p-16 gradient-primary text-primary-foreground text-center shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 gradient-mesh" />
            <h2 className="relative text-3xl md:text-5xl font-bold tracking-tight">Your best semester starts now.</h2>
            <p className="relative mt-4 opacity-90 max-w-xl mx-auto">Join 120,000+ students using FocusFlow AI to study smarter and live better.</p>
            <Link to="/dashboard" className="relative mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur font-medium transition">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center"><GraduationCap className="h-4 w-4 text-primary-foreground" /></div>
            <span>© 2026 FocusFlow AI · Built for students</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Discord</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
