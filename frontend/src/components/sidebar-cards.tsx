"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, BookOpen, Clock } from "lucide-react";

const studyPlanItems = [
  {
    title: "Arrays & Hashing",
    progress: 85,
    total: 12,
    completed: 10,
    status: "In Progress",
  },
  {
    title: "Two Pointers",
    progress: 60,
    total: 8,
    completed: 5,
    status: "In Progress",
  },
  {
    title: "Sliding Window",
    progress: 100,
    total: 6,
    completed: 6,
    status: "Completed",
  },
  {
    title: "Binary Search",
    progress: 30,
    total: 10,
    completed: 3,
    status: "In Progress",
  },
];

const upcomingInterviews = [
  {
    company: "Tech Corp",
    date: "May 15, 2026",
    type: "Technical",
    time: "2:00 PM",
  },
  {
    company: "StartupXYZ",
    date: "May 18, 2026",
    type: "System Design",
    time: "10:00 AM",
  },
];

export function StudyPlanCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Study Plan
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {studyPlanItems.map((item) => (
          <div key={item.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.completed}/{item.total}
              </span>
            </div>
            <Progress value={item.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function UpcomingInterviewsCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingInterviews.map((interview) => (
          <div
            key={`${interview.company}-${interview.date}`}
            className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {interview.company}
              </p>
              <p className="text-xs text-muted-foreground">
                {interview.date} at {interview.time}
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {interview.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
