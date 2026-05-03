"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CabinetGraphic } from "../cabinet";
import { loadApprovalDrafts, type SavedDraftRecord } from "../create/ai-assistant/draftStorage";
import { loadConfigSnapshot } from "../useSiteConfig";

export default function ApprovalPage() {
  const [approvalDrafts, setApprovalDrafts] = useState<SavedDraftRecord[]>([]);
  const [savedPeopleCount, setSavedPeopleCount] = useState(0);

  useEffect(() => {
    setApprovalDrafts(loadApprovalDrafts());
    const config = loadConfigSnapshot();
    setSavedPeopleCount((config.personnel || []).length);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Approval</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/teamview" style={whiteButtonLink}>Team View</Link>
            <Link href="/create/ai-assistant" style={whiteButtonLink}>AI Assistant</Link>
            <Link href="/create/ai-assistant/saved" style={whiteButtonLink}>Saved Drafts</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Approval queue</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 10 }}>Drafts sent forward for approval review will appear here.</div>
            <div style={{ fontSize: 13, color: savedPeopleCount ? "#1f7a37" : "#9a6700", marginBottom: 18, fontWeight: 700 }}>
              Setup people saved: {savedPeopleCount}
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {approvalDrafts.length === 0 ? (
                <div style={emptyCard}>No drafts are waiting in approval yet.</div>
              ) : (
                approvalDrafts.map((doc) => (
                  <div key={doc.id} style={rowCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 18 }}>{doc.documentType} - {doc.title}</div>
                        <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.distributionList || "Unassigned"}</div>
                        <div style={{ fontSize: 12, color: "#2e7d32", marginTop: 4, fontWeight: 700 }}>Sent to approval</div>
                      </div>
                      <Link href={`/status/${doc.id}`} style={whiteButtonLink}>Status</Link>
                    </div>
                  </div>
                ))
              )}
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

const rowCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const emptyCard = {
  border: "1px solid #dbe7de",
  borderRadius: 16,
  padding: 18,
  background: "#f9fbf9",
  color: "#60766b",
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
