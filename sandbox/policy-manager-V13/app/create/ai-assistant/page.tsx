"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CabinetGraphic } from "../../cabinet";
import { generateAiDraft } from "./actions";
import { CURRENT_DRAFT_KEY } from "./draftStorage";

import { useSiteConfig } from "../../useSiteConfig";

export default function CreateAiAssistantPage({ searchParams }: { searchParams?: { importId?: string } }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { config, isLoaded } = useSiteConfig();

  const [documentType, setDocumentType] = useState("Policy");
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("1.0");
  const [author, setAuthor] = useState("Scott Wilde");
  const [reviewTimeline, setReviewTimeline] = useState("30 days · May 28, 2026");
  const [circulateTo, setCirculateTo] = useState("All");
  const [distributionList, setDistributionList] = useState("");
  const [purpose, setPurpose] = useState("");
  const [scope, setScope] = useState("");
  const [policyStatement, setPolicyStatement] = useState("");
  const [procedureSteps, setProcedureSteps] = useState("");
  const [exceptionsNotes, setExceptionsNotes] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [attachments, setAttachments] = useState("");
  const importId = searchParams?.importId;

  useEffect(() => {
    if (!importId) return;

    if (importId === "client") {
      const raw = sessionStorage.getItem("policy-manager-import-record");
      if (!raw) return;
      try {
        const record = JSON.parse(raw);
        setDocumentType(record.documentType || "Policy");
        setTitle(record.title || "");
        setDistributionList(record.team && record.team !== "Unassigned" ? record.team : "");
        setAttachments(`Imported file: ${record.originalName}`);
        setPurpose(`Reformat imported document into Policy Manager template. Source file: ${record.originalName}`);
      } catch {
        // keep page usable if stored import payload is malformed
      }
      return;
    }

    fetch(`/api/import-record?id=${importId}`)
      .then((res) => res.ok ? res.json() : null)
      .then((record) => {
        if (!record) return;
        setDocumentType(record.documentType || "Policy");
        setTitle(record.title || "");
        setDistributionList(record.team && record.team !== "Unassigned" ? record.team : "");
        setAttachments(`Imported file: ${record.originalName}`);
        setPurpose(`Reformat imported document into Policy Manager template. Source file: ${record.originalName}`);
      })
      .catch(() => {
        // keep page usable even if import preload fails
      });
  }, [importId]);

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateAiDraft({
        documentType,
        title,
        version,
        author,
        reviewTimeline,
        circulateTo,
        distributionList,
        purpose,
        scope,
        policyStatement,
        procedureSteps,
        exceptionsNotes,
        definitions,
        attachments,
      }, config.aiProviderName, config.aiN8nWebhookUrl);

      sessionStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(result));
      router.push("/create/ai-assistant/draft");
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· AI Assistant</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={whiteButtonLink}>Circulating</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
            <Link href="/teamview" style={whiteButtonLink}>Team View</Link>
            <Link href="/pending" style={whiteButtonLink}>Pending</Link>
            <Link href="/create/ai-assistant/saved" style={whiteButtonLink}>Saved Drafts</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI-assisted document template</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 24 }}>
              Fill in the template, then generate one polished AI draft in a clear operator/staff tone.
            </div>

            {importId && (
              <div style={importBanner}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Imported document detected</div>
                <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6 }}>
                  This draft started from an uploaded policy. Use AI Assistant Format to reshape it into the Policy Manager structure.
                </div>
              </div>
            )}

            <div style={sectionCard}>
              <div style={sectionTitle}>Document setup</div>
              <div style={gridTwo}>
                <div>
                  <label style={label}>Document type</label>
                  <select style={inputStyle} value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                    <option>Policy</option>
                    <option>SOG</option>
                    <option>Memo</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Assigned number / code</label>
                  <input style={inputStyle} value="Auto: next available based on type" readOnly />
                </div>
                <div style={fullWidth}>
                  <label style={label}>Title</label>
                  <input style={titleInputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter document title" />
                </div>
                <div>
                  <label style={label}>Version number</label>
                  <input style={inputStyle} value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Enter version number or auto assign" />
                </div>
                <div>
                  <label style={label}>Author name</label>
                  <select style={inputStyle} value={author} onChange={(e) => setAuthor(e.target.value)}>
                  </select>
                </div>
                <div>
                  <label style={label}>Review timeline</label>
                  <select style={inputStyle} value={reviewTimeline} onChange={(e) => setReviewTimeline(e.target.value)}>
                    <option>30 days · May 28, 2026</option>
                    <option>Quarterly · Jul 28, 2026</option>
                    <option>Semi annually · Oct 28, 2026</option>
                    <option>Annually · Apr 28, 2027</option>
                    <option>Bi annually · Apr 28, 2028</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Circulate to</label>
                  <select style={inputStyle} value={circulateTo} onChange={(e) => setCirculateTo(e.target.value)}>
                    <option>All</option>
                    <option>All leadership</option>
                    <option>All team</option>
                    <option>Groups</option>
                    <option>Individual team members</option>
                  </select>
                </div>
                <div style={fullWidth}>
                  <label style={label}>Distribution list</label>
                  <input style={inputStyle} value={distributionList} onChange={(e) => setDistributionList(e.target.value)} placeholder="List group or individual names here" />
                </div>
                <div style={fullWidth}>
                  <label style={label}>Time stamp bar</label>
                  <div style={timeStampBar}>
                    <span>Started: Apr 28, 2026</span>
                    <span>Last touched: Apr 28, 2026 · 8:35 PM</span>
                    <span>Time entries grow as work is added</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={sectionCard}>
              <div style={sectionTitle}>Policy content template</div>
              <div style={stackWrap}>
                <div>
                  <label style={label}>Purpose</label>
                  <textarea style={textAreaStyle} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Why this document exists" />
                </div>
                <div>
                  <label style={label}>Scope</label>
                  <textarea style={textAreaStyle} value={scope} onChange={(e) => setScope(e.target.value)} placeholder="Who or what this applies to" />
                </div>
                <div>
                  <label style={label}>Policy statement</label>
                  <textarea style={largeTextAreaStyle} value={policyStatement} onChange={(e) => setPolicyStatement(e.target.value)} placeholder="Core rule, standard, or directive" />
                </div>
                <div>
                  <label style={label}>Procedure / steps</label>
                  <textarea style={largeTextAreaStyle} value={procedureSteps} onChange={(e) => setProcedureSteps(e.target.value)} placeholder="Operational steps or working instructions" />
                </div>
                <div>
                  <label style={label}>Exceptions / notes</label>
                  <textarea style={textAreaStyle} value={exceptionsNotes} onChange={(e) => setExceptionsNotes(e.target.value)} placeholder="Exceptions, edge cases, or extra notes" />
                </div>
                <div>
                  <label style={label}>Definitions</label>
                  <textarea style={textAreaStyle} value={definitions} onChange={(e) => setDefinitions(e.target.value)} placeholder="Define important terms used in this document" />
                </div>
                <div>
                  <label style={label}>Attachments / references</label>
                  <textarea style={textAreaStyle} value={attachments} onChange={(e) => setAttachments(e.target.value)} placeholder="List linked files, source material, or reference documents" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" onClick={handleGenerate} style={previewButton} disabled={isPending}>{isPending ? "Generating..." : "See draft"}</button>
                <Link href="/create/ai-assistant/saved" style={whiteButtonLink}>Open saved drafts</Link>
              </div>
              <button type="button" onClick={handleGenerate} style={saveButton} disabled={isPending}>{isPending ? "Generating..." : "Generate draft"}</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const sectionCard = { borderRadius: 16, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 20, marginBottom: 20 };
const sectionTitle = { fontSize: 18, fontWeight: 800, marginBottom: 16 };
const gridTwo = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 };
const fullWidth = { gridColumn: "1 / -1" };
const stackWrap = { display: "grid", gap: 16 };
const label = { display: "block", fontSize: 13, fontWeight: 700, color: "#466255", marginBottom: 8 };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const };
const titleInputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, minHeight: 52 };
const timeStampBar = { display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 14, color: "#466255" };
const textAreaStyle = { width: "100%", minHeight: 100, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, resize: "vertical" as const };
const largeTextAreaStyle = { width: "100%", minHeight: 160, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, resize: "vertical" as const };
const importBanner = { border: "1px solid #dbe7de", borderRadius: 14, padding: 16, background: "#f9fbf9", marginBottom: 20 };
const whiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de" };
const previewButton = { background: "#ffffff", color: "#10221a", padding: "12px 18px", borderRadius: 10, fontWeight: 800, border: "1px solid #dbe7de" };
const saveButton = { background: "#ffffff", color: "#10221a", padding: "12px 18px", borderRadius: 10, fontWeight: 800, border: "1px solid #10221a" };
