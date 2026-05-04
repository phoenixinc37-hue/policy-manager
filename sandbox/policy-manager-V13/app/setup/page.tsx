"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { CabinetGraphic } from "../cabinet";
import { useSiteConfig } from "../useSiteConfig";

const employerGroupOptions = ["Managers", "Leadership", "Custom"];
const employeeGroupOptions = ["Employees", "Team", "Staff", "Custom"];
const policyStatementOptions = [
  "Policy Statement goes here (default)",
  "Policies only work when people understand them, follow them, and can find them when they need them.",
  "Custom",
];

const policyMessageHomeOptions = [
  "Policy Message goes here (default)",
  "Clear policies create consistency, accountability, and confidence across the business.",
  "Custom",
];
const coreDefinitionOptions = ["Yes", "No"];
const aiAssistantOptions = ["Yes", "No", "Maybe later"];
const aiProviderOptions = ["Use your own API key", "Ask Kate to help later"];
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

export default function SetupPage() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const { config, updateConfig, isLoaded } = useSiteConfig();
  const [newSiteName, setNewSiteName] = useState("");
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonEmail, setNewPersonEmail] = useState("");
  const [newPersonLevelId, setNewPersonLevelId] = useState("");
  const [newPersonSiteId, setNewPersonSiteId] = useState("");

  const {
    businessName,
    employerGroup,
    employerGroupCustom,
    employeeGroup,
    employeeGroupCustom,
    policyMessage,
    policyMessageCustom,
    policyMessageHomePage,
    policyMessageHomePageCustom,
    includeCoreDefinitions,
    actionBubbleColor,
    employeeActionButtonColor,
    generalActionButtonColor,
    aiAssistantSetupChoice,
    aiProviderChoice,
    aiConnectionStatus,
    siteLocations,
    accessLevels,
    personnel,
  } = config;

  const [editingBusinessName, setEditingBusinessName] = useState(false);
  const [tempBusinessName, setTempBusinessName] = useState(businessName);

  useEffect(() => {
    setTempBusinessName(businessName);
  }, [businessName]);

  const peopleSummary = useMemo(() => {
    if (!personnel.length) return "Open";
    return `${personnel.length} people added`;
  }, [personnel.length]);

  if (!isLoaded) return null;

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
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V13 <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Setup Page</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Template Version</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={whiteTopButton}>Home</Link>
            <Link href="/manager" style={whiteTopButton}>Leadership View</Link>
            <Link href="/teamview" style={whiteTopButton}>Team View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={heroCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Set up your Policy Manager</div>
            <div style={{ fontSize: 15, color: "#60766b", lineHeight: 1.7, maxWidth: 840 }}>
              Customize your Policy Manual one question at a time. Use suggestions or create your own. You can always come back and edit your answers later.
            </div>
          </section>

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 1</div>
              <div style={questionText}>What is the name of your business?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "business-name")} style={answerButton}>
                {businessName ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "business-name" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Business name</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
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
              <div style={questionText}>What term do you want to use to describe your employer group?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employer-group")} style={answerButton}>
                {employerGroup ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "employer-group" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Employer group term</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
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
              <div style={questionText}>What term do you want to use to describe your employee group?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employee-group")} style={answerButton}>
                {employeeGroup ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "employee-group" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Employee group term</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
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
              <div style={questionText}>What is your policy statement?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "policy-statement")} style={answerButton}>
                {policyMessage ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "policy-statement" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Policy statement</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {policyStatementOptions.map((option) => (
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
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Custom policy statement</div>
                  <input
                    value={policyMessageCustom}
                    onChange={(event) => updateConfig({ policyMessageCustom: event.target.value.slice(0, 140) })}
                    placeholder="Type policy statement"
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
              <div style={questionText}>What is your policy message?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "policy-message-home-page")} style={answerButton}>
                {policyMessageHomePage ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "policy-message-home-page" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Policy message for home page</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {policyMessageHomeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ policyMessageHomePage: option })}
                    style={policyMessageHomePage === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {policyMessageHomePage === "Custom" && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#567164", marginBottom: 8 }}>Custom policy message</div>
                  <input
                    value={policyMessageHomePageCustom}
                    onChange={(event) => updateConfig({ policyMessageHomePageCustom: event.target.value })}
                    placeholder="Type policy message"
                    style={inputStyle}
                  />
                  <div style={characterCount}>{policyMessageHomePageCustom.length}/140</div>
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 6</div>
              <div style={questionText}>Do you want to include core definitions in your Policy Manager home page?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "core-definitions")} style={answerButton}>
                {includeCoreDefinitions ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "core-definitions" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Include core definitions</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
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
                    <Link href="/setup/definitions?mode=manual" style={whiteTopButton}>Build manually</Link>
                    <Link href="/setup/definitions?mode=ai" style={whiteTopButton}>Use AI assistant</Link>
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
              <div style={questionLabel}>Question 7</div>
              <div style={questionText}>Do you want to add AI Assistant to this version of Policy Manager?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "ai-assistant-setup")} style={answerButton}>
                {aiAssistantSetupChoice ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "ai-assistant-setup" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Add AI Assistant</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                {aiAssistantOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateConfig({ aiAssistantSetupChoice: option })}
                    style={aiAssistantSetupChoice === option ? activeOptionButton : optionButton}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div style={subFlowCard}>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>What this means</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, display: "grid", gap: 10 }}>
                  <div><strong>Yes</strong> turns on the setup path for AI-assisted drafting and formatting in Policy Manager.</div>
                  <div><strong>No</strong> keeps Policy Manager manual only, with no AI setup required.</div>
                  <div><strong>Maybe later</strong> leaves the feature off for now and keeps a clean path to add it when the company is ready.</div>
                </div>
              </div>

              {aiAssistantSetupChoice === "Yes" && (
                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Add AI Assistant</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 14 }}>
                    This should be simple for the company owner. Choose the setup path below, then follow the short steps. Once connected, AI Assistant can help with document drafting and formatting.
                  </div>

                  <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                    {aiProviderOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateConfig({ aiProviderChoice: option })}
                        style={aiProviderChoice === option ? activeOptionButton : optionButton}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div style={statusPill}>{aiConnectionStatus}</div>

                  {aiProviderChoice === "Use your own API key" && (
                    <div style={{ ...subFlowCard, marginTop: 16 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Simple owner path</div>
                      <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, display: "grid", gap: 10, marginBottom: 14 }}>
                        <div>1. Create or copy your AI provider API key.</div>
                        <div>2. Add that key to your Policy Manager deployment once.</div>
                        <div>3. Mark the setup complete.</div>
                        <div>4. Start using AI Assistant in Create.</div>
                      </div>
                      <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 14 }}>
                        For non-technical users, this can later become a guided button flow with copy-paste steps or a managed add-on. For now, this setup panel makes the path clear instead of hiding it.
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => updateConfig({ aiConnectionStatus: "Connection steps ready" })}
                          style={whiteTopButtonButton}
                        >
                          Mark steps ready
                        </button>
                        <button
                          type="button"
                          onClick={() => updateConfig({ aiConnectionStatus: "Connected" })}
                          style={whiteTopButtonButton}
                        >
                          Mark connected
                        </button>
                        <Link href="/setup/ai-assistant" style={whiteTopButton}>Open AI Install</Link>
                        <Link href="/create/ai-assistant" style={whiteTopButton}>Open AI Assistant page</Link>
                      </div>
                    </div>
                  )}

                  {aiProviderChoice === "Ask Kate to help later" && (
                    <div style={{ ...subFlowCard, marginTop: 16 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>Help later path</div>
                      <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 14 }}>
                        This choice keeps AI Assistant planned without forcing setup now. When the company is ready, Kate can help walk through the provider choice and connection steps.
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => updateConfig({ aiConnectionStatus: "Waiting for setup help" })}
                          style={whiteTopButtonButton}
                        >
                          Mark help needed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {aiAssistantSetupChoice === "No" && (
                <div style={subFlowCard}>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>
                    This version will stay manual-only. AI Assistant can still be added later without rebuilding the rest of the setup.
                  </div>
                </div>
              )}

              {aiAssistantSetupChoice === "Maybe later" && (
                <div style={subFlowCard}>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>
                    This keeps the AI option visible in planning without forcing setup right now. It is the best choice when the company wants to launch first and decide on AI later.
                  </div>
                </div>
              )}
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 8</div>
              <div style={questionText}>Who needs access to Policy Manager, what locations do they belong to, and what authority level do they have?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "people-access-setup")} style={answerButton}>
                {peopleSummary !== "Open" ? "Edit" : "Open"}
              </button>
            </div>
          </section>

          {openPanel === "people-access-setup" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>People & Access Setup</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>How this setup works</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, display: "grid", gap: 8 }}>
                    <div>1. Add the sites or locations used by this company.</div>
                    <div>2. Review or edit the authority levels.</div>
                    <div>3. Add each person with their email, level, and assigned site.</div>
                    <div>4. Use this structure later for access rules, visibility, and approvals.</div>
                  </div>
                </div>

                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Sites / locations</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                    <input
                      value={newSiteName}
                      onChange={(event) => setNewSiteName(event.target.value)}
                      placeholder="Add site or location"
                      style={{ ...inputStyle, flex: "1 1 280px" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const name = newSiteName.trim();
                        if (!name) return;
                        updateConfig({
                          siteLocations: [...siteLocations, { id: createId("site"), name }],
                        });
                        setNewSiteName("");
                      }}
                      style={whiteTopButtonButton}
                    >
                      Add site
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {siteLocations.length ? siteLocations.map((site) => (
                      <div key={site.id} style={listRowCard}>
                        <div style={{ fontWeight: 700 }}>{site.name}</div>
                        <button
                          type="button"
                          onClick={() => updateConfig({ siteLocations: siteLocations.filter((item) => item.id !== site.id), personnel: personnel.map((person) => person.siteLocationId === site.id ? { ...person, siteLocationId: "" } : person) })}
                          style={miniGhostButton}
                        >
                          Remove
                        </button>
                      </div>
                    )) : <div style={emptyStateText}>No sites added yet.</div>}
                  </div>
                </div>

                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Authority levels</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {accessLevels.map((level, index) => (
                      <div key={level.id} style={levelCard}>
                        <div style={{ display: "grid", gap: 10 }}>
                          <input
                            value={level.name}
                            onChange={(event) => {
                              const next = [...accessLevels];
                              next[index] = { ...level, name: event.target.value };
                              updateConfig({ accessLevels: next });
                            }}
                            placeholder="Level name"
                            style={inputStyle}
                          />
                          <input
                            value={level.description}
                            onChange={(event) => {
                              const next = [...accessLevels];
                              next[index] = { ...level, description: event.target.value };
                              updateConfig({ accessLevels: next });
                            }}
                            placeholder="Short description"
                            style={inputStyle}
                          />
                          <textarea
                            value={level.accessSummary}
                            onChange={(event) => {
                              const next = [...accessLevels];
                              next[index] = { ...level, accessSummary: event.target.value };
                              updateConfig({ accessLevels: next });
                            }}
                            placeholder="Access summary"
                            style={textAreaStyle}
                          />
                          <textarea
                            value={level.approvalSummary}
                            onChange={(event) => {
                              const next = [...accessLevels];
                              next[index] = { ...level, approvalSummary: event.target.value };
                              updateConfig({ accessLevels: next });
                            }}
                            placeholder="Approval summary"
                            style={textAreaStyle}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={subFlowCard}>
                  <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>People</div>
                  <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
                    <input
                      value={newPersonName}
                      onChange={(event) => setNewPersonName(event.target.value)}
                      placeholder="Full name"
                      style={inputStyle}
                    />
                    <input
                      value={newPersonEmail}
                      onChange={(event) => setNewPersonEmail(event.target.value)}
                      placeholder="Email address"
                      style={inputStyle}
                    />
                    <select value={newPersonLevelId} onChange={(event) => setNewPersonLevelId(event.target.value)} style={inputStyle}>
                      <option value="">Select authority level</option>
                      {accessLevels.map((level) => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                    <select value={newPersonSiteId} onChange={(event) => setNewPersonSiteId(event.target.value)} style={inputStyle}>
                      <option value="">Select site / location</option>
                      {siteLocations.map((site) => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                      ))}
                    </select>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          const fullName = newPersonName.trim();
                          const email = newPersonEmail.trim();
                          if (!fullName || !email) return;
                          updateConfig({
                            personnel: [
                              ...personnel,
                              {
                                id: createId("person"),
                                fullName,
                                email,
                                accessLevelId: newPersonLevelId,
                                siteLocationId: newPersonSiteId,
                              },
                            ],
                          });
                          setNewPersonName("");
                          setNewPersonEmail("");
                          setNewPersonLevelId("");
                          setNewPersonSiteId("");
                        }}
                        style={whiteTopButtonButton}
                      >
                        Add person
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {personnel.length ? personnel.map((person) => {
                      const level = accessLevels.find((item) => item.id === person.accessLevelId);
                      const site = siteLocations.find((item) => item.id === person.siteLocationId);
                      return (
                        <div key={person.id} style={listRowCardStack}>
                          <div style={{ fontWeight: 800 }}>{person.fullName}</div>
                          <div style={metaText}>{person.email}</div>
                          <div style={metaText}>Level: {level?.name || "Not assigned"}</div>
                          <div style={metaText}>Site: {site?.name || "Not assigned"}</div>
                          <div>
                            <button
                              type="button"
                              onClick={() => updateConfig({ personnel: personnel.filter((item) => item.id !== person.id) })}
                              style={miniGhostButton}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    }) : <div style={emptyStateText}>No people added yet.</div>}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 9</div>
              <div style={questionText}>What color do you want to use for your action bubbles throughout Policy Manager?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "action-bubble-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: actionBubbleColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{actionBubbleColor ? "Edit" : "Open"}</span>
              </button>
            </div>
          </section>

          {openPanel === "action-bubble-color" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Action bubble color</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={swatchGrid}>
                {actionBubbleSwatches.map((swatch) => (
                  <button
                    key={swatch.value}
                    type="button"
                    onClick={() => updateConfig({ actionBubbleColor: swatch.value })}
                    style={actionBubbleColor === swatch.value ? activeSwatchButton : swatchButton}
                  >
                    <span style={{ ...swatchCircle, background: swatch.value }} />
                    <span>{swatch.label}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 10</div>
              <div style={questionText}>What color do you want to use for employee action buttons?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "employee-action-button-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: employeeActionButtonColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{employeeActionButtonColor ? "Edit" : "Open"}</span>
              </button>
            </div>
          </section>

          {openPanel === "employee-action-button-color" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>Employee action button color</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
              <div style={swatchGrid}>
                {actionBubbleSwatches.map((swatch) => (
                  <button
                    key={swatch.value}
                    type="button"
                    onClick={() => updateConfig({ employeeActionButtonColor: swatch.value })}
                    style={employeeActionButtonColor === swatch.value ? activeSwatchButton : swatchButton}
                  >
                    <span style={{ ...swatchCircle, background: swatch.value }} />
                    <span>{swatch.label}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section style={questionPanel}>
            <div style={questionTextBlock}>
              <div style={questionLabel}>Question 11</div>
              <div style={questionText}>What color do you want to use for general action buttons?</div>
            </div>
            <div style={answerArea}>
              <button type="button" onClick={() => togglePanel(openPanel, setOpenPanel, "general-action-button-color")} style={{ ...answerButton, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, background: generalActionButtonColor, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                <span>{generalActionButtonColor ? "Edit" : "Open"}</span>
              </button>
            </div>
          </section>

          {openPanel === "general-action-button-color" && (
            <section style={dropdownCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#567164" }}>General action button color</div>
                <button type="button" onClick={() => setOpenPanel(null)} style={saveSmallButton}>Save</button>
              </div>
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

const saveSmallButton = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "4px 10px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
};

function togglePanel(current: string | null, setPanel: (value: string | null) => void, next: string) {
  setPanel(current === next ? null : next);
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
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
  color: "#dc2626",
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

const textAreaStyle = {
  width: "100%",
  minHeight: 90,
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #d6e4d8",
  background: "#f8fbf9",
  fontSize: 15,
  color: "#10221a",
  boxSizing: "border-box" as const,
  resize: "vertical" as const,
  fontFamily: "Arial, sans-serif",
};

const levelCard = {
  border: "1px solid #dbe7de",
  borderRadius: 14,
  padding: 16,
  background: "#ffffff",
};

const listRowCard = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  border: "1px solid #dbe7de",
  borderRadius: 12,
  padding: "12px 14px",
  background: "#ffffff",
};

const listRowCardStack = {
  display: "grid",
  gap: 6,
  border: "1px solid #dbe7de",
  borderRadius: 12,
  padding: "14px 16px",
  background: "#ffffff",
};

const metaText = {
  fontSize: 13,
  color: "#567164",
};

const emptyStateText = {
  fontSize: 14,
  color: "#60766b",
};

const miniGhostButton = {
  background: "#ffffff",
  color: "#10221a",
  padding: "8px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
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

const whiteTopButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};

const whiteTopButtonButton = {
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
};

const statusPill = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  fontSize: 13,
  fontWeight: 800,
  color: "#10221a",
};
