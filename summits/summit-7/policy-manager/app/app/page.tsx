export default function HomepageMockupOpen() {
 return (
 <div style={{ minHeight: '100vh', background: '#f1f5f9', color: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
 <div style={{ maxWidth: 1200, margin: '0 auto', padding: 12 }}>
 {/* HEADER */}
 <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
 <div style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
 <div style={{ background: '#dcfce7', padding: 6, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 3 }}>
 <div style={{ width: 20, height: 22, background: '#166534', borderRadius: 3, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
 Policy Manager <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginLeft: 6 }}>for accounting firms</span>
 </div>
 <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Business Inc</div>
 </div>
 </div>
 <div style={{ display: 'flex', gap: 8 }}>
 <a href="#" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Team View</a>
 <a href="#" style={{ textDecoration: 'none', padding: '6px 12px', borderRadius: 6, color: '#ffffff', background: '#166534' }}>Manager view</a>
 </div>
 </div>

 {/* HERO + RIGHT COLUMN */}
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 0, alignItems: 'start' }}>
 {/* LEFT */}
 <div style={{ marginTop: 80 }}>
 <div style={{ fontSize: 12, background: '#ecfdf5', color: '#166534', display: 'inline-block', padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>
 Built for accountants
 </div>
 <h1 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
 <span style={{ fontWeight: 700 }}>STRUCTURE</span> is what makes a firm <span style={{ fontWeight: 700 }}>SUCCESSFUL</span>.
 </h1>
 <p style={{ marginTop: 16, color: '#475569', fontSize: 16, lineHeight: 1.6 }}>
 Policies, SOPs, and internal communication are the <span style={{ fontWeight: 700 }}>FOUNDATION</span> of that <span style={{ fontWeight: 700 }}>STRUCTURE</span> — policies that are read, understood, and followed will make your firm <span style={{ fontWeight: 700 }}>SUCCESSFUL</span>.
 </p>
 <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
 <a href="#" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>Policy</a>
 <a href="#" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>SOG</a>
 <a href="#" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>Memo</a>
 </div>
 </div>

 {/* RIGHT */}
 <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 80 }}>
 <div style={{ background: '#ffffff', borderRadius: 12, padding: 12, border: '1px solid #e2e8f0' }}>
 <div style={{ fontWeight: 600 }}>Manager Overview</div>
 </div>

 <div style={{ background: '#ffffff', borderRadius: 12, padding: 12, border: '1px solid #e2e8f0' }}>
 <div style={{ fontWeight: 600 }}>Team Overview</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}