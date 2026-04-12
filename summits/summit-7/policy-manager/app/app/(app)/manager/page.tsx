"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { useApp } from "@/lib/app-context";
import { dueLabel, formatDate, isOverdue } from "@/lib/date-utils";
import { getManagerSnapshot } from "@/lib/metrics";

export default function ManagerDashboardPage() {
  const { policies, acknowledgments, clinics, users, clinicDisplay, presetLabel, locationLabel,
  } = useApp();
  const [selectedClinic, setSelectedClinic] = useState("all");

  const snapshot = getManagerSnapshot(policies, acknowledgments, clinics, locationLabel, users);
  const staffUsers = users.filter((user) => user.role === "staff");

  const policyRollout = useMemo(
    () =>
      snapshot.published
        .filter((policy) => (selectedClinic === "all" ? true : policy.clinics.includes(selectedClinic)))
        .map((policy) => {
          const policyAcks = acknowledgments.filter((ack) => ack.policyId === policy.id);
          const done = policyAcks.filter((ack) => !!ack.acknowledgedAt).length;
          const total = policyAcks.length;
          const overdue = policyAcks.filter((ack) => !ack.acknowledgedAt && isOverdue(ack.dueDate)).length;
          return { policy, done, total, overdue };
        })
        .filter((item) => item.total > 0)
        .sort((a, b) => b.overdue - a.overdue || a.done / a.total - b.done / b.total),
    [acknowledgments, selectedClinic, snapshot.published]
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow={`${presetLabel} · Manager console`}
        title="Rollout and compliance dashboard"
        description="This now reads like a true operator console with vertical-specific rollout health, ${locationLabel.toLowerCase()} pressure points, people to chase, and draft readiness in one place."
        action={<Link href="/policy/new" className="btn-primary">+ Create policy</Link>}
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Published" value={snapshot.published.length} sublabel="Currently live" />
        <StatCard label="Drafts" value={snapshot.drafts.length} sublabel="Need review or publishing" tone={snapshot.drafts.length ? "warning" : "default"} />
        <StatCard label="Pending" value={snapshot.pending.length} sublabel="Outstanding acknowledgments" />
        <StatCard label="Overdue" value={snapshot.overdue.length} sublabel="Need direct follow-up" tone={snapshot.overdue.length ? "warning" : "default"} />
        <StatCard label="Completion" value={`${snapshot.completionRate}%`} sublabel="All assigned acknowledgments" tone="dark" />
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="card">
          <div className="mb-4 flex items-center justify-between"><div><h2>Draft queue</h2><p className="mt-1 text-sm text-slate-500">What a managing partner or ${locationLabel.toLowerCase()} lead would review before publish.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{snapshot.drafts.length} open</span></div>
          <div className="space-y-3">
            {snapshot.drafts.map((draft) => (
              <Link key={draft.id} href={`/policy/${draft.id}/edit`} className="block rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="font-semibold text-slate-900">{draft.title}</p><p className="mt-1 text-sm text-slate-500">{draft.category} · {clinicDisplay(draft.clinics)}</p><p className="mt-1 text-sm text-slate-600">Effective {formatDate(draft.effectiveDate)}</p></div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Draft</span>
                </div>
              </Link>
            ))}
            {snapshot.drafts.length === 0 ? <p className="text-sm text-slate-500">No drafts at the moment.</p> : null}
          </div>
        </section>

        <section className="card">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div><h2>Rollout status by document</h2><p className="mt-1 text-sm text-slate-500">Useful in a manager meeting because it tells a concrete follow-up story, not just a content story.</p></div>
            <select value={selectedClinic} onChange={(event) => setSelectedClinic(event.target.value)} className="input max-w-xs">
              <option value="all">All offices</option>
              {clinics.map((clinic) => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            {policyRollout.map(({ policy, done, total, overdue }) => {
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <Link key={policy.id} href={`/policy/${policy.id}`} className="block rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-200 hover:bg-slate-50">
                  <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div><p className="font-semibold text-slate-900">{policy.title}</p><p className="mt-1 text-sm text-slate-500">{clinicDisplay(policy.clinics)} · {policy.category}</p></div>
                    <div className="flex items-center gap-2 text-xs font-semibold"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{done}/{total} done</span>{overdue > 0 ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700">{overdue} overdue</span> : null}</div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${pct === 100 ? "bg-emerald-500" : overdue > 0 ? "bg-amber-500" : "bg-cyan-500"}`} style={{ width: `${pct}%` }} /></div>
                </Link>
              );
            })}
            {policyRollout.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">No published documents with acknowledgments match this ${locationLabel.toLowerCase()} filter yet.</div> : null}
          </div>
        </section>
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="card">
          <div className="mb-4"><h2>Top follow-up list</h2><p className="mt-1 text-sm text-slate-500">Exactly who needs a nudge next.</p></div>
          <div className="space-y-3">
            {snapshot.topFollowUps.map((item) => <div key={item.id} className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4"><p className="font-semibold text-slate-900">{item.userName}</p><p className="mt-1 text-sm text-slate-500">{item.clinicName}</p><p className="mt-2 text-sm text-slate-700">Still outstanding: {item.policyTitle}</p><p className="mt-1 text-sm text-rose-700">Due {formatDate(item.dueDate)} · {dueLabel(item.dueDate)}</p></div>)}
            {snapshot.topFollowUps.length === 0 ? <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-4 py-6 text-sm text-emerald-700">No overdue follow-ups. Rollout is clean right now.</div> : null}
          </div>
        </section>

        <section className="card">
          <div className="mb-4"><h2>{locationLabel} rollout heatmap</h2><p className="mt-1 text-sm text-slate-500">Quick visibility into which ${locationLabel.toLowerCase()} is smooth and which ${locationLabel.toLowerCase()} is sticky.</p></div>
          <div className="space-y-3">
            {snapshot.clinicStats.map((item) => <div key={item.clinic.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-900">{item.clinic.name}</p><p className="mt-1 text-sm text-slate-500">{item.clinicPolicies} live docs · {item.clinicPending} pending acknowledgments</p></div><div className="flex items-center gap-2 text-xs font-semibold"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{item.rate}% complete</span>{item.clinicOverdue > 0 ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700">{item.clinicOverdue} overdue</span> : <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">On track</span>}</div></div></div>)}
          </div>
        </section>
      </div>

      <section className="card overflow-x-auto">
        <div className="mb-4"><h2>Staff compliance snapshot</h2><p className="mt-1 text-sm text-slate-500">Shows who a manager would actually chase and where operational friction sits.</p></div>
        <table className="w-full min-w-[640px] text-sm">
          <thead><tr className="border-b border-slate-200 text-left text-slate-500"><th className="px-3 py-2 font-medium">Staff member</th><th className="px-3 py-2 font-medium">Offices</th><th className="px-3 py-2 font-medium">Pending</th><th className="px-3 py-2 font-medium">Completed</th><th className="px-3 py-2 font-medium">Overdue</th></tr></thead>
          <tbody>
            {staffUsers.map((user) => {
              const userAcks = acknowledgments.filter((ack) => ack.userId === user.id);
              const pending = userAcks.filter((ack) => !ack.acknowledgedAt).length;
              const completed = userAcks.filter((ack) => !!ack.acknowledgedAt).length;
              const overdue = userAcks.filter((ack) => !ack.acknowledgedAt && isOverdue(ack.dueDate)).length;
              return <tr key={user.id} className="border-b border-slate-100"><td className="px-3 py-3 font-medium text-slate-900">{user.name}</td><td className="px-3 py-3 text-slate-500">{clinicDisplay(user.clinics)}</td><td className="px-3 py-3 text-slate-700">{pending}</td><td className="px-3 py-3 text-slate-700">{completed}</td><td className="px-3 py-3">{overdue > 0 ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">{overdue}</span> : <span className="text-slate-300">0</span>}</td></tr>;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
