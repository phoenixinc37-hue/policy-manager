"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CabinetGraphic } from "../cabinet";
import { documents } from "../data";
import { type SavedDraftRecord } from "../create/ai-assistant/draftStorage";

export default function PendingPage() {
  const hardcodedPending = documents.filter((doc) => doc.status === "pending-approval");
  const [localPending] = useState<SavedDraftRecord[]>([]);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Pending Approval</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={whiteButtonLink}>Circulating</Link>
            <Link href="/completion" style={whiteButtonLink}>Complete</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
            <Link href="/teamview" style={whiteButtonLink}>Team View</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Pending approval</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>Documents waiting for leadership review or comments.</div>
            <div style={{ display: "grid", gap: 14 }}>
              {localPending.map((doc) => (
                <div key={doc.id} style={rowCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{doc.documentType} - {doc.title}</div>
                      <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.distributionList || "Unassigned"}</div>
                      <div style={{ fontSize: 12, color: "#2e7d32", marginTop: 4, fontWeight: 700 }}>Sent from Saved Drafts</div>
                    </div>
                    <Link href={`/status/${doc.id}`} style={whiteButtonLink}>Status</Link>
                  </div>
                </div>
              ))}
              {hardcodedPending.map((doc) => (
                <div key={doc.id} style={rowCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{doc.type} - {doc.title}</div>
                      <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team}</div>
                    </div>
                    <Link href={`/status/${doc.id}`} style={whiteButtonLink}>Status</Link>
                  </div>
                </div>
              ))}
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

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};
