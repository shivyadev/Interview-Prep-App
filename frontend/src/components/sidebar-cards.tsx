"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, BookOpen, Clock } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";
import { countProblemTypes, formatInterviewDate } from "@/lib/utils";
import { useProblems } from "@/hooks/useProblems";

export function StudyPlanCard() {
  const { problems } = useProblems();

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
        {problems
          ? Object.entries(countProblemTypes(problems)).map(
              ([problemType, counts]) => (
                <div key={problemType} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {problemType}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {counts.solved}/{counts.total}
                    </span>
                  </div>
                  <Progress
                    value={(counts.solved / counts.total) * 100}
                    className="h-2"
                  />
                </div>
              )
            )
          : ""}
      </CardContent>
    </Card>
  );
}

export function UpcomingInterviewsCard() {
  const { applications } = useApplications();

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications?.map(
          (interview) =>
            interview.interview_date !== "" && (
              <div
                key={`${interview.company}-${interview.interview_date}`}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {interview.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {interview.interview_date
                      ? formatInterviewDate(interview.interview_date)
                      : ""}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary"
                >
                  {interview.interview_type}
                </Badge>
              </div>
            )
        )}
      </CardContent>
    </Card>
  );
}
