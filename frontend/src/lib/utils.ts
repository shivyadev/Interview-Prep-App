import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysAgo(date: string): number {
  const now = new Date().getTime();
  const diffMs = now - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
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
