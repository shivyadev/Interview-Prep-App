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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase } from "lucide-react";
import {
  APPLICATIONSTATUS,
  APPLICATIONSOURCES,
  LOCATIONTYPE,
  type ApplicationResponse,
} from "@/types/applications";

import { toast } from "sonner";
import { useApplications } from "@/hooks/useApplications";

interface EditApplicationModalProps {
  trigger?: React.ReactNode;
  applications: ApplicationResponse;
}

export function EditApplicationModal({
  trigger,
  applications,
}: EditApplicationModalProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<Partial<ApplicationResponse>>(applications);
  const { editApplication } = useApplications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) return;

    if (
      !form.company ||
      !form.role ||
      !form.location ||
      !form.location_type ||
      !form.status ||
      !form.date_applied ||
      !form.source
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    editApplication.mutate(
      { id: form.id, data: form },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Application editted.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Application</span>
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
              <DialogTitle>Edit Application</DialogTitle>
              <DialogDescription>
                Update your application status
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Company & Role */}
            {/* Company & Role */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Company & Role
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google"
                    required
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role / Title *</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Software Engineer"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Work Location *</Label>
                  <Select
                    required
                    value={form.location_type}
                    onValueChange={(value) =>
                      setForm({ ...form, location_type: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONTYPE.map((loc) => (
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
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
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
                  <Select
                    required
                    value={form.status}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {APPLICATIONSTATUS.map((status) => (
                        <SelectItem key={status} value={status}>
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
                  <Select
                    required
                    value={form.source}
                    onValueChange={(value) =>
                      setForm({ ...form, source: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Where did you apply?" />
                    </SelectTrigger>
                    <SelectContent>
                      {APPLICATIONSOURCES.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateApplied">Date Applied *</Label>
                  <Input
                    id="dateApplied"
                    type="date"
                    required
                    value={form.date_applied}
                    onChange={(e) =>
                      setForm({ ...form, date_applied: e.target.value })
                    }
                  />
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
                  <Input
                    id="nextInterview"
                    type="datetime-local"
                    value={form.interview_date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        interview_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewType">Interview Type</Label>
                  <Input
                    id="interviewType"
                    type="text"
                    value={form.interview_type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        interview_type: e.target.value,
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
            Edit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
