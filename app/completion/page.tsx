import Link from "next/link";
import { documents } from "../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../cabinet";

export default function CompletionPage() {
  const completed = documents.filter((doc) => doc.assignedTo.length > 0 && doc.acknowledgedBy.length === doc.assignedTo.length);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Firm Completion</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={greenMenuButton}>Circulating</Link>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/" style={primaryButton}>Home</Link>
          </div>
        </header>

        <main style={{ marginTop: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Firm Completion</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>All fully circulated documents across the firm.</p>

          <section style={panelCard}>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={tableHeader}>
                <div>Type</div>
                <div>Title</div>
                <div>Team</div>
                <div>Status</div>
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
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{doc.title}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>{doc.team}</div>
                    <div style={{ fontSize: 13, color: "#1f7a37", fontWeight: 700 }}>Fully circulated</div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button style={actionButton}>Version history</button>
                      <button style={actionButton}>Review</button>
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

const secondaryButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
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

const actionButton = {
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};
