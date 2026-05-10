import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  Circle,
  RotateCcw,
  Code2,
  Plus,
} from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";
type Status = "Solved" | "Attempted" | "Todo";

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  category: string;
  status: Status;
  acceptance: string;
  lastAttempt?: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    status: "Solved",
    acceptance: "49.1%",
    lastAttempt: "2 days ago",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    status: "Solved",
    acceptance: "40.2%",
    lastAttempt: "1 week ago",
  },
  {
    id: 3,
    title: "Longest Substring",
    difficulty: "Medium",
    category: "Strings",
    status: "Attempted",
    acceptance: "33.8%",
    lastAttempt: "3 days ago",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    status: "Todo",
    acceptance: "36.1%",
  },
  {
    id: 5,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    status: "Solved",
    acceptance: "27.2%",
    lastAttempt: "5 days ago",
  },
  {
    id: 6,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    status: "Attempted",
    acceptance: "54.3%",
    lastAttempt: "Yesterday",
  },
  {
    id: 7,
    title: "3Sum",
    difficulty: "Medium",
    category: "Arrays",
    status: "Todo",
    acceptance: "32.5%",
  },
  {
    id: 8,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Heap",
    status: "Todo",
    acceptance: "49.8%",
  },
];

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
  Medium: "bg-chart-3/20 text-chart-3 hover:bg-chart-3/30",
  Hard: "bg-destructive/20 text-destructive hover:bg-destructive/30",
};

const statusIcons: Record<Status, React.ReactNode> = {
  Solved: <CheckCircle2 className="h-4 w-4 text-chart-2" />,
  Attempted: <RotateCcw className="h-4 w-4 text-chart-3" />,
  Todo: <Circle className="h-4 w-4 text-muted-foreground" />,
};

interface ProblemsTableProps {
  page: "dashboard" | "problems";
}

export function ProblemsTable({ page }: ProblemsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">(
    "All"
  );

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const [empty] = useState<boolean>(true);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-medium text-foreground">
            {page == "problems" ? "Problems List" : "Recently Solved Problems"}
          </CardTitle>
          {page == "problems" && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full pl-9 sm:w-50 bg-muted border-border"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-border bg-muted"
                  >
                    <Filter className="h-4 w-4" />
                    {difficultyFilter === "All"
                      ? "Difficulty"
                      : difficultyFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDifficultyFilter("All")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter("Easy")}>
                    Easy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDifficultyFilter("Medium")}
                  >
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter("Hard")}>
                    Hard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Title</TableHead>
                <TableHead className="text-muted-foreground hidden sm:table-cell">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Difficulty
                </TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">
                  Acceptance
                </TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">
                  Last Attempt
                </TableHead>
                <TableHead className="text-muted-foreground w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!empty ? (
                filteredProblems.map((problem) => (
                  <TableRow
                    key={problem.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell>{statusIcons[problem.status]}</TableCell>
                    <TableCell className="font-medium text-foreground">
                      {problem.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">
                      {problem.category}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={difficultyColors[problem.difficulty]}
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {problem.acceptance}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden lg:table-cell">
                      {problem.lastAttempt || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={7} className="h-75">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                      <div className="rounded-full bg-muted p-4">
                        <Code2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-foreground">
                          No problems yet
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Start tracking your coding journey by adding your
                          first problem.
                        </p>
                      </div>
                      <Button className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Your First Problem
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {page == "problems" && !empty && (
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredProblems.length} of {problems.length} problems
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-border"
              >
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-border">
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
