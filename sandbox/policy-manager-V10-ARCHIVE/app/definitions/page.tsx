"use client";

import Link from "next/link";
import { CabinetGraphic } from "../cabinet";
import { useSiteConfig } from "../useSiteConfig";

export default function DefinitionsPage() {
  const { config, updateConfig, isLoaded, defaultDefinitions } = useSiteConfig();

  if (!isLoaded) return null;

  const definitions = config.definitions?.length ? config.definitions : defaultDefinitions;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V10 <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Definitions</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Definitions Library</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={secondaryLinkButton}>Home</Link>
            <Link href="/setup" style={secondaryLinkButton}>Setup</Link>
            <Link href="/definitions/create" style={primaryLinkButton}>Add Definition</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 16 }}>
          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Definitions</div>
                <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 760 }}>
                  Review the active definitions for this version of Policy Manager. Each definition can be edited individually, and new definitions can be added as needed.
                </div>
              </div>
              <button
                type="button"
                onClick={() => updateConfig({ includeCoreDefinitions: config.includeCoreDefinitions === "Yes" ? "No" : "Yes" })}
                style={toggleButton}
              >
                {config.includeCoreDefinitions === "Yes" ? "Set Definitions to No" : "Set Definitions to Yes"}
              </button>
            </div>
          </section>

          {definitions.map((item) => (
            <section key={item.key} style={definitionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: "#31473d", lineHeight: 1.8 }}>{item.definition}</div>
                </div>
                <Link href={`/definitions/edit/${item.key}`} style={editButton}>
                  Edit
                </Link>
              </div>
            </section>
          ))}
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

const definitionCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const primaryLinkButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const secondaryLinkButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const editButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
  display: "inline-block",
};

const toggleButton = {
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
  cursor: "pointer",
};
