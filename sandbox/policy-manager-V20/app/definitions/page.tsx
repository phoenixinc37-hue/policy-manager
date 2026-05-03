import { getProfile, getDefinitionsAction } from "../actions";
import { DefinitionsClient } from "./DefinitionsClient";

export const dynamic = "force-dynamic";

export default async function DefinitionsPage() {
  const profile = await getProfile() as any;
  const definitions = await getDefinitionsAction();

  const config = {
    includeCoreDefinitions: profile.includeCoreDefinitions || "Yes",
  };

  return <DefinitionsClient initialConfig={config} initialDefinitions={definitions} />;
}
