"use client";

import Link from "next/link";
import { documents } from "../data";
import { CabinetGraphic } from "../cabinet";

const dateRanges = [30, 60, 180, 365] as const;

export default function CompletionPage({ searchParams }: { searchParams?: { days?: string } }) {
  const selectedDays = dateRanges.includes(Number(searchParams?.days) as 30 | 60 | 180 | 365)
    ? Number(searchParams?.days)
    : 30;

  const cutoff = new Date("2026-04-28T12:00:00Z");
  cutoff.setUTCDate(cutoff.getUTCDate() - selectedDays);

  const completed = documents.filter((doc) => {
    if (!(doc.assignedTo.length > 0 && doc.acknowledgedBy.length === doc.assignedTo.length && doc.completedDate)) {
      return false;
    }
    return new Date(doc.completedDate) >= cutoff;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Firm Completion</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={whiteButtonLink}>Circulating</Link>
            <Link href="/pending" style={whiteButtonLink}>Pending</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
            <Link href="/create" style={whiteButtonLink}>Create</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Firm Completion</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>All fully circulated documents across the firm.</p>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div style={{ fontSize: 14, color: "#64748b", fontWeight: 700 }}>Show completed items from the last:</div>
              <select
                value={selectedDays}
                onChange={(event) => {
                  window.location.href = `/completion?days=${event.target.value}`;
                }}
                style={rangeSelect}
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={tableHeader}>
                <div>Type</div>
                <div>Title</div>
                <div>Team</div>
                <div>Completed</div>
                <div>Actions</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {completed.map((doc, idx) => (
                  <div key={doc.id} style={{ ...tableRow, borderBottom: idx === completed.length - 1 ? "none" : "1px solid #e2e8f0" }}>
                    <div>
                      {doc.type === "Policy" && <span style={{ ...typeBadge, background: "#dcfce7", color: "#166534" }}>POLICY</span>}
                      {doc.type === "SOG" && <span style={{ ...typeBadge, background: "#e0f2fe", color: "#0369a1" }}>SOG</span>}
                      {doc.type === "Memo" && <span style={{ ...typeBadge, background: "#f3f4f6", color: "#475569" }}>MEMO</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Link href={`/policy-index/document/${doc.id}`} style={actionButtonLink}>Open</Link>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{doc.title}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>{doc.team}</div>
                    <div style={{ fontSize: 13, color: "#1f7a37", fontWeight: 700 }}>{doc.completedDate}</div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Link href={`/completion/history/${doc.id}`} style={actionButtonLink}>Version history</Link>
                      <Link href={`/completion/review/${doc.id}`} style={actionButtonLink}>Review</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#ffffff",
  border: "1px solid #dbe7de",
  borderRadius: 18,
  padding: "18px 22px",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  gap: 16,
  flexWrap: "wrap" as const,
};

const panelCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 22,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "120px 1.4fr 160px 140px 220px",
  gap: 16,
  padding: "12px 20px",
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  fontSize: 12,
  fontWeight: 700,
  color: "#475569",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "120px 1.4fr 160px 140px 220px",
  gap: 16,
  padding: "16px 20px",
  alignItems: "center",
  background: "#ffffff",
};

const typeBadge = {
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};

const actionButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};

const rangeSelect = {
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
  background: "#ffffff",
  color: "#1f5d24",
};
