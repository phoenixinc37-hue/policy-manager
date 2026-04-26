import Link from "next/link";
import { documents, getLeadershipStats } from "../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../cabinet";

const statusCards = [
  {
    title: "Circulating documents",
    text: "Active items, awaiting acknowledgement, and overdue.",
    button: "View circulation",
  },
  {
    title: "Pending approval",
    text: "Documents waiting for leadership review or comments.",
    button: "View approvals",
  },
  {
    title: "Firm completion",
    text: "Overall acknowledgement across teams and documents.",
    button: "View report",
  },
  {
    title: "Library",
    text: "Access all published policies, SOGs, and memos.",
    button: "View library",
  },
];

export default function ManagerPage() {
  const stats = getLeadershipStats();
  const circulatingDocs = documents.filter((doc) => doc.status === "circulating");
  const pendingApprovalDoc = documents.find((doc) => doc.status === "pending-approval");
  const latestLibraryDoc = documents.find((doc) => doc.latestPublished);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1, 2].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Leadership View</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={primaryButtonLink}>Home</Link>
            <Link href="/teamview" style={teamButton}>Team View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 22 }}>
          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Create new policy, SOG, or memo</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>Start a new document and assign it to your team.</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/pending" style={greenMenuButton}>Pending</Link>
                <Link href="/completion" style={greenMenuButton}>Complete</Link>
                <Link href="/policy-index" style={greenMenuButton}>Library</Link>
                <Link href="/create" style={greenMenuButton}>Create</Link>
                <Link href="/" style={primaryButtonLink}>Home</Link>
              </div>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Check document status</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>Review circulation, approvals, and items requiring attention.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
              {statusCards.map((card) => (
                <div key={card.title} style={statusCard}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{card.title}</div>
                  <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, marginBottom: 16 }}>{card.text}</div>
                  <Link href={card.button === "View circulation" ? "/status" : card.button === "View approvals" ? "/pending" : card.button === "View report" ? "/completion" : "/policy-index"} style={secondaryGreenButtonLink}>{card.button}</Link>
                </div>
              ))}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Quick View</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>A preview of the selected status area. Full details live on their own pages.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 22 }}>
              <div style={quickViewMainCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20 }}>Circulating documents</div>
                    <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Current active items and acknowledgement progress.</div>
                  </div>
                  <span style={{ fontWeight: 800, color: "#1f5d24", fontSize: 14 }}>View circulating</span>
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                  {circulatingDocs.slice(0, 2).map((doc) => {
                    const progress = Math.round((doc.acknowledgedBy.length / doc.assignedTo.length) * 100);
                    const remaining = doc.assignedTo.length - doc.acknowledgedBy.length;
                    return (
                      <div key={doc.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 14 }}>
                          <span><strong>{doc.type} - {doc.title}</strong></span>
                          <span>{doc.acknowledgedBy.length} / {doc.assignedTo.length} acknowledged</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, fontSize: 13, color: "#60766b" }}>
                          <span>{doc.team}</span>
                          <span style={doc.needsAttention ? { color: "#9a6700", fontWeight: 700 } : undefined}>{doc.needsAttention ? `${remaining - 1} overdue` : `Awaiting ${remaining}`}</span>
                        </div>
                        <div style={progressTrack}><div style={{ ...progressFill, width: `${progress}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Pending approval</div>
                    <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: 14 }}>View pending</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Documents waiting for leadership review.</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#1f5d24", marginTop: 14 }}>{stats.pendingApproval}</div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <div style={{ fontWeight: 700 }}>{pendingApprovalDoc?.title ?? "No pending documents"}</div>
                    <div style={{ color: "#60766b", marginTop: 4 }}>{pendingApprovalDoc ? "Awaiting partner approval" : "All approvals up to date"}</div>
                  </div>
                </div>

                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Firm completion</div>
                    <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: 14 }}>View firm complete</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Overall acknowledgement status.</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#1f5d24", marginTop: 14 }}>{stats.overallCompletion}%</div>
                  <div style={{ ...progressTrack, marginTop: 14 }}><div style={{ ...progressFill, width: `${stats.overallCompletion}%` }} /></div>
                </div>

                <div style={quickSideCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Library</div>
                    <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: 14 }}>View library</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Recently published documents.</div>
                  <div style={{ marginTop: 14, fontSize: 14, color: "#10221a" }}>Latest: {latestLibraryDoc?.title ?? "No published documents yet"}</div>
                </div>
              </div>
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

const secondaryButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const teamButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
};

const primaryButton = {
  background: "#1f5d24",
  color: "#ffffff",
  border: "1px solid #1f5d24",
  borderRadius: 12,
  padding: "12px 18px",
  fontWeight: 700,
  fontSize: 14,
};

const primaryButtonLink = {
  ...primaryButton,
  textDecoration: "none",
  display: "inline-block",
};

const secondaryGreenButton = {
  background: "#2e7d32",
  color: "#ffffff",
  border: "1px solid #2e7d32",
  borderRadius: 10,
  padding: "12px 14px",
  fontWeight: 700,
  fontSize: 14,
  width: "100%",
};

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
};

const secondaryGreenButtonLink = {
  ...secondaryGreenButton,
  textDecoration: "none",
  display: "block",
  boxSizing: "border-box" as const,
  textAlign: "center" as const,
};

const statusCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const quickViewMainCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const quickSideCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 18,
};

const alertBadge = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#fff3d9",
  color: "#9a6700",
  fontSize: 12,
  fontWeight: 800,
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
