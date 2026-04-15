import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

export default function TeamView() {
  const employees = [
    "Jack Wilde",
    "Sarah Jenkins",
    "Michael Chang",
    "Emily Rodriguez",
    "David Thompson",
    "Amanda Cole",
    "Robert Chen",
    "Jessica Patel",
    "Thomas Wright",
    "Olivia Bennett"
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
                Policy Manager <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginLeft: 6 }}>for accounting firms</span><span style={{ fontSize: 14, fontWeight: 600, color: '#166534', marginLeft: 12 }}>u00b7 Team View</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Business Inc</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#166534', background: '#f1f5f9', border: '1px solid #cbd5e1' }}>Back to Home</Link>
            <Link href="/teamview" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Team View</Link>
            <Link href="/manager" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Manager view</Link>
          </div>
        </div>

        {/* TEAM VIEW CONTENT */}
        <div style={{ marginTop: 40, maxWidth: 800, margin: '40px auto 0' }}>
          
          <div style={{ background: '#ffffff', borderRadius: 12, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            
            <div style={{ marginBottom: 32, borderBottom: '1px solid #e2e8f0', paddingBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Team View Dashboard</h1>
              <p style={{ color: '#64748b', fontSize: 14 }}>Select a team member to view their circulating and read policies.</p>
            </div>

            {/* EMPLOYEE SELECTOR */}
            <div style={{ marginBottom: 30 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Employee (Demo Mode)</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <select style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '2px solid #e2e8f0', background: '#f8fafc', fontSize: 16, fontWeight: 500, color: '#0f172a', appearance: 'none', cursor: 'pointer', outline: 'none' }} defaultValue="Jack Wilde">
                  {employees.map((emp) => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
                <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                  <ChevronDown style={{ height: 20, width: 20 }} />
                </div>
              </div>
            </div>

            {/* DEMO CONTENT AREA */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>Active Circulating Items</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, color: '#64748b', fontSize: 14 }}>
                  <Search style={{ height: 16, width: 16 }} />
                  <input type="text" placeholder="Search items..." style={{ background: 'transparent', border: 'none', outline: 'none', width: 150 }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <span style={{ padding: '6px 16px', borderRadius: 999, background: '#166534', color: '#ffffff', fontSize: 13, fontWeight: 500 }}>All (3)</span>
                <span style={{ padding: '6px 16px', borderRadius: 999, background: '#f1f5f9', color: '#475569', fontSize: 13, fontWeight: 500, border: '1px solid #cbd5e1' }}>Policy (1)</span>
                <span style={{ padding: '6px 16px', borderRadius: 999, background: '#f1f5f9', color: '#475569', fontSize: 13, fontWeight: 500, border: '1px solid #cbd5e1' }}>SOG (1)</span>
                <span style={{ padding: '6px 16px', borderRadius: 999, background: '#f1f5f9', color: '#475569', fontSize: 13, fontWeight: 500, border: '1px solid #cbd5e1' }}>Memo (1)</span>
              </div>

              {/* LIST ITEMS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                
                <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#ffffff', padding: 20, transition: 'all 0.2s', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 6, background: '#dcfce7', color: '#166534', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>POLICY</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>Year-end workflow</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></span> Action Required
                    </span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: 12 }}>
                    <span>Assigned: Oct 24, 2026</span>
                    <span style={{ color: '#ef4444', fontWeight: 500 }}>Due: Oct 31, 2026</span>
                  </div>
                </div>

                <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#ffffff', padding: 20, cursor: 'pointer', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 6, background: '#e0f2fe', color: '#0369a1', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>SOG</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>Client Intake Process V2</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></span> Action Required
                    </span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: 12 }}>
                    <span>Assigned: Oct 26, 2026</span>
                    <span style={{ color: '#ef4444', fontWeight: 500 }}>Due: Nov 02, 2026</span>
                  </div>
                </div>

                <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', padding: 20, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 6, background: '#f1f5f9', color: '#475569', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', border: '1px solid #e2e8f0' }}>MEMO</span>
                      <span style={{ fontSize: 16, fontWeight: 500, color: '#475569', textDecoration: 'line-through' }}>Holiday Office Hours 2026</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }}></span> Read
                    </span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: 12 }}>
                    <span>Assigned: Oct 28, 2026</span>
                    <span>Read: Oct 28, 2026</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
