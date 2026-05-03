"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLeadershipStats } from "../data";
import { CabinetGraphic } from "../cabinet";
import { loadCirculatingDrafts, loadApprovalDrafts, type SavedDraftRecord } from "../create/ai-assistant/draftStorage";

const statusCards = [
  {
    title: "Circulating documents",
    text: "Active items, awaiting acknowledgement, and overdue.",
    button: "View circulation",
  },
  {
    title: "Pending approval",
    text: "Documents waiting for leadership review or comments.",
    button: "View approvals",
  },
  {
    title: "Firm completion",
    text: "Overall acknowledgement across teams and documents.",
    button: "View report",
  },
  {
    title: "Library",
    text: "Access all published policies, SOGs, and memos.",
    button: "View library",
  },
];

export default function ManagerPage() {
  const stats = getLeadershipStats();
  const [circulatingDocs, setCirculatingDocs] = useState<SavedDraftRecord[]>([]);
  const [pendingApprovalDocs, setPendingApprovalDocs] = useState<SavedDraftRecord[]>([]);

  useEffect(() => {
    // Aggressive read loop to guarantee storage sync
    function forceLoad() {
      const circ = loadCirculatingDrafts();
      const pend = loadApprovalDrafts();
      setCirculatingDocs(circ);
      setPendingApprovalDocs(pend);
    }
    forceLoad();
    const interval = setInterval(forceLoad, 500);
    return () => clearInterval(interval);
  }, []);

  const pendingApprovalDoc = pendingApprovalDocs.length > 0 ? pendingApprovalDocs[0] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic rows={3} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Leadership View</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={whiteButtonLink}>Home</Link>
            <Link href="/teamview" style={whiteButtonLink}>Team View</Link>
            <Link href="/approval" style={whiteButtonLink}>Approval</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 22 }}>
          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Create new policy, SOG, or memo</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>Start a new document and assign it to your team.</p>
              </div>
              <Link href="/create" style={whiteButtonLink}>Create New</Link>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Check document status</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>Review circulation, approvals, and items requiring attention.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
              {statusCards.map((card) => (
                <div key={card.title} style={statusCard}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{card.title}</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 16 }}>{card.text}</div>
                  <Link href={card.button === "View circulation" ? "/status" : card.button === "View approvals" ? "/approval" : card.button === "View report" ? "/completion" : "/policy-index"} style={whiteWideButtonLink}>{card.button}</Link>
                </div>
              ))}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Quick View</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>A preview of the selected status area. Full details live on their own pages.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 22 }}>
              <div style={quickViewMainCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20 }}>Circulating documents</div>
                    <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Current active items and acknowledgement progress.</div>
                  </div>
                  <span style={{ fontWeight: 800, color: "#1f5d24", fontSize: 14 }}>View circulating</span>
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                  {circulatingDocs.length === 0 ? (
                    <div style={{ fontSize: 14, color: "#60766b" }}>No active circulating documents.</div>
                  ) : (
                    circulatingDocs.slice(0, 2).map((doc) => {
                      const assignedCount = doc.circulationTargets ? doc.circulationTargets.length : 0;
                      const ackCount = 0; // Acknowledgment not wired yet
                      const progress = assignedCount > 0 ? Math.round((ackCount / assignedCount) * 100) : 0;
                      const remaining = assignedCount - ackCount;
                      return (
                        <div key={doc.id}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 14 }}>
                            <span><strong>{doc.documentType} - {doc.title}</strong></span>
                            <span>{ackCount} / {assignedCount} acknowledged</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, fontSize: 13, color: "#60766b" }}>
                            <span>Targets: {doc.circulationTargets ? doc.circulationTargets.join(", ") : "None"}</span>
                            <span>{`Awaiting ${remaining}`}</span>
                          </div>
                          <div style={progressTrack}><div style={{ ...progressFill, width: `${progress}%` }} /></div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Pending approval</div>
                    <Link href="/approval" style={quickLinkText}>View approval</Link>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Documents waiting for leadership review.</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#1f5d24", marginTop: 14 }}>{pendingApprovalDocs.length}</div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <div style={{ fontWeight: 700 }}>{pendingApprovalDoc?.title ?? "No pending documents"}</div>
                    <div style={{ color: "#60766b", marginTop: 4 }}>{pendingApprovalDoc ? "Awaiting partner approval" : "All approvals up to date"}</div>
                  </div>
                </div>

                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Firm completion</div>
                    <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: 14 }}>View firm complete</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Overall acknowledgement status.</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#1f5d24", marginTop: 14 }}>{stats.overallCompletion}%</div>
                  <div style={{ ...progressTrack, marginTop: 14 }}><div style={{ ...progressFill, width: `${stats.overallCompletion}%` }} /></div>
                </div>

                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Library</div>
                    <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: 14 }}>View library</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Recently published documents.</div>
                  <div style={{ marginTop: 14, fontSize: 14, color: "#10221a" }}>Latest: No published documents yet</div>
                </div>
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

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  display: "inline-block",
};

const whiteWideButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  border: "1px solid #dbe7de",
  borderRadius: 10,
  padding: "12px 14px",
  fontWeight: 700,
  fontSize: 14,
  width: "100%",
  display: "block",
  boxSizing: "border-box" as const,
  textAlign: "center" as const,
};

const statusCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const quickViewMainCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const quickSideCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const alertBadge = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#fff3d9",
  color: "#9a6700",
  fontSize: 12,
  fontWeight: 800,
};

const progressTrack = {
  height: 10,
  background: "#e7efe9",
  borderRadius: 999,
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#2e7d32",
};

const quickLinkText = {
  color: "#2e7d32",
  fontWeight: 700,
  fontSize: 14,
  textDecoration: "none",
};
