import Link from "next/link";
import { CabinetGraphic } from "../../../cabinet";

function getValue(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function getLines(value: string) {
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AiDraftPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const title = getValue(searchParams?.title, "AI Draft");
  const type = getValue(searchParams?.type, "Policy");
  const version = getValue(searchParams?.version, "1.0");
  const author = getValue(searchParams?.author, "Scott Wilde");
  const review = getValue(searchParams?.review, "30 days · May 28, 2026");
  const circulateTo = getValue(searchParams?.circulateTo, "All");
  const distributionList = getValue(searchParams?.distributionList, "Not specified");
  const purpose = getValue(searchParams?.purpose, "AI-generated purpose based on the requested document type.");
  const scope = getValue(searchParams?.scope, "AI-generated scope based on the intended audience.");
  const policyStatement = getValue(searchParams?.policyStatement, "AI-generated core policy statement for this draft.");
  const procedureSteps = getValue(searchParams?.procedureSteps, "1. Follow the approved process\n2. Document the required steps\n3. Escalate exceptions as needed");
  const exceptionsNotes = getValue(searchParams?.exceptionsNotes, "No additional exceptions noted in the draft request.");
  const definitions = getValue(searchParams?.definitions, "Definitions will be refined during review.");
  const attachments = getValue(searchParams?.attachments, "No attachments or references listed yet.");

  const steps = getLines(procedureSteps);
  const attachmentLines = getLines(attachments);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· AI Draft</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={greenMenuButton}>Circulating</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 13, color: "#567164", fontWeight: 700, marginBottom: 8 }}>{type.toUpperCase()} · V{version}</div>
                <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>{title}</h1>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 10 }}>{type} · Author: {author}</div>
              </div>
              <div style={statusChip}>Generated draft</div>
            </div>

            <div style={metaBar}>
              <span>Review: {review}</span>
              <span>Circulate to: {circulateTo}</span>
              <span>Distribution: {distributionList}</span>
            </div>

            <section style={sectionCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>{purpose}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Scope</div>
              <p style={bodyText}>{scope}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Policy statement</div>
              <p style={bodyText}>{policyStatement}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Procedure / steps</div>
              <ol style={orderedList}>
                {steps.map((step, index) => (
                  <li key={`${step}-${index}`}>{step.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Exceptions / notes</div>
              <p style={bodyText}>{exceptionsNotes}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Definitions</div>
              <p style={bodyText}>{definitions}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Attachments / references</div>
              <ul style={orderedList}>
                {attachmentLines.map((line, index) => (
                  <li key={`${line}-${index}`}>{line}</li>
                ))}
              </ul>
            </section>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
              <Link href="/create/ai-assistant" style={greenMenuButton}>Back to template</Link>
              <Link href="/pending" style={primaryButton}>Send to pending</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const sectionCard = { borderRadius: 16, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 20, marginTop: 18 };
const sectionTitle = { fontSize: 18, fontWeight: 800, marginBottom: 12 };
const metaBar = { display: "flex", gap: 12, flexWrap: "wrap" as const, marginTop: 18, padding: "12px 14px", borderRadius: 12, background: "#f1f5f2", border: "1px solid #dbe7de", fontSize: 14, color: "#466255" };
const statusChip = { display: "inline-flex", alignItems: "center", padding: "10px 14px", borderRadius: 999, background: "#66a97a", color: "#ffffff", fontSize: 13, fontWeight: 800 };
const bodyText = { fontSize: 15, lineHeight: 1.7, color: "#31473d", margin: 0 };
const orderedList = { margin: 0, paddingLeft: 22, display: "grid", gap: 10, color: "#31473d", fontSize: 15, lineHeight: 1.7 };
const greenMenuButton = { textDecoration: "none", background: "#66a97a", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #66a97a" };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
