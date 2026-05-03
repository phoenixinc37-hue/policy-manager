"use client";

import Link from "next/link";
import { useState } from "react";
import { CabinetGraphic } from "../../../cabinet";
import { saveDefinitionAction, deleteDefinitionAction } from "../../../actions";

export function EditClient({ item }: { item: any }) {
  const [label, setLabel] = useState(item.label);
  const [definition, setDefinition] = useState(item.definition);
  const [isSaving, setIsSaving] = useState(false);

  const saveDefinition = async () => {
    if (!label.trim() || !definition.trim() || isSaving) return;
    setIsSaving(true);
    await saveDefinitionAction(item.key, label.trim(), definition.trim());
    window.location.href = "/definitions";
  };

  const deleteDefinition = async () => {
    if (isSaving) return;
    setIsSaving(true);
    await deleteDefinitionAction(item.key);
    window.location.href = "/definitions";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V10 <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Edit Definition</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Update existing definition</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/definitions" style={secondaryLinkButton}>Back to Definitions</Link>
            <Link href="/" style={secondaryLinkButton}>Home</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Edit definition</div>
            <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 760 }}>
              Update the label or description for this definition. Changes will reflect on the home page immediately if definitions are active.
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <div style={fieldLabel}>Definition name</div>
                <input value={label} onChange={(event) => setLabel(event.target.value)} style={inputStyle} />
              </div>

              <div>
                <div style={fieldLabel}>Definition content</div>
                <textarea
                  value={definition}
                  onChange={(event) => setDefinition(event.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <button type="button" onClick={saveDefinition} style={saveButton}>Save Changes</button>
              <button type="button" onClick={deleteDefinition} style={deleteButton}>Delete</button>
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

const deleteButton = {
  background: "#ffffff",
  color: "#d32f2f",
  border: "1px solid #ffcdd2",
  borderRadius: 10,
  padding: "11px 16px",
  fontWeight: 700,
  cursor: "pointer",
};
