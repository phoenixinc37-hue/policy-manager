"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { policies, users, acknowledgments, clinics, clinicDisplay } from "@/lib/mock-data";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";

export default function ManagerDashboardPage() {
  const [selectedClinic, setSelectedClinic] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const published = policies.filter((p) => p.status === "published");
  const drafts = policies.filter((p) => p.status === "draft");
  const staffUsers = users.filter((u) => u.role === "staff");
  const pendingAcks = acknowledgments.filter((a) => !a.acknowledgedAt);
  const completedAcks = acknowledgments.filter((a) => !!a.acknowledgedAt);
  const overdueAcks = pendingAcks.filter((a) => a.dueDate < "2026-04-08");

  // Acknowledgment tracking per policy
  const policyAckSummary = published
    .filter((p) => {
      if (selectedClinic !== "all" && !p.clinics.includes(selectedClinic)) return false;
      if (selectedType !== "all" && p.type !== selectedType) return false;
      return true;
    })
    .map((p) => {
      const pAcks = acknowledgments.filter((a) => a.policyId === p.id);
      const done = pAcks.filter((a) => !!a.acknowledgedAt).length;
      const total = pAcks.length;
      const overdue = pAcks.filter((a) => !a.acknowledgedAt && a.dueDate < "2026-04-08").length;
      return { policy: p, done, total, overdue };
    })
    .filter((s) => s.total > 0);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Manager Dashboard"
        description="Track acknowledgments, manage policies, and monitor compliance across your clinics."
        action={
          <Link href="/policy/new" className="btn-primary">+ New Policy</Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Published" value={published.length} sublabel="Active policies" />
        <StatCard label="Drafts" value={drafts.length} sublabel="In progress" />
        <StatCard label="Staff" value={staffUsers.length} sublabel="Active members" />
        <StatCard label="Pending" value={pendingAcks.length} sublabel="Awaiting acknowledgment" />
        <StatCard label="Overdue" value={overdueAcks.length} sublabel="Past due date" />
      </div>

      {/* Drafts section */}
      {drafts.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3">Drafts Pending Review</h2>
          <div className="space-y-2">
            {drafts.map((d) => (
              <Link key={d.id} href={`/policy/${d.id}`} className="card block hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={TYPE_BADGE_CLASS[d.type]}>{TYPE_LABELS[d.type]}</span>
                    <p className="font-medium text-gray-900 mt-1">{d.title}</p>
                    <p className="text-xs text-gray-400">{d.category} · Created {d.createdAt}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Draft</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Acknowledgment Tracking */}
      <div className="mb-6">
        <h2 className="mb-3">Acknowledgment Tracking</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="px-3 py-1.5 border border-surface-border rounded-lg text-sm bg-white"
          >
            <option value="all">All Clinics</option>
            {clinics.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 border border-surface-border rounded-lg text-sm bg-white"
          >
            <option value="all">All Types</option>
            <option value="policy">Administrative Policy</option>
            <option value="sog">SOG</option>
            <option value="info">Communication Info</option>
          </select>
        </div>

        <div className="space-y-3">
          {policyAckSummary.map(({ policy, done, total, overdue }) => (
            <Link key={policy.id} href={`/policy/${policy.id}`} className="card block hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={TYPE_BADGE_CLASS[policy.type]}>{TYPE_LABELS[policy.type]}</span>
                    {overdue > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        {overdue} overdue
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 truncate">{policy.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {clinicDisplay(policy.clinics)} · {policy.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{done}/{total}</p>
                    <p className="text-xs text-gray-400">acknowledged</p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        done === total ? "bg-green-500" : overdue > 0 ? "bg-amber-500" : "bg-brand-500"
                      }`}
                      style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {policyAckSummary.length === 0 && (
            <p className="text-sm text-gray-400 py-4">No policies match the selected filters.</p>
          )}
        </div>
      </div>

      {/* Staff acknowledgment breakdown */}
      <div className="mb-8">
        <h2 className="mb-3">Staff Compliance Overview</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 py-2 font-medium text-gray-600">Staff Member</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Role</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Pending</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Completed</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Overdue</th>
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((u) => {
                const userAcks = acknowledgments.filter((a) => a.userId === u.id);
                const pending = userAcks.filter((a) => !a.acknowledgedAt).length;
                const done = userAcks.filter((a) => !!a.acknowledgedAt).length;
                const overdue = userAcks.filter((a) => !a.acknowledgedAt && a.dueDate < "2026-04-08").length;
                return (
                  <tr key={u.id} className="border-b border-gray-50">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {u.initials}
                        </div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 capitalize">{u.role}</td>
                    <td className="px-3 py-2.5 text-center">
                      {pending > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">{pending}</span>
                      ) : (
                        <span className="text-gray-300">0</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center text-gray-600">{done}</td>
                    <td className="px-3 py-2.5 text-center">
                      {overdue > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-semibold">{overdue}</span>
                      ) : (
                        <span className="text-gray-300">0</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
