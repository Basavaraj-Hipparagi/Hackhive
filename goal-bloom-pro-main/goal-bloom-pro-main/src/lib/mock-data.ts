export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  subject: string;
  priority: Priority;
  status: Status;
  deadline: string;
}

export const tasks: Task[] = [
  { id: "1", title: "Finish Calculus problem set 7", subject: "Mathematics", priority: "high", status: "in_progress", deadline: "Today, 6:00 PM" },
  { id: "2", title: "Read Chapter 12 — Quantum Mechanics", subject: "Physics", priority: "medium", status: "pending", deadline: "Tomorrow" },
  { id: "3", title: "Submit Data Structures assignment", subject: "Computer Science", priority: "high", status: "pending", deadline: "Today, 11:59 PM" },
  { id: "4", title: "Group project meeting notes", subject: "Business", priority: "low", status: "completed", deadline: "Yesterday" },
  { id: "5", title: "Write essay on Renaissance art", subject: "History", priority: "medium", status: "in_progress", deadline: "Fri, Nov 14" },
  { id: "6", title: "Lab report — Organic Chemistry", subject: "Chemistry", priority: "high", status: "pending", deadline: "Mon, Nov 17" },
];

export const weeklyProgress = [
  { day: "Mon", hours: 4.5, focus: 78 },
  { day: "Tue", hours: 6.2, focus: 85 },
  { day: "Wed", hours: 3.8, focus: 65 },
  { day: "Thu", hours: 5.5, focus: 80 },
  { day: "Fri", hours: 7.1, focus: 92 },
  { day: "Sat", hours: 2.4, focus: 55 },
  { day: "Sun", hours: 5.8, focus: 88 },
];

export const subjectProgress = [
  { subject: "Mathematics", progress: 78, color: "var(--chart-1)" },
  { subject: "Physics", progress: 64, color: "var(--chart-2)" },
  { subject: "Computer Science", progress: 91, color: "var(--chart-3)" },
  { subject: "Chemistry", progress: 52, color: "var(--chart-4)" },
  { subject: "History", progress: 70, color: "var(--chart-5)" },
];

export const focusDistribution = [
  { name: "Deep Work", value: 42 },
  { name: "Study", value: 28 },
  { name: "Reading", value: 18 },
  { name: "Practice", value: 12 },
];

export const goals = [
  { id: "1", title: "Score 90%+ in Mid-terms", progress: 72, type: "Long-term", due: "Dec 15" },
  { id: "2", title: "Study 35 hours this week", progress: 88, type: "Weekly", due: "Sun" },
  { id: "3", title: "Complete React course", progress: 45, type: "Long-term", due: "Jan 30" },
  { id: "4", title: "Read 1 chapter daily", progress: 100, type: "Daily", due: "Today" },
];

export const quotes = [
  "Discipline is choosing between what you want now and what you want most.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going.",
];

export const productiveHours = Array.from({ length: 24 }, (_, h) => ({
  hour: h,
  level: Math.max(0, Math.round(Math.sin((h - 6) / 24 * Math.PI * 2) * 50 + 50 + (h >= 9 && h <= 22 ? 20 : -30))),
}));
