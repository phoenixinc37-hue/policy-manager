"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CabinetGraphic } from "../../../cabinet";
import { deleteSavedDraft, loadSavedDrafts, moveDraftToPending, type SavedDraftRecord } from "../draftStorage";

export default function SavedDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<SavedDraftRecord[]>([]);

  useEffect(() => {
    setDrafts(loadSavedDrafts());
  }, []);

  const refresh = () => setDrafts(loadSavedDrafts());

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Saved Drafts</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/create/ai-assistant" style={whiteButtonLink}>AI Assistant</Link>
            <Link href="/create" style={whiteButtonLink}>Create</Link>
            <Link href="/pending" style={whiteButtonLink}>Pending</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Saved drafts</div>
            <div style={{ fontSize: 14, color: "#60766b", marginBottom: 20 }}>Open a draft, keep working on it, delete it, or move it toward approval.</div>

            <div style={{ display: "grid", gap: 14 }}>
              {drafts.length === 0 ? (
                <div style={emptyCard}>No saved drafts yet.</div>
              ) : (
                drafts.map((draft) => (
                  <div key={draft.id} style={draftCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#567164", marginBottom: 6 }}>{draft.documentType.toUpperCase()} · V{draft.version}</div>
                        <div style={{ fontSize: 20, fontWeight: 800 }}>{draft.title}</div>
                        <div style={{ fontSize: 13, color: "#60766b", marginTop: 8 }}>Saved: {new Date(draft.savedAt).toLocaleString()}</div>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <Link href={`/create/ai-assistant/draft?saved=${draft.id}`} style={whiteButtonLink}>Open draft</Link>
                        <button
                          type="button"
                          onClick={() => {
                            moveDraftToPending(draft.id);
                            router.push("/pending");
                          }}
                          style={strongWhiteButtonLink}
                        >
                          Send for approval
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteSavedDraft(draft.id);
                            refresh();
                          }}
                          style={deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const panelCard = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const draftCard = { border: "1px solid #dbe7de", borderRadius: 16, padding: 18, background: "#f9fbf9" };
const emptyCard = { border: "1px solid #dbe7de", borderRadius: 16, padding: 18, background: "#f9fbf9", color: "#60766b" };
const whiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #dbe7de" };
const deleteButton = { background: "#ffffff", color: "#8b1e1e", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #e7caca", cursor: "pointer" };
const strongWhiteButtonLink = { textDecoration: "none", background: "#ffffff", color: "#10221a", padding: "10px 12px", borderRadius: 10, fontWeight: 800, border: "1px solid #10221a" };
