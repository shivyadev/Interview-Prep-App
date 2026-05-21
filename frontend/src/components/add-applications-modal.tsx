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
  type ApplicationsForm,
} from "@/types/applications";

import { toast } from "sonner";
import { useApplications } from "@/hooks/useApplications";

interface AddApplicationModalProps {
  trigger?: React.ReactNode;
}

export function AddApplicationModal({ trigger }: AddApplicationModalProps) {
  const [open, setOpen] = useState(false);

  const initialFormState: Partial<ApplicationsForm> = {
    company: undefined,
    role: undefined,
    location: undefined,
    location_type: undefined,
    status: undefined,
    date_applied: new Date().toISOString().split("T")[0],
    interview_date: undefined,
    source: undefined,
  };

  const [form, setForm] = useState<Partial<ApplicationsForm>>(initialFormState);
  const { addApplication } = useApplications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    addApplication.mutate(form as ApplicationsForm, {
      onSuccess: () => {
        setOpen(false);
        setForm(initialFormState);
        toast.success("Application added successfully");
      },
    });
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
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Work Location *</Label>
                  <Select
                    required
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
            Track Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
