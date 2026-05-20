export const APPLICATIONSTATUS = [
  "Applied",
  "OA Received",
  "Interview Scheduled",
  "Rejected",
  "Offer",
  "Withdrawn",
];

export const APPLICATIONSOURCES = [
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
export const LOCATIONTYPE = ["Remote", "On-site", "Hybrid"];

export type ApplicationStatus = (typeof APPLICATIONSTATUS)[number];
export type ApplicationSources = (typeof APPLICATIONSOURCES)[number];
export type LocationType = (typeof LOCATIONTYPE)[number];

export type ApplicationsForm = {
  company: string;
  role: string;
  location: string;
  location_type: LocationType;
  status: ApplicationStatus;
  date_applied: string;
  interview_date?: string;
  source: ApplicationSources;
};

export type ApplicationResponse = {
  id: string;
  company: string;
  role: string;
  location: string;
  location_type: LocationType;
  status: ApplicationStatus;
  date_applied: string;
  interview_date?: string;
  source: ApplicationSources;
};
