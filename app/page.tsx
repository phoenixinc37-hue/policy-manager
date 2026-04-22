import Link from "next/link";

const managerHighlights = [
  { label: "Documents circulating", value: "10" },
  { label: "Still awaiting confirmation", value: "14" },
  { label: "Tax team completion", value: "84%" },
];

const teamHighlights = [
  { type: "Policy", title: "Year-end workflow", status: "Needs review" },
  { type: "SOG", title: "Client intake process", status: "Due tomorrow" },
  { type: "Memo", title: "Holiday office hours", status: "Read" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#ffffff",
            border: "1px solid #dbe7de",
            borderRadius: 18,
            padding: "18px 22px",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "linear-gradient(180deg, #2e7d32 0%, #1f5d24 100%)",
                padding: 8,
                boxSizing: "border-box",
                display: "grid",
                gap: 4,
              }}
            >
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ background: "#9ae6a0", borderRadius: 4, position: "relative" }}>
                  <div style={{ position: "absolute", right: 5, top: "50%", width: 7, height: 2, marginTop: -1, borderRadius: 2, background: "#1f5d24" }} />
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Demo for accounting firms</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={navButton(false)}>
              Manager View
            </Link>
            <Link href="/teamview" style={navButton(true)}>
              Team View
            </Link>
          </div>
        </header>

        <main style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 28, marginTop: 28 }}>
          <section>
            <div
              style={{
                display: "inline-block",
                background: "#e6f4ea",
                color: "#256b2a",
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.03em",
              }}
            >
              ACCOUNTING FIRM DEMO
            </div>

            <h1 style={{ fontSize: 48, lineHeight: 1.08, margin: "18px 0 14px", fontWeight: 800, maxWidth: 640 }}>
              Keep policies, SOGs, and memos visible until the whole firm has actually read them.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#496156", maxWidth: 620, margin: 0 }}>
              This demo shows how an accounting firm can publish internal documents, track who has confirmed them,
              and give both managers and team members a clear view of what is still circulating.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link href="/manager" style={primaryButton}>
                Open Manager Demo
              </Link>
              <Link href="/teamview" style={secondaryButton}>
                Open Team Demo
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, marginTop: 30 }}>
              {[
                { title: "Publish", copy: "Push policies, SOGs, and memos to the right people." },
                { title: "Track", copy: "See what is still circulating and what is overdue." },
                { title: "Confirm", copy: "Move documents out of circulation once they are read." },
              ].map((item) => (
                <div key={item.title} style={infoCard}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: "#5c7368" }}>{item.copy}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ display: "grid", gap: 18 }}>
            <div style={panelCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Manager snapshot</div>
                  <div style={{ color: "#647b71", fontSize: 14, marginTop: 4 }}>What leadership sees at a glance.</div>
                </div>
                <Link href="/manager" style={textLink}>
                  View full screen
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 18 }}>
                {managerHighlights.map((item) => (
                  <div key={item.label} style={miniStatCard}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#1f5d24" }}>{item.value}</div>
                    <div style={{ fontSize: 12, color: "#5c7368", marginTop: 4 }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #e6eee8", paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4c6358", marginBottom: 8 }}>
                  <span>Year-end workflow</span>
                  <span>12 / 15 confirmed</span>
                </div>
                <div style={{ height: 10, background: "#e7efe9", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: "80%", height: "100%", background: "#2e7d32" }} />
                </div>
                <p style={{ fontSize: 12, color: "#70857b", marginTop: 10, marginBottom: 0 }}>
                  Circulating means deployed to the team but not yet fully acknowledged.
                </p>
              </div>
            </div>

            <div style={panelCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Team snapshot</div>
                  <div style={{ color: "#647b71", fontSize: 14, marginTop: 4 }}>What an employee sees when they log in.</div>
                </div>
                <Link href="/teamview" style={textLink}>
                  View full screen
                </Link>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {teamHighlights.map((item) => (
                  <div key={item.title} style={teamRow}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={typeBadge(item.type)}>{item.type}</span>
                      <span style={{ fontWeight: 600 }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: 12, color: item.status === "Read" ? "#1f7a37" : "#9a6700", fontWeight: 700 }}>{item.status}</span>
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

function navButton(primary: boolean) {
  return {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    color: primary ? "#ffffff" : "#1f5d24",
    background: primary ? "#2e7d32" : "#eff6f0",
    border: primary ? "1px solid #2e7d32" : "1px solid #cfe1d2",
  } as const;
}

const primaryButton = {
  textDecoration: "none",
  background: "#2e7d32",
  color: "#ffffff",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  boxShadow: "0 10px 20px rgba(46, 125, 50, 0.18)",
};

const secondaryButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#1f5d24",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  border: "1px solid #cfe1d2",
};

const infoCard = {
  background: "#ffffff",
  borderRadius: 16,
  padding: "18px 16px",
  border: "1px solid #dbe7de",
};

const panelCard = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 22,
  border: "1px solid #dbe7de",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
};

const miniStatCard = {
  background: "#f7faf8",
  borderRadius: 14,
  padding: 14,
  border: "1px solid #e3ece5",
};

const textLink = {
  textDecoration: "none",
  color: "#2e7d32",
  fontWeight: 700,
  fontSize: 14,
};

const teamRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#f8fbf9",
  border: "1px solid #e3ece5",
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
