"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import PolicyCard from "@/components/ui/PolicyCard";
import { useApp } from "@/lib/app-context";
import { policies, clinicDisplay, getPolicy } from "@/lib/mock-data";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";

export default function DashboardPage() {
  const { currentUser, acknowledgments, acknowledgePolicy, isManager } = useApp();

  const userAcks = acknowledgments.filter((a) => a.userId === currentUser.id);
  const pendingAcks = userAcks.filter((a) => !a.acknowledgedAt);
  const publishedPolicies = policies.filter((p) => p.status === "published");

  // Recent items: latest 5 published policies the user's clinics can see
  const visiblePolicies = publishedPolicies.filter((p) =>
    p.clinics.some((c) => currentUser.clinics.includes(c))
  );
  const recentItems = [...visiblePolicies]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  const unreadCount = pendingAcks.length;
  const clinicCount = currentUser.clinics.length;

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${currentUser.name.split(" ")[0]}. Here's your policy overview.`}
        action={
          isManager ? (
            <Link href="/policy/new" className="btn-primary">+ New Policy</Link>
          ) : undefined
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Reads" value={unreadCount} sublabel="Requires your attention" />
        <StatCard label="Active Policies" value={visiblePolicies.length} sublabel="Visible to you" />
        <StatCard label="Clinics" value={clinicCount} sublabel="Your assigned clinics" />
        <StatCard
          label="Acknowledged"
          value={userAcks.filter((a) => !!a.acknowledgedAt).length}
          sublabel="Completed reads"
        />
      </div>

      {/* Required reads */}
      {pendingAcks.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-2">
            Required Reads
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
              {pendingAcks.length}
            </span>
          </h2>
          <div className="space-y-3">
            {pendingAcks.map((ack) => {
              const pol = getPolicy(ack.policyId);
              if (!pol) return null;
              return (
                <div key={ack.id} className="card border-l-4 border-l-amber-400">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className={TYPE_BADGE_CLASS[pol.type]}>{TYPE_LABELS[pol.type]}</span>
                      <Link href={`/policy/${pol.id}`} className="block">
                        <p className="font-medium text-gray-900 mt-1 hover:text-brand-600">
                          {pol.title}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {pol.category} · Due {ack.dueDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/policy/${pol.id}`} className="btn-secondary text-xs">
                        Read
                      </Link>
                      <button
                        onClick={() => acknowledgePolicy(pol.id)}
                        className="btn-primary text-xs"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent updates */}
      <div>
        <h2 className="mb-3">Recent Updates</h2>
        <div className="grid gap-3">
          {recentItems.map((item) => (
            <PolicyCard
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.type}
              category={item.category}
              clinic={clinicDisplay(item.clinics)}
              date={item.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
