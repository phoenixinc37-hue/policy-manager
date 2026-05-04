"use client";

import Link from "next/link";
import { useState } from "react";
import { CabinetGraphic } from "../../cabinet";
import { useSiteConfig } from "../../useSiteConfig";

export default function CreateDefinitionPage() {
  const { config, updateConfig, isLoaded } = useSiteConfig();
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [label, setLabel] = useState("");
  const [definition, setDefinition] = useState("");

  if (!isLoaded) return null;

  const saveDefinition = () => {
    if (!label.trim() || !definition.trim()) return;

    const key = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `definition-${Date.now()}`;

    const nextDefinitions = [
      ...(config.definitions || []),
      {
        key,
        label: label.trim(),
        definition: definition.trim(),
      },
    ];

    updateConfig({
      definitions: nextDefinitions,
      includeCoreDefinitions: "Yes",
      definitionMode: mode,
    });

    window.location.href = "/definitions";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V13 <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Add Definition</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Create a new definition</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/definitions" style={secondaryLinkButton}>Back to Definitions</Link>
            <Link href="/" style={secondaryLinkButton}>Home</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Add a definition</div>
            <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 760 }}>
              Choose whether to create this definition manually or through the AI assistant pathway, then save it into the definitions page.
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
              <button type="button" onClick={() => setMode("manual")} style={mode === "manual" ? activeModeButton : modeButton}>Build manually</button>
              <button type="button" onClick={() => setMode("ai")} style={mode === "ai" ? activeModeButton : modeButton}>Use AI assistant</button>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <div style={fieldLabel}>Definition name</div>
                <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Type definition name" style={inputStyle} />
              </div>

              <div>
                <div style={fieldLabel}>Definition content</div>
                <textarea
                  value={definition}
                  onChange={(event) => setDefinition(event.target.value)}
                  placeholder={mode === "manual" ? "Write the definition here" : "Paste or refine the AI-generated definition here"}
                  style={textareaStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button type="button" onClick={saveDefinition} style={saveButton}>Save Definition</button>
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

const secondaryLinkButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const modeButton = {
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
  cursor: "pointer",
};

const activeModeButton = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
  cursor: "pointer",
};

const fieldLabel = {
  fontSize: 13,
  fontWeight: 700,
  color: "#567164",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid #cfe1d2",
  padding: 12,
  fontSize: 14,
  fontFamily: "Arial, sans-serif",
  color: "#10221a",
};

const textareaStyle = {
  width: "100%",
  minHeight: 180,
  borderRadius: 12,
  border: "1px solid #cfe1d2",
  padding: 12,
  fontSize: 14,
  lineHeight: 1.6,
  fontFamily: "Arial, sans-serif",
  resize: "vertical" as const,
  color: "#10221a",
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
