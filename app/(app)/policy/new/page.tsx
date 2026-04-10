"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { clinics, categories } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import type { CommunicationType, PolicyStatus } from "@/types";

const starterTemplates: Record<CommunicationType, string> = {
  policy: `## Purpose\nExplain the non-negotiable standard.\n\n## Scope\nList who this applies to.\n\n## Policy\n1. Clear rule one\n2. Clear rule two\n\n## Compliance\n- Who owns follow-up\n- What happens if missed`,
  sog: `## Purpose\nDescribe the operational outcome.\n\n## Workflow\n1. First step\n2. Second step\n3. Escalation if needed\n\n## Notes\n- Exceptions\n- Documentation requirements`,
  info: `## Update\nSummarize the communication.\n\n## What staff need to know\n- Key point\n- Timeline\n- Contact person`,
};

export default function CreatePolicyPage() {
  const router = useRouter();
  const { savePolicy } = useApp();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    type: "policy" as CommunicationType,
    category: categories[0],
    clinicIds: clinics.map((clinic) => clinic.id),
    status: "draft" as PolicyStatus,
    effectiveDate: "2026-04-10",
    reviewDate: "2026-10-10",
    body: starterTemplates.policy,
  });

  const clinicSummary = useMemo(() => {
    if (form.clinicIds.length === clinics.length) return "All clinics selected";
    if (form.clinicIds.length === 0) return "No clinics selected";
    return `${form.clinicIds.length} clinic(s) targeted`;
  }, [form.clinicIds]);

  const toggleClinic = (id: string) => {
    setForm((prev) => ({
      ...prev,
      clinicIds: prev.clinicIds.includes(id) ? prev.clinicIds.filter((clinicId) => clinicId !== id) : [...prev.clinicIds, id],
    }));
  };

  const handleSave = (status: PolicyStatus) => {
    const id = savePolicy({ ...form, status });
    setSavedId(id);
    window.setTimeout(() => router.push(`/policy/${id}`), 900);
  };

  if (savedId) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="card py-16 text-center">
          <h2>Saved successfully</h2>
          <p className="mt-2 text-sm text-slate-500">Your demo document is ready and you&apos;re being redirected to the detail view.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/library" className="hover:text-slate-600">Library</Link>
        <span>/</span>
        <span className="text-slate-600">New policy</span>
      </div>

      <PageHeader
        eyebrow="Authoring"
        title="Create a new document"
        description="Choose clinics, define the document type, and publish with a flow that looks credible in front of clinic operators."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <section className="space-y-5">
          <div className="card space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="input" placeholder="e.g., Controlled Drug Count Escalation Workflow" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
                <select
                  value={form.type}
                  onChange={(event) => {
                    const nextType = event.target.value as CommunicationType;
                    setForm({ ...form, type: nextType, body: starterTemplates[nextType] });
                  }}
                  className="input"
                >
                  <option value="policy">Administrative policy</option>
                  <option value="sog">Standard operating guideline</option>
                  <option value="info">Communication info</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="input">
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">Clinic targeting</label>
              <button type="button" onClick={() => setForm({ ...form, clinicIds: clinics.map((clinic) => clinic.id) })} className="text-sm font-medium text-cyan-700">Select all</button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {clinics.map((clinic) => {
                const active = form.clinicIds.includes(clinic.id);
                return (
                  <button key={clinic.id} type="button" onClick={() => toggleClinic(clinic.id)} className={`rounded-3xl border p-4 text-left transition ${active ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                    <p className="font-medium text-slate-900">{clinic.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{active ? "Included in rollout" : "Not selected"}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Effective date</label>
              <input type="date" value={form.effectiveDate} onChange={(event) => setForm({ ...form, effectiveDate: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Review date</label>
              <input type="date" value={form.reviewDate} onChange={(event) => setForm({ ...form, reviewDate: event.target.value })} className="input" />
            </div>
          </div>

          <div className="card">
            <label className="mb-1 block text-sm font-medium text-slate-700">Document body</label>
            <textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} className="textarea min-h-[360px]" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-10">
            <Link href="/library" className="btn-secondary">Cancel</Link>
            <div className="flex gap-3">
              <button onClick={() => handleSave("draft")} className="btn-secondary">Save draft</button>
              <button onClick={() => handleSave("published")} className="btn-primary" disabled={!form.title.trim() || !form.body.trim()}>
                Publish document
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface-dark p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Preview checklist</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Audience</p>
                <p className="mt-1 text-slate-300">{clinicSummary}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Type</p>
                <p className="mt-1 text-slate-300 capitalize">{form.type}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Publishing behavior</p>
                <p className="mt-1 text-slate-300">New published items create fresh acknowledgments for staff in affected clinics.</p>
              </div>
            </div>
          </div>

          <div className="card-muted">
            <p className="section-label">Authoring guidance</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Strong demo documents usually include a clear purpose, who it applies to, the workflow or rule itself, and what accountability looks like after publication.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
