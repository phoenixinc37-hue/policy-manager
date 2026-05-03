"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function ClientImportReview() {
  const [record, setRecord] = useState<any | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("policy-manager-import-record");
    if (!raw) return;
    try {
      setRecord(JSON.parse(raw));
    } catch {
      setRecord(null);
    }
  }, []);

  if (!record) {
    return <div style={{ fontSize: 14, color: "#60766b" }}>No imported file found in this browser session yet.</div>;
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div style={detailCard}><div style={label}>Original file</div><div style={value}>{record.originalName}</div></div>
        <div style={detailCard}><div style={label}>Status</div><div style={value}>{record.status}</div></div>
        <div style={detailCard}><div style={label}>Suggested title</div><div style={value}>{record.title}</div></div>
        <div style={detailCard}><div style={label}>Suggested type</div><div style={value}>{record.documentType}</div></div>
        <div style={detailCard}><div style={label}>Team</div><div style={value}>{record.team}</div></div>
        <div style={detailCard}><div style={label}>Effective date</div><div style={value}>{record.effectiveDate || "Not set"}</div></div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Import pathway</div>
        <div style={pathwayCard}>
          <div style={pathStep}><div style={pathStepNumber}>1</div><div><div style={pathStepTitle}>Uploaded file arrives</div><div style={pathStepText}>The original policy lands in intake exactly as uploaded from the computer.</div></div></div>
          <div style={pathArrow}>→</div>
          <div style={pathStep}><div style={pathStepNumber}>2</div><div><div style={pathStepTitle}>AI Assistant Format</div><div style={pathStepText}>AI converts the uploaded file into the Policy Manager template structure.</div></div></div>
          <div style={pathArrow}>→</div>
          <div style={pathStep}><div style={pathStepNumber}>3</div><div><div style={pathStepTitle}>Converted draft review</div><div style={pathStepText}>Leadership reviews the converted version before it becomes a live Policy Manager document.</div></div></div>
          <div style={pathArrow}>→</div>
          <div style={pathStep}><div style={pathStepNumber}>4</div><div><div style={pathStepTitle}>Enter normal workflow</div><div style={pathStepText}>Once approved, the document can move into Library, Pending, Circulating, and Completion properly.</div></div></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
        <Link href="/create/ai-assistant?importId=client" style={whiteButtonLink}>AI Assistant Format</Link>
        <Link href="/import-existing" style={whiteButtonLink}>Upload another file</Link>
        <Link href="/policy-index" style={whiteButtonLink}>Open Library</Link>
      </div>
    </>
  );
}

const detailCard = { border: "1px solid #dbe7de", borderRadius: 14, padding: 16, background: "#f9fbf9" };
const label = { fontSize: 12, fontWeight: 800, color: "#60766b", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 8 };
const value = { fontSize: 16, fontWeight: 700, color: "#10221a" };
const pathwayCard = { display: "grid", gap: 12, border: "1px solid #dbe7de", borderRadius: 16, padding: 18, background: "#f9fbf9" };
const pathStep = { display: "flex", gap: 12, alignItems: "flex-start", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 14, padding: 14 };
const pathStepNumber = { width: 30, height: 30, borderRadius: 999, background: "#66a97a", color: "#ffffff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const pathStepTitle = { fontWeight: 800, marginBottom: 4 };
const pathStepText = { fontSize: 14, color: "#60766b", lineHeight: 1.6 };
const pathArrow = { textAlign: "center" as const, fontSize: 20, fontWeight: 800, color: "#7a8f84" };
const whiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de" };
