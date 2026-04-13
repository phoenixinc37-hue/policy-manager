// This is a minor comment to force a new Vercel deployment
export default function Page() {
 return (
 <div style={{ minHeight: '100vh', background: '#f1f5f9', color: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
 <div style={{ maxWidth: 1200, margin: '0 auto', padding: 12 }}>

 {/* HEADER */}
 <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0' }}>
 <div style={{ display: 'flex', gap: 12 }}>
 <div style={{ background: '#dcfce7', padding: 6, borderRadius: 8 }}>
 <div style={{ width: 20, height: 22, background: '#166534', borderRadius: 3 }} />
 </div>
 <div>
 <div style={{ fontWeight: 600 }}>
 Policy Manager <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginLeft: 6 }}>for accounting firms</span>
 </div>
 <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Business Inc</div>
 </div>
 </div>

 <div style={{ display: 'flex', gap: 8 }}>
 <a href="#" style={{ padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Team View</a>
 <a href="#" style={{ padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Manager view</a>
 </div>
 </div>

 {/* MANAGER VIEW */}
 <div style={{ marginTop: 30, background: '#ffffff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
 <div style={{ fontWeight: 600, marginBottom: 12 }}>Manager View (Demo)</div>

 <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
 <div style={{ padding: '4px 10px', borderRadius: 999, background: '#166534', color: '#ffffff', fontSize: 12 }}>Last 7 days</div>
 <div style={{ padding: '4px 10px', borderRadius: 999, background: '#22c55e', fontSize: 12 }}>30 days</div>
 <div style={{ padding: '4px 10px', borderRadius: 999, background: '#86efac', fontSize: 12 }}>Last year</div>
 </div>

 <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, marginBottom: 10 }}>
 Policy · Year-end workflow
 </div>

 <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}>
 SOG · Intake process
 </div>
 </div>

 {/* TEAM VIEW */}
 <div style={{ marginTop: 30, background: '#ffffff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
 <div style={{ fontWeight: 600, marginBottom: 12 }}>Team View (Demo)</div>

 <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}>
 Policy · Year-end workflow (80% read)
 </div>
 </div>

 </div>
 </div>
 );
}