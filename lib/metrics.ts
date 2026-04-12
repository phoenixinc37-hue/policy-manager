import type { Acknowledgment, Clinic, PolicyItem, User } from "@/types";
import { DEMO_TODAY, isOverdue } from "./date-utils";

export function getVisiblePolicies(policies: PolicyItem[], user: User, isManager: boolean) {
  return policies.filter((policy) =>
    policy.clinics.some((clinicId) => user.clinics.includes(clinicId)) &&
    (isManager || policy.status === "published")
  );
}

export function getUserPendingAcks(acks: Acknowledgment[], userId: string) {
  return acks.filter((ack) => ack.userId === userId && !ack.acknowledgedAt);
}

export function getUserCompletedAcks(acks: Acknowledgment[], userId: string) {
  return acks.filter((ack) => ack.userId === userId && !!ack.acknowledgedAt);
}

export function getManagerSnapshot(
  policies: PolicyItem[],
  acknowledgments: Acknowledgment[],
  clinics: Clinic[], locationLabel: string,
  users: User[]
) {
  const published = policies.filter((policy) => policy.status === "published");
  const drafts = policies.filter((policy) => policy.status === "draft");
  const pending = acknowledgments.filter((ack) => !ack.acknowledgedAt);
  const overdue = pending.filter((ack) => isOverdue(ack.dueDate));
  const completionRate = acknowledgments.length ? Math.round(((acknowledgments.length - pending.length) / acknowledgments.length) * 100) : 0;

  const clinicStats = clinics
    .map((clinic) => {
      const clinicPolicies = published.filter((policy) => policy.clinics.includes(clinic.id));
      const clinicAcks = acknowledgments.filter((ack) => {
        const policy = policies.find((item) => item.id === ack.policyId);
        return policy?.clinics.includes(clinic.id);
      });
      const clinicPending = clinicAcks.filter((ack) => !ack.acknowledgedAt).length;
      const clinicOverdue = clinicAcks.filter((ack) => !ack.acknowledgedAt && isOverdue(ack.dueDate)).length;
      const clinicDone = clinicAcks.filter((ack) => !!ack.acknowledgedAt).length;
      const rate = clinicAcks.length ? Math.round((clinicDone / clinicAcks.length) * 100) : 0;
      return { clinic, clinicPolicies: clinicPolicies.length, clinicPending, clinicOverdue, rate };
    })
    .sort((a, b) => b.clinicOverdue - a.clinicOverdue || a.rate - b.rate);

  const topFollowUps = overdue.slice(0, 5).map((ack) => {
    const policy = policies.find((item) => item.id === ack.policyId);
    const user = users.find((item) => item.id === ack.userId);
    const clinicName = policy?.clinics[0] ? clinics.find((clinic) => clinic.id === policy.clinics[0])?.name ?? policy.clinics[0] : "Unknown ${locationLabel.toLowerCase()}";
    return {
      id: ack.id,
      userName: user?.name ?? ack.userId,
      policyTitle: policy?.title ?? ack.policyId,
      clinicName,
      dueDate: ack.dueDate,
    };
  });

  const documentsNeedingAttention = published
    .map((policy) => {
      const related = acknowledgments.filter((ack) => ack.policyId === policy.id);
      const done = related.filter((ack) => !!ack.acknowledgedAt).length;
      const overdueCount = related.filter((ack) => !ack.acknowledgedAt && isOverdue(ack.dueDate, DEMO_TODAY)).length;
      const rate = related.length ? Math.round((done / related.length) * 100) : 0;
      return { policy, relatedCount: related.length, overdueCount, rate };
    })
    .filter((item) => item.relatedCount > 0)
    .sort((a, b) => b.overdueCount - a.overdueCount || a.rate - b.rate)
    .slice(0, 5);

  return { published, drafts, pending, overdue, completionRate, clinicStats, topFollowUps, documentsNeedingAttention };
}
