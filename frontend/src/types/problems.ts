export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const STATUSES = [
  "Solved",
  "Attempted",
  "Revision Needed",
  "Not Started",
] as const;
export type Status = (typeof STATUSES)[number];

export const CATEGORIES = [
  "Arrays & Strings",
  "Linked Lists",
  "Trees & Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Binary Search",
  "Two Pointers & Sliding Window",
  "Stack & Queue",
  "Hash Table",
  "Sorting & Searching",
  "Math & Bit Manipulation",
  "System Design",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type ProblemsForm = {
  title: string;
  url: string;
  difficulty: Difficulty;
  category: Category;
  status: Status;
  time_taken: number;
};
