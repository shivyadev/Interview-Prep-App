"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Code2 } from "lucide-react";

const platforms = [
  "LeetCode",
  "Codeforces",
  "GeeksforGeeks",
  "HackerRank",
  "InterviewBit",
  "CodeChef",
  "Other",
];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Solved", "Attempted", "Revision Needed", "Not Started"];
const categories = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Binary Search",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Queue",
  "Heap",
  "Hash Table",
  "Recursion",
  "Sorting",
  "Math",
  "Bit Manipulation",
  "System Design",
  "Database",
  "Other",
];
const confidenceLevels = [
  "1 - Very Low",
  "2 - Low",
  "3 - Medium",
  "4 - High",
  "5 - Very High",
];

interface AddProblemModalProps {
  trigger: React.ReactNode;
}

export function AddProblemModal({ trigger }: AddProblemModalProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Problem</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Add New Problem</DialogTitle>
              <DialogDescription>
                Track a new coding problem to your prep list
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Basic Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Problem Title *</Label>
                  <Input id="title" placeholder="e.g., Two Sum" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem
                          key={platform}
                          value={platform.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Problem URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://leetcode.com/problems/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff.toLowerCase()}>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                diff === "Easy"
                                  ? "bg-emerald-500"
                                  : diff === "Medium"
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                              }`}
                            />
                            {diff}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Status & Progress */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Status & Progress
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          key={status}
                          value={status.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confidence">Confidence Level</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Rate your confidence" />
                    </SelectTrigger>
                    <SelectContent>
                      {confidenceLevels.map((level) => (
                        <SelectItem key={level} value={level.split(" - ")[0]}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateSolved">Date Solved</Label>
                  <Input id="dateSolved" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeTaken">Time Taken (minutes)</Label>
                  <Input
                    id="timeTaken"
                    type="number"
                    placeholder="e.g., 45"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selfSolved">Solution Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="How did you solve it?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self Solved</SelectItem>
                      <SelectItem value="hint">Needed Hints</SelectItem>
                      <SelectItem value="solution">
                        Looked at Solution
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-border">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Problem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
