import Link from "next/link";
import { documents } from "../../data";

export default function DocumentStatusDetail({ params }: { params: { docId: string } }) {
  const doc = documents.find((item) => item.id === params.docId);

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", fontFamily: "Arial, sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/status" style={secondaryButton}>Back to Status</Link>
          <div style={{ marginTop: 24, background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Document not found.</div>
        </div>
      </div>
    );
  }

  const incomplete = doc.assignedTo.filter((name) => !doc.acknowledgedBy.includes(name));

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{doc.type} · {doc.title}</div>
            <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>{doc.team} · Detailed status</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={secondaryButton}>Back to Status</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1f7a37", marginBottom: 12 }}>Complete</div>
            <div style={{ display: "grid", gap: 8 }}>
              {doc.acknowledgedBy.map((name) => (
                <div key={name} style={personRow}>{name}</div>
              ))}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#9a6700" }}>Incomplete</div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {incomplete.map((name) => (
                <div key={name} style={personRowWrap}>
                  <div style={personRow}>{name}</div>
                  <button style={reminderButton}>Send reminder</button>
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

const personRowWrap = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  borderRadius: 10,
  background: "#f6faf7",
  padding: "8px",
};

const personRow = {
  fontSize: 14,
  color: "#4c6358",
  padding: "10px 12px",
  borderRadius: 10,
  background: "#f6faf7",
  flex: 1,
};

const reminderButton = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
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
