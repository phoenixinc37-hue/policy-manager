"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PolicyCard from "@/components/ui/PolicyCard";
import { useApp } from "@/lib/app-context";
import { clinicDisplay, categories } from "@/lib/mock-data";
import type { CommunicationType } from "@/types";

export default function LibraryPage() {
  const { currentUser, isManager, policies } = useApp();
  const [typeFilter, setTypeFilter] = useState<CommunicationType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const visiblePolicies = useMemo(
    () =>
      policies.filter((policy) => {
        if (!isManager && policy.status !== "published") return false;
        return policy.clinics.some((clinicId) => currentUser.clinics.includes(clinicId));
      }),
    [currentUser.clinics, isManager, policies]
  );

  const filtered = visiblePolicies
    .filter((policy) => (typeFilter === "all" ? true : policy.type === typeFilter))
    .filter((policy) => (categoryFilter === "all" ? true : policy.category === categoryFilter))
    .filter((policy) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return [policy.title, policy.category, policy.body].some((value) => value.toLowerCase().includes(q));
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Document library"
        title="Policy library"
        description="Search realistic CSI pilot content by type, category, and clinic visibility. Managers also see drafts and in-flight material."
        action={isManager ? <Link href="/policy/new" className="btn-primary">+ New policy</Link> : undefined}
      />

      <div className="card mb-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.45fr_0.45fr]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search titles, categories, or body text..."
            className="input"
          />
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as CommunicationType | "all")} className="input">
            <option value="all">All document types</option>
            <option value="policy">Administrative policy</option>
            <option value="sog">Standard operating guideline</option>
            <option value="info">Communication info</option>
          </select>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="input">
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{filtered.length} matching items</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{visiblePolicies.filter((item) => item.status === "draft").length} drafts visible to manager roles</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => (
          <PolicyCard
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            category={item.category}
            clinic={clinicDisplay(item.clinics)}
            date={item.updatedAt}
            status={item.status}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-4 text-center text-sm text-slate-500">No items match the current filters.</div>
      ) : null}
    </div>
  );
}
