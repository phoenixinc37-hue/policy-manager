import Link from "next/link";
import { getDefinitionsAction } from "../../../actions";
import { EditClient } from "./EditClient";

export const dynamic = "force-dynamic";

export default async function EditDefinitionPage({ params }: { params: { definitionKey: string } }) {
  const definitions = await getDefinitionsAction() as any[];
  const item = definitions.find((d) => d.key === params.definitionKey);

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f7f4", padding: 24, fontFamily: "Arial, sans-serif" }}>
        <Link href="/definitions" style={{ color: "#1f5d24", fontWeight: 700, textDecoration: "none" }}>Back to Definitions</Link>
        <div style={{ marginTop: 20, fontSize: 18, fontWeight: 700 }}>Definition not found.</div>
      </div>
    );
  }

  return <EditClient item={item} />;
}
