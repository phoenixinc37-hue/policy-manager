"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CabinetGraphic } from "../../../cabinet";
import { loadCirculatingDrafts, updateCirculatingDraft, type SavedDraftRecord } from "../../../create/ai-assistant/draftStorage";

// This wrapper handles the active person so we can record who acknowledged it
function TeamDocumentReviewContent({ docId }: { docId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePersonId = searchParams.get("person") || "";

  const [doc, setDoc] = useState<SavedDraftRecord | null>(null);

  useEffect(() => {
    const drafts = loadCirculatingDrafts();
    setDoc(drafts.find((item) => item.id === docId) || null);
  }, [docId]);

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", padding: 24, fontFamily: "Arial, sans-serif" }}>
        <Link href={`/teamview${activePersonId ? `?person=${activePersonId}` : ""}`} style={backButton}>Back to Team View</Link>
        <div style={{ maxWidth: 900, margin: "24px auto 0", background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Document not found.</div>
      </div>
    );
  }

  // Wait 1 second and then redirect back to team view
  function handleAcknowledge() {
    if (!doc || !activePersonId) return;

    const currentAcks = doc.acknowledgments || {};
    const updatedDoc = {
      ...doc,
      acknowledgments: {
        ...currentAcks,
        [activePersonId]: new Date().toISOString()
      }
    };

    updateCirculatingDraft(updatedDoc);
    setTimeout(() => {
      router.push(`/teamview${activePersonId ? `?person=${activePersonId}` : ""}`);
    }, 1000);
  }

  const isAcknowledged = !!(doc.acknowledgments && doc.acknowledgments[activePersonId]);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{doc.documentType} <span style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginLeft: 10 }}>· Review Document</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={`/teamview${activePersonId ? `?person=${activePersonId}` : ""}`} style={primaryButton}>Back to Team View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={docCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <span style={typeBadge(doc.documentType)}>{doc.documentType}</span>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{doc.title}</div>
            </div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 24 }}>Team member review page</div>

            <div style={bodyCard}>
              <div style={sectionTitle}>Purpose</div>
              <p style={bodyText}>{doc.purpose}</p>

              <div style={sectionTitle}>Scope</div>
              <p style={bodyText}>{doc.scope}</p>

              <div style={sectionTitle}>Policy Statement</div>
              <p style={bodyText}>{doc.policyStatement}</p>

              {doc.procedureSteps && doc.procedureSteps.length > 0 && (
                <>
                  <div style={sectionTitle}>Procedure</div>
                  <ul style={listStyle}>
                    {doc.procedureSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </>
              )}

              {doc.exceptionsNotes && (
                <>
                  <div style={sectionTitle}>Exceptions & Notes</div>
                  <p style={bodyText}>{doc.exceptionsNotes}</p>
                </>
              )}

              {doc.definitions && (
                <>
                  <div style={sectionTitle}>Definitions</div>
                  <p style={bodyText}>{doc.definitions}</p>
                </>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginTop: 24, flexWrap: "wrap" }}>
              <div style={{ fontSize: 13, color: "#60766b" }}>
                {isAcknowledged ? "You have acknowledged this document." : "By clicking acknowledge, you confirm you have read and understood this document."}
              </div>
              <button 
                type="button" 
                onClick={handleAcknowledge} 
                style={isAcknowledged ? acknowledgedButton : acknowledgeButton}
                disabled={isAcknowledged}
              >
                {isAcknowledged ? "Acknowledged" : "Acknowledge"}
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function TeamDocumentReview({ params }: { params: { docId: string } }) {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <TeamDocumentReviewContent docId={params.docId} />
    </Suspense>
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

const docCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 24,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const bodyCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 20,
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 800,
  marginBottom: 8,
  marginTop: 16,
};

const bodyText = {
  fontSize: 15,
  lineHeight: 1.7,
  color: "#31473d",
  margin: "0 0 12px",
};

const listStyle = {
  margin: "0 0 12px 18px",
  color: "#31473d",
  lineHeight: 1.8,
  fontSize: 15,
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

const backButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const acknowledgeButton = {
  background: "#66a97a",
  color: "#ffffff",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #66a97a",
};

const acknowledgedButton = {

  background: "#eef2f1",
  color: "#51665b",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  border: "1px solid #d6e4d8",
  cursor: "default",
};


function typeBadge(type: string) {
  const map: Record<string, { background: string; color: string }> = {
    Policy: { background: "#dff3e3", color: "#1f5d24" },
    SOG: { background: "#dff0fb", color: "#0b5f87" },
    Memo: { background: "#eef2f1", color: "#51665b" },
  };
  return {
    background: map[type]?.background ?? "#eef2f1",
    color: map[type]?.color ?? "#51665b",
    padding: "4px 9px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  };
}
