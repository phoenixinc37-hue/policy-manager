"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CabinetGraphic } from "../../cabinet";
import { useRouter } from "next/navigation";
import { getApprovalDraft, updateApprovalDraft, moveDraftToCirculating, type ApprovalDecision, type SavedDraftRecord } from "../../create/ai-assistant/draftStorage";
import { loadConfigSnapshot } from "../../useSiteConfig";

const circulationOptions = ["TG", "ROSS", "RV", "ALL Clinics", "ALL Leadership"];

export default function DocumentStatusDetail({ params }: { params: { docId: string } }) {
  const router = useRouter();
  const [doc, setDoc] = useState<SavedDraftRecord | null>(null);

  useEffect(() => {
    setDoc(getApprovalDraft(params.docId));
  }, [params.docId]);

  const config = useMemo(() => loadConfigSnapshot(), []);
  const levelsById = useMemo(() => new Map((config.accessLevels || []).map((level: any) => [level.id, level])), [config.accessLevels]);
  const sitesById = useMemo(() => new Map((config.siteLocations || []).map((site: any) => [site.id, site])), [config.siteLocations]);

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", fontFamily: "Arial, sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/approval" style={secondaryButton}>Back to Approval</Link>
          <div style={{ marginTop: 24, background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Approval item not found.</div>
        </div>
      </div>
    );
  }

  const currentDoc = doc;
  const fallbackPersonnel = (config.personnel || []).map((person: any) => ({
    id: person.id,
    fullName: person.fullName,
    email: person.email,
    accessLevelId: person.accessLevelId,
    siteLocationId: person.siteLocationId,
    decision: "pending" as const,
  }));
  const reviewers = currentDoc.reviewers && currentDoc.reviewers.length ? currentDoc.reviewers : fallbackPersonnel;
  const approvalReady = reviewers.length > 0 && reviewers.every((reviewer: any) => reviewer.decision === "approved");
  const circulationTargets = currentDoc.circulationTargets || [];

  function saveDoc(updated: SavedDraftRecord) {
    setDoc(updated);
    updateApprovalDraft(updated);
  }

  function setDecision(reviewerId: string, decision: ApprovalDecision) {
    const updated: SavedDraftRecord = {
      ...currentDoc,
      reviewers: reviewers.map((reviewer: any) => reviewer.id === reviewerId ? { ...reviewer, decision } : reviewer),
    };
    saveDoc(updated);
  }

  function toggleTarget(target: string) {
    const nextTargets = circulationTargets.includes(target)
      ? circulationTargets.filter((item) => item !== target)
      : [...circulationTargets, target];

    saveDoc({
      ...currentDoc,
      circulationTargets: nextTargets,
    });
  }

  function handleFinalCirculate() {
    if (!approvalReady || !circulationTargets.length) return;
    moveDraftToCirculating(currentDoc.id);
    router.push("/manager");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{doc.documentType} · {doc.title}</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Approval summary</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/approval" style={secondaryButton}>Back to Approval</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ display: "grid", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Approval summary</div>
                <div style={{ fontSize: 14, color: "#60766b" }}>Review the approval votes before this document is released into circulation.</div>
              </div>
              <div style={approvalReady ? readyPill : waitingPill}>{approvalReady ? "Approval complete" : "Waiting on approval"}</div>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Approval reviewers</div>
            <div style={{ display: "grid", gap: 12 }}>
              {reviewers.length === 0 ? (
                <div style={emptyCard}>No registered people found in setup yet.</div>
              ) : (
                reviewers.map((reviewer: any) => {
                  const level: any = levelsById.get(reviewer.accessLevelId);
                  const site: any = sitesById.get(reviewer.siteLocationId);
                  return (
                    <div key={reviewer.id} style={reviewerCard}>
                      <div style={{ display: "grid", gap: 6 }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{reviewer.fullName}</div>
                        <div style={metaText}>{reviewer.email}</div>
                        <div style={metaText}>Level: {level?.name || "Not assigned"}</div>
                        <div style={metaText}>Site: {site?.name || "Not assigned"}</div>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                        <div style={statusPill(reviewer.decision)}>{reviewer.decision.toUpperCase()}</div>
                        <button type="button" onClick={() => setDecision(reviewer.id, "approved")} style={approveButton}>Approve</button>
                        <button type="button" onClick={() => setDecision(reviewer.id, "rejected")} style={rejectButton}>Reject</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Policy summary</div>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={summaryRow}><strong>Title:</strong> {doc.title}</div>
              <div style={summaryRow}><strong>Type:</strong> {doc.documentType}</div>
              <div style={summaryRow}><strong>Version:</strong> {doc.version}</div>
              <div style={summaryRow}><strong>Author:</strong> {doc.author}</div>
              <div style={summaryRow}><strong>Review timeline:</strong> {doc.reviewTimeline}</div>
              <div style={summaryBlock}><strong>Purpose:</strong> {doc.purpose}</div>
              <div style={summaryBlock}><strong>Policy statement:</strong> {doc.policyStatement}</div>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Version history</div>
                <div style={{ fontSize: 14, color: "#60766b" }}>This will hold the historical chain of changes and released versions.</div>
              </div>
              <button type="button" style={secondaryGhostButton}>Open version history</button>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Circulate to</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 16 }}>Choose who this document should go to once approval is complete.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12, marginBottom: 16 }}>
              {circulationOptions.map((target) => {
                const active = circulationTargets.includes(target);
                return (
                  <button key={target} type="button" onClick={() => toggleTarget(target)} style={active ? activeTargetButton : targetButton}>
                    {target}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {(config.personnel || []).map((person: any) => (
                <div key={person.id} style={personTargetRow}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{person.fullName}</div>
                    <div style={metaText}>{person.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTarget(person.fullName)}
                    style={circulationTargets.includes(person.fullName) ? activeTargetButtonSmall : targetButtonSmall}
                  >
                    {circulationTargets.includes(person.fullName) ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Final circulate</div>
                <div style={{ fontSize: 14, color: "#60766b" }}>Once pressed, this should push the document into circulating and later email the applicable audience.</div>
              </div>
              <button type="button" onClick={handleFinalCirculate} style={approvalReady && circulationTargets.length ? primaryButtonAction : disabledButton}>
                Final circulate
              </button>
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
  padding: 22,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const reviewerCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap" as const,
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const emptyCard = {
  border: "1px solid #dbe7de",
  borderRadius: 16,
  padding: 18,
  background: "#f9fbf9",
  color: "#60766b",
};

const metaText = {
  fontSize: 13,
  color: "#60766b",
};

const summaryRow = {
  fontSize: 14,
  color: "#31473d",
};

const summaryBlock = {
  fontSize: 14,
  color: "#31473d",
  lineHeight: 1.7,
};

const secondaryButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const primaryButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const approveButton = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
  cursor: "pointer",
};

const rejectButton = {
  background: "#ffffff",
  color: "#8b1e1e",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #e7caca",
  cursor: "pointer",
};

const readyPill = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  background: "#edf7ef",
  color: "#1f7a37",
  fontWeight: 800,
  border: "1px solid #cfe1d2",
};

const waitingPill = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  background: "#fff8e6",
  color: "#9a6700",
  fontWeight: 800,
  border: "1px solid #f0dfb5",
};

const targetButton = {
  background: "#ffffff",
  color: "#10221a",
  padding: "12px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
};

const activeTargetButton = {
  background: "#edf7ef",
  color: "#1f7a37",
  padding: "12px 14px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #cfe1d2",
  cursor: "pointer",
};

const personTargetRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
};

const targetButtonSmall = {
  background: "#ffffff",
  color: "#10221a",
  padding: "8px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
};

const activeTargetButtonSmall = {
  background: "#edf7ef",
  color: "#1f7a37",
  padding: "8px 12px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #cfe1d2",
  cursor: "pointer",
};

const secondaryGhostButton = {
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
};

const primaryButtonAction = {
  background: "#1f5d24",
  color: "#ffffff",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #1f5d24",
  cursor: "pointer",
};

const disabledButton = {
  background: "#e5ebe7",
  color: "#7a8a80",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #dbe7de",
  cursor: "not-allowed",
};

function statusPill(decision: ApprovalDecision) {
  const palette = decision === "approved"
    ? { background: "#edf7ef", color: "#1f7a37", border: "#cfe1d2" }
    : decision === "rejected"
      ? { background: "#fff5f5", color: "#8b1e1e", border: "#e7caca" }
      : { background: "#ffffff", color: "#60766b", border: "#dbe7de" };

  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 999,
    border: `1px solid ${palette.border}`,
    background: palette.background,
    color: palette.color,
    fontSize: 12,
    fontWeight: 800,
  };
}
