import Link from "next/link";

const managerHighlights = [
  { label: "Documents circulating", value: "10" },
  { label: "Awaiting acknowledgement", value: "14" },
  { label: "Tax team completion", value: "84%" },
];

const teamHighlights = [
  { label: "Awaiting acknowledgement", value: "2" },
  { label: "Due this week", value: "1" },
  { label: "Acknowledged", value: "1" },
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
                width: 52,
                height: 60,
                borderRadius: 8,
                background: "linear-gradient(180deg, #3b5d7a 0%, #2a455d 100%)",
                border: "1px solid #22394d",
                padding: 5,
                boxSizing: "border-box",
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gap: 4,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  borderRadius: 4,
                  border: "1px solid #3e556b",
                  background: "linear-gradient(180deg, #6f8aa6 0%, #4f6b86 100%)",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", left: 8, right: 8, top: 10, height: 1, background: "#dbe5ec", opacity: 0.9 }} />
                <div style={{ position: "absolute", left: 8, right: 8, top: 14, height: 1, background: "#dbe5ec", opacity: 0.65 }} />
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 12, height: 4, borderRadius: 999, background: "#2a455d" }} />
              </div>
              <div
                style={{
                  borderRadius: 4,
                  border: "1px solid #334c63",
                  background: "linear-gradient(180deg, #5c7894 0%, #3e5a73 100%)",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", left: 8, right: 8, top: 10, height: 1, background: "#dbe5ec", opacity: 0.9 }} />
                <div style={{ position: "absolute", left: 8, right: 8, top: 14, height: 1, background: "#dbe5ec", opacity: 0.65 }} />
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 12, height: 4, borderRadius: 999, background: "#2a455d" }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager</div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/manager" style={headerButton("#1f5d24")}>
              Leadership View
            </Link>
            <Link href="/teamview" style={headerButton("#66a97a")}>
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
              Nothing leaves circulation until it’s acknowledged by every assigned team member.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link href="/manager" style={primaryButton}>
                Open Leadership Demo
              </Link>
              <Link href="/teamview" style={teamDemoButton}>
                Open Team Demo
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginTop: 30 }}>
              {[
                { title: "Create", copy: "Create and assign policies, SOGs, and memos." },
                { title: "Track", copy: "Track what is still circulating across the firm." },
                { title: "Confirm", copy: "Ensure documents are acknowledged before completion." },
                { title: "Library", copy: "Access all firm policies and historical documents." },
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
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Leadership Dashboard</div>
                  <div style={{ color: "#647b71", fontSize: 14, marginTop: 4 }}>What leadership sees at a glance.</div>
                </div>
                <Link href="/manager" style={{ ...textLink, color: "#1f5d24" }}>
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
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4c6358", marginBottom: 8, gap: 12 }}>
                  <span>Policy - Client File Document Standards</span>
                  <span>12 / 15 confirmed</span>
                </div>
                <div style={{ height: 10, background: "#e7efe9", borderRadius: 999, overflow: "hidden", marginBottom: 14 }}>
                  <div style={{ width: "80%", height: "100%", background: "#2e7d32" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4c6358", marginBottom: 8, gap: 12 }}>
                  <span>SOG - Month End Closing Procedure</span>
                  <span>9 / 15 confirmed</span>
                </div>
                <div style={{ height: 10, background: "#e7efe9", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: "60%", height: "100%", background: "#2e7d32" }} />
                </div>

                <p style={{ fontSize: 12, color: "#70857b", marginTop: 10, marginBottom: 0 }}>
                  Circulating means deployed to the team but not yet fully acknowledged.
                </p>
              </div>
            </div>

            <div style={panelCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Team Dashboard</div>
                  <div style={{ color: "#647b71", fontSize: 14, marginTop: 4 }}>Individual team members current status</div>
                </div>
                <Link href="/teamview" style={{ ...textLink, color: "#1f5d24" }}>
                  View full screen
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                {teamHighlights.map((item) => (
                  <div key={item.label} style={miniStatCard}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#1f5d24" }}>{item.value}</div>
                    <div style={{ fontSize: 12, color: "#5c7368", marginTop: 4 }}>{item.label}</div>
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

function headerButton(color: string) {
  return {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    color: "#ffffff",
    background: color,
    border: `1px solid ${color}`,
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

const teamDemoButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "13px 18px",
  borderRadius: 12,
  fontWeight: 700,
  border: "1px solid #66a97a",
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
