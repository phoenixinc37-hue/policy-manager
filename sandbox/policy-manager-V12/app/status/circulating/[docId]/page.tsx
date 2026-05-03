"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CabinetGraphic } from "../../../cabinet";
import { loadCirculatingDrafts, moveDraftToLibrary, type SavedDraftRecord } from "../../../create/ai-assistant/draftStorage";
import { loadConfigSnapshot } from "../../../useSiteConfig";

export default function CirculatingStatusDetail({ params }: { params: { docId: string } }) {
  const router = useRouter();
  const [doc, setDoc] = useState<SavedDraftRecord | null>(null);
  const [config, setConfig] = useState<any>({});
  
  useEffect(() => {
    function load() {
      const drafts = loadCirculatingDrafts();
      setDoc(drafts.find((d) => d.id === params.docId) || null);
      setConfig(loadConfigSnapshot());
    }
    load();
    const interval = setInterval(load, 500);
    return () => clearInterval(interval);
  }, [params.docId]);

  if (!doc || !config.personnel) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", fontFamily: "Arial, sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/status" style={secondaryButton}>Back to Circulating</Link>
          <div style={{ marginTop: 24, background: "#fff", border: "1px solid #dbe7de", borderRadius: 18, padding: 24 }}>Circulating item not found.</div>
        </div>
      </div>
    );
  }

  // Figure out exactly who needs to acknowledge this based on the targets
  const targets = doc.circulationTargets || [];
  const requiredPersonnel = (config.personnel || []).filter((person: any) => {
    return targets.some((target) => {
      if (target === person.fullName) return true;
      if (target === "ALL Leadership" && ["l1", "l2"].includes(person.accessLevelId)) return true;
      if (target === "ALL Clinics") return true;
      const siteName = config.siteLocations?.find((s: any) => s.id === person.siteLocationId)?.name;
      if (siteName && target === siteName) return true;
      return false;
    });
  });

  // Map actual acknowledgments from storage
  const acknowledgments: Record<string, boolean> = {};
  requiredPersonnel.forEach((person: any) => {
    acknowledgments[person.id] = !!(doc.acknowledgments && doc.acknowledgments[person.id]);
  });

  const ackCount = Object.values(acknowledgments).filter(Boolean).length;
  const totalCount = requiredPersonnel.length;
  const progress = totalCount > 0 ? Math.round((ackCount / totalCount) * 100) : 0;
  const readyToComplete = totalCount > 0 && ackCount === totalCount;

  function handleArchiveToComplete() {
    if (!readyToComplete) return;
    moveDraftToLibrary(params.docId);
    router.push("/completion");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{doc.documentType} · {doc.title}</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Circulation status</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={secondaryButton}>Back to Circulating</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ display: "grid", gap: 20, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Acknowledgement tracking</div>
                <div style={{ fontSize: 14, color: "#60766b" }}>Monitor team sign-offs for this document.</div>
              </div>
              <div style={readyToComplete ? readyPill : waitingPill}>
                {readyToComplete ? "Ready for completion" : `${totalCount - ackCount} pending signatures`}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginTop: 24 }}>
              <div style={miniCard}>
                <div style={miniValue}>{ackCount} / {totalCount}</div>
                <div style={miniLabel}>Acknowledged</div>
              </div>
              <div style={miniCard}>
                <div style={miniValue}>{totalCount - ackCount}</div>
                <div style={miniLabel}>Still outstanding</div>
              </div>
              <div style={miniCard}>
                <div style={miniValue}>{progress}%</div>
                <div style={miniLabel}>Completion</div>
              </div>
            </div>
            <div style={{ ...progressTrack, marginTop: 14 }}>
              <div style={{ ...progressFill, width: `${progress}%` }} />
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Required sign-offs</div>
            <div style={{ display: "grid", gap: 10 }}>
              {requiredPersonnel.length === 0 ? (
                <div style={emptyCard}>No matching personnel found for the selected targets ({targets.join(", ")}).</div>
              ) : (
                requiredPersonnel.map((person: any) => {
                  const hasSigned = acknowledgments[person.id];
                  return (
                    <div key={person.id} style={personCard(hasSigned)}>
                      <div style={{ display: "grid", gap: 4 }}>
                        <div style={{ fontWeight: 800 }}>{person.fullName}</div>
                        <div style={{ fontSize: 13, color: "#60766b" }}>
                          {config.siteLocations?.find((s:any)=>s.id === person.siteLocationId)?.name || "No site"}
                        </div>
                      </div>
                      <div style={hasSigned ? signedPill : unsignedPill}>
                        {hasSigned ? "Signed" : "Awaiting signature"}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Move to Complete</div>
                <div style={{ fontSize: 14, color: "#60766b" }}>Once all required team members have acknowledged, push to the final Complete bucket.</div>
              </div>
              <button type="button" onClick={handleArchiveToComplete} style={readyToComplete ? primaryButtonAction : disabledButton}>
                Archive to Complete
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

const personCard = (signed: boolean) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 18px",
  borderRadius: 12,
  border: `1px solid ${signed ? "#cfe1d2" : "#dbe7de"}`,
  background: signed ? "#f3f8f4" : "#f9fbf9",
});

const emptyCard = {
  border: "1px solid #dbe7de",
  borderRadius: 16,
  padding: 18,
  background: "#f9fbf9",
  color: "#60766b",
};

const miniCard = {
  borderRadius: 12,
  border: "1px solid #dbe7de",
  background: "#ffffff",
  padding: 14,
};

const miniValue = {
  fontSize: 22,
  fontWeight: 800,
  color: "#1f5d24",
};

const miniLabel = {
  fontSize: 12,
  color: "#60766b",
  marginTop: 4,
};

const progressTrack = {
  height: 10,
  background: "#e7efe9",
  borderRadius: 999,
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#2e7d32",
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

const readyPill = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#edf7ef",
  color: "#1f7a37",
  fontWeight: 800,
  border: "1px solid #cfe1d2",
};

const waitingPill = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#fff8e6",
  color: "#9a6700",
  fontWeight: 800,
  border: "1px solid #f0dfb5",
};

const signedPill = {
  padding: "6px 12px",
  borderRadius: 999,
  background: "#edf7ef",
  color: "#1f7a37",
  fontSize: 12,
  fontWeight: 800,
  border: "1px solid #cfe1d2",
};

const unsignedPill = {
  padding: "6px 12px",
  borderRadius: 999,
  background: "#ffffff",
  color: "#60766b",
  fontSize: 12,
  fontWeight: 800,
  border: "1px solid #dbe7de",
};
