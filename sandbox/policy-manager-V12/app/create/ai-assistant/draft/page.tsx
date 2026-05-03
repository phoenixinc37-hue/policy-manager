"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CabinetGraphic } from "../../../cabinet";
import { CURRENT_DRAFT_KEY, deleteSavedDraft, getSavedDraft, upsertSavedDraft, moveDraftToApproval } from "../draftStorage";
import { loadConfigSnapshot } from "../../../useSiteConfig";

type DraftRecord = {
  title: string;
  documentType: string;
  version: string;
  author: string;
  reviewTimeline: string;
  circulateTo: string;
  distributionList: string;
  purpose: string;
  scope: string;
  policyStatement: string;
  procedureSteps: string[];
  exceptionsNotes: string;
  definitions: string;
  attachments: string[];
};

const fallbackDraft: DraftRecord = {
  title: "AI Draft",
  documentType: "Policy",
  version: "1.0",
  author: "Scott Wilde",
  reviewTimeline: "30 days · May 28, 2026",
  circulateTo: "All",
  distributionList: "Not specified",
  purpose: "AI-generated purpose based on the requested document type.",
  scope: "AI-generated scope based on the intended audience.",
  policyStatement: "AI-generated core policy statement for this draft.",
  procedureSteps: [
    "Follow the approved process.",
    "Document the required steps.",
    "Escalate exceptions as needed.",
  ],
  exceptionsNotes: "No additional exceptions noted in the draft request.",
  definitions: "Definitions will be refined during review.",
  attachments: ["No attachments or references listed yet."],
};

export default function AiDraftPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftRecord>(fallbackDraft);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const savedId = params.get("saved");

    if (savedId) {
      const saved = getSavedDraft(savedId);
      if (saved) {
        setSavedDraftId(saved.id);
        setDraft({
          ...fallbackDraft,
          ...saved,
          procedureSteps: Array.isArray(saved?.procedureSteps) ? saved.procedureSteps : fallbackDraft.procedureSteps,
          attachments: Array.isArray(saved?.attachments) ? saved.attachments : fallbackDraft.attachments,
        });
        sessionStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(saved));
        return;
      }
    }

    const raw = sessionStorage.getItem(CURRENT_DRAFT_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setDraft({
        ...fallbackDraft,
        ...parsed,
        procedureSteps: Array.isArray(parsed?.procedureSteps) ? parsed.procedureSteps : fallbackDraft.procedureSteps,
        attachments: Array.isArray(parsed?.attachments) ? parsed.attachments : fallbackDraft.attachments,
      });
    } catch {
      setDraft(fallbackDraft);
    }
  }, []);

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
            <Link href="/status" style={whiteButtonLink}>Circulating</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
            <Link href="/create" style={whiteButtonLink}>Create</Link>
            <Link href="/approval" style={whiteButtonLink}>Approval</Link>
            <Link href="/create/ai-assistant/saved" style={whiteButtonLink}>Saved Drafts</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 13, color: "#567164", fontWeight: 700, marginBottom: 8 }}>{draft.documentType.toUpperCase()} · V{draft.version}</div>
                <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>{draft.title}</h1>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 10 }}>{draft.documentType} · Author: {draft.author}</div>
              </div>
              <div style={statusChip}>Generated draft</div>
            </div>

            <div style={metaBar}>
              <span>Review: {draft.reviewTimeline}</span>
              <span>Circulate to: {draft.circulateTo}</span>
              <span>Distribution: {draft.distributionList}</span>
            </div>

            <section style={sectionCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>{draft.purpose}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Scope</div>
              <p style={bodyText}>{draft.scope}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Policy statement</div>
              <p style={bodyText}>{draft.policyStatement}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Procedure / steps</div>
              <ol style={orderedList}>
                {draft.procedureSteps.map((step, index) => (
                  <li key={`${step}-${index}`}>{String(step).replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Exceptions / notes</div>
              <p style={bodyText}>{draft.exceptionsNotes}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Definitions</div>
              <p style={bodyText}>{draft.definitions}</p>
            </section>

            <section style={sectionCard}>
              <div style={sectionTitle}>Attachments / references</div>
              <ul style={orderedList}>
                {draft.attachments.map((line, index) => (
                  <li key={`${line}-${index}`}>{line}</li>
                ))}
              </ul>
            </section>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/create/ai-assistant" style={whiteButtonLink}>Back to template</Link>
                <button
                  type="button"
                  onClick={() => {
                    const record = upsertSavedDraft(draft, savedDraftId || undefined);
                    setSavedDraftId(record.id);
                    sessionStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(record));
                    router.push(`/create/ai-assistant/draft?saved=${record.id}`);
                  }}
                  style={whiteButtonButton}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem(CURRENT_DRAFT_KEY);
                    if (savedDraftId) deleteSavedDraft(savedDraftId);
                    router.push("/create/ai-assistant");
                  }}
                  style={deleteButton}
                >
                  Delete draft
                </button>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => {
                    let idToMove = savedDraftId;
                    if (!idToMove) {
                      const record = upsertSavedDraft(draft);
                      idToMove = record.id;
                    } else {
                      upsertSavedDraft(draft, idToMove);
                    }
                    const config = loadConfigSnapshot();
                    const reviewers = (config.personnel || []).map((person: any) => ({
                      id: person.id,
                      fullName: person.fullName,
                      email: person.email,
                      accessLevelId: person.accessLevelId,
                      siteLocationId: person.siteLocationId,
                      decision: "pending" as const,
                    }));
                    moveDraftToApproval(idToMove, reviewers);
                    sessionStorage.removeItem(CURRENT_DRAFT_KEY);
                    router.push("/approval");
                  }}
                  style={strongWhiteButtonLink}
                >
                  Send to approval
                </button>
              </div>
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
const statusChip = { display: "inline-flex", alignItems: "center", padding: "10px 14px", borderRadius: 999, background: "#ffffff", color: "#10221a", fontSize: 13, fontWeight: 800, border: "1px solid #dbe7de" };
const bodyText = { fontSize: 15, lineHeight: 1.7, color: "#31473d", margin: 0 };
const orderedList = { margin: 0, paddingLeft: 22, display: "grid", gap: 10, color: "#31473d", fontSize: 15, lineHeight: 1.7 };
const whiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de" };
const whiteButtonButton = { background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de", cursor: "pointer" };
const deleteButton = { background: "#ffffff", color: "#8b1e1e", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #e7caca", cursor: "pointer" };
const strongWhiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 800, border: "1px solid #10221a" };
