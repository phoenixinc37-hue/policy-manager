import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { employees, getTeamItems } from "../data";
import { cabinetIcon, drawerHandle, drawerRow } from "../cabinet";

export default function TeamView() {
  const selectedEmployee = employees[0];
  const assignedItems = getTeamItems(selectedEmployee);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1, 2].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Team View</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting firm demo</div>
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
              <div style={{ fontSize: 24, fontWeight: 800 }}>Employee selector</div>
              <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>
                Live demo of what the selected team member still needs to acknowledge.
              </p>
            </div>

            <label style={{ display: "block", fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", color: "#5c7368", marginBottom: 8 }}>
              SELECT EMPLOYEE
            </label>
            <div style={{ position: "relative" }}>
              <select defaultValue={selectedEmployee} style={selectStyle}>
                {employees.map((employee) => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
              <ChevronDown style={{ position: "absolute", right: 16, top: "50%", marginTop: -10, color: "#5c7368", pointerEvents: "none" }} />
            </div>

            <div style={{ marginTop: 18, padding: 16, background: "#f8fbf9", border: "1px solid #e4ece6", borderRadius: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>What the team member sees</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#60766b", lineHeight: 1.8, fontSize: 14 }}>
                <li>Only items assigned to them</li>
                <li>Clear action required vs completed status</li>
                <li>Direct visibility into team and document type</li>
              </ul>
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>Active circulating items</div>
                <div style={{ fontSize: 14, color: "#60766b", marginTop: 6 }}>Live queue for the selected team member.</div>
              </div>
              <div style={searchWrap}>
                <Search size={16} color="#5c7368" />
                <input placeholder="Search documents" style={searchInput} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {[
                { label: `All (${assignedItems.length})`, href: "/teamview", active: true },
                { label: `Policy (${assignedItems.filter((item) => item.type === "Policy").length})`, href: "/policy-index" },
                { label: `SOG (${assignedItems.filter((item) => item.type === "SOG").length})`, href: "/policy-index" },
                { label: `Memo (${assignedItems.filter((item) => item.type === "Memo").length})`, href: "/policy-index" },
              ].map((pill) => (
                <Link key={pill.label} href={pill.href} style={pillStyle(Boolean(pill.active), pill.label.startsWith("Policy") || pill.label.startsWith("SOG") || pill.label.startsWith("Memo"))}>{pill.label}</Link>
              ))}
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {assignedItems.map((item) => {
                const status = item.acknowledged ? "Completed" : "Action required";
                const subtext = item.acknowledged ? "Acknowledged" : "Awaiting acknowledgement";
                return (
                  <div key={item.id} style={rowCard(item.acknowledged)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
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

const selectStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #d6e4d8",
  background: "#f8fbf9",
  fontSize: 16,
  fontWeight: 600,
  color: "#10221a",
  appearance: "none" as const,
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
