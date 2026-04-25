import Link from "next/link";
import { documents } from "../data";

export default function CompletionPage() {
  const completed = documents.filter((doc) => doc.assignedTo.length > 0 && doc.acknowledgedBy.length === doc.assignedTo.length);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager · Firm Completion</div>
            <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={secondaryButton}>Status</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Fully circulated documents</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>Each fully acknowledged document appears in its own panel with follow-up actions.</div>

            <div style={{ display: "grid", gap: 14 }}>
              {completed.map((doc) => (
                <div key={doc.id} style={rowCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{doc.type} - {doc.title}</div>
                      <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#1f7a37", fontWeight: 700 }}>Fully circulated</div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginTop: 16 }}>
                    <div style={miniCard}>
                      <div style={miniValue}>{doc.assignedTo.length}</div>
                      <div style={miniLabel}>Assigned</div>
                    </div>
                    <div style={miniCard}>
                      <div style={miniValue}>{doc.acknowledgedBy.length}</div>
                      <div style={miniLabel}>Acknowledged</div>
                    </div>
                    <div style={miniCard}>
                      <div style={miniValue}>100%</div>
                      <div style={miniLabel}>Completion</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                    <button style={actionButton}>Version history</button>
                    <button style={actionButton}>Review</button>
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

const miniCard = {
  borderRadius: 12,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  padding: 14,
};

const miniValue = {
  fontSize: 22,
  fontWeight: 800,
  color: "#1f5d24",
};

const miniLabel = {
  fontSize: 12,
  color: "#60766b",
  marginTop: 4,
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
