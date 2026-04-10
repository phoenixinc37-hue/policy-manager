"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { useApp } from "@/lib/app-context";
import { getPolicy } from "@/lib/mock-data";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";

export default function AcknowledgmentsPage() {
  const { currentUser, acknowledgments, acknowledgePolicy } = useApp();

  const userAcks = acknowledgments.filter((a) => a.userId === currentUser.id);
  const pending = userAcks.filter((a) => !a.acknowledgedAt);
  const completed = userAcks
    .filter((a) => !!a.acknowledgedAt)
    .sort((a, b) => (b.acknowledgedAt ?? "").localeCompare(a.acknowledgedAt ?? ""));

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="My Acknowledgments"
        description="Track your required reads and completed acknowledgments."
      />

      {/* Pending */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2">
          Pending
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
            {pending.length}
          </span>
        </h2>
        {pending.length === 0 ? (
          <div className="card text-center py-6">
            <p className="text-gray-400">You&apos;re all caught up. No pending acknowledgments.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((ack) => {
              const pol = getPolicy(ack.policyId);
              if (!pol) return null;
              return (
                <div
                  key={ack.id}
                  className="card border-l-4 border-l-amber-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className={TYPE_BADGE_CLASS[pol.type]}>{TYPE_LABELS[pol.type]}</span>
                    <Link href={`/policy/${pol.id}`}>
                      <p className="font-medium text-gray-900 mt-1 hover:text-brand-600">
                        {pol.title}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {pol.category} · Due {ack.dueDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/policy/${pol.id}`} className="btn-secondary text-xs whitespace-nowrap">
                      Read Policy
                    </Link>
                    <button
                      onClick={() => acknowledgePolicy(pol.id)}
                      className="btn-primary text-xs whitespace-nowrap"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Completed */}
      <section>
        <h2 className="mb-3">Completed</h2>
        {completed.length === 0 ? (
          <div className="card text-center py-6">
            <p className="text-gray-400">No completed acknowledgments yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completed.map((ack) => {
              const pol = getPolicy(ack.policyId);
              if (!pol) return null;
              return (
                <div
                  key={ack.id}
                  className="card border-l-4 border-l-green-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className={TYPE_BADGE_CLASS[pol.type]}>{TYPE_LABELS[pol.type]}</span>
                    <Link href={`/policy/${pol.id}`}>
                      <p className="font-medium text-gray-900 mt-1 hover:text-brand-600">
                        {pol.title}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {pol.category} · Acknowledged {ack.acknowledgedAt}
                    </p>
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Done
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
