import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function LandingPage() {
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

        {/* MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 0, alignItems: 'start' }}>
          
          {/* LEFT COLUMN */}
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
              <Link href="/policy-index" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>Policy</Link>
              <Link href="/policy-index" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>SOG</Link>
              <Link href="/policy-index" style={{ textDecoration: 'none', background: '#166534', color: '#ffffff', padding: '10px 16px', borderRadius: 6 }}>Memo</Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 80 }}>
            
            {/* MANAGER OVERVIEW PANE */}
            <div style={{ background: '#ffffff', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              {/* HEADER */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Manager Overview</div>

                {/* TEAM TABS */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <div style={{ padding: '4px 10px', borderRadius: 999, background: '#14532d', color: '#ffffff', fontSize: 12 }}>All</div>
                  <div style={{ padding: '4px 10px', borderRadius: 999, background: '#166534', color: '#ffffff', fontSize: 12 }}>Tax Team</div>
                  <div style={{ padding: '4px 10px', borderRadius: 999, background: '#22c55e', color: '#064e3b', fontSize: 12 }}>Admin Team</div>
                  <div style={{ padding: '4px 10px', borderRadius: 999, background: '#86efac', color: '#065f46', fontSize: 12 }}>Partner Team</div>
                </div>

                {/* SUMMARY */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Tax team</div>
                  <div style={{ color: '#166534', fontSize: 12 }}>84% complete</div>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div style={{ background: '#e2e8f0', height: 6, borderRadius: 6, marginBottom: 12 }}>
                <div style={{ background: '#16a34a', height: 6, width: '80%', borderRadius: 6 }} />
              </div>

              {/* CIRCULATING COUNTS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 8, columnGap: 12, fontSize: 12, marginBottom: 14 }}>
                <div style={{ color: '#475569' }}>Policies circulating</div>
                <div style={{ fontWeight: 600 }}>3</div>

                <div style={{ color: '#475569' }}>SOGs circulating</div>
                <div style={{ fontWeight: 600 }}>5</div>

                <div style={{ color: '#475569' }}>Memos circulating</div>
                <div style={{ fontWeight: 600 }}>2</div>
              </div>

              {/* EXPLANATION */}
              <div style={{ fontSize: 12, color: '#64748b', padding: '10px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                Circulating = deployed to the team, but not yet 100% read.
              </div>
            </div>

            {/* TEAM OVERVIEW PANE */}
            <div style={{ background: '#ffffff', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>Team Overview</div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, borderRadius: 4, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '4px 8px', fontSize: 12, color: '#475569' }}>
                  Jack Wilde <ChevronDown style={{ height: 12, width: 12 }} />
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: '#166534', color: '#ffffff', fontSize: 12, fontWeight: 500 }}>Policy</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: '#22c55e', color: '#ffffff', fontSize: 12, fontWeight: 500 }}>SOG</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: '#86efac', color: '#064e3b', fontSize: 12, fontWeight: 500 }}>Memo</span>
              </div>

              <p style={{ marginBottom: 16, fontSize: 12, color: '#64748b' }}>Recent circulating for this team member</p>

              <div style={{ borderRadius: 12, border: '1px solid #f1f5f9', background: '#f8fafc', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#1e293b' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Policy</span>
                    <span style={{ color: '#94a3b8' }}>·</span>
                    Year-end workflow
                  </div>
                  <span style={{ fontSize: 12, color: '#64748b' }}>80% read</span>
                </div>
                <p style={{ marginTop: 8, fontSize: 12, color: '#94a3b8' }}>
                  Pushed to Jack - remains here until 100% read, then moves to library
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
