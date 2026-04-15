import Link from "next/link";
import { ChevronDown, Search, FileText } from "lucide-react";

export default function PolicyIndex() {
  const policies = [
    { code: "POL-001", type: "Policy", title: "Year-end workflow", date: "Oct 15, 2026", status: "Active" },
    { code: "POL-002", type: "Policy", title: "Client Onboarding", date: "Sep 12, 2026", status: "Active" },
    { code: "SOG-014", type: "SOG", title: "Client Intake Process V2", date: "Oct 20, 2026", status: "Active" },
    { code: "SOG-015", type: "SOG", title: "Tax Preparation Guidelines", date: "Aug 05, 2026", status: "Active" },
    { code: "MEM-089", type: "Memo", title: "Holiday Office Hours 2026", date: "Oct 28, 2026", status: "Active" },
    { code: "POL-003", type: "Policy", title: "Data Security & Privacy", date: "Jul 10, 2026", status: "Active" },
    { code: "MEM-090", type: "Memo", title: "Q3 All-Hands Meeting Notes", date: "Oct 01, 2026", status: "Archived" },
    { code: "SOG-016", type: "SOG", title: "Payroll Processing Schedule", date: "Jun 22, 2026", status: "Active" },
    { code: "POL-004", type: "Policy", title: "Remote Work Guidelines", date: "May 15, 2026", status: "Active" },
    { code: "MEM-091", type: "Memo", title: "New Expense Reporting Tool", date: "Apr 04, 2026", status: "Active" }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', color: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 12 }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
            <div style={{ background: '#dcfce7', padding: 6, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 3 }}>
              <div style={{ width: 24, height: 24, background: '#166534', borderRadius: 4, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #14532d' }}>
                <div style={{ height: 5, background: '#22c55e', borderRadius: 2, position: 'relative' }}>
                  <div style={{ width: 4, height: 2, background: '#14532d', borderRadius: 1, position: 'absolute', right: 2, top: 1 }} />
                </div>
                <div style={{ height: 5, background: '#22c55e', borderRadius: 2, position: 'relative' }}>
                  <div style={{ width: 4, height: 2, background: '#14532d', borderRadius: 1, position: 'absolute', right: 2, top: 1 }} />
                </div>
                <div style={{ height: 5, background: '#22c55e', borderRadius: 2, position: 'relative' }}>
                  <div style={{ width: 4, height: 2, background: '#14532d', borderRadius: 1, position: 'absolute', right: 2, top: 1 }} />
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>
                Policy Manager <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginLeft: 6 }}>for accounting firms</span><span style={{ fontSize: 14, fontWeight: 600, color: '#166534', marginLeft: 12 }}>· Policy Index</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Business Inc</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#166534', background: '#f1f5f9', border: '1px solid #cbd5e1', fontSize: 14, fontWeight: 500 }}>Back to Home</Link>
            <Link href="/teamview" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534', fontSize: 14, fontWeight: 500 }}>Team View</Link>
          </div>
        </div>

        {/* INDEX CONTENT */}
        <div style={{ marginTop: 40 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Implemented Policy Index</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Browse and search all finalized policies, SOGs, and memos currently active across the firm.</p>
          
          <div style={{ background: '#ffffff', borderRadius: 12, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            
            {/* SEARCH AND FILTERS */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: 8, color: '#64748b', flex: 1 }}>
                <Search style={{ height: 20, width: 20 }} />
                <input type="text" placeholder="Search by keyword, code, or title..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: 16, color: '#0f172a' }} />
              </div>
              
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '10px 16px', borderRadius: 8, background: '#166534', color: '#ffffff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>All Types</button>
                <button style={{ padding: '10px 16px', borderRadius: 8, background: '#f1f5f9', color: '#475569', fontSize: 14, fontWeight: 500, border: '1px solid #cbd5e1', cursor: 'pointer' }}>Policies</button>
                <button style={{ padding: '10px 16px', borderRadius: 8, background: '#f1f5f9', color: '#475569', fontSize: 14, fontWeight: 500, border: '1px solid #cbd5e1', cursor: 'pointer' }}>SOGs</button>
                <button style={{ padding: '10px 16px', borderRadius: 8, background: '#f1f5f9', color: '#475569', fontSize: 14, fontWeight: 500, border: '1px solid #cbd5e1', cursor: 'pointer' }}>Memos</button>
              </div>
            </div>

            {/* INDEX TABLE / LIST */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              
              {/* TABLE HEADER */}
              <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr 120px 100px', gap: 16, padding: '12px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <div>Code</div>
                <div>Type</div>
                <div>Title</div>
                <div>Implemented</div>
                <div>Status</div>
              </div>

              {/* TABLE ROWS */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {policies.map((policy, idx) => (
                  <div key={policy.code} style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr 120px 100px', gap: 16, padding: '16px 20px', borderBottom: idx === policies.length - 1 ? 'none' : '1px solid #e2e8f0', alignItems: 'center', transition: 'background 0.15s', cursor: 'pointer', background: '#ffffff' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>{policy.code}</div>
                    <div>
                      {policy.type === "Policy" && <span style={{ padding: '2px 8px', borderRadius: 4, background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>POLICY</span>}
                      {policy.type === "SOG" && <span style={{ padding: '2px 8px', borderRadius: 4, background: '#e0f2fe', color: '#0369a1', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>SOG</span>}
                      {policy.type === "Memo" && <span style={{ padding: '2px 8px', borderRadius: 4, background: '#f3f4f6', color: '#475569', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', border: '1px solid #e2e8f0' }}>MEMO</span>}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>{policy.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{policy.date}</div>
                    <div>
                      {policy.status === "Active" ? (
                         <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }}></span> Active</span>
                      ) : (
                         <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }}></span> Archived</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
