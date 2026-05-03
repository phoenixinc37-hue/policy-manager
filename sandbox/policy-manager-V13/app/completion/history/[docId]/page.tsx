"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { CabinetGraphic } from "../../../cabinet";
import { loadLibraryDrafts, type SavedDraftRecord } from "../../../create/ai-assistant/draftStorage";
import { loadConfigSnapshot } from "../../../useSiteConfig";

export default function CompletionHistoryPage({ params }: { params: { docId: string } }) {
  const [doc, setDoc] = useState<SavedDraftRecord | null>(null);
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    function forceLoad() {
      const libraryDocs = loadLibraryDrafts();
      setDoc(libraryDocs.find((item) => item.id === params.docId) || null);
      setConfig(loadConfigSnapshot());
    }
    forceLoad();
    const interval = setInterval(forceLoad, 500);
    return () => clearInterval(interval);
  }, [params.docId]);

  const levelsById = useMemo(() => new Map((config.accessLevels || []).map((level: any) => [level.id, level])), [config.accessLevels]);
  const sitesById = useMemo(() => new Map((config.siteLocations || []).map((site: any) => [site.id, site])), [config.siteLocations]);

  if (!doc || !config.personnel) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", padding: 24, fontFamily: "Arial, sans-serif" }}>
        <Link href="/completion" style={primaryButton}>Back to Firm Completion</Link>
        <div style={{ maxWidth: 900, margin: "24px auto 0", background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Document not found.</div>
      </div>
    );
  }

  const reviewers = doc.reviewers || [];
  const circulationTargets = doc.circulationTargets || [];
  const acknowledgments = doc.acknowledgments || {};

  const creationTime = new Date(doc.savedAt).toLocaleString();
  const approvalTime = doc.approvalCompletedAt ? new Date(doc.approvalCompletedAt).toLocaleString() : "N/A";
  const circulatedTime = doc.circulatedAt ? new Date(doc.circulatedAt).toLocaleString() : "N/A";
  const completedTime = doc.completedAt ? new Date(doc.completedAt).toLocaleString() : "N/A";

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Version History</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>{doc.title}</div>
            </div>
          </div>
          <Link href="/completion" style={primaryButton}>Back to Firm Completion</Link>
        </header>

        <main style={{ display: "grid", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Policy summary</div>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={summaryRow}><strong>Title:</strong> {doc.title}</div>
              <div style={summaryRow}><strong>Type:</strong> {doc.documentType}</div>
              <div style={summaryRow}><strong>Version:</strong> {doc.version}</div>
              <div style={summaryRow}><strong>Author:</strong> {doc.author}</div>
              <div style={summaryRow}><strong>Review timeline:</strong> {doc.reviewTimeline}</div>
              <div style={summaryBlock}><strong>Purpose:</strong> {doc.purpose}</div>
              <div style={summaryBlock}><strong>Policy statement:</strong> {doc.policyStatement}</div>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Timeline of events</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={timelineEvent}><strong>Created:</strong> {creationTime} by {doc.author}</div>
              <div style={timelineEvent}><strong>Approved:</strong> {approvalTime}
                {reviewers.length > 0 && (
                  <ul style={timelineList}>
                    {reviewers.map((reviewer: any) => (
                      <li key={reviewer.id}>
                        {reviewer.fullName}: {reviewer.decision.toUpperCase()} (Level: {(levelsById.get(reviewer.accessLevelId) as any)?.name || "N/A"})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={timelineEvent}><strong>Circulated:</strong> {circulatedTime}
                {circulationTargets.length > 0 && (
                  <ul style={timelineList}>
                    {circulationTargets.map((target, idx) => (
                      <li key={idx}>Target: {target}
                        {config.personnel?.filter((p: any) => {
                          const siteName = config.siteLocations?.find((s: any) => s.id === p.siteLocationId)?.name;
                          return (target === p.fullName || (target === "ALL Leadership" && ["l1", "l2"].includes(p.accessLevelId)) || target === "ALL Clinics" || (siteName && target === siteName));
                        }).map((person: any) => (
                          <span key={person.id} style={{ marginLeft: 8, color: acknowledgments[person.id] ? "#1f7a37" : "#60766b" }}>
                            - {person.fullName} ({acknowledgments[person.id] ? "ACKNOWLEDGED" : "PENDING"})
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={timelineEvent}><strong>Completed & Archived:</strong> {completedTime}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const panelCard = { background: "#ffffff", borderRadius: 18, padding: 22, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 14px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };

const summaryRow = {
  fontSize: 14,
  color: "#31473d",
};

const summaryBlock = {
  fontSize: 14,
  color: "#31473d",
  lineHeight: 1.7,
};

const timelineEvent = {
  padding: "16px 18px",
  borderRadius: 12,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  fontSize: 14,
  color: "#31473d",
  lineHeight: 1.6,
};

const timelineList = {
  listStyle: "none",
  paddingLeft: 12,
  marginTop: 8,
  marginBottom: 0,
};
