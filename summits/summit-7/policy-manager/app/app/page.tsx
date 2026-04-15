import Link from "next/link";
import { Shield, ChevronDown } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <div className="mx-auto max-w-6xl px-4 py-4 lg:px-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-start gap-1 rounded-lg bg-green-100 p-1.5">
              <div className="flex h-6 w-5 flex-col justify-between rounded bg-[#166534] p-1">
                <div className="relative h-1 w-full rounded-sm bg-green-400">
                  <div className="absolute right-0.5 top-0 h-0.5 w-1 rounded-sm bg-green-900" />
                </div>
                <div className="relative h-1 w-full rounded-sm bg-green-400">
                  <div className="absolute right-0.5 top-0 h-0.5 w-1 rounded-sm bg-green-900" />
                </div>
                <div className="relative h-1 w-full rounded-sm bg-green-400">
                  <div className="absolute right-0.5 top-0 h-0.5 w-1 rounded-sm bg-green-900" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">
                Policy Manager <span className="ml-1 text-xs font-bold text-slate-600">for accounting firms</span>
              </p>
              <p className="text-xs font-bold text-slate-500">Business Inc</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard" className="rounded-md bg-[#166534] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-green-800">
              Team View
            </Link>
            <Link href="/manager" className="rounded-md bg-[#166534] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-green-800">
              Manager view
            </Link>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* LEFT COLUMN */}
          <section className="pt-8">
            <div className="mb-8 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
              Built for accountants
            </div>
            
            <h1 className="text-[40px] font-medium leading-[1.15] text-slate-800">
              <span className="font-bold text-slate-900">STRUCTURE</span> is<br />
              what makes a firm<br />
              <span className="font-bold text-slate-900">SUCCESSFUL.</span>
            </h1>
            
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600">
              Policies, SOPs, and internal communication<br />
              are the <span className="font-semibold text-slate-700">FOUNDATION</span> of that <span className="font-semibold text-slate-700">STRUCTURE</span><br />
              — policies that are read, understood, and<br />
              followed will make your firm <span className="font-semibold text-slate-700">SUCCESSFUL.</span>
            </p>
            
            <div className="mt-8 flex gap-3">
              <Link href="/dashboard" className="rounded-md bg-[#166534] px-5 py-2 text-sm font-medium text-white hover:bg-green-800">Policy</Link>
              <Link href="/dashboard" className="rounded-md bg-[#166534] px-5 py-2 text-sm font-medium text-white hover:bg-green-800">SOG</Link>
              <Link href="/dashboard" className="rounded-md bg-[#166534] px-5 py-2 text-sm font-medium text-white hover:bg-green-800">Memo</Link>
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <section className="flex flex-col gap-6">
            
            {/* Manager Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Manager Overview</h2>
              
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#166534] px-4 py-1.5 text-xs font-medium text-white">All</span>
                <span className="rounded-full bg-[#2e7d32] px-4 py-1.5 text-xs font-medium text-white">Tax Team</span>
                <span className="rounded-full bg-[#81c784] px-4 py-1.5 text-xs font-medium text-green-900">Admin Team</span>
                <span className="rounded-full bg-[#a5d6a7] px-4 py-1.5 text-xs font-medium text-green-900">Partner Team</span>
              </div>

              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Tax team</span>
                <span>84% complete</span>
              </div>
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[84%] bg-[#2e7d32]"></div>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                  <span>Policies circulating</span>
                  <span className="font-medium text-slate-900">3</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                  <span>SOGs circulating</span>
                  <span className="font-medium text-slate-900">5</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Memos circulating</span>
                  <span className="font-medium text-slate-900">2</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
                Circulating = deployed to the team, but not yet<br />100% read.
              </div>
            </div>

            {/* Team Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Team Overview</h2>
                <button className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                  Jack Wilde <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              
              <div className="mb-6 flex gap-2">
                <span className="rounded-full bg-[#166534] px-3 py-1 text-xs font-medium text-white">Policy</span>
                <span className="rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-white">SOG</span>
                <span className="rounded-full bg-[#86efac] px-3 py-1 text-xs font-medium text-green-900">Memo</span>
              </div>

              <p className="mb-4 text-xs text-slate-500">Recent circulating for this team member</p>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <span className="text-xs font-bold text-slate-900">Policy</span>
                    <span className="text-slate-400">·</span>
                    Year-end workflow
                  </div>
                  <span className="text-xs text-slate-500">80% read</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Pushed to Jack - remains here until 100% read, then moves to library
                </p>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
