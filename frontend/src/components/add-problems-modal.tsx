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

import {
  CATEGORIES,
  DIFFICULTIES,
  STATUSES,
  type ProblemsForm,
} from "@/types/problems";
import { useProblems } from "@/hooks/useProblems";

import { toast } from "sonner";

interface AddProblemModalProps {
  trigger: React.ReactNode;
}

export function AddProblemModal({ trigger }: AddProblemModalProps) {
  const [open, setOpen] = useState(false);
  const { addProblem } = useProblems();

  const initialForm: Partial<ProblemsForm> = {
    title: "",
    url: "",
    difficulty: undefined,
    category: undefined,
    status: undefined,
    time_taken: 0,
  };

  const [form, setForm] = useState<Partial<ProblemsForm>>(initialForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.difficulty || !form.category || !form.status || !form.title) {
      toast.error("Please fill in all required fields");
      return;
    }

    addProblem.mutate(form as ProblemsForm, {
      onSuccess: () => {
        setOpen(false);
        setForm(initialForm);
        toast.success("Problem added successfully");
      },
    });
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
                  <Input
                    id="title"
                    placeholder="e.g., Two Sum"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Problem URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://leetcode.com/problems/..."
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    onValueChange={(value: (typeof DIFFICULTIES)[number]) =>
                      setForm({ ...form, difficulty: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIFFICULTIES.map((diff) => (
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
                  <Select
                    onValueChange={(value: (typeof CATEGORIES)[number]) =>
                      setForm({ ...form, category: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
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
                  <Select
                    onValueChange={(value: (typeof STATUSES)[number]) =>
                      setForm({ ...form, status: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
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
                  <Label htmlFor="timeTaken">Time Taken (minutes)</Label>
                  <Input
                    id="timeTaken"
                    type="number"
                    placeholder="e.g., 45"
                    min="0"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time_taken:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      })
                    }
                  />
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
