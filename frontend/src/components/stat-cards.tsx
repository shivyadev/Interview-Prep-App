import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Target,
  Flame,
} from "lucide-react";

const stats = [
  {
    title: "Problems Solved",
    value: "247",
    change: "+12",
    trend: "up",
    icon: CheckCircle2,
    description: "this week",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Current Streak",
    value: "23",
    change: "+3",
    trend: "up",
    icon: Flame,
    description: "days",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    title: "Study Hours",
    value: "48.5",
    change: "-2.5",
    trend: "down",
    icon: Clock,
    description: "this month",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Accuracy Rate",
    value: "78%",
    change: "+5%",
    trend: "up",
    icon: Target,
    description: "last 30 days",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
];

export default function StatCards() {
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
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-chart-2" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-chart-2" : "text-destructive"
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
