import Link from "next/link";
import { cabinetIcon, drawerHandle, drawerRow } from "../../cabinet";

export default function CreateAiAssistantPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· AI Assistant</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <Link href="/create" style={primaryButton}>Back to Create</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI-assisted document drafting</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 18 }}>
              In the live version, the AI assistant helps generate a first draft while still following the firm’s approved structure for policies, SOGs, and memos.
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={row}><strong>Step 1</strong><span>Choose Policy, SOG, or Memo.</span></div>
              <div style={row}><strong>Step 2</strong><span>Use AI to generate a first structured draft.</span></div>
              <div style={row}><strong>Step 3</strong><span>Send the draft into the correct approval pathway before circulation.</span></div>
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
