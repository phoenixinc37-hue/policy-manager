import Link from "next/link";
import { cabinetIcon, drawerHandle, drawerRow } from "../cabinet";

export default function CreatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Create New</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/completion" style={greenMenuButton}>Complete</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/manager" style={primaryLinkButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Create a new document</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 20, lineHeight: 1.7 }}>Build a new policy, SOG, or memo using the established structure, then route it to the correct leadership approval group before circulation.</div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18, marginBottom: 20 }}>
              <div style={featureCard}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Choose how to create</div>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={optionCard}>
                    <div style={{ fontWeight: 800, marginBottom: 6 }}>Follow established template</div>
                    <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>Use the firm’s approved structure for the selected document type. Template rules will be expanded in the next version.</div>
                  </div>
                  <div style={optionCard}>
                    <div style={{ fontWeight: 800, marginBottom: 6 }}>Use AI assistant</div>
                    <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>Generate a first draft with AI, but still keep it inside the firm’s required structure and approval pathway.</div>
                  </div>
                </div>

                <textarea placeholder="Example: Draft a client file documentation policy for the tax team using the approved structure, then route it to the owners group for approval." style={{ ...inputStyle, minHeight: 120, resize: "vertical" as const, marginTop: 14 }} />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <button style={primaryButton}>Use AI assistant</button>
                  <button style={ghostButton}>Follow template</button>
                </div>
              </div>

              <div style={featureCard}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Existing document intake</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>Bring in an existing policy, SOG, or memo so it can be indexed, updated, and redistributed through Policy Manager.</div>
                <div style={uploadBox}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Drop file here or browse</div>
                  <div style={{ fontSize: 13, color: "#60766b" }}>Supports previous policies, memos, PDFs, and Word files.</div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <Link href="/import-existing" style={primaryLinkButton}>Upload file</Link>
                </div>
              </div>
            </div>

            <div style={{ ...featureCard, marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Approval pathway by document type</div>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={routingCard}>
                  <div style={{ fontWeight: 800 }}>Memo</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>Draft is reviewed by the relevant leadership group before circulation to the intended team.</div>
                </div>
                <div style={routingCard}>
                  <div style={{ fontWeight: 800 }}>SOG</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>Draft is reviewed by a smaller, more refined operating group before release to the affected team.</div>
                </div>
                <div style={routingCard}>
                  <div style={{ fontWeight: 800 }}>Policy</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>Draft typically stays within the owners group for approval before wider circulation.</div>
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
  gap: 12,
  flexWrap: "nowrap" as const,
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

const optionCard = {
  border: "1px solid #dbe7de",
  borderRadius: 14,
  padding: 14,
  background: "#ffffff",
};

const routingCard = {
  border: "1px solid #dbe7de",
  borderRadius: 14,
  padding: 14,
  background: "#ffffff",
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

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "8px 10px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 13,
  border: "1px solid #66a97a",
  whiteSpace: "nowrap" as const,
};

const primaryButton = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const primaryLinkButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "8px 10px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 13,
  border: "1px solid #1f5d24",
  whiteSpace: "nowrap" as const,
};

const ghostButton = {
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};
