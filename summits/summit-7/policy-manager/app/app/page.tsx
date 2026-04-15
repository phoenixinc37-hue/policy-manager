import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness, CheckCircle2, FileText, Scale, Shield, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Preset-based vertical demos",
    description: "Switch the full seeded experience between Accounting Firm and Law Firm from the left rail without changing codebases.",
    icon: Building2,
  },
  {
    title: "Owner-visible modules and seeded content",
    description: "Each preset changes terminology, offices, personas, policy library, and manager rollout story so the product feels industry-aware.",
    icon: FileText,
  },
  {
    title: "Business Inc. branding",
    description: "The variants are genericized and no longer read like a veterinary clinic pilot.",
    icon: CheckCircle2,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Updated radial gradient to use the new green brand color instead of blue/cyan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.25),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(129,199,132,0.15),_transparent_28%)]" />
      
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2e7d32]/20 text-[#4caf50] ring-1 ring-[#4caf50]/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">
                Policy Manager <span className="text-xs text-slate-300 ml-2 font-normal">for accounting firms</span>
              </p>
              <p className="text-xs text-slate-400">Business Inc</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10">Team View</Link>
            <Link href="/manager" className="btn-primary">Manager view</Link>
          </div>
        </header>

        <main className="flex flex-1 items-center py-16 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            
            <section>
              <div className="mb-6 inline-flex rounded-full border border-[#4caf50]/30 bg-[#2e7d32]/20 px-4 py-1.5 text-sm text-[#81c784]">
                Built for accountants
              </div>
              
              <h1 className="max-w-3xl text-5xl font-normal leading-tight text-white md:text-6xl">
                <span className="font-bold">STRUCTURE</span> is what makes a firm <span className="font-bold">SUCCESSFUL</span>.
              </h1>
              
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Policies, SOPs, and internal communication are the <span className="font-bold text-white">FOUNDATION</span> of that <span className="font-bold text-white">STRUCTURE</span> — policies that are read, understood, and followed will make your firm <span className="font-bold text-white">SUCCESSFUL</span>.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn-primary gap-2">Policy</Link>
                <Link href="/dashboard" className="btn-primary gap-2">SOG</Link>
                <Link href="/dashboard" className="btn-primary gap-2">Memo</Link>
              </div>
              
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-50">
                  <div className="flex items-center gap-2 font-semibold text-white"><BriefcaseBusiness className="h-4 w-4" /> Accounting Firm</div>
                  <p className="mt-2 leading-6 text-emerald-100">Tax, payroll, month-end close, CRA notice triage, secure portal verification, and deadline-week coverage.</p>
                </div>
                <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-5 text-sm text-violet-50">
                  <div className="flex items-center gap-2 font-semibold text-white"><Scale className="h-4 w-4" /> Law Firm</div>
                  <p className="mt-2 leading-6 text-violet-100">Conflict checks, trust retainer handling, court diary controls, confidentiality, file closing, and urgent motion staffing.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-green-950/30 backdrop-blur-xl">
              <div className="rounded-[24px] border border-white/10 bg-slate-900/90 p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-300">How to view both</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">Use the left-rail Vertical Demo switch</h2>
                  </div>
                  <div className="rounded-2xl bg-[#2e7d32]/30 px-3 py-1 text-sm font-medium text-[#81c784]">Owner-ready</div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#4caf50]/30 bg-[#2e7d32]/20 p-4">
                    <p className="font-medium text-white">1. Open app</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Start on Dashboard or Manager view. The app opens in the Accounting preset by default.</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="font-medium text-white">2. Click Law</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">The sidebar switch loads the law-firm dataset with new offices, roles, categories, and seeded policies.</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="font-medium text-white">3. Show blank mode</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Use the Workspace Mode toggle to clear seeded content and show the clean-start product posture.</p>
                  </div>
                  {highlights.map(({ title, description, icon: Icon }) => (
                    <div key={title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-[#2e7d32]/30 p-2 text-[#81c784]"><Icon className="h-4 w-4" /></div>
                        <div>
                          <p className="font-medium text-white">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
