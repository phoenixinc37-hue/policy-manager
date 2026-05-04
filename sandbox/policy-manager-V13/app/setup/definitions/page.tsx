"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CabinetGraphic } from "../../cabinet";
import { useSiteConfig } from "../../useSiteConfig";

export default function DefinitionsSetupPage({ searchParams }: { searchParams?: { mode?: string } }) {
  const { config, updateConfig, isLoaded, defaultDefinitions } = useSiteConfig();
  const [draftDefinitions, setDraftDefinitions] = useState(config.definitions);

  useEffect(() => {
    setDraftDefinitions(config.definitions);
  }, [config.definitions]);

  useEffect(() => {
    if (!isLoaded) return;
    const mode = searchParams?.mode === "ai" ? "ai" : "manual";
    if (config.definitionMode !== mode) {
      updateConfig({ definitionMode: mode });
    }
  }, [searchParams, config.definitionMode, updateConfig, isLoaded]);

  if (!isLoaded) return null;

  const mode = searchParams?.mode === "ai" ? "ai" : "manual";

  const handleDefinitionChange = (key: string, value: string) => {
    setDraftDefinitions((prev) => prev.map((item) => (item.key === key ? { ...item, definition: value } : item)));
  };

  const saveDefinitions = () => {
    updateConfig({ definitions: draftDefinitions, includeCoreDefinitions: "Yes", definitionMode: mode });
  };

  const resetDefinitions = () => {
    setDraftDefinitions(defaultDefinitions);
    updateConfig({ definitions: defaultDefinitions, includeCoreDefinitions: "Yes", definitionMode: "manual" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V13 <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Definitions Setup</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Template Version</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/setup" style={primaryLinkButton}>Back to Setup</Link>
            <Link href="/" style={greenMenuButton}>Home</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Definitions Setup</div>
            <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 760 }}>
              For V10, this page controls exactly what appears inside the Core Definitions panel on the home page. If definitions are enabled, the home page will use the saved definitions below. If definitions are disabled, the home page will show a small action button to add them later.
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
              <div style={modeCard(mode === "manual")}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Build manually</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>
                  Write and control each definition directly.
                </div>
                <Link href="/setup/definitions?mode=manual" style={mode === "manual" ? activeLinkButton : secondaryLinkButton}>Use manual mode</Link>
              </div>

              <div style={modeCard(mode === "ai")}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Use AI assistant</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>
                  In this version, AI mode uses the same editable structure so the home page stays accurate and controlled.
                </div>
                <Link href="/setup/definitions?mode=ai" style={mode === "ai" ? activeLinkButton : secondaryLinkButton}>Use AI mode</Link>
              </div>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>Home-page definition content</div>
            <div style={{ display: "grid", gap: 16 }}>
              {draftDefinitions.map((item) => (
                <div key={item.key} style={definitionEditorCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{item.label}</div>
                  <textarea
                    value={item.definition}
                    onChange={(event) => handleDefinitionChange(item.key, event.target.value)}
                    style={definitionTextarea}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <button type="button" onClick={saveDefinitions} style={saveButton}>Save definitions to home page</button>
              <button type="button" onClick={resetDefinitions} style={resetButton}>Reset to default definitions</button>
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

function modeCard(active: boolean) {
  return {
    border: active ? "1px solid #1f5d24" : "1px solid #dbe7de",
    borderRadius: 16,
    padding: 18,
    background: active ? "#edf7ef" : "#f9fbf9",
  } as const;
}

const primaryLinkButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
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

const secondaryLinkButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
  display: "inline-block",
};

const activeLinkButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
  display: "inline-block",
};

const definitionEditorCard = {
  border: "1px solid #dbe7de",
  borderRadius: 14,
  padding: 16,
  background: "#f9fbf9",
};

const definitionTextarea = {
  width: "100%",
  minHeight: 110,
  borderRadius: 12,
  border: "1px solid #cfe1d2",
  padding: 12,
  fontSize: 14,
  lineHeight: 1.6,
  fontFamily: "Arial, sans-serif",
  resize: "vertical" as const,
  color: "#10221a",
  background: "#ffffff",
};

const saveButton = {
  background: "#1f5d24",
  color: "#ffffff",
  border: "1px solid #1f5d24",
  borderRadius: 10,
  padding: "11px 16px",
  fontWeight: 700,
  cursor: "pointer",
};

const resetButton = {
  background: "#ffffff",
  color: "#1f5d24",
  border: "1px solid #cfe1d2",
  borderRadius: 10,
  padding: "11px 16px",
  fontWeight: 700,
  cursor: "pointer",
};
