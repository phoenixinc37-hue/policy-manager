"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPolicy, getUser, clinicDisplay } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { TYPE_LABELS, TYPE_BADGE_CLASS } from "@/types";
import PageHeader from "@/components/ui/PageHeader";

export default function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser, acknowledgments, acknowledgePolicy, isManager } = useApp();

  const policy = getPolicy(id);
  if (!policy) {
    return (
      <div className="max-w-3xl">
        <PageHeader title="Policy Not Found" />
        <p className="text-gray-500">This policy does not exist.</p>
        <Link href="/library" className="btn-primary mt-4 inline-block">
          Back to Library
        </Link>
      </div>
    );
  }

  const author = getUser(policy.createdBy);
  const userAck = acknowledgments.find(
    (a) => a.policyId === policy.id && a.userId === currentUser.id
  );
  const isAcknowledged = !!userAck?.acknowledgedAt;
  const needsAck = !!userAck && !userAck.acknowledgedAt;

  const handleAcknowledge = () => {
    acknowledgePolicy(policy.id);
  };

  // Simple markdown-ish rendering: headings, bold, lists, tables
  const renderBody = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="text-left px-3 py-2 border-b-2 border-gray-200 font-medium text-gray-700">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, ri) => (
                  <tr key={ri} className="border-b border-gray-100">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-gray-600">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Table detection
      if (line.startsWith("|")) {
        inTable = true;
        tableRows.push(line.split("|").filter(Boolean));
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={i} className="font-semibold text-gray-800 mt-3 mb-1">
            {line.slice(2, -2)}
          </p>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <p key={i} className="text-gray-700 pl-4 mb-1">
            {line}
          </p>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <p key={i} className="text-gray-700 pl-4 mb-1">
            <span className="text-gray-400 mr-2">&#8226;</span>
            {line.slice(2)}
          </p>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(
          <p key={i} className="text-gray-700 mb-1">{line}</p>
        );
      }
    }
    if (inTable) flushTable();
    return elements;
  };

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/library" className="hover:text-gray-600">
          Library
        </Link>
        <span>/</span>
        <span className="text-gray-600">{policy.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={TYPE_BADGE_CLASS[policy.type]}>
            {TYPE_LABELS[policy.type]}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            policy.status === "published"
              ? "bg-green-100 text-green-700"
              : policy.status === "draft"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
          </span>
          <span className="text-xs text-gray-400">v{policy.version}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{policy.title}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>{clinicDisplay(policy.clinics)}</span>
          <span>{policy.category}</span>
          <span>Effective {policy.effectiveDate}</span>
          {policy.reviewDate && <span>Review by {policy.reviewDate}</span>}
        </div>
        {author && (
          <p className="text-xs text-gray-400 mt-2">
            Created by {author.name} · Last updated {policy.updatedAt}
          </p>
        )}
      </div>

      {/* Acknowledgment bar */}
      {userAck && (
        <div
          className={`card mb-6 border-l-4 ${
            isAcknowledged ? "border-l-green-400" : "border-l-amber-400"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {isAcknowledged ? (
              <>
                <div>
                  <p className="font-medium text-green-700">Acknowledged</p>
                  <p className="text-xs text-gray-400">
                    You confirmed reading this on {userAck.acknowledgedAt}
                  </p>
                </div>
                <span className="text-green-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </>
            ) : (
              <>
                <div>
                  <p className="font-medium text-amber-700">Acknowledgment Required</p>
                  <p className="text-xs text-gray-400">
                    Due by {userAck.dueDate}
                  </p>
                </div>
                <button onClick={handleAcknowledge} className="btn-primary text-sm">
                  I Have Read &amp; Understood
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Manager actions */}
      {isManager && (
        <div className="flex gap-2 mb-6">
          <Link href={`/policy/${policy.id}/edit`} className="btn-secondary text-sm">
            Edit Policy
          </Link>
          <button className="btn-secondary text-sm">View Version History</button>
          <Link href="/manager" className="btn-secondary text-sm">
            Acknowledgment Tracking
          </Link>
        </div>
      )}

      {/* Body */}
      <div className="card">
        <div className="prose-sm">{renderBody(policy.body)}</div>
      </div>
    </div>
  );
}
