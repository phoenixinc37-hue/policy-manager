"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import PolicyCard from "@/components/ui/PolicyCard";
import { useApp } from "@/lib/app-context";
import { DEMO_TODAY, dueLabel, formatDate, greetingForRole, isOverdue } from "@/lib/date-utils";
import { getVisiblePolicies, getUserCompletedAcks, getUserPendingAcks } from "@/lib/metrics";

export default function DashboardPage() {
  const { currentUser, acknowledgments, acknowledgePolicy, isManager, policies, workspaceMode, presetLabel, clinicDisplay, locationLabel,
  } = useApp();

  const visiblePolicies = getVisiblePolicies(policies, currentUser, isManager);
  const pendingAcks = getUserPendingAcks(acknowledgments, currentUser.id).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const completedAcks = getUserCompletedAcks(acknowledgments, currentUser.id);
  const recentItems = [...visiblePolicies].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);
  const overdue = pendingAcks.filter((ack) => isOverdue(ack.dueDate));
  const dueToday = pendingAcks.filter((ack) => ack.dueDate === DEMO_TODAY).length;
  const nextRequired = pendingAcks[0] ? policies.find((item) => item.id === pendingAcks[0].policyId) : null;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={`${presetLabel} · ${isManager ? "Manager workspace" : "Staff workspace"}`}
        title={`${greetingForRole()}, ${currentUser.name.split(" ")[0]}.`}
        description={workspaceMode === "blank" ? "Blank workspace is active. This is the clean-start experience a brand-new business would see before any seeded demo content exists." : `This ${presetLabel.toLowerCase()} dashboard shows an industry-specific staff and manager story with seeded documents, urgency, and next actions.`}
        action={isManager ? <Link href="/policy/new" className="btn-primary">+ Create policy</Link> : undefined}
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending reads" value={pendingAcks.length} sublabel={pendingAcks.length ? `${dueToday} due today · ${overdue.length} overdue` : "Nothing assigned right now"} tone={pendingAcks.length ? "warning" : "default"} />
        <StatCard label="Visible documents" value={visiblePolicies.length} sublabel="Policies, SOPs, and operational updates" />
        <StatCard label="Completed acknowledgments" value={completedAcks.length} sublabel="Already confirmed in this demo session" tone="success" />
        <StatCard label="Assigned offices" value={currentUser.clinics.length} sublabel={clinicDisplay(currentUser.clinics)} tone="dark" />
      </div>

      {workspaceMode === "blank" && policies.length === 0 ? (
        <div className="card mb-8 border-emerald-200 bg-emerald-50/70">
          <h2>Blank workspace is ready</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-900/80">This clean-start mode removes seeded demo data so a new business can see the real onboarding posture. The next best step is to create the first policy from the AI-assisted authoring flow.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/policy/new" className="btn-primary">Create first policy</Link>
            <Link href="/library" className="btn-secondary">Open empty library</Link>
          </div>
        </div>
      ) : null}

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="card">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2>Required reads</h2>
              <p className="mt-1 text-sm text-slate-500">Acknowledge what matters first. The queue surfaces urgency and next action clearly.</p>
            </div>
            {overdue.length > 0 ? <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">{overdue.length} overdue</span> : null}
          </div>
          {pendingAcks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-4 py-6 text-sm text-emerald-700">Everything assigned to this persona has been acknowledged. Switch personas from the left rail to see an active queue.</div>
          ) : (
            <div className="space-y-3">
              {pendingAcks.map((ack) => {
                const policy = policies.find((item) => item.id === ack.policyId);
                if (!policy) return null;
                const overdueItem = isOverdue(ack.dueDate);
                return (
                  <div key={ack.id} className={`rounded-2xl border p-4 ${overdueItem ? "border-rose-200 bg-rose-50/70" : ack.dueDate === DEMO_TODAY ? "border-amber-200 bg-amber-50/70" : "border-slate-200 bg-slate-50/80"}`}>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">{policy.title}</p>
                          {overdueItem ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">Overdue</span> : null}
                          {!overdueItem && ack.dueDate === DEMO_TODAY ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Due today</span> : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{policy.category} · {clinicDisplay(policy.clinics)}</p>
                        <p className="mt-1 text-sm text-slate-600">Due {formatDate(ack.dueDate)} · {dueLabel(ack.dueDate)}</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Next best demo step</p>
          <h2 className="mt-3 text-white">Show the {presetLabel.toLowerCase()} operator story</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">If demoing staff</p><p className="mt-1 text-slate-300">Open an assigned read, show effective dates and rollout context, then acknowledge it live.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">If demoing managers</p><p className="mt-1 text-slate-300">Jump to the manager console to show overdue staff, ${locationLabel.toLowerCase()} bottlenecks, and draft readiness.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">Right now</p><p className="mt-1 text-slate-300">{nextRequired ? `${nextRequired.title} is the next required read for this persona.` : "This persona is fully caught up."}</p></div>
          </div>
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div><h2>Recent updates</h2><p className="mt-1 text-sm text-slate-500">Latest live content visible to this persona.</p></div>
          <Link href="/library" className="text-sm font-medium text-cyan-700">View full library</Link>
        </div>
        {recentItems.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {recentItems.map((item) => <PolicyCard key={item.id} id={item.id} title={item.title} type={item.type} category={item.category} clinic={clinicDisplay(item.clinics)} date={item.updatedAt} status={item.status} />)}
          </div>
        ) : (
          <div className="card text-sm text-slate-500">No visible documents yet for this persona.</div>
        )}
      </section>
    </div>
  );
}
