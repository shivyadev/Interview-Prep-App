import type { ProblemsResponse } from "@/types/problems";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysAgo(date: string): number {
  const now = new Date();
  const target = new Date(date);

  // Normalize both to midnight local time to avoid timezone issues
  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const targetMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffMs = nowMidnight.getTime() - targetMidnight.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDaysAgo(date: string): string {
  const days = daysAgo(date);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";

  return `${days} days ago`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatInterviewDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export function calculateStreak(problems: ProblemsResponse[]): number {
  if (!problems.length) return 0;

  const toMidnight = (dateStr: string) => {
    const d = new Date(dateStr.split("T")[0]);
    return new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate()
    ).getTime();
  };

  const solvedDates = [
    ...new Set(
      problems
        .filter((p) => p.date_solved)
        .map((p) => p.date_solved.split("T")[0])
    ),
  ].sort((a, b) => b.localeCompare(a));

  if (!solvedDates.length) return 0;

  const today = toMidnight(new Date().toISOString().split("T")[0]);
  const yesterday = today - 86400000;
  const mostRecent = toMidnight(solvedDates[0]);

  if (mostRecent !== today && mostRecent !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < solvedDates.length; i++) {
    const diff = toMidnight(solvedDates[i - 1]) - toMidnight(solvedDates[i]);
    if (diff === 86400000) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function countProblemTypes(problems: ProblemsResponse[]) {
  return problems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = { total: 0, solved: 0 };
    }
    acc[problem.category].total += 1;
    if (problem.status === "Solved") {
      acc[problem.category].solved += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; solved: number }>);
}

export function getWeeklyActivityData(problems: ProblemsResponse[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const counts: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  problems.forEach((p) => {
    if (!p.date_solved) return;
    const day = days[new Date(p.date_solved).getDay()];
    counts[day] += 1;
  });

  // Return in Mon–Sun order
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    problems: counts[day],
  }));
}

export function getWeeklyProgressData(problems: ProblemsResponse[]) {
  const weeks: Record<number, { easy: number; medium: number; hard: number }> =
    {
      1: { easy: 0, medium: 0, hard: 0 },
      2: { easy: 0, medium: 0, hard: 0 },
      3: { easy: 0, medium: 0, hard: 0 },
      4: { easy: 0, medium: 0, hard: 0 },
    };

  problems.forEach((p) => {
    if (!p.date_solved) return;
    const day = new Date(p.date_solved).getDate(); // 1–31
    const week = Math.min(Math.ceil(day / 7), 4); // 1–4

    const difficulty = p.difficulty.toLowerCase() as "easy" | "medium" | "hard";
    if (weeks[week] && difficulty in weeks[week]) {
      weeks[week][difficulty] += 1;
    }
  });

  return [1, 2, 3, 4].map((w) => ({ week: `W${w}`, ...weeks[w] }));
}
