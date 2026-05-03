import Link from "next/link";
import { CabinetGraphic } from "../../../cabinet";

export default function ManualDraftPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Manual Draft</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
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
                <div style={{ fontSize: 13, color: "#567164", fontWeight: 700, marginBottom: 8 }}>POL-142 · V1.0</div>
                <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>Client File Documentation Standards</h1>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 10 }}>Policy · Firm-wide · Author: Scott Wilde</div>
              </div>
              <div style={statusChip}>Draft preview</div>
            </div>

            <div style={metaBar}>
              <span>Effective date: May 15, 2026</span>
              <span>Review: Quarterly · Jul 28, 2026</span>
              <span>Circulate to: All team</span>
            </div>

            <section style={sectionCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>To create a clear firm-wide standard for how client file documentation is created, stored, and maintained so work is consistent, reviewable, and defensible.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Scope</div>
              <p style={bodyText}>This policy applies to all team members who create, edit, review, or rely on client file documentation within the firm.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Policy statement</div>
              <p style={bodyText}>All client file documentation must be complete, timely, readable, and stored in the approved location using the firm’s standard naming and filing conventions.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Procedure / steps</div>
              <ol style={orderedList}>
                <li>Create documentation on the same day the work is performed whenever possible.</li>
                <li>Use standard titles, dates, and naming conventions.</li>
                <li>Store documents in the approved client file location.</li>
                <li>Flag missing or incomplete records before file completion.</li>
              </ol>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Definitions</div>
              <p style={bodyText}><strong>Client file documentation</strong> means any note, checklist, support file, communication record, or internal document that forms part of the working client record.</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Attachments / references</div>
              <ul style={orderedList}>
                <li>Client file naming standard</li>
                <li>Internal review checklist</li>
                <li>Year-end file assembly reference</li>
              </ul>
            </section>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
              <Link href="/create/template" style={greenMenuButton}>Back to template</Link>
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
