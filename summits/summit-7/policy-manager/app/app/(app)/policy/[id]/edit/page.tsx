"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getPolicy, clinics, categories } from "@/lib/mock-data";
import type { CommunicationType, PolicyStatus } from "@/types";

export default function EditPolicyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const policy = getPolicy(id);

  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: policy?.title ?? "",
    type: (policy?.type ?? "policy") as CommunicationType,
    category: policy?.category ?? categories[0],
    clinicIds: policy?.clinics ?? [],
    status: (policy?.status ?? "draft") as PolicyStatus,
    effectiveDate: policy?.effectiveDate ?? "",
    reviewDate: policy?.reviewDate ?? "",
    body: policy?.body ?? "",
  });

  if (!policy) {
    return (
      <div className="max-w-3xl">
        <PageHeader title="Policy Not Found" />
        <Link href="/library" className="btn-primary">Back to Library</Link>
      </div>
    );
  }

  const toggleClinic = (cid: string) => {
    setForm((prev) => ({
      ...prev,
      clinicIds: prev.clinicIds.includes(cid)
        ? prev.clinicIds.filter((c) => c !== cid)
        : [...prev.clinicIds, cid],
    }));
  };

  const allClinicsSelected = form.clinicIds.length === clinics.length;
  const toggleAll = () => {
    setForm((prev) => ({
      ...prev,
      clinicIds: allClinicsSelected ? [] : clinics.map((c) => c.id),
    }));
  };

  const handleSave = (status: PolicyStatus) => {
    setForm((prev) => ({ ...prev, status }));
    setSaved(true);
    setTimeout(() => {
      router.push(`/policy/${policy.id}`);
    }, 1500);
  };

  if (saved) {
    return (
      <div className="max-w-3xl">
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Changes Saved</h2>
          <p className="text-gray-500">
            {form.status === "published"
              ? "Your updated policy is now live."
              : "Draft saved successfully."}
          </p>
          <p className="text-sm text-gray-400 mt-2">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/library" className="hover:text-gray-600">Library</Link>
        <span>/</span>
        <Link href={`/policy/${policy.id}`} className="hover:text-gray-600">{policy.title}</Link>
        <span>/</span>
        <span className="text-gray-600">Edit</span>
      </div>

      <PageHeader
        title="Edit Policy"
        description={`Editing: ${policy.title}`}
      />

      <div className="space-y-6">
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
          />
        </div>

        <div className="card">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Communication Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as CommunicationType })}
                className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
              >
                <option value="policy">Administrative Policy</option>
                <option value="sog">Standard Operating Guideline</option>
                <option value="info">Communication Info</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Clinics</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={allClinicsSelected} onChange={toggleAll} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
              <span className="font-medium">All Clinics</span>
            </label>
            {clinics.map((clinic) => (
              <label key={clinic.id} className="flex items-center gap-2 text-sm ml-4">
                <input type="checkbox" checked={form.clinicIds.includes(clinic.id)} onChange={() => toggleClinic(clinic.id)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                {clinic.name}
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
              <input type="date" value={form.effectiveDate} onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
              <input type="date" value={form.reviewDate} onChange={(e) => setForm({ ...form, reviewDate: e.target.value })} className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Content</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={16}
            className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500 resize-y"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pb-8">
          <Link href={`/policy/${policy.id}`} className="btn-secondary">Cancel</Link>
          <div className="flex gap-3">
            <button onClick={() => handleSave("draft")} className="btn-secondary">Save as Draft</button>
            <button onClick={() => handleSave("published")} className="btn-primary" disabled={!form.title.trim()}>
              {policy.status === "published" ? "Update & Publish" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
