import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const activityData = [
  { day: "Mon", problems: 8, hours: 2.5 },
  { day: "Tue", problems: 12, hours: 3.2 },
  { day: "Wed", problems: 6, hours: 1.8 },
  { day: "Thu", problems: 15, hours: 4.0 },
  { day: "Fri", problems: 10, hours: 2.8 },
  { day: "Sat", problems: 18, hours: 5.2 },
  { day: "Sun", problems: 14, hours: 3.5 },
];

const progressData = [
  { week: "W1", easy: 12, medium: 8, hard: 3 },
  { week: "W2", easy: 15, medium: 10, hard: 5 },
  { week: "W3", easy: 10, medium: 12, hard: 4 },
  { week: "W4", easy: 18, medium: 14, hard: 7 },
];

export function ActivityChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-medium text-foreground">
          Weekly Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-50">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.65 0.19 265)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.65 0.19 265)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.24 0.01 265)"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.65 0.02 265)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.65 0.02 265)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.008 265)",
                  border: "1px solid oklch(0.24 0.01 265)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 265)",
                }}
                labelStyle={{ color: "oklch(0.65 0.02 265)" }}
              />
              <Area
                type="monotone"
                dataKey="problems"
                stroke="oklch(0.65 0.19 265)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProblems)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProgressChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-medium text-foreground">
          Progress by Difficulty
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.24 0.01 265)"
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.65 0.02 265)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.65 0.02 265)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.008 265)",
                  border: "1px solid oklch(0.24 0.01 265)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 265)",
                }}
                labelStyle={{ color: "oklch(0.65 0.02 265)" }}
              />
              <Bar
                dataKey="easy"
                fill="oklch(0.70 0.18 160)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="medium"
                fill="oklch(0.75 0.15 80)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="hard"
                fill="oklch(0.55 0.22 25)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.70 0.18 160)" }}
            />
            <span className="text-xs text-muted-foreground">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.75 0.15 80)" }}
            />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.55 0.22 25)" }}
            />
            <span className="text-xs text-muted-foreground">Hard</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
