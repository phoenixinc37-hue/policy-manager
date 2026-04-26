import Link from "next/link";
import { documents } from "../../../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../../../cabinet";

export default function LibraryHistoryPage({ params }: { params: { docId: string } }) {
  const doc = documents.find((item) => item.id === params.docId);

  if (!doc) {
    return <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>Document not found.</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Document History</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <Link href="/policy-index" style={primaryButton}>Back to Library</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{doc.title} history</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>This history will later be linked to the document template, edit chain, and version records.</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={historyRow}><strong>Version 3</strong><span>Updated for current workflow and approval routing</span></div>
              <div style={historyRow}><strong>Version 2</strong><span>Formatted for circulation and acknowledgement tracking</span></div>
              <div style={historyRow}><strong>Version 1</strong><span>Original imported firm document</span></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const historyRow = { display: "grid", gap: 4, borderRadius: 14, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 16 };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 14px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
