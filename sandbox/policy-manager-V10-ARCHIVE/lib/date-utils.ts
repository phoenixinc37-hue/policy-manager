export const DEMO_TODAY = "2026-04-10";

export function formatDate(value?: string | null) {
  if (!value) return "Not set";
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function isOverdue(date: string, today = DEMO_TODAY) {
  return date < today;
}

export function daysUntil(date: string, today = DEMO_TODAY) {
  const start = new Date(`${today}T00:00:00`);
  const end = new Date(`${date}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

export function dueLabel(date: string, today = DEMO_TODAY) {
  const diff = daysUntil(date, today);
  if (diff < 0) return `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due in ${diff} days`;
}

export function greetingForRole() {
  return "Good morning";
}
