export const PLATFORMS = [
  "LeetCode",
  "Codeforces",
  "GeeksforGeeks",
  "HackerRank",
  "InterviewBit",
  "CodeChef",
  "Other",
] as const;

export type Platforms = (typeof PLATFORMS)[number];

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

export const CONFIDENCE_LEVELS = [
  "1 - Very Low",
  "2 - Low",
  "3 - Medium",
  "4 - High",
  "5 - Very High",
] as const;
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];
