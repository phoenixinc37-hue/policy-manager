import Link from "next/link";
import { documents } from "../../../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../../../cabinet";

export default function CompletionHistoryPage({ params }: { params: { docId: string } }) {
  const doc = documents.find((item) => item.id === params.docId);
  if (!doc) return <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>Document not found.</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Version History</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <Link href="/completion" style={primaryButton}>Back to Firm Completion</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{doc.title} history</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={row}><strong>Version 3</strong><span>Updated to current approved format</span></div>
              <div style={row}><strong>Version 2</strong><span>Leadership-reviewed revision</span></div>
              <div style={row}><strong>Version 1</strong><span>Original imported source document</span></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const row = { display: "grid", gap: 4, borderRadius: 14, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 16 };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 14px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
