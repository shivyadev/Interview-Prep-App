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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, X } from "lucide-react";

interface AddApplicationModalProps {
  trigger?: React.ReactNode;
}

const applicationStatuses = [
  "Applied",
  "OA Received",
  "OA Completed",
  "Phone Screen Scheduled",
  "Phone Screen Completed",
  "Interview Scheduled",
  "Interview Completed",
  "Final Round",
  "Offer Received",
  "Offer Accepted",
  "Rejected",
  "Withdrawn",
];

const applicationSources = [
  "LinkedIn",
  "Company Portal",
  "Referral",
  "Indeed",
  "Glassdoor",
  "AngelList",
  "Handshake",
  "Career Fair",
  "Recruiter Outreach",
  "Other",
];

const workLocations = ["Remote", "On-site", "Hybrid"];

export function AddApplicationModal({ trigger }: AddApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const [interviewRounds, setInterviewRounds] = useState<string[]>([]);
  const [newRound, setNewRound] = useState("");

  const handleAddRound = () => {
    if (newRound.trim() && !interviewRounds.includes(newRound.trim())) {
      setInterviewRounds([...interviewRounds, newRound.trim()]);
      setNewRound("");
    }
  };

  const handleRemoveRound = (round: string) => {
    setInterviewRounds(interviewRounds.filter((r) => r !== round));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Track Application</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
              <Briefcase className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <DialogTitle>Track Job Application</DialogTitle>
              <DialogDescription>
                Keep track of your job application details and status
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Company & Role */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Company & Role
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input id="company" placeholder="e.g., Google" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role / Title *</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="jobUrl">Job Description URL</Label>
                  <Input id="jobUrl" type="url" placeholder="https://..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Work Location *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workLocations.map((loc) => (
                        <SelectItem key={loc} value={loc.toLowerCase()}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeLocation">Office Location</Label>
                  <Input
                    id="officeLocation"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Application Status
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Current Status *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationStatuses.map((status) => (
                        <SelectItem
                          key={status}
                          value={status.toLowerCase().replace(/\s+/g, "-")}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                status.includes("Offer")
                                  ? "bg-emerald-500"
                                  : status === "Rejected" ||
                                    status === "Withdrawn"
                                  ? "bg-rose-500"
                                  : status.includes("Interview") ||
                                    status.includes("Screen")
                                  ? "bg-amber-500"
                                  : "bg-sky-500"
                              }`}
                            />
                            {status}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Application Source *</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Where did you apply?" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationSources.map((source) => (
                        <SelectItem
                          key={source}
                          value={source.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateApplied">Date Applied *</Label>
                  <Input id="dateApplied" type="date" required />
                </div>
              </div>
            </div>

            {/* Interview Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Interview Details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nextInterview">Next Interview Date</Label>
                  <Input id="nextInterview" type="datetime-local" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interviewType">Interview Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone Screen</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="system-design">
                        System Design
                      </SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="virtual-onsite">
                        Virtual Onsite
                      </SelectItem>
                      <SelectItem value="hiring-manager">
                        Hiring Manager
                      </SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label>Interview Rounds Completed</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newRound}
                      onChange={(e) => setNewRound(e.target.value)}
                      placeholder="Add completed round (e.g., Phone Screen)"
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddRound())
                      }
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddRound}
                    >
                      Add
                    </Button>
                  </div>
                  {interviewRounds.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interviewRounds.map((round, index) => (
                        <Badge
                          key={round}
                          variant="secondary"
                          className="gap-1"
                        >
                          {index + 1}. {round}
                          <button
                            type="button"
                            onClick={() => handleRemoveRound(round)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contacts & Referral */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Contacts & Referral
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recruiterName">Recruiter Name</Label>
                  <Input id="recruiterName" placeholder="e.g., Jane Smith" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recruiterContact">
                    Recruiter Email / LinkedIn
                  </Label>
                  <Input
                    id="recruiterContact"
                    placeholder="e.g., jane@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Documents & Compensation */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Compensation
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Expected Salary (Min)</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="e.g., 120000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Expected Salary (Max)</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="e.g., 150000"
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
            Track Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
