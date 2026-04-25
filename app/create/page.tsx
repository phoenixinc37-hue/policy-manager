import Link from "next/link";

export default function CreatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager · Create New</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <Link href="/manager" style={secondaryButton}>Leadership View</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Create a new document</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 20 }}>Create or build a policy, SOG, or memo with AI, or upload an existing document.</div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18, marginBottom: 20 }}>
              <div style={featureCard}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Generate with AI</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>Describe the policy you want, choose the document type, and generate a first draft to review before circulation.</div>
                <textarea placeholder="Example: Draft a client file documentation policy for the tax team with acknowledgement required from all staff." style={{ ...inputStyle, minHeight: 120, resize: "vertical" as const }} />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <button style={primaryButton}>Generate draft</button>
                  <button style={ghostButton}>Use template</button>
                </div>
              </div>

              <div style={featureCard}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Upload previous document</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>Bring in an existing policy, SOG, or memo so it can be indexed, updated, and redistributed through Policy Manager.</div>
                <div style={uploadBox}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Drop file here or browse</div>
                  <div style={{ fontSize: 13, color: "#60766b" }}>Supports previous policies, memos, PDFs, and Word files.</div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <button style={primaryButton}>Upload file</button>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <input placeholder="Document title" style={inputStyle} />
              <select style={inputStyle} defaultValue="Policy">
                <option>Policy</option>
                <option>SOG</option>
                <option>Memo</option>
              </select>
              <select style={inputStyle} defaultValue="Tax team">
                <option>Tax team</option>
                <option>Admin team</option>
                <option>Leadership</option>
                <option>Firm-wide</option>
              </select>
              <textarea placeholder="Summary or rollout note" style={{ ...inputStyle, minHeight: 140, resize: "vertical" as const }} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
                <button style={primaryButton}>Save draft</button>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={ghostButton}>Import</button>
                  <Link href="/policy-index" style={secondaryButton}>View library</Link>
                </div>
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

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #d6e4d8",
  background: "#f8fbf9",
  fontSize: 16,
  color: "#10221a",
  boxSizing: "border-box" as const,
};

const featureCard = {
  border: "1px solid #dbe7de",
  borderRadius: 16,
  padding: 18,
  background: "#f9fbf9",
};

const uploadBox = {
  border: "2px dashed #cfe1d2",
  borderRadius: 14,
  padding: 18,
  background: "#ffffff",
  textAlign: "center" as const,
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
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const ghostButton = {
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};
