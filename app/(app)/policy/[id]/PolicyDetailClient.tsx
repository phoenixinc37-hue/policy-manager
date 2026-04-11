"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { useApp } from "@/lib/app-context";
import { clinicDisplay, getUser } from "@/lib/mock-data";
import { TYPE_BADGE_CLASS, TYPE_LABELS } from "@/types";
import { dueLabel, formatDate, isOverdue } from "@/lib/date-utils";

function renderBody(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (!tableRows.length) return;
    elements.push(
      <div key={`table-${elements.length}`} className="my-4 overflow-x-auto rounded-3xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {tableRows[0].map((cell, index) => (
                <th key={index} className="px-3 py-2 text-left font-medium text-slate-600">{cell.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(2).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 text-slate-600">{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    inTable = false;
    tableRows = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith("|")) {
      inTable = true;
      tableRows.push(line.split("|").filter(Boolean));
      continue;
    }
    if (inTable) flushTable();

    if (line.startsWith("## ")) {
      elements.push(<h2 key={index} className="mt-6 text-lg font-semibold text-slate-950">{line.slice(3)}</h2>);
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(<p key={index} className="pl-4 text-slate-700">{line}</p>);
    } else if (line.startsWith("- ")) {
      elements.push(<p key={index} className="pl-4 text-slate-700">• {line.slice(2)}</p>);
    } else if (line.trim()) {
      elements.push(<p key={index} className="text-slate-700">{line}</p>);
    } else {
      elements.push(<div key={index} className="h-2" />);
    }
  }
  if (inTable) flushTable();
  return elements;
}

export default function PolicyDetailClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser, acknowledgments, acknowledgePolicy, isManager, getPolicyById } = useApp();

  const policy = getPolicyById(id);
  if (!policy) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Policy not found" description="The requested demo item does not exist." />
        <Link href="/library" className="btn-primary">Back to library</Link>
      </div>
    );
  }

  const author = getUser(policy.createdBy);
  const userAck = acknowledgments.find((ack) => ack.policyId === policy.id && ack.userId === currentUser.id);
  const policyAcks = acknowledgments.filter((ack) => ack.policyId === policy.id);
  const ackDone = policyAcks.filter((ack) => !!ack.acknowledgedAt).length;
  const ackTotal = policyAcks.length;
  const ackPct = ackTotal > 0 ? Math.round((ackDone / ackTotal) * 100) : 0;
  const ackOverdue = policyAcks.filter((ack) => !ack.acknowledgedAt && isOverdue(ack.dueDate)).length;
  const estimatedMinutes = Math.max(2, Math.ceil(policy.body.split(/\s+/).length / 180));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/library" className="hover:text-slate-600">Library</Link>
        <span>/</span>
        <span className="text-slate-600">{policy.title}</span>
      </div>

      <PageHeader
        eyebrow="Document detail"
        title={policy.title}
        description="A more beta-ready detail view with trust cues, rollout context, and obvious next actions for both staff and managers."
      />

      <div className="mb-6 grid gap-5 xl:grid-cols-[1fr_320px]">
        <section className="card">
          <div className="flex flex-wrap items-center gap-2">
            <span className={TYPE_BADGE_CLASS[policy.type]}>{TYPE_LABELS[policy.type]}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">{policy.status}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Version {policy.version}</span>
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">~{estimatedMinutes} min read</span>
            {ackOverdue > 0 ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">{ackOverdue} overdue acknowledgment{ackOverdue === 1 ? "" : "s"}</span> : null}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Clinics</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{clinicDisplay(policy.clinics)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Category</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{policy.category}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Effective date</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{formatDate(policy.effectiveDate)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Review date</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{policy.reviewDate ? formatDate(policy.reviewDate) : "Not scheduled"}</p>
            </div>
          </div>
          {policy.source?.mode === "imported" ? (
            <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Imported document trail</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <p><span className="text-slate-500">Source:</span> {policy.source.sourceLabel || policy.source.fileName || "Legacy clinic document"}</p>
                <p><span className="text-slate-500">Import status:</span> {policy.source.parseStatus === "parsed" ? "Readable text parsed" : "Staged for cleanup"}</p>
                {policy.source.fileName ? <p><span className="text-slate-500">Original file:</span> {policy.source.fileName}</p> : null}
                {policy.source.importedAt ? <p><span className="text-slate-500">Imported:</span> {formatDate(policy.source.importedAt)}</p> : null}
              </div>
              {policy.source.notes ? <p className="mt-2"><span className="text-slate-500">Manager notes:</span> {policy.source.notes}</p> : null}
            </div>
          ) : null}
          <p className="mt-4 text-xs text-slate-400">Created by {author?.name ?? "Unknown"} · Updated {formatDate(policy.updatedAt)}</p>
        </section>

        <aside className="surface-dark p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Action panel</p>
          {userAck ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{userAck.acknowledgedAt ? "Acknowledged" : "Acknowledgment required"}</p>
              <p className="mt-1 text-sm text-slate-300">{userAck.acknowledgedAt ? `Confirmed on ${formatDate(userAck.acknowledgedAt)}` : `Due ${formatDate(userAck.dueDate)} · ${dueLabel(userAck.dueDate)}`}</p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">No acknowledgment tracked for this persona.</div>
          )}
          {ackTotal > 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Rollout progress</p>
              <p className="mt-1 text-sm text-slate-300">{ackDone}/{ackTotal} acknowledged · {ackPct}% complete</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan-400" style={{ width: `${ackPct}%` }} />
              </div>
            </div>
          ) : null}
          {isManager ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">Manager read</p>
              <p className="mt-1">{ackOverdue > 0 ? "This document needs follow-up attention before you can call rollout clean." : "This document is rolling out cleanly so far."}</p>
            </div>
          ) : null}
          <div className="mt-4 flex flex-col gap-2">
            {!userAck?.acknowledgedAt && userAck ? <button onClick={() => acknowledgePolicy(policy.id)} className="btn-primary">I have read this</button> : null}
            {isManager ? <button onClick={() => router.push(`/policy/${policy.id}/edit`)} className="btn-secondary border-white/10 bg-white/5 text-white hover:bg-white/10">Edit policy</button> : null}
            <Link href="/library" className="btn-secondary border-white/10 bg-white/5 text-white hover:bg-white/10">Back to library</Link>
          </div>
        </aside>
      </div>

      <section className="card space-y-3 leading-7">
        {renderBody(policy.body)}
      </section>
    </div>
  );
}
