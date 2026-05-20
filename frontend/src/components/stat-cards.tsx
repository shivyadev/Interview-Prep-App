import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Target,
  Flame,
} from "lucide-react";
import { useProblems } from "@/hooks/useProblems";
import { useApplications } from "@/hooks/useApplications";
import { calculateStreak } from "@/lib/utils";

export default function StatCards() {
  const { problems } = useProblems();
  const { applications } = useApplications();

  const problemsSolved = problems?.length ?? 0;
  const currentStreak = calculateStreak(problems ?? []);
  const appliedApplications = applications?.length ?? 0;
  const responses = applications?.filter((a) => a.interview_date).length ?? 0;

  const stats = [
    {
      title: "Problems Solved",
      value: problemsSolved.toString(),
      trend: "up" as const,
      icon: CheckCircle2,
      description: "total solved",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Current Streak",
      value: currentStreak.toString(),
      trend: "up" as const,
      icon: Flame,
      description: "days",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
    {
      title: "Applied Applications",
      value: appliedApplications.toString(),
      trend: "up" as const,
      icon: Clock,
      description: "total applied",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Responses",
      value: responses.toString(),
      trend: responses > 0 ? ("up" as const) : ("down" as const),
      icon: Target,
      description: "interview dates set",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="flex items-center mt-2 gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-chart-2" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
