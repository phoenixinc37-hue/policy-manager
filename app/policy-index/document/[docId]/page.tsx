import Link from "next/link";
import { documents } from "../../../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../../../cabinet";

export default function LibraryDocumentPage({ params }: { params: { docId: string } }) {
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
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Open Document</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
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
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{doc.title}</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 18 }}>{doc.type} · {doc.team}</div>
            <div style={bodyCard}>
              <p style={bodyText}>This is the library document view for <strong>{doc.title}</strong>. In the production version, this page will open the full stored document tied to the template and document record.</p>
              <p style={bodyText}>This page represents the place where leadership can open and review the actual live policy, SOG, or memo file from the library.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const bodyCard = { borderRadius: 16, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 20 };
const bodyText = { fontSize: 15, lineHeight: 1.7, color: "#31473d", margin: "0 0 12px" };
const greenMenuButton = { textDecoration: "none", background: "#66a97a", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #66a97a" };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
