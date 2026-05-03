"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { CabinetGraphic } from "../cabinet";
import { loadCirculatingDrafts, type SavedDraftRecord } from "../create/ai-assistant/draftStorage";
import { loadConfigSnapshot } from "../useSiteConfig";

export default function TeamView({ searchParams }: { searchParams?: { type?: string; q?: string } }) {
  const [circulating, setCirculating] = useState<SavedDraftRecord[]>([]);
  const config = useMemo(() => loadConfigSnapshot(), []);
  const personnel = config.personnel || [];
  const [selectedPersonId, setSelectedPersonId] = useState<string>(personnel.length > 0 ? personnel[0].id : "");

  useEffect(() => {
    function forceLoad() {
      setCirculating(loadCirculatingDrafts());
    }
    forceLoad();
    const interval = setInterval(forceLoad, 500);
    return () => clearInterval(interval);
  }, []);

  const selectedPerson = personnel.find((p: any) => p.id === selectedPersonId);
  const selectedSite = config.siteLocations?.find((s: any) => s.id === selectedPerson?.siteLocationId);

  // Filter circulating documents based on whether the selected person is in the circulation targets
  const assignedItems = circulating.filter((doc) => {
    if (!selectedPerson) return false;
    if (!doc.circulationTargets || doc.circulationTargets.length === 0) return false;

    return doc.circulationTargets.some((target) => {
      // 1. Matched by direct name
      if (target === selectedPerson.fullName) return true;
      // 2. Matched by ALL Leadership (this person is L1/L2, etc) - for now assuming L1/L2 means leadership
      if (target === "ALL Leadership" && ["l1", "l2"].includes(selectedPerson.accessLevelId)) return true;
      // 3. Matched by ALL Clinics
      if (target === "ALL Clinics") return true;
      // 4. Matched by specific Site
      if (selectedSite && target === selectedSite.name) return true;
      
      return false;
    });
  });

  const activeType = searchParams?.type ?? "all";
  const query = (searchParams?.q ?? "").toLowerCase().trim();
  const typeFilteredItems = activeType === "all" ? assignedItems : assignedItems.filter((item) => item.documentType.toLowerCase() === activeType);
  const filteredItems = !query
    ? typeFilteredItems
    : typeFilteredItems.filter((item) =>
        [item.title, item.documentType].some((value) => value.toLowerCase().includes(query))
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
            <Link href="/" style={whiteButtonLink}>Home</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
            <Link href="/policy-index" style={whiteButtonLink}>Library</Link>
          </div>
        </header>

        <main style={{ display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 22, marginTop: 24 }}>
          <section style={panelCard}>
            <div style={{ borderBottom: "1px solid #e4ece6", paddingBottom: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>Employee view</div>
              <p style={{ fontSize: 14, color: "#60766b", lineHeight: 1.6, margin: "8px 0 0" }}>
                This page represents what you see. You only see your own assigned items and acknowledgement status.
              </p>
            </div>

            <div style={{ padding: 16, background: "#f8fbf9", border: "1px solid #e4ece6", borderRadius: 14 }}>
              {personnel.length === 0 ? (
                <div style={{ fontSize: 14, color: "#60766b" }}>No team members set up yet.</div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#567164" }}>View as:</div>
                  <select
                    value={selectedPersonId}
                    onChange={(e) => setSelectedPersonId(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #dbe7de", fontSize: 14, width: "100%" }}
                  >
                    {personnel.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.fullName} ({config.siteLocations?.find((s:any)=>s.id === p.siteLocationId)?.name || "No site"})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </section>

          <section style={panelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{selectedPerson?.fullName || "Employee"} active circulating items</div>
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
                { key: "policy", label: `Policy (${assignedItems.filter((item) => item.documentType === "Policy").length})`, href: "/teamview?type=policy" },
                { key: "sog", label: `SOG (${assignedItems.filter((item) => item.documentType === "SOG").length})`, href: "/teamview?type=sog" },
                { key: "memo", label: `Memo (${assignedItems.filter((item) => item.documentType === "Memo").length})`, href: "/teamview?type=memo" },
              ].map((pill) => (
                <Link key={pill.label} href={pill.href} style={pillStyle(activeType === pill.key)}>{pill.label}</Link>
              ))}
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {filteredItems.length === 0 ? (
                 <div style={{ fontSize: 14, color: "#60766b", padding: 18, background: "#f9fbf9", borderRadius: 16, border: "1px solid #dbe7de" }}>
                    No circulating items target this employee.
                 </div>
              ) : filteredItems.map((item) => {
                const isAcknowledged = !!(item.acknowledgments && item.acknowledgments[selectedPersonId]);
                const status = isAcknowledged ? "Completed" : "Action required";
                const subtext = isAcknowledged ? "Acknowledged" : "Awaiting acknowledgement";
                return (
                  <div key={item.id} style={rowCard(isAcknowledged)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <Link href={`/teamview/document/${item.id}?person=${selectedPersonId}`} style={openDocButton}>Open</Link>
                          <span style={typeBadge(item.documentType)}>{item.documentType}</span>
                          <span style={{ fontWeight: 700, fontSize: 17, color: isAcknowledged ? "#667c71" : "#10221a", textDecoration: isAcknowledged ? "line-through" : "none" }}>{item.title}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#6a8075", marginTop: 12 }}>{subtext}</div>
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

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
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

function pillStyle(active: boolean) {
  return {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
    background: "#ffffff",
    color: "#10221a",
    border: active ? "1px solid #10221a" : "1px solid #dbe7de",
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
  background: "#ffffff",
  color: "#10221a",
  padding: "6px 10px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 800,
  border: "1px solid #dbe7de",
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
