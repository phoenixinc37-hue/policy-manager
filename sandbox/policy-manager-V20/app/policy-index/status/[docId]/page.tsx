import Link from "next/link";
import { documents } from "../../../data";
import { CabinetGraphic } from "../../../cabinet";

export default function LibraryStatusPage({ params }: { params: { docId: string } }) {
  const doc = documents.find((item) => item.id === params.docId);

  if (!doc) {
    return <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>Document not found.</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Review Status</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <Link href="/policy-index" style={primaryButton}>Back to Library</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{doc.title} status</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>This page will show when the policy should next be reviewed and who owns that review cycle.</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={statusCard}><strong>Current status</strong><span>{doc.status === "library" ? "Published" : doc.status === "pending-approval" ? "Pending approval" : "Circulating"}</span></div>
              <div style={statusCard}><strong>Next review</strong><span>September 30, 2026</span></div>
              <div style={statusCard}><strong>Review owner</strong><span>Leadership group</span></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const statusCard = { display: "grid", gap: 4, borderRadius: 14, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 16 };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 14px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
