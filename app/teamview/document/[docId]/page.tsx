import Link from "next/link";
import { documents } from "../../../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../../../cabinet";

export default function TeamDocumentReview({ params }: { params: { docId: string } }) {
  const doc = documents.find((item) => item.id === params.docId);

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", padding: 24, fontFamily: "Arial, sans-serif" }}>
        <Link href="/teamview" style={backButton}>Back to Team View</Link>
        <div style={{ maxWidth: 900, margin: "24px auto 0", background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Document not found.</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Review Document</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting firm demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/teamview" style={primaryButton}>Back to Team View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={docCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <span style={typeBadge(doc.type)}>{doc.type}</span>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{doc.title}</div>
            </div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 24 }}>{doc.team} · Team member review page</div>

            <div style={bodyCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>This demo document page shows the content a team member opens when they need to review an active {doc.type.toLowerCase()}. In the full product, this content would be generated from the actual stored document.</p>

              <div style={sectionTitle}>Key points</div>
              <ul style={listStyle}>
                <li>Review the full document before acknowledging it.</li>
                <li>Understand the required workflow, expectations, and compliance notes.</li>
                <li>Acknowledgement should close the loop and update reporting on the leadership side.</li>
              </ul>

              <div style={sectionTitle}>Document body</div>
              <p style={bodyText}>This is the seeded demonstration content for <strong>{doc.title}</strong>. It stands in for the full policy, SOG, or memo text so the navigation flow can be seen clearly in this version.</p>
              <p style={bodyText}>Later versions should support the actual full document body, version tracking, issue dates, assigned users, and audit logging tied to acknowledgement events.</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginTop: 24, flexWrap: "wrap" }}>
              <div style={{ fontSize: 13, color: "#60766b" }}>Acknowledgement wiring stub for next version.</div>
              <button style={acknowledgeButton}>Acknowledge</button>
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

const docCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const bodyCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 20,
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 800,
  marginBottom: 8,
  marginTop: 16,
};

const bodyText = {
  fontSize: 15,
  lineHeight: 1.7,
  color: "#31473d",
  margin: "0 0 12px",
};

const listStyle = {
  margin: "0 0 12px 18px",
  color: "#31473d",
  lineHeight: 1.8,
  fontSize: 15,
};

const primaryButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const backButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const acknowledgeButton = {
  background: "#66a97a",
  color: "#ffffff",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #66a97a",
};

function typeBadge(type: string) {
  const map: Record<string, { background: string; color: string }> = {
    Policy: { background: "#dff3e3", color: "#1f5d24" },
    SOG: { background: "#dff0fb", color: "#0b5f87" },
    Memo: { background: "#eef2f1", color: "#51665b" },
  };
  return {
    background: map[type]?.background ?? "#eef2f1",
    color: map[type]?.color ?? "#51665b",
    padding: "4px 9px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  };
}
