import Link from "next/link";
import { documents } from "../data";

export default function StatusPage() {
  const circulating = documents.filter((doc) => doc.status === "circulating");
  const pending = documents.filter((doc) => doc.status === "pending-approval");

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager · Status</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={secondaryButton}>Leadership View</Link>
            <Link href="/policy-index" style={primaryButton}>Library</Link>
          </div>
        </header>

        <main style={{ display: "grid", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Circulating documents</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>Each circulating document has its own status panel and detailed member view.</div>
            <div style={{ display: "grid", gap: 14 }}>
              {circulating.map((doc) => {
                const remaining = doc.assignedTo.length - doc.acknowledgedBy.length;
                const progress = Math.round((doc.acknowledgedBy.length / doc.assignedTo.length) * 100);
                return (
                  <div key={doc.id} style={rowCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 18 }}>{doc.type} - {doc.title}</div>
                        <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team}</div>
                      </div>
                      <Link href={`/status/${doc.id}`} style={detailButtonLink}>Status</Link>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginTop: 16 }}>
                      <div style={miniCard}>
                        <div style={miniValue}>{doc.acknowledgedBy.length} / {doc.assignedTo.length}</div>
                        <div style={miniLabel}>Acknowledged</div>
                      </div>
                      <div style={miniCard}>
                        <div style={miniValue}>{remaining}</div>
                        <div style={miniLabel}>Still outstanding</div>
                      </div>
                      <div style={miniCard}>
                        <div style={miniValue}>{progress}%</div>
                        <div style={miniLabel}>Completion</div>
                      </div>
                    </div>

                    <div style={{ ...progressTrack, marginTop: 14 }}>
                      <div style={{ ...progressFill, width: `${progress}%` }} />
                    </div>

                    <div style={{ fontSize: 13, color: doc.needsAttention ? "#9a6700" : "#60766b", marginTop: 10 }}>
                      {doc.needsAttention ? `${Math.max(remaining - 1, 0)} overdue, ${remaining} still outstanding` : `${remaining} awaiting acknowledgement`}
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
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{doc.title}</div>
                      <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{doc.team} · Awaiting partner approval</div>
                    </div>
                    <Link href={`/status/${doc.id}`} style={detailButtonLink}>Status</Link>
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

const cabinetIcon = {
  width: 52,
  height: 60,
  borderRadius: 8,
  background: "linear-gradient(180deg, #3b5d7a 0%, #2a455d 100%)",
  border: "1px solid #22394d",
  padding: 5,
  boxSizing: "border-box" as const,
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: 4,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
};

const drawerRow = {
  borderRadius: 4,
  border: "1px solid #3e556b",
  background: "linear-gradient(180deg, #6f8aa6 0%, #4f6b86 100%)",
  position: "relative" as const,
};

const drawerHandle = { position: "absolute" as const, left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 12, height: 4, borderRadius: 999, background: "#2a455d" };

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

const progressTrack = {
  height: 10,
  background: "#e7efe9",
  borderRadius: 999,
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#2e7d32",
};

const detailButtonLink = {
  textDecoration: "none",
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
