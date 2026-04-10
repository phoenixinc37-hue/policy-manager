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
        description="This demo is tuned to show what matters fast: what changed, what needs acknowledgment, and where managers still need to act."
        action={
          isManager ? (
            <Link href="/policy/new" className="btn-primary">+ Create policy</Link>
          ) : undefined
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending reads" value={pendingAcks.length} sublabel="Items assigned to you" tone={pendingAcks.length ? "warning" : "default"} />
        <StatCard label="Visible documents" value={visiblePolicies.length} sublabel="Policies, SOGs, and info updates" />
        <StatCard label="Completed acknowledgments" value={completedAcks.length} sublabel="Confirmed by this persona" tone="success" />
        <StatCard label="Assigned clinics" value={currentUser.clinics.length} sublabel={clinicDisplay(currentUser.clinics)} tone="dark" />
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="card">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2>Required reads</h2>
              <p className="mt-1 text-sm text-slate-500">A clear acknowledgement queue for the current user persona.</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Demo notes</p>
          <h2 className="mt-3 text-white">Role switcher is live</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Use the sidebar to flip between Scott as practice manager and front-line staff personas. Acknowledgment state updates in-session.
          </p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Best demo path</p>
              <p className="mt-1 text-slate-300">Homepage → Dashboard → Library → Policy detail → Acknowledge → Manager → Edit/Create.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Seeded organization</p>
              <p className="mt-1 text-slate-300">Rosslyn Veterinary Clinic, Tudor Glen Veterinary Hospital, and Rosslyn Park Animal Hospital.</p>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2>Recent updates</h2>
            <p className="mt-1 text-sm text-slate-500">Latest clinic-wide changes visible to this user.</p>
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
