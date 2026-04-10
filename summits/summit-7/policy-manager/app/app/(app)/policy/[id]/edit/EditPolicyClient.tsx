"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { clinics, categories } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import type { CommunicationType, PolicyStatus } from "@/types";

export default function EditPolicyClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getPolicyById, savePolicy } = useApp();
  const policy = getPolicyById(id);

  const initialForm = useMemo(
    () => ({
      title: policy?.title ?? "",
      type: (policy?.type ?? "policy") as CommunicationType,
      category: policy?.category ?? categories[0],
      clinicIds: policy?.clinics ?? clinics.map((clinic) => clinic.id),
      status: (policy?.status ?? "draft") as PolicyStatus,
      effectiveDate: policy?.effectiveDate ?? "2026-04-10",
      reviewDate: policy?.reviewDate ?? "",
      body: policy?.body ?? "",
    }),
    [policy]
  );

  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  if (!policy) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Policy not found" />
        <Link href="/library" className="btn-primary">Back to library</Link>
      </div>
    );
  }

  const toggleClinic = (clinicId: string) => {
    setForm((prev) => ({
      ...prev,
      clinicIds: prev.clinicIds.includes(clinicId) ? prev.clinicIds.filter((id) => id !== clinicId) : [...prev.clinicIds, clinicId],
    }));
  };

  const handleSave = (status: PolicyStatus) => {
    savePolicy({ ...form, status }, policy.id);
    setSaved(true);
    window.setTimeout(() => router.push(`/policy/${policy.id}`), 900);
  };

  if (saved) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="card py-16 text-center">
          <h2>Policy updated</h2>
          <p className="mt-2 text-sm text-slate-500">Changes were saved in-session for the live demo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/library" className="hover:text-slate-600">Library</Link>
        <span>/</span>
        <Link href={`/policy/${policy.id}`} className="hover:text-slate-600">{policy.title}</Link>
        <span>/</span>
        <span className="text-slate-600">Edit</span>
      </div>

      <PageHeader
        eyebrow="Editing"
        title="Update document"
        description="Refine content, retarget clinics, and republish from a manager-friendly editor that looks stable enough for a real beta conversation."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <section className="space-y-5">
          <div className="card grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
              <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as CommunicationType })} className="input">
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

          <div className="card">
            <label className="mb-3 block text-sm font-medium text-slate-700">Clinic targeting</label>
            <div className="grid gap-3 md:grid-cols-3">
              {clinics.map((clinic) => {
                const selected = form.clinicIds.includes(clinic.id);
                return (
                  <button key={clinic.id} type="button" onClick={() => toggleClinic(clinic.id)} className={`rounded-3xl border p-4 text-left transition ${selected ? "border-cyan-300 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <p className="font-medium text-slate-900">{clinic.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{selected ? "Included" : "Excluded"}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Effective date</label>
              <input type="date" value={form.effectiveDate} onChange={(event) => setForm({ ...form, effectiveDate: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Review date</label>
              <input type="date" value={form.reviewDate} onChange={(event) => setForm({ ...form, reviewDate: event.target.value })} className="input" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <input value={form.status} readOnly className="input bg-slate-50 text-slate-500" />
            </div>
          </div>

          <div className="card">
            <label className="mb-1 block text-sm font-medium text-slate-700">Document body</label>
            <textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} className="textarea min-h-[380px]" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-10">
            <Link href={`/policy/${policy.id}`} className="btn-secondary">Cancel</Link>
            <div className="flex gap-3">
              <button onClick={() => handleSave("draft")} className="btn-secondary">Save draft</button>
              <button onClick={() => handleSave("published")} className="btn-primary">Publish changes</button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface-dark p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Version context</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Current version</p>
                <p className="mt-1 text-slate-300">v{policy.version}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Current status</p>
                <p className="mt-1 capitalize text-slate-300">{policy.status}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Last updated</p>
                <p className="mt-1 text-slate-300">{policy.updatedAt}</p>
              </div>
            </div>
          </div>

          <div className="card-muted">
            <p className="section-label">Editing note</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This flow keeps the beta story simple: make the change, decide whether it stays draft or goes live, and return directly to the policy detail view.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
