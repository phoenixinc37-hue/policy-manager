import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, FileText, Shield } from "lucide-react";

const highlights = [
  {
    title: "A real source of truth",
    description: "Policies, SOPs, and time-sensitive updates stay organized by clinic, owner, and effective date.",
    icon: FileText,
  },
  {
    title: "Compliance that is visible",
    description: "Managers can immediately see overdue acknowledgments, policy rollout progress, and draft items waiting to ship.",
    icon: CheckCircle2,
  },
  {
    title: "Built for veterinary operations",
    description: "Seeded with realistic multi-clinic workflows so the demo feels like an actual product, not a wireframe.",
    icon: Building2,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-300/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">Policy Manager</p>
              <p className="text-xs text-slate-300">Rosslyn Veterinary Group demo</p>
            </div>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Open demo
          </Link>
        </header>

        <main className="flex flex-1 items-center py-16 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <section>
              <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-100">
                Multi-clinic policy control, acknowledgments, and manager visibility
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">
                Internal policy software that actually looks ready for a clinic team.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Demo a polished staff experience, a believable manager console, and realistic Rosslyn clinic content — all in a static-hostable Next.js build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn-primary gap-2">
                  Enter app
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/manager" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10">
                  View manager dashboard
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
                <div>
                  <p className="text-2xl font-semibold text-white">12</p>
                  <p>seeded documents</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">3</p>
                  <p>active clinics</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">2</p>
                  <p>core personas to demo</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="rounded-[24px] border border-white/10 bg-slate-900/90 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-300">Tonight&apos;s rollout</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">Controlled Substance Handling Protocol</h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-200">92% complete</div>
                </div>
                <div className="space-y-4">
                  {highlights.map(({ title, description, icon: Icon }) => (
                    <div key={title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-cyan-400/15 p-2 text-cyan-200">
                          <Icon className="h-4 w-4" />
                        </div>
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
