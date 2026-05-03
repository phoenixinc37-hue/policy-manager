import Link from "next/link";
import { CabinetGraphic } from "../cabinet";
import { ImportUploadClient } from "./ImportUploadClient";

export default function ImportExistingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Import Existing</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/pending" style={whiteButtonLink}>Pending</Link>
            <Link href="/completion" style={whiteButtonLink}>Complete</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
            <Link href="/teamview" style={whiteButtonLink}>Team View</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Import existing firm documents</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, maxWidth: 760, marginBottom: 24 }}>
              Upload an existing policy, SOG, or memo from your computer. Once uploaded, it moves into an intake review screen so it can be classified and prepared for the Policy Manager workflow.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 20 }}>
              <div style={featureCard}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Upload from your computer</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 16 }}>
                  Choose a document already stored on a computer, then move it into Policy Manager for review.
                </div>

                <ImportUploadClient />
              </div>

              <div style={featureCard}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>What happens next</div>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={stepCard}>
                    <div style={stepNumber}>1</div>
                    <div>
                      <div style={stepTitle}>Upload the file</div>
                      <div style={stepText}>Pick a stored policy, SOG, or memo from your computer.</div>
                    </div>
                  </div>
                  <div style={stepCard}>
                    <div style={stepNumber}>2</div>
                    <div>
                      <div style={stepTitle}>Review intake details</div>
                      <div style={stepText}>Confirm title, document type, team, and effective date on the next screen.</div>
                    </div>
                  </div>
                  <div style={stepCard}>
                    <div style={stepNumber}>3</div>
                    <div>
                      <div style={stepTitle}>Prepare for workflow</div>
                      <div style={stepText}>From there, the imported document can move into the normal Policy Manager path.</div>
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

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};
