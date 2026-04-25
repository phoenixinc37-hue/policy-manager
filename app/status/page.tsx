import Link from "next/link";
import { documents } from "../data";

export default function StatusPage() {
  const circulating = documents.filter((doc) => doc.status === "circulating");
  const pending = documents.filter((doc) => doc.status === "pending-approval");

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager · Status</div>
            <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={secondaryButton}>Leadership View</Link>
            <Link href="/policy-index" style={primaryButton}>Library</Link>
          </div>
        </header>

        <main style={{ display: "grid", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Circulating documents</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>Active items still moving through the firm.</div>
            <div style={{ display: "grid", gap: 12 }}>
              {circulating.map((doc) => {
                const remaining = doc.assignedTo.length - doc.acknowledgedBy.length;
                return (
                  <div key={doc.id} style={rowCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{doc.type} - {doc.title}</div>
                        <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700 }}>{doc.acknowledgedBy.length} / {doc.assignedTo.length} acknowledged</div>
                        <div style={{ fontSize: 13, color: doc.needsAttention ? "#9a6700" : "#60766b", marginTop: 4 }}>{doc.needsAttention ? `${remaining - 1} overdue` : `Awaiting ${remaining}`}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <button style={detailButton}>See complete / incomplete team members</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
                      <div style={detailCard}>
                        <div style={{ fontWeight: 700, marginBottom: 8, color: "#1f7a37" }}>Complete</div>
                        <div style={{ display: "grid", gap: 6 }}>
                          {doc.acknowledgedBy.map((name) => (
                            <div key={name} style={personRow}>{name}</div>
                          ))}
                        </div>
                      </div>
                      <div style={detailCard}>
                        <div style={{ fontWeight: 700, marginBottom: 8, color: "#9a6700" }}>Incomplete</div>
                        <div style={{ display: "grid", gap: 6 }}>
                          {doc.assignedTo.filter((name) => !doc.acknowledgedBy.includes(name)).map((name) => (
                            <div key={name} style={personRow}>{name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Pending approval</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>Documents waiting on leadership review.</div>
            <div style={{ display: "grid", gap: 12 }}>
              {pending.map((doc) => (
                <div key={doc.id} style={rowCard}>
                  <div style={{ fontWeight: 700 }}>{doc.title}</div>
                  <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team} · Awaiting partner approval</div>
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

const detailCard = {
  borderRadius: 14,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  padding: 14,
};

const personRow = {
  fontSize: 13,
  color: "#4c6358",
  padding: "6px 8px",
  borderRadius: 8,
  background: "#f6faf7",
};

const detailButton = {
  background: "#ffffff",
  color: "#1f5d24",
  border: "1px solid #cfe1d2",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 700,
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
