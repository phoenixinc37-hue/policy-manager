import Link from "next/link";
import { documents } from "../data";
import { CabinetGraphic } from "../cabinet";

const libraryTypes = ["all", "Policy", "SOG", "Memo"] as const;
type LibraryType = typeof libraryTypes[number];

export default function PolicyIndex({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  const selectedType: LibraryType = libraryTypes.includes(searchParams?.type as LibraryType)
    ? (searchParams?.type as LibraryType)
    : "all";

  const policies = documents.filter((doc) => {
    const inLibraryFlow = doc.status === "library" || doc.status === "circulating" || doc.status === "pending-approval";
    const typeMatch = selectedType === "all" ? true : doc.type === selectedType;
    return inLibraryFlow && typeMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <CabinetGraphic />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· Library</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Blank Template</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={whiteButtonLink}>Circulating</Link>
            <Link href="/pending" style={whiteButtonLink}>Pending</Link>
            <Link href="/completion" style={whiteButtonLink}>Complete</Link>
            <Link href="/create" style={whiteButtonLink}>Create</Link>
            <Link href="/manager" style={whiteButtonLink}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Business Name Library</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Browse and separate policies, SOGs, and memos across the firm library.</p>

          <section style={panelCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
              <div style={searchWrap}>
                <input type="text" placeholder="Search by keyword, code, or title..." style={searchInput} />
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/policy-index" style={selectedType === "all" ? activeFilterButton : filterButtonLink}>All</Link>
                <Link href="/policy-index?type=Policy" style={selectedType === "Policy" ? activeFilterButton : filterButtonLink}>Policy</Link>
                <Link href="/policy-index?type=SOG" style={selectedType === "SOG" ? activeFilterButton : filterButtonLink}>SOG</Link>
                <Link href="/policy-index?type=Memo" style={selectedType === "Memo" ? activeFilterButton : filterButtonLink}>Memo</Link>
              </div>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={tableHeader}>
                <div>Type</div>
                <div>Title</div>
                <div>In effect</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {policies.map((policy, idx) => (
                  <div key={policy.id} style={{ ...tableRow, borderBottom: idx === policies.length - 1 ? "none" : "1px solid #e2e8f0" }}>
                    <div>
                      {policy.type === "Policy" && <span style={{ ...typeBadge, background: "#dcfce7", color: "#166534" }}>POLICY</span>}
                      {policy.type === "SOG" && <span style={{ ...typeBadge, background: "#e0f2fe", color: "#0369a1" }}>SOG</span>}
                      {policy.type === "Memo" && <span style={{ ...typeBadge, background: "#f3f4f6", color: "#475569" }}>MEMO</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Link href={`/policy-index/document/${policy.id}`} style={rowActionButton}>Open</Link>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{policy.title}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#1f7a37", fontWeight: 700 }}>
                      {policy.effectiveDate ?? "TBD"}
                    </div>
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

const searchWrap = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px",
  background: "#f8fafc",
  border: "2px solid #e2e8f0",
  borderRadius: 8,
  flex: 1,
  minWidth: 280,
};

const searchInput = {
  background: "transparent",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: 16,
  color: "#0f172a",
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "120px 1.4fr 180px",
  gap: 16,
  padding: "12px 20px",
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  fontSize: 12,
  fontWeight: 700,
  color: "#475569",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "120px 1.4fr 180px",
  gap: 16,
  padding: "16px 20px",
  alignItems: "center",
  background: "#ffffff",
};

const typeBadge = {
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const whiteButtonLink = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 12px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};

const rowActionButton = {
  textDecoration: "none",
  background: "#ffffff",
  color: "#10221a",
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 800,
  border: "1px solid #dbe7de",
};

const activeFilterButton = {
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 8,
  background: "#ffffff",
  color: "#10221a",
  fontSize: 14,
  fontWeight: 700,
  border: "1px solid #10221a",
};

const filterButtonLink = {
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 8,
  background: "#ffffff",
  color: "#10221a",
  fontSize: 14,
  fontWeight: 700,
  border: "1px solid #dbe7de",
};
