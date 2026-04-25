import Link from "next/link";

export default function CreatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager · Create New</div>
            <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
          </div>
          <Link href="/manager" style={secondaryButton}>Leadership View</Link>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Create a new document</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 20 }}>Start a Policy, SOG, or Memo and assign it to a team.</div>

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
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={primaryButton}>Save draft</button>
                <Link href="/policy-index" style={secondaryButton}>View library</Link>
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
