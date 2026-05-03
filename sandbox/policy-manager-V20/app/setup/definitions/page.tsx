import { getDefinitionsAction, getProfile } from "../../actions";
import { DefinitionsSetupClient } from "./DefinitionsSetupClient";

export const dynamic = "force-dynamic";

export default async function DefinitionsSetupPage({ searchParams }: { searchParams?: { mode?: string } }) {
  const definitions = await getDefinitionsAction() as any[];
  const profile = await getProfile() as any;
  
  const initialMode = searchParams?.mode === "ai" ? "ai" : (profile.definitionMode || "manual");

  return <DefinitionsSetupClient initialDefinitions={definitions} initialMode={initialMode} />;
}
