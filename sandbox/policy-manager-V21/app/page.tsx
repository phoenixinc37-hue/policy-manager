"use client";

import Link from "next/link";
import { CabinetGraphic } from "./cabinet";
import { useSiteConfig } from "./useSiteConfig";

export default function LandingPage() {
  const { config, isLoaded } = useSiteConfig();

  const businessName = isLoaded && config.businessName ? config.businessName : "Business Inc";
  const employerDisplay = isLoaded ? (config.employerGroup === "Custom" ? config.employerGroupCustom || "Custom" : config.employerGroup) : "Leadership";
  const employeeDisplay = isLoaded ? (config.employeeGroup === "Custom" ? config.employeeGroupCustom || "Custom" : config.employeeGroup) : "Team";
  const policyMsgDisplay = isLoaded ? (config.policyMessage === "Custom" ? config.policyMessageCustom || "Custom" : config.policyMessage) : "Policies only work when people understand them, follow them, and can find them when they need them.";
  const definitionsActive = isLoaded ? config.includeCoreDefinitions === "Yes" : true;
  const aiAssistantChoice = isLoaded ? config.aiAssistantSetupChoice : "Maybe later";
  const aiConnectionStatus = isLoaded ? config.aiConnectionStatus : "Not connected";

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V11</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>{businessName}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={neutralHeaderButton}>
              {employerDisplay} Dashboard
            </Link>
            <Link href="/teamview" style={neutralHeaderButton}>
              {employeeDisplay} Dashboard
            </Link>
            <Link href="/setup" style={neutralHeaderButton}>
              Setup
            </Link>
          </div>
        </header>

        <main style={{ marginTop: 28, display: "grid", gap: 24 }}>
          <section style={heroCard}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <button type="button" style={heroActionButton}>
                Policy Statement
              </button>
              <button type="button" style={heroSecondaryButton}>
                Policy Message
              </button>
            </div>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
            <div style={panelContainer}>
              <div style={panelHeaderTitle}>{employerDisplay} Dashboard</div>
              <div style={panelSpacer} />
              <Link href="/manager" style={neutralPanelButton}>
                Open {employerDisplay} Dashboard
              </Link>
            </div>

            <div style={panelContainer}>
              <div style={panelHeaderTitle}>{employeeDisplay} Dashboard</div>
              <div style={panelSpacer} />
              <Link href="/teamview" style={neutralPanelButton}>
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
              <Link href="/definitions" style={neutralPanelButton}>
                Open Definitions
              </Link>
            </div>
          </section>

          <section style={definitionSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>AI Assistant</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, maxWidth: 720 }}>
                  {aiAssistantChoice === "Yes"
                    ? `AI Assistant is turned on for setup. Current status: ${aiConnectionStatus}.`
                    : aiAssistantChoice === "No"
                      ? "AI Assistant is currently turned off for this version of Policy Manager."
                      : "AI Assistant can be added later. This version stays ready for a simple future setup path."}
                </div>
              </div>
              <Link href="/setup" style={neutralPanelButton}>
                Open AI Setup
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const neutralHeaderButton = {
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 14,
  color: "#10221a",
  background: "#ffffff",
  border: "1px solid #dbe7de",
  display: "inline-block",
};

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

const heroActionButton = {
  background: "#ffffff",
  border: "1px solid #dbe7de",
  borderRadius: 12,
  padding: "14px 18px",
  fontSize: 22,
  fontWeight: 800,
  color: "#10221a",
  cursor: "pointer",
};

const heroSecondaryButton = {
  background: "#ffffff",
  border: "1px solid #dbe7de",
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 16,
  fontWeight: 700,
  color: "#496156",
  cursor: "pointer",
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

const neutralPanelButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  display: "inline-block",
};

const definitionSection = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};
