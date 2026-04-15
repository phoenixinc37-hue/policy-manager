import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness, CheckCircle2, FileText, Scale, Shield, Sparkles, BookOpen, FileCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.08),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(129,199,132,0.08),_transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        
        {/* HEADER */}
        <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-800 ring-1 ring-brand-200">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-900">
                Policy Manager <span className="ml-1 text-xs font-bold text-slate-500">for accounting firms</span>
              </p>
              <p className="text-xs font-bold text-slate-500">Business Inc</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="btn-secondary">Team View</Link>
            <Link href="/manager" className="btn-primary">Manager view</Link>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex flex-1 items-center py-16 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            
            {/* LEFT: HERO COPY */}
            <section>
              <div className="mb-6 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800">
                Built for accountants
              </div>
              <h1 className="max-w-3xl text-5xl font-normal leading-tight text-slate-900 md:text-6xl">
                <span className="font-bold">STRUCTURE</span> is what makes a firm <span className="font-bold">SUCCESSFUL</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Policies, SOPs, and internal communication are the <span className="font-bold text-slate-900">FOUNDATION</span> of that <span className="font-bold text-slate-900">STRUCTURE</span> — policies that are read, understood, and followed will make your firm <span className="font-bold text-slate-900">SUCCESSFUL</span>.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn-primary gap-2">Policy</Link>
                <Link href="/dashboard" className="btn-primary gap-2">SOG</Link>
                <Link href="/dashboard" className="btn-primary gap-2">Memo</Link>
              </div>
            </section>

            {/* RIGHT: DEMO CARDS */}
            <section className="flex flex-col gap-6">
              
              {/* Manager View Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-4 font-semibold text-slate-900">Manager View (Demo)</div>
                
                <div className="mb-5 flex gap-2">
                  <div className="rounded-full bg-brand-800 px-3 py-1 text-xs font-medium text-white">Last 7 days</div>
                  <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">30 days</div>
                  <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">Last year</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                    Policy · Year-end workflow
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                    <FileText className="h-4 w-4 text-cyan-600" />
                    SOG · Intake process
                  </div>
                </div>
              </div>

              {/* Team View Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-4 font-semibold text-slate-900">Team View (Demo)</div>
                
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                    Policy · Year-end workflow
                  </div>
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">80% read</span>
                </div>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
