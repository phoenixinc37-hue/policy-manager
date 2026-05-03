import Link from "next/link";
import { Search } from "lucide-react";
import { employees, getTeamItems } from "../data";
import { CabinetGraphic } from "../cabinet";

export default function TeamView({ searchParams }: { searchParams?: { type?: string; q?: string } }) {
  const selectedEmployee = employees[0];
  const assignedItems = getTeamItems(selectedEmployee).filter((item) => !item.acknowledged);
  const activeType = searchParams?.type ?? "all";
  const query = (searchParams?.q ?? "").toLowerCase().trim();
  const typeFilteredItems = activeType === "all" ? assignedItems : assignedItems.filter((item) => item.type.toLowerCase() === activeType);
  const filteredItems = !query
    ? typeFilteredItems
    : typeFilteredItems.filter((item) =>
        [item.title, item.type, item.team].some((value) => value.toLowerCase().includes(query))
      );

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic rows={3} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Team View</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={primaryButtonLink}>Home</Link>
            <Link href="/manager" style={greenMenuButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 22, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ borderBottom: "1px solid #e4ece6", paddingBottom: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>Employee view</div>
              <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>
                This page represents what the logged-in team member sees. They should only see their own assigned items and acknowledgement status.
              </p>
            </div>

            <div style={{ padding: 16, background: "#f8fbf9", border: "1px solid #e4ece6", borderRadius: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 700 }}>{selectedEmployee}</div>
                <Link href="/policy-index" style={greenMenuButton}>Library</Link>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#60766b", lineHeight: 1.8, fontSize: 14 }}>
                <li>Only items assigned to this team member</li>
                <li>No visibility into other employees</li>
                <li>Clear action required vs completed status</li>
                <li>Direct visibility into document type and team</li>
                <li>In the live version, employee selection moves to setup/leadership workflow rather than team view.</li>
              </ul>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{selectedEmployee} active circulating items</div>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Live queue for the selected team member.</div>
              </div>
              <form method="GET" action="/teamview" style={searchWrap}>
                <input type="hidden" name="type" value={activeType} />
                <Search size={16} color="#5c7368" />
                <input name="q" defaultValue={searchParams?.q ?? ""} placeholder="Search documents" style={searchInput} />
              </form>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {[
                { key: "all", label: `All (${assignedItems.length})`, href: "/teamview" },
                { key: "policy", label: `Policy (${assignedItems.filter((item) => item.type === "Policy").length})`, href: "/teamview?type=policy" },
                { key: "sog", label: `SOG (${assignedItems.filter((item) => item.type === "SOG").length})`, href: "/teamview?type=sog" },
                { key: "memo", label: `Memo (${assignedItems.filter((item) => item.type === "Memo").length})`, href: "/teamview?type=memo" },
              ].map((pill) => (
                <Link key={pill.label} href={pill.href} style={pillStyle(activeType === pill.key, pill.key !== "all")}>{pill.label}</Link>
              ))}
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {filteredItems.map((item) => {
                const status = item.acknowledged ? "Completed" : "Action required";
                const subtext = item.acknowledged ? "Acknowledged" : "Awaiting acknowledgement";
                return (
                  <div key={item.id} style={rowCard(item.acknowledged)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <Link href={`/teamview/document/${item.id}`} style={openDocButton}>Open</Link>
                          <span style={typeBadge(item.type)}>{item.type}</span>
                          <span style={{ fontWeight: 700, fontSize: 17, color: item.acknowledged ? "#667c71" : "#10221a", textDecoration: item.acknowledged ? "line-through" : "none" }}>{item.title}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#6a8075", marginTop: 12 }}>{item.team} · {subtext}</div>
                      </div>
                      <span style={statusBadge(status)}>{status}</span>
                    </div>
                  </div>
                );
              })}
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

const greenMenuButton = {
  textDecoration: "none",
  background: "#66a97a",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #66a97a",
};

const primaryButtonLink = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #1f5d24",
};

const searchWrap = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#f8fbf9",
  border: "1px solid #d6e4d8",
  borderRadius: 12,
  padding: "10px 12px",
};

const searchInput = {
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  width: 160,
};

function pillStyle(active: boolean, lightGreen = false) {
  return {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
    background: active ? "#2e7d32" : lightGreen ? "#66a97a" : "#f1f6f2",
    color: active ? "#ffffff" : lightGreen ? "#ffffff" : "#486055",
    border: active ? "1px solid #2e7d32" : lightGreen ? "1px solid #66a97a" : "1px solid #d6e4d8",
  };
}

function rowCard(done: boolean) {
  return {
    borderRadius: 16,
    border: `1px solid ${done ? "#dde7e0" : "#d6e4d8"}`,
    background: done ? "#f7faf8" : "#ffffff",
    padding: 18,
  };
}

const openDocButton = {
  textDecoration: "none",
  background: "#1f5d24",
  color: "#ffffff",
  padding: "6px 10px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 800,
  border: "1px solid #1f5d24",
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

function statusBadge(status: string) {
  const done = status === "Completed";
  return {
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background: done ? "#e5f6e9" : "#fff3d9",
    color: done ? "#1f7a37" : "#9a6700",
  };
}
