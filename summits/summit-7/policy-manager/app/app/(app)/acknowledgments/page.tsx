"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { useApp } from "@/lib/app-context";
import { clinicDisplay } from "@/lib/mock-data";

export default function AcknowledgmentsPage() {
  const { currentUser, acknowledgments, policies, acknowledgePolicy } = useApp();

  const userAcks = acknowledgments.filter((ack) => ack.userId === currentUser.id);
  const pending = userAcks.filter((ack) => !ack.acknowledgedAt).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const completed = userAcks.filter((ack) => !!ack.acknowledgedAt).sort((a, b) => (b.acknowledgedAt ?? "").localeCompare(a.acknowledgedAt ?? ""));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Acknowledgments"
        title="My acknowledgments"
        description="A believable staff queue: what still needs review, what has already been acknowledged, and which clinic each item belongs to."
      />

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2>Pending</h2>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{pending.length}</span>
        </div>
        <div className="space-y-3">
          {pending.length === 0 ? <div className="card text-sm text-slate-500">Nothing pending for this persona.</div> : null}
          {pending.map((ack) => {
            const policy = policies.find((item) => item.id === ack.policyId);
            if (!policy) return null;
            const overdue = ack.dueDate < "2026-04-09";
            return (
              <div key={ack.id} className={`card ${overdue ? "border-rose-200 bg-rose-50/70" : "border-amber-200 bg-amber-50/70"}`}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-policy capitalize">{policy.type}</span>
                      {overdue ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">Overdue</span> : null}
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{policy.title}</p>
                    <p className="mt-1 text-sm text-slate-500">Due {ack.dueDate} · {clinicDisplay(policy.clinics)} · {policy.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/policy/${policy.id}`} className="btn-secondary">Read</Link>
                    <button onClick={() => acknowledgePolicy(policy.id)} className="btn-primary">Acknowledge</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2>Completed</h2>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{completed.length}</span>
        </div>
        <div className="space-y-3">
          {completed.length === 0 ? <div className="card text-sm text-slate-500">No completed acknowledgments yet.</div> : null}
          {completed.map((ack) => {
            const policy = policies.find((item) => item.id === ack.policyId);
            if (!policy) return null;
            return (
              <div key={ack.id} className="card border-emerald-200 bg-emerald-50/60">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{policy.title}</p>
                    <p className="mt-1 text-sm text-slate-500">Acknowledged {ack.acknowledgedAt} · {clinicDisplay(policy.clinics)}</p>
                  </div>
                  <Link href={`/policy/${policy.id}`} className="text-sm font-medium text-emerald-700">View document</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
