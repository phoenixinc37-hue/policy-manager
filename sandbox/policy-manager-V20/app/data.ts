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
  effectiveDate?: string;
  completedDate?: string;
  needsAttention?: boolean;
  awaitingApproval?: boolean;
  latestPublished?: boolean;
};

export const employees: string[] = [];

export const documents: PolicyDocument[] = [];

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
