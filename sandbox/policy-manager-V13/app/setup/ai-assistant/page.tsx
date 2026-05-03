"use client";

import Link from "next/link";
import { CabinetGraphic } from "../../cabinet";
import { useSiteConfig } from "../../useSiteConfig";

const providerCards = [
  {
    key: "n8n-webhook",
    title: "n8n Automation (Recommended)",
    note: "Connect to a central n8n workflow. This keeps API keys out of the app and makes it easy to swap AI models later without rebuilding the website.",
  },
  {
    key: "google-gemini",
    title: "Google Gemini Direct",
    note: "Connects directly to the Gemini API. Requires pasting a Google API key.",
  },
  {
    key: "managed-later",
    title: "Ask Kate to help later",
    note: "Use this if the company wants the feature planned now but connected later.",
  },
];

export default function AiAssistantInstallPage() {
  const { config, updateConfig, isLoaded } = useSiteConfig();

  if (!isLoaded) return null;

  const providerName = config.aiProviderName || "No provider selected yet";
  const setupNotes = config.aiSetupNotes || "";
  const n8nWebhookUrl = config.aiN8nWebhookUrl || "";

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager V11 <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· AI Install</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Simple setup path</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/setup" style={whiteButtonLink}>Back to Setup</Link>
            <Link href="/create/ai-assistant" style={whiteButtonLink}>Open AI Assistant</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 20 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Install AI Assistant</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 20 }}>
              This page is the company-facing setup path. The goal is simple: choose how the company wants to power AI Assistant, follow the connection steps, and mark the feature ready.
            </div>

            <div style={statusCard}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#567164", marginBottom: 6 }}>Current setup status</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{config.aiConnectionStatus}</div>
              <div style={{ fontSize: 14, color: "#60766b" }}>Provider: {providerName}</div>
            </div>
          </section>

          <section style={card}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>Choose your AI connection path</div>
            <div style={{ display: "grid", gap: 12 }}>
              {providerCards.map((provider) => {
                const active = config.aiProviderName === provider.title;
                return (
                  <button
                    key={provider.key}
                    type="button"
                    onClick={() => updateConfig({ aiProviderName: provider.title, aiProviderChoice: provider.title, aiConnectionStatus: provider.key === "managed-later" ? "Waiting for setup help" : "Connection steps ready" })}
                    style={active ? activeOptionButton : optionButton}
                  >
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{provider.title}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>{provider.note}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={card}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>Connection details</div>

            {config.aiProviderName === "n8n Automation (Recommended)" ? (
              <div style={{ display: "grid", gap: 14 }}>
                <div style={stepCard}>
                  <strong>Setup step:</strong> Paste your n8n Production Webhook URL below. Policy Manager will send drafting requests to this URL.
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#466255", marginBottom: 8 }}>n8n Webhook URL</label>
                  <input
                    value={n8nWebhookUrl}
                    onChange={(event) => updateConfig({ aiN8nWebhookUrl: event.target.value })}
                    placeholder="https://your-n8n-instance/webhook/..."
                    style={inputStyle}
                  />
                </div>
              </div>
            ) : config.aiProviderName === "Google Gemini Direct" ? (
              <div style={{ display: "grid", gap: 14 }}>
                <div style={stepCard}>
                  <strong>Setup step:</strong> Because API keys must stay secret, you cannot paste the Gemini key here in the browser. You must add it to the Vercel deployment environment as <code style={{ background: "#e2e8e4", padding: "2px 6px", borderRadius: 4 }}>GEMINI_API_KEY</code>.
                </div>
              </div>
            ) : (
              <div style={stepCard}>Select a provider above to see connection steps.</div>
            )}
          </section>

          <section style={card}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>Setup notes</div>
            <textarea
              value={setupNotes}
              onChange={(event) => updateConfig({ aiSetupNotes: event.target.value })}
              placeholder="Keep simple notes here about where the key lives, who set it up, or what still needs to be done."
              style={textAreaStyle}
            />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
              <button type="button" onClick={() => updateConfig({ aiConnectionStatus: "Connected" })} style={primaryButton}>Mark connected</button>
              <button type="button" onClick={() => updateConfig({ aiConnectionStatus: "Waiting for setup help" })} style={secondaryButton}>Mark help needed</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const statusCard = { border: "1px solid #dbe7de", borderRadius: 14, padding: 16, background: "#f8fbf9" };
const stepCard = { border: "1px solid #dbe7de", borderRadius: 14, padding: 14, background: "#f8fbf9", fontSize: 14, lineHeight: 1.7 };
const optionButton = { textAlign: "left" as const, border: "1px solid #dbe7de", background: "#ffffff", color: "#31473d", borderRadius: 14, padding: "14px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer" };
const activeOptionButton = { textAlign: "left" as const, border: "1px solid #1f5d24", background: "#edf7ef", color: "#1f5d24", borderRadius: 14, padding: "14px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer" };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#f8fbf9", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const };
const textAreaStyle = { width: "100%", minHeight: 120, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, resize: "vertical" as const };
const whiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de" };
const primaryButton = { background: "#ffffff", color: "#10221a", padding: "10px 14px", borderRadius: 10, fontWeight: 800, border: "1px solid #10221a", cursor: "pointer" };
const secondaryButton = { background: "#ffffff", color: "#10221a", padding: "10px 14px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de", cursor: "pointer" };
