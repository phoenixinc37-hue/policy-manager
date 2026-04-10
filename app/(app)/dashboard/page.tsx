"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import PolicyCard from "@/components/ui/PolicyCard";
import { useApp } from "@/lib/app-context";
import { clinicDisplay } from "@/lib/mock-data";

export default function DashboardPage() {
  const { currentUser, acknowledgments, acknowledgePolicy, isManager, policies } = useApp();

  const visiblePolicies = policies.filter((policy) =>
    policy.clinics.some((clinicId) => currentUser.clinics.includes(clinicId)) &&
    (isManager || policy.status === "published")
  );
  const pendingAcks = acknowledgments.filter((ack) => ack.userId === currentUser.id && !ack.acknowledgedAt);
  const completedAcks = acknowledgments.filter((ack) => ack.userId === currentUser.id && !!ack.acknowledgedAt);
  const recentItems = [...visiblePolicies].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);
  const overdue = pendingAcks.filter((ack) => ack.dueDate < "2026-04-09");

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={isManager ? "Manager workspace" : "Staff workspace"}
        title={`Good evening, ${currentUser.name.split(" ")[0]}.`}
        description="Built to answer the first real clinic questions fast: what changed, who still needs to read it, and where a manager needs to intervene today."
        action={
          isManager ? (
            <Link href="/policy/new" className="btn-primary">+ Create policy</Link>
          ) : undefined
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending reads" value={pendingAcks.length} sublabel="Assigned to this persona" tone={pendingAcks.length ? "warning" : "default"} />
        <StatCard label="Visible documents" value={visiblePolicies.length} sublabel="Policies, SOGs, and ops updates" />
        <StatCard label="Completed acknowledgments" value={completedAcks.length} sublabel="Already confirmed in demo" tone="success" />
        <StatCard label="Assigned clinics" value={currentUser.clinics.length} sublabel={clinicDisplay(currentUser.clinics)} tone="dark" />
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="card">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2>Required reads</h2>
              <p className="mt-1 text-sm text-slate-500">A clean acknowledgment queue that feels like a real staff home screen.</p>
            </div>
            {overdue.length > 0 ? <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">{overdue.length} overdue</span> : null}
          </div>

          {pendingAcks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-4 py-6 text-sm text-emerald-700">
              Everything assigned to this persona has been acknowledged.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingAcks.map((ack) => {
                const policy = policies.find((item) => item.id === ack.policyId);
                if (!policy) return null;
                return (
                  <div key={ack.id} className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{policy.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{policy.category} · Due {ack.dueDate} · {clinicDisplay(policy.clinics)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/policy/${policy.id}`} className="btn-secondary">Open</Link>
                        <button onClick={() => acknowledgePolicy(policy.id)} className="btn-primary">Acknowledge</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="card bg-slate-950 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Sales framing</p>
          <h2 className="mt-3 text-white">CSI-first, product-second</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            This version is seeded to feel specific to CSI operations today while still proving the product can roll out across other Vet Inc. clinics with light retargeting.
          </p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Best demo path</p>
              <p className="mt-1 text-slate-300">Landing → Dashboard → Library → Policy detail → Acknowledge → Manager console → Edit/Create.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Seeded clinic set</p>
              <p className="mt-1 text-slate-300">Rosslyn Veterinary Clinic, Tudor Glen Veterinary Hospital, and Riverside Veterinary Clinic.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">What feels credible</p>
              <p className="mt-1 text-slate-300">Real roles, due dates, operational language, and clinic-specific updates instead of generic lorem-ipsum policies.</p>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2>Recent updates</h2>
            <p className="mt-1 text-sm text-slate-500">Latest live content visible to this persona.</p>
          </div>
          <Link href="/library" className="text-sm font-medium text-cyan-700">View full library</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {recentItems.map((item) => (
            <PolicyCard
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.type}
              category={item.category}
              clinic={clinicDisplay(item.clinics)}
              date={item.updatedAt}
              status={item.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
