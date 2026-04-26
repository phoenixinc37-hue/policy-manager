export type DocumentStatus = "circulating" | "pending-approval" | "library";
export type DocumentType = "Policy" | "SOG" | "Memo";

export type PolicyDocument = {
  id: string;
  title: string;
  type: DocumentType;
  team: string;
  assignedTo: string[];
  acknowledgedBy: string[];
  status: DocumentStatus;
  needsAttention?: boolean;
  awaitingApproval?: boolean;
  latestPublished?: boolean;
};

export const employees = [
  "Jack Wilde",
  "Sarah Jenkins",
  "Michael Chang",
  "Emily Rodriguez",
  "David Thompson",
  "Amanda Cole",
  "Robert Chen",
  "Jessica Patel",
  "Thomas Wright",
  "Olivia Bennett",
];

export const documents: PolicyDocument[] = [
  {
    id: "policy-client-file-standards",
    title: "Client File Document Standards",
    type: "Policy",
    team: "Tax team",
    assignedTo: employees,
    acknowledgedBy: ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Thompson", "Amanda Cole", "Robert Chen", "Jessica Patel", "Thomas Wright", "Olivia Bennett"],
    status: "circulating",
    needsAttention: true,
  },
  {
    id: "policy-billing-documentation-protocol",
    title: "Billing Documentation Protocol",
    type: "Policy",
    team: "Admin team",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
  },
  {
    id: "policy-client-call-standard",
    title: "Client Call Standard",
    type: "Policy",
    team: "Client care",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
  },
  {
    id: "sog-month-end-closing",
    title: "Month End Closing Procedure",
    type: "SOG",
    team: "Admin team",
    assignedTo: employees,
    acknowledgedBy: ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Thompson", "Amanda Cole", "Robert Chen", "Jessica Patel"],
    status: "circulating",
  },
  {
    id: "sog-client-onboarding-checklist",
    title: "Client Onboarding Checklist",
    type: "SOG",
    team: "Admin team",
    assignedTo: employees,
    acknowledgedBy: ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Thompson", "Amanda Cole", "Robert Chen", "Jessica Patel", "Thomas Wright"],
    status: "circulating",
  },
  {
    id: "sog-year-end-file-assembly",
    title: "Year End File Assembly",
    type: "SOG",
    team: "Tax team",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
  },
  {
    id: "sog-engagement-letter-processing",
    title: "Engagement Letter Processing",
    type: "SOG",
    team: "Leadership",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
  },
  {
    id: "sog-document-retention-workflow",
    title: "Document Retention Workflow",
    type: "SOG",
    team: "Operations",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
  },
  {
    id: "memo-remote-work-expectations",
    title: "Remote Work Expectations",
    type: "Memo",
    team: "Firm-wide",
    assignedTo: employees,
    acknowledgedBy: employees,
    status: "library",
    latestPublished: true,
  },
  {
    id: "memo-tax-deadline-reminder",
    title: "Tax Deadline Reminder",
    type: "Memo",
    team: "Tax team",
    assignedTo: employees,
    acknowledgedBy: ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Thompson", "Amanda Cole", "Robert Chen"],
    status: "circulating",
  },
  {
    id: "memo-client-portal-rollout",
    title: "Client Portal Rollout",
    type: "Memo",
    team: "Firm-wide",
    assignedTo: employees,
    acknowledgedBy: ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Thompson", "Amanda Cole"],
    status: "circulating",
  },
  {
    id: "policy-client-billing-standards",
    title: "Client Billing Standards",
    type: "Policy",
    team: "Leadership",
    assignedTo: ["Jack Wilde", "Sarah Jenkins", "Michael Chang", "Emily Rodriguez"],
    acknowledgedBy: [],
    status: "pending-approval",
    awaitingApproval: true,
  },
];

export function getLeadershipStats() {
  const circulating = documents.filter((doc) => doc.status === "circulating");
  const pendingApproval = documents.filter((doc) => doc.status === "pending-approval").length;
  const totalAssigned = documents.reduce((sum, doc) => sum + doc.assignedTo.length, 0);
  const totalAcknowledged = documents.reduce((sum, doc) => sum + doc.acknowledgedBy.length, 0);
  const overallCompletion = totalAssigned ? Math.round((totalAcknowledged / totalAssigned) * 100) : 0;

  return {
    circulatingCount: circulating.length,
    pendingApproval,
    overallCompletion,
    needsAttention: circulating.filter((doc) => doc.needsAttention).length,
  };
}

export function getTeamItems(employee: string) {
  return documents
    .filter((doc) => doc.assignedTo.includes(employee))
    .map((doc) => ({
      ...doc,
      acknowledged: doc.acknowledgedBy.includes(employee),
    }));
}
