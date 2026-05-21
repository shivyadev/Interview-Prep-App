import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  Target,
  Flame,
  Code2,
  Award,
  Send,
  MessageSquare,
} from "lucide-react";
import { useProblems } from "@/hooks/useProblems";
import { useApplications } from "@/hooks/useApplications";
import { calculateStreak } from "@/lib/utils";

export default function StatCards() {
  const { problems } = useProblems();
  const { applications } = useApplications();

  const problemsSolved = problems?.filter((p) => p.status === "Solved").length;
  const currentStreak = calculateStreak(problems ?? []);
  const appliedApplications = applications?.length ?? 0;
  const responses = applications?.filter((a) => a.interview_date).length ?? 0;

  const stats = [
    {
      title: "Problems Solved",
      value: problemsSolved?.toString(),
      icon: CheckCircle2,
      bottomIcon: Code2,
      description: `of ${problems?.length} total`,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      layout: "compact" as const,
    },
    {
      title: "Current Streak",
      value: currentStreak.toString(),
      icon: Flame,
      bottomIcon: Award,
      description: "days",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      layout: "compact" as const,
    },
    {
      title: "Applied Applications",
      value: appliedApplications.toString(),
      icon: Clock,
      bottomIcon: Send,
      description: "total applied",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      layout: "compact" as const,
    },
    {
      title: "Responses",
      value: responses.toString(),
      icon: Target,
      bottomIcon: MessageSquare,
      description: "interview dates set",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      layout: "compact" as const,
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
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex flex-col gap-1 mb-1">
                <span className="text-xs text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
