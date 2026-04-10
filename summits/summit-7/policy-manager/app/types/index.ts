export type CommunicationType = "policy" | "sog" | "info";

export type PolicyStatus = "draft" | "published" | "archived";

export type UserRole =
  | "owner"
  | "admin"
  | "practice_manager"
  | "manager"
  | "staff"
  | "read_only";

export interface Organization {
  id: string;
  name: string;
}

export interface Clinic {
  id: string;
  name: string;
  orgId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clinics: string[];
  initials: string;
}

export interface PolicyItem {
  id: string;
  title: string;
  type: CommunicationType;
  category: string;
  clinics: string[];
  status: PolicyStatus;
  effectiveDate: string;
  reviewDate?: string;
  expiryDate?: string;
  version: number;
  body: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Acknowledgment {
  id: string;
  policyId: string;
  userId: string;
  acknowledgedAt: string | null;
  dueDate: string;
}

export const TYPE_LABELS: Record<CommunicationType, string> = {
  policy: "Administrative Policy",
  sog: "Standard Operating Guideline",
  info: "Communication Info",
};

export const TYPE_BADGE_CLASS: Record<CommunicationType, string> = {
  policy: "badge-policy",
  sog: "badge-sog",
  info: "badge-info",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  practice_manager: "Practice Manager",
  manager: "Manager",
  staff: "Staff",
  read_only: "Read Only",
};
