import Link from "next/link";
import { cabinetIcon, drawerHandle, drawerRow } from "../../../cabinet";

export default function AiDraftPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· AI Draft</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={greenMenuButton}>Circulating</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 13, color: "#567164", fontWeight: 700, marginBottom: 8 }}>POL-143 · V1.0</div>
                <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>AI Draft, Client Intake Documentation Standard</h1>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 10 }}>Policy · Leadership review · Author: Scott Wilde</div>
              </div>
              <div style={statusChip}>AI draft preview</div>
            </div>

            <div style={metaBar}>
              <span>Effective date: May 20, 2026</span>
              <span>Review: 30 days · Jun 19, 2026</span>
              <span>Circulate to: All leadership</span>
            </div>

            <section style={sectionCard}>
              <div style={sectionTitle}>AI prompt summary</div>
              <p style={bodyText}>Draft a clear internal policy for intake documentation standards using the approved policy structure, aimed at leadership review first and broader staff release later.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>To establish a consistent intake documentation standard so client information is complete, traceable, and easy to review across the firm.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Scope</div>
              <p style={bodyText}>This document applies to all staff involved in intake, documentation, review, and client handoff processes.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Policy statement</div>
              <p style={bodyText}>All intake-related client records must be documented using the approved intake standard, with required fields completed before the file moves to the next stage.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Procedure / steps</div>
              <ol style={orderedList}>
                <li>Open the intake checklist at the start of the client interaction.</li>
                <li>Capture all required details before moving the file onward.</li>
                <li>Confirm supporting documentation is attached.</li>
                <li>Escalate incomplete files for correction before release.</li>
              </ol>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Definitions</div>
              <p style={bodyText}><strong>Intake standard</strong> means the required fields, notes, attachments, and file handling rules that must be completed before a client file can move forward.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Attachments / references</div>
              <ul style={orderedList}>
                <li>Intake checklist</li>
                <li>Client onboarding checklist</li>
                <li>Leadership review notes</li>
              </ul>
            </section>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
              <Link href="/create/ai-assistant" style={greenMenuButton}>Back to template</Link>
              <Link href="/pending" style={primaryButton}>Send to pending</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const sectionCard = { borderRadius: 16, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 20, marginTop: 18 };
const sectionTitle = { fontSize: 18, fontWeight: 800, marginBottom: 12 };
const metaBar = { display: "flex", gap: 12, flexWrap: "wrap" as const, marginTop: 18, padding: "12px 14px", borderRadius: 12, background: "#f1f5f2", border: "1px solid #dbe7de", fontSize: 14, color: "#466255" };
const statusChip = { display: "inline-flex", alignItems: "center", padding: "10px 14px", borderRadius: 999, background: "#66a97a", color: "#ffffff", fontSize: 13, fontWeight: 800 };
const bodyText = { fontSize: 15, lineHeight: 1.7, color: "#31473d", margin: 0 };
const orderedList = { margin: 0, paddingLeft: 22, display: "grid", gap: 10, color: "#31473d", fontSize: 15, lineHeight: 1.7 };
const greenMenuButton = { textDecoration: "none", background: "#66a97a", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #66a97a" };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
