"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PolicyCard from "@/components/ui/PolicyCard";
import { useApp } from "@/lib/app-context";
import { policies, clinicDisplay } from "@/lib/mock-data";
import type { CommunicationType } from "@/types";

export default function LibraryPage() {
  const { currentUser, isManager } = useApp();
  const [typeFilter, setTypeFilter] = useState<CommunicationType | "all">("all");
  const [search, setSearch] = useState("");

  // Filter to policies visible to this user's clinics
  const visiblePolicies = policies.filter((p) => {
    // Staff only see published; managers see drafts too
    if (!isManager && p.status !== "published") return false;
    return p.clinics.some((c) => currentUser.clinics.includes(c));
  });

  const filtered = visiblePolicies.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Policy Library"
        description={`Browse all policies, guidelines, and communications. ${sorted.length} items.`}
        action={
          isManager ? (
            <Link href="/policy/new" className="btn-primary">+ New Policy</Link>
          ) : undefined
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setTypeFilter("all")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            typeFilter === "all"
              ? "bg-brand-600 text-white"
              : "bg-white border border-surface-border text-gray-600 hover:bg-gray-50"
          }`}
        >
          All Types ({visiblePolicies.length})
        </button>
        <button
          onClick={() => setTypeFilter("policy")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            typeFilter === "policy"
              ? "bg-purple-600 text-white"
              : "badge-policy cursor-pointer hover:opacity-80"
          }`}
        >
          Administrative Policy ({visiblePolicies.filter((p) => p.type === "policy").length})
        </button>
        <button
          onClick={() => setTypeFilter("sog")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            typeFilter === "sog"
              ? "bg-cyan-600 text-white"
              : "badge-sog cursor-pointer hover:opacity-80"
          }`}
        >
          SOG ({visiblePolicies.filter((p) => p.type === "sog").length})
        </button>
        <button
          onClick={() => setTypeFilter("info")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            typeFilter === "info"
              ? "bg-lime-600 text-white"
              : "badge-info cursor-pointer hover:opacity-80"
          }`}
        >
          Communication Info ({visiblePolicies.filter((p) => p.type === "info").length})
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search policies, guidelines, and communications..."
          className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
        />
      </div>

      {/* Policy list */}
      <div className="grid gap-3">
        {sorted.map((item) => (
          <PolicyCard
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            category={item.category}
            clinic={clinicDisplay(item.clinics)}
            date={item.updatedAt}
          />
        ))}
        {sorted.length === 0 && (
          <div className="card text-center py-8">
            <p className="text-gray-400">No policies match your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
