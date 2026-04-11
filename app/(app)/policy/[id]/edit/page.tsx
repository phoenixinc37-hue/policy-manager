"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import PolicyEditorForm from "@/components/policy/PolicyEditorForm";
import PageHeader from "@/components/ui/PageHeader";
import { useApp } from "@/lib/app-context";

export default function EditPolicyPage() {
  const { id } = useParams<{ id: string }>();
  const { getPolicyById, isManager } = useApp();
  const policy = getPolicyById(id);

  if (!isManager) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Manager access required" description="Only manager personas can edit documents in this demo." />
        <Link href="/library" className="btn-primary">Back to library</Link>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Policy not found" description="The requested document could not be loaded for editing." />
        <Link href="/library" className="btn-primary">Back to library</Link>
      </div>
    );
  }

  return <PolicyEditorForm mode="edit" policy={policy} />;
}
