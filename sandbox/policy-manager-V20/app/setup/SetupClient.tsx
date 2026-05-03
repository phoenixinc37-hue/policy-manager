"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { CabinetGraphic } from "../cabinet";
import { saveConfigAction } from "../actions";

const employerGroupOptions = ["Managers", "Leadership", "Custom"];
const employeeGroupOptions = ["Employees", "Team", "Staff", "Custom"];
const policyMessageOptions = [
  "Policies only work when people understand them, follow them, and can find them when they need them.",
  "Clear policies create consistency, accountability, and confidence across the business.",
  "Custom",
];
const coreDefinitionOptions = ["Yes", "No"];
const actionBubbleSwatches = [
  { label: "Dark Green", value: "#1f5d24" },
  { label: "Light Green", value: "#66a97a" },
  { label: "Navy", value: "#1f3f75" },
  { label: "Slate Blue", value: "#4a628a" },
  { label: "Charcoal", value: "#374151" },
  { label: "Soft Gray", value: "#7b8794" },
  { label: "Burgundy", value: "#7a1f3d" },
  { label: "Teal", value: "#0f766e" },
];

export function SetupClient({ initialConfig }: { initialConfig: any }) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [config, setConfig] = useState(initialConfig);
  const [isPending, startTransition] = useTransition();

  const updateConfig = (updates: any) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    
    startTransition(() => {
      const formData = new FormData();
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      saveConfigAction(formData);
    });
  };

  const {
    businessName,
    employerGroup,
    employerGroupCustom,
    employeeGroup,
    employeeGroupCustom,
    policyMessage,
    policyMessageCustom,
    includeCoreDefinitions,
    actionBubbleColor,
    employeeActionButtonColor,
    generalActionButtonColor,
  } = config;

  const employerDisplay = employerGroup === "Custom" ? employerGroupCustom || "Custom" : employerGroup;
  const employeeDisplay = employeeGroup === "Custom" ? employeeGroupCustom || "Custom" : employeeGroup;
  const policyMessageDisplay = policyMessage === "Custom" ? policyMessageCustom || "Custom" : policyMessage;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V10 <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Setup</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Template Version</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={primaryLinkButton}>Home</Link>
            <Link href="/manager" style={greenMenuButton}>Leadership View</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={heroCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Set up your Policy Manager</div>
            <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 840 }}>
              This page is being rebuilt one question at a time. Each setup item lives in a long answer panel so the site can be shaped clearly without clutter.
            </div>
          </section>

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 1</div>
              <div style={questionText}>What is the name of your business?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "business-name")} style={answerButton}>
                {businessName || "Custom"}
              </button>
            </div>
          </section>

          {openPanel === "business-name" && (
            <section style={dropdownCard}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Business name</div>
              <input
                value={businessName}
                onChange={(event) => updateConfig({ businessName: event.target.value })}
                placeholder="Type company name"
                style={inputStyle}
              />
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 2</div>
              <div style={questionText}>What word do you want to use to describe your employer group?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employer-group")} style={answerButton}>
                {employerDisplay}
              </button>
            </div>
          </section>

          {openPanel === "employer-group" && (
            <section style={dropdownCard}>
              <div style={{ display: "grid", gap: 12 }}>
                {employerGroupOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ employerGroup: option })}
                    style={employerGroup === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {employerGroup === "Custom" && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Custom employer group term</div>
                  <input
                    value={employerGroupCustom}
                    onChange={(event) => updateConfig({ employerGroupCustom: event.target.value })}
                    placeholder="Type employer group term"
                    style={inputStyle}
                  />
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 3</div>
              <div style={questionText}>What term do you want to use for the employee group?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employee-group")} style={answerButton}>
                {employeeDisplay}
              </button>
            </div>
          </section>

          {openPanel === "employee-group" && (
            <section style={dropdownCard}>
              <div style={{ display: "grid", gap: 12 }}>
                {employeeGroupOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ employeeGroup: option })}
                    style={employeeGroup === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {employeeGroup === "Custom" && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Custom employee group term</div>
                  <input
                    value={employeeGroupCustom}
                    onChange={(event) => updateConfig({ employeeGroupCustom: event.target.value })}
                    placeholder="Type employee group term"
                    style={inputStyle}
                  />
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 4</div>
              <div style={questionText}>What policy message would you like displayed under the top panel?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "policy-message")} style={answerButton}>
                {policyMessageDisplay}
              </button>
            </div>
          </section>

          {openPanel === "policy-message" && (
            <section style={dropdownCard}>
              <div style={{ display: "grid", gap: 12 }}>
                {policyMessageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ policyMessage: option })}
                    style={policyMessage === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {policyMessage === "Custom" && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Custom policy message</div>
                  <input
                    value={policyMessageCustom}
                    onChange={(event) => updateConfig({ policyMessageCustom: event.target.value.slice(0, 140) })}
                    placeholder="Type policy message"
                    style={inputStyle}
                  />
                  <div style={characterCount}>{policyMessageCustom.length}/140</div>
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 5</div>
              <div style={questionText}>Do you want to include core definitions in your Policy Manager home page?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "core-definitions")} style={answerButton}>
                {includeCoreDefinitions}
              </button>
            </div>
          </section>

          {openPanel === "core-definitions" && (
            <section style={dropdownCard}>
              <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                {coreDefinitionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ includeCoreDefinitions: option })}
                    style={includeCoreDefinitions === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {includeCoreDefinitions === "Yes" && (
                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Definitions Setup</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 14 }}>
                    Choose how you want to build the definitions page for this version of Policy Manager.
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href="/setup/definitions?mode=manual" style={primaryLinkButton}>Build manually</Link>
                    <Link href="/setup/definitions?mode=ai" style={greenMenuButton}>Use AI assistant</Link>
                  </div>
                </div>
              )}

              {includeCoreDefinitions === "No" && (
                <div style={subFlowCard}>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>
                    The home page will minimize the definitions section to a small reactivation bubble so it can be turned back on later.
                  </div>
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 6</div>
              <div style={questionText}>What color do you want to use for your action bubbles throughout Policy Manager?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "action-bubble-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: actionBubbleColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{actionBubbleSwatches.find((swatch) => swatch.value === actionBubbleColor)?.label ?? actionBubbleColor}</span>
              </button>
            </div>
          </section>

          {openPanel === "action-bubble-color" && (
            <section style={dropdownCard}>
              <div style={swatchGrid}>
                {actionBubbleSwatches.map((swatch) => {
                  const active = actionBubbleColor === swatch.value;
                  return (
                    <button
                      key={swatch.value}
                      type="button"
                      onClick={() => updateConfig({ actionBubbleColor: swatch.value })}
                      style={active ? activeSwatchButton : swatchButton}
                    >
                      <span style={{ ...swatchCircle, background: swatch.value }} />
                      <span>{swatch.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 7</div>
              <div style={questionText}>What color do you want to use for employee action buttons?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employee-action-button-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: employeeActionButtonColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{actionBubbleSwatches.find((swatch) => swatch.value === employeeActionButtonColor)?.label ?? employeeActionButtonColor}</span>
              </button>
            </div>
          </section>

          {openPanel === "employee-action-button-color" && (
            <section style={dropdownCard}>
              <div style={swatchGrid}>
                {actionBubbleSwatches.map((swatch) => {
                  const active = employeeActionButtonColor === swatch.value;
                  return (
                    <button
                      key={swatch.value}
                      type="button"
                      onClick={() => updateConfig({ employeeActionButtonColor: swatch.value })}
                      style={active ? activeSwatchButton : swatchButton}
                    >
                      <span style={{ ...swatchCircle, background: swatch.value }} />
                      <span>{swatch.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 8</div>
              <div style={questionText}>What color do you want to use for general action buttons?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "general-action-button-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: generalActionButtonColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{actionBubbleSwatches.find((swatch) => swatch.value === generalActionButtonColor)?.label ?? generalActionButtonColor}</span>
              </button>
            </div>
          </section>

          {openPanel === "general-action-button-color" && (
            <section style={dropdownCard}>
              <div style={swatchGrid}>
                {actionBubbleSwatches.map((swatch) => {
                  const active = generalActionButtonColor === swatch.value;
                  return (
                    <button
                      key={swatch.value}
                      type="button"
                      onClick={() => updateConfig({ generalActionButtonColor: swatch.value })}
                      style={active ? activeSwatchButton : swatchButton}
                    >
                      <span style={{ ...swatchCircle, background: swatch.value }} />
                      <span>{swatch.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function togglePanel(current: string | null, setPanel: (value: string | null) => void, next: string) {
  setPanel(current === next ? null : next);
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

const questionPanel = {
  background: "#ffffff",
  borderRadius: 18,
  padding: "22px 24px",
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap" as const,
};

const questionTextBlock = {
  flex: "1 1 620px",
};

const questionLabel = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#567164",
  marginBottom: 8,
};

const questionText = {
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1.35,
};

const answerArea = {
  flex: "0 0 auto",
  maxWidth: 360,
};

const answerButton = {
  border: "1px solid #cfe1d2",
  background: "#f6faf7",
  color: "#1f5d24",
  borderRadius: 999,
  padding: "14px 22px",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  minWidth: 220,
  maxWidth: 360,
  whiteSpace: "normal" as const,
  textAlign: "left" as const,
  lineHeight: 1.4,
};

const dropdownCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 20,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const subFlowCard = {
  marginTop: 12,
  border: "1px solid #dbe7de",
  borderRadius: 14,
  padding: 16,
  background: "#f8fbf9",
};

const optionButton = {
  textAlign: "left" as const,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  color: "#31473d",
  borderRadius: 14,
  padding: "14px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const activeOptionButton = {
  textAlign: "left" as const,
  border: "1px solid #1f5d24",
  background: "#edf7ef",
  color: "#1f5d24",
  borderRadius: 14,
  padding: "14px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #d6e4d8",
  background: "#f8fbf9",
  fontSize: 15,
  color: "#10221a",
  boxSizing: "border-box" as const,
};

const characterCount = {
  marginTop: 8,
  fontSize: 12,
  color: "#567164",
  textAlign: "right" as const,
};

const swatchGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
};

const swatchButton = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  textAlign: "left" as const,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  color: "#31473d",
  borderRadius: 14,
  padding: "14px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const activeSwatchButton = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  textAlign: "left" as const,
  border: "1px solid #1f5d24",
  background: "#edf7ef",
  color: "#1f5d24",
  borderRadius: 14,
  padding: "14px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const swatchCircle = {
  width: 22,
  height: 22,
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.12)",
  flexShrink: 0,
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

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
};
