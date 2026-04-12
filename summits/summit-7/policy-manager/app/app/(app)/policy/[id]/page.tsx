import { allPolicies } from "@/lib/mock-data";
import PolicyDetailClient from "./PolicyDetailClient";

export function generateStaticParams() {
  return allPolicies.map((policy) => ({ id: policy.id }));
}

export default function PolicyDetailPage() {
  return <PolicyDetailClient />;
}
