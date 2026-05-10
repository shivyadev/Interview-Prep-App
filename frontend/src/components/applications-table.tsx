import * as React from "react";
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
  Briefcase,
  Plus,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

type ApplicationStatus =
  | "Applied"
  | "OA Received"
  | "Interview Scheduled"
  | "Rejected"
  | "Offer"
  | "Withdrawn";
type Priority = "High" | "Medium" | "Low";
type LocationType = "Remote" | "On-site" | "Hybrid";

interface Application {
  id: number;
  company: string;
  role: string;
  location: string;
  locationType: LocationType;
  status: ApplicationStatus;
  dateApplied: string;
  nextFollowUp?: string;
  priority: Priority;
  source: string;
}

// Empty array to show empty state
const applications: Application[] = [];

const statusColors: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  "OA Received": "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
  "Interview Scheduled": "bg-chart-3/20 text-chart-3 hover:bg-chart-3/30",
  Rejected: "bg-destructive/20 text-destructive hover:bg-destructive/30",
  Offer: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
  Withdrawn: "bg-muted text-muted-foreground hover:bg-muted/80",
};

const priorityColors: Record<Priority, string> = {
  High: "bg-destructive/20 text-destructive",
  Medium: "bg-chart-3/20 text-chart-3",
  Low: "bg-muted text-muted-foreground",
};

const locationTypeIcons: Record<LocationType, React.ReactNode> = {
  Remote: <span className="text-chart-2">Remote</span>,
  "On-site": <span className="text-chart-3">On-site</span>,
  Hybrid: <span className="text-blue-400">Hybrid</span>,
};

export function ApplicationsTable() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    ApplicationStatus | "All"
  >("All");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isEmpty = filteredApplications.length === 0;

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-medium text-foreground">
            Job Applications
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full pl-9 sm:w-[200px] bg-muted border-border"
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
                  {statusFilter === "All" ? "Status" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Applied")}>
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("OA Received")}
                >
                  OA Received
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Interview Scheduled")}
                >
                  Interview Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Offer")}>
                  Offer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Withdrawn")}>
                  Withdrawn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground">Company</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground hidden sm:table-cell">
                  Location
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">
                  Priority
                </TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">
                  Applied
                </TableHead>
                <TableHead className="text-muted-foreground hidden xl:table-cell">
                  Follow-up
                </TableHead>
                <TableHead className="text-muted-foreground w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isEmpty ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={8} className="h-75">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                      <div className="rounded-full bg-muted p-4">
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-foreground">
                          No applications yet
                        </h3>
                        <p className="text-sm text-pretty text-muted-foreground max-w-sm">
                          Start tracking your job search by adding your first
                          application. Monitor statuses, interviews, and
                          follow-ups all in one place.
                        </p>
                      </div>
                      <Button className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Your First Application
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow
                    key={app.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground">
                          {app.company}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.role}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-sm">{app.location}</span>
                        <span className="text-xs">
                          ({locationTypeIcons[app.locationType]})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[app.status]}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="secondary"
                        className={priorityColors[app.priority]}
                      >
                        {app.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Calendar className="h-3.5 w-3.5" />
                        {app.dateApplied}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">
                      {app.nextFollowUp || "-"}
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
              )}
            </TableBody>
          </Table>
        </div>
        {!isEmpty && (
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredApplications.length} of {applications.length}{" "}
              applications
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
