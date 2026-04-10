"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { useApp } from "@/lib/app-context";
import { clinicDisplay, getUser } from "@/lib/mock-data";
import { TYPE_BADGE_CLASS, TYPE_LABELS } from "@/types";

function renderBody(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (!tableRows.length) return;
    elements.push(
      <div key={`table-${elements.length}`} className="my-4 overflow-x-auto rounded-2xl border border-slate-200">
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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/library" className="hover:text-slate-600">Library</Link>
        <span>/</span>
        <span className="text-slate-600">{policy.title}</span>
      </div>

      <div className="mb-6 grid gap-5 xl:grid-cols-[1fr_300px]">
        <section className="card">
          <div className="flex flex-wrap items-center gap-2">
            <span className={TYPE_BADGE_CLASS[policy.type]}>{TYPE_LABELS[policy.type]}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{policy.status}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Version {policy.version}</span>
          </div>
          <h1 className="mt-4">{policy.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
            <span>{clinicDisplay(policy.clinics)}</span>
            <span>{policy.category}</span>
            <span>Effective {policy.effectiveDate}</span>
            {policy.reviewDate ? <span>Review by {policy.reviewDate}</span> : null}
          </div>
          <p className="mt-3 text-xs text-slate-400">Created by {author?.name ?? "Unknown"} · Updated {policy.updatedAt}</p>
        </section>

        <aside className="card bg-slate-950 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Action panel</p>
          {userAck ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{userAck.acknowledgedAt ? "Acknowledged" : "Acknowledgment required"}</p>
              <p className="mt-1 text-sm text-slate-300">{userAck.acknowledgedAt ? `Confirmed on ${userAck.acknowledgedAt}` : `Due ${userAck.dueDate}`}</p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">No acknowledgment tracked for this persona.</div>
          )}
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
