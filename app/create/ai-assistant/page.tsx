import Link from "next/link";
import { cabinetIcon, drawerHandle, drawerRow } from "../../cabinet";

export default function CreateAiAssistantPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f7f4", color: "#10221a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <header style={headerCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={cabinetIcon}>{[0, 1].map((row) => <div key={row} style={drawerRow}><div style={drawerHandle} /></div>)}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Policy Manager <span style={{ fontSize: 20, fontWeight: 700, color: "#2e7d32", marginLeft: 10 }}>· AI Assistant</span></div>
              <div style={{ fontSize: 13, color: "#567164", fontWeight: 700 }}>Accounting Firm Demo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/status" style={greenMenuButton}>Circulating</Link>
            <Link href="/policy-index" style={greenMenuButton}>Library</Link>
            <Link href="/create" style={greenMenuButton}>Create</Link>
            <Link href="/pending" style={greenMenuButton}>Pending</Link>
            <Link href="/manager" style={primaryButton}>Leadership View</Link>
          </div>
        </header>

        <main style={{ marginTop: 24 }}>
          <section style={card}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI-assisted document template</div>
            <div style={{ fontSize: 14, color: "#60766b", lineHeight: 1.7, marginBottom: 24 }}>
              This uses the same base template as manual creation, but this path will later be wired so AI helps fill and shape the draft.
            </div>

            <div style={sectionCard}>
              <div style={sectionTitle}>Document setup</div>
              <div style={gridTwo}>
                <div>
                  <label style={label}>Document type</label>
                  <select style={inputStyle} defaultValue="Policy">
                    <option>Policy</option>
                    <option>SOG</option>
                    <option>Memo</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Assigned number / code</label>
                  <input style={inputStyle} value="Auto: next available based on type" readOnly />
                </div>
                <div style={fullWidth}>
                  <label style={label}>Title</label>
                  <input style={titleInputStyle} placeholder="Enter document title" />
                </div>
                <div>
                  <label style={label}>Version number</label>
                  <input style={inputStyle} placeholder="Enter version number or auto assign" defaultValue="1.0" />
                </div>
                <div>
                  <label style={label}>Author name</label>
                  <select style={inputStyle} defaultValue="Setup controlled dropdown">
                    <option>Setup controlled dropdown</option>
                    <option>Scott Wilde</option>
                    <option>Jack Wilde</option>
                    <option>Dawn</option>
                    <option>Penny</option>
                    <option>Kat</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Review timeline</label>
                  <select style={inputStyle} defaultValue="30 days · May 28, 2026">
                    <option>30 days · May 28, 2026</option>
                    <option>Quarterly · Jul 28, 2026</option>
                    <option>Semi annually · Oct 28, 2026</option>
                    <option>Annually · Apr 28, 2027</option>
                    <option>Bi annually · Apr 28, 2028</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Circulate to</label>
                  <select style={inputStyle} defaultValue="All">
                    <option>All</option>
                    <option>All leadership</option>
                    <option>All team</option>
                    <option>Groups</option>
                    <option>Individual team members</option>
                  </select>
                </div>
                <div style={fullWidth}>
                  <label style={label}>Distribution list</label>
                  <input style={inputStyle} placeholder="List group or individual names here" />
                </div>
                <div style={fullWidth}>
                  <label style={label}>Time stamp bar</label>
                  <div style={timeStampBar}>
                    <span>Started: Apr 28, 2026</span>
                    <span>Last touched: Apr 28, 2026 · 2:00 PM</span>
                    <span>Time entries grow as work is added</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={sectionCard}>
              <div style={sectionTitle}>Policy content template</div>
              <div style={stackWrap}>
                <div>
                  <label style={label}>Purpose</label>
                  <textarea style={textAreaStyle} placeholder="Why this document exists" />
                </div>
                <div>
                  <label style={label}>Scope</label>
                  <textarea style={textAreaStyle} placeholder="Who or what this applies to" />
                </div>
                <div>
                  <label style={label}>Policy statement</label>
                  <textarea style={largeTextAreaStyle} placeholder="Core rule, standard, or directive" />
                </div>
                <div>
                  <label style={label}>Procedure / steps</label>
                  <textarea style={largeTextAreaStyle} placeholder="Operational steps or working instructions" />
                </div>
                <div>
                  <label style={label}>Exceptions / notes</label>
                  <textarea style={textAreaStyle} placeholder="Exceptions, edge cases, or extra notes" />
                </div>
                <div>
                  <label style={label}>Definitions</label>
                  <textarea style={textAreaStyle} placeholder="Define important terms used in this document" />
                </div>
                <div>
                  <label style={label}>Attachments / references</label>
                  <textarea style={textAreaStyle} placeholder="List linked files, source material, or reference documents" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <button style={saveButton}>Save</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const headerCard = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", border: "1px solid #dbe7de", borderRadius: 18, padding: "18px 22px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)", gap: 16, flexWrap: "wrap" as const };
const card = { background: "#ffffff", borderRadius: 18, padding: 24, border: "1px solid #dbe7de", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)" };
const sectionCard = { borderRadius: 16, border: "1px solid #dbe7de", background: "#f9fbf9", padding: 20, marginBottom: 20 };
const sectionTitle = { fontSize: 18, fontWeight: 800, marginBottom: 16 };
const gridTwo = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 };
const fullWidth = { gridColumn: "1 / -1" };
const stackWrap = { display: "grid", gap: 16 };
const label = { display: "block", fontSize: 13, fontWeight: 700, color: "#466255", marginBottom: 8 };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const };
const titleInputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, minHeight: 52 };
const timeStampBar = { display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 14, color: "#466255" };
const textAreaStyle = { width: "100%", minHeight: 100, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, resize: "vertical" as const };
const largeTextAreaStyle = { width: "100%", minHeight: 160, padding: "12px 14px", borderRadius: 12, border: "1px solid #d6e4d8", background: "#ffffff", fontSize: 15, color: "#10221a", boxSizing: "border-box" as const, resize: "vertical" as const };
const greenMenuButton = { textDecoration: "none", background: "#66a97a", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #66a97a" };
const primaryButton = { textDecoration: "none", background: "#1f5d24", color: "#ffffff", padding: "10px 12px", borderRadius: 10, fontWeight: 700, border: "1px solid #1f5d24" };
const saveButton = { background: "#1f5d24", color: "#ffffff", padding: "12px 18px", borderRadius: 10, fontWeight: 800, border: "1px solid #1f5d24" };
