import { policies } from "@/lib/mock-data";
import EditPolicyClient from "./EditPolicyClient";

export function generateStaticParams() {
  return policies.map((policy) => ({ id: policy.id }));
}

export default function EditPolicyPage() {
  return <EditPolicyClient />;
}
