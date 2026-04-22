import Link from "next/link";

const rolloutRows = [
  { title: "Year-end workflow", team: "Tax team", complete: "12 / 15 confirmed", overdue: "2 overdue", width: "80%" },
  { title: "Client intake process v2", team: "Admin team", complete: "6 / 8 confirmed", overdue: "1 overdue", width: "75%" },
  { title: "Remote work memo", team: "Partner team", complete: "4 / 4 confirmed", overdue: "Fully read", width: "100%" },
];

const followUps = [
  { person: "Jack Wilde", item: "Year-end workflow", due: "Due Oct 31" },
  { person: "Sarah Jenkins", item: "Client intake process v2", due: "Due Nov 2" },
  { person: "Amanda Cole", item: "Year-end workflow", due: "Due Oct 31" },
];

export default function ManagerPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1, 2].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 14, color: "#2e7d32", marginLeft: 10 }}>· Manager View</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting firm demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={secondaryButton}>Home</Link>
            <Link href="/teamview" style={secondaryButton}>Team View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24, display: "grid", gap: 22 }}>
          <section style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
            {[
              { value: "10", label: "Documents circulating" },
              { value: "14", label: "Pending confirmations" },
              { value: "3", label: "Overdue acknowledgments" },
              { value: "84%", label: "Firm completion" },
            ].map((item) => (
              <div key={item.label} style={statCard}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1f5d24" }}>{item.value}</div>
                <div style={{ color: "#5c7368", fontSize: 13, marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 22 }}>
            <div style={panelCard}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Rollout status by document</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>
                  This is the management view, which shows what is still circulating, which team is stuck, and where follow-up is needed.
                </p>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {rolloutRows.map((row) => (
                  <div key={row.title} style={rolloutCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 17 }}>{row.title}</div>
                        <div style={{ fontSize: 13, color: "#60766b", marginTop: 4 }}>{row.team}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={neutralBadge}>{row.complete}</span>
                        <span style={row.overdue === "Fully read" ? goodBadge : warningBadge}>{row.overdue}</span>
                      </div>
                    </div>
                    <div style={{ height: 10, background: "#e7efe9", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: row.width, height: "100%", background: row.width === "100%" ? "#2f9a48" : "#2e7d32" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={panelCard}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Top follow-up list</div>
                <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>
                  Quick visibility into who still needs a nudge.
                </p>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {followUps.map((item) => (
                  <div key={`${item.person}-${item.item}`} style={followUpCard}>
                    <div style={{ fontWeight: 700 }}>{item.person}</div>
                    <div style={{ fontSize: 14, color: "#51665b", marginTop: 6 }}>{item.item}</div>
                    <div style={{ fontSize: 12, color: "#9a6700", fontWeight: 800, marginTop: 10 }}>{item.due}</div>
                  </div>
                ))}
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

const statCard = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 18,
  border: "1px solid #dbe7de",
  boxShadow: "0 10px 20px rgba(15, 23, 42, 0.05)",
};

const cabinetIcon = {
  width: 46,
  height: 46,
  borderRadius: 12,
  background: "linear-gradient(180deg, #2e7d32 0%, #1f5d24 100%)",
  padding: 8,
  boxSizing: "border-box" as const,
  display: "grid",
  gap: 4,
};

const drawerRow = { background: "#9ae6a0", borderRadius: 4, position: "relative" as const };
const drawerHandle = { position: "absolute" as const, right: 5, top: "50%", width: 7, height: 2, marginTop: -1, borderRadius: 2, background: "#1f5d24" };

const secondaryButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const rolloutCard = {
  borderRadius: 16,
  border: "1px solid #dbe7de",
  background: "#f9fbf9",
  padding: 16,
};

const followUpCard = {
  borderRadius: 14,
  border: "1px solid #f1ddb3",
  background: "#fff8e8",
  padding: 16,
};

const neutralBadge = {
  padding: "6px 9px",
  borderRadius: 999,
  background: "#eef3ef",
  color: "#4c6358",
  fontSize: 12,
  fontWeight: 800,
};

const warningBadge = {
  padding: "6px 9px",
  borderRadius: 999,
  background: "#fff3d9",
  color: "#9a6700",
  fontSize: 12,
  fontWeight: 800,
};

const goodBadge = {
  padding: "6px 9px",
  borderRadius: 999,
  background: "#e5f6e9",
  color: "#1f7a37",
  fontSize: 12,
  fontWeight: 800,
};
