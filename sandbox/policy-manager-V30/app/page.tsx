import Link from "next/link";
import { CabinetGraphic } from "./cabinet";
import { getProfile } from "./actions";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const config = (await getProfile() || {}) as any;

  const businessName = config.businessName || "Business Inc";
  const employerDisplay = config.employerGroup === "Custom" ? config.employerGroupCustom || "Custom" : (config.employerGroup || "Leadership");
  const employeeDisplay = config.employeeGroup === "Custom" ? config.employeeGroupCustom || "Custom" : (config.employeeGroup || "Team");
  const policyMsgDisplay = config.policyMessage === "Custom" ? config.policyMessageCustom || "Custom" : (config.policyMessage || "Policies only work when people understand them, follow them, and can find them when they need them.");
  const definitionsActive = config.includeCoreDefinitions === "Yes";

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V30</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>{businessName}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={headerButton("#1f5d24")}>
              {employerDisplay} Dashboard
            </Link>
            <Link href="/teamview" style={headerButton("#66a97a")}>
              {employeeDisplay} Dashboard
            </Link>
            <Link href="/setup" style={headerButton("#4b7f57")}>
              Setup
            </Link>
          </div>
        </header>

        <main style={{ marginTop: 28, display: "grid", gap: 24 }}>
          <section style={heroCard}>
            <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: "0 0 14px", fontWeight: 800, maxWidth: 780 }}>
              Build a business system people can understand, follow, and actually use.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#496156", maxWidth: 760, margin: 0 }}>
              {policyMsgDisplay}
            </p>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
            <div style={panelContainer}>
              <div style={panelHeaderTitle}>{employerDisplay} Dashboard</div>
              <div style={panelSpacer} />
              <Link href="/manager" style={primaryButton}>
                Open {employerDisplay} Dashboard
              </Link>
            </div>

            <div style={panelContainer}>
              <div style={panelHeaderTitle}>{employeeDisplay} Dashboard</div>
              <div style={panelSpacer} />
              <Link href="/teamview" style={teamButton}>
                Open {employeeDisplay} Dashboard
              </Link>
            </div>
          </section>

          <section style={definitionSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Definitions</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, maxWidth: 720 }}>
                  {definitionsActive
                    ? "Definitions are active for this version of Policy Manager."
                    : "Definitions are not active for this version of Policy Manager."}
                </div>
              </div>
              <Link href="/definitions" style={reactivateButton}>
                Open Definitions
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function headerButton(color: string) {
  return {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    color: "#ffffff",
    background: color,
    border: `1px solid ${color}`,
  } as const;
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

const heroCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const panelContainer = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  display: "flex",
  flexDirection: "column" as const,
  minHeight: 180,
};

const panelHeaderTitle = {
  fontSize: 22,
  fontWeight: 800,
};

const panelSpacer = {
  flex: 1,
};

const primaryButton = {
  textDecoration: "none",
  background: "#2e7d32",
  color: "#ffffff",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  boxShadow: "0 10px 20px rgba(46, 125, 50, 0.18)",
  display: "inline-block",
};

const teamButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  border: "1px solid #66a97a",
  display: "inline-block",
};

const definitionSection = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const reactivateButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  border: "1px solid #1f5d24",
  borderRadius: 10,
  padding: "11px 16px",
  fontWeight: 700,
  display: "inline-block",
};
