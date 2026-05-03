import Link from "next/link";
import { CabinetGraphic } from "../cabinet";

export default function ImportExistingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Import Existing</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/completion" style={greenMenuButton}>Complete</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Import existing firm documents</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, maxWidth: 760, marginBottom: 24 }}>
              This is the intake point for current policies, SOGs, and memos that already exist inside the firm. In the full version, uploaded files would be indexed here, categorized, and prepared for circulation through Policy Manager.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 20 }}>
              <div style={featureCard}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Existing document intake</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 16 }}>
                  Bring in current firm files so they can be reviewed, cleaned up, categorized, versioned, and then distributed to the right team members.
                </div>

                <div style={uploadZone}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Drop policy files here or browse</div>
                  <div style={{ fontSize: 13, color: "#60766b" }}>Demo placeholder for Word files, PDFs, memos, policy manuals, and existing SOG documents.</div>
                </div>
              </div>

              <div style={featureCard}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>What happens next</div>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={stepCard}>
                    <div style={stepNumber}>1</div>
                    <div>
                      <div style={stepTitle}>Import the existing file</div>
                      <div style={stepText}>Bring in the current policy, SOG, or memo from the firm’s existing document storage.</div>
                    </div>
                  </div>
                  <div style={stepCard}>
                    <div style={stepNumber}>2</div>
                    <div>
                      <div style={stepTitle}>Classify the document</div>
                      <div style={stepText}>Mark it as a Policy, SOG, or Memo and attach the correct team, owner, and version details.</div>
                    </div>
                  </div>
                  <div style={stepCard}>
                    <div style={stepNumber}>3</div>
                    <div>
                      <div style={stepTitle}>Prepare for circulation</div>
                      <div style={stepText}>Once cleaned and approved, send it into the acknowledgement workflow so the loop can be closed.</div>
                    </div>
                  </div>
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
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const featureCard = {
  border: "1px solid #dbe7de",
  borderRadius: 16,
  padding: 20,
  background: "#f9fbf9",
};

const uploadZone = {
  border: "2px dashed #cfe1d2",
  borderRadius: 16,
  padding: 28,
  background: "#ffffff",
  textAlign: "center" as const,
};

const stepCard = {
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
  borderRadius: 14,
  background: "#ffffff",
  border: "1px solid #dbe7de",
  padding: 16,
};

const stepNumber = {
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "#66a97a",
  color: "#ffffff",
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const stepTitle = {
  fontWeight: 800,
  marginBottom: 4,
};

const stepText = {
  fontSize: 14,
  color: "#60766b",
  lineHeight: 1.6,
};

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
};

const primaryButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};
